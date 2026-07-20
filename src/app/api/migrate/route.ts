import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  // Test if source_name column exists by trying to select it
  const { error: testErr } = await supabaseServer
    .from('articles')
    .select('source_name')
    .limit(1);

  if (testErr && testErr.message.includes('source_name')) {
    return NextResponse.json({
      status: 'NEED_MIGRATION',
      message: 'Columns source_name/source_url chưa tồn tại.',
      sql: `ALTER TABLE articles ADD COLUMN IF NOT EXISTS source_name TEXT DEFAULT NULL;\nALTER TABLE articles ADD COLUMN IF NOT EXISTS source_url TEXT DEFAULT NULL;\n\nUPDATE articles a SET source_name = d.source_name, source_url = d.source_url FROM ai_drafts d WHERE a.title = d.title AND d.source_name IS NOT NULL;`,
    });
  }

  // Columns exist — sync source from drafts to articles where missing
  const { data: articles } = await supabaseServer
    .from('articles')
    .select('id, title, source_name')
    .is('source_name', null);

  let updated = 0;
  if (articles?.length) {
    for (const article of articles) {
      const { data: draft } = await supabaseServer
        .from('ai_drafts')
        .select('source_name, source_url')
        .eq('title', article.title)
        .not('source_name', 'is', null)
        .limit(1)
        .maybeSingle();

      if (draft?.source_name) {
        await supabaseServer
          .from('articles')
          .update({ source_name: draft.source_name, source_url: draft.source_url })
          .eq('id', article.id);
        updated++;
      }
    }
  }

  return NextResponse.json({
    status: 'OK',
    message: `Columns exist. Updated ${updated} articles with source info.`,
  });
}
