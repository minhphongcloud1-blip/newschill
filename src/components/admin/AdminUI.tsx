// =========================================================
// Admin UI Shared Components
// Dùng chung cho tất cả trang admin để đồng nhất style
// =========================================================

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// AdminPageHeader
// ─────────────────────────────────────────────────────────
interface AdminPageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({ icon, title, subtitle, action }: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(139,92,246,0.1)' }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
          {subtitle && (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// AdminBadge — status / type badges
// ─────────────────────────────────────────────────────────
type BadgeVariant = 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray';

const badgeStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  green:  { bg: 'rgba(34,197,94,0.1)',   color: '#22C55E' },
  red:    { bg: 'rgba(239,68,68,0.1)',   color: '#EF4444' },
  yellow: { bg: 'rgba(245,158,11,0.1)',  color: '#F59E0B' },
  blue:   { bg: 'rgba(59,130,246,0.1)',  color: '#3B82F6' },
  purple: { bg: 'rgba(139,92,246,0.1)',  color: '#8B5CF6' },
  gray:   { bg: 'rgba(107,114,128,0.1)', color: '#6B7280' },
};

interface AdminBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function AdminBadge({ variant, children, icon, className = '' }: AdminBadgeProps) {
  const s = badgeStyles[variant];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
      style={{ background: s.bg, color: s.color }}
    >
      {icon}
      {children}
    </span>
  );
}

// ───────────────────────────────────────────────────────
// DataTable — universal admin table with built-in selection
// ───────────────────────────────────────────────────────
export interface DataTableColumn {
  key: string;
  label: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  hide?: 'sm' | 'md' | 'lg';
  width?: string; // e.g. 'w-10'
}

export interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (ids: string[]) => void;
  variant?: 'danger' | 'success' | 'warning' | 'default';
}

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn[];
  rows: T[];
  renderRow: (row: T, index: number, isSelected: boolean) => React.ReactNode;
  keyExtractor?: (row: T) => string;
  emptyText?: string;
  // Selection
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  bulkActions?: BulkAction[];
  // Misc
  loading?: boolean;
}

const hideClass: Record<string, string> = {
  sm: 'max-sm:hidden',
  md: 'max-md:hidden',
  lg: 'max-lg:hidden',
};

