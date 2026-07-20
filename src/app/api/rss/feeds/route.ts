import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseServer
    .from('rss_feeds')
    .select('*, rss_sources(name)');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabaseServer
    .from('rss_feeds')
    .insert({
      source_id: body.sourceId ?? body.source_id,
      feed_name: body.feedName ?? body.feed_name,
      feed_url: body.feedUrl ?? body.feed_url,
      category: body.category ?? 'general',
      crawl_interval: body.crawlInterval ?? body.crawl_interval ?? 10,
      status: body.status ?? 'active',
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
