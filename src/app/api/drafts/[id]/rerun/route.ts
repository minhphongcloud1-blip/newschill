import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

interface AiResult {
  title: string;
  excerpt: string;
  content: string;
}

async function callAi(
  title: string,
  content: string,
  systemPrompt: string,
  provider: 'gemini' | 'openai',
  model: string,
  apiKey: string,
): Promise<{ result: AiResult | null; error?: string }> {
  const userMessage = `Tiêu đề gốc: ${title}\n\nNội dung gốc:\n${content.slice(0, 3000)}`;
  try {
    if (provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + '\n\n' + userMessage }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        }),
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        return { result: null, error: `Gemini ${res.status}: ${errBody.slice(0, 200)}` };
      }
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const json = text.match(/\{[\s\S]*\}/)?.[0];
      if (!json) return { result: null, error: 'Gemini không trả JSON hợp lệ' };
      return { result: JSON.parse(json) };
    }
    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 2048,
          response_format: { type: 'json_object' },
        }),
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        return { result: null, error: `OpenAI ${res.status}: ${errBody.slice(0, 200)}` };
      }
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      return { result: JSON.parse(text) };
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : String(e) };
  }
  return { result: null, error: 'Provider không hợp lệ' };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const aiConfig = body.aiConfig as {
    activeProvider: 'gemini' | 'openai';
    gemini: { apiKey: string; model: string };
    openai: { apiKey: string; model: string };
    systemPrompt: string;
  } | null;

  if (!aiConfig?.activeProvider) {
    return NextResponse.json({ error: 'Chưa cấu hình AI.' }, { status: 400 });
  }

  const provider = aiConfig.activeProvider;
  const apiKey = aiConfig[provider].apiKey;
  const model = aiConfig[provider].model;

  if (!apiKey) {
    return NextResponse.json({ error: `Chưa có API key cho ${provider}.` }, { status: 400 });
  }

  // Get draft
  const { data: draft, error } = await supabaseServer
    .from('ai_drafts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !draft) {
    return NextResponse.json({ error: 'Không tìm thấy bản nháp.' }, { status: 404 });
  }

  // Call AI with original source content
  const originalContent = draft.excerpt || draft.title;
  const { result: aiResult, error: aiError } = await callAi(
    draft.title,
    originalContent,
    aiConfig.systemPrompt,
    provider,
    model,
    apiKey,
  );

  if (!aiResult) {
    return NextResponse.json({ error: aiError || 'AI không trả về kết quả.' }, { status: 500 });
  }

  // Update draft with new AI content
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
