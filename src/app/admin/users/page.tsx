'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, Ban, Check, KeyRound, X, Crown, Lock as LockIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, UserStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';

// ─── Change Password Modal ───────────────────────────────────────
function ChangePasswordModal({
  userName,
  userId,
  currentPassword,
  onSave,
  onClose,
}: {
  userName: string;
  userId: string;
  currentPassword: string;
  onSave: (userId: string, newPassword: string) => void;
  onClose: () => void;
}) {
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const mismatch = confirmPw.length > 0 && newPw !== confirmPw;
  const canSave = newPw.length >= 6 && newPw === confirmPw;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="w-[380px] rounded-2xl p-6 mx-4"
          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', boxShadow: '0 24px 48px rgba(0,0,0,0.35)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.1)' }}>
                <KeyRound className="w-5 h-5" style={{ color: '#F97316' }} />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Đổi mật khẩu</h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{userName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[var(--bg-hover-md)]">
              <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>

          {/* Current password (read-only view) */}
          <div className="mb-4">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type={showCurrent ? 'text' : 'password'}
                readOnly
                value={currentPassword}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)', cursor: 'default' }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div className="mb-3">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
              Mật khẩu mới <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                autoFocus
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="mb-5">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
              Xác nhận mật khẩu mới <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
              style={{
                background: 'var(--bg-secondary)',
                borderColor: mismatch ? '#EF4444' : 'var(--border-primary)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => { if (!mismatch) e.target.style.borderColor = '#F97316'; }}
              onBlur={(e) => { e.target.style.borderColor = mismatch ? '#EF4444' : 'var(--border-primary)'; }}
            />
            {mismatch && (
              <p className="text-xs mt-1" style={{ color: '#EF4444' }}>Mật khẩu không khớp</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
            >
              Hủy
            </button>
            <motion.button
              whileHover={{ scale: canSave ? 1.02 : 1 }}
              whileTap={{ scale: canSave ? 0.98 : 1 }}
              onClick={() => { if (canSave) { onSave(userId, newPw); onClose(); } }}
              disabled={!canSave}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: '#F97316' }}
            >
              <Check className="w-4 h-4" />
              Lưu mật khẩu
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function AdminUsersPage() {
  const { users, updateUserRole, updateUserStatus, currentUser, changeUserPassword, approvePlan, rejectPlan } = useAuth();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'pending_pro' | 'pro'>('all');
  const [showRoleDialog, setShowRoleDialog] = useState<string | null>(null);
  const [showPasswordFor, setShowPasswordFor] = useState<Record<string, boolean>>({});
  const [changePasswordTarget, setChangePasswordTarget] = useState<{ id: string; name: string; password: string } | null>(null);
  const [toast, setToast] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || user.role === roleFilter;
      const matchStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchPlan = planFilter === 'all' || user.plan === planFilter || (planFilter === 'free' && !user.plan);
      return matchSearch && matchRole && matchStatus && matchPlan;
    });
  }, [users, search, roleFilter, statusFilter, planFilter]);

  // Reset to page 1 whenever filters change
  const prevFilterKey = `${search}|${roleFilter}|${statusFilter}|${planFilter}`;
  const [lastFilterKey, setLastFilterKey] = useState(prevFilterKey);
  if (prevFilterKey !== lastFilterKey) {
    setPage(1);
    setLastFilterKey(prevFilterKey);
  }

  const pagedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswordFor((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleChangePassword = (userId: string, newPassword: string) => {
    changeUserPassword(userId, newPassword);
    setToast('✅ Đã đổi mật khẩu thành công');
    setTimeout(() => setToast(''), 2500);
  };

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

  const getPlanBadge = (plan?: string, role?: string) => {
    if (role === 'admin') return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
        🛡️ Admin
      </span>
    );
    if (plan === 'pending_pro') return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
        ⏳ Chờ duyệt
      </span>
    );
    const isPro = plan === 'pro' || role === 'editor';
    if (isPro) return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.15),rgba(234,88,12,0.1))', color: '#F97316', border: '1px solid rgba(249,115,22,0.3)' }}>
        <Crown className="w-3 h-3" /> Pro
      </span>
    );
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(113,118,123,0.1)', color: 'var(--text-secondary)' }}>
        Free
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Quản lý Users</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {users.length} users · {users.filter((u) => u.plan === 'pending_pro').length} chờ duyệt Pro · {users.filter((u) => u.plan === 'pro' || u.role === 'editor').length} Pro
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Tìm user..."
        />
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
          <option value="blocked">Blocked</option>
        </select>
      </div>


      {/* Pending Pro upgrade alert */}
      {users.some((u) => u.plan === 'pending_pro') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-xl border flex items-center justify-between"
          style={{ background: 'rgba(249,115,22,0.05)', borderColor: 'rgba(249,115,22,0.2)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(249,115,22,0.1)' }}>
              <Crown className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#F97316' }}>
                {users.filter((u) => u.plan === 'pending_pro').length} user đăng ký nâng cấp Pro
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Duyệt để kích hoạt gói Pro cho user</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPlanFilter(planFilter === 'pending_pro' ? 'all' : 'pending_pro')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                background: planFilter === 'pending_pro' ? 'rgba(249,115,22,0.2)' : 'rgba(249,115,22,0.08)',
                color: '#F97316',
                border: planFilter === 'pending_pro' ? '1px solid rgba(249,115,22,0.4)' : '1px solid transparent',
              }}
            >
              {planFilter === 'pending_pro' ? 'Tất cả' : 'Xem'}
            </button>
            <button
              onClick={() => { users.filter((u) => u.plan === 'pending_pro').forEach((u) => approvePlan(u.id)); setToast('✅ Đã duyệt tất cả gói Pro'); setTimeout(() => setToast(''), 2500); }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(0,186,124,0.1)', color: '#00BA7C' }}
            >
              Duyệt tất cả
            </button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 860 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 150 }}>User</th>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 170 }}>Email</th>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 150 }}>Mật khẩu</th>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 90 }}>Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 90 }}>Gói</th>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 80 }}>Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 100 }}>Ngày tạo</th>
                <th className="text-right py-3 px-4 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)', minWidth: 160 }}>Actions</th>
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
                  {/* User */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="" className="w-9 h-9 rounded-full shrink-0" style={{ background: 'var(--border-primary)' }} />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</span>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="py-3 px-4 text-sm whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  {/* Password column */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono" style={{ color: 'var(--text-primary)', minWidth: 100 }}>
                        {showPasswordFor[user.id] ? (user.password || '—') : '••••••••'}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(user.id)}
                        className="p-1 rounded hover:bg-[var(--bg-hover-md)]"
                        title={showPasswordFor[user.id] ? 'Ẩn' : 'Hiện mật khẩu'}
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {showPasswordFor[user.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  {/* Role */}
                  <td className="py-3 px-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                  {/* Plan/VIP */}
                  <td className="py-3 px-4 whitespace-nowrap">{getPlanBadge(user.plan, user.role)}</td>
                  {/* Status */}
                  <td className="py-3 px-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                  {/* Date */}
                  <td className="py-3 px-4 text-sm whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{formatDate(user.createdAt)}</td>
                  {/* Actions */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1 relative">
                      {/* Change Password - for all users incl. self */}
                      <button
                        onClick={() => setChangePasswordTarget({ id: user.id, name: user.name, password: user.password || '' })}
                        className="p-1.5 rounded-lg transition-colors hover:bg-orange-500/10"
                        title="Đổi mật khẩu"
                        style={{ color: '#F97316' }}
                      >
                        <KeyRound className="w-4 h-4" />
                      </button>

                      {/* Approve / Reject Pro plan */}
                      {user.plan === 'pending_pro' && user.id !== currentUser?.id && (
                        <>
                          <button
                            onClick={() => { approvePlan(user.id); setToast(`✅ Đã duyệt Pro cho ${user.name}`); setTimeout(() => setToast(''), 2500); }}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold hover:bg-green-500/10"
                            style={{ color: '#00BA7C' }}
                            title="Duyệt gói Pro"
                          >
                            <Check className="w-3.5 h-3.5" /> Duyệt
                          </button>
                          <button
                            onClick={() => { rejectPlan(user.id); setToast(`❌ Từ chối Pro của ${user.name}`); setTimeout(() => setToast(''), 2500); }}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold hover:bg-red-500/10"
                            style={{ color: '#EF4444' }}
                            title="Từ chối gói Pro"
                          >
                            <X className="w-3.5 h-3.5" /> Từ chối
                          </button>
                        </>
                      )}

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
                                    onClick={() => { updateUserRole(user.id, role); setShowRoleDialog(null); }}
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


                          {/* Block/Unblock */}
                          <button
                            onClick={() => updateUserStatus(user.id, user.status === 'blocked' ? 'active' : 'blocked')}
                            className="p-1.5 rounded-lg transition-colors"
                            title={user.status === 'blocked' ? 'Mở khóa' : 'Khóa'}
                            style={{ color: user.status === 'blocked' ? '#00BA7C' : '#EF4444' }}
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

      {/* Change Password Modal */}
      {changePasswordTarget && (
        <ChangePasswordModal
          userId={changePasswordTarget.id}
          userName={changePasswordTarget.name}
          currentPassword={changePasswordTarget.password}
          onSave={handleChangePassword}
          onClose={() => setChangePasswordTarget(null)}
        />
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium z-50"
            style={{ background: '#00BA7C', color: '#fff' }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
