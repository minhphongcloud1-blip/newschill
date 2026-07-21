'use client';

import { useState, useMemo } from 'react';
import { ScrollText, CheckCircle2, XCircle, RefreshCw, Filter } from 'lucide-react';
import { useRss } from '@/contexts/RssContext';
import { FetchLog } from '@/types';
import Pagination from '@/components/ui/Pagination';
import {
  AdminPageHeader, AdminBadge, AdminSelect, AdminButton,
  DataTable, DataTableColumn,
} from '@/components/admin/AdminUI';

const ITEMS_PER_PAGE = 10;

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

function StatCard({ value, label, color, bg }: { value: number; label: string; color: string; bg: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: bg }}>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

export default function FetchLogsPage() {
  const { logs, sources, refetchLogs } = useRss();
  const [filterSource, setFilterSource] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'error'>('all');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchLogs();
    setRefreshing(false);
  };

  const filtered = useMemo(() =>
    logs.filter((l) => {
      if (filterSource && l.sourceName !== filterSource) return false;
      if (filterStatus !== 'all' && l.status !== filterStatus) return false;
      return true;
    }),
    [logs, filterSource, filterStatus]
  );

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const successCount = logs.filter((l) => l.status === 'success').length;
  const errorCount = logs.filter((l) => l.status === 'error').length;
  const totalSaved = logs.reduce((s, l) => s + l.savedItems, 0);

  const handleFilter = (src: string, status: 'all' | 'success' | 'error') => {
    setFilterSource(src);
    setFilterStatus(status);
    setPage(1);
  };

  const sourceOptions = [
    { value: '', label: 'Tất cả nguồn' },
    ...sources.map((s) => ({ value: s.name, label: s.name })),
  ];

  const statusOptions = [
    { value: 'all',     label: 'Tất cả' },
    { value: 'success', label: '✅ Thành công' },
    { value: 'error',   label: '❌ Lỗi' },
  ];

  const cols: DataTableColumn[] = [
    { key: 'time',   label: 'Thời gian' },
    { key: 'source', label: 'Nguồn / Feed' },
    { key: 'status', label: 'Kết quả', hide: 'sm' },
    { key: 'detail', label: 'Chi tiết' },
  ];

  return (
    <div className="p-4 md:p-6">
      <AdminPageHeader
        icon={<ScrollText className="w-5 h-5" style={{ color: '#8B5CF6' }} />}
        title="Nhật ký đồng bộ"
        subtitle={`${logs.length} bản ghi · ${successCount} thành công · ${errorCount} lỗi`}
        action={
          <AdminButton
            variant="secondary"
            icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
            onClick={handleRefresh}
          >
            {refreshing ? 'Đang tải...' : 'Làm mới'}
          </AdminButton>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard value={logs.length}   label="Tổng fetch"  color="#8B5CF6" bg="rgba(139,92,246,0.1)" />
        <StatCard value={successCount}  label="Thành công"  color="#22C55E" bg="rgba(34,197,94,0.1)" />
        <StatCard value={errorCount}    label="Lỗi"         color="#EF4444" bg="rgba(239,68,68,0.1)" />
        <StatCard value={totalSaved}    label="Bài đã lưu"  color="#F59E0B" bg="rgba(245,158,11,0.1)" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 shrink-0" style={{ color: 'var(--text-secondary)' }} />
          <div className="w-40">
            <AdminSelect value={filterSource} onChange={(v) => handleFilter(v, filterStatus)} options={sourceOptions} />
          </div>
        </div>
        <div className="w-44">
          <AdminSelect value={filterStatus} onChange={(v) => handleFilter(filterSource, v as 'all' | 'success' | 'error')} options={statusOptions} />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={cols}
        rows={paginated}
        emptyText="Không có log nào"
        renderRow={(log) => {
          const isSuccess = log.status === 'success';
          return (
            <>
              <td className="px-4 py-3">
                <div className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{formatTime(log.timestamp)}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formatDate(log.timestamp)}</div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{log.sourceName}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{log.feedName}</div>
              </td>
              <td className="px-4 py-3 max-sm:hidden">
                <AdminBadge
                  variant={isSuccess ? 'green' : 'red'}
                  icon={isSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                >
                  {isSuccess ? 'Thành công' : 'Lỗi'}
                </AdminBadge>
              </td>
              <td className="px-4 py-3">
                {isSuccess ? (
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>Có <strong style={{ color: 'var(--text-primary)' }}>{log.totalItems}</strong> bài</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Lưu <strong style={{ color: '#22C55E' }}>{log.savedItems}</strong></span>
                    <span style={{ color: 'var(--text-secondary)' }}>Trùng <strong style={{ color: '#F59E0B' }}>{log.duplicateItems}</strong></span>
                    <span style={{ color: 'var(--text-secondary)' }}>AI OK <strong style={{ color: '#8B5CF6' }}>{log.aiSuccessItems}</strong></span>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs font-medium" style={{ color: '#EF4444' }}>{log.errorMessage ?? 'Unknown error'}</div>
                    {log.retryAfter !== undefined && (
                      <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        <RefreshCw className="w-3 h-3" />Retry sau {log.retryAfter} phút
                      </div>
                    )}
                  </div>
                )}
              </td>
            </>
          );
        }}
      />

      {filtered.length > ITEMS_PER_PAGE && (
        <div className="mt-4">
          <Pagination total={filtered.length} page={page} pageSize={ITEMS_PER_PAGE} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
