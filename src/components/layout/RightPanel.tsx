'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import { mockArticles } from '@/data/articles';
import { formatNumber } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getActiveAds, Advertisement } from '@/data/ads';

export default function RightPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    setAds(getActiveAds());
  }, []);

  const trending = [...mockArticles]
    .sort((a, b) => (b.likesCount + b.commentsCount) - (a.likesCount + a.commentsCount))
    .slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside className="w-[320px] shrink-0 max-xl:hidden sticky top-[49px] self-start h-[calc(100vh-49px)] overflow-y-auto pl-4 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tin tức..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm focus:outline-none"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
            onFocus={(e) => (e.target.style.borderColor = '#F97316')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
          />
        </form>

        {/* Trending */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'transparent', border: '1px solid var(--border-primary)' }}
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: '#F97316' }} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Xu hướng</h2>
            </div>
            <Link href="/trending" className="text-xs font-medium" style={{ color: '#F97316' }}>Xem thêm</Link>
          </div>
          {trending.map((article, i) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <motion.div
                whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                className="px-4 py-3 border-t cursor-pointer"
                style={{ borderColor: 'var(--border-primary)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {article.topic.icon} {article.topic.name} · Xu hướng
                    </p>
                    <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                      {article.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {formatNumber(article.likesCount + article.commentsCount)} lượt tương tác
                    </p>
                  </div>
                  <span className="text-lg font-bold shrink-0" style={{ color: 'var(--border-light)' }}>
                    {i + 1}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}

        </div>

        {/* Advertisements */}
        {ads.length > 0 && (
          <div className="space-y-3">
            {ads.map((ad) => (
              <a
                key={ad.id}
                href={ad.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl overflow-hidden cursor-pointer relative"
                  style={{ border: '1px solid var(--border-primary)' }}
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full object-cover"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium"
                    style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    Quảng cáo
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="px-2">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © 2024 NewsX · Nền tảng tin tức thế hệ mới
          </p>
      </div>
    </aside>
  );
}
