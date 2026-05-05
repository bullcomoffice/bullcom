import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "パソコン修理・設定 BULLCOMのプライバシーポリシーです。",
};

const sections = [
  {
    title: "1. 個人情報の収集について",
    content: "当社は、サービスのご提供にあたり、お名前・電話番号・メールアドレス・ご住所など必要な範囲で個人情報をお預かりする場合があります。",
  },
  {
    title: "2. 個人情報の利用目的",
    content: "お預かりした個人情報は、以下の目的のために利用いたします。",
    list: [
      "修理・設定サービスのご提供",
      "お問い合わせへの対応",
      "修理状況・完了のご連絡",
      "請求書・領収書の発行",
      "サービス改善のための統計・分析（個人を特定しない形で）",
    ],
  },
  {
    title: "3. 第三者への提供",
    content: "当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。",
    list: [
      "お客様ご本人の同意がある場合",
      "法令に基づく開示が求められた場合",
      "生命・身体・財産の保護のために必要と判断した場合",
    ],
  },
  {
    title: "4. 個人情報の管理",
    content: "当社は、お預かりした個人情報の漏洩・紛失・不正アクセスを防ぐため、適切な安全管理措置を講じます。",
  },
  {
    title: "5. Cookieの使用について",
    content: "当サイトでは、Google Analyticsを使用してアクセス解析を行っています。これにより収集されるデータは匿名であり、個人を特定するものではありません。Cookieを無効にされたい場合は、ブラウザの設定からお手続きください。",
  },
  {
    title: "6. 個人情報の開示・修正・削除",
    content: "お客様ご自身の個人情報の開示・修正・削除をご希望の場合は、下記お問い合わせ先までご連絡ください。ご本人確認のうえ、合理的な期間内に対応いたします。",
  },
  {
    title: "7. プライバシーポリシーの変更",
    content: "本ポリシーは、法令の改正やサービスの変更に伴い、予告なく改定する場合があります。改定後のポリシーは当サイトに掲載した時点で効力を生じるものとします。",
  },
  {
    title: "8. お問い合わせ先",
    content: "個人情報の取り扱いに関するご質問・ご相談は、下記までお問い合わせください。",
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero sub="PRIVACY" title="プライバシーポリシー" crumb="プライバシーポリシー" />

      <section>
        <div className="container container-narrow">
          <div style={{ background: "var(--color-bg-tint)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "24px 28px", marginBottom: "40px", fontSize: "14.5px", color: "var(--color-text-soft)", lineHeight: 1.85 }}>
            パソコン修理・設定 BULLCOM（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、以下のとおりプライバシーポリシーを定めます。
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {sections.map((sec) => (
              <div key={sec.title}>
                <h2 style={{ fontSize: "20px", marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid var(--color-border)" }}>{sec.title}</h2>
                <p style={{ color: "var(--color-text-soft)", lineHeight: 1.85, margin: 0 }}>{sec.content}</p>
                {"list" in sec && sec.list && (
                  <ul style={{ paddingLeft: "24px", marginTop: "12px", color: "var(--color-text-soft)", lineHeight: 2 }}>
                    {sec.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {"contact" in sec && sec.contact && (
                  <div style={{ marginTop: "16px", padding: "20px 24px", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", fontSize: "14.5px", lineHeight: 1.85 }}>
                    <strong>パソコン修理・設定 BULLCOM</strong><br />
                    〒651-2113 兵庫県神戸市西区伊川谷町846-10 ギャラリエ1F<br />
                    TEL: 078-912-2656<br />
                    Mail: info@bullcom.jp<br />
                    受付時間: 9:00〜19:00（不定休）
                  </div>
                )}
              </div>
            ))}
          </div>

          <p style={{ marginTop: "48px", fontSize: "13px", color: "var(--color-text-muted)", textAlign: "right" }}>
            制定日: 2026年5月<br />
            BULLCOM
          </p>

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link href="/" className="btn btn-outline">トップページへ戻る</Link>
          </div>
        </div>
      </section>
    </>
  );
}
