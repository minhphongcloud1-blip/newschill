'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { mockArticles } from '@/data/articles';
import { mockTopics } from '@/data/topics';
import HeaderActions from '@/components/layout/HeaderActions';

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const topic = mockTopics.find((t) => t.slug === slug);
  const articles = useMemo(() => mockArticles.filter((a) => a.topic.slug === slug), [slug]);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Không tìm thấy chủ đề</p>
      </div>
    );
  }

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
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{topic.icon} {topic.name}</h1>
        <HeaderActions />
      </div>
      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-6 border-b"
            style={{ borderColor: 'var(--border-primary)', background: `linear-gradient(135deg, ${topic.color}15, transparent)` }}
          >
            <div className="text-4xl mb-2">{topic.icon}</div>
            <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{topic.name}</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{topic.description}</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{articles.length}</strong> bài viết
            </p>
          </motion.div>
          <ArticleFeed articles={articles} />
        </main>
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
