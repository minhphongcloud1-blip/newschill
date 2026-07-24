'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useArticles } from '@/hooks/useArticles';
import { formatNumber } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { getActiveAds, Advertisement } from '@/data/ads';
import RightPanelSearch from '@/components/layout/RightPanelSearch';

export default function RightPanel() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const { articles } = useArticles();

  useEffect(() => {
    setAds(getActiveAds());
  }, []);

  const trending = useMemo(() =>
    [...articles]
      .sort((a, b) => (b.likesCount + b.commentsCount) - (a.likesCount + a.commentsCount))
      .slice(0, 5),
    [articles]
  );

  return (
    <aside className="w-[320px] shrink-0 max-xl:hidden sticky top-[49px] self-start h-[calc(100vh-49px)] overflow-y-auto pl-4 space-y-4">
        {/* Search */}
        <RightPanelSearch />

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
            <Link key={article.id} href={article.slug ? `/tin-tuc/${article.slug}` : `/article/${article.id}`}>
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
            © 2024 Newschill · Nền tảng tin tức thế hệ mới
          </p>
      </div>
    </aside>
  );
}
