import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  const updateData: Record<string, unknown> = {
    status,
    reviewed_at: status !== 'pending' ? new Date().toISOString() : null,
  };

  const { data: draft, error: fetchError } = await supabaseServer
    .from('ai_drafts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

  // If approved → create article
  if (status === 'approved' && draft) {
    // Get topic_id from topics table
    const { data: topic } = await supabaseServer
      .from('topics')
      .select('id')
      .eq('slug', draft.topic_slug)
      .single();

    const articleData: Record<string, unknown> = {
      title: draft.title,
      excerpt: draft.excerpt,
      content: draft.content,
      cover_image: draft.cover_image,
      author_name: 'Admin Newschill',
      author_avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin',
      topic_id: topic?.id ?? null,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      // SEO fields — carried over from AI-generated draft
      slug: draft.slug || null,
      title_seo: draft.title_seo || null,
      meta_description: draft.meta_description || null,
      keywords: draft.keywords || null,
    };

    // Try with source fields first
    if (draft.source_name) articleData.source_name = draft.source_name;
    if (draft.source_url) articleData.source_url = draft.source_url;

    let { error: articleError } = await supabaseServer.from('articles').insert(articleData);

    // If source columns don't exist, retry without them
    if (articleError?.message?.includes('source_')) {
      delete articleData.source_name;
      delete articleData.source_url;
      const retry = await supabaseServer.from('articles').insert(articleData);
      articleError = retry.error;
    }

    if (articleError) {
      console.error('Failed to create article from draft:', articleError.message);
      // Rollback draft status
      await supabaseServer.from('ai_drafts').update({ status: 'pending', reviewed_at: null }).eq('id', id);
      return NextResponse.json({ error: 'Lỗi tạo bài viết: ' + articleError.message }, { status: 500 });
    }
  }

  return NextResponse.json(draft);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await supabaseServer.from('ai_drafts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
