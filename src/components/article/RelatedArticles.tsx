'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface RelatedArticle {
  id: string;
  title: string;
  slug: string | null;
  cover_image: string;
  created_at: string;
  likes_count: number;
  topics: { name: string; color: string; icon: string; slug: string } | null;
}

interface Props {
  topicSlug: string;
  currentId: string;
  limit?: number;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return 'Vừa xong';
  if (h < 24) return `${h} giờ trước`;
  const d = Math.floor(h / 24);
  return `${d} ngày trước`;
}

export default function RelatedArticles({ topicSlug, currentId, limit = 5 }: Props) {
  const [articles, setArticles] = useState<RelatedArticle[]>([]);

  useEffect(() => {
    if (!topicSlug) return;
    fetch(`/api/articles/related?topic=${encodeURIComponent(topicSlug)}&exclude=${currentId}&limit=${limit}`)
      .then((r) => r.json())
      .then(setArticles)
      .catch(() => {});
  }, [topicSlug, currentId, limit]);

  if (articles.length === 0) return null;

  return (
    <section className="px-4 py-5 border-t" style={{ borderColor: 'var(--border-primary)' }}>
      <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        📰 Bài viết liên quan
      </h2>
      <div className="space-y-3">
        {articles.map((a) => {
          const href = a.slug ? `/tin-tuc/${a.slug}` : `/article/${a.id}`;
          return (
            <Link key={a.id} href={href} className="flex gap-3 group">
              {/* Thumbnail */}
              {a.cover_image && (
                <div className="shrink-0 w-20 h-14 rounded-lg overflow-hidden">
                  <img
                    src={a.cover_image}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    width={80}
                    height={56}
                  />
                </div>
              )}
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold line-clamp-2 group-hover:text-[#8B5CF6] transition-colors leading-snug"
                  style={{ color: 'var(--text-primary)' }}>
                  {a.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  {a.topics && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{ background: `${a.topics.color}20`, color: a.topics.color }}>
                      {a.topics.icon} {a.topics.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <Clock className="w-3 h-3" />
                    {timeAgo(a.created_at)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
