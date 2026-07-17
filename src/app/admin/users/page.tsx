'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, PenSquare, Eye, Ban, Check, ChevronDown, UserCog } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { User, UserRole, UserStatus } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminUsersPage() {
  const { users, updateUserRole, updateUserStatus, currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [showRoleDialog, setShowRoleDialog] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || user.role === roleFilter;
      const matchStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const getRoleBadge = (role: UserRole) => {
    const config = {
      admin: { label: '🛡️ Admin', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
      editor: { label: '✍️ Editor', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
      reader: { label: '👤 Reader', color: 'var(--text-secondary)', bg: 'rgba(113,118,123,0.1)' },
    }[role];
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: config.bg, color: config.color }}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: UserStatus) => {
    const config = {
      active: { label: 'Active', color: '#00BA7C', bg: 'rgba(0,186,124,0.1)' },
      pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
      blocked: { label: 'Blocked', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
    }[status];
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: config.bg, color: config.color }}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Quản lý Users</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {users.length} users · {users.filter((u) => u.status === 'pending').length} đang chờ duyệt
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm user..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none"
            style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)', color: 'var(--text-primary)' }}
            onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
          className="px-3 py-2 rounded-xl border text-sm focus:outline-none"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)', color: 'var(--text-primary)' }}
        >
          <option value="all">Tất cả Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="reader">Reader</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
          className="px-3 py-2 rounded-xl border text-sm focus:outline-none"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)', color: 'var(--text-primary)' }}
        >
          <option value="all">Tất cả Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Pending users alert */}
      {users.some((u) => u.status === 'pending') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-xl border flex items-center justify-between"
          style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.2)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(245,158,11,0.1)' }}>
              <UserCog className="w-5 h-5" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#F59E0B' }}>
                {users.filter((u) => u.status === 'pending').length} user đang chờ duyệt
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Duyệt để user có thể đăng nhập</p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('pending')}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}
          >
            Xem
          </button>
        </motion.div>
      )}

      {/* Users table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>User</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Email</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Ngày tạo</th>
                <th className="text-right py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid var(--border-primary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" style={{ background: 'var(--border-primary)' }} />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{formatDate(user.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1 relative">
                      {user.id !== currentUser?.id && (
                        <>
                          {/* Change role */}
                          <div className="relative">
                            <button
                              onClick={() => setShowRoleDialog(showRoleDialog === user.id ? null : user.id)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
                              title="Đổi role"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            {showRoleDialog === user.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute right-0 top-full mt-1 w-40 rounded-xl border p-1 z-50"
                                style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}
                              >
                                {(['reader', 'editor', 'admin'] as UserRole[]).map((role) => (
                                  <button
                                    key={role}
                                    onClick={() => {
                                      updateUserRole(user.id, role);
                                      setShowRoleDialog(null);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5 flex items-center gap-2"
                                    style={{ color: user.role === role ? '#F97316' : 'var(--text-primary)' }}
                                  >
                                    {role === 'admin' && '🛡️'}
                                    {role === 'editor' && '✍️'}
                                    {role === 'reader' && '👤'}
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                    {user.role === role && <Check className="w-4 h-4 ml-auto" />}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </div>

                          {/* Approve pending */}
                          {user.status === 'pending' && (
                            <button
                              onClick={() => updateUserStatus(user.id, 'active')}
                              className="p-1.5 rounded-lg transition-colors hover:bg-green-500/10"
                              title="Duyệt"
                              style={{ color: '#00BA7C' }}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {/* Block/Unblock */}
                          <button
                            onClick={() => updateUserStatus(user.id, user.status === 'blocked' ? 'active' : 'blocked')}
                            className="p-1.5 rounded-lg transition-colors"
                            title={user.status === 'blocked' ? 'Mở khóa' : 'Khóa'}
                            style={{
                              color: user.status === 'blocked' ? '#00BA7C' : '#EF4444',
                            }}
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center" style={{ color: 'var(--text-secondary)' }}>
            <p>Không tìm thấy user nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
