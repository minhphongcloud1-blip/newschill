'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Advertisement } from '@/data/ads';

const LS_KEY = 'newsx_ads';

/** Module-level cache so multiple components share the same fetch */
let cachedAds: Advertisement[] | null = null;
let fetchPromise: Promise<Advertisement[]> | null = null;
let subscriberCount = 0;

function getLocalAds(): Advertisement[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as Advertisement[];
  } catch { return []; }
}

async function fetchAdsOnce(): Promise<Advertisement[]> {
  if (cachedAds) return cachedAds;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch('/api/ads')
    .then((r) => r.json())
    .then((json) => {
      let result: Advertisement[] = [];
      if (json.source === 'supabase' && Array.isArray(json.data)) {
        result = json.data;
        localStorage.setItem(LS_KEY, JSON.stringify(json.data));
      } else {
        const local = getLocalAds();
        result = local.length > 0 ? local : (json.data ?? []);
      }
      cachedAds = result;
      return result;
    })
    .catch(() => {
      const local = getLocalAds();
      cachedAds = local;
      return local;
    });

  return fetchPromise;
}

/**
 * Shared hook for ads — fetches only once regardless of how many
 * components mount (HomeBanner, RightPanel, etc.).
 */
export function useAds(type?: 'banner' | 'sidebar') {
  const [ads, setAds] = useState<Advertisement[]>(() => {
    // Instant load from localStorage for zero-flash
    const local = getLocalAds();
    return type ? local.filter((ad) => ad.isActive && ad.type === type) : local.filter((ad) => ad.isActive);
  });

  useEffect(() => {
    subscriberCount++;

    fetchAdsOnce().then((all) => {
      const filtered = type
        ? all.filter((ad) => ad.isActive && ad.type === type)
        : all.filter((ad) => ad.isActive);
      setAds(filtered);
    });

    return () => {
      subscriberCount--;
      // Reset cache when all subscribers unmount (page navigation)
      if (subscriberCount === 0) {
        cachedAds = null;
        fetchPromise = null;
      }
    };
  }, [type]);

  return ads;
}
