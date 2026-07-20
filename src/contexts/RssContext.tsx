'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NewsSource, NewsSourceFeed, AiDraft, FetchLog, DraftStatus } from '@/types';

// ── Types matching Supabase snake_case ─────────────────────
interface SupabaseSource {
  id: string; name: string; website: string; status: 'active' | 'inactive'; created_at: string;
}
interface SupabaseFeed {
  id: string; source_id: string; feed_name: string; feed_url: string;
  category: string; crawl_interval: number; status: 'active' | 'inactive'; last_sync?: string;
  rss_sources?: { name: string };
}
interface SupabaseDraft {
  id: string; rss_item_id: string; title: string; excerpt: string; content: string;
  cover_image: string; source_name: string; source_url: string; ai_summary: string;
  ai_provider: string; ai_model: string; topic_slug: string;
  status: 'pending' | 'approved' | 'rejected'; created_at: string; reviewed_at?: string;
}
interface SupabaseLog {
  id: string; feed_id: string; source_name: string; feed_name: string;
  status: 'success' | 'error'; total_items: number; saved_items: number;
  duplicate_items: number; ai_success_items: number; error_message?: string;
  retry_after?: number; timestamp: string;
}

// ── Mappers ────────────────────────────────────────────────
const mapSource = (s: SupabaseSource): NewsSource => ({
  id: s.id, name: s.name, website: s.website, status: s.status, createdAt: s.created_at,
});
const mapFeed = (f: SupabaseFeed): NewsSourceFeed => ({
  id: f.id, sourceId: f.source_id, feedName: f.feed_name, feedUrl: f.feed_url,
  category: f.category, crawlInterval: f.crawl_interval, status: f.status, lastSync: f.last_sync,
});
const mapDraft = (d: SupabaseDraft): AiDraft => ({
  id: d.id, rssItemId: d.rss_item_id, title: d.title, excerpt: d.excerpt, content: d.content,
  coverImage: d.cover_image, sourceName: d.source_name, sourceUrl: d.source_url,
  aiSummary: d.ai_summary, topicSlug: d.topic_slug, status: d.status,
  createdAt: d.created_at, reviewedAt: d.reviewed_at,
});
const mapLog = (l: SupabaseLog): FetchLog => ({
  id: l.id, feedId: l.feed_id, sourceName: l.source_name, feedName: l.feed_name,
  status: l.status, totalItems: l.total_items, savedItems: l.saved_items,
  duplicateItems: l.duplicate_items, aiSuccessItems: l.ai_success_items,
  errorMessage: l.error_message, retryAfter: l.retry_after, timestamp: l.timestamp,
});

// ── Context type ───────────────────────────────────────────
interface RssContextType {
  sources: NewsSource[];
  feeds: NewsSourceFeed[];
  drafts: AiDraft[];
  logs: FetchLog[];
  loading: boolean;
  addSource: (data: Omit<NewsSource, 'id' | 'createdAt'>) => Promise<void>;
  updateSource: (id: string, data: Partial<NewsSource>) => Promise<void>;
  deleteSource: (id: string) => Promise<void>;
  addFeed: (data: Omit<NewsSourceFeed, 'id'>) => Promise<void>;
  updateFeed: (id: string, data: Partial<NewsSourceFeed>) => Promise<void>;
  deleteFeed: (id: string) => Promise<void>;
  toggleFeedActive: (id: string) => Promise<void>;
  getFeedsBySource: (sourceId: string) => NewsSourceFeed[];
  updateDraftStatus: (id: string, status: DraftStatus) => Promise<{ ok: boolean; error?: string }>;
  getDraftsByStatus: (status: DraftStatus) => AiDraft[];
  fetchAllDrafts: () => Promise<void>;
  refetchSources: () => Promise<void>;
}

const RssContext = createContext<RssContextType | undefined>(undefined);

