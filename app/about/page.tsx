import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

export const metadata: Metadata = {
  title: "会社概要",
  description: "BULLCOMの会社概要・アクセス情報。神戸・明石のパソコン修理・設定専門店。",
};

const infoRows = [
  ["会社名", "BULLCOM（ブルコム）"],
  ["代表者", "芦原 陽右"],
  ["所在地", "〒651-2113\n兵庫県神戸市西区伊川谷町846-10 ギャラリエ1F"],
  ["創業", "2002年7月"],
  ["TEL", "078-912-2656"],
  ["FAX", "078-939-6660"],
  ["Mail", "info@bullcom.jp"],
  ["事務所営業時間", "9:30〜15:30"],
  ["連絡受付時間", "9:00〜19:00"],
  ["定休日", "不定休"],
  ["代金支払方法", "現金・銀行振込・クレジット・代金引換"],
  ["振込について", "当社よりお客様へご連絡します"],
  ["保証について", "修理完了後の返金は受付しておりません"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero sub="ABOUT US" title="会社概要" crumb="会社概要" lead="2002年の創業から、神戸・明石を中心に地域のパソコンの困りごとに寄り添ってきました。" />

      {/* 会社情報テーブル */}
      <section>
        <div className="container container-narrow">
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <tbody>
              {infoRows.map(([th, td], i) => (
                <tr key={th}>
                  <th style={{ padding: "18px 24px", textAlign: "left", borderBottom: i < infoRows.length - 1 ? "1px solid var(--color-border)" : "none", fontSize: "15px", background: "var(--color-bg-tint)", width: "200px", fontWeight: 600, color: "var(--color-primary-dark)", verticalAlign: "top" }}>{th}</th>
                  <td style={{ padding: "18px 24px", textAlign: "left", borderBottom: i < infoRows.length - 1 ? "1px solid var(--color-border)" : "none", fontSize: "15px" }}>
                    {td.split("\n").map((line, j) => <span key={j}>{line}{j < td.split("\n").length - 1 && <br />}</span>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 代表メッセージ */}
      <section className="bg-soft">
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">MESSAGE</span>
            <h2>社名の由来・代表メッセージ</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "40px", alignItems: "start", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "40px" }} className="message-block">
            <div style={{ aspectRatio: "1", borderRadius: "50%", background: "repeating-linear-gradient(135deg, #e8eef7 0 12px, #dee6f3 12px 24px)", position: "relative", overflow: "hidden" }}>
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',monospace", fontSize: "12px", color: "var(--color-text-muted)", letterSpacing: "0.15em" }}>代表写真</span>
            </div>
            <div>
              <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>「BULL」のように、強気で上向きに。</h3>
              <p style={{ color: "var(--color-text-soft)", lineHeight: 1.95 }}>
                BULLCOMという名前は、ロゴのブルドッグにちなんだ部分もありますが、本来の由来は「BULL」という金融経済用語から名付けました。BULLとは雄牛を表し、その角が上に向かって突き上がる姿、下から力強く突き上げる姿から「強気で上向き」を意味します。
              </p>
              <p style={{ color: "var(--color-text-soft)", lineHeight: 1.95 }}>
                会社の名に恥じぬよう精進してまいりますので、末永くよろしくお願い申し上げます。
              </p>
              <span style={{ display: "block", marginTop: "16px", fontWeight: 700, color: "var(--color-text)" }}>代表 ・ 芦原 陽右</span>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .message-block { grid-template-columns: 1fr !important; padding: 28px 20px !important; } }`}</style>
      </section>

      {/* アクセス */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">ACCESS</span>
            <h2>アクセス</h2>
            <p className="section-head__lead">〒651-2113 兵庫県神戸市西区伊川谷町846-10 ギャラリエ1F</p>
          </div>
          <div style={{ aspectRatio: "16/8", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.8!2d135.0!3d34.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM5JzAwLjAiTiAxMzXCsDAwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BULLCOMアクセスマップ"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tight">
        <div className="container">
          <CtaBanner
            title="お困りごとは、お気軽にご相談ください。"
            desc="電話・LINE・フォーム、いずれでもお問い合わせいただけます。"
          />
        </div>
      </section>
    </>
  );
}
