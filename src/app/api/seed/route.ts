import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { mockArticles } from '@/data/articles';

// Mock topic slugs mapping: mockTopics index → Supabase slug
const topicIndexToSlug: Record<number, string> = {
  0: 'technology',   // Công nghệ
  1: 'world',        // Khoa học → world (closest)
  2: 'business',     // Kinh doanh
  3: 'sports',       // Thể thao
  4: 'general',      // Giải trí → general
  5: 'politics',     // Sức khỏe → politics (closest)
  6: 'world',        // Thế giới
  7: 'general',      // Giáo dục → general
};

async function seedArticles() {
  // Get topics from Supabase for ID lookup
  const { data: topics } = await supabaseServer.from('topics').select('id, slug');
  if (!topics?.length) {
    return NextResponse.json({ error: 'No topics found. Run schema SQL first.' }, { status: 400 });
  }

  const slugToId: Record<string, string> = {};
  for (const t of topics) slugToId[t.slug] = t.id;

  // Check existing articles count
  const { count } = await supabaseServer.from('articles').select('*', { count: 'exact', head: true });
  if ((count ?? 0) > 0) {
    return NextResponse.json({ message: `Already seeded (${count} articles exist). Skipping.`, count });
  }

  // Import mockTopics to get index mapping
  const { mockTopics } = await import('@/data/topics');

  const rows = mockArticles.map((a) => {
    // Find topic index
    const topicIdx = mockTopics.indexOf(a.topic);
    const topicSlug = topicIndexToSlug[topicIdx] ?? 'general';
    const topicId = slugToId[topicSlug] ?? null;

    return {
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      cover_image: a.coverImage,
      author_name: a.author.name,
      author_avatar: a.author.avatar,
      topic_id: topicId,
      likes_count: a.likesCount,
      comments_count: a.commentsCount,
      shares_count: a.sharesCount,
      created_at: a.createdAt,
    };
  });

  const { data, error } = await supabaseServer.from('articles').insert(rows).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, inserted: data?.length ?? 0 });
}

export async function GET() { return seedArticles(); }
export async function POST() { return seedArticles(); }
