'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, Users, FileText, ArrowLeft, Hash, Sun, Moon, Image } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  if (!currentUser || currentUser.role !== 'admin') {
    router.push('/');
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/users', label: 'Quản lý Users', icon: Users },
    { href: '/admin/articles', label: 'Quản lý Bài viết', icon: FileText },
    { href: '/admin/topics', label: 'Cấu hình Chủ đề', icon: Hash },
    { href: '/admin/ads', label: 'Quảng cáo', icon: Image },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[260px] flex flex-col border-r p-4 max-md:hidden z-40"
        style={{ background: 'var(--bg-glass)', backdropFilter: 'var(--glass-blur-heavy)', WebkitBackdropFilter: 'var(--glass-blur-heavy)', borderColor: 'var(--border-glass)' }}
      >
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                News<span style={{ color: '#F97316' }}>X</span>
              </span>
              <p className="text-[10px] font-medium" style={{ color: '#8B5CF6' }}>ADMIN PANEL</p>
            </div>
          </Link>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && pathname !== '/admin';
            const Icon = item.icon;
            const finalActive = item.exact ? pathname === item.href : isActive;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{
                    background: finalActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                    color: finalActive ? '#8B5CF6' : 'var(--text-primary)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className={`text-sm ${finalActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-2 w-full text-left"
          style={{ color: 'var(--text-primary)' }}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="text-sm font-medium">{isDark ? 'Chế độ sáng' : 'Chế độ tối'}</span>
        </motion.button>

        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Quay lại NewsX</span>
          </div>
        </Link>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-[260px] min-h-screen">
        <div className="md:hidden sticky top-0 z-30 px-4 py-3 border-b flex items-center justify-between"
          style={{ background: 'var(--bg-overlay-heavy)', backdropFilter: 'blur(12px)', borderColor: 'var(--border-primary)' }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: '#8B5CF6' }} />
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Admin</span>
          </div>
          <Link href="/" className="text-sm" style={{ color: '#F97316' }}>← Quay lại</Link>
        </div>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
