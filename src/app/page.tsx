'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { useArticles } from '@/hooks/useArticles';
import { useAuth } from '@/contexts/AuthContext';
import { Flame } from 'lucide-react';
import HomeBanner from '@/components/banner/HomeBanner';
import { JsonLd, websiteSchema } from '@/components/seo/JsonLd';

const POLL_INTERVAL = 60_000; // Check for new articles every 60s

export default function HomePage() {
  const { myArticles } = useAuth();
  const { articles: supaArticles, loading, refetch } = useArticles();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';

  // ── New articles polling (Giải pháp 2) ───────────────────
  const [newArticlesCount, setNewArticlesCount] = useState(0);
  const latestIdRef = useRef<string | null>(null);

  // Track the ID of the most recent article we know about
  useEffect(() => {
    if (supaArticles.length > 0 && !latestIdRef.current) {
      latestIdRef.current = supaArticles[0].id;
    }
  }, [supaArticles]);

  // Poll for new articles in the background
  useEffect(() => {
    if (searchQuery) return; // Don't poll during search

    const timer = setInterval(async () => {
      try {
        const res = await fetch('/api/articles?pageSize=5');
        if (!res.ok) return;
        const json = await res.json();
        const rows = json.data ?? [];
        if (rows.length === 0 || !latestIdRef.current) return;

        // Count how many new articles appeared since we last loaded
        const newOnes = rows.filter(
          (r: { id: string }) => r.id !== latestIdRef.current &&
            !supaArticles.find((a) => a.id === r.id)
        );
        if (newOnes.length > 0) {
          setNewArticlesCount((c) => c + newOnes.length);
        }
      } catch { /* silent fail */ }
    }, POLL_INTERVAL);

    return () => clearInterval(timer);
  }, [searchQuery, supaArticles]);

  // Called when user clicks the "new articles" pill
  const handleRefresh = () => {
    setNewArticlesCount(0);
    refetch?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Merge articles ────────────────────────────────────────
  const articles = useMemo(() => {
    const ids = new Set(supaArticles.map((a) => a.id));
    let merged = [...supaArticles, ...myArticles.filter((a) => !ids.has(a.id))].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      merged = merged.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.topic.name.toLowerCase().includes(q)
      );
    }
    return merged;
  }, [searchQuery, myArticles, supaArticles]);

  return (
    <>
      <JsonLd data={websiteSchema} />
      <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
        <Sidebar />

        {/* Content */}
        <div className="flex justify-center">
          <main className="flex-1 min-h-screen max-w-[760px]">
            {/* Inline page title */}
            {!searchQuery && (
              <div className="flex items-center gap-2 px-4 py-4">
                <Flame className="w-5 h-5" style={{ color: '#F97316' }} />
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Trang chủ</h1>
              </div>
            )}

            {/* Banner slide */}
            {!searchQuery && <HomeBanner />}

            {searchQuery && (
              <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-primary)' }}>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Kết quả tìm kiếm cho: <span style={{ color: 'var(--text-primary)' }}>&quot;{searchQuery}&quot;</span>
                </p>
                <button onClick={() => router.push('/')} className="text-sm px-3 py-1 rounded-full" style={{ color: '#F97316', background: 'rgba(249,115,22,0.1)' }}>
                  Xóa
                </button>
              </div>
            )}

            <ArticleFeed
              articles={articles}
              loading={loading}
              newArticlesCount={newArticlesCount}
              onRefresh={handleRefresh}
            />
          </main>
          <RightPanel />
        </div>
        <MobileNav />
      </div>
    </>
  );
}
