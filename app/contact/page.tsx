import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "BULLCOMへのお問い合わせ。電話・LINE・フォームからご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">お問い合わせ</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
