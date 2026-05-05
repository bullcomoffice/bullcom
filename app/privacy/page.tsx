import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "パソコン修理・設定 BULLCOMのプライバシーポリシーです。",
};

const sections = [
  {
    id: "collect", num: "01", color: "#3a73d1",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    title: "個人情報の収集について",
    content: "当社は、サービスのご提供にあたり、お名前・電話番号・メールアドレス・ご住所など必要な範囲で個人情報をお預かりする場合があります。",
  },
  {
    id: "purpose", num: "02", color: "#2db87a",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    title: "個人情報の利用目的",
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
    id: "third", num: "03", color: "#9b59d4",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "第三者への提供",
    content: "当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。",
    list: [
      "お客様ご本人の同意がある場合",
      "法令に基づく開示が求められた場合",
      "生命・身体・財産の保護のために必要と判断した場合",
    ],
  },
  {
    id: "manage", num: "04", color: "#e84a5f",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "個人情報の管理",
    content: "当社は、お預かりした個人情報の漏洩・紛失・不正アクセスを防ぐため、適切な安全管理措置を講じます。",
  },
  {
    id: "cookie", num: "05", color: "#f5820a",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "Cookieの使用について",
    content: "当サイトでは、Google Analyticsを使用してアクセス解析を行っています。これにより収集されるデータは匿名であり、個人を特定するものではありません。Cookieを無効にされたい場合は、ブラウザの設定からお手続きください。",
  },
  {
    id: "disclosure", num: "06", color: "#00b4d8",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    title: "個人情報の開示・修正・削除",
    content: "お客様ご自身の個人情報の開示・修正・削除をご希望の場合は、下記お問い合わせ先までご連絡ください。ご本人確認のうえ、合理的な期間内に対応いたします。",
  },
  {
    id: "change", num: "07", color: "#6366f1",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    title: "プライバシーポリシーの変更",
    content: "本ポリシーは、法令の改正やサービスの変更に伴い、予告なく改定する場合があります。改定後のポリシーは当サイトに掲載した時点で効力を生じるものとします。",
  },
  {
    id: "contact", num: "08", color: "#2c5fb8",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    title: "お問い合わせ先",
    content: "個人情報の取り扱いに関するご質問・ご相談は、下記までお問い合わせください。",
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero sub="PRIVACY POLICY" title="プライバシーポリシー" crumb="プライバシーポリシー" />

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "48px", alignItems: "start" }} className="privacy-layout">

            {/* ===== 左：目次（sticky） ===== */}
            <div style={{ position: "sticky", top: "100px" }}>
              <p style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-text-muted)", marginBottom: "12px" }}>CONTENTS</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "var(--radius)",
                    background: "#fff", border: "1px solid var(--color-border)",
                    textDecoration: "none", color: "var(--color-text)",
                    fontSize: "13px", fontWeight: 500, transition: "all 0.15s",
                  }} className="privacy-nav-link">
                    <span style={{ flexShrink: 0, width: "24px", height: "24px", background: s.color, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "10px" }}>{s.num}</span>
                    <span style={{ fontSize: "12.5px", lineHeight: 1.4 }}>{s.title}</span>
                  </a>
                ))}
              </nav>

              <div style={{ marginTop: "20px", padding: "16px", background: "var(--color-bg-tint)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--color-text)", display: "block", marginBottom: "4px" }}>制定日</strong>
                2026年5月<br />
                BULLCOM
              </div>
            </div>

            {/* ===== 右：本文 ===== */}
            <div>
              {/* はじめに */}
              <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "28px 32px", marginBottom: "24px", color: "#fff" }}>
                <p style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", marginBottom: "10px" }}>INTRODUCTION</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", lineHeight: 1.9, fontSize: "14.5px" }}>
                  パソコン修理・設定 BULLCOM（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、以下のとおりプライバシーポリシーを定めます。
                </p>
              </div>

              {/* 各セクション */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sections.map((sec) => (
                  <div key={sec.id} id={sec.id} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                    {/* セクションヘッダー */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px 24px", borderBottom: "1px solid var(--color-border)", background: `${sec.color}08` }}>
                      <span style={{ flexShrink: 0, width: "36px", height: "36px", background: sec.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 4px 10px ${sec.color}44` }}>{sec.icon}</span>
                      <div>
                        <span style={{ fontFamily: "var(--font-en)", fontSize: "10px", fontWeight: 700, color: sec.color, letterSpacing: "0.1em" }}>{sec.num}</span>
                        <h2 style={{ fontSize: "16px", margin: 0, color: "var(--color-text)" }}>{sec.title}</h2>
                      </div>
                    </div>

                    {/* セクション本文 */}
                    <div style={{ padding: "20px 24px" }}>
                      <p style={{ color: "var(--color-text-soft)", lineHeight: 1.9, margin: 0, fontSize: "14.5px" }}>{sec.content}</p>

                      {"list" in sec && sec.list && (
                        <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {sec.list.map((item) => (
                            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--color-text-soft)" }}>
                              <svg style={{ flexShrink: 0, marginTop: "3px", color: sec.color }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
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

              <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
                <Link href="/" className="btn btn-outline">トップページへ戻る</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .privacy-nav-link:hover {
          border-color: var(--color-primary) !important;
          background: var(--color-bg-tint) !important;
        }
        @media (max-width: 900px) {
          .privacy-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
