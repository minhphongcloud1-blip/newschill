'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Clock, Check, Pencil } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import MobileNav from '@/components/layout/MobileNav';
import { formatDate, formatNumber, generateId } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Article, Comment } from '@/types';
import { mapArticle, SupaArticleRow } from '@/hooks/useArticles';

interface Props {
  articleId: string;
}

export default function ArticleDetailClient({ articleId }: Props) {
  const router = useRouter();
  const {
    currentUser, isAuthenticated,
    isLiked, toggleLike, hasShared, recordShare, recordView,
    myArticles, getStats, getComments, addComment, addReply, getArticle,
    toggleCommentLike, isCommentLiked,
  } = useAuth();

  const localArticle = getArticle(articleId);
  const [supaArticle, setSupaArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(!localArticle);

  // Fetch from Supabase if not found locally
  useEffect(() => {
    if (localArticle) { setLoading(false); return; }
    (async () => {
      try {
        const res = await fetch(`/api/articles/${articleId}`);
        if (res.ok) {
          const row: SupaArticleRow = await res.json();
          setSupaArticle(mapArticle(row));
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, [articleId, localArticle]);

  const article = localArticle ?? supaArticle;
  const comments = getComments(articleId);
  const stats = getStats(articleId);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showShareConfirm, setShowShareConfirm] = useState(false);

  const liked = isLiked(article?.id ?? '');
  const shared = hasShared(article?.id ?? '');

  // Record view once per session (guest or logged in)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (article) recordView(article.id); }, [article?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#8B5CF6', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Không tìm thấy bài viết</p>
      </div>
    );
  }

  const handleComment = () => {
    if (!newComment.trim() || !currentUser) return;
    const comment: Comment = {
      id: generateId(),
      content: newComment,
      author: currentUser,
      articleId: article.id,
      parentId: null,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      replies: [],
    };
    addComment(article.id, comment);
    setNewComment('');
  };

  const handleReply = (parentId: string) => {
    if (!replyText.trim() || !currentUser) return;
    const reply: Comment = {
      id: generateId(),
      content: replyText,
      author: currentUser,
      articleId: article.id,
      parentId,
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };
    addReply(article.id, parentId, reply);
    setReplyTo(null);
    setReplyText('');
  };

  const handleShare = () => {
    // Share works for everyone — copy link to clipboard
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    recordShare(article.id);
    setShowShareConfirm(true);
    setTimeout(() => setShowShareConfirm(false), 2000);
  };

  const handleLikeClick = () => {
    if (!isAuthenticated) { router.push('/login'); return; }
    toggleLike(article.id);
  };

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
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-primary)' }}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Bài viết</h1>
            </div>
            {/* Edit button - author or admin */}
            {currentUser && article && (currentUser.id === article.author.id || currentUser.role === 'admin') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/article/edit/${article.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                style={{ borderColor: 'var(--border-primary)', color: 'var(--text-primary)', background: 'var(--bg-secondary)' }}
              >
                <Pencil className="w-3.5 h-3.5" />
                Sửa bài
              </motion.button>
            )}
          </div>

          <main className="min-h-screen">
          <div>
            <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="flex items-center gap-3 mb-4">
                <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full" style={{ background: 'var(--border-primary)' }} />
                <div>
                  <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{article.author.name}</p>
                  {article.sourceName ? (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
                        Nguồn: {article.sourceName}
                      </span>
                      {article.sourceUrl && (
                        <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs hover:underline" style={{ color: '#8B5CF6' }}>
                          Bài gốc ↗
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{article.author.bio}</p>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>{article.title}</h1>

              {article.coverImage && (
                <div className="rounded-2xl overflow-hidden mb-4 border" style={{ borderColor: 'var(--border-primary)' }}>
                  <img src={article.coverImage} alt={article.title} className="w-full max-h-[400px] object-cover" />
                </div>
              )}

              <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />

              {/* Time + stats in one row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(article.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-sm px-2 py-0.5 rounded-full ml-1 shrink-0" style={{ background: `${article.topic.color}20`, color: article.topic.color }}>
                    {article.topic.icon} {article.topic.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{formatNumber(stats.comments)}</strong> bình luận</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{formatNumber(stats.likes)}</strong> thích</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{formatNumber(stats.shares)}</strong> chia sẻ</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-around mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <button onClick={() => {
                  if (!isAuthenticated) router.push('/login');
                  else { const el = document.getElementById('comments'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
                }} className="flex items-center gap-2 py-2 px-4 rounded-full hover:bg-blue-500/10" style={{ color: 'var(--text-secondary)' }}>
                  <MessageCircle className="w-5 h-5" /><span className="text-sm">Bình luận</span>
                </button>
                <motion.button whileTap={{ scale: 1.2 }} onClick={handleLikeClick} className="flex items-center gap-2 py-2 px-4 rounded-full"
                  style={{ color: liked ? '#F91880' : 'var(--text-secondary)', background: liked ? 'rgba(249,24,128,0.1)' : 'transparent' }}>
                  <Heart className="w-5 h-5" fill={liked ? '#F91880' : 'none'} /><span className="text-sm">Thích</span>
                </motion.button>
                <button onClick={handleShare} className="flex items-center gap-2 py-2 px-4 rounded-full"
                  style={{ color: shared ? '#00BA7C' : 'var(--text-secondary)', background: shared ? 'rgba(0,186,124,0.1)' : 'transparent' }}>
                  {shared ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}<span className="text-sm">{shared ? 'Đã chia sẻ' : 'Chia sẻ'}</span>
                </button>
              </div>

              {showShareConfirm && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium z-50" style={{ background: '#F97316', color: '#fff' }}>
                  {shared ? '✅ Đã chia sẻ lên trang cá nhân' : '❌ Đã bỏ chia sẻ'}
                </motion.div>
              )}
            </motion.article>

            {/* Comment input */}
            <div id="comments" className="scroll-mt-20">
              {isAuthenticated && currentUser ? (
                <div className="flex gap-3 px-4 py-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                  <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full shrink-0" style={{ background: 'var(--border-primary)' }} />
                  <div className="flex-1">
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Viết bình luận..." rows={2}
                      className="w-full px-3 py-2 rounded-xl border text-sm resize-none focus:outline-none"
                      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                      onFocus={(e) => (e.target.style.borderColor = '#F97316')} onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                    />
                    <div className="flex justify-end mt-2">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleComment} disabled={!newComment.trim()}
                        className="px-4 py-1.5 rounded-full text-sm font-semibold text-white disabled:opacity-40" style={{ background: '#F97316' }}>Gửi</motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 border-b text-center" style={{ borderColor: 'var(--border-primary)' }}>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Bạn cần đăng nhập để bình luận bài viết này.</p>
                  <button onClick={() => router.push('/login')} className="px-6 py-2 rounded-full font-semibold text-white text-sm" style={{ background: '#F97316' }}>Đăng nhập ngay</button>
                </div>
              )}
            </div>

            {/* Comments list */}
            <div>
              {comments.map((comment) => (
                <motion.div key={comment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex gap-3">
                    <img src={comment.author.avatar} alt="" className="w-10 h-10 rounded-full shrink-0" style={{ background: 'var(--border-primary)' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{comment.author.name}</span>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>· {formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => {
                            if (!isAuthenticated) { router.push('/login'); return; }
                            toggleCommentLike(article.id, comment.id);
                          }}
                          className="text-xs flex items-center gap-1 transition-colors"
                          style={{ color: isCommentLiked(comment.id) ? '#F91880' : 'var(--text-secondary)' }}
                        >
                          <Heart className="w-3.5 h-3.5" fill={isCommentLiked(comment.id) ? '#F91880' : 'none'} />
                          {comment.likesCount}
                        </button>
                        <button onClick={() => {
                          if (!isAuthenticated) router.push('/login');
                          else setReplyTo(replyTo === comment.id ? null : comment.id);
                        }} className="text-xs" style={{ color: 'var(--text-secondary)' }}>Trả lời</button>
                      </div>

                      {replyTo === comment.id && currentUser && (
                        <div className="mt-3 flex gap-2">
                          <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full shrink-0" style={{ background: 'var(--border-primary)' }} />
                          <div className="flex-1">
                            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder={`Trả lời ${comment.author.name}...`} rows={2}
                              className="w-full px-3 py-2 rounded-xl border text-sm resize-none focus:outline-none"
                              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }} autoFocus
                            />
                            <div className="flex justify-end gap-2 mt-1">
                              <button onClick={() => setReplyTo(null)} className="text-xs px-3 py-1 rounded-full" style={{ color: 'var(--text-secondary)' }}>Hủy</button>
                              <button onClick={() => handleReply(comment.id)} disabled={!replyText.trim()} className="text-xs px-3 py-1 rounded-full text-white disabled:opacity-40" style={{ background: '#F97316' }}>Trả lời</button>
                            </div>
                          </div>
                        </div>
                      )}

                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 space-y-3 pl-4 border-l-2" style={{ borderColor: 'var(--border-primary)' }}>
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2">
                              <img src={reply.author.avatar} alt="" className="w-8 h-8 rounded-full shrink-0" style={{ background: 'var(--border-primary)' }} />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{reply.author.name}</span>
                                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>· {formatDate(reply.createdAt)}</span>
                                </div>
                                <p className="text-sm mt-0.5" style={{ color: 'var(--text-primary)' }}>{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        </div>{/* end max-w-[760px] */}
        <RightPanel />
      </div>
      <MobileNav />
    </div>
  );
}
