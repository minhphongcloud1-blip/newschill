import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

const SETTINGS_KEY = 'ads_config';

/**
 * GET /api/ads
 * Trả về mảng Advertisement[] từ Supabase app_settings
 * Nếu bảng chưa tồn tại → trả 200 với data rỗng (client sẽ đọc localStorage)
 */
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('app_settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .single();

    // Table not found / no row yet → return empty so client uses localStorage
    if (error) {
      return NextResponse.json({ data: null, source: 'fallback' });
    }

    const ads = JSON.parse(data.value as string);
    return NextResponse.json(
      { data: ads, source: 'supabase' },
      {
        headers: {
          'Cache-Control': 'no-store', // Không cache — admin cần thấy update ngay
        },
      }
    );
  } catch {
    return NextResponse.json({ data: null, source: 'fallback' });
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
      // Trả về lỗi rõ ràng để client biết và dùng localStorage
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
