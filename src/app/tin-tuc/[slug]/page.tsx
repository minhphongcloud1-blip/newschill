import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase';
import { JsonLd, buildBreadcrumbSchema, buildArticleSchema } from '@/components/seo/JsonLd';
import ArticleDetailClient from '@/app/article/[id]/ArticleDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getArticleBySlug(slug: string) {
  const { data } = await supabaseServer
    .from('articles')
    .select('*, topics(slug, name, icon, color, description)')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);
  if (!data) return {};

  const title = data.title_seo || data.title;
  const description = data.meta_description || data.excerpt?.slice(0, 160) || '';
  const image = data.cover_image || `${SITE_URL}/og-image.png`;
  const url = `${SITE_URL}/tin-tuc/${slug}`;

  return {
    title,
    description,
    keywords: data.keywords || undefined,
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Newschill',
      locale: 'vi_VN',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: data.created_at,
      modifiedTime: data.updated_at || data.created_at,
      authors: [data.author_name],
      section: data.topics?.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function TinTucPage({ params }: Props) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);

  if (!data) notFound();

  // Build JSON-LD
  const articleSchema = buildArticleSchema({
    id: data.id,
    title: data.title_seo || data.title,
    excerpt: data.meta_description || data.excerpt || '',
    content: data.content || '',
    coverImage: data.cover_image || '',
    createdAt: data.created_at,
    author: { name: data.author_name, avatar: data.author_avatar || '' },
    topic: { name: data.topics?.name ?? 'Tin tức' },
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: data.topics?.name ?? 'Tin tức', url: `${SITE_URL}/topic/${data.topics?.slug ?? 'general'}` },
    { name: data.title, url: `${SITE_URL}/tin-tuc/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <ArticleDetailClient articleId={data.id} />
    </>
  );
}
