// app/services/layout.tsx
// page.tsx が "use client" のため metadata を持てない制約を、親 layout で回避する（App Router の定石）
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧・修理メニュー",
  description:
    "神戸市・明石市のパソコン修理・設定サービス一覧。持ち込み診断無料、出張・郵送にも対応。修理、初期設定、データ復旧、ウイルス駆除まで料金体系を明示してご案内します。",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "サービス一覧・修理メニュー｜パソコン修理・設定 BULLCOM",
    description:
      "神戸市・明石市のパソコン修理・設定サービス一覧。持ち込み診断無料、出張・郵送対応。",
    url: "https://bullcom.jp/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
