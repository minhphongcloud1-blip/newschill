import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageSize = parseInt(searchParams.get('pageSize') ?? '50');

  const { data, error } = await supabaseServer
    .from('fetch_logs')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(pageSize);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
