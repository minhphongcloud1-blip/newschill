'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Hash, PenSquare, TrendingUp, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UpgradeModal from '@/components/subscription/UpgradeModal';

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;

        // Threshold 6px để tránh flicker nhỏ
        if (Math.abs(diff) > 6) {
          setVisible(diff < 0 || currentY < 10); // scroll down → ẩn; scroll up → hiện
          lastScrollY.current = currentY;
        }
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset về visible khi chuyển trang
  useEffect(() => {
    setVisible(true);
    lastScrollY.current = 0;
  }, [pathname]);

  const isReader = currentUser?.role === 'reader';

  const handleWriteClick = () => {
    if (!currentUser) { router.push('/login'); return; }
    if (isReader) { setShowUpgrade(true); return; }
    router.push('/article/create');
  };

  const isWriteActive = pathname === '/article/create';
  const isHomeActive = pathname === '/';

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="mobile-nav"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }}
            className="fixed bottom-0 left-0 right-0 border-t lg:hidden z-50"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'var(--glass-blur-heavy)',
              WebkitBackdropFilter: 'var(--glass-blur-heavy)',
              borderColor: 'var(--border-glass)',
            }}
          >
            <div className="flex items-center justify-around py-1.5">
              {/* Logo → Trang chủ */}
              <Link href="/" className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: isHomeActive ? 'linear-gradient(135deg,#F97316,#EA580C)' : 'transparent' }}
                >
                  <Flame
                    className="w-5 h-5"
                    style={{ color: isHomeActive ? '#fff' : 'var(--text-secondary)' }}
                    strokeWidth={isHomeActive ? 2.5 : 2}
                  />
                </div>
              </Link>

              {/* Chủ đề */}
              <Link href="/topics" className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg">
                <Hash
                  className="w-6 h-6"
                  style={{ color: pathname.startsWith('/topic') ? '#F97316' : 'var(--text-secondary)' }}
                  strokeWidth={pathname.startsWith('/topic') ? 2.5 : 2}
                />
                <span className="text-[10px]" style={{ color: pathname.startsWith('/topic') ? '#F97316' : 'var(--text-secondary)' }}>
                  Chủ đề
                </span>
              </Link>

              {/* Viết bài — center button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleWriteClick}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg relative"
              >
                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: isWriteActive
                        ? 'linear-gradient(135deg,#3B82F6,#2563EB)'
                        : 'linear-gradient(135deg,#F97316,#EA580C)',
                    }}
                  >
                    <PenSquare className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  {isReader && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center text-[7px] font-bold" style={{ background: '#F97316' }}>
                      🔒
                    </span>
                  )}
                </div>
              </motion.button>

              {/* Xu hướng */}
              <Link href="/trending" className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg">
                <TrendingUp
                  className="w-6 h-6"
                  style={{ color: pathname.startsWith('/trending') ? '#F97316' : 'var(--text-secondary)' }}
                  strokeWidth={pathname.startsWith('/trending') ? 2.5 : 2}
                />
                <span className="text-[10px]" style={{ color: pathname.startsWith('/trending') ? '#F97316' : 'var(--text-secondary)' }}>
                  Xu hướng
                </span>
              </Link>

              {/* Cá nhân */}
              <Link href="/profile" className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg">
                <User
                  className="w-6 h-6"
                  style={{ color: pathname.startsWith('/profile') ? '#F97316' : 'var(--text-secondary)' }}
                  strokeWidth={pathname.startsWith('/profile') ? 2.5 : 2}
                />
                <span className="text-[10px]" style={{ color: pathname.startsWith('/profile') ? '#F97316' : 'var(--text-secondary)' }}>
                  Cá nhân
                </span>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </>
  );
}
