import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xu hướng',
  description: 'Khám phá các bài viết đang được đọc nhiều nhất trên Newschill. Tin tức xu hướng về công nghệ, khoa học, kinh doanh và thể thao.',
  openGraph: {
    title: 'Xu hướng | Newschill',
    description: 'Khám phá các bài viết đang được đọc nhiều nhất trên Newschill.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Newschill',
  },
  twitter: {
    card: 'summary',
    title: 'Xu hướng | Newschill',
    description: 'Khám phá các bài viết đang được đọc nhiều nhất trên Newschill.',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.vn'}/trending` },
};

export { default } from './TrendingPageClient';
