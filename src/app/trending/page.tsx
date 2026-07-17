'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { mockArticles } from '@/data/articles';
import HeaderActions from '@/components/layout/HeaderActions';

export default function TrendingPage() {
  const router = useRouter();
  const trending = useMemo(() => [...mockArticles].sort((a, b) => (b.likesCount + b.commentsCount * 2 + b.sharesCount) - (a.likesCount + a.commentsCount * 2 + a.sharesCount)), []);

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />
      {/* Header - full width */}
      <div className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3 border-b"
        style={{ background: 'var(--bg-glass)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
      >
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-primary)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" style={{ color: '#F97316' }} />
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Xu hướng</h1>
        </div>
        <HeaderActions />
      </div>
      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          <ArticleFeed articles={trending} />
        </main>
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
