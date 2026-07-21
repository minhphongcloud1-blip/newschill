import { MetadataRoute } from 'next';
import { supabaseServer } from '@/lib/supabase';
import { mockTopics } from '@/data/topics';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';

// Regenerate sitemap every 6 hours
export const revalidate = 21600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE_URL}/trending`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/topics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // Fetch real articles from Supabase
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabaseServer
      .from('articles')
      .select('id, created_at')
      .order('created_at', { ascending: false })
      .limit(500);

    if (data) {
      articlePages = data.map((article) => ({
        url: `${SITE_URL}/article/${article.id}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch { /* fall through with empty */ }

  const topicPages: MetadataRoute.Sitemap = mockTopics.map((topic) => ({
    url: `${SITE_URL}/topic/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...topicPages];
}
