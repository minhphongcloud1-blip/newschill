'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import { mockTopics } from '@/data/topics';
import HeaderActions from '@/components/layout/HeaderActions';

export default function TopicsListPage() {
  const router = useRouter();

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
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Chủ đề</h1>
        <HeaderActions />
      </div>
      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockTopics.map((topic, i) => (
              <Link key={topic.slug} href={`/topic/${topic.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-2xl border cursor-pointer"
                  style={{ borderColor: 'var(--border-primary)', background: `linear-gradient(135deg, ${topic.color}10, var(--bg-glass-strong))` }}
                >
                  <div className="text-3xl mb-2">{topic.icon}</div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{topic.name}</h3>
                  <p className="text-xs line-clamp-2 mb-2" style={{ color: 'var(--text-secondary)' }}>{topic.description}</p>
                  <p className="text-xs" style={{ color: topic.color }}>{topic.articleCount} bài viết</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </main>
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
