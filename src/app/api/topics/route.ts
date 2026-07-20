import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  const { data: topics, error } = await supabaseServer
    .from('topics')
    .select('*')
    .order('name');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Count real articles per topic
  const { data: counts } = await supabaseServer
    .from('articles')
    .select('topic_id');

  const countMap: Record<string, number> = {};
  for (const row of counts ?? []) {
    if (row.topic_id) countMap[row.topic_id] = (countMap[row.topic_id] ?? 0) + 1;
  }

  const enriched = (topics ?? []).map((t) => ({
    ...t,
    article_count: countMap[t.id] ?? 0,
  }));

  return NextResponse.json(enriched);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabaseServer
    .from('topics')
    .insert(body)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
