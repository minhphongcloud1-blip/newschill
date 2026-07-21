'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Article } from '@/types';
import ArticleCard from './ArticleCard';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowUp } from 'lucide-react';

const LAST_VISIT_KEY = 'newschill_last_visit';

interface ArticleFeedProps {
  articles: Article[];
  pageSize?: number;
  loading?: boolean;
  // New articles from polling (for "new posts" button)
  newArticlesCount?: number;
  onRefresh?: () => void;
}

export default function ArticleFeed({
  articles,
  pageSize = 5,
  loading: isDataLoading = false,
  newArticlesCount = 0,
  onRefresh,
}: ArticleFeedProps) {
  const [displayed, setDisplayed] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // ── Giải pháp 1: "Đã xem đến đây" divider ────────────────
  // lastVisit = timestamp of the PREVIOUS visit (saved before this session)
  const [lastVisit, setLastVisit] = useState<Date | null>(null);
  const dividerRendered = useRef(false);

  useEffect(() => {
    // Read previous visit time
    const saved = localStorage.getItem(LAST_VISIT_KEY);
    if (saved) setLastVisit(new Date(saved));
    // Save current visit time for next session
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
  }, []);

  useEffect(() => {
    setDisplayed(articles.slice(0, pageSize));
    setPage(1);
    dividerRendered.current = false; // Reset divider on article list change
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

  // ── Render ────────────────────────────────────────────────
  const renderItems = () => {
    const elements: React.ReactNode[] = [];
    let dividerShown = false;

    for (let i = 0; i < displayed.length; i++) {
      const article = displayed[i];
      const articleDate = new Date(article.createdAt);
      const prevArticle = i > 0 ? displayed[i - 1] : null;
      const prevDate = prevArticle ? new Date(prevArticle.createdAt) : null;

      // ── Insert "Đã xem đến đây" divider ──
      // Show the divider between the last new article and the first old one
      if (
        !dividerShown &&
        !dividerRendered.current &&
        lastVisit &&
        articleDate < lastVisit &&
        (prevDate === null || prevDate >= lastVisit)
      ) {
        dividerShown = true;
        dividerRendered.current = true;
        elements.push(
          <motion.div
            key="seen-divider"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-2 sticky top-14 z-10"
            style={{ background: 'var(--bg-primary)' }}
          >
            <div className="flex-1 h-px" style={{ background: 'rgba(239,68,68,0.4)' }} />
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{ color: '#EF4444', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              👇 Bạn đã xem đến đây
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(239,68,68,0.4)' }} />
          </motion.div>
        );
      }

      elements.push(<ArticleCard key={article.id} article={article} index={i} />);
    }

    return elements;
  };

  return (
    <div className="relative">
      {/* ── Giải pháp 2: "Tin mới" floating pill ── */}
      <AnimatePresence>
        {newArticlesCount > 0 && (
          <motion.button
            key="new-articles-pill"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            onClick={onRefresh}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              boxShadow: '0 4px 20px rgba(249, 115, 22, 0.5)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowUp className="w-4 h-4" />
            {newArticlesCount} tin mới — Nhấn để cập nhật
            <RefreshCw className="w-3.5 h-3.5 opacity-70" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Initial loading skeletons */}
      {isDataLoading && displayed.length === 0 && (
        <div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-4 py-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
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
                <div className="h-[180px] w-full rounded-2xl skeleton" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article list with dividers */}
      {renderItems()}

      {/* Loading more skeleton */}
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

      {articles.length === 0 && !isDataLoading && (
        <div className="py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-lg mb-2">Chưa có bài viết nào</p>
          <p className="text-sm">Hãy quay lại sau nhé!</p>
        </div>
      )}
    </div>
  );
}
