import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ・コラム",
  description: "パソコン修理・設定に関するお役立ち情報。",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">ブログ・コラム</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
