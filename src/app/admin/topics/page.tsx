'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check, Hash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Topic } from '@/types';
import { slugify } from '@/lib/utils';

const PRESET_COLORS = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
  '#EF4444', '#06B6D4', '#F97316', '#EC4899',
  '#14B8A6', '#A855F7', '#6366F1', '#84CC16',
];

const PRESET_ICONS = [
  '💻', '🔬', '📈', '⚽', '🎬', '🏥', '🌍', '📚',
  '🎮', '🚀', '🎵', '🍔', '✈️', '🏠', '⚡', '🎨',
  '📱', '🔧', '💡', '🌱', '🎯', '🧠', '💰', '🔥',
];

export default function AdminTopicsPage() {
  const { topics, addTopic, updateTopic, deleteTopic } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formIcon, setFormIcon] = useState('💻');
  const [formDescription, setFormDescription] = useState('');
  const [formColor, setFormColor] = useState('#3B82F6');

  const resetForm = () => {
    setFormName('');
    setFormIcon('💻');
    setFormDescription('');
    setFormColor('#3B82F6');
    setShowForm(false);
    setEditingSlug(null);
  };

  const openEditForm = (topic: Topic) => {
    setFormName(topic.name);
    setFormIcon(topic.icon);
    setFormDescription(topic.description);
    setFormColor(topic.color);
    setEditingSlug(topic.slug);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formName.trim()) return;

    if (editingSlug) {
      updateTopic(editingSlug, {
        name: formName,
        icon: formIcon,
        description: formDescription,
        color: formColor,
      });
    } else {
      const newTopic: Topic = {
        slug: slugify(formName),
        name: formName,
        icon: formIcon,
        description: formDescription,
        color: formColor,
        articleCount: 0,
      };
      addTopic(newTopic);
    }
    resetForm();
  };

  const handleDelete = (slug: string) => {
    deleteTopic(slug);
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Cấu hình Chủ đề</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {topics.length} chủ đề · Quản lý danh sách chủ đề cho bài viết
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
        >
          <Plus className="w-4 h-4" /> Thêm chủ đề
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingSlug ? '✏️ Sửa chủ đề' : '➕ Thêm chủ đề mới'}
                </h2>
                <button onClick={resetForm} className="p-1.5 rounded-lg hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Tên chủ đề</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ví dụ: Công nghệ"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Mô tả</label>
                  <input
                    type="text"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Mô tả ngắn về chủ đề..."
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>

                {/* Icon picker */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    Icon <span className="text-lg ml-1">{formIcon}</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_ICONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setFormIcon(icon)}
                        className="w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all border"
                        style={{
                          borderColor: formIcon === icon ? '#8B5CF6' : 'var(--border-primary)',
                          background: formIcon === icon ? 'rgba(139,92,246,0.15)' : 'transparent',
                        }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color picker */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    Màu sắc <span className="inline-block w-3 h-3 rounded-full ml-1" style={{ background: formColor }} />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setFormColor(color)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all border-2"
                        style={{
                          background: `${color}30`,
                          borderColor: formColor === color ? color : 'transparent',
                        }}
                      >
                        <div className="w-5 h-5 rounded-full" style={{ background: color }} />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tùy chỉnh:</label>
                    <input
                      type="color"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{formColor}</span>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {formName && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>XEM TRƯỚC</label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${formColor}20` }}
                    >
                      {formIcon}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{formName}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formDescription || 'Chưa có mô tả'}</p>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${formColor}20`, color: formColor }}
                    >
                      {formIcon} {formName}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
                >
                  Hủy
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={!formName.trim()}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-40"
                  style={{ background: '#8B5CF6' }}
                >
                  {editingSlug ? 'Cập nhật' : 'Thêm chủ đề'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-2xl border group relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${topic.color}08, #16181C)`,
              borderColor: 'var(--border-primary)',
            }}
          >
            {/* Color accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: topic.color }} />

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${topic.color}15` }}
                >
                  {topic.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{topic.name}</h3>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                    {topic.description || 'Chưa có mô tả'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditForm(topic)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                  title="Sửa"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(topic.slug)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                  style={{ color: '#EF4444' }}
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#2F333680' }}>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${topic.color}20`, color: topic.color }}>
                {topic.articleCount} bài viết
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                /{topic.slug}
              </span>
            </div>

            {/* Delete confirm overlay */}
            <AnimatePresence>
              {deleteConfirm === topic.slug && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
                >
                  <div className="text-center p-4">
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                      Xóa chủ đề <strong>{topic.name}</strong>?
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                        style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleDelete(topic.slug)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                        style={{ background: '#EF4444' }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
          <Hash className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg mb-2">Chưa có chủ đề nào</p>
          <p className="text-sm">Nhấn &quot;Thêm chủ đề&quot; để bắt đầu</p>
        </div>
      )}
    </div>
  );
}
