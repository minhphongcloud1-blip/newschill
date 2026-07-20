'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Crown, Star, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FREE_FEATURES = [
  'Đọc bài viết không giới hạn',
  'Bình luận bài viết',
  'Like & Chia sẻ bài',
  'Theo dõi xu hướng & chủ đề',
];

const PRO_FEATURES = [
  'Tất cả tính năng Free',
  'Viết bài không giới hạn',
  'Chỉnh sửa bài viết của mình',
  'Badge "Pro Writer" nổi bật',
  'Ưu tiên hiển thị bài viết',
  'Thống kê bài viết chi tiết',
];

interface Props {
  onClose: () => void;
}

export default function UpgradeModal({ onClose }: Props) {
  const { upgradePlan } = useAuth();
  const [step, setStep] = useState<'plans' | 'payment' | 'success'>('plans');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      upgradePlan();
      setStep('success');
      setProcessing(false);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-full max-w-[520px] rounded-3xl overflow-hidden"
          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}
        >
          {/* ── Plans step ── */}
          {step === 'plans' && (
            <>
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 text-center">
                <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-[var(--bg-hover-md)]">
                  <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </button>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}
                  className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                  <Crown className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Nâng cấp lên Pro</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Mở khóa khả năng viết bài và nhiều tính năng cao cấp</p>
              </div>

              {/* Plans */}
              <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                {/* Free */}
                <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-secondary)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Free</span>
                  </div>
                  <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>0₫</p>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>Hiện tại của bạn</p>
                  <ul className="space-y-2">
                    {FREE_FEATURES.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#00BA7C' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl p-4 relative overflow-hidden cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 60%, #DC2626 100%)' }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 70% 20%, #fff, transparent 60%)' }} />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-4 h-4 text-white" />
                      <span className="font-bold text-sm text-white">Pro</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}>HOT</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-0.5">99.000₫</p>
                    <p className="text-xs text-white/70 mb-4">mỗi tháng</p>
                    <ul className="space-y-2">
                      {PRO_FEATURES.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-white">
                          <Star className="w-3.5 h-3.5 mt-0.5 shrink-0 fill-white" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePay}
                  className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
                >
                  <Sparkles className="w-4 h-4" />
                  Nâng cấp Pro — 99.000₫/tháng
                </motion.button>
                <p className="text-center text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>Hủy bất kỳ lúc nào · Thanh toán an toàn</p>
              </div>
            </>
          )}

          {/* ── Payment step ── */}
          {step === 'payment' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Thanh toán</h2>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Gói Pro · 99.000₫/tháng</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-hover-md)]">
                  <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>

              {/* Order summary */}
              <div className="rounded-2xl p-4 mb-5 border" style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-secondary)' }}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--text-secondary)' }}>Gói Pro</span>
                  <span style={{ color: 'var(--text-primary)' }}>99.000₫</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span style={{ color: 'var(--text-secondary)' }}>VAT (0%)</span>
                  <span style={{ color: 'var(--text-primary)' }}>0₫</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold" style={{ borderColor: 'var(--border-primary)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Tổng cộng</span>
                  <span style={{ color: '#F97316' }}>99.000₫</span>
                </div>
              </div>

              {/* Fake card */}
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Số thẻ</label>
                  <input defaultValue="4242 4242 4242 4242" readOnly className="w-full px-3 py-2.5 rounded-xl border text-sm font-mono"
                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Hết hạn</label>
                    <input defaultValue="12/28" readOnly className="w-full px-3 py-2.5 rounded-xl border text-sm font-mono"
                      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>CVV</label>
                    <input defaultValue="•••" readOnly className="w-full px-3 py-2.5 rounded-xl border text-sm font-mono"
                      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>

              <p className="text-xs text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                🔒 Đây là môi trường demo — không có giao dịch thực
              </p>

              <motion.button
                whileHover={{ scale: processing ? 1 : 1.02 }}
                whileTap={{ scale: processing ? 1 : 0.98 }}
                onClick={handleConfirmPayment}
                disabled={processing}
                className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                style={{ background: processing ? '#999' : 'linear-gradient(135deg, #F97316, #EA580C)' }}
              >
                {processing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4" />
                    Xác nhận thanh toán
                  </>
                )}
              </motion.button>
            </div>
          )}

          {/* ── Success step ── */}
          {step === 'success' && (
            <div className="p-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                <Crown className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Yêu cầu đã gửi! 🎉</h2>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Thanh toán của bạn đã được ghi nhận.<br />
                  Admin đang xem xét và sẽ kích hoạt gói Pro cho bạn sớm nhất.
                </p>
                <div className="rounded-xl p-3 mb-6 border" style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.2)' }}>
                  <p className="text-xs font-medium" style={{ color: '#F59E0B' }}>⏳ Đang chờ admin duyệt</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Bạn sẽ nhận được thông báo khi gói được kích hoạt</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
                >
                  Đã hiểu, tiếp tục →
                </motion.button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
