import { MetadataRoute } from 'next';
import { supabaseServer } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';

// Regenerate sitemap every 6 hours
export const revalidate = 21600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE_URL}/trending`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/topics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // Fetch real articles from Supabase (with slug)
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabaseServer
      .from('articles')
      .select('id, slug, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (data) {
      articlePages = data.map((article) => ({
        url: article.slug
          ? `${SITE_URL}/tin-tuc/${article.slug}`
          : `${SITE_URL}/article/${article.id}`,
        lastModified: new Date(article.updated_at || article.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch { /* fall through with empty */ }

  // Fetch real topics from Supabase
  let topicPages: MetadataRoute.Sitemap = [];
  try {
    const { data: topicsData } = await supabaseServer
      .from('topics')
      .select('slug, updated_at')
      .order('name');

    if (topicsData && topicsData.length > 0) {
      topicPages = topicsData.map((topic) => ({
        url: `${SITE_URL}/topic/${topic.slug}`,
        lastModified: topic.updated_at ? new Date(topic.updated_at) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }));
    }
  } catch { /* fall through with empty */ }

  return [...staticPages, ...articlePages, ...topicPages];
}
