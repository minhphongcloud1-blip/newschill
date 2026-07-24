// ==========================================
// Newschill - Type Definitions
// ==========================================

export type UserRole = 'admin' | 'editor' | 'reader';
export type UserStatus = 'active' | 'pending' | 'blocked';
export type UserPlan = 'free' | 'pending_pro' | 'pro';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  coverImage?: string;
  plan?: UserPlan;
}

export interface Article {
  id: string;
  slug?: string;        // SEO-friendly URL slug
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: User;
  topic: Topic;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  sourceName?: string;
  sourceUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  articleId: string;
  parentId: string | null;
  createdAt: string;
  likesCount: number;
  replies?: Comment[];
}

export interface Topic {
  slug: string;
  name: string;
  icon: string;
  description: string;
  articleCount: number;
  color: string;
}

// ── News Source System (2-table architecture) ───────────

// Website nguồn (VnExpress, CafeF, Reuters...)
export interface NewsSource {
  id: string;
  name: string;
  website: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Feed RSS cụ thể (1 website có nhiều feeds)
export interface NewsSourceFeed {
  id: string;
  sourceId: string;
  feedName: string;
  feedUrl: string;
  category: string;
  topicSlug?: string;
  maxFetchItems?: number;
  crawlInterval: number;
  status: 'active' | 'inactive';
  lastSync?: string;
}

// Bài đã fetch từ RSS (chưa qua AI)
export interface RssItem {
  id: string;
  feedId: string;
  sourceId: string;
  title: string;
  link: string;
  excerpt?: string;
  imageUrl?: string;
  pubDate: string;
  isProcessed: boolean;
  createdAt: string;
}

// Bài AI đã viết, chờ duyệt
export type DraftStatus = 'pending' | 'approved' | 'rejected';

export interface AiDraft {
  id: string;
  rssItemId: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  sourceName: string;
  sourceUrl: string;
  aiSummary: string;
  aiProvider: string;
  topicSlug: string;
  status: DraftStatus;
  createdAt: string;
  reviewedAt?: string;
}

// Log mỗi lần fetch
export type LogStatus = 'success' | 'error';

export interface FetchLog {
  id: string;
  feedId: string;
  sourceName: string;
  feedName: string;
  timestamp: string;
  status: LogStatus;
  totalItems: number;
  savedItems: number;
  duplicateItems: number;
  aiSuccessItems: number;
  errorMessage?: string;
  retryAfter?: number;
}
