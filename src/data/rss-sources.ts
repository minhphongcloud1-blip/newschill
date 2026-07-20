import { NewsSource, NewsSourceFeed } from '@/types';

export const mockNewsSources: NewsSource[] = [
  { id: 'src-1', name: 'VnExpress', website: 'vnexpress.net', status: 'active', createdAt: '2026-01-15T08:00:00Z' },
  { id: 'src-2', name: 'CafeF', website: 'cafef.vn', status: 'active', createdAt: '2026-02-10T10:00:00Z' },
  { id: 'src-3', name: 'Reuters', website: 'reuters.com', status: 'active', createdAt: '2026-03-01T06:00:00Z' },
  { id: 'src-4', name: 'Tuổi Trẻ', website: 'tuoitre.vn', status: 'inactive', createdAt: '2026-04-05T12:00:00Z' },
  { id: 'src-5', name: 'Thanh Niên', website: 'thanhnien.vn', status: 'active', createdAt: '2026-05-20T09:00:00Z' },
];

export const mockNewsFeeds: NewsSourceFeed[] = [
  // VnExpress feeds
  { id: 'feed-1', sourceId: 'src-1', feedName: 'Tin mới', feedUrl: 'https://vnexpress.net/rss/tin-moi-nhat.rss', category: 'general', crawlInterval: 5, status: 'active', lastSync: '2026-07-20T02:30:00Z' },
  { id: 'feed-2', sourceId: 'src-1', feedName: 'Thời sự', feedUrl: 'https://vnexpress.net/rss/thoi-su.rss', category: 'politics', crawlInterval: 10, status: 'active', lastSync: '2026-07-20T02:25:00Z' },
  { id: 'feed-3', sourceId: 'src-1', feedName: 'Công nghệ', feedUrl: 'https://vnexpress.net/rss/so-hoa.rss', category: 'technology', crawlInterval: 10, status: 'active', lastSync: '2026-07-20T02:20:00Z' },
  { id: 'feed-4', sourceId: 'src-1', feedName: 'Kinh doanh', feedUrl: 'https://vnexpress.net/rss/kinh-doanh.rss', category: 'business', crawlInterval: 15, status: 'active' },
  { id: 'feed-5', sourceId: 'src-1', feedName: 'Thể thao', feedUrl: 'https://vnexpress.net/rss/the-thao.rss', category: 'sports', crawlInterval: 10, status: 'inactive' },
  // CafeF feeds
  { id: 'feed-6', sourceId: 'src-2', feedName: 'Chứng khoán', feedUrl: 'https://cafef.vn/rss/chung-khoan.rss', category: 'finance', crawlInterval: 5, status: 'active', lastSync: '2026-07-20T02:28:00Z' },
  { id: 'feed-7', sourceId: 'src-2', feedName: 'Bất động sản', feedUrl: 'https://cafef.vn/rss/bat-dong-san.rss', category: 'realestate', crawlInterval: 15, status: 'active' },
  // Reuters feeds
  { id: 'feed-8', sourceId: 'src-3', feedName: 'World News', feedUrl: 'https://www.reutersagency.com/feed/?best-topics=world', category: 'world', crawlInterval: 5, status: 'active', lastSync: '2026-07-20T02:29:00Z' },
  { id: 'feed-9', sourceId: 'src-3', feedName: 'Technology', feedUrl: 'https://www.reutersagency.com/feed/?best-topics=tech', category: 'technology', crawlInterval: 10, status: 'active' },
  // Tuổi Trẻ
  { id: 'feed-10', sourceId: 'src-4', feedName: 'Tin mới nhất', feedUrl: 'https://tuoitre.vn/rss/tin-moi-nhat.rss', category: 'general', crawlInterval: 10, status: 'inactive' },
  // Thanh Niên
  { id: 'feed-11', sourceId: 'src-5', feedName: 'Trang chủ', feedUrl: 'https://thanhnien.vn/rss/home.rss', category: 'general', crawlInterval: 10, status: 'active' },
];
