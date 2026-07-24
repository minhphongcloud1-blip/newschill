import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 * Body: { tag?: string; path?: string; secret: string }
 *
 * Dùng để purge cache sau khi admin duyệt bài hoặc cập nhật bài viết.
 * Gọi từ draft approval hoặc từ webhook Supabase.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = await req.json().catch(() => ({}));

  // Bảo vệ bằng secret token
  if (secret && body.secret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { tag, path, slug } = body;

  if (tag) {
    revalidateTag(tag);
  }

  if (path) {
    revalidatePath(path);
  }

  // Nếu có slug → invalidate trang bài viết cụ thể
  if (slug) {
    revalidatePath(`/tin-tuc/${slug}`);
    revalidateTag('articles');
  }

  return NextResponse.json({
    revalidated: true,
    tag: tag ?? null,
    path: path ?? null,
    slug: slug ?? null,
    timestamp: new Date().toISOString(),
  });
}

// Convenience: revalidate all articles (admin use)
export async function DELETE() {
  revalidateTag('articles');
  revalidatePath('/');
  revalidatePath('/trending');
  return NextResponse.json({ revalidated: true, scope: 'all articles', timestamp: new Date().toISOString() });
}
