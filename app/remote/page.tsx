import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

/**
 * リモートサポートの接続案内ページ。
 *
 * 電話口での案内を短くするために用意している。お客様に
 * 「teamviewer.com/bullcom」と英字を綴ってもらうのは電話では難しいので、
 * 自社ドメインの短縮URL（bullcom.jp/r → このページ）へ誘導し、
 * ダウンロード後の手順（実行 → 表示されたIDを読み上げ）まで画面に出しておく。
 *
 * 対象は「当社でパソコンをご購入の方（無償）」と「年間契約者」のみ。
 * スポット（単発）のリモート対応は行っていないため、対象外の方には
 * 持ち込み・出張・郵送の導線へ誘導する。
 */

const TEAMVIEWER_URL = "https://teamviewer.com/bullcom";

const title = "リモートサポート 接続手順｜遠隔サポートツールのダウンロード";
const description =
  "BULLCOM（ブルコム）のリモートサポートをご利用中の方向けのページです。遠隔サポートツールのダウンロードと、接続までの3ステップをご案内します。当社でパソコンをご購入の方は無償、その他は年間契約者様が対象です。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/remote" },
  openGraph: {
    title: `${title}｜BULLCOM`,
    description,
    url: "https://bullcom.jp/remote",
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BULLCOM リモートサポート" }],
  },
  twitter: { card: "summary_large_image", title: `${title}｜BULLCOM`, description, images: ["/og-image.jpg"] },
};

const steps = [
  {
    n: "1",
    title: "ダウンロード",
    body: "下のボタンを押すと、サポート用のファイルがダウンロードされます。画面の下か右上に、ダウンロードされたファイルが表示されます。",
  },
  {
    n: "2",
    title: "ファイルを開く",
    body: "ダウンロードされたファイルをダブルクリックして開いてください。「このアプリがデバイスに変更を加えることを許可しますか？」と出たら「はい」を押します。",
  },
  {
    n: "3",
    title: "番号を電話で伝える",
    // 桁数はツールや環境によって変わる（9桁のことも10桁のこともある）ので、
    // 桁数には触れず「表示された番号」とだけ書く。
    body: "画面に「使用中のID」という番号が表示されます。その番号を、お電話中のスタッフにそのままお読みください。こちらから接続します。",
  },
];

export default function RemotePage() {
  return (
    <>
      <PageHero
        sub="REMOTE SUPPORT"
        title="リモートサポート 接続手順"
        lead="お電話しながら、画面を見せていただくためのご案内です。3ステップで接続できます。"
        crumb="リモートサポート"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          {/* 対象者 */}
          <div
            style={{
              background: "var(--color-bg-soft)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 28px",
              marginBottom: "32px",
            }}
          >
            <h2 style={{ fontSize: "16px", marginBottom: "14px" }}>ご利用いただける方</h2>
            <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 2 }}>
              <li>
                <strong>当社でパソコンをご購入いただいた方</strong>
                <span style={{ color: "var(--color-pink-dark)", fontWeight: 700, marginLeft: "8px" }}>無償</span>
              </li>
              <li>
                <strong>リモートサポート年間契約（¥11,000 / 年）をご契約の方</strong>
                <span style={{ color: "var(--color-text-muted)", marginLeft: "8px" }}>1台あたり・月3回まで</span>
              </li>
            </ul>
            <p style={{ marginTop: "14px", marginBottom: 0, fontSize: "13px", color: "var(--color-text-muted)" }}>
              ※ 単発でのリモート対応は行っておりません。上記に当てはまらない方は、
              <Link href="/contact" style={{ color: "var(--color-primary-dark)", fontWeight: 700 }}>お問い合わせ</Link>
              から持ち込み・出張・郵送でのご依頼を承ります。
            </p>
          </div>

          {/* 注意喚起 */}
          <div
            style={{
              background: "#fff5f5",
              border: "1px solid #f3c2c2",
              borderLeft: "4px solid #d94a4a",
              borderRadius: "var(--radius)",
              padding: "20px 24px",
              marginBottom: "32px",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, color: "#b93030", marginBottom: "8px" }}>
              当社からお電話していないときは、絶対に実行しないでください
            </p>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.9 }}>
              「ウイルスに感染しています」という警告画面や、身に覚えのない電話をきっかけに遠隔操作ソフトを入れさせるのは、
              サポート詐欺の典型的な手口です。このページの操作は、
              <strong>当社スタッフとお電話がつながっている状態でのみ</strong>行ってください。
              詳しくは
              <Link href="/blog" style={{ color: "var(--color-primary-dark)", fontWeight: 700 }}>ブログのサポート詐欺の記事</Link>
              でも解説しています。
            </p>
          </div>

          {/* ダウンロード */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <a
              href={TEAMVIEWER_URL}
              data-remote-dl="remote-page"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: "22px 40px", fontSize: "19px", width: "100%", maxWidth: "460px", justifyContent: "center" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              サポートツールをダウンロード
            </a>
            <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--color-text-muted)" }}>
              Windows・Mac に対応しています。インストールは不要です。
            </p>
          </div>

          {/* 手順 */}
          <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>接続までの3ステップ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {steps.map((s) => (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  gap: "18px",
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "22px 24px",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-en)",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: "6px" }}>{s.title}</p>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.9, color: "var(--color-text)" }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 困ったとき */}
          <div
            style={{
              background: "var(--color-bg-soft)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 28px",
            }}
          >
            <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>うまくいかないときは</h2>
            <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.9 }}>
              そのままお電話でお伝えください。画面を見ながら一緒に進めます。
              <br />
              <a href="tel:0789122656" data-tel-loc="remote-page" style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-primary-dark)" }}>
                078-912-2656
              </a>
              <span style={{ color: "var(--color-text-muted)", marginLeft: "10px", fontSize: "13px" }}>受付 9:00〜19:00</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
