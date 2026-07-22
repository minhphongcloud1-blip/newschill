import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { loadAiConfig, callAi } from '@/lib/ai';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // ── Load AI config from DB ────────────────────────────────
  const aiConfig = await loadAiConfig();

  if (!aiConfig?.activeProvider) {
    return NextResponse.json({ error: 'Chưa cấu hình AI.' }, { status: 400 });
  }

  const provider = aiConfig.activeProvider;
  const apiKey = aiConfig[provider].apiKey;
  const model = aiConfig[provider].model;

  if (!apiKey) {
    return NextResponse.json({ error: `Chưa có API key cho ${provider}.` }, { status: 400 });
  }

  // ── Get draft from DB ─────────────────────────────────────
  const { data: draft, error } = await supabaseServer
    .from('ai_drafts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !draft) {
    return NextResponse.json({ error: 'Không tìm thấy bản nháp.' }, { status: 404 });
  }

  // ── Call AI with content ──────────────────────────────────
  // Use source_url content if possible (excerpt is short), fall back to source content
  const originalContent = draft.excerpt || draft.title;
  const aiResult = await callAi(draft.title, originalContent, aiConfig);

  if (!aiResult) {
    return NextResponse.json({ error: `AI (${provider}/${model}) không trả về kết quả. Kiểm tra API key hoặc quota.` }, { status: 500 });
  }

  // ── Update draft ──────────────────────────────────────────
  const { data: updated, error: updateError } = await supabaseServer
    .from('ai_drafts')
    .update({
      title: aiResult.title || draft.title,
      excerpt: aiResult.excerpt || draft.excerpt,
      content: aiResult.content || draft.content,
      ai_summary: aiResult.excerpt || draft.ai_summary,
      ai_provider: provider,
      ai_model: model,
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(updated);
}
