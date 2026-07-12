import type { Metadata } from "next";
import AreaPageContent, { type AreaData } from "../AreaPageContent";

const title = "神戸市のパソコン修理・設定｜持ち込み診断無料・全区出張対応";
const description = "神戸市でパソコン修理・設定ならBULLCOM（ブルコム）。西区伊川谷の店舗へ持ち込み診断無料、神戸市全域へ出張対応。起動しない・動作が遅い・ウイルス感染・Wi-Fi設定などお気軽にご相談ください。2002年創業の地域密着店。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/area/kobe" },
  openGraph: {
    title: `${title}｜BULLCOM`,
    description,
    url: "https://bullcom.jp/area/kobe",
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BULLCOM 神戸市のパソコン修理・設定" }],
  },
  twitter: { card: "summary_large_image", title: `${title}｜BULLCOM`, description, images: ["/og-image.jpg"] },
};

const kobe: AreaData = {
  slug: "kobe",
  cityName: "神戸市",
  heroSub: "SERVICE AREA",
  heroTitle: "神戸市のパソコン修理・設定",
  heroLead: "神戸市西区の店舗を拠点に、神戸市全域のパソコントラブルに対応しています。持ち込み診断は無料、出張・郵送でのご依頼も可能です。",
  crumb: "神戸市の対応エリア",
  intro: {
    heading: "神戸で20年以上、パソコンの困りごとに寄り添ってきました",
    body: [
      "BULLCOM（ブルコム）は2002年の創業以来、神戸市西区・伊川谷の店舗を拠点に、神戸市内のご家庭・事業所のパソコン修理と設定を行ってきました。メーカーや量販店のサポートと違い、「診てもらうだけでお金がかかる」「買い替えばかり勧められる」ということはありません。持ち込み診断は無料、修理しない場合の費用もかかりません。",
      "個人のお客様の「起動しない」「動作が遅い」といった修理はもちろん、法人様の複数台メンテナンス・リモートサポート契約まで、神戸市内のあらゆるパソコンのお困りごとに対応します。",
    ],
  },
  districtsHeading: "神戸市内の対応エリア",
  districtsLead: "神戸市全域に出張対応しています。店舗のある西区とその周辺は特にスピーディに伺えます。",
  districts: [
    { name: "西区", note: "店舗所在地（伊川谷・玉津・押部谷・岩岡ほか）" },
    { name: "垂水区", note: "店舗から近く、即日対応しやすいエリア" },
    { name: "須磨区" },
    { name: "長田区" },
    { name: "兵庫区" },
    { name: "中央区（三宮・元町ほか）" },
    { name: "北区" },
    { name: "灘区" },
    { name: "東灘区" },
  ],
  accessNote: [
    "店舗は神戸市西区伊川谷町有瀬（ギャラリエ1F）にあります。",
    "西区・垂水区からはお車でのご来店が便利です。三宮方面など市街地のお客様は、出張または郵送でのご依頼もご利用いただけます。",
  ],
  faqs: [
    { q: "神戸市内はどこでも出張してもらえますか？", a: "はい、神戸市全域に出張対応しています。出張費は¥5,500〜で、エリアにより異なります。ご予約時におおよその金額をお伝えしますので、まずはお電話またはLINEでご相談ください。" },
    { q: "持ち込みたい場合はどこに行けばいいですか？", a: "神戸市西区伊川谷町有瀬846-10 ギャラリエ1Fの店舗までお持ち込みください。持ち込み診断は無料です。ご来店前にお電話（078-912-2656）またはLINEでご連絡いただくとスムーズにご案内できます。" },
    { q: "診断だけでも本当に無料ですか？", a: "はい、持ち込み診断は無料です。診断の結果、修理をされない場合も費用は一切かかりません。お見積り後のキャンセルも可能です。" },
    { q: "当日中に対応してもらえますか？", a: "症状やご予約状況によりますが、可能な限り迅速に対応しています。急ぎの場合はその旨をお伝えください。お見積りの段階で作業時間の目安もお伝えします。" },
  ],
};

export default function KobeAreaPage() {
  return <AreaPageContent area={kobe} />;
}
