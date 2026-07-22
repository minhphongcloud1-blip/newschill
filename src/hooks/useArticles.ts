'use client';

import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types';

/** Shape returned by Supabase via /api/articles */
interface SupaArticleRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  author_avatar: string;
  topic_id: string | null;
  topics: { slug: string; name: string; icon: string; color: string; description?: string } | null;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  source_name?: string | null;
  source_url?: string | null;
}

/** Map a Supabase article row to the frontend Article type */
function mapArticle(row: SupaArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    author: {
      id: 'system',
      name: row.author_name,
      email: '',
      password: '',
      avatar: row.author_avatar,
      bio: '',
      role: 'editor',
      status: 'active',
      createdAt: row.created_at,
    },
    topic: row.topics
      ? { slug: row.topics.slug, name: row.topics.name, icon: row.topics.icon, description: row.topics.description ?? '', articleCount: 0, color: row.topics.color }
      : { slug: 'general', name: 'Chung', icon: '📰', description: '', articleCount: 0, color: '#6B7280' },
    createdAt: row.created_at,
    likesCount: row.likes_count,
    commentsCount: row.comments_count,
    sharesCount: row.shares_count,
    sourceName: row.source_name ?? undefined,
    sourceUrl: row.source_url ?? undefined,
  };
}

interface UseArticlesOptions {
  topic?: string;   // filter by topic slug
  search?: string;
  pageSize?: number;
  seed?: string;    // Session seed cho Tiered Random
}

export function useArticles(opts: UseArticlesOptions = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (opts.topic) params.set('topic', opts.topic);
      if (opts.search) params.set('search', opts.search);
      if (opts.seed) params.set('seed', opts.seed);
      params.set('pageSize', String(opts.pageSize ?? 200));
      const res = await fetch(`/api/articles?${params}`, {
        // Cache response in browser for 60s, serve stale while refreshing
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const json = await res.json();
        const rows: SupaArticleRow[] = json.data ?? [];
        setArticles(rows.map(mapArticle));
        setTotal(json.total ?? rows.length);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [opts.topic, opts.search, opts.pageSize, opts.seed]);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  return { articles, total, loading, refetch: fetchArticles };
}

export { mapArticle };
export type { SupaArticleRow };
