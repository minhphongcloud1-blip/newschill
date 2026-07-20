/**
 * JSON-LD Structured Data Components for SEO
 * Usage: <JsonLd data={articleSchema} />
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn';

/** WebSite schema for homepage */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NewsX',
  url: SITE_URL,
  description: 'Đọc tin tức, bình luận và chia sẻ trên nền tảng kiểu X. Cập nhật tin tức công nghệ, khoa học, kinh doanh, thể thao nhanh nhất Việt Nam.',
  inLanguage: 'vi',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?search={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

/** Article schema for article detail page */
export function buildArticleSchema(article: {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  author: { name: string; avatar: string };
  topic: { name: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.createdAt,
    dateModified: article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      image: article.author.avatar,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NewsX',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/article/${article.id}` },
    articleSection: article.topic.name,
    inLanguage: 'vi',
    url: `${SITE_URL}/article/${article.id}`,
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** CollectionPage schema for topic/trending pages */
export function buildCollectionSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: 'vi',
    publisher: { '@type': 'Organization', name: 'NewsX', url: SITE_URL },
  };
}
