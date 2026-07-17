'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Calendar } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleCard from '@/components/feed/ArticleCard';
import HeaderActions from '@/components/layout/HeaderActions';
import { mockArticles } from '@/data/articles';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, likes, shares } = useAuth();
  const [activeTab, setActiveTab] = useState<'shared' | 'liked'>('shared');

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      router.push('/login');
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || !currentUser) { return null; }

  const likedArticles = mockArticles.filter((a) => likes.includes(a.id));
  const sharedArticles = mockArticles.filter((a) => shares.includes(a.id));
  const displayedArticles = activeTab === 'shared' ? sharedArticles : likedArticles;

  const roleBadge = {
    admin: { label: '🛡️ Admin', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
    editor: { label: '✍️ Editor', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
    reader: { label: '👤 Reader', color: '#71767B', bg: 'rgba(113,118,123,0.1)' },
  }[currentUser.role];

  const tabs = [
    { key: 'shared', label: 'Đã chia sẻ', count: sharedArticles.length, icon: Share2 },
    { key: 'liked', label: 'Đã thích', count: likedArticles.length, icon: Heart },
  ] as const;

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
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{likedArticles.length + sharedArticles.length} bài viết</p>
        </div>
        <HeaderActions />
      </div>
      {/* Content */}
      <div className="flex justify-center">
      <main className="flex-1 min-h-screen max-w-[760px]">

        <div>
        <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)' }}>
          <div className="absolute -bottom-16 left-4">
            <div className="w-32 h-32 rounded-full border-4 overflow-hidden" style={{ borderColor: 'var(--bg-primary)', background: 'var(--bg-secondary)' }}>
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="pt-20 px-4 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{currentUser.email}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: roleBadge.bg, color: roleBadge.color }}>{roleBadge.label}</span>
          </div>
          {currentUser.bio && <p className="mt-2 text-sm" style={{ color: 'var(--text-primary)' }}>{currentUser.bio}</p>}
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tham gia {formatDate(currentUser.createdAt)}</span>
          </div>
        </div>

        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="flex-1 py-3 text-sm font-medium relative flex items-center justify-center gap-2"
                style={{ color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                <Icon className="w-4 h-4" />
                {tab.label} ({tab.count})
                {activeTab === tab.key && (
                  <motion.div layoutId="profile-tab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full" style={{ background: '#F97316' }} />
                )}
              </button>
            );
          })}
        </div>

        {displayedArticles.length > 0 ? (
          displayedArticles.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)
        ) : (
          <div className="py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
            <p className="text-lg mb-2">{activeTab === 'shared' ? 'Chưa chia sẻ bài viết nào' : 'Chưa thích bài viết nào'}</p>
            <p className="text-sm">Hãy khám phá và tương tác với các bài viết!</p>
          </div>
        )}
        </div>
      </main>
      <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
