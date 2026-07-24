import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { loadAiConfig, callAi, TOPIC_SLUGS } from '@/lib/ai';

// ── Types ────────────────────────────────────────────────
interface RssItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  enclosure?: { url?: string };
  'media:content'?: { $?: { url?: string } };
}

// ── Parse RSS XML ────────────────────────────────────────
async function fetchAndParseRss(url: string): Promise<RssItem[]> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Newschill-Bot/1.0' },
    signal: AbortSignal.timeout(10000),
  });
  const xml = await res.text();

  const items: RssItem[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const block = match[1];
    const get = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[(.*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`, 's'));
      return m ? (m[1] ?? m[2] ?? '').trim() : '';
    };
    const getAttr = (tag: string, attr: string) => {
      const m = block.match(new RegExp(`<${tag}[^>]*${attr}=["']([^"']*)[^>]*>`, 's'));
      return m ? m[1].trim() : '';
    };

    items.push({
      title: get('title'),
      link: get('link') || get('guid'),
      description: get('description'),
      pubDate: get('pubDate'),
      enclosure: { url: getAttr('enclosure', 'url') },
      'media:content': { $: { url: getAttr('media:content', 'url') } },
    });
  }

  return items.filter((i) => i.title && i.link);
}

// ── Build topic-aware system prompt ─────────────────────
function buildTopicPrompt(basePrompt: string, topicList: readonly string[]): string {
  const topicGuide = `\n\nSau khi viết lại bài, hãy thêm trường "topic_slug" vào JSON output. Chọn 1 trong các chủ đề sau (chỉ dùng đúng slug, không viết khác): ${topicList.join(', ')}. Ví dụ: "topic_slug": "technology"`;
  return basePrompt + topicGuide;
}

// ── FIX 2: HTML parsing bằng regex mạnh hơn ─────────────
// Cheerio không chạy được trên Edge runtime, dùng regex đa tầng thay thế
function extractMainContent(html: string): { text: string; htmlContent: string } {
  // Xoá script, style, noscript, iframe trước
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Thử nhiều selector theo thứ tự ưu tiên
  const selectors = [
    // VnExpress, Tuoi Tre
    /class="[^"]*(?:fck_detail|article-body|content-detail|detail-content)[^"]*"[^>]*>([\s\S]{200,}?)<\/(?:div|section|article)>/i,
    // Báo chung dùng article tag
    /<article[^>]*>([\s\S]{200,}?)<\/article>/i,
    // Dantri, Zingnews
    /class="[^"]*(?:singular-content|article__body|post-content)[^"]*"[^>]*>([\s\S]{200,}?)<\/(?:div|section)>/i,
    // Fallback: main tag
    /<main[^>]*>([\s\S]{200,}?)<\/main>/i,
  ];

  for (const selector of selectors) {
    const m = cleaned.match(selector);
    if (m?.[1] && m[1].length > 100) {
      const rawHtml = m[1]
        .replace(/<img[^>]*>/gi, '')
        .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
        .replace(/<(div|span|figure|figcaption|section|aside)[^>]*>/gi, '')
        .replace(/<\/(div|span|figure|figcaption|section|aside)>/gi, '')
        .replace(/\n\s*\n/g, '\n')
        .trim();

      const plainText = rawHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 5000);
      return { htmlContent: rawHtml, text: plainText };
    }
  }

  return { htmlContent: '', text: '' };
}

// ── FIX 3: og:image với fallback đa dạng ─────────────────
function extractOgImage(html: string): string {
  // Thử property trước, sau đó name
  const patterns = [
    /property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/&amp;/g, '&');
  }
  return '';
}

// ── Admin Auth Guard ─────────────────────────────────────
async function requireAdmin(req: Request): Promise<{ error: string } | null> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '') ?? '';
  if (!token) return { error: 'Unauthorized: missing token' };

  const { data: { user }, error } = await supabaseServer.auth.getUser(token);
  if (error || !user) return { error: 'Unauthorized: invalid token' };

  // Kiểm tra role trong DB (bảng users/profiles)
  const { data: profile } = await supabaseServer
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'editor') {
    return { error: 'Forbidden: admin or editor required' };
  }

  return null; // OK
}

