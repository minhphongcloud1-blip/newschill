'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Trash2, Eye, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Check, X, RefreshCw,
  ExternalLink, Bot,
} from 'lucide-react';
import { formatDate, formatNumber } from '@/lib/utils';
import Link from 'next/link';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import { useRss } from '@/contexts/RssContext';
import { useAuth } from '@/contexts/AuthContext';
import { AiDraft, DraftStatus } from '@/types';
import {
  AdminPageHeader, AdminTable, AdminTr, AdminTd, AdminBadge,
  AdminTabs, AdminActionButton, AdminToastContainer, useToast,
  AnimatePresence as AdminAnimatePresence,
} from '@/components/admin/AdminUI';

// ── helpers ───────────────────────────────────────────────
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const DRAFT_PAGE_SIZE = 8;

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Vừa xong';
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}h trước` : `${Math.floor(h / 24)} ngày trước`;
}

const draftStatusMap: Record<DraftStatus, { label: string; variant: 'yellow' | 'green' | 'red' }> = {
  pending:  { label: 'Chờ duyệt', variant: 'yellow' },
  approved: { label: 'Đã duyệt',  variant: 'green' },
  rejected: { label: 'Từ chối',   variant: 'red' },
};

// ── Draft Preview Modal ───────────────────────────────────
function DraftPreviewModal({ draft, onApprove, onReject, onRerun, onClose }: {
  draft: AiDraft;
  onApprove: () => void;
  onReject: () => void;
  onRerun: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: 'var(--border-primary)' }}>
          <button onClick={onClose} className="flex items-center gap-1.5 text-sm hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>
            <ChevronLeft className="w-4 h-4" /> Đóng
          </button>
          {draft.status === 'pending' && (
            <div className="flex items-center gap-2">
              <button onClick={onRerun} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
                <RefreshCw className="w-3.5 h-3.5" /> Chạy lại AI
              </button>
              <button onClick={onReject} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                <X className="w-3.5 h-3.5" /> Từ chối
              </button>
              <button onClick={onApprove} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#22C55E' }}>
                <Check className="w-3.5 h-3.5" /> Duyệt
              </button>
            </div>
          )}
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          <img src={draft.coverImage} alt={draft.title} className="w-full h-52 object-cover rounded-xl mb-4" />
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <AdminBadge variant="purple">🤖 AI Generated</AdminBadge>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Nguồn: {draft.sourceName}</span>
            <a href={draft.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs hover:underline" style={{ color: '#8B5CF6' }}>
              Link gốc <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{draft.title}</h2>
          <p className="text-sm mb-4 italic" style={{ color: 'var(--text-secondary)' }}>{draft.excerpt}</p>
          <div className="p-3 rounded-xl mb-4" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#8B5CF6' }}>✨ AI Summary</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{draft.aiSummary}</p>
          </div>
          <div className="prose-sm text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}
            dangerouslySetInnerHTML={{ __html: draft.content }} />
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function AdminArticlesPage() {
  const { drafts, updateDraftStatus, fetchAllDrafts } = useRss();
  const { topics } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  // Main tab: published vs drafts
  const [mainTab, setMainTab] = useState<'published' | 'drafts'>('published');

  // Refresh drafts when page loads or switching to drafts tab
  useEffect(() => { fetchAllDrafts(); }, [fetchAllDrafts]);

  // Published articles state (from Supabase)
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  interface SupaArticle {
    id: string; title: string; excerpt: string; content: string;
    cover_image: string; author_name: string; author_avatar: string;
    topic_id: string | null; topics?: { slug: string; name: string; icon: string; color: string } | null;
    likes_count: number; comments_count: number; shares_count: number;
    created_at: string;
  }
  const [articles, setArticles] = useState<SupaArticle[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Drafts state
  const [draftTab, setDraftTab] = useState<DraftStatus>('pending');
  const [draftSearch, setDraftSearch] = useState('');
  const [draftPage, setDraftPage] = useState(1);
  const [preview, setPreview] = useState<AiDraft | null>(null);

  // Fetch articles from Supabase
  const fetchArticles = useCallback(async () => {
    setArticlesLoading(true);
    try {
      const res = await fetch('/api/articles?pageSize=200');
      if (res.ok) {
        const json = await res.json();
        setArticles(json.data ?? []);
      }
    } catch { /* ignore */ }
    setArticlesLoading(false);
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  // ── Published logic ──
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        (a.author_name ?? '').toLowerCase().includes(search.toLowerCase());
      const matchTopic = topicFilter === 'all' || a.topics?.slug === topicFilter;
      return matchSearch && matchTopic;
    });
  }, [articles, search, topicFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedArticles = filtered.slice(startIndex, startIndex + pageSize);
  const startItem = filtered.length > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(startIndex + pageSize, filtered.length);

  const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };
  const handleTopicFilter = (v: string) => { setTopicFilter(v); setCurrentPage(1); };
  const handlePageSizeChange = (v: number) => { setPageSize(v); setCurrentPage(1); };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) return;
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    if (res.ok) {
      addToast('Đã xóa bài viết', 'success');
      fetchArticles();
    } else {
      addToast('Lỗi khi xóa bài viết', 'error');
    }
  };

  const handleApproveDraft = async (id: string) => {
    const result = await updateDraftStatus(id, 'approved');
    if (result.ok) {
      addToast('Đã duyệt bài viết và đăng lên', 'success');
      fetchArticles();
    } else {
      addToast(result.error ?? 'Lỗi khi duyệt bài viết', 'error');
    }
  };
  const handleRejectDraft = async (id: string) => {
    await updateDraftStatus(id, 'rejected');
    addToast('Đã từ chối bài viết', 'info');
  };

  const [rerunning, setRerunning] = useState<string | null>(null);
  const handleRerunAi = async (draftId: string) => {
    setRerunning(draftId);
    try {
      const aiConfigRaw = typeof window !== 'undefined' ? localStorage.getItem('newsx_ai_config') : null;
      const aiConfig = aiConfigRaw ? JSON.parse(aiConfigRaw) : null;
      const res = await fetch(`/api/drafts/${draftId}/rerun`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiConfig }),
      });
      const data = await res.json();
      if (!res.ok) {
        addToast(data.error ?? 'Lỗi chạy lại AI', 'error');
      } else {
        addToast('Đã cập nhật nội dung AI mới', 'success');
        fetchAllDrafts();
      }
    } catch {
      addToast('Không thể kết nối API', 'error');
    } finally {
      setRerunning(null);
      setPreview(null);
    }
  };

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

  // ── Drafts logic ──
  const draftCounts = useMemo(() => ({
    pending:  drafts.filter((d) => d.status === 'pending').length,
    approved: drafts.filter((d) => d.status === 'approved').length,
    rejected: drafts.filter((d) => d.status === 'rejected').length,
  }), [drafts]);

  const filteredDrafts = useMemo(() => {
    const q = draftSearch.toLowerCase();
    return drafts.filter((d) => d.status === draftTab && (
      d.title.toLowerCase().includes(q) ||
      d.sourceName.toLowerCase().includes(q)
    ));
  }, [drafts, draftTab, draftSearch]);

  const paginatedDrafts = filteredDrafts.slice((draftPage - 1) * DRAFT_PAGE_SIZE, draftPage * DRAFT_PAGE_SIZE);

  const draftCols = [
    { key: 'img',     label: 'Ảnh',       hide: 'sm' as const },
    { key: 'title',   label: 'Tiêu đề' },
    { key: 'source',  label: 'Nguồn',     hide: 'md' as const },
    { key: 'summary', label: 'AI Summary', hide: 'lg' as const },
    { key: 'time',    label: 'Thời gian',  hide: 'md' as const },
    { key: 'status',  label: 'Trạng thái', align: 'center' as const, hide: 'sm' as const },
    { key: 'actions', label: '',           align: 'right' as const },
  ];

  const pendingCount = draftCounts.pending;

  return (
    <div className="p-4 md:p-6">
      <AdminPageHeader
        icon={<FileText className="w-5 h-5" style={{ color: '#8B5CF6' }} />}
        title="Quản lý Bài viết"
        subtitle={`${articles.length} bài đã xuất bản · ${pendingCount} chờ duyệt`}
      />

      {/* Main tabs */}
      <div className="mb-5">
        <AdminTabs
          tabs={[
            { key: 'published', label: '📰 Đã xuất bản', count: articles.length },
            { key: 'drafts', label: '🤖 Tin chờ duyệt', count: pendingCount, color: '#F59E0B' },
          ]}
          active={mainTab}
          onChange={(t) => {
            setMainTab(t as typeof mainTab);
            if (t === 'drafts') fetchAllDrafts();
          }}
        />
      </div>

      <AnimatePresence mode="wait">

        {/* ── Published Articles ── */}
        {mainTab === 'published' && (
          <motion.div key="published" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
              <SearchInput value={search} onChange={handleSearch} placeholder="Tìm bài viết hoặc tác giả..." />
              <select
                value={topicFilter}
                onChange={(e) => handleTopicFilter(e.target.value)}
                className="h-10 px-3 rounded-xl border text-sm focus:outline-none"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
              >
                <option value="all">Tất cả chủ đề</option>
                {topics.map((topic) => (
                  <option key={topic.slug} value={topic.slug}>{topic.icon} {topic.name}</option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)' }}>
                      <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Bài viết</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Tác giả</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Chủ đề</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>❤️</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>💬</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Ngày đăng</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedArticles.map((article, i) => (
                      <motion.tr key={article.id}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                        className="border-t transition-colors hover:bg-[var(--bg-hover)]"
                        style={{ borderColor: 'var(--border-primary)' }}
                      >
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium truncate max-w-[280px]" style={{ color: 'var(--text-primary)' }}>{article.title}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {article.author_avatar && <img src={article.author_avatar} alt="" className="w-6 h-6 rounded-full" />}
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{article.author_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {article.topics ? (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${article.topics.color}20`, color: article.topics.color }}>
                              {article.topics.icon} {article.topics.name}
                            </span>
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-right" style={{ color: '#F91880' }}>{formatNumber(article.likes_count)}</td>
                        <td className="py-3 px-4 text-sm text-right" style={{ color: '#3B82F6' }}>{formatNumber(article.comments_count)}</td>
                        <td className="py-3 px-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{formatDate(article.created_at)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/article/${article.id}`}>
                              <button className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-secondary)' }} title="Xem">
                                <Eye className="w-4 h-4" />
                              </button>
                            </Link>
                            <button onClick={() => handleDelete(article.id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10" style={{ color: '#EF4444' }} title="Xóa">
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
                <div className="px-4 py-3 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Hiển thị <strong style={{ color: 'var(--text-primary)' }}>{startItem}-{endItem}</strong> / <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Hiển thị</span>
                      <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="px-2 py-1 rounded-lg border text-xs focus:outline-none"
                        style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}>
                        {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>/ trang</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setCurrentPage(1)} disabled={safeCurrentPage === 1} className="p-1.5 rounded-lg disabled:opacity-30" style={{ color: 'var(--text-secondary)' }}>
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safeCurrentPage === 1} className="p-1.5 rounded-lg disabled:opacity-30" style={{ color: 'var(--text-secondary)' }}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {getPageNumbers().map((p, i) =>
                      p === 'dots' ? (
                        <span key={`d-${i}`} className="px-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>···</span>
                      ) : (
                        <button key={p} onClick={() => setCurrentPage(p)}
                          className="min-w-[32px] h-8 rounded-lg text-sm font-medium"
                          style={{ background: safeCurrentPage === p ? '#8B5CF6' : 'transparent', color: safeCurrentPage === p ? '#fff' : 'var(--text-secondary)' }}>
                          {p}
                        </button>
                      )
                    )}
                    <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safeCurrentPage === totalPages} className="p-1.5 rounded-lg disabled:opacity-30" style={{ color: 'var(--text-secondary)' }}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={safeCurrentPage === totalPages} className="p-1.5 rounded-lg disabled:opacity-30" style={{ color: 'var(--text-secondary)' }}>
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── AI Drafts ── */}
        {mainTab === 'drafts' && (
          <motion.div key="drafts" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <AdminTabs
              tabs={[
                { key: 'pending',  label: 'Chờ duyệt', count: draftCounts.pending,  color: '#F59E0B' },
                { key: 'approved', label: 'Đã duyệt',  count: draftCounts.approved, color: '#22C55E' },
                { key: 'rejected', label: 'Từ chối',   count: draftCounts.rejected, color: '#EF4444' },
              ]}
              active={draftTab}
              onChange={(t) => { setDraftTab(t as DraftStatus); setDraftPage(1); setDraftSearch(''); }}
            />

            <SearchInput value={draftSearch} onChange={(v) => { setDraftSearch(v); setDraftPage(1); }} placeholder="Tìm tiêu đề, nguồn..." />

            <AdminTable columns={draftCols} isEmpty={paginatedDrafts.length === 0}
              emptyText={draftTab === 'pending' ? '✅ Không có bài nào chờ duyệt' : 'Không có bài nào'}
            >
              {paginatedDrafts.map((draft) => {
                const badge = draftStatusMap[draft.status];
                return (
                  <AdminTr key={draft.id}>
                    <AdminTd hide="sm">
                      <img src={draft.coverImage} alt={draft.title} className="w-14 h-10 object-cover rounded-lg" />
                    </AdminTd>
                    <AdminTd>
                      <div className="flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 shrink-0" style={{ color: '#8B5CF6' }} />
                        <p className="text-sm font-semibold line-clamp-2 max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{draft.title}</p>
                      </div>
                    </AdminTd>
                    <AdminTd hide="md">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{draft.sourceName}</span>
                    </AdminTd>
                    <AdminTd hide="lg">
                      <p className="text-xs line-clamp-2 max-w-[180px]" style={{ color: 'var(--text-secondary)' }}>{draft.aiSummary}</p>
                    </AdminTd>
                    <AdminTd hide="md">
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{timeAgo(draft.createdAt)}</span>
                    </AdminTd>
                    <AdminTd align="center" hide="sm">
                      <AdminBadge variant={badge.variant}>{badge.label}</AdminBadge>
                    </AdminTd>
                    <AdminTd align="right">
                      <div className="flex items-center gap-1 justify-end">
                        <AdminActionButton icon={<Eye className="w-4 h-4" />} label="Xem" onClick={() => setPreview(draft)} />
                        {draft.status === 'pending' && (
                          <>
                            <AdminActionButton icon={rerunning === draft.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} label="AI" variant="warning" onClick={() => handleRerunAi(draft.id)} />
                            <AdminActionButton icon={<Check className="w-4 h-4" />} label="Duyệt" variant="success" onClick={() => handleApproveDraft(draft.id)} />
                            <AdminActionButton icon={<X className="w-4 h-4" />} label="Từ chối" variant="danger" onClick={() => handleRejectDraft(draft.id)} />
                          </>
                        )}
                      </div>
                    </AdminTd>
                  </AdminTr>
                );
              })}
            </AdminTable>

            {filteredDrafts.length > DRAFT_PAGE_SIZE && (
              <Pagination total={filteredDrafts.length} page={draftPage} pageSize={DRAFT_PAGE_SIZE} onPageChange={setDraftPage} />
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* Draft preview modal */}
      <AnimatePresence>
        {preview && (
          <DraftPreviewModal
            draft={preview}
            onApprove={() => { handleApproveDraft(preview.id); setPreview(null); }}
            onReject={() => { handleRejectDraft(preview.id); setPreview(null); }}
            onRerun={() => handleRerunAi(preview.id)}
            onClose={() => setPreview(null)}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AdminToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
