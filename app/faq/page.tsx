import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "パソコン修理・設定に関するよくある質問。診断・費用・修理期間など。",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">よくある質問</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
