import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

/**
 * GET /api/articles/by-ids?ids=id1,id2,id3
 * Lấy nhiều articles theo danh sách ID (dùng cho profile liked/shared)
 * Transform Supabase snake_case → Article type camelCase để ArticleCard dùng được
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
    .select(`
      id, slug, title, excerpt, cover_image,
      author_name, author_avatar,
      likes_count, comments_count, shares_count,
      created_at,
      topics(slug, name, icon, color)
    `)
    .in('id', ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform Supabase row → Article shape expected by ArticleCard
  const articles = (data ?? []).map((row: any) => {
    const topic = Array.isArray(row.topics) ? row.topics[0] : row.topics;
    return {
      id: row.id,
      slug: row.slug ?? '',
      title: row.title ?? '',
      excerpt: row.excerpt ?? '',
      content: '',
      coverImage: row.cover_image ?? '',
      createdAt: row.created_at ?? '',
      likesCount: row.likes_count ?? 0,
      commentsCount: row.comments_count ?? 0,
      sharesCount: row.shares_count ?? 0,
      author: {
        id: 'supabase',
        name: row.author_name ?? 'Newschill',
        email: '',
        password: '',
        avatar: row.author_avatar ?? 'https://api.dicebear.com/9.x/avataaars/svg?seed=Newschill',
        bio: '',
        role: 'editor' as const,
        status: 'active' as const,
        createdAt: row.created_at ?? '',
      },
      topic: topic
        ? {
            slug: topic.slug ?? '',
            name: topic.name ?? 'Tin tức',
            icon: topic.icon ?? '📰',
            color: topic.color ?? '#1686FF',
            description: '',
            articleCount: 0,
          }
        : {
            slug: 'general',
            name: 'Tin tức',
            icon: '📰',
            color: '#1686FF',
            description: '',
            articleCount: 0,
          },
    };
  });

  return NextResponse.json({ data: articles });
}
