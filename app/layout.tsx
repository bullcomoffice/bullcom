import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "パソコン修理・設定 BULLCOM｜神戸・明石 持ち込み診断無料",
    template: "%s｜パソコン修理・設定 BULLCOM",
  },
  description:
    "神戸・明石のパソコン修理・設定専門店BULLCOM。持ち込み診断料無料、出張・郵送対応。個人・法人どちらも対応しています。",
  keywords: ["パソコン修理", "パソコン設定", "明石", "神戸", "PC修理"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
