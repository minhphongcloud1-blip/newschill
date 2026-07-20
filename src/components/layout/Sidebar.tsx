'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Flame, Home, Hash, User,
  PenSquare, Shield, LogOut, Sun, Moon, Crown, Lock,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import UpgradeModal from '@/components/subscription/UpgradeModal';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isWriter = currentUser?.role === 'editor' || currentUser?.role === 'admin';
  const isReader = currentUser?.role === 'reader';
  const isPro = currentUser?.plan === 'pro';
  const isPendingPro = currentUser?.plan === 'pending_pro';
  const isAdmin = currentUser?.role === 'admin';

  const handleLogout = () => { logout(); router.push('/login'); };

  const handleWriteClick = () => {
    if (!currentUser) { router.push('/login'); return; }
    if (isPendingPro) {
      alert('⏳ Yêu cầu của bạn đang chờ admin duyệt. Vui lòng đợi!');
      return;
    }
    if (isReader) { setShowUpgrade(true); return; }
    router.push('/article/create');
  };

  const mainNav = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/topics', label: 'Chủ đề', icon: Hash },
    { href: '/profile', label: 'Cá nhân', icon: User },
  ];

  function NavItem({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: React.ElementType; isActive: boolean }) {
    return (
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl relative"
          style={{
            color: isActive ? '#F97316' : 'var(--text-primary)',
          }}
        >
          {isActive && (
            <motion.div layoutId="sidebar-active"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full"
              style={{ background: '#F97316' }}
            />
          )}
          <Icon className="w-5 h-5 shrink-0" />
          <span className={`text-[15px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </motion.div>
      </Link>
    );
  }

  return (
    <>
      <aside
        className="fixed left-0 top-0 h-screen w-[260px] flex flex-col p-3 max-lg:hidden z-40"
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* TOP: Logo */}
        <Link href="/" className="flex items-center gap-2.5 px-3 py-3 shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            News<span style={{ color: '#F97316' }}>X</span>
          </span>
        </Link>

        {/* MIDDLE: Nav — vertically centered */}
        <nav className="flex-1 flex flex-col justify-center space-y-0.5 py-4">
          {mainNav.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)}
            />
          ))}

          {/* Viết bài */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWriteClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left"
            style={{
              background: 'transparent',
              color: pathname === '/article/create'
                ? '#3B82F6'
                : (isReader || isPendingPro)
                  ? 'var(--text-secondary)'
                  : 'var(--text-primary)',
            }}
          >
            <PenSquare className="w-5 h-5 shrink-0" />
            <span className="text-[15px] font-medium flex-1">Viết bài</span>
            {isPendingPro && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>⏳</span>
            )}
            {isReader && (
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(249,115,22,0.12)', color: '#F97316' }}>
                <Lock className="w-2.5 h-2.5" />Pro
              </span>
            )}
          </motion.button>

          {/* Divider */}
          <div className="my-2 mx-1" style={{ borderTop: '1px solid var(--border-primary)' }} />

          {/* Admin */}
          {isAdmin && (
            <NavItem
              href="/admin"
              label="Admin"
              icon={Shield}
              isActive={pathname.startsWith('/admin')}
            />
          )}

          {/* Chế độ tối */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isDark ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
            <span className="text-[15px] font-medium">{isDark ? 'Chế độ sáng' : 'Chế độ tối'}</span>
          </motion.button>
        </nav>

        {/* BOTTOM: User info — pinned */}
        <div className="shrink-0 pt-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
          {currentUser ? (
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <div className="relative shrink-0">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                {(isPro || isWriter) && currentUser.role !== 'admin' && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#F97316' }}>
                    <Crown className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                  {isAdmin ? '🛡️ Admin' : isPro || isWriter ? '👑 Pro' : isPendingPro ? '⏳ Chờ duyệt' : '👤 Free'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors shrink-0"
                style={{ color: '#EF4444' }}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: '#F97316', color: '#fff' }}
              >
                <User className="w-5 h-5" />
                <span className="text-[15px] font-semibold">Đăng nhập</span>
              </motion.div>
            </Link>
          )}
        </div>
      </aside>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </>
  );
}
