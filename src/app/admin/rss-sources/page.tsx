'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rss, Plus, Pencil, Trash2, ExternalLink, RefreshCw, Zap, Globe, Clock, Check, X, Loader2 } from 'lucide-react';
import { useRss } from '@/contexts/RssContext';
import { useAuth } from '@/contexts/AuthContext';
import { NewsSource, NewsSourceFeed } from '@/types';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import {
  AdminPageHeader, AdminBadge,
  AdminModal, AdminDeleteModal, AdminTabs,
  AdminFormField, AdminInput, AdminSelect, AdminToggle,
  AdminActionButton, AdminButton,
  AdminToastContainer, useToast,
  DataTable, DataTableColumn,
} from '@/components/admin/AdminUI';

const ITEMS_PER_PAGE = 8;

// ─── Source Modal ────────────────────────────────────────
function SourceModal({ source, onSave, onClose }: {
  source?: NewsSource;
  onSave: (data: Omit<NewsSource, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(source?.name ?? '');
  const [website, setWebsite] = useState(source?.website ?? '');
  const [active, setActive] = useState(source ? source.status === 'active' : true);
  const canSave = name.trim().length >= 2 && website.trim().length >= 3;

  return (
    <AdminModal
      title={source ? 'Sửa nguồn' : 'Thêm nguồn'}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="secondary" onClick={onClose}>Hủy</AdminButton>
          <AdminButton disabled={!canSave} onClick={() => canSave && onSave({ name: name.trim(), website: website.trim(), status: active ? 'active' : 'inactive' })}>
            Lưu
          </AdminButton>
        </>
      }
    >
      <div className="space-y-4">
        <AdminFormField label="Tên nguồn" required>
          <AdminInput value={name} onChange={setName} placeholder="VnExpress" />
        </AdminFormField>
        <AdminFormField label="Website" required>
          <AdminInput value={website} onChange={setWebsite} placeholder="vnexpress.net" />
        </AdminFormField>
        <AdminToggle checked={active} onChange={setActive} label="Trạng thái hoạt động" />
      </div>
    </AdminModal>
  );
}

// ─── Feed Modal ──────────────────────────────────────────
function FeedModal({ feed, sources, topics, onSave, onClose }: {
  feed?: NewsSourceFeed;
  sources: NewsSource[];
  topics: { slug: string; name: string; icon: string }[];
  onSave: (data: Omit<NewsSourceFeed, 'id'>) => void;
  onClose: () => void;
}) {
  const [sourceId, setSourceId] = useState(feed?.sourceId ?? sources[0]?.id ?? '');
  const [feedName, setFeedName] = useState(feed?.feedName ?? '');
  const [feedUrl, setFeedUrl] = useState(feed?.feedUrl ?? '');
  const [category, setCategory] = useState(feed?.category ?? '');
  const [maxItems, setMaxItems] = useState(String((feed as (NewsSourceFeed & { maxFetchItems?: number }))?.maxFetchItems ?? 10));
  const [crawlInterval, setCrawlInterval] = useState(String(feed?.crawlInterval ?? 10));
  const [active, setActive] = useState(feed ? feed.status === 'active' : true);
  const canSave = feedName.trim().length >= 2 && feedUrl.startsWith('https://') && !!sourceId;

  const sourceOptions = sources.map((s) => ({ value: s.id, label: s.name }));
  const categoryOptions = [
    { value: '', label: '🤖 Auto (AI tự phân loại)' },
    ...topics.map((t) => ({ value: t.slug, label: `${t.icon} ${t.name}` })),
  ];

  return (
    <AdminModal
      title={feed ? 'Sửa Feed RSS' : 'Thêm Feed RSS'}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="secondary" onClick={onClose}>Hủy</AdminButton>
          <AdminButton
            disabled={!canSave}
            onClick={() => canSave && onSave({ sourceId, feedName: feedName.trim(), feedUrl: feedUrl.trim(), category, crawlInterval: Math.max(1, Number(crawlInterval)), status: active ? 'active' : 'inactive', maxFetchItems: Math.max(1, Math.min(50, Number(maxItems))) } as Omit<NewsSourceFeed, 'id'>)}
          >
            Lưu
          </AdminButton>
        </>
      }
    >
      <div className="space-y-4">
        <AdminFormField label="Nguồn" required>
          <AdminSelect value={sourceId} onChange={setSourceId} options={sourceOptions} />
        </AdminFormField>
        <AdminFormField label="Tên feed" required>
          <AdminInput value={feedName} onChange={setFeedName} placeholder="Công nghệ" />
        </AdminFormField>
        <AdminFormField label="URL RSS" required>
          <AdminInput value={feedUrl} onChange={setFeedUrl} placeholder="https://vnexpress.net/rss/so-hoa.rss" />
        </AdminFormField>
        <div className="grid grid-cols-2 gap-3">
          <AdminFormField label="Chủ đề mặc định">
            <AdminSelect value={category} onChange={setCategory} options={categoryOptions} />
          </AdminFormField>
          <AdminFormField label="Chu kỳ (phút)">
            <AdminInput value={crawlInterval} onChange={setCrawlInterval} type="number" placeholder="10" />
          </AdminFormField>
        </div>
        <AdminFormField
          label="Số bài tối đa mỗi lần đồng bộ"
          hint={`Tối đa 50. Bài mới nhất sẽ được ưu tiên.`}
        >
          <AdminInput value={maxItems} onChange={setMaxItems} type="number" placeholder="10" />
        </AdminFormField>
        <AdminToggle checked={active} onChange={setActive} label="Trạng thái hoạt động" />
      </div>
    </AdminModal>
  );
}