function DTCheckbox({ checked, indeterminate, onChange }: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onChange(e); }}
      className="flex items-center justify-center w-5 h-5 rounded transition-colors flex-shrink-0"
      style={{ color: (checked || indeterminate) ? '#8B5CF6' : 'var(--text-secondary)' }}
    >
      {indeterminate ? (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><rect x="3" y="9" width="14" height="2" rx="1" /></svg>
      ) : checked ? (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3 3h14v14H3z" rx="2" /><path d="M7 10l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="3" y="3" width="14" height="14" rx="2" /></svg>
      )}
    </button>
  );
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  renderRow,
  keyExtractor,
  emptyText = 'Không có dữ liệu',
  selectable = false,
  selectedIds,
  onSelectionChange,
  bulkActions = [],
  loading = false,
}: DataTableProps<T>) {
  const getKey = (row: T) => keyExtractor ? keyExtractor(row) : row.id;
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds?.has(getKey(r)));
  const someSelected = rows.some((r) => selectedIds?.has(getKey(r))) && !allSelected;
  const selectedCount = selectedIds?.size ?? 0;

  const toggleAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSelectionChange) return;
    if (allSelected) {
      const next = new Set(selectedIds);
      rows.forEach((r) => next.delete(getKey(r)));
      onSelectionChange(next);
    } else {
      const next = new Set(selectedIds);
      rows.forEach((r) => next.add(getKey(r)));
      onSelectionChange(next);
    }
  };

  const toggleOne = (id: string) => {
    if (!onSelectionChange || !selectedIds) return;
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelectionChange(next);
  };

  const bulkVariantStyle = (v?: string) => {
    if (v === 'danger')  return { background: 'rgba(239,68,68,0.1)',   color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' };
    if (v === 'success') return { background: 'rgba(34,197,94,0.1)',   color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' };
    if (v === 'warning') return { background: 'rgba(245,158,11,0.1)',  color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' };
    return { background: 'rgba(139,92,246,0.1)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.2)' };
  };

  return (
    <div>
      {/* Bulk action bar */}
      {selectable && selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl mb-3"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <span className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>
            Đã chọn {selectedCount} mục
          </span>
          <div className="flex-1" />
          {bulkActions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.onClick(Array.from(selectedIds ?? []))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={bulkVariantStyle(action.variant)}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
          <button
            onClick={() => onSelectionChange?.(new Set())}
            className="p-1 rounded-lg opacity-50 hover:opacity-100"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-primary)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)' }}>
                {selectable && (
                  <th className="px-4 py-3 w-10">
                    <DTCheckbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={toggleAll}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                      col.align === 'center' ? 'text-center' :
                      col.align === 'right'  ? 'text-right'  : 'text-left'
                    } ${col.hide ? hideClass[col.hide] : ''} ${col.width ?? ''}`}
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-16 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Đang tải...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-16 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {emptyText}
                  </td>
                </tr>
              ) : rows.map((row, index) => {
                const id = getKey(row);
                const isSelected = selectedIds?.has(id) ?? false;
                return (
                  <tr
                    key={id}
                    className="border-t transition-colors hover:bg-[var(--bg-hover-sm)] cursor-default"
                    style={{
                      borderColor: 'var(--border-primary)',
                      background: isSelected ? 'rgba(139,92,246,0.06)' : undefined,
                    }}
                  >
                    {selectable && (
                      <td className="px-4 py-3 w-10">
                        <DTCheckbox checked={isSelected} onChange={() => toggleOne(id)} />
                      </td>
                    )}
                    {renderRow(row, index, isSelected)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Legacy AdminTable — kept for backward compat, wraps DataTable
interface AdminTableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  hide?: 'sm' | 'md' | 'lg';
}
interface AdminTableProps {
  columns: AdminTableColumn[];
  children: React.ReactNode;
  emptyText?: string;
  isEmpty?: boolean;
}
export function AdminTable({ columns, children, emptyText = 'Không có dữ liệu', isEmpty }: AdminTableProps) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-primary)' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                    col.align === 'center' ? 'text-center' :
                    col.align === 'right'  ? 'text-right'  : 'text-left'
                  } ${col.hide ? hideClass[col.hide] : ''}`}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {emptyText}
                </td>
              </tr>
            ) : children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// AdminTable row helper
export function AdminTr({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <tr className={`border-t transition-colors hover:bg-[var(--bg-hover-sm)] ${className}`} style={{ borderColor: 'var(--border-primary)', ...style }}>
      {children}
    </tr>
  );
}

export function AdminTd({
  children,
  align = 'left',
  hide,
  className = '',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  hide?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const hideClass: Record<string, string> = {
    sm: 'max-sm:hidden',
    md: 'max-md:hidden',
    lg: 'max-lg:hidden',
  };
  return (
    <td
      className={`px-4 py-3 ${
        align === 'center' ? 'text-center' :
        align === 'right'  ? 'text-right'  : 'text-left'
      } ${hide ? hideClass[hide] : ''} ${className}`}
    >
      {children}
    </td>
  );
}

// ─────────────────────────────────────────────────────────
// AdminModal — consistent modal wrapper
// ─────────────────────────────────────────────────────────
interface AdminModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const modalSizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };

export function AdminModal({ title, onClose, children, footer, size = 'md' }: AdminModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.18 }}
        className={`w-full ${modalSizes[size]} rounded-2xl flex flex-col max-h-[90vh]`}
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: 'var(--border-primary)' }}
        >
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-hover-md)]"
          >
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-3 px-5 py-4 border-t shrink-0"
            style={{ borderColor: 'var(--border-primary)' }}
          >
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// AdminDeleteModal — confirm delete
// ─────────────────────────────────────────────────────────
interface AdminDeleteModalProps {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
  description?: string;
}

export function AdminDeleteModal({ itemName, onConfirm, onClose, description }: AdminDeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-sm rounded-2xl p-6 text-center"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(239,68,68,0.1)' }}
        >
          <AlertTriangle className="w-6 h-6" style={{ color: '#EF4444' }} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Xác nhận xóa</h3>
        <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
          Bạn có chắc muốn xóa <strong style={{ color: 'var(--text-primary)' }}>{itemName}</strong>?
        </p>
        {description && (
          <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>{description}</p>
        )}
        {!description && <div className="mb-4" />}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 px-4 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover-md)]"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 px-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#EF4444' }}
          >
            Xóa
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// AdminFormField — consistent form input
// ─────────────────────────────────────────────────────────
interface AdminFormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function AdminFormField({ label, error, hint, required, children }: AdminFormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {label}
        {required && <span className="ml-0.5" style={{ color: '#EF4444' }}>*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>{hint}</p>}
      {error && <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  );
}

