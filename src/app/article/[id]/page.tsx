import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase';
import { JsonLd, buildBreadcrumbSchema, buildArticleSchema } from '@/components/seo/JsonLd';
import ArticleDetailClient from './ArticleDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';

interface Props {
  params: Promise<{ id: string }>;
}

// Generate dynamic SEO metadata for each article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await supabaseServer
      .from('articles')
      .select('title, title_seo, excerpt, meta_description, cover_image, author_name, created_at, slug')
      .eq('id', id)
      .single();

    if (!data) return {};

    const title = data.title_seo || data.title;
    const description = data.meta_description || data.excerpt?.slice(0, 160) || '';
    const image = data.cover_image || `${SITE_URL}/og-image.png`;
    // Canonical points to slug URL if available
    const canonical = data.slug ? `${SITE_URL}/tin-tuc/${data.slug}` : `${SITE_URL}/article/${id}`;

    return {
      title,
      description,
      openGraph: {
        type: 'article',
        title,
        description,
        url: canonical,
        images: [{ url: image, width: 1200, height: 630, alt: title }],
        publishedTime: data.created_at,
        authors: [data.author_name],
      },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
      alternates: { canonical },
    };
  } catch {
    return {};
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;

  // If article has a slug → redirect 301 to /tin-tuc/[slug]
  try {
    const { data: slugData } = await supabaseServer
      .from('articles')
      .select('slug')
      .eq('id', id)
      .single();

    if (slugData?.slug) {
      redirect(`/tin-tuc/${slugData.slug}`);
    }
  } catch { /* no slug – fall through */ }

  // Fallback render for articles without slug yet
  let articleSchema = null;
  try {
    const { data } = await supabaseServer
      .from('articles')
      .select('*, topics(slug, name, icon, color, description)')
      .eq('id', id)
      .single();

    if (data) {
      articleSchema = buildArticleSchema({
        id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.cover_image,
        createdAt: data.created_at,
        author: { name: data.author_name, avatar: data.author_avatar },
        topic: { name: data.topics?.name ?? 'Tin tức' },
      });
    }
  } catch { /* ignore */ }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Bài viết', url: `${SITE_URL}/article/${id}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {articleSchema && <JsonLd data={articleSchema} />}
      <ArticleDetailClient articleId={id} />
    </>
  );
}
