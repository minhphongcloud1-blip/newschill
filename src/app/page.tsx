'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { mockArticles } from '@/data/articles';
import { useAuth } from '@/contexts/AuthContext';
import { Flame } from 'lucide-react';
import HeaderActions from '@/components/layout/HeaderActions';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const [activeTab, setActiveTab] = useState<'foryou' | 'latest'>('foryou');



  const articles = useMemo(() => {
    let filtered = [...mockArticles];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.topic.name.toLowerCase().includes(q)
      );
    }
    if (activeTab === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      filtered.sort((a, b) => {
        const scoreA = a.likesCount * 2 + a.commentsCount * 3 + a.sharesCount;
        const scoreB = b.likesCount * 2 + b.commentsCount * 3 + b.sharesCount;
        return scoreB - scoreA;
      });
    }
    return filtered;
  }, [activeTab, searchQuery]);

  const tabs = [
    { key: 'foryou', label: 'Cho bạn' },
    { key: 'latest', label: 'Mới nhất' },
  ] as const;

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />

      {/* Header - full width */}
      <div className="sticky top-0 z-30 border-b"
        style={{ background: 'var(--bg-glass)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
      >
        <div className="lg:hidden flex items-center gap-2 px-4 py-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            News<span style={{ color: '#F97316' }}>X</span>
          </span>
        </div>
        <div className="flex items-center px-4">
          <div className="flex gap-1 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-3 text-[15px] font-medium relative"
                style={{ color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div layoutId="feed-tab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full" style={{ background: '#F97316' }} />
                )}
              </button>
            ))}
          </div>
          <HeaderActions />
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
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
  );
}
