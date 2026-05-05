import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社概要",
  description: "BULLCOMの会社概要・アクセス情報。神戸・明石のパソコン修理・設定専門店。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">会社概要</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
