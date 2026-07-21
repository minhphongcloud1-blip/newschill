'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Calendar, PenSquare, Camera, Image as ImageIcon, X, Check, Pencil, User } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import ArticleCard from '@/components/feed/ArticleCard';
import { mockArticles } from '@/data/articles';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';

const DEFAULT_COVER = 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)';

function EditImageModal({
  title,
  currentUrl,
  onSave,
  onClose,
}: {
  title: string;
  currentUrl: string;
  onSave: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(currentUrl);
  const [preview, setPreview] = useState(currentUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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

          {/* Preview */}
          {preview && (
            <div className="rounded-xl overflow-hidden mb-3 border aspect-video" style={{ borderColor: 'var(--border-primary)' }}>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={() => setPreview('')} />
            </div>
          )}

          <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
            URL ảnh
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setPreview(e.target.value); }}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none mb-4"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
            onFocus={(e) => (e.target.style.borderColor = '#F97316')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
            autoFocus
          />

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
              Hủy
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { onSave(url.trim()); onClose(); }}
              disabled={!url.trim()}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: '#F97316' }}
            >
              <Check className="w-4 h-4" />
              Lưu
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, likes, shares, myArticles, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'myarticles' | 'shared' | 'liked'>(
    currentUser?.role === 'editor' || currentUser?.role === 'admin' ? 'myarticles' : 'shared'
  );
  const [editingCover, setEditingCover] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);

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
            {/* Inline page title */}
            <div className="flex items-center gap-2 px-4 py-4">
              <User className="w-5 h-5" style={{ color: '#F97316' }} />
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Trang cá nhân</h1>
            </div>

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
                  <ImageIcon className="w-4 h-4" />
                  Đổi ảnh bìa
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

            {/* Articles */}
            {displayedArticles.length > 0 ? (
              displayedArticles.map((article, i) => (
                <div key={article.id} className="relative">
                  <ArticleCard article={article} index={i} />
                  {/* Edit button overlay for own articles */}
                  {activeTab === 'myarticles' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/article/edit/${article.id}`)}
                      className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ borderColor: 'var(--border-primary)', color: 'var(--text-primary)', background: 'var(--bg-primary)', zIndex: 10 }}
                    >
                      <Pencil className="w-3 h-3" />
                      Sửa
                    </motion.button>
                  )}
                </div>
              ))
            ) : (
              <div className="py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
                <p className="text-lg mb-2">
                  {activeTab === 'myarticles' ? 'Chưa có bài viết nào' :
                   activeTab === 'shared' ? 'Chưa chia sẻ bài viết nào' : 'Chưa thích bài viết nào'}
                </p>
                <p className="text-sm">Hãy khám phá và tương tác với các bài viết!</p>
              </div>
            )}
          </div>
        </main>
        <RightPanel />
      </div>
      <MobileNav />

      {/* Modals */}
      {editingCover && (
        <EditImageModal
          title="Đổi ảnh bìa"
          currentUrl={currentUser.coverImage || ''}
          onSave={(url) => handleSave('coverImage', url)}
          onClose={() => setEditingCover(false)}
        />
      )}
      {editingAvatar && (
        <EditImageModal
          title="Đổi ảnh đại diện"
          currentUrl={currentUser.avatar || ''}
          onSave={(url) => handleSave('avatar', url)}
          onClose={() => setEditingAvatar(false)}
        />
      )}

      {/* Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium z-50 flex items-center gap-2"
            style={{ background: '#00BA7C', color: '#fff' }}
          >
            <Check className="w-4 h-4" />
            Đã lưu thành công
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
