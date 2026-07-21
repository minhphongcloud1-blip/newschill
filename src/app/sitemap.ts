import { MetadataRoute } from 'next';
import { mockArticles } from '@/data/articles';
import { mockTopics } from '@/data/topics';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/trending`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/topics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = mockArticles.map((article) => ({
    url: `${SITE_URL}/article/${article.id}`,
    lastModified: new Date(article.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const topicPages: MetadataRoute.Sitemap = mockTopics.map((topic) => ({
    url: `${SITE_URL}/topic/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...topicPages];
}
