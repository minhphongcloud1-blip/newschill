'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sun, Moon, LogOut, ChevronDown, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function HeaderActions() {
  const { currentUser, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      {/* Theme toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="p-2 rounded-full"
        style={{ color: 'var(--text-secondary)' }}
        title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* User menu */}
      {currentUser ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[var(--bg-hover-md)]"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full"
              style={{ background: 'var(--border-primary)' }}
            />
            <span className="text-sm font-medium max-sm:hidden" style={{ color: 'var(--text-primary)' }}>
              {currentUser.name}
            </span>
            <ChevronDown className="w-4 h-4 max-sm:hidden" style={{ color: 'var(--text-secondary)' }} />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl p-2 z-50"
                style={{ background: 'var(--bg-glass-strong)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-glass)', backdropFilter: 'var(--glass-blur)' }}
              >
                <div className="px-3 py-2 mb-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                  <span className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full"
                    style={{
                      background: currentUser.role === 'admin' ? 'rgba(139,92,246,0.1)' : currentUser.role === 'editor' ? 'rgba(59,130,246,0.1)' : 'rgba(113,118,123,0.1)',
                      color: currentUser.role === 'admin' ? '#8B5CF6' : currentUser.role === 'editor' ? '#3B82F6' : 'var(--text-secondary)',
                    }}
                  >
                    {currentUser.role === 'admin' ? '🛡️ Admin' : currentUser.role === 'editor' ? '✍️ Editor' : '👤 Reader'}
                  </span>
                </div>
                <div className="border-t my-1" style={{ borderColor: 'var(--border-primary)' }} />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm hover:bg-[var(--bg-hover-md)]"
                  style={{ color: '#EF4444' }}
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link href="/login">
          <button
            className="flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-sm text-white"
            style={{ background: '#F97316' }}
          >
            <User className="w-4 h-4" />
            Đăng nhập
          </button>
        </Link>
      )}
    </div>
  );
}
