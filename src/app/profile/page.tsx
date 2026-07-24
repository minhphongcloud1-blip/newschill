'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Share2, Calendar, PenSquare, Camera, Image as ImageIcon,
  X, Check, User, Settings, Sun, Moon, LogOut, ChevronRight, Shield,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleCard from '@/components/feed/ArticleCard';
import { mockArticles } from '@/data/articles';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';

const DEFAULT_COVER = 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)';

// ── Edit Image Modal ───────────────────────────────────────
function EditImageModal({
  title, currentUrl, onSave, onClose,
}: { title: string; currentUrl: string; onSave: (url: string) => void; onClose: () => void }) {
  const [url, setUrl] = useState(currentUrl);
  const [preview, setPreview] = useState(currentUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="w-[360px] rounded-2xl p-5 mx-4"
          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-[var(--bg-hover-md)]">
              <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>

          {preview && (
            <div className="rounded-xl overflow-hidden mb-3 border aspect-video" style={{ borderColor: 'var(--border-primary)' }}>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={() => setPreview('')} />
            </div>
          )}

          <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>URL ảnh</label>
          <input
            type="url" value={url}
            onChange={(e) => { setUrl(e.target.value); setPreview(e.target.value); }}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none mb-4"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
            onFocus={(e) => (e.target.style.borderColor = '#F97316')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
            autoFocus
          />
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>Hủy</button>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { onSave(url.trim()); onClose(); }}
              disabled={!url.trim()}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: '#F97316' }}
            >
              <Check className="w-4 h-4" />Lưu
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Settings Bottom Sheet (Mobile only) ───────────────────
function SettingsSheet({
  onClose, currentUser, isDark, toggleTheme, logout, router,
}: {
  onClose: () => void;
  currentUser: { name: string; email: string; avatar: string; role: string };
  isDark: boolean;
  toggleTheme: () => void;
  logout: () => void;
  router: ReturnType<typeof useRouter>;
}) {
  const handleLogout = () => {
    logout();
    router.push('/login');
    onClose();
  };

  const handleAdmin = () => {
    router.push('/admin');
    onClose();
  };

  const isAdmin = currentUser.role === 'admin';

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="settings-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        key="settings-sheet"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border-primary)' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5" style={{ color: '#F97316' }} />
            <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Cài đặt</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[var(--bg-hover-md)]">
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* User info card */}
        <div className="mx-4 mb-3 px-4 py-3 rounded-2xl flex items-center gap-3" style={{ background: 'var(--bg-secondary)' }}>
          <img
            src={currentUser.avatar} alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover shrink-0"
            width={48} height={48}
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{currentUser.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 mb-3 text-xs font-semibold uppercase tracking-widest px-1" style={{ color: 'var(--text-tertiary)' }}>Giao diện</div>

        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-full flex items-center gap-4 px-5 py-3.5 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: isDark ? 'rgba(251,191,36,0.12)' : 'rgba(99,102,241,0.12)' }}>
            {isDark
              ? <Sun className="w-5 h-5" style={{ color: '#FBBF24' }} />
              : <Moon className="w-5 h-5" style={{ color: '#6366F1' }} />
            }
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">{isDark ? 'Chế độ sáng' : 'Chế độ tối'}</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Hiện tại: {isDark ? 'Tối 🌙' : 'Sáng ☀️'}</p>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </motion.button>

        {/* Admin panel (admin only) */}
        {isAdmin && (
          <>
            <div className="mx-4 my-2 h-px" style={{ background: 'var(--border-primary)' }} />
            <div className="mx-4 mb-2 text-xs font-semibold uppercase tracking-widest px-1" style={{ color: 'var(--text-tertiary)' }}>Quản trị</div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAdmin}
              className="w-full flex items-center gap-4 px-5 py-3.5 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.12)' }}>
                <Shield className="w-5 h-5" style={{ color: '#8B5CF6' }} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Admin Panel</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Quản lý bài viết, người dùng</p>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            </motion.button>
          </>
        )}

        {/* Divider */}
        <div className="mx-4 my-2 h-px" style={{ background: 'var(--border-primary)' }} />

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-3.5 mb-2 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)' }}>
            <LogOut className="w-5 h-5" style={{ color: '#EF4444' }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold" style={{ color: '#EF4444' }}>Đăng xuất</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Thoát khỏi tài khoản</p>
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Profile Page ──────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, likes, shares, myArticles, updateProfile, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'myarticles' | 'shared' | 'liked'>(
    currentUser?.role === 'editor' || currentUser?.role === 'admin' ? 'myarticles' : 'shared'
  );
  const [editingCover, setEditingCover] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      router.replace('/login?from=/profile');
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || !currentUser) return null;

  const likedArticles = mockArticles.filter((a) => likes.includes(a.id));
  const sharedArticles = mockArticles.filter((a) => shares.includes(a.id));
  const myWrittenArticles = myArticles.filter((a) => a.author.id === currentUser.id);
  const displayedArticles =
    activeTab === 'myarticles' ? myWrittenArticles :
    activeTab === 'shared' ? sharedArticles :
    likedArticles;

  const roleBadge = {
    admin: { label: '🛡️ Admin', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
    editor: { label: '✍️ Editor', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
    reader: { label: '👤 Reader', color: '#71767B', bg: 'rgba(113,118,123,0.1)' },
  }[currentUser.role];

  const isWriter = currentUser.role === 'editor' || currentUser.role === 'admin';
  const tabs = [
    ...(isWriter ? [{ key: 'myarticles' as const, label: 'Bài viết của tôi', count: myWrittenArticles.length, icon: PenSquare }] : []),
    { key: 'shared' as const, label: 'Đã chia sẻ', count: sharedArticles.length, icon: Share2 },
    { key: 'liked' as const, label: 'Đã thích', count: likedArticles.length, icon: Heart },
  ];

  const handleSave = (field: 'avatar' | 'coverImage', url: string) => {
    updateProfile({ [field]: url });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />

      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          <div>
            {/* ── Page header: title + settings icon (mobile) ── */}
            <header className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" style={{ color: '#F97316' }} />
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Trang cá nhân</h1>
              </div>

              {/* Settings icon — only visible on mobile (lg:hidden) */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setShowSettings(true)}
                className="lg:hidden p-2 rounded-xl relative"
                style={{ background: 'var(--bg-secondary)' }}
                aria-label="Cài đặt"
              >
                <Settings className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                {/* Dot indicator */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#F97316' }} />
              </motion.button>
            </header>

            {/* Cover image */}
            <div className="h-36 relative group">
              {currentUser.coverImage ? (
                <img src={currentUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: DEFAULT_COVER }} />
              )}
              {/* Edit cover button */}
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.35)' }}
                onClick={() => setEditingCover(true)}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <ImageIcon className="w-4 h-4" />Đổi ảnh bìa
                </div>
              </motion.button>

              {/* Avatar */}
              <div className="absolute -bottom-16 left-4">
                <div className="relative group/avatar">
                  <div className="w-32 h-32 rounded-full border-4 overflow-hidden" style={{ borderColor: 'var(--bg-primary)', background: 'var(--bg-secondary)' }}>
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  </div>
                  {/* Edit avatar button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.4)' }}
                    onClick={() => setEditingAvatar(true)}
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Profile info */}
            <div className="pt-20 px-4 pb-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: roleBadge.bg, color: roleBadge.color }}>{roleBadge.label}</span>
              </div>
              {currentUser.bio && <p className="mt-2 text-sm" style={{ color: 'var(--text-primary)' }}>{currentUser.bio}</p>}
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tham gia {formatDate(currentUser.createdAt)}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: 'var(--border-primary)' }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className="flex-1 py-3 text-sm font-medium relative flex items-center justify-center gap-2"
                    style={{ color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label} ({tab.count})
                    {activeTab === tab.key && (
                      <motion.div layoutId="profile-tab" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full" style={{ background: '#F97316' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Articles list */}
            <div>
              {displayedArticles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                    {activeTab === 'myarticles' && <PenSquare className="w-7 h-7" style={{ color: 'var(--text-tertiary)' }} />}
                    {activeTab === 'shared' && <Share2 className="w-7 h-7" style={{ color: 'var(--text-tertiary)' }} />}
                    {activeTab === 'liked' && <Heart className="w-7 h-7" style={{ color: 'var(--text-tertiary)' }} />}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {activeTab === 'myarticles' && 'Bạn chưa viết bài nào.'}
                    {activeTab === 'shared' && 'Bạn chưa chia sẻ bài nào.'}
                    {activeTab === 'liked' && 'Bạn chưa thích bài nào.'}
                  </p>
                </div>
              ) : (
                displayedArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))
              )}
            </div>
          </div>
        </main>
        <RightPanel />
      </div>

      {/* Mobile nav */}
      <MobileNav />

      {/* Modals */}
      {editingCover && (
        <EditImageModal
          title="Đổi ảnh bìa" currentUrl={currentUser.coverImage || ''}
          onSave={(url) => handleSave('coverImage', url)}
          onClose={() => setEditingCover(false)}
        />
      )}
      {editingAvatar && (
        <EditImageModal
          title="Đổi ảnh đại diện" currentUrl={currentUser.avatar}
          onSave={(url) => handleSave('avatar', url)}
          onClose={() => setEditingAvatar(false)}
        />
      )}

      {/* Saved toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full text-sm font-semibold text-white z-50 flex items-center gap-2"
            style={{ background: '#22C55E', boxShadow: '0 4px 20px rgba(34,197,94,0.4)' }}
          >
            <Check className="w-4 h-4" />Đã lưu thay đổi
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Settings Bottom Sheet (mobile) ── */}
      {showSettings && (
        <SettingsSheet
          onClose={() => setShowSettings(false)}
          currentUser={currentUser}
          isDark={isDark}
          toggleTheme={toggleTheme}
          logout={logout}
          router={router}
        />
      )}
    </div>
  );
}
