'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Image as ImageIcon, Send } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import { useAuth } from '@/contexts/AuthContext';

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { currentUser, isAuthenticated, myArticles, updateArticle, getArticle, topics } = useAuth();

  const article = getArticle(id);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [topicSlug, setTopicSlug] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      router.push('/login');
      return;
    }
    if (article) {
      setTitle(article.title);
      setExcerpt(article.excerpt);
      setContent(article.content);
      setCoverUrl(article.coverImage || '');
      setTopicSlug(article.topic.slug);
    }
  }, [article, isAuthenticated, currentUser, router]);

  if (!isAuthenticated || !currentUser) return null;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Không tìm thấy bài viết</p>
          <button onClick={() => router.back()} className="px-4 py-2 rounded-full text-white text-sm" style={{ background: '#F97316' }}>Quay lại</button>
        </div>
      </div>
    );
  }

  // Check ownership — admin can edit any article, others only own
  const isAdmin = currentUser?.role === 'admin';
  const isOwner = article?.author.id === currentUser?.id;
  if (!isAdmin && !isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Bạn không có quyền sửa bài viết này</p>
          <button onClick={() => router.back()} className="px-4 py-2 rounded-full text-white text-sm" style={{ background: '#F97316' }}>Quay lại</button>
        </div>
      </div>
    );
  }

  const selectedTopic = topics.find((t) => t.slug === topicSlug);

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !topicSlug) return;
    const topic = topics.find((t) => t.slug === topicSlug)!;
    updateArticle(id, {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage: coverUrl.trim() || undefined,
      topic,
    });
    setShowSuccess(true);
    setTimeout(() => {
      router.push(`/article/${id}`);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(0,186,124,0.1)' }}>
            <Send className="w-10 h-10" style={{ color: '#00BA7C' }} />
          </motion.div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Bài viết đã được cập nhật!</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Đang chuyển đến bài viết...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />

      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-primary)' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>✏️ Sửa bài viết</h1>
          {isAdmin && !isOwner && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>🛡️ Admin Edit</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 border"
            style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
          >
            {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreview ? 'Sửa' : 'Xem trước'}
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || !topicSlug}
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white disabled:opacity-40"
            style={{ background: '#F97316' }}
          >
            Lưu thay đổi
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center">
        <main className="flex-1 min-h-screen max-w-[760px]">
          <div className="p-4">
            {isPreview ? (
              /* Preview */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {coverUrl && (
                  <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-primary)' }}>
                    <img src={coverUrl} alt="Cover" className="w-full h-[300px] object-cover" />
                  </div>
                )}
                {selectedTopic && (
                  <span className="inline-block px-3 py-1 rounded-full text-sm" style={{ background: `${selectedTopic.color}20`, color: selectedTopic.color }}>
                    {selectedTopic.icon} {selectedTopic.name}
                  </span>
                )}
                <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{title || 'Tiêu đề bài viết'}</h1>
                <p style={{ color: 'var(--text-secondary)' }}>{excerpt || 'Mô tả ngắn...'}</p>
                <div className="prose" dangerouslySetInnerHTML={{ __html: content || '<p>Nội dung bài viết...</p>' }} />
              </motion.div>
            ) : (
              /* Edit */
              <div className="space-y-4">
                {/* Cover image */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    <ImageIcon className="w-4 h-4 inline mr-1" /> Ảnh bìa (URL)
                  </label>
                  <input
                    type="url"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                  {coverUrl && (
                    <div className="mt-2 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-primary)' }}>
                      <img src={coverUrl} alt="Preview" className="w-full h-[150px] object-cover" />
                    </div>
                  )}
                </div>

                {/* Topic */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Chủ đề</label>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        key={topic.slug}
                        onClick={() => setTopicSlug(topic.slug)}
                        className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
                        style={{
                          borderColor: topicSlug === topic.slug ? topic.color : 'var(--border-primary)',
                          background: topicSlug === topic.slug ? `${topic.color}20` : 'transparent',
                          color: topicSlug === topic.slug ? topic.color : 'var(--text-secondary)',
                        }}
                      >
                        {topic.icon} {topic.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tiêu đề bài viết"
                    className="w-full text-2xl font-bold border-none focus:outline-none"
                    style={{ background: 'transparent', color: 'var(--text-primary)' }}
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Mô tả ngắn (hiển thị trên feed)..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none focus:outline-none"
                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    Nội dung (hỗ trợ HTML)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="<h2>Tiêu đề phần</h2>&#10;<p>Nội dung bài viết...</p>"
                    rows={18}
                    className="w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none font-mono"
                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)', lineHeight: '1.8' }}
                    onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
