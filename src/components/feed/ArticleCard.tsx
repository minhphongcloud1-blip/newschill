'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Check, X } from 'lucide-react';
import { Article } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const { isLiked, toggleLike, isShared, toggleShare, isAuthenticated } = useAuth();
  const liked = isLiked(article.id);
  const shared = isShared(article.id);
  const router = useRouter();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    toggleLike(article.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setShowSharePopup(true);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push(`/article/${article.id}#comments`);
    }
  };

  const handleConfirmShare = () => {
    toggleShare(article.id);
    setShowSharePopup(false);
    setToastMsg(!shared ? '✅ Đã chia sẻ lên trang cá nhân' : '❌ Đã bỏ chia sẻ');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative"
    >
      <Link href={`/article/${article.id}`}>
        <motion.article
          className="px-4 py-4 border-b cursor-pointer group"
          style={{ borderColor: 'var(--border-primary)' }}
        >
          {/* Author info */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full shrink-0"
              style={{ background: 'var(--border-primary)' }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                  {article.author.name}
                </span>
                <span className="text-sm shrink-0" style={{ color: 'var(--text-secondary)' }}>
                  · {formatDate(article.createdAt)}
                </span>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: `${article.topic.color}20`,
                  color: article.topic.color,
                }}
              >
                {article.topic.icon} {article.topic.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-[15px] font-bold leading-snug mb-1.5 group-hover:text-orange-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
              {article.title}
            </h2>
            <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
              {article.excerpt}
            </p>

            {/* Cover image */}
            {article.coverImage && (
              <div className="rounded-2xl overflow-hidden mb-3 border aspect-video" style={{ borderColor: 'var(--border-primary)' }}>
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button onClick={handleCommentClick} className="flex items-center gap-2 group/comment" style={{ color: 'var(--text-secondary)' }}>
                <div className="p-2 rounded-full group-hover/comment:bg-blue-500/10">
                  <MessageCircle className="w-[18px] h-[18px] group-hover/comment:text-blue-400" />
                </div>
                <span className="text-sm group-hover/comment:text-blue-400">{formatNumber(article.commentsCount)}</span>
              </button>

              <button
                onClick={handleLike}
                className="flex items-center gap-2 group/like"
                style={{ color: liked ? '#F91880' : 'var(--text-secondary)' }}
              >
                <motion.div
                  whileTap={{ scale: 1.3 }}
                  className="p-2 rounded-full"
                  style={{ background: liked ? 'rgba(249,24,128,0.1)' : 'transparent' }}
                >
                  <Heart className="w-[18px] h-[18px]" fill={liked ? '#F91880' : 'none'} style={{ color: liked ? '#F91880' : undefined }} />
                </motion.div>
                <span className="text-sm">{formatNumber(article.likesCount + (liked ? 1 : 0))}</span>
              </button>

              <button
                onClick={handleShareClick}
                className="flex items-center gap-2 group/share"
                style={{ color: shared ? '#00BA7C' : 'var(--text-secondary)' }}
              >
                <motion.div
                  whileTap={{ scale: 1.3 }}
                  className="p-2 rounded-full"
                  style={{ background: shared ? 'rgba(0,186,124,0.1)' : 'transparent' }}
                >
                  {shared ? (
                    <Check className="w-[18px] h-[18px]" style={{ color: '#00BA7C' }} />
                  ) : (
                    <Share2 className="w-[18px] h-[18px] group-hover/share:text-green-400" />
                  )}
                </motion.div>
                <span className="text-sm">{formatNumber(article.sharesCount + (shared ? 1 : 0))}</span>
              </button>
            </div>
          </div>
        </motion.article>
      </Link>

      {/* Share Confirmation Popup */}
      <AnimatePresence>
        {showSharePopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setShowSharePopup(false)}
            />
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[340px] rounded-2xl p-5"
              style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: shared ? 'rgba(239,68,68,0.1)' : 'rgba(0,186,124,0.1)' }}>
                  <Share2 className="w-5 h-5" style={{ color: shared ? '#EF4444' : '#00BA7C' }} />
                </div>
                <button onClick={() => setShowSharePopup(false)} className="p-1 rounded-full hover:bg-[var(--bg-hover-md)]">
                  <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>

              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {shared ? 'Bỏ chia sẻ bài viết?' : 'Chia sẻ bài viết?'}
              </h3>
              <p className="text-sm mb-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {article.title}
              </p>
              <p className="text-xs mb-5" style={{ color: 'var(--text-tertiary)' }}>
                {shared
                  ? 'Bài viết sẽ bị xóa khỏi trang cá nhân của bạn.'
                  : 'Bài viết sẽ được chia sẻ lên trang cá nhân của bạn.'}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSharePopup(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border"
                  style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
                >
                  Hủy
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirmShare}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: shared ? '#EF4444' : '#00BA7C' }}
                >
                  {shared ? 'Bỏ chia sẻ' : 'Chia sẻ ngay'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium z-50 shadow-lg"
            style={{ background: '#1C1C1E', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
