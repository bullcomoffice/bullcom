import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "料金・プラン",
  description: "パソコン修理・設定の料金一覧。持ち込み診断料無料。",
};

export default function PricePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">料金・プラン</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
