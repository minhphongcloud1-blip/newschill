import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

/**
 * GET /api/articles/by-ids?ids=id1,id2,id3
 * Lấy nhiều articles theo danh sách ID (dùng cho profile liked/shared)
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const idsParam = url.searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json({ data: [] });
  }

  const ids = idsParam.split(',').filter(Boolean).slice(0, 100); // max 100

  if (ids.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const { data, error } = await supabaseServer
    .from('articles')
    .select('id, slug, title, excerpt, cover_image, author_name, author_avatar, likes_count, comments_count, shares_count, created_at, topics(slug, name, icon, color)')
    .in('id', ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
