import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListView, totalPagesFor } from "../../_components/BlogListView";
import { getBlogs } from "@/lib/microcms";

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getBlogs(1, 0);
  const totalPages = totalPagesFor(data.totalCount);
  // /blog はページ1なので、/blog/page/[num] は 2 以降のみ生成
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    pageNum: String(i + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ pageNum: string }> }): Promise<Metadata> {
  const { pageNum } = await params;
  return {
    title: `ブログ・コラム（${pageNum}ページ目）`,
    description: "パソコン修理・設定に関するお役立ち情報・コラム。",
    alternates: { canonical: `/blog/page/${pageNum}` },
  };
}

export default async function BlogPageNum({ params }: { params: Promise<{ pageNum: string }> }) {
  const { pageNum } = await params;
  const num = Number(pageNum);
  if (!Number.isInteger(num) || num < 2) {
    notFound();
  }

  // 範囲外チェック
  const data = await getBlogs(1, 0);
  const totalPages = totalPagesFor(data.totalCount);
  if (num > totalPages) {
    notFound();
  }

  return <BlogListView pageNum={num} />;
}
