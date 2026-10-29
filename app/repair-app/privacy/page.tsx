import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

// iPhone アプリ「BULLCOM Repair」（店のスタッフ向けの業務用アプリ）のプライバシーポリシー。
// App Store の審査でプライバシーポリシーの URL が必要なために置く。検索結果には出さない。
export const metadata: Metadata = {
  title: "BULLCOM Repair アプリ プライバシーポリシー",
  description: "iPhone アプリ「BULLCOM Repair」のプライバシーポリシーです。",
  alternates: { canonical: "/repair-app/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    id: "send", num: "01", color: "#3a73d1",
    title: "送信する情報と送信先",
    content: "本アプリは、次の機能を使ったときにだけ、端末の外へ情報を送信します。",
    list: [
      "写真診断: 送信した写真・症状の説明・診断結果の添付データは、AI による診断のため Anthropic, PBC（米国）が提供する Claude API に送信されます。送信は利用者が「送信」を押したときだけ行われ、Anthropic 社での取り扱いは同社のプライバシーポリシーと商用利用規約に従います。",
      "ネット診断・安全チェック: 速度や接続先を測るため、Cloudflare, Inc. の測定用サーバーと ipinfo.io にアクセスします。このとき、利用中の回線の IP アドレスが各社に伝わります。",
      "安全チェック: 接続中の Wi-Fi のルーターや LAN 内の機器の管理画面に接続して、危険な設定がないかを確認します。機器の設定は変更せず、パスワードの入力も行いません。",
    ],
  },
  {
    id: "store", num: "02", color: "#2db87a",
    title: "端末内に保存する情報",
    content: "診断の記録（写真・会話・測定結果）は iPhone の中にだけ保存し、当店のサーバーには送信しません。",
    list: [
      "記録はアプリの「記録」からいつでも削除できます。アプリを削除すると記録も削除されます。",
      "AI の利用に使う API キーは iPhone のキーチェーンに保存し、ほかの端末やバックアップには移りません。",
    ],
  },
  {
    id: "notcollect", num: "03", color: "#9b59d4",
    title: "収集しない情報",
    content: "本アプリは、広告用の識別子、位置情報、連絡先、利用状況の分析データを収集しません。他社のアプリやウェブサイトをまたいだ追跡（トラッキング）も行いません。",
  },
  {
    id: "customer", num: "04", color: "#e84a5f",
    title: "お客様の情報について",
    content: "修理品の写真に、お客様の氏名・メールアドレス・パスワードなどの個人情報が写り込まないよう、撮影時に注意しています。写り込んだ場合は、診断が終わったあとに記録を削除します。",
  },
  {
    id: "change", num: "05", color: "#6366f1",
    title: "プライバシーポリシーの変更",
    content: "内容を変更する場合は、このページで公開します。",
  },
  {
    id: "contact", num: "06", color: "#2c5fb8",
    title: "お問い合わせ先",
    content: "本アプリの情報の取り扱いに関するご質問は、下記までお問い合わせください。",
    contact: true,
  },
];

export default function RepairAppPrivacyPage() {
  return (
    <>
      <PageHero sub="APP PRIVACY POLICY" title="BULLCOM Repair アプリ プライバシーポリシー" crumb="アプリ プライバシーポリシー" />

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "28px 32px", marginBottom: "24px", color: "#fff" }}>
            <p style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", marginBottom: "10px" }}>INTRODUCTION</p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", lineHeight: 1.9, fontSize: "14.5px" }}>
              パソコン修理・設定 BULLCOM（以下「当店」）は、iPhone アプリ「BULLCOM Repair」（以下「本アプリ」）での情報の取り扱いを次のとおり定めます。本アプリは、当店のスタッフがパソコンや周辺機器の修理・点検を行うための業務用アプリです。
            </p>
            <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>制定日: 2026年10月29日</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px 24px", borderBottom: "1px solid var(--color-border)", background: `${sec.color}08` }}>
                  <span style={{ flexShrink: 0, width: "36px", height: "36px", background: sec.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "13px", boxShadow: `0 4px 10px ${sec.color}44` }}>{sec.num}</span>
                  <h2 style={{ fontSize: "16px", margin: 0, color: "var(--color-text)" }}>{sec.title}</h2>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <p style={{ color: "var(--color-text-soft)", lineHeight: 1.9, margin: 0, fontSize: "14.5px" }}>{sec.content}</p>
                  {"list" in sec && sec.list && (
                    <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {sec.list.map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", lineHeight: 1.8, color: "var(--color-text-soft)" }}>
                          <svg style={{ flexShrink: 0, marginTop: "5px", color: sec.color }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"contact" in sec && sec.contact && (
                    <div style={{ marginTop: "16px", padding: "20px 24px", background: "var(--color-bg-soft)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", fontSize: "14.5px", lineHeight: 1.9 }}>
                      <strong style={{ display: "block", marginBottom: "8px", color: "var(--color-text)" }}>パソコン修理・設定 BULLCOM</strong>
                      〒651-2113 兵庫県神戸市西区伊川谷町有瀬846-10 ギャラリエ1F<br />
                      TEL: <a href="tel:0789122656" style={{ color: "var(--color-primary)", fontWeight: 600 }}>078-912-2656</a><br />
                      Mail: info@bullcom.jp<br />
                      受付時間: 9:00〜19:00（不定休）
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/privacy" className="btn btn-outline">当店のプライバシーポリシー</Link>
            <Link href="/" className="btn btn-outline">トップページへ戻る</Link>
          </div>
        </div>
      </section>
    </>
  );
}
