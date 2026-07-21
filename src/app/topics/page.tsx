import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khám phá chủ đề',
  description: 'Khám phá tất cả chủ đề trên Newschill: Công nghệ, Khoa học, Kinh doanh, Thể thao, Giải trí và nhiều hơn nữa.',
  openGraph: {
    title: 'Chủ đề | Newschill',
    description: 'Khám phá tất cả chủ đề trên Newschill: Công nghệ, Khoa học, Kinh doanh, Thể thao, Giải trí.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Newschill',
  },
  twitter: {
    card: 'summary',
    title: 'Chủ đề | Newschill',
    description: 'Khám phá tất cả chủ đề trên Newschill.',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.vn'}/topics` },
};

export { default } from './TopicsListClient';
