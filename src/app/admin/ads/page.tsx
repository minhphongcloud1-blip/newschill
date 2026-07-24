'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, ExternalLink, Eye, EyeOff, Image, Link, Save, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Advertisement } from '@/data/ads';

async function fetchAdsFromServer(): Promise<Advertisement[]> {
  const res = await fetch('/api/ads', { cache: 'no-store' });
  const json = await res.json();
  return json.data ?? [];
}

async function saveAdsToServer(ads: Advertisement[]): Promise<void> {
  await fetch('/api/ads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ads }),
  });
}

function generateId() {
  return 'ad-' + Date.now().toString(36);
}

const EMPTY_AD: Advertisement = { id: '', imageUrl: '', linkUrl: '', title: '', isActive: true, type: 'banner' };

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [editing, setEditing] = useState<Advertisement | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const loadAds = useCallback(async () => {
    setLoading(true);
    const data = await fetchAdsFromServer();
    setAds(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadAds(); }, [loadAds]);

  const persistAds = async (updated: Advertisement[]) => {
    setAds(updated);
    setSaving(true);
    setSavedOk(false);
    try {
      await saveAdsToServer(updated);
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    let updated: Advertisement[];
    if (isNew) {
      updated = [...ads, { ...editing, id: generateId() }];
    } else {
      updated = ads.map((a) => (a.id === editing.id ? editing : a));
    }
    await persistAds(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    const updated = ads.filter((a) => a.id !== id);
    await persistAds(updated);
    setDeleteConfirm(null);
  };

  const handleToggle = async (id: string) => {
    const updated = ads.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a));
    await persistAds(updated);
  };

  const handleNew = () => {
    setEditing({ ...EMPTY_AD });
    setIsNew(true);
  };

  return (
    <div className="p-6">
      {/* Header — same as admin/topics & admin/users */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Quản lý Quảng cáo</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {ads.length} quảng cáo · Cấu hình banner trang chủ và Right Panel
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
        >
          <Plus className="w-4 h-4" />
          Thêm quảng cáo
        </motion.button>
      </div>

      {/* Edit / Add Form */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div
              className="p-5 rounded-2xl border"
              style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {isNew ? '➕ Thêm quảng cáo mới' : '✏️ Chỉnh sửa quảng cáo'}
                </h2>
                <button
                  onClick={() => { setEditing(null); setIsNew(false); }}
                  className="p-1.5 rounded-lg hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left col */}
                <div className="space-y-4">
                  {/* Type */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Loại banner</label>
                    <div className="flex gap-2">
                      {(['banner', 'sidebar'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setEditing({ ...editing!, type: t })}
                          className="flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all"
                          style={{
                            background: editing?.type === t
                              ? (t === 'banner' ? 'rgba(249,115,22,0.15)' : 'rgba(139,92,246,0.15)')
                              : 'transparent',
                            borderColor: editing?.type === t
                              ? (t === 'banner' ? '#F97316' : '#8B5CF6')
                              : 'var(--border-primary)',
                            color: editing?.type === t
                              ? (t === 'banner' ? '#F97316' : '#8B5CF6')
                              : 'var(--text-secondary)',
                          }}
                        >
                          {t === 'banner' ? '🖼️ Banner trang chủ' : '📰 Right Panel'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Tên quảng cáo</label>
                    <input
                      type="text"
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                      placeholder="VD: Banner tháng 7"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                      onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                      <Image className="w-3.5 h-3.5" /> URL hình ảnh
                    </label>
                    <input
                      type="text"
                      value={editing.imageUrl}
                      onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                      placeholder="https://example.com/banner.jpg"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                      onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                    />
                  </div>

                  {/* Link URL */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                      <Link className="w-3.5 h-3.5" /> URL liên kết khi click
                    </label>
                    <input
                      type="text"
                      value={editing.linkUrl}
                      onChange={(e) => setEditing({ ...editing, linkUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                      onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                    />
                  </div>
                </div>

                {/* Right col — Preview */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Xem trước</label>
                  <div
                    className="flex-1 rounded-xl border overflow-hidden flex items-center justify-center"
                    style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-secondary)', minHeight: 140 }}
                  >
                    {editing.imageUrl ? (
                      <img src={editing.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center" style={{ color: 'var(--text-tertiary)' }}>
                        <Image className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-xs">Nhập URL hình ảnh để xem trước</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => { setEditing(null); setIsNew(false); }}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
                >
                  Hủy
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={!editing.title || !editing.imageUrl || !editing.linkUrl}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-40"
                  style={{ background: '#F97316' }}
                >
                  <Save className="w-4 h-4" />
                  {isNew ? 'Thêm' : 'Cập nhật'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ads Table */}
      {ads.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
          <p className="text-4xl mb-3">🖼️</p>
          <p className="font-medium">Chưa có quảng cáo nào</p>
          <p className="text-sm mt-1">Nhấn &quot;Thêm quảng cáo&quot; để bắt đầu</p>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Hình ảnh</th>
                  <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Tên / Liên kết</th>
                  <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Loại</th>
                  <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Trạng thái</th>
                  <th className="text-right py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad, i) => (
                  <motion.tr
                    key={ad.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: '1px solid var(--border-primary)', opacity: ad.isActive ? 1 : 0.5 }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Thumbnail */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border shrink-0" style={{ borderColor: 'var(--border-primary)' }}>
                        {ad.imageUrl ? (
                          <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                            <Image className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Name + link */}
                    <td className="py-3 px-4">
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{ad.title}</p>
                      <a
                        href={ad.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 hover:underline max-w-[260px] truncate"
                        style={{ color: '#F97316' }}
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{ad.linkUrl || '—'}</span>
                      </a>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: ad.type === 'banner' ? 'rgba(249,115,22,0.1)' : 'rgba(139,92,246,0.1)',
                          color: ad.type === 'banner' ? '#F97316' : '#8B5CF6',
                        }}
                      >
                        {ad.type === 'banner' ? '🖼️ Banner' : '📰 Right Panel'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: ad.isActive ? 'rgba(0,186,124,0.1)' : 'rgba(113,118,123,0.1)',
                          color: ad.isActive ? '#00BA7C' : 'var(--text-tertiary)',
                        }}
                      >
                        {ad.isActive ? '● Hiển thị' : '○ Ẩn'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggle(ad.id)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-md)] transition-colors"
                          title={ad.isActive ? 'Ẩn' : 'Hiện'}
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {ad.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => { setEditing(ad); setIsNew(false); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-md)] transition-colors"
                          title="Chỉnh sửa"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(ad.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Xóa"
                          style={{ color: '#EF4444' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-2xl border max-w-sm w-full"
              style={{ background: 'var(--bg-glass-strong)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
            >
              <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Xóa quảng cáo?</p>
              <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>Hành động này không thể hoàn tác.</p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: '#EF4444' }}
                >
                  Xóa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
