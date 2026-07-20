'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

export default function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  // Build page number list with ellipsis
  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 4) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = 'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
      {/* Left: count info + page size */}
      <div className="flex items-center gap-3">
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {total === 0 ? 'Không có kết quả' : `${from}–${to} / ${total}`}
        </span>
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
            className="px-2 py-1 rounded-lg border text-xs focus:outline-none"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>{s} / trang</option>
            ))}
          </select>
        )}
      </div>

      {/* Right: page buttons */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* First */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className={btnBase}
            style={{ color: page === 1 ? 'var(--text-secondary)' : 'var(--text-primary)', opacity: page === 1 ? 0.4 : 1 }}
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </motion.button>

          {/* Prev */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className={btnBase}
            style={{ color: page === 1 ? 'var(--text-secondary)' : 'var(--text-primary)', opacity: page === 1 ? 0.4 : 1 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </motion.button>

          {/* Page numbers */}
          {getPages().map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                ···
              </span>
            ) : (
              <motion.button
                key={p}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(p as number)}
                className={btnBase}
                style={
                  p === page
                    ? { background: '#F97316', color: '#fff', boxShadow: '0 2px 8px rgba(249,115,22,0.35)' }
                    : { background: 'transparent', color: 'var(--text-primary)' }
                }
              >
                {p}
              </motion.button>
            )
          )}

          {/* Next */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className={btnBase}
            style={{ color: page === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)', opacity: page === totalPages ? 0.4 : 1 }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* Last */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            className={btnBase}
            style={{ color: page === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)', opacity: page === totalPages ? 0.4 : 1 }}
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
