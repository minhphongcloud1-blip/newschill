'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { mockArticles } from '@/data/articles';
import { mockTopics } from '@/data/topics';
import { formatDate, formatNumber } from '@/lib/utils';
import Link from 'next/link';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function AdminArticlesPage() {
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [articles, setArticles] = useState(mockArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.author.name.toLowerCase().includes(search.toLowerCase());
      const matchTopic = topicFilter === 'all' || article.topic.slug === topicFilter;
      return matchSearch && matchTopic;
    });
  }, [articles, search, topicFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedArticles = filtered.slice(startIndex, startIndex + pageSize);
  const startItem = filtered.length > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(startIndex + pageSize, filtered.length);

  // Reset page when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleTopicFilter = (value: string) => {
    setTopicFilter(value);
    setCurrentPage(1);
  };
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'dots')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push('dots');
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (safeCurrentPage < totalPages - 2) pages.push('dots');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Quản lý Bài viết</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{filtered.length} bài viết</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tìm bài viết hoặc tác giả..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none"
            style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)', color: 'var(--text-primary)' }}
            onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
          />
        </div>
        <select
          value={topicFilter}
          onChange={(e) => handleTopicFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border text-sm focus:outline-none"
          style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)', color: 'var(--text-primary)' }}
        >
          <option value="all">Tất cả chủ đề</option>
          {mockTopics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.icon} {topic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'var(--glass-blur)', borderColor: 'var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Bài viết</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Tác giả</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Chủ đề</th>
                <th className="text-right py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>❤️</th>
                <th className="text-right py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>💬</th>
                <th className="text-left py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Ngày đăng</th>
                <th className="text-right py-3 px-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedArticles.map((article, i) => (
                <motion.tr
                  key={article.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: '1px solid var(--border-primary)' }}
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium truncate max-w-[280px]" style={{ color: 'var(--text-primary)' }}>{article.title}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full" style={{ background: 'var(--border-primary)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{article.author.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${article.topic.color}20`, color: article.topic.color }}>
                      {article.topic.icon} {article.topic.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right" style={{ color: '#F91880' }}>{formatNumber(article.likesCount)}</td>
                  <td className="py-3 px-4 text-sm text-right" style={{ color: '#3B82F6' }}>{formatNumber(article.commentsCount)}</td>
                  <td className="py-3 px-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{formatDate(article.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/article/${article.id}`}>
                        <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'var(--text-secondary)' }} title="Xem">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                        style={{ color: '#EF4444' }}
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center" style={{ color: 'var(--text-secondary)' }}>
            <p>Không tìm thấy bài viết nào</p>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t flex flex-wrap items-center justify-between gap-4"
            style={{ borderColor: 'var(--border-primary)' }}
          >
            {/* Left: info + page size */}
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Hiển thị <strong style={{ color: 'var(--text-primary)' }}>{startItem}-{endItem}</strong> / <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Hiển thị</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-2 py-1 rounded-lg border text-xs focus:outline-none"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>/ trang</span>
              </div>
            </div>

            {/* Right: page navigation */}
            <div className="flex items-center gap-1">
              {/* First */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
                title="Trang đầu"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, i) =>
                page === 'dots' ? (
                  <span key={`dots-${i}`} className="px-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    ···
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      background: safeCurrentPage === page ? '#8B5CF6' : 'transparent',
                      color: safeCurrentPage === page ? '#fff' : 'var(--text-secondary)',
                    }}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
                title="Trang cuối"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
