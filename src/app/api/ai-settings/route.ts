import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// GET — load config from DB
export async function GET() {
  const { data, error } = await supabaseServer
    .from('ai_settings')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST — save config to DB (upsert row id=1)
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const { error } = await supabaseServer.from('ai_settings').upsert(
    {
      id: 1,
      active_provider: body.activeProvider,
      gemini_api_key: body.gemini?.apiKey ?? '',
      gemini_model: body.gemini?.model ?? 'gemini-2.0-flash-lite',
      openai_api_key: body.openai?.apiKey ?? '',
      openai_model: body.openai?.model ?? 'gpt-4o-mini',
      system_prompt: body.systemPrompt ?? '',
      max_tokens: body.maxTokens ?? 2048,
      temperature: body.temperature ?? 0.7,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
