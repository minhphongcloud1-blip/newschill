'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 500));

    const result = login(email, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-primary)' }}>
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-[120px] opacity-10"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <Flame className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            News<span style={{ color: '#F97316' }}>X</span>
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl p-8 border"
          style={{ background: 'var(--bg-glass-strong)', borderColor: 'var(--border-primary)' }}
        >
          <h1 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
            Đăng nhập
          </h1>
          <p className="text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
            Chào mừng bạn quay lại Newschill
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl text-sm"
              style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@newschill.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                  onBlur={(e) => (e.target.style.borderColor = '#2F3336')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border text-sm transition-colors focus:outline-none"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#F97316')}
                  onBlur={(e) => (e.target.style.borderColor = '#2F3336')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #2F3336' }}>
            <p className="text-xs text-center mb-3" style={{ color: 'var(--text-secondary)' }}>
              Tài khoản demo
            </p>
            <div className="space-y-2">
              {[
                { label: '🛡️ Admin', email: 'admin@newschill.com' },
                { label: '✍️ Editor', email: 'tuan@newschill.com' },
                { label: '👤 Reader', email: 'cuong@gmail.com' },
              ].map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('123456');
                  }}
                  className="w-full py-2 px-3 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer"
                  style={{ background: 'var(--bg-primary)', border: '1px solid #2F3336', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F97316';
                    e.currentTarget.style.color = '#E7E9EA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2F3336';
                    e.currentTarget.style.color = '#71767B';
                  }}
                >
                  <span>{account.label}</span>
                  <span>{account.email}</span>
                </button>
              ))}
              <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
                Mật khẩu: 123456
              </p>
            </div>
          </div>
        </motion.div>

        {/* Register link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-semibold transition-colors" style={{ color: '#F97316' }}>
            Đăng ký ngay
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
