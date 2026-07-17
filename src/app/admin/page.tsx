'use client';

import { motion } from 'framer-motion';
import { Users, FileText, MessageCircle, Clock, TrendingUp, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockArticles } from '@/data/articles';
import { mockComments } from '@/data/comments';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const { users } = useAuth();

  const stats = [
    {
      label: 'Tổng Users',
      value: users.length,
      icon: Users,
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.1)',
    },
    {
      label: 'Bài viết',
      value: mockArticles.length,
      icon: FileText,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
    },
    {
      label: 'Bình luận',
      value: mockComments.length + mockComments.reduce((acc, c) => acc + (c.replies?.length || 0), 0),
      icon: MessageCircle,
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
    },
    {
      label: 'Chờ duyệt',
      value: users.filter((u) => u.status === 'pending').length,
      icon: Clock,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
    },
  ];

  const recentUsers = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const topArticles = [...mockArticles]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 5);

  const roleDistribution = {
    admin: users.filter((u) => u.role === 'admin').length,
    editor: users.filter((u) => u.role === 'editor').length,
    reader: users.filter((u) => u.role === 'reader').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Tổng quan hệ thống NewsX</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl border"
              style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                <div className="p-2 rounded-xl" style={{ background: stat.bg }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Phân bố vai trò</h2>
          <div className="space-y-3">
            {[
              { label: '🛡️ Admin', count: roleDistribution.admin, color: '#8B5CF6', total: users.length },
              { label: '✍️ Editor', count: roleDistribution.editor, color: '#3B82F6', total: users.length },
              { label: '👤 Reader', count: roleDistribution.reader, color: 'var(--text-secondary)', total: users.length },
            ].map((role) => (
              <div key={role.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{role.label}</span>
                  <span className="text-sm font-bold" style={{ color: role.color }}>{role.count}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-primary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(role.count / role.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: role.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Đăng ký gần đây</h2>
            <Link href="/admin/users" className="text-sm" style={{ color: '#8B5CF6' }}>Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" style={{ background: 'var(--border-primary)' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: user.status === 'active' ? 'rgba(0,186,124,0.1)' : user.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                      color: user.status === 'active' ? '#00BA7C' : user.status === 'pending' ? '#F59E0B' : '#EF4444',
                    }}
                  >
                    {user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Blocked'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-5 rounded-2xl border lg:col-span-2"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#F97316' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Bài viết nổi bật</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <th className="text-left py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Bài viết</th>
                  <th className="text-left py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Tác giả</th>
                  <th className="text-right py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>❤️ Likes</th>
                  <th className="text-right py-2 px-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>💬 Comments</th>
                </tr>
              </thead>
              <tbody>
                {topArticles.map((article) => (
                  <tr key={article.id} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                    <td className="py-3 px-3">
                      <p className="text-sm font-medium truncate max-w-[300px]" style={{ color: 'var(--text-primary)' }}>{article.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${article.topic.color}20`, color: article.topic.color }}>
                        {article.topic.icon} {article.topic.name}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{article.author.name}</td>
                    <td className="py-3 px-3 text-sm text-right font-medium" style={{ color: '#F91880' }}>{article.likesCount}</td>
                    <td className="py-3 px-3 text-sm text-right font-medium" style={{ color: '#3B82F6' }}>{article.commentsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
