'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Advertisement } from '@/data/ads';

const LS_KEY = 'newsx_ads';

function getLocalAds(): Advertisement[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Advertisement[];
  } catch { return []; }
}

export default function HomeBanner() {
  const [banners, setBanners] = useState<Advertisement[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    // 1. Load tức thì từ localStorage (tránh flash trống)
    const localAds = getLocalAds();
    const localBanners = localAds.filter((ad) => ad.isActive && ad.type === 'banner');
    if (localBanners.length > 0) setBanners(localBanners);

    // 2. Fetch từ Supabase qua API — override nếu có data thật
    fetch('/api/ads')
      .then((r) => r.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data)) {
          // API trả về Supabase data
          const apiBanners = (json.data as Advertisement[]).filter(
            (ad) => ad.isActive && ad.type === 'banner'
          );
          setBanners(apiBanners);
          // Sync localStorage để lần sau load nhanh hơn
          localStorage.setItem(LS_KEY, JSON.stringify(json.data));
        }
        // json.data === null → dùng localStorage đã load ở bước 1
      })
      .catch(() => {
        // API lỗi → giữ localStorage data
      });
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [banners.length, next]);

  if (banners.length === 0) return null;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const banner = banners[current];

  return (
    <div className="w-full border-b" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2/1' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.a
            key={banner.id}
            href={banner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 block"
          >
            <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
            {banner.title && (
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                <p className="text-white font-semibold text-base drop-shadow-md line-clamp-1">{banner.title}</p>
              </div>
            )}
          </motion.a>
        </AnimatePresence>

        {banners.length > 1 && (
          <>
            <button onClick={(e) => { e.preventDefault(); prev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full" style={{ background: 'rgba(0,0,0,0.4)', color: '#fff' }} aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.preventDefault(); next(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full" style={{ background: 'rgba(0,0,0,0.4)', color: '#fff' }} aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {banners.length > 1 && (
          <div className="absolute bottom-3 right-5 z-10 flex items-center gap-1.5">
            {banners.map((_, i) => (
              <button key={i} onClick={(e) => { e.preventDefault(); goTo(i); }} className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? '#F97316' : 'rgba(255,255,255,0.6)' }}
                aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
