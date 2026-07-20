import { JsonLd, buildBreadcrumbSchema } from '@/components/seo/JsonLd';
import ArticleDetailClient from './ArticleDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Bài viết', url: `${SITE_URL}/article/${id}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ArticleDetailClient articleId={id} />
    </>
  );
}
