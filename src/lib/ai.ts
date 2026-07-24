/**
 * lib/ai.ts
 * Server-side AI library — reads config from DB, calls Gemini or OpenAI.
 * Never import this in Client Components ('use client').
 */

import { supabaseServer } from '@/lib/supabase';

export interface AiConfig {
  activeProvider: 'gemini' | 'openai' | 'openrouter';
  gemini: { apiKey: string; model: string };
  openai: { apiKey: string; model: string };
  openrouter: { apiKey: string; model: string };
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
}

export interface AiResult {
  title: string;
  excerpt: string;
  content: string;
  topic_slug?: string;        // Returned only when AI classifies topic automatically
  // SEO fields (Sprint 1)
  title_seo?: string;         // 50-60 chars, keyword-optimized
  meta_description?: string;  // 140-160 chars
  slug?: string;              // URL-safe, hyphen-separated, no diacritics
  keywords?: string;          // Comma-separated, 5-8 keywords
}

// Available topic slugs for AI classification
export const TOPIC_SLUGS = [
  'technology', 'business', 'finance', 'politics', 'sports',
  'world', 'realestate', 'entertainment', 'health', 'science', 'general',
] as const;


// ── Load AI config from Supabase ──────────────────────────
export async function loadAiConfig(): Promise<AiConfig | null> {
  const { data, error } = await supabaseServer
    .from('ai_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (error || !data) return null;

  return {
    activeProvider: data.active_provider ?? 'gemini',
    gemini: { apiKey: data.gemini_api_key ?? '', model: data.gemini_model ?? 'gemini-2.0-flash-lite' },
    openai: { apiKey: data.openai_api_key ?? '', model: data.openai_model ?? 'gpt-4o-mini' },
    openrouter: { apiKey: data.openrouter_api_key ?? '', model: data.openrouter_model ?? 'google/gemini-2.5-flash' },
    systemPrompt: data.system_prompt || `Bạn là biên tập viên tin tức SEO chuyên nghiệp. Hãy viết lại bài bằng cách diễn đạt mới, KHÔNG sao chép nguyên văn. Tóm tắt 20-30% nội dung gốc, thêm phân tích riêng. Trả về JSON:
{
  "title": "Tiêu đề hấp dẫn, tự nhiên",
  "title_seo": "Tiêu đề SEO 50-60 ký tự, có từ khóa chính",
  "slug": "url-dep-khong-dau-ngan-gon",
  "meta_description": "Mô tả SEO 140-160 ký tự, hấp dẫn, có CTA nhẹ",
  "keywords": "từ khóa 1, từ khóa 2, từ khóa 3, từ khóa 4, từ khóa 5",
  "excerpt": "Tóm tắt 1-2 câu ngắn gọn",
  "content": "<h2>...</h2><p>...</p>"
}`, 
    maxTokens: data.max_tokens ?? 2048,
    temperature: data.temperature ?? 0.7,
  };
}

// ── Call AI with the loaded config ────────────────────────
export async function callAi(
  title: string,
  content: string,
  config: AiConfig,
): Promise<AiResult | null> {
  const { activeProvider: provider, systemPrompt, maxTokens, temperature } = config;
  const apiKey = config[provider].apiKey;
  const model = config[provider].model;

  if (!apiKey) {
    console.warn('[AI] No API key configured for provider:', provider);
    return null;
  }

  const userMessage = `Tiêu đề gốc: ${title}\n\nNội dung gốc:\n${content.slice(0, 3000)}`;

  try {
    if (provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      console.log('[AI] Calling Gemini:', model);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + '\n\n' + userMessage }] }],
          generationConfig: { temperature, maxOutputTokens: maxTokens },
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error('[AI] Gemini error:', res.status, errBody.slice(0, 300));
        return null;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const json = text.match(/\{[\s\S]*\}/)?.[0];
      if (!json) { console.error('[AI] No JSON in Gemini response'); return null; }
      return JSON.parse(json);
    }

    if (provider === 'openai') {
      console.log('[AI] Calling OpenAI:', model);
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature,
          max_tokens: maxTokens,
          response_format: { type: 'json_object' },
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error('[AI] OpenAI error:', res.status, errBody.slice(0, 300));
        return null;
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      return JSON.parse(text);
    }

    if (provider === 'openrouter') {
      console.log('[AI] Calling OpenRouter:', model);
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://newschill.online', // Required by OpenRouter
          'X-Title': 'NewsChill', // Optional
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature,
          max_tokens: maxTokens,
          response_format: { type: 'json_object' },
        }),
        signal: AbortSignal.timeout(40000), // OpenRouter can be a bit slower
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error('[AI] OpenRouter error:', res.status, errBody.slice(0, 300));
        return null;
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      return JSON.parse(text);
    }
  } catch (e) {
    console.error('[AI] Call failed:', e instanceof Error ? e.message : e);
  }

  return null;
}
