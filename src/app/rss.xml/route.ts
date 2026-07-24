import { supabaseServer } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';
const SITE_NAME = 'Newschill';
const SITE_DESC = 'Đọc tin tức, bình luận và chia sẻ trên nền tảng kiểu X. Cập nhật tin tức công nghệ, khoa học, kinh doanh, thể thao nhanh nhất Việt Nam.';

// Regenerate every 30 minutes
export const revalidate = 1800;

function escape(str: string) {
  return (str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  let articles: {
    id: string;
    slug: string | null;
    title: string;
    excerpt: string;
    cover_image: string;
    author_name: string;
    created_at: string;
    source_url: string | null;
    topics: { name: string; slug: string } | null;
  }[] = [];

  try {
    const { data } = await supabaseServer
      .from('articles')
      .select('id, slug, title, excerpt, cover_image, author_name, created_at, source_url, topics(name, slug)')
      .order('created_at', { ascending: false })
      .limit(50);

    articles = ((data ?? []) as unknown) as typeof articles;
  } catch { /* empty feed */ }

  const items = articles.map((a) => {
    const url = a.slug ? `${SITE_URL}/tin-tuc/${a.slug}` : `${SITE_URL}/article/${a.id}`;
    const pubDate = new Date(a.created_at).toUTCString();
    const topic = (a.topics as { name: string; slug: string } | null);
    const categoryName = topic?.name ?? 'Tin tức';
    const image = a.cover_image
      ? `\n      <enclosure url="${escape(a.cover_image)}" type="image/jpeg" length="0" />`
      : '';
    return `
  <item>
    <title><![CDATA[${a.title}]]></title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description><![CDATA[${a.excerpt ?? ''}]]></description>
    <pubDate>${pubDate}</pubDate>
    <author>${escape(a.author_name)} (${SITE_NAME})</author>
    <category>${escape(categoryName)}</category>${image}
    ${a.source_url ? `<source url="${escape(a.source_url)}">${SITE_NAME}</source>` : ''}
  </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME} – Tin tức thế hệ mới</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    <ttl>30</ttl>
    <generator>Newschill RSS Generator 1.0</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}
