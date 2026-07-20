'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import { useAuth } from '@/contexts/AuthContext';

export default function TopicsListClient() {
  const { topics } = useAuth();

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />
      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          {/* Page title */}
          <div className="flex items-center gap-2 px-4 py-4">
            <Hash className="w-5 h-5" style={{ color: '#F97316' }} />
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Chủ đề</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 pb-4">
            {topics.map((topic, i) => (
              <Link key={topic.slug} href={`/topic/${topic.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-2xl border cursor-pointer"
                  style={{ borderColor: 'var(--border-primary)', background: `linear-gradient(135deg, ${topic.color}18, var(--bg-glass-strong))` }}
                >
                  {/* Color accent bar */}
                  <div className="w-8 h-1 rounded-full mb-3" style={{ background: topic.color }} />
                  <div className="text-3xl mb-2">{topic.icon}</div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{topic.name}</h3>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{topic.description}</p>
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
