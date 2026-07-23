/**
 * /api/admin/openrouter/sync/route.ts
 *
 * POST — Fetch all models from OpenRouter, upsert into DB
 * GET  — Return list of synced models from DB (for dropdown)
 */

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// ── Types ──────────────────────────────────────────────────────────
interface OpenRouterModelRaw {
  id: string;
  name: string;
  description?: string;
  context_length?: number;
  pricing?: {
    prompt?: string;
    completion?: string;
  };
  architecture?: {
    modality?: string;
    tokenizer?: string;
    instruct_type?: string;
  };
}

interface ModelUpsertRow {
  model_id: string;
  name: string;
  description: string | null;
  context_length: number;
  pricing_prompt: number;
  pricing_completion: number;
  is_free: boolean;
  architecture: string | null;
}

// ── GET — list models from DB ──────────────────────────────────────
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('q') ?? '';

    let query = supabaseServer
      .from('openrouter_models')
      .select('model_id, name, description, context_length, pricing_prompt, pricing_completion, is_free')
      .order('is_free', { ascending: false })
      .order('name', { ascending: true })
      .limit(300);

    if (keyword.trim()) {
      query = query.ilike('name', `%${keyword}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data: data ?? [], count: data?.length ?? 0 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[OpenRouter GET models]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ── POST — sync from OpenRouter API ───────────────────────────────
export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json() as { apiKey?: string };

    if (!apiKey?.trim()) {
      return NextResponse.json({ error: 'Thiếu API Key' }, { status: 400 });
    }

    // 1. Fetch danh sách model từ OpenRouter
    const orRes = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      // Không cache — luôn lấy mới nhất
      cache: 'no-store',
    });

    if (!orRes.ok) {
      const errBody = await orRes.text();
      console.error('[OpenRouter sync] API error', orRes.status, errBody);
      return NextResponse.json(
        { error: `OpenRouter trả về lỗi ${orRes.status}. Kiểm tra lại API Key.` },
        { status: 400 }
      );
    }

    const json = await orRes.json() as { data: OpenRouterModelRaw[] };
    const rawModels = json.data ?? [];

    if (rawModels.length === 0) {
      return NextResponse.json({ synced: 0, message: 'OpenRouter không trả về model nào.' });
    }

    // 2. Parse & chuẩn hoá dữ liệu
    const rows: ModelUpsertRow[] = rawModels.map((m) => {
      const pPrompt     = parseFloat(m.pricing?.prompt     ?? '0') || 0;
      const pCompletion = parseFloat(m.pricing?.completion ?? '0') || 0;

      return {
        model_id:          m.id,
        name:              m.name ?? m.id,
        description:       m.description ?? null,
        context_length:    m.context_length ?? 0,
        pricing_prompt:    pPrompt,
        pricing_completion: pCompletion,
        // Model miễn phí: giá bằng 0 hoặc model_id có đuôi ':free'
        is_free:           (pPrompt === 0 && pCompletion === 0) || m.id.endsWith(':free'),
        architecture:      m.architecture?.modality ?? null,
      };
    });

    // 3. Upsert vào Supabase (batch 100 dòng để không overload)
    const BATCH = 100;
    let totalSynced = 0;

    for (let i = 0; i < rows.length; i += BATCH) {
      const chunk = rows.slice(i, i + BATCH);
      const { error: upsertError } = await supabaseServer
        .from('openrouter_models')
        .upsert(chunk, { onConflict: 'model_id', ignoreDuplicates: false });

      if (upsertError) {
        console.error('[OpenRouter sync] Upsert error batch', i, upsertError.message);
        // Tiếp tục batch kế — không dừng hẳn
      } else {
        totalSynced += chunk.length;
      }
    }

    return NextResponse.json({
      synced: totalSynced,
      total: rows.length,
      message: `Đã đồng bộ ${totalSynced} model thành công.`,
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[OpenRouter sync] Unexpected error', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
