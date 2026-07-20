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
import { useAuth } from '@/contexts/AuthContext';

export default function TopicPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { topics, myArticles } = useAuth();
  const allArticles = useMemo(() => {
    const ids = new Set(mockArticles.map((a) => a.id));
    return [...mockArticles, ...myArticles.filter((a) => !ids.has(a.id))];
  }, [myArticles]);
  const topic = topics.find((t) => t.slug === slug);
  const articles = useMemo(() => allArticles.filter((a) => a.topic.slug === slug), [allArticles, slug]);

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
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-primary)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{topic.icon} {topic.name}</h1>
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
          </motion.div>
          <ArticleFeed articles={articles} />
        </main>
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
