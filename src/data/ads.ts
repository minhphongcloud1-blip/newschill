export interface Advertisement {
  id: string;
  imageUrl: string;
  linkUrl: string;
  title: string;
  isActive: boolean;
}

// Stored in localStorage key: 'newsx_ads'
const STORAGE_KEY = 'newsx_ads';

const defaultAds: Advertisement[] = [
  {
    id: 'ad-1',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=640&q=80',
    linkUrl: 'https://example.com',
    title: 'Quảng cáo 1',
    isActive: true,
  },
];

export function getAds(): Advertisement[] {
  if (typeof window === 'undefined') return defaultAds;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultAds;
  } catch {
    return defaultAds;
  }
}

export function saveAds(ads: Advertisement[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
}

export function getActiveAds(): Advertisement[] {
  return getAds().filter((ad) => ad.isActive);
}
