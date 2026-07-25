import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

/**
 * GET /api/user/interactions?email=user@example.com
 * Lấy toàn bộ likes + shares của user theo email
 */
export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get('email');
  if (!email) return NextResponse.json({ likes: [], shares: [] });

  const [likesRes, sharesRes] = await Promise.all([
    supabaseServer.from('user_likes').select('article_id').eq('user_email', email),
    supabaseServer.from('user_shares').select('article_id').eq('user_email', email),
  ]);

  return NextResponse.json({
    likes:  (likesRes.data  ?? []).map((r) => r.article_id),
    shares: (sharesRes.data ?? []).map((r) => r.article_id),
  });
}

/**
 * POST /api/user/interactions
 * Body: { email, type: 'like'|'share', articleId }
 * Thêm 1 like hoặc share
 */
export async function POST(req: Request) {
  const { email, type, articleId } = await req.json();
  if (!email || !type || !articleId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const table = type === 'like' ? 'user_likes' : 'user_shares';

  const { error } = await supabaseServer
    .from(table)
    .upsert({ user_email: email, article_id: articleId }, { onConflict: 'user_email,article_id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

/**
 * DELETE /api/user/interactions
 * Body: { email, type: 'like', articleId }
 * Xóa 1 like (unlike). Share không thể xóa.
 */
export async function DELETE(req: Request) {
  const { email, articleId } = await req.json();
  if (!email || !articleId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from('user_likes')
    .delete()
    .eq('user_email', email)
    .eq('article_id', articleId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
