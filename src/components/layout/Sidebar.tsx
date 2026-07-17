'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Flame,
  Home,
  TrendingUp,
  Hash,
  User,
  PenSquare,
  Shield,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const navItems = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/trending', label: 'Xu hướng', icon: TrendingUp },
    { href: '/topics', label: 'Chủ đề', icon: Hash },
    { href: '/profile', label: 'Trang cá nhân', icon: User },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[275px] flex flex-col justify-between p-4 border-r max-lg:hidden z-40"
      style={{ background: 'var(--bg-glass)', backdropFilter: 'var(--glass-blur-heavy)', WebkitBackdropFilter: 'var(--glass-blur-heavy)', borderColor: 'var(--border-glass)' }}
    >
      {/* Top section */}
      <div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 px-3 py-2 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <Flame className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            News<span style={{ color: '#F97316' }}>X</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl relative"
                  style={{
                    background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                    color: isActive ? '#F97316' : 'var(--text-primary)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                      style={{ background: '#F97316' }}
                    />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className={`text-[15px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}

          {/* Editor: Write article */}
          {currentUser && (currentUser.role === 'editor' || currentUser.role === 'admin') && (
            <Link href="/article/create">
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-4 py-3 rounded-xl"
                style={{
                  background: pathname === '/article/create' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: pathname === '/article/create' ? '#3B82F6' : 'var(--text-primary)',
                }}
              >
                <PenSquare className="w-5 h-5" />
                <span className="text-[15px] font-medium">Viết bài</span>
              </motion.div>
            </Link>
          )}

          {/* Admin panel */}
          {currentUser?.role === 'admin' && (
            <Link href="/admin">
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-4 py-3 rounded-xl"
                style={{
                  background: pathname.startsWith('/admin') ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  color: pathname.startsWith('/admin') ? '#8B5CF6' : 'var(--text-primary)',
                }}
              >
                <Shield className="w-5 h-5" />
                <span className="text-[15px] font-medium">Admin</span>
              </motion.div>
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}