export function AdminInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled,
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full h-10 px-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
      style={{
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-primary)',
      }}
      onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
      onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
    />
  );
}

export function AdminSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 rounded-xl text-sm outline-none"
      style={{
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-primary)',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────────────────
// AdminToggle — status toggle switch
// ─────────────────────────────────────────────────────────
export function AdminToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      {label && (
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      )}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-colors shrink-0"
        style={{ background: checked ? '#22C55E' : 'var(--bg-hover-md)' }}
      >
        <motion.div
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
        />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// AdminTabs — consistent tab bar
// ─────────────────────────────────────────────────────────
interface AdminTabItem {
  key: string;
  label: string;
  count?: number;
  color?: string;
}

interface AdminTabsProps {
  tabs: AdminTabItem[];
  active: string;
  onChange: (key: string) => void;
}

export function AdminTabs({ tabs, active, onChange }: AdminTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: isActive ? 'var(--bg-primary)' : 'transparent',
              color: isActive ? (tab.color ?? '#8B5CF6') : 'var(--text-secondary)',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {tab.label}{tab.count !== undefined ? ` (${tab.count})` : ''}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// AdminActionButton — icon action buttons in table rows
// ─────────────────────────────────────────────────────────
type ActionVariant = 'default' | 'danger' | 'success' | 'warning' | 'purple';

const actionColors: Record<ActionVariant, string> = {
  default: 'var(--text-secondary)',
  danger:  '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  purple:  '#8B5CF6',
};

const actionHovers: Record<ActionVariant, string> = {
  default: 'hover:bg-[var(--bg-hover-md)]',
  danger:  'hover:bg-red-500/10',
  success: 'hover:bg-green-500/10',
  warning: 'hover:bg-amber-500/10',
  purple:  'hover:bg-purple-500/10',
};

export function AdminActionButton({
  icon,
  label,
  onClick,
  variant = 'default',
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: ActionVariant;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`p-1.5 rounded-lg transition-colors ${actionHovers[variant]}`}
      style={{ color: actionColors[variant] }}
    >
      {icon}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// AdminButton — primary/secondary action buttons
// ─────────────────────────────────────────────────────────
interface AdminButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md';
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
}

const buttonStyles = {
  primary:   { bg: '#8B5CF6', color: '#fff' },
  secondary: { bg: 'var(--bg-secondary)', color: 'var(--text-primary)' },
  danger:    { bg: '#EF4444', color: '#fff' },
  success:   { bg: '#22C55E', color: '#fff' },
};

export function AdminButton({ children, onClick, variant = 'primary', size = 'md', disabled, icon, type = 'button' }: AdminButtonProps) {
  const s = buttonStyles[variant];
  const sizeClass = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-10 px-4 text-sm';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 ${sizeClass} rounded-xl font-semibold transition-opacity disabled:opacity-40 hover:opacity-90`}
      style={{ background: s.bg, color: s.color }}
    >
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// Toast Notification System
// ─────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

const toastStyles: Record<ToastType, { bg: string; color: string; icon: React.ReactNode }> = {
  success: { bg: 'rgba(34,197,94,0.12)', color: '#22C55E', icon: <CheckCircle2 className="w-4 h-4 shrink-0" /> },
  error:   { bg: 'rgba(239,68,68,0.12)',  color: '#EF4444', icon: <XCircle className="w-4 h-4 shrink-0" /> },
  info:    { bg: 'rgba(139,92,246,0.12)', color: '#8B5CF6', icon: <Info className="w-4 h-4 shrink-0" /> },
};

export function AdminToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const s = toastStyles[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium shadow-lg"
              style={{ background: 'var(--bg-primary)', border: `1px solid ${s.color}40`, color: s.color, minWidth: 260, maxWidth: 360 }}
            >
              <span style={{ color: s.color }}>{s.icon}</span>
              <span className="flex-1" style={{ color: 'var(--text-primary)' }}>{t.message}</span>
              <button onClick={() => onRemove(t.id)} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// Re-export AnimatePresence for convenience in admin pages
export { AnimatePresence };
