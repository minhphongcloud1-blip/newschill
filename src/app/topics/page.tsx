import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khám phá chủ đề',
  description: 'Khám phá tất cả chủ đề trên NewsX: Công nghệ, Khoa học, Kinh doanh, Thể thao, Giải trí và nhiều hơn nữa.',
  openGraph: {
    title: 'Chủ đề | NewsX',
    description: 'Khám phá tất cả chủ đề trên NewsX: Công nghệ, Khoa học, Kinh doanh, Thể thao, Giải trí.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'NewsX',
  },
  twitter: {
    card: 'summary',
    title: 'Chủ đề | NewsX',
    description: 'Khám phá tất cả chủ đề trên NewsX.',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn'}/topics` },
};

export { default } from './TopicsListClient';
