import type { Metadata } from "next";
import AreaPageContent, { type AreaData } from "../AreaPageContent";

const title = "明石市のパソコン修理・設定｜持ち込み診断無料・出張対応";
const description = "明石市でパソコン修理・設定ならBULLCOM（ブルコム）。明石市境（神戸市西区伊川谷）の店舗で持ち込み診断無料、明石駅周辺・大久保・西明石・魚住・二見へ出張対応。2002年創業の地域密着店。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/area/akashi" },
  openGraph: {
    title: `${title}｜BULLCOM`,
    description,
    url: "https://bullcom.jp/area/akashi",
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BULLCOM 明石市のパソコン修理・設定" }],
  },
  twitter: { card: "summary_large_image", title: `${title}｜BULLCOM`, description, images: ["/og-image.jpg"] },
};

const akashi: AreaData = {
  slug: "akashi",
  cityName: "明石市",
  heroSub: "SERVICE AREA",
  heroTitle: "明石市のパソコン修理・設定",
  heroLead: "店舗は明石市との市境（神戸市西区伊川谷）。明石市内全域への出張と、お持ち込みでの修理・設定に対応しています。持ち込み診断は無料です。",
  crumb: "明石市の対応エリア",
  intro: {
    heading: "明石のお客様にも、創業以来ご利用いただいています",
    body: [
      "BULLCOM（ブルコム）の店舗は神戸市西区伊川谷町有瀬——明石市との市境エリアにあり、明石市内からのアクセスも良好です。2002年の創業以来、明石市のご家庭・事業所から数多くの修理・設定のご依頼をいただいてきました。",
      "「起動しない」「動作が遅い」「ネットに繋がらない」といった突然のトラブルから、新しいパソコンの初期設定・データ移行、法人様の複数台メンテナンスまで、明石のパソコンのお困りごとはお任せください。持ち込み診断は無料、出張・郵送でのご依頼にも対応しています。",
    ],
  },
  districtsHeading: "明石市内の対応エリア",
  districtsLead: "明石市全域に出張対応しています。近隣の播磨町・稲美町もご相談ください。",
  districts: [
    { name: "明石駅・人丸前周辺", note: "明石市中心部" },
    { name: "朝霧・大蔵谷", note: "店舗からすぐの市境エリア" },
    { name: "西明石" },
    { name: "大久保町" },
    { name: "魚住町" },
    { name: "二見町" },
    { name: "播磨町", note: "近隣エリアとして出張対応" },
    { name: "稲美町", note: "近隣エリアとして出張対応" },
  ],
  accessNote: [
    "店舗は明石市との市境、神戸市西区伊川谷町有瀬（ギャラリエ1F）にあります。",
    "朝霧・大蔵谷方面からはすぐ、明石駅周辺・大久保・魚住方面からもお車でご来店いただけます。ご来店が難しい場合は出張・郵送をご利用ください。",
  ],
  faqs: [
    { q: "明石市内も出張エリアですか？", a: "はい、明石市全域に出張対応しています。店舗が明石市境の伊川谷にあるため、朝霧・大蔵谷・西明石・大久保方面へは特にスピーディに伺えます。出張費は¥5,500〜です。" },
    { q: "店舗は明石から近いですか？", a: "店舗（神戸市西区伊川谷町有瀬）は明石市との市境エリアにあり、明石市東部からはすぐ、明石駅周辺からもお車でご来店いただける距離です。ご来店前にお電話またはLINEでご連絡いただくとスムーズです。" },
    { q: "播磨町や稲美町でも対応してもらえますか？", a: "はい、明石市近隣の播磨町・稲美町にも出張対応しています。出張費はエリアにより異なりますので、ご予約時にご確認ください。" },
    { q: "来店できない場合、郵送でも依頼できますか？", a: "はい、郵送でのご依頼も承っています。事前にお電話・LINEでご予約のうえお送りください。修理完了後の返送料は当社負担です。" },
  ],
};

export default function AkashiAreaPage() {
  return <AreaPageContent area={akashi} />;
}
