import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topicSlug = searchParams.get('topic') || '';
  const exclude   = searchParams.get('exclude') || '';
  const limit     = Math.min(parseInt(searchParams.get('limit') || '5'), 10);

  try {
    // Look up topic_id from slug
    let topicId: string | null = null;
    if (topicSlug) {
      const { data: t } = await supabaseServer
        .from('topics')
        .select('id')
        .eq('slug', topicSlug)
        .single();
      topicId = t?.id ?? null;
    }

    let query = supabaseServer
      .from('articles')
      .select('id, title, slug, cover_image, created_at, likes_count, topics(name, color, icon, slug)')
      .order('created_at', { ascending: false })
      .limit(limit + 1); // fetch +1 to account for excluded item

    if (topicId) query = query.eq('topic_id', topicId);
    if (exclude) query = query.neq('id', exclude);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data?.slice(0, limit) ?? [], {
      headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600' },
    });
  } catch (e) {
    console.error('[related articles]', e);
    return NextResponse.json([], { status: 200 });
  }
}
