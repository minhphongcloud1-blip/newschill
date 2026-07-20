import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xu hướng',
  description: 'Khám phá các bài viết đang được đọc nhiều nhất trên NewsX. Tin tức xu hướng về công nghệ, khoa học, kinh doanh và thể thao.',
  openGraph: {
    title: 'Xu hướng | NewsX',
    description: 'Khám phá các bài viết đang được đọc nhiều nhất trên NewsX.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'NewsX',
  },
  twitter: {
    card: 'summary',
    title: 'Xu hướng | NewsX',
    description: 'Khám phá các bài viết đang được đọc nhiều nhất trên NewsX.',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn'}/trending` },
};

export { default } from './TrendingPageClient';
