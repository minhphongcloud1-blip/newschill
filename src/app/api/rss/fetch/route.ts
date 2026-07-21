import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { loadAiConfig, callAi } from '@/lib/ai';

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
      const m = block.match(new RegExp(`<${tag}[^>]*${attr}=["']([^"']*)["'][^>]*>`, 's'));
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

// ── Main handler ─────────────────────────────────────────
export async function POST(req: Request) {
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
    let savedItems = 0;
    let duplicateItems = 0;
    let aiSuccessItems = 0;

    try {
      const items = await fetchAndParseRss(feed.feed_url);

      for (const item of items.slice(0, 10)) {
        // Check duplicate
        const { data: existing } = await supabaseServer
          .from('ai_drafts')
          .select('id')
          .eq('source_url', item.link)
          .maybeSingle();

        if (existing) { duplicateItems++; continue; }

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

            // Extract og:image
            const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/);
            if (ogMatch) ogImage = ogMatch[1].replace(/&amp;/g, '&');

            // Extract article body
            const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
            const detailMatch = html.match(/class="fck_detail"[^>]*>([\s\S]*?)<\/div>/);
            const contentMatch = html.match(/class="article[_-]content"[^>]*>([\s\S]*?)<\/div>/);
            const rawHtml = articleMatch?.[1] || detailMatch?.[1] || contentMatch?.[1] || '';

            if (rawHtml.length > 100) {
              fullHtmlContent = rawHtml
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<img[^>]*>/gi, '')
                .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
                .replace(/<(div|span|figure|figcaption|section)[^>]*>/gi, '')
                .replace(/<\/(div|span|figure|figcaption|section)>/gi, '')
                .replace(/\n\s*\n/g, '\n')
                .trim();

              fullContent = rawHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 5000);
            }
          }
        } catch { /* timeout or fetch error — use description */ }

        // ── Call AI (reads config from DB via lib/ai.ts) ──
        const aiResult = await callAi(item.title, fullContent, aiConfig);

        // ── Cover image mapping: enclosure > media:content > og:image > img in desc > fallback ──
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
          topic_slug: feed.category ?? 'general',
          status: 'pending',
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
