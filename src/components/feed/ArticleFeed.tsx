'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Article } from '@/types';
import ArticleCard from './ArticleCard';
import { motion } from 'framer-motion';

interface ArticleFeedProps {
  articles: Article[];
  pageSize?: number;
}

export default function ArticleFeed({ articles, pageSize = 5 }: ArticleFeedProps) {
  const [displayed, setDisplayed] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayed(articles.slice(0, pageSize));
    setPage(1);
  }, [articles, pageSize]);

  const loadMore = useCallback(() => {
    if (loading) return;
    const nextPage = page + 1;
    const end = nextPage * pageSize;
    if (end > articles.length + pageSize) return;

    setLoading(true);
    setTimeout(() => {
      setDisplayed(articles.slice(0, Math.min(end, articles.length)));
      setPage(nextPage);
      setLoading(false);
    }, 400);
  }, [page, pageSize, articles, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayed.length < articles.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, displayed.length, articles.length]);

  return (
    <div>
      {displayed.map((article, i) => (
        <ArticleCard key={article.id} article={article} index={i} />
      ))}

      {/* Loading skeleton */}
      {loading && (
        <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full skeleton" />
            <div className="flex-1">
              <div className="h-4 w-32 rounded skeleton mb-1" />
              <div className="h-3 w-20 rounded skeleton" />
            </div>
          </div>
          <div className="ml-[52px]">
            <div className="h-5 w-full rounded skeleton mb-2" />
            <div className="h-4 w-3/4 rounded skeleton mb-3" />
            <div className="h-[200px] w-full rounded-2xl skeleton" />
          </div>
        </div>
      )}

      {/* Sentinel */}
      <div ref={observerRef} className="h-10" />

      {/* End */}
      {displayed.length >= articles.length && articles.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8 text-center text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          ✨ Bạn đã xem hết tin tức
        </motion.div>
      )}

      {articles.length === 0 && (
        <div className="py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-lg mb-2">Chưa có bài viết nào</p>
          <p className="text-sm">Hãy quay lại sau nhé!</p>
        </div>
      )}
    </div>
  );
}
