import type { Metadata } from "next";
import { BlogListView } from "./_components/BlogListView";

export const metadata: Metadata = {
  title: "ブログ・コラム",
  description: "パソコン修理・設定に関するお役立ち情報・コラム。",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "ブログ・コラム｜パソコン修理・設定 BULLCOM",
    description: "パソコン修理・設定に関するお役立ち情報・コラム。",
    url: "https://bullcom.jp/blog",
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BULLCOM ブログ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ・コラム｜パソコン修理・設定 BULLCOM",
    description: "パソコン修理・設定に関するお役立ち情報・コラム。",
    images: ["/og-image.jpg"],
  },
};

// 静的生成（60分ごとに再生成）
export const revalidate = 3600;

export default async function BlogPage() {
  return <BlogListView pageNum={1} />;
}
