import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧",
  description: "個人・法人向けのパソコン修理・設定サービス一覧。",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">サービス一覧</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