// ─── Helper ──────────────────────────────────────────────
function timeAgo(dateStr?: string) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Vừa xong';
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}h trước` : `${Math.floor(h / 24)} ngày trước`;
}

// ─── Main Page ───────────────────────────────────────────
export default function RssSourcesPage() {
  const { sources, feeds, addSource, updateSource, deleteSource, addFeed, updateFeed, deleteFeed, toggleFeedActive, getFeedsBySource, loading, fetchAllDrafts, refetchLogs } = useRss();
  const { topics } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const [tab, setTab] = useState('sources');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [sourceModal, setSourceModal] = useState<{ open: boolean; source?: NewsSource }>({ open: false });
  const [feedModal, setFeedModal] = useState<{ open: boolean; feed?: NewsSourceFeed }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: 'source' | 'feed'; id: string; name: string; desc?: string }>({ open: false, type: 'source', id: '', name: '' });
  const [testResult, setTestResult] = useState<{ feedId: string; ok: boolean } | null>(null);

  const filteredSources = useMemo(() => {
    const q = search.toLowerCase();
    return sources.filter((s) => s.name.toLowerCase().includes(q) || s.website.toLowerCase().includes(q));
  }, [sources, search]);

  const filteredFeeds = useMemo(() => {
    const q = search.toLowerCase();
    return feeds.filter((f) => {
      const src = sources.find((s) => s.id === f.sourceId);
      return f.feedName.toLowerCase().includes(q) || (src?.name.toLowerCase().includes(q) ?? false);
    });
  }, [feeds, sources, search]);

  const isSourcesTab = tab === 'sources';
  const items = isSourcesTab ? filteredSources : filteredFeeds;
  const paginatedSources = filteredSources.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const paginatedFeeds = filteredFeeds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleTab = (t: string) => { setTab(t); setPage(1); setSearch(''); };
  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  const handleSaveSource = async (data: Omit<NewsSource, 'id' | 'createdAt'>) => {
    setSaving(true);
    try {
      sourceModal.source
        ? await updateSource(sourceModal.source.id, data)
        : await addSource(data);
      setSourceModal({ open: false });
      addToast(sourceModal.source ? 'Đã cập nhật nguồn thành công' : 'Đã thêm nguồn thành công', 'success');
    } catch {
      addToast('Có lỗi xảy ra, vui lòng thử lại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFeed = async (data: Omit<NewsSourceFeed, 'id'>) => {
    setSaving(true);
    try {
      feedModal.feed
        ? await updateFeed(feedModal.feed.id, data)
        : await addFeed(data);
      setFeedModal({ open: false });
      addToast(feedModal.feed ? 'Đã cập nhật feed thành công' : 'Đã thêm feed thành công', 'success');
    } catch {
      addToast('Có lỗi xảy ra, vui lòng thử lại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      deleteModal.type === 'source'
        ? await deleteSource(deleteModal.id)
        : await deleteFeed(deleteModal.id);
      setDeleteModal({ open: false, type: 'source', id: '', name: '' });
      addToast('Đã xóa thành công', 'success');
    } catch {
      addToast('Có lỗi khi xóa, vui lòng thử lại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTestFeed = async (feedId: string) => {
    const feed = feeds.find(f => f.id === feedId);
    if (!feed) return;
    setTestResult(null);
    try {
      const res = await fetch(feed.feedUrl, {
        mode: 'no-cors',
        signal: AbortSignal.timeout(8000),
      });
      // no-cors always gives opaque response, if we get here the server responded
      setTestResult({ feedId, ok: true });
      addToast(`Feed "${feed.feedName}" phản hồi OK`, 'success');
    } catch {
      setTestResult({ feedId, ok: false });
      addToast(`Feed "${feed.feedName}" không phản hồi hoặc bị lỗi`, 'error');
    }
    setTimeout(() => setTestResult(null), 4000);
  };

  const [syncing, setSyncing] = useState<string | null>(null); // feedId or 'all'

  const handleSyncFeed = async (feedId: string) => {
    const feed = feeds.find(f => f.id === feedId);
    if (!feed) return;
    setSyncing(feedId);
    try {
      const aiConfigRaw = typeof window !== 'undefined' ? localStorage.getItem('newsx_ai_config') : null;
      const aiConfig = aiConfigRaw ? JSON.parse(aiConfigRaw) : null;
      const res = await fetch('/api/rss/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedId, aiConfig }),
      });
      const data = await res.json();
      if (!res.ok) {
        addToast(data.error ?? 'Lỗi đồng bộ', 'error');
      } else {
        addToast(`Đồng bộ "${feed.feedName}": ${data.totalSaved} bài mới, ${data.totalDuplicates} trùng`, 'success');
        fetchAllDrafts();
        refetchLogs(); // refresh log list
      }
    } catch {
      addToast('Không thể kết nối API', 'error');
    } finally {
      setSyncing(null);
    }
  };

  const handleSyncAll = async () => {
    setSyncing('all');
    try {
      const aiConfigRaw = typeof window !== 'undefined' ? localStorage.getItem('newsx_ai_config') : null;
      const aiConfig = aiConfigRaw ? JSON.parse(aiConfigRaw) : null;
      const res = await fetch('/api/rss/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiConfig }),
      });
      const data = await res.json();
      if (!res.ok) {
        addToast(data.error ?? 'Lỗi đồng bộ', 'error');
      } else {
        addToast(`Đồng bộ hoàn tất: ${data.totalSaved} bài mới, ${data.totalDuplicates} trùng, ${data.totalErrors} lỗi`, 'success');
        fetchAllDrafts();
        refetchLogs(); // refresh log list
      }
    } catch {
      addToast('Không thể kết nối API', 'error');
    } finally {
      setSyncing(null);
    }
  };

  const sourceCols: DataTableColumn[] = [
    { key: 'name',    label: 'Tên nguồn' },
    { key: 'website', label: 'Website' },
    { key: 'feeds',   label: 'Feeds',       align: 'center' },
    { key: 'status',  label: 'Trạng thái', align: 'center' },
    { key: 'actions', label: '',            align: 'right' },
  ];

  const feedCols: DataTableColumn[] = [
    { key: 'source',   label: 'Nguồn' },
    { key: 'feed',     label: 'Feed' },
    { key: 'url',      label: 'URL',       hide: 'md' },
    { key: 'interval', label: 'Chu kỳ',   align: 'center' },
    { key: 'lastSync', label: 'Lần cuối', align: 'center', hide: 'md' },
    { key: 'status',   label: 'Trạng thái', align: 'center' },
    { key: 'actions',  label: '',          align: 'right' },
  ];

  return (
    <div className="p-4 md:p-6">
      <AdminPageHeader
        icon={<Rss className="w-5 h-5" style={{ color: '#8B5CF6' }} />}
        title="Quản lý Nguồn tin"
        subtitle={loading ? 'Đang tải...' : `${sources.length} nguồn · ${feeds.length} feeds`}
        action={
          <AdminButton
            icon={<Plus className="w-4 h-4" />}
            onClick={() => isSourcesTab ? setSourceModal({ open: true }) : setFeedModal({ open: true })}
          >
            {isSourcesTab ? 'Thêm nguồn' : 'Thêm feed'}
          </AdminButton>
        }
      />

      {/* Tabs */}
      <div className="mb-4">
        <AdminTabs
          tabs={[
            { key: 'sources', label: 'Nguồn website', count: sources.length },
            { key: 'feeds', label: 'Feeds RSS', count: feeds.length },
          ]}
          active={tab}
          onChange={handleTab}
        />
      </div>

      {/* Search + Sync */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <SearchInput value={search} onChange={handleSearch} placeholder="Tìm kiếm..." />
        </div>
        {!isSourcesTab && (
          <AdminButton variant="success" icon={syncing === 'all' ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} onClick={handleSyncAll} disabled={syncing !== null}>
            {syncing === 'all' ? 'Đang đồng bộ...' : 'Đồng bộ tất cả'}
          </AdminButton>
        )}
      </div>

      {/* Table: Sources */}
      {isSourcesTab && (
        <DataTable
          columns={sourceCols}
          rows={paginatedSources}
          emptyText="Không có nguồn nào"
          renderRow={(src) => (
            <>
              <td className="px-4 py-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{src.name}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Globe className="w-3.5 h-3.5 shrink-0" />{src.website}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {getFeedsBySource(src.id).length}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <AdminBadge
                  variant={src.status === 'active' ? 'green' : 'red'}
                  icon={src.status === 'active' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                >
                  {src.status === 'active' ? 'Active' : 'Inactive'}
                </AdminBadge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  <AdminActionButton icon={<Pencil className="w-4 h-4" />} label="Sửa" onClick={() => setSourceModal({ open: true, source: src })} />
                  <AdminActionButton
                    icon={<Trash2 className="w-4 h-4" />} label="Xóa" variant="danger"
                    onClick={() => setDeleteModal({ open: true, type: 'source', id: src.id, name: src.name, desc: getFeedsBySource(src.id).length > 0 ? `Thao tác này sẽ xóa cả ${getFeedsBySource(src.id).length} feed liên quan.` : undefined })}
                  />
                </div>
              </td>
            </>
          )}
        />
      )}

      {/* Table: Feeds */}
      {!isSourcesTab && (
        <DataTable
          columns={feedCols}
          rows={paginatedFeeds}
          emptyText="Không có feed nào"
          renderRow={(feed) => {
            const src = sources.find((s) => s.id === feed.sourceId);
            return (
              <>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{src?.name ?? '—'}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{feed.feedName}</span>
                </td>
                <td className="px-4 py-3 max-md:hidden">
                  <a href={feed.feedUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:underline max-w-[180px] truncate"
                    style={{ color: '#8B5CF6' }}
                  >
                    {feed.feedUrl.replace(/^https?:\/\//, '').slice(0, 30)}…
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-xs flex items-center gap-1 justify-center" style={{ color: 'var(--text-secondary)' }}>
                    <Clock className="w-3.5 h-3.5" />{feed.crawlInterval}p
                  </span>
                </td>
                <td className="px-4 py-3 text-center max-md:hidden">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{timeAgo(feed.lastSync)}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleFeedActive(feed.id)}>
                    <AdminBadge variant={feed.status === 'active' ? 'green' : 'red'}>
                      {feed.status === 'active' ? '✅' : '❌'}
                    </AdminBadge>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <AnimatePresence>
                      {testResult?.feedId === feed.id && (
                        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                          className="text-xs px-2 py-1 rounded-lg font-medium"
                          style={{ background: testResult.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: testResult.ok ? '#22C55E' : '#EF4444' }}
                        >
                          {testResult.ok ? '✓ OK' : '✗ Lỗi'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <AdminActionButton icon={<Zap className="w-4 h-4" />} label="Test RSS" variant="warning" onClick={() => handleTestFeed(feed.id)} />
                    <AdminActionButton
                      icon={syncing === feed.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      label={syncing === feed.id ? 'Đang...' : 'Đồng bộ ngay'}
                      variant="success"
                      onClick={() => handleSyncFeed(feed.id)}
                    />
                    <AdminActionButton icon={<Pencil className="w-4 h-4" />} label="Sửa" onClick={() => setFeedModal({ open: true, feed })} />
                    <AdminActionButton icon={<Trash2 className="w-4 h-4" />} label="Xóa" variant="danger" onClick={() => setDeleteModal({ open: true, type: 'feed', id: feed.id, name: feed.feedName })} />
                  </div>
                </td>
              </>
            );
          }}
        />
      )}

      {/* Pagination */}
      {items.length > ITEMS_PER_PAGE && (
        <div className="mt-4">
          <Pagination total={items.length} page={page} pageSize={ITEMS_PER_PAGE} onPageChange={setPage} />
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {sourceModal.open && <SourceModal source={sourceModal.source} onSave={handleSaveSource} onClose={() => setSourceModal({ open: false })} />}
        {feedModal.open && <FeedModal feed={feedModal.feed} sources={sources} topics={topics} onSave={handleSaveFeed} onClose={() => setFeedModal({ open: false })} />}
        {deleteModal.open && <AdminDeleteModal itemName={deleteModal.name} description={deleteModal.desc} onConfirm={handleDelete} onClose={() => setDeleteModal({ open: false, type: 'source', id: '', name: '' })} />}
      </AnimatePresence>

      {/* Toast */}
      <AdminToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
