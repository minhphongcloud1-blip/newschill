'use client';

import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { useArticles } from '@/hooks/useArticles';
import HomeBanner from '@/components/banner/HomeBanner';

export default function TrendingPageClient() {
  const { articles } = useArticles();
  const trending = useMemo(() => [...articles].sort((a, b) => (b.likesCount + b.commentsCount * 2 + b.sharesCount) - (a.likesCount + a.commentsCount * 2 + a.sharesCount)), [articles]);

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />
      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          {/* Page title */}
          <div className="flex items-center gap-2 px-4 py-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#F97316' }} />
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Xu hướng</h1>
          </div>
          <HomeBanner />
          <ArticleFeed articles={trending} />
        </main>
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
