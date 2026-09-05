import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--loaded-noto",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--loaded-zen",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--loaded-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bullcom.jp"),
  title: {
    default: "パソコン修理・設定 BULLCOM｜神戸市・明石市 持ち込み診断無料",
    template: "%s｜パソコン修理・設定 BULLCOM",
  },
  description:
    "神戸市・明石市のパソコン修理・設定専門店BULLCOM。持ち込み診断料無料、出張・郵送対応。個人・法人どちらも対応。神戸市西区・明石市の地域密着で20年以上の実績。",
  keywords: ["パソコン修理", "パソコン修理 明石", "パソコン修理 明石市", "パソコン修理 神戸", "パソコン修理 神戸市", "明石市 パソコン修理", "神戸市 パソコン修理", "明石 PC修理", "神戸 PC修理", "パソコン設定", "明石", "神戸", "PC修理"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "パソコン修理・設定 BULLCOM｜神戸市・明石市 持ち込み診断無料",
    description:
      "神戸市・明石市のパソコン修理・設定専門店BULLCOM。持ち込み診断料無料、出張・郵送対応。個人・法人どちらも対応。神戸市西区・明石市の地域密着で20年以上の実績。",
    url: "https://bullcom.jp",
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BULLCOM（ブルコム）パソコン修理",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "パソコン修理・設定 BULLCOM｜神戸市・明石市 持ち込み診断無料",
    description:
      "神戸市・明石市のパソコン修理・設定専門店BULLCOM。持ち込み診断料無料、出張・郵送対応。個人・法人どちらも対応。神戸市西区・明石市の地域密着で20年以上の実績。",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${zenKaku.variable} ${inter.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EEBVV8ECNT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EEBVV8ECNT');

            /* 電話タップの計測（A-9・2026-09-06）
               電話が主要導線なのに tel: リンクのクリックを1件も測っておらず、
               キーイベントがフォーム送信(generate_lead)だけだった。8月の問い合わせは
               実際にはあったが全て電話経由で、GA4上はCVゼロに見えていた。
               ＝「CVが減った」ではなく「CVが計測対象外の電話に流れていた」。

               tel: リンクは10箇所あるので、各リンクを触らず document への委譲で拾う。
               どの導線からの電話かは data-tel-loc（無ければ header/footer/body を自動判定）。
               ※ gtag('config') より前に積んだ event は黙って捨てられるため、
                  必ず config の後に登録すること。 */
            document.addEventListener('click', function (e) {
              var a = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
              if (!a) return;
              var loc = a.getAttribute('data-tel-loc')
                || (a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : 'body');
              gtag('event', 'cv_tel_tap', {
                link_location: loc,
                page_path: location.pathname,
              });
            }, true);
          `}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="floating-line">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 2.8 1.8 5.3 4.6 6.7-.1.6-.6 2.4-.7 2.7-.1.4.2.4.4.3.2-.1 2.6-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.3S17.5 2 12 2z"/></svg>
          LINEで相談
        </a>
      </body>
    </html>
  );
}
