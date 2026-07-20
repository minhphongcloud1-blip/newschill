'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleFeed from '@/components/feed/ArticleFeed';
import { useArticles } from '@/hooks/useArticles';
import { useAuth } from '@/contexts/AuthContext';

export default function TopicPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { topics, myArticles } = useAuth();
  const { articles: supaArticles, loading } = useArticles({ topic: slug });

  // Merge supabase articles with user-created articles for this topic
  const articles = useMemo(() => {
    const ids = new Set(supaArticles.map((a) => a.id));
    const myFiltered = myArticles.filter((a) => a.topic.slug === slug && !ids.has(a.id));
    return [...supaArticles, ...myFiltered];
  }, [supaArticles, myArticles, slug]);

  const topic = topics.find((t) => t.slug === slug);

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

      {/* Content — centered, same max-w as feed */}
      <div className="flex justify-center">
        <div className="flex-1 min-w-0 max-w-[760px]">

          {/* Header — same width as content */}
          <div
            className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: '1px solid var(--border-primary)' }}
          >
            <button onClick={() => router.back()} className="p-2 rounded-full shrink-0 hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-primary)' }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{topic.icon} {topic.name}</h1>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{topic.description}</p>
            </div>
          </div>

          <main className="min-h-screen">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#8B5CF6', borderTopColor: 'transparent' }} />
              </div>
            ) : (
              <ArticleFeed articles={articles} />
            )}
          </main>

        </div>{/* end max-w-[760px] */}
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
