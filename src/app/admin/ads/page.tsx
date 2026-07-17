'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, ExternalLink, Eye, EyeOff, Image, Link, Save, X } from 'lucide-react';
import { getAds, saveAds, Advertisement } from '@/data/ads';

function generateId() {
  return 'ad-' + Date.now().toString(36);
}

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [editing, setEditing] = useState<Advertisement | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setAds(getAds());
  }, []);

  const handleSave = () => {
    if (!editing) return;
    let updated: Advertisement[];
    if (isNew) {
      updated = [...ads, { ...editing, id: generateId() }];
    } else {
      updated = ads.map((a) => (a.id === editing.id ? editing : a));
    }
    setAds(updated);
    saveAds(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    const updated = ads.filter((a) => a.id !== id);
    setAds(updated);
    saveAds(updated);
  };

  const handleToggle = (id: string) => {
    const updated = ads.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a));
    setAds(updated);
    saveAds(updated);
  };

  const handleNew = () => {
    setEditing({ id: '', imageUrl: '', linkUrl: '', title: '', isActive: true });
    setIsNew(true);
  };

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Quản lý Quảng cáo</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Cấu hình banner quảng cáo hiển thị ở Right Panel
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
        >
          <Plus className="w-4 h-4" />
          Thêm quảng cáo
        </motion.button>
      </div>

      {/* Edit Form */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border p-5 mb-6"
            style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {isNew ? '➕ Thêm quảng cáo mới' : '✏️ Chỉnh sửa quảng cáo'}
              </h2>
              <button onClick={() => { setEditing(null); setIsNew(false); }}>
                <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                  Tên quảng cáo
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="VD: Banner tháng 7"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Image className="w-3.5 h-3.5" /> URL hình ảnh
                </label>
                <input
                  type="text"
                  value={editing.imageUrl}
                  onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Link className="w-3.5 h-3.5" /> URL liên kết khi click
                </label>
                <input
                  type="text"
                  value={editing.linkUrl}
                  onChange={(e) => setEditing({ ...editing, linkUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                />
              </div>

              {/* Preview */}
              {editing.imageUrl && (
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Xem trước</label>
                  <div className="rounded-xl overflow-hidden border max-w-[280px]" style={{ borderColor: 'var(--border-primary)' }}>
                    <img src={editing.imageUrl} alt="preview" className="w-full object-cover" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => { setEditing(null); setIsNew(false); }}
                  className="px-4 py-2 rounded-xl text-sm border"
                  style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
                >
                  Hủy
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={!editing.title || !editing.imageUrl || !editing.linkUrl}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-40"
                  style={{ background: '#F97316' }}
                >
                  <Save className="w-4 h-4" />
                  Lưu
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ads list */}
      <div className="space-y-4">
        {ads.length === 0 && (
          <div className="py-12 text-center rounded-2xl border" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
            <p className="text-4xl mb-3">🖼️</p>
            <p className="font-medium">Chưa có quảng cáo nào</p>
            <p className="text-sm mt-1">Nhấn &quot;Thêm quảng cáo&quot; để bắt đầu</p>
          </div>
        )}
        {ads.map((ad, i) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border overflow-hidden flex gap-4 p-4"
            style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)', opacity: ad.isActive ? 1 : 0.5 }}
          >
            {/* Thumbnail */}
            <div className="w-28 h-20 rounded-xl overflow-hidden border shrink-0" style={{ borderColor: 'var(--border-primary)' }}>
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                  <Image className="w-6 h-6" style={{ color: 'var(--text-tertiary)' }} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{ad.title}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: ad.isActive ? 'rgba(0,186,124,0.1)' : 'rgba(113,118,123,0.1)',
                    color: ad.isActive ? '#00BA7C' : 'var(--text-tertiary)',
                  }}
                >
                  {ad.isActive ? '● Đang hiển thị' : '○ Ẩn'}
                </span>
              </div>
              <p className="text-xs truncate mb-1" style={{ color: 'var(--text-tertiary)' }}>
                🖼️ {ad.imageUrl || '—'}
              </p>
              <a
                href={ad.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-1 hover:underline"
                style={{ color: '#F97316' }}
              >
                <ExternalLink className="w-3 h-3" />
                {ad.linkUrl || '—'}
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleToggle(ad.id)}
                className="p-2 rounded-lg hover:bg-[var(--bg-hover-md)]"
                title={ad.isActive ? 'Ẩn' : 'Hiện'}
                style={{ color: 'var(--text-secondary)' }}
              >
                {ad.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => { setEditing(ad); setIsNew(false); }}
                className="p-2 rounded-lg hover:bg-[var(--bg-hover-md)]"
                title="Chỉnh sửa"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(ad.id)}
                className="p-2 rounded-lg hover:bg-red-500/10"
                title="Xóa"
                style={{ color: '#EF4444' }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
