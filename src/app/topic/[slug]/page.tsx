import { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase';
import { JsonLd, buildCollectionSchema, buildBreadcrumbSchema } from '@/components/seo/JsonLd';
import TopicPageClient from './TopicPageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.vn';

interface Props {
  params: Promise<{ slug: string }>;
}

// Fetch topic by slug from Supabase
async function getTopicBySlug(slug: string) {
  const { data } = await supabaseServer
    .from('topics')
    .select('id, name, slug, icon, color, description, article_count')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) return { title: 'Không tìm thấy chủ đề' };
  const url = `${SITE_URL}/topic/${slug}`;
  const description = `${topic.description ?? ''} Xem bài viết về chủ đề ${topic.name} trên Newschill.`;
  return {
    title: `${topic.icon} ${topic.name}`,
    description,
    openGraph: { title: `${topic.name} | Newschill`, description, url, siteName: 'Newschill', locale: 'vi_VN' },
    twitter: { card: 'summary', title: `${topic.name} | Newschill`, description },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  // Build static paths from real Supabase topics
  const { data } = await supabaseServer.from('topics').select('slug');
  if (!data || data.length === 0) {
    // Fallback: common slugs so build doesn't fail
    return [
      { slug: 'cong-nghe' }, { slug: 'kinh-te' }, { slug: 'xa-hoi' },
      { slug: 'the-thao' }, { slug: 'giai-tri' }, { slug: 'khoa-hoc' },
    ];
  }
  return data.map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  const url = `${SITE_URL}/topic/${slug}`;
  const collectionSchema = topic
    ? buildCollectionSchema(`${topic.icon} ${topic.name}`, topic.description ?? '', url)
    : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Chủ đề', url: `${SITE_URL}/topics` },
    { name: topic?.name ?? slug, url },
  ]);
  return (
    <>
      {collectionSchema && <JsonLd data={collectionSchema} />}
      <JsonLd data={breadcrumbSchema} />
      <TopicPageClient slug={slug} />
    </>
  );
}
