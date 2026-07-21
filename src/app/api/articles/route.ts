import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// Revalidate this route every 60 seconds on the server
export const revalidate = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topicSlug = searchParams.get('topic');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') ?? '1');
  const pageSize = parseInt(searchParams.get('pageSize') ?? '20'); // Reduced from 200

  // If filtering by topic slug, look up the topic_id first
  let topicId: string | null = null;
  if (topicSlug && topicSlug !== 'all') {
    const { data: t } = await supabaseServer.from('topics').select('id').eq('slug', topicSlug).single();
    topicId = t?.id ?? null;
    if (!topicId) return NextResponse.json({ data: [], total: 0 });
  }

  let query = supabaseServer
    .from('articles')
    .select(`*, topics(slug, name, icon, color, description)`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (topicId) query = query.eq('topic_id', topicId);
  if (search) query = query.ilike('title', `%${search}%`);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    { data, total: count },
    {
      headers: {
        // Cache at CDN/browser for 60s, stale-while-revalidate for 300s
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabaseServer
    .from('articles')
    .insert({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      cover_image: body.coverImage ?? body.cover_image ?? '',
      author_name: body.authorName ?? body.author_name ?? 'Admin',
      author_avatar: body.authorAvatar ?? body.author_avatar ?? '',
      topic_id: body.topicId ?? body.topic_id ?? null,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