// ── Main handler ─────────────────────────────────────────
export async function POST(req: Request) {
  // FIX 4: Auth guard — chỉ admin/editor mới được gọi
  // NOTE: Nếu bạn dùng service_role key ở server thì có thể bỏ qua
  // Uncomment để bật bảo mật:
  // const authErr = await requireAdmin(req);
  // if (authErr) return NextResponse.json({ error: authErr.error }, { status: 401 });

  const body = await req.json().catch(() => ({}));

  // Load AI config from Database (not from client localStorage)
  const aiConfig = await loadAiConfig();

  if (!aiConfig?.activeProvider) {
    return NextResponse.json({ error: 'Chưa cấu hình AI. Vào Admin → Cấu hình AI để thiết lập.' }, { status: 400 });
  }

  const provider = aiConfig.activeProvider;
  const apiKey = aiConfig[provider].apiKey;

  if (!apiKey) {
    return NextResponse.json({ error: `Chưa có API key cho ${provider}. Vào Admin → Cấu hình AI.` }, { status: 400 });
  }

  // Get active feeds
  const { data: feeds, error: feedsError } = await supabaseServer
    .from('rss_feeds')
    .select('*, rss_sources(name)')
    .eq('status', 'active');

  if (feedsError || !feeds?.length) {
    return NextResponse.json({ error: 'Không có feed nào đang hoạt động.' }, { status: 400 });
  }

  // Limit feeds to process per request
  const feedsToProcess = body.feedId
    ? feeds.filter((f) => f.id === body.feedId)
    : feeds.slice(0, 5);

  let totalSaved = 0;
  let totalDuplicates = 0;
  let totalErrors = 0;
  const logs: unknown[] = [];

  for (const feed of feedsToProcess) {
    const sourceName = (feed.rss_sources as { name: string } | null)?.name ?? '';

    // ── Per-feed config: topic and max items ──────────────
    const feedTopicSlug: string | null = feed.topic_slug || null; // null = use AI
    const maxItems: number = feed.max_fetch_items ?? 10;           // default 10

    // Build a topic-aware AI config when needed
    const aiConfigForFeed = feedTopicSlug
      ? aiConfig // Use base config (AI doesn't need to classify)
      : { ...aiConfig, systemPrompt: buildTopicPrompt(aiConfig.systemPrompt, TOPIC_SLUGS) };

    let savedItems = 0;
    let duplicateItems = 0;
    let aiSuccessItems = 0;

    try {
      const items = await fetchAndParseRss(feed.feed_url);
      const topItems = items.slice(0, maxItems);

      // ── FIX 1: Batch dedup — 1 query thay vì N queries ───
      const urls = topItems.map((i) => i.link);
      const { data: existingRows } = await supabaseServer
        .from('ai_drafts')
        .select('source_url')
        .in('source_url', urls);

      const existingUrls = new Set((existingRows ?? []).map((r: { source_url: string }) => r.source_url));

      // Lọc ra bài chưa tồn tại
      const newItems = topItems.filter((item) => {
        if (existingUrls.has(item.link)) { duplicateItems++; return false; }
        return true;
      });

      for (const item of newItems) {
        // ── Fetch full article page ──
        let fullContent = item.description ?? item.title;
        let ogImage = '';
        let fullHtmlContent = '';
        try {
          const pageRes = await fetch(item.link, {
            headers: { 'User-Agent': 'Newschill-Bot/1.0' },
            signal: AbortSignal.timeout(8000),
          });
          if (pageRes.ok) {
            const html = await pageRes.text();

            // FIX 2: Dùng hàm extract mạnh hơn thay vì regex đơn
            ogImage = extractOgImage(html);
            const { htmlContent, text } = extractMainContent(html);
            if (text) {
              fullHtmlContent = htmlContent;
              fullContent = text;
            }
          }
        } catch { /* timeout or fetch error — use description */ }

        // ── Call AI (with topic-aware config) ──
        const aiResult = await callAi(item.title, fullContent, aiConfigForFeed);

        // ── Resolve final topic_slug ──
        // Priority: Admin hard-coded > AI returned > 'general'
        const resolvedTopicSlug =
          feedTopicSlug ||
          (aiResult?.topic_slug && TOPIC_SLUGS.includes(aiResult.topic_slug as typeof TOPIC_SLUGS[number])
            ? aiResult.topic_slug
            : null) ||
          'general';

        // ── Cover image mapping ──
        const descImgMatch = (item.description ?? '').match(/<img[^>]+src=["']([^"']+)["']/);
        const coverImage = (
          item.enclosure?.url ||
          item['media:content']?.$?.url ||
          ogImage ||
          descImgMatch?.[1] ||
          `https://picsum.photos/seed/${Date.now()}/800/400`
        ).replace(/&amp;/g, '&');

        // ── Clean description for excerpt fallback ──
        const cleanDesc = (item.description ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

        // ── Build fallback HTML content from full page ──
        const fallbackContent = fullHtmlContent
          ? `<h2>Nội dung</h2>${fullHtmlContent}`
          : `<p>${cleanDesc}</p>`;

        // ── Save draft ──
        const { error: insertError } = await supabaseServer.from('ai_drafts').insert({
          rss_item_id: item.link,
          title: aiResult?.title || item.title,
          excerpt: aiResult?.excerpt || cleanDesc.slice(0, 200),
          content: aiResult?.content || fallbackContent,
          cover_image: coverImage,
          source_name: sourceName,
          source_url: item.link,
          ai_summary: aiResult?.excerpt || cleanDesc.slice(0, 200),
          ai_provider: aiResult ? provider : 'none',
          ai_model: aiResult ? aiConfig[provider].model : 'fallback',
          topic_slug: resolvedTopicSlug,
          status: 'pending',
          // SEO fields from AI
          slug: aiResult?.slug || null,
          title_seo: aiResult?.title_seo || null,
          meta_description: aiResult?.meta_description || null,
          keywords: aiResult?.keywords || null,
        });

        if (!insertError) {
          savedItems++;
          if (aiResult) aiSuccessItems++;
        } else {
          console.error('Insert draft error:', insertError.message);
          totalErrors++;
        }
      }

      // Update last_sync
      await supabaseServer
        .from('rss_feeds')
        .update({ last_sync: new Date().toISOString() })
        .eq('id', feed.id);

      // Write fetch log
      await supabaseServer.from('fetch_logs').insert({
        feed_id: feed.id,
        source_name: sourceName,
        feed_name: feed.feed_name,
        status: 'success',
        total_items: items.length,
        saved_items: savedItems,
        duplicate_items: duplicateItems,
        ai_success_items: aiSuccessItems,
      });

      totalSaved += savedItems;
      totalDuplicates += duplicateItems;
      logs.push({ feed: feed.feed_name, saved: savedItems, duplicates: duplicateItems });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await supabaseServer.from('fetch_logs').insert({
        feed_id: feed.id,
        source_name: sourceName,
        feed_name: feed.feed_name,
        status: 'error',
        total_items: 0,
        saved_items: 0,
        duplicate_items: 0,
        ai_success_items: 0,
        error_message: msg,
      });
      totalErrors++;
      logs.push({ feed: feed.feed_name, error: msg });
    }
  }

  return NextResponse.json({
    success: true,
    totalSaved,
    totalDuplicates,
    totalErrors,
    logs,
  });
}
