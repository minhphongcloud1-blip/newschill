import { supabaseServer } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';
const SITE_NAME = 'Newschill';

// Regenerate every 15 minutes (Google News requires fresh sitemaps)
export const revalidate = 900;

export async function GET() {
  // Google News Sitemap only accepts articles published in the last 48 hours
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  let articles: { id: string; slug: string | null; title: string; created_at: string; topics: { name: string } | null }[] = [];

  try {
    const { data } = await supabaseServer
      .from('articles')
      .select('id, slug, title, created_at, topics(name)')
      .gte('created_at', twoDaysAgo)
      .order('created_at', { ascending: false })
      .limit(1000);

    articles = ((data ?? []) as unknown) as typeof articles;
  } catch { /* return empty sitemap on error */ }

  const items = articles
    .map((a) => {
      const url = a.slug ? `${SITE_URL}/tin-tuc/${a.slug}` : `${SITE_URL}/article/${a.id}`;
      const pubDate = new Date(a.created_at).toISOString();
      const topicName = (a.topics as { name: string } | null)?.name ?? 'Tin tức';
      const title = (a.title ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>vi</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
      <news:keywords>${topicName}</news:keywords>
    </news:news>
    <lastmod>${pubDate}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.9</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
    },
  });
}
