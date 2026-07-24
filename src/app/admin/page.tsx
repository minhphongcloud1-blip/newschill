'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, MessageCircle, Clock, TrendingUp, Flame, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRss } from '@/contexts/RssContext';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────
interface DashboardStats {
  totalArticles: number;
  totalDrafts: number;
  pendingDrafts: number;
  approvedDrafts: number;
  rejectedDrafts: number;
  totalLikes: number;
  totalComments: number;
}

interface TopArticle {
  id: string;
  slug: string | null;
  title: string;
  author_name: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  topics: { slug: string; name: string; icon: string; color: string } | null;
}

interface RecentDraft {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  source_name: string;
  ai_provider: string;
  created_at: string;
}

// ── Mini skeleton loader ───────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className ?? ''}`}
      style={{ background: 'var(--border-primary)' }}
    />
  );
}

export default function AdminDashboard() {
  const { users } = useAuth();
  const { drafts } = useRss();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topArticles, setTopArticles] = useState<TopArticle[]>([]);
  const [recentDrafts, setRecentDrafts] = useState<RecentDraft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        // Fetch articles stats + top articles in 1 call
        const [artRes] = await Promise.all([
          fetch('/api/articles?pageSize=5&page=1'),
        ]);

        let totalArticles = 0;
        let topArts: TopArticle[] = [];
        if (artRes.ok) {
          const artJson = await artRes.json();
          totalArticles = artJson.total ?? 0;
          topArts = artJson.data ?? [];
        }

        // Compute from context drafts (already loaded)
        const pendingDrafts = drafts.filter((d) => d.status === 'pending').length;
        const approvedDrafts = drafts.filter((d) => d.status === 'approved').length;
        const rejectedDrafts = drafts.filter((d) => d.status === 'rejected').length;

        // Fetch top articles by likes separately
        const topRes = await fetch('/api/dashboard/top-articles');
        if (topRes.ok) {
          const topJson = await topRes.json();
          topArts = topJson.data ?? topArts;
        }

        setStats({
          totalArticles,
          totalDrafts: drafts.length,
          pendingDrafts,
          approvedDrafts,
          rejectedDrafts,
          totalLikes: 0,
          totalComments: 0,
        });
        setTopArticles(topArts);
        setRecentDrafts(
          [...drafts]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 6)
            .map((d) => ({
              id: d.id,
              title: d.title,
              status: d.status as 'pending' | 'approved' | 'rejected',
              source_name: d.sourceName,
              ai_provider: d.aiProvider,
              created_at: d.createdAt,
            }))
        );
      } catch {
        // On error: use drafts from context only
        const pendingDrafts = drafts.filter((d) => d.status === 'pending').length;
        setStats({
          totalArticles: 0,
          totalDrafts: drafts.length,
          pendingDrafts,
          approvedDrafts: drafts.filter((d) => d.status === 'approved').length,
          rejectedDrafts: drafts.filter((d) => d.status === 'rejected').length,
          totalLikes: 0,
          totalComments: 0,
        });
      }
      setLoading(false);
    }

    loadDashboard();
  }, [drafts]);

  // Derived from users context
  const roleDistribution = {
    admin: users.filter((u) => u.role === 'admin').length,
    editor: users.filter((u) => u.role === 'editor').length,
    reader: users.filter((u) => u.role === 'reader').length,
  };
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const statCards = [
    {
      label: 'Bài đã xuất bản',
      value: stats?.totalArticles ?? 0,
      icon: FileText,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      href: '/admin/articles',
    },
    {
      label: 'Tổng bản nháp AI',
      value: stats?.totalDrafts ?? 0,
      icon: Flame,
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
      href: '/admin/ai-drafts',
    },
    {
      label: 'Chờ duyệt',
      value: stats?.pendingDrafts ?? 0,
      icon: Clock,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      href: '/admin/ai-drafts',
    },
    {
      label: 'Tổng người dùng',
      value: users.length,
      icon: Users,
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.1)',
      href: '/admin/users',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Tổng quan hệ thống Newschill — dữ liệu thực từ Supabase</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.href} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-2xl border cursor-pointer"
                style={{
                  background: 'var(--bg-glass-strong)',
                  backdropFilter: 'var(--glass-blur)',
                  borderColor: 'var(--border-glass)',
                  boxShadow: 'var(--shadow-glass)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                  <div className="p-2 rounded-xl" style={{ background: stat.bg }}>
                    <Icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                </div>
                {loading ? (
                  <Skeleton className="h-9 w-16" />
                ) : (
                  <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {stat.value.toLocaleString('vi-VN')}
                  </p>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* ── Draft Status Bar ── */}
      {stats && stats.totalDrafts > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
        >
          <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Trạng thái bản nháp AI</h2>
          <div className="flex gap-2 mb-3 overflow-hidden rounded-full h-3">
            {[
              { count: stats.approvedDrafts, color: '#22C55E' },
              { count: stats.pendingDrafts, color: '#F59E0B' },
              { count: stats.rejectedDrafts, color: '#EF4444' },
            ].filter(s => s.count > 0).map((s, i) => (
              <div key={i} className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(s.count / stats.totalDrafts) * 100}%`, background: s.color, minWidth: s.count > 0 ? '4px' : 0 }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Đã duyệt', count: stats.approvedDrafts, color: '#22C55E', icon: CheckCircle },
              { label: 'Chờ duyệt', count: stats.pendingDrafts, color: '#F59E0B', icon: Clock },
              { label: 'Từ chối', count: stats.rejectedDrafts, color: '#EF4444', icon: AlertCircle },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}:</span>
                <span className="text-sm font-bold" style={{ color: s.color }}>{s.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* ── Role Distribution (Real users) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
        >
          <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Phân bố vai trò ({users.length} người dùng)</h2>
          <div className="space-y-3">
            {[
              { label: '🛡️ Admin', count: roleDistribution.admin, color: '#8B5CF6' },
              { label: '✍️ Editor', count: roleDistribution.editor, color: '#3B82F6' },
              { label: '👤 Reader', count: roleDistribution.reader, color: '#71767B' },
            ].map((role) => (
              <div key={role.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{role.label}</span>
                  <span className="text-sm font-bold" style={{ color: role.color }}>
                    {role.count} <span className="text-xs font-normal" style={{ color: 'var(--text-tertiary)' }}>
                      ({users.length > 0 ? Math.round(role.count / users.length * 100) : 0}%)
                    </span>
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-primary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: users.length > 0 ? `${(role.count / users.length) * 100}%` : '0%' }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: role.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Recent Users (Real) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Người dùng gần đây</h2>
            <Link href="/admin/users" className="text-xs font-medium" style={{ color: '#8B5CF6' }}>Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" width={36} height={36} loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                  style={{
                    background: user.status === 'active' ? 'rgba(0,186,124,0.1)' : user.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                    color: user.status === 'active' ? '#00BA7C' : user.status === 'pending' ? '#F59E0B' : '#EF4444',
                  }}
                >
                  {user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Blocked'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Recent AI Drafts (Real Supabase data) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="p-5 rounded-2xl border lg:col-span-2"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5" style={{ color: '#F97316' }} />
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Bản nháp AI gần đây</h2>
            </div>
            <Link href="/admin/ai-drafts" className="text-xs font-medium" style={{ color: '#F97316' }}>Quản lý</Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : recentDrafts.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'var(--text-secondary)' }}>Chưa có bản nháp nào. Chạy RSS để bắt đầu.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                    <th className="text-left py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Tiêu đề</th>
                    <th className="text-left py-2 px-3 text-xs font-medium hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>Nguồn</th>
                    <th className="text-left py-2 px-3 text-xs font-medium hidden md:table-cell" style={{ color: 'var(--text-secondary)' }}>AI</th>
                    <th className="text-center py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Trạng thái</th>
                    <th className="text-right py-2 px-3 text-xs font-medium hidden lg:table-cell" style={{ color: 'var(--text-secondary)' }}>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDrafts.map((draft) => (
                    <tr key={draft.id} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                      <td className="py-2.5 px-3">
                        <p className="text-sm font-medium line-clamp-1 max-w-[280px]" style={{ color: 'var(--text-primary)' }}>{draft.title}</p>
                      </td>
                      <td className="py-2.5 px-3 hidden sm:table-cell">
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{draft.source_name || '—'}</span>
                      </td>
                      <td className="py-2.5 px-3 hidden md:table-cell">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{
                          background: draft.ai_provider !== 'none' ? 'rgba(139,92,246,0.1)' : 'rgba(113,118,123,0.1)',
                          color: draft.ai_provider !== 'none' ? '#8B5CF6' : '#71767B',
                        }}>
                          {draft.ai_provider === 'none' ? 'Fallback' : draft.ai_provider}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                          background: draft.status === 'approved' ? 'rgba(34,197,94,0.1)' : draft.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                          color: draft.status === 'approved' ? '#22C55E' : draft.status === 'pending' ? '#F59E0B' : '#EF4444',
                        }}>
                          {draft.status === 'approved' ? '✓ Đã duyệt' : draft.status === 'pending' ? '⏳ Chờ' : '✕ Từ chối'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right hidden lg:table-cell">
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{formatDate(draft.created_at)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* ── Top Articles (Real Supabase) ── */}
        {topArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="p-5 rounded-2xl border lg:col-span-2"
            style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: '#F97316' }} />
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Bài viết nổi bật (thực tế)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                    <th className="text-left py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Bài viết</th>
                    <th className="text-left py-2 px-3 text-xs font-medium hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>Tác giả</th>
                    <th className="text-right py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>❤️ Likes</th>
                    <th className="text-right py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>💬 Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {topArticles.map((article) => (
                    <tr key={article.id} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                      <td className="py-3 px-3">
                        <Link href={article.slug ? `/tin-tuc/${article.slug}` : `/article/${article.id}`}>
                          <p className="text-sm font-medium line-clamp-1 max-w-[300px] hover:text-orange-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{article.title}</p>
                        </Link>
                        {article.topics && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${article.topics.color}20`, color: article.topics.color }}>
                            {article.topics.icon} {article.topics.name}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-sm hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>{article.author_name}</td>
                      <td className="py-3 px-3 text-sm text-right font-bold" style={{ color: '#F91880' }}>{article.likes_count.toLocaleString('vi-VN')}</td>
                      <td className="py-3 px-3 text-sm text-right font-bold" style={{ color: '#3B82F6' }}>{article.comments_count.toLocaleString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
