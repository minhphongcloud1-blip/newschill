import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

/**
 * GET /api/dashboard/top-articles
 * Trả về top 5 bài viết có likes_count cao nhất từ Supabase
 */
export async function GET() {
  const { data, error } = await supabaseServer
    .from('articles')
    .select('id, slug, title, author_name, likes_count, comments_count, created_at, topics(slug, name, icon, color)')
    .order('likes_count', { ascending: false })
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