export function RssProvider({ children }: { children: React.ReactNode }) {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [feeds, setFeeds] = useState<NewsSourceFeed[]>([]);
  const [drafts, setDrafts] = useState<AiDraft[]>([]);
  const [logs, setLogs] = useState<FetchLog[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch helpers ──
  const fetchSources = useCallback(async () => {
    const res = await fetch('/api/rss/sources');
    if (res.ok) {
      const data: SupabaseSource[] = await res.json();
      setSources(data.map(mapSource));
    }
  }, []);

  const fetchFeeds = useCallback(async () => {
    const res = await fetch('/api/rss/feeds');
    if (!res.ok) { console.error('fetchFeeds failed', await res.text()); return; }
    const data: SupabaseFeed[] = await res.json();
    setFeeds(data.map(mapFeed));
  }, []);

  const fetchAllDrafts = useCallback(async () => {
    // Fetch all statuses
    const [pending, approved, rejected] = await Promise.all([
      fetch('/api/drafts?status=pending&pageSize=100').then(r => r.ok ? r.json() : { data: [] }),
      fetch('/api/drafts?status=approved&pageSize=100').then(r => r.ok ? r.json() : { data: [] }),
      fetch('/api/drafts?status=rejected&pageSize=100').then(r => r.ok ? r.json() : { data: [] }),
    ]);
    const all: SupabaseDraft[] = [
      ...(pending.data ?? []),
      ...(approved.data ?? []),
      ...(rejected.data ?? []),
    ];
    setDrafts(all.map(mapDraft));
  }, []);

  const fetchLogs = useCallback(async () => {
    const res = await fetch('/api/fetch-logs?pageSize=50');
    if (res.ok) {
      const data: SupabaseLog[] = await res.json();
      setLogs(data.map(mapLog));
    }
  }, []);

  // ── Initial load ──
  useEffect(() => {
    Promise.all([fetchSources(), fetchFeeds(), fetchAllDrafts()])
      .finally(() => setLoading(false));
  }, [fetchSources, fetchFeeds, fetchAllDrafts]);

  // ── Source CRUD ──
  const addSource = useCallback(async (data: Omit<NewsSource, 'id' | 'createdAt'>) => {
    const res = await fetch('/api/rss/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) await fetchSources();
  }, [fetchSources]);

  const updateSource = useCallback(async (id: string, data: Partial<NewsSource>) => {
    await fetch(`/api/rss/sources/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await fetchSources();
  }, [fetchSources]);

  const deleteSource = useCallback(async (id: string) => {
    await fetch(`/api/rss/sources/${id}`, { method: 'DELETE' });
    await fetchSources();
    await fetchFeeds();
  }, [fetchSources, fetchFeeds]);

  // ── Feed CRUD ──
  const addFeed = useCallback(async (data: Omit<NewsSourceFeed, 'id'>) => {
    const res = await fetch('/api/rss/feeds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceId: data.sourceId, feedName: data.feedName, feedUrl: data.feedUrl,
        category: data.category, crawlInterval: data.crawlInterval, status: data.status,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Lỗi không xác định' }));
      throw new Error(err.error ?? 'Không thể thêm feed');
    }
    await fetchFeeds();
  }, [fetchFeeds]);

  const updateFeed = useCallback(async (id: string, data: Partial<NewsSourceFeed>) => {
    const res = await fetch(`/api/rss/feeds/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceId: data.sourceId, feedName: data.feedName, feedUrl: data.feedUrl,
        category: data.category, crawlInterval: data.crawlInterval, status: data.status,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Lỗi không xác định' }));
      throw new Error(err.error ?? 'Không thể cập nhật feed');
    }
    await fetchFeeds();
  }, [fetchFeeds]);

  const deleteFeed = useCallback(async (id: string) => {
    const res = await fetch(`/api/rss/feeds/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Không thể xóa feed');
    await fetchFeeds();
  }, [fetchFeeds]);

  const toggleFeedActive = useCallback(async (id: string) => {
    const feed = feeds.find(f => f.id === id);
    if (!feed) return;
    const newStatus = feed.status === 'active' ? 'inactive' : 'active';
    await fetch(`/api/rss/feeds/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    await fetchFeeds();
  }, [feeds, fetchFeeds]);

  // ── Draft actions ──
  const updateDraftStatus = useCallback(async (id: string, status: DraftStatus): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch(`/api/drafts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => ({}));
    await fetchAllDrafts();
    return { ok: res.ok, error: data.error };
  }, [fetchAllDrafts]);

  const getDraftsByStatus = useCallback(
    (status: DraftStatus) => drafts.filter(d => d.status === status),
    [drafts],
  );

  const getFeedsBySource = useCallback(
    (sourceId: string) => feeds.filter(f => f.sourceId === sourceId),
    [feeds],
  );

  return (
    <RssContext.Provider value={{
      sources, feeds, drafts, logs, loading,
      addSource, updateSource, deleteSource,
      addFeed, updateFeed, deleteFeed, toggleFeedActive, getFeedsBySource,
      updateDraftStatus, getDraftsByStatus, fetchAllDrafts,
      refetchSources: fetchSources,
    }}>
      {children}
    </RssContext.Provider>
  );
}

export function useRss() {
  const context = useContext(RssContext);
  if (!context) throw new Error('useRss must be used within a RssProvider');
  return context;
}
