'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { mockArticles } from '@/data/articles';
import { useAuth } from '@/contexts/AuthContext';
import { Flame } from 'lucide-react';
import HomeBanner from '@/components/banner/HomeBanner';
import { JsonLd, websiteSchema } from '@/components/seo/JsonLd';

export default function HomePage() {
  const { myArticles } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';

  // Mặc định: mới nhất lên đầu, gộp cả bài viết do user tạo
  const articles = useMemo(() => {
    let filtered = [...myArticles, ...mockArticles].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.topic.name.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [searchQuery, myArticles]);

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

            <ArticleFeed articles={articles} />
          </main>
          <RightPanel />
        </div>
        <MobileNav />
      </div>
    </>
  );
}
