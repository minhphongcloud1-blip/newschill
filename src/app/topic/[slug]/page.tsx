import { Metadata } from 'next';
import { mockTopics } from '@/data/topics';
import { JsonLd, buildCollectionSchema, buildBreadcrumbSchema } from '@/components/seo/JsonLd';
import TopicPageClient from './TopicPageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = mockTopics.find((t) => t.slug === slug);
  if (!topic) return { title: 'Không tìm thấy chủ đề' };
  const url = `${SITE_URL}/topic/${slug}`;
  const description = `${topic.description} Xem ${topic.articleCount} bài viết về chủ đề ${topic.name} trên NewsX.`;
  return {
    title: `${topic.icon} ${topic.name}`,
    description,
    openGraph: { title: `${topic.name} | NewsX`, description, url, siteName: 'NewsX', locale: 'vi_VN' },
    twitter: { card: 'summary', title: `${topic.name} | NewsX`, description },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  return mockTopics.map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = mockTopics.find((t) => t.slug === slug);
  const url = `${SITE_URL}/topic/${slug}`;
  const collectionSchema = topic
    ? buildCollectionSchema(`${topic.icon} ${topic.name}`, topic.description, url)
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
