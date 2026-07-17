import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NewsX - Nền tảng tin tức thế hệ mới",
  description: "Đọc tin tức, bình luận và chia sẻ trên nền tảng kiểu X (Twitter). Cập nhật tin tức công nghệ, khoa học, kinh doanh, thể thao và nhiều hơn nữa.",
  keywords: ["tin tức", "blog", "công nghệ", "khoa học", "Việt Nam", "newsX"],
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
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
