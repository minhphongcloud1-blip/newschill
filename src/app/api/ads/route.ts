import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

const SETTINGS_KEY = 'ads_config';

/**
 * GET /api/ads
 * Trả về mảng Advertisement[] từ Supabase app_settings
 */
export async function GET() {
  const { data, error } = await supabaseServer
    .from('app_settings')
    .select('value')
    .eq('key', SETTINGS_KEY)
    .single();

  if (error || !data) {
    // Trả về default ads nếu chưa cấu hình
    return NextResponse.json({ data: getDefaultAds() });
  }

  try {
    const ads = JSON.parse(data.value as string);
    return NextResponse.json(
      { data: ads },
      {
        headers: {
          // Cache 60s ở CDN, stale-while-revalidate 5 phút
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch {
    return NextResponse.json({ data: getDefaultAds() });
  }
}

/**
 * POST /api/ads
 * Body: { ads: Advertisement[] }
 * Lưu toàn bộ danh sách ads vào Supabase (upsert)
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ads = body.ads;

  if (!Array.isArray(ads)) {
    return NextResponse.json({ error: 'Invalid payload: ads must be an array' }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from('app_settings')
    .upsert(
      { key: SETTINGS_KEY, value: JSON.stringify(ads), updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );

  if (error) {
    console.error('[API/ads] Supabase upsert error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: ads.length });
}

// ── Default ads (fallback khi chưa có data trong DB) ──────
function getDefaultAds() {
  return [
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
}
