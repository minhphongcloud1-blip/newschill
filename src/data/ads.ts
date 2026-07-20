export interface Advertisement {
  id: string;
  imageUrl: string;
  linkUrl: string;
  title: string;
  isActive: boolean;
  type: 'banner' | 'sidebar'; // banner = home page slider, sidebar = right panel
}

// Stored in localStorage key: 'newsx_ads'
const STORAGE_KEY = 'newsx_ads';

const defaultAds: Advertisement[] = [
  {
    id: 'banner-1',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1280&q=80',
    linkUrl: 'https://example.com',
    title: 'Banner trang chủ 1',
    isActive: true,
    type: 'banner',
  },
  {
    id: 'banner-2',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&q=80',
    linkUrl: 'https://example.com/tech',
    title: 'Banner trang chủ 2',
    isActive: true,
    type: 'banner',
  },
  {
    id: 'ad-1',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=640&q=80',
    linkUrl: 'https://example.com',
    title: 'Quảng cáo sidebar',
    isActive: true,
    type: 'sidebar',
  },
];

export function getAds(): Advertisement[] {
  if (typeof window === 'undefined') return defaultAds;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultAds;
    const parsed = JSON.parse(stored) as Advertisement[];
    // migrate old data without type
    return parsed.map((a) => ({ ...a, type: a.type ?? 'sidebar' }));
  } catch {
    return defaultAds;
  }
}

export function saveAds(ads: Advertisement[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
}

export function getActiveAds(): Advertisement[] {
  return getAds().filter((ad) => ad.isActive && ad.type === 'sidebar');
}

export function getActiveBanners(): Advertisement[] {
  return getAds().filter((ad) => ad.isActive && ad.type === 'banner');
}
