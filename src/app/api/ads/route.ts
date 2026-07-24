import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

const SETTINGS_KEY = 'ads_config';

// ── Default ads hiển thị khi chưa cấu hình Supabase ───────
const DEFAULT_ADS = [
  {
    id: 'banner-1',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1280&q=80',
    linkUrl: 'https://newschill.online',
    title: 'Chào mừng đến Newschill — Tin tức thế hệ mới',
    isActive: true,
    type: 'banner',
  },
  {
    id: 'banner-2',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&q=80',
    linkUrl: 'https://newschill.online/trending',
    title: 'Khám phá xu hướng công nghệ mới nhất',
    isActive: true,
    type: 'banner',
  },
];

/**
 * GET /api/ads
 * Priority:
 *  1. Supabase app_settings (nếu table đã tạo + có data)
 *  2. DEFAULT_ADS (fallback cho mọi user kể cả ẩn danh)
 *
 * Source field:
 *  'supabase' — data từ DB
 *  'default'  — fallback hardcode
 */
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('app_settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .single();

    // Table missing, row missing, or any error → return defaults
    if (error || !data) {
      return NextResponse.json(
        { data: DEFAULT_ADS, source: 'default' },
        { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
      );
    }

    const ads = JSON.parse(data.value as string);

    // Empty config saved → return defaults
    if (!Array.isArray(ads) || ads.length === 0) {
      return NextResponse.json(
        { data: DEFAULT_ADS, source: 'default' },
        { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
      );
    }

    return NextResponse.json(
      { data: ads, source: 'supabase' },
      { headers: { 'Cache-Control': 'no-store' } } // No cache — admin cần thấy update ngay
    );
  } catch {
    // Any exception → always return defaults, never return empty
    return NextResponse.json(
      { data: DEFAULT_ADS, source: 'default' },
      { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } }
    );
  }
}

/**
 * POST /api/ads
 * Body: { ads: Advertisement[] }
 * Lưu toàn bộ danh sách ads vào Supabase app_settings
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ads = body.ads;

  if (!Array.isArray(ads)) {
    return NextResponse.json({ error: 'Invalid payload: ads must be an array' }, { status: 400 });
  }

  try {
    const { error } = await supabaseServer
      .from('app_settings')
      .upsert(
        { key: SETTINGS_KEY, value: JSON.stringify(ads), updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );

    if (error) {
      console.error('[API/ads] Supabase upsert error:', error.message);
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, count: ads.length, source: 'supabase' });
  } catch (err: any) {
    return NextResponse.json({ error: String(err), code: 'EXCEPTION' }, { status: 500 });
  }
}
