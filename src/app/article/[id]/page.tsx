import { Metadata } from 'next';
import { mockArticles } from '@/data/articles';
import { JsonLd, buildArticleSchema, buildBreadcrumbSchema } from '@/components/seo/JsonLd';
import ArticleDetailClient from './ArticleDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    return { title: 'Không tìm thấy bài viết', description: 'Bài viết không tồn tại hoặc đã bị xóa.' };
  }

  const url = `${SITE_URL}/article/${id}`;
  const plainExcerpt = article.excerpt.replace(/<[^>]+>/g, '');

  return {
    title: article.title,
    description: plainExcerpt,
    keywords: [article.topic.name, article.author.name, 'tin tức', 'NewsX', ...article.title.split(' ').slice(0, 5)],
    authors: [{ name: article.author.name }],
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: plainExcerpt,
      images: article.coverImage ? [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }] : [],
      publishedTime: article.createdAt,
      authors: [article.author.name],
      section: article.topic.name,
      locale: 'vi_VN',
      siteName: 'NewsX',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: plainExcerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return mockArticles.map((a) => ({ id: a.id }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const article = mockArticles.find((a) => a.id === id);

  const articleSchema = article ? buildArticleSchema(article) : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: article?.topic.name ?? 'Chủ đề', url: `${SITE_URL}/topic/${article?.topic.slug ?? ''}` },
    { name: article?.title ?? 'Bài viết', url: `${SITE_URL}/article/${id}` },
  ]);

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
      <JsonLd data={breadcrumbSchema} />
      <ArticleDetailClient articleId={id} />
    </>
  );
}
