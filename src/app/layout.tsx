import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RssProvider } from "@/contexts/RssContext";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newschill.online';
const SITE_NAME = 'Newschill';
const DEFAULT_DESCRIPTION = 'Đọc tin tức, bình luận và chia sẻ trên nền tảng kiểu X. Cập nhật tin tức công nghệ, khoa học, kinh doanh, thể thao nhanh nhất Việt Nam.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Tin tức thế hệ mới`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['tin tức', 'blog', 'công nghệ', 'khoa học', 'kinh doanh', 'thể thao', 'Việt Nam', 'Newschill', 'tin tức mới nhất', 'tin công nghệ'],
  authors: [{ name: 'Newschill', url: SITE_URL }],
  creator: 'Newschill',
  publisher: 'Newschill',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Tin tức thế hệ mới`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} – Tin tức thế hệ mới` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} – Tin tức thế hệ mới`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
    creator: '@newschillvn',
    site: '@newschillvn',
  },
  alternates: { canonical: SITE_URL },
  other: { 'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_TOKEN' },
};

export const viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0F0F0F' }, { media: '(prefers-color-scheme: light)', color: '#FFFFFF' }],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <RssProvider>
              {children}
            </RssProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
