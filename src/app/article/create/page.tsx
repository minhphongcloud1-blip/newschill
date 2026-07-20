'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Send, Eye, EyeOff } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import { useAuth } from '@/contexts/AuthContext';
import { generateId } from '@/lib/utils';
import { AdminButton } from '@/components/admin/AdminUI';

export default function ArticleCreatePage() {
  const router = useRouter();
  const { currentUser, addArticle, topics } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [topicSlug, setTopicSlug] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [published, setPublished] = useState(false);

  if (!currentUser || (currentUser.role !== 'editor' && currentUser.role !== 'admin')) {
    router.push('/');
    return null;
  }

  const handlePublish = () => {
    if (!title.trim() || !content.trim() || !topicSlug || !currentUser) return;
    const topic = topics.find((t) => t.slug === topicSlug);
    if (!topic) return;
    addArticle({
      id: generateId(),
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      coverImage: coverUrl.trim() || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
      author: currentUser,
      topic,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
    });
    setPublished(true);
    setTimeout(() => router.push('/'), 1500);
  };

  const selectedTopic = topics.find((t) => t.slug === topicSlug);

  if (published) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(0,186,124,0.1)' }}
          >
            <Send className="w-10 h-10" style={{ color: '#00BA7C' }} />
          </motion.div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Bài viết đã được đăng!</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Đang chuyển về trang chủ...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:pl-[275px]" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />

      {/* Content — centered, same max-w as feed */}
      <div className="flex justify-center">
        <div className="flex-1 min-w-0 max-w-[760px]">

          {/* Header — same width as content */}
          <div
            className="sticky top-0 z-30 flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid var(--border-primary)' }}
          >
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-primary)' }}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>✍️ Viết bài mới</h1>
            </div>
            <div className="flex items-center gap-2">
              <AdminButton
                variant="secondary"
                size="sm"
                icon={isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                onClick={() => setIsPreview(!isPreview)}
              >
                {isPreview ? 'Sửa' : 'Xem trước'}
              </AdminButton>
              <AdminButton
                variant="primary"
                size="sm"
                disabled={!title.trim() || !content.trim() || !topicSlug}
                onClick={handlePublish}
              >
                Đăng bài
              </AdminButton>
            </div>
          </div>

          {/* Content */}
          <main className="min-h-screen">
          <div className="p-4">
          {isPreview ? (
            /* Preview Mode */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {coverUrl && (
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-primary)' }}>
                  <img src={coverUrl} alt="Cover" className="w-full h-[300px] object-cover" />
                </div>
              )}
              {selectedTopic && (
                <span className="inline-block px-3 py-1 rounded-full text-sm"
                  style={{ background: `${selectedTopic.color}20`, color: selectedTopic.color }}
                >
                  {selectedTopic.icon} {selectedTopic.name}
                </span>
              )}
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{title || 'Tiêu đề bài viết'}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{excerpt || 'Mô tả ngắn...'}</p>
              <div className="prose" dangerouslySetInnerHTML={{ __html: content || '<p>Nội dung bài viết...</p>' }} />
            </motion.div>
          ) : (
            /* Edit Mode */
            <div className="space-y-4">
              {/* Cover image URL */}
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
                  onBlur={(e) => (e.target.style.borderColor = '#2F3336')}
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
                  onBlur={(e) => (e.target.style.borderColor = '#2F3336')}
                />
              </div>

              {/* Content - Simple textarea for MVP (TipTap can be added with npm install) */}
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                  Nội dung (hỗ trợ HTML)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<h2>Tiêu đề phần</h2>&#10;<p>Nội dung bài viết...</p>&#10;<ul><li>Điểm 1</li><li>Điểm 2</li></ul>"
                  rows={15}
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
        </div>{/* end max-w-[760px] */}
      </div>
      <MobileNav />
    </div>
  );
}
