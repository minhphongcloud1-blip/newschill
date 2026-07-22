import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// Revalidate this route every 60 seconds on the server
export const revalidate = 60;

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const topicSlug = searchParams.get('topic');
  const search = searchParams.get('search');
  const seed = searchParams.get('seed');
  const page = parseInt(searchParams.get('page') ?? '1');
  const pageSize = parseInt(searchParams.get('pageSize') ?? '20'); // Reduced from 200

  // If filtering by topic slug, look up the topic_id first
  let topicId: string | null = null;
  if (topicSlug && topicSlug !== 'all') {
    const { data: t } = await supabaseServer.from('topics').select('id').eq('slug', topicSlug).single();
    topicId = t?.id ?? null;
    if (!topicId) return NextResponse.json({ data: [], total: 0 });
  }

  let data: any[] = [];
  let count = 0;

  if (seed && !search) {
    // 1. Lấy tổng số lượng để phục vụ phân trang
    const countQuery = supabaseServer.from('articles').select('id', { count: 'exact', head: true });
    if (topicId) countQuery.eq('topic_id', topicId);
    const { count: exactCount } = await countQuery;
    count = exactCount ?? 0;

    // 2. Gọi hàm RPC để lấy mảng ID đã được xáo trộn Tiered Random
    const { data: rpcData, error: rpcError } = await supabaseServer
      .rpc('get_tiered_random_article_ids', { p_seed: seed, p_topic_id: topicId })
      .range((page - 1) * pageSize, page * pageSize - 1);
    
    if (rpcError) return NextResponse.json({ error: rpcError.message }, { status: 500 });

    if (rpcData && rpcData.length > 0) {
      const ids = rpcData.map((r: any) => r.id);
      
      // 3. Lấy data đầy đủ của các bài viết dựa trên ID
      const { data: fullData, error: fullError } = await supabaseServer
        .from('articles')
        .select(`*, topics(slug, name, icon, color, description)`)
        .in('id', ids);
      
      if (fullError) return NextResponse.json({ error: fullError.message }, { status: 500 });
      
      // 4. Sắp xếp lại fullData theo đúng thứ tự của mảng ids từ RPC trả về
      const idToIndex = new Map(ids.map((id: string, index: number) => [id, index]));
      data = (fullData || []).sort((a, b) => idToIndex.get(a.id)! - idToIndex.get(b.id)!);
    }
  } else {
    // Fallback: Tìm kiếm thông thường hoặc không có seed
    let query = supabaseServer
      .from('articles')
      .select(`*, topics(slug, name, icon, color, description)`, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (topicId) query = query.eq('topic_id', topicId);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data: qData, error, count: qCount } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    data = qData || [];
    count = qCount ?? 0;
  }

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
