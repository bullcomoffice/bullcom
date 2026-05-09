import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

export const metadata: Metadata = {
  title: "会社概要｜パソコン修理 BULLCOM 神戸・明石",
  description: "BULLCOMの会社概要・アクセス情報。神戸・明石のパソコン修理・設定専門店。",
};

export default function AboutPage() {
  return (
    <>
      <PageHero sub="ABOUT US" title="会社概要" crumb="会社概要" lead="2002年の創業から、神戸・明石を中心に地域のパソコンの困りごとに寄り添ってきました。" />

      {/* ===== 実績バー ===== */}
      <section style={{ background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)", padding: "48px 0", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderLeft: "1px solid rgba(255,255,255,0.15)" }} className="stats-grid">
            {[
              { num: "2002", unit: "年", label: "創業" },
              { num: "24", unit: "年以上", label: "の実績" },
              { num: "神戸・明石", unit: "", label: "を中心に対応" },
              { num: "診断料", unit: "¥0", label: "持ち込み無料" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "16px 32px", borderRight: "1px solid rgba(255,255,255,0.15)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-en)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.num}<span style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 600, marginLeft: "2px" }}>{s.unit}</span>
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "6px", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* ===== 会社情報 ===== */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* 透かし */}
        <div aria-hidden="true" style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: "800px", height: "800px",
          backgroundImage: "url('/logo-watermark.png')",
          backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
          opacity: 0.06, pointerEvents: "none", zIndex: 0,
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }} className="info-layout">

            {/* 左：基本情報 */}
            <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
              <div style={{ padding: "20px 28px", background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", color: "#fff" }}>
                <h2 style={{ fontSize: "18px", color: "#fff", margin: 0 }}>基本情報</h2>
              </div>
              <div>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, label: "会社名", value: "BULLCOM（ブルコム）" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "代表者", value: "芦原 陽右" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "所在地", value: "〒651-2113\n兵庫県神戸市西区伊川谷町有瀬846-10 ギャラリエ1F" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "創業", value: "2002年7月" },
                ].map(({ icon, label, value }, i, arr) => (
                  <div key={label} style={{ display: "flex", gap: "16px", padding: "16px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, width: "32px", height: "32px", background: "var(--color-bg-tint)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", marginTop: "2px" }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "3px" }}>{label}</div>
                      <div style={{ fontSize: "15px", color: "var(--color-text)", lineHeight: 1.6 }}>
                        {value.split("\n").map((line, j) => <span key={j}>{line}{j < value.split("\n").length - 1 && <br />}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右：連絡先 + 営業情報 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* 連絡先 */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
                <div style={{ padding: "20px 28px", background: "linear-gradient(135deg, #2db87a, #1a8a58)", color: "#fff" }}>
                  <h2 style={{ fontSize: "18px", color: "#fff", margin: 0 }}>連絡先</h2>
                </div>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/></svg>, label: "TEL", value: "078-912-2656", href: "tel:0789122656" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>, label: "FAX", value: "078-939-6660", href: null },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Mail", value: "info@bullcom.jp", href: null },
                ].map(({ icon, label, value, href }, i, arr) => (
                  <div key={label} style={{ display: "flex", gap: "16px", padding: "14px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none", alignItems: "center" }}>
                    <div style={{ flexShrink: 0, width: "32px", height: "32px", background: "rgba(45,184,122,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2db87a" }}>{icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "2px" }}>{label}</div>
                      {href ? <a href={href} style={{ fontSize: "15px", color: "var(--color-primary)", fontWeight: 600 }}>{value}</a> : <span style={{ fontSize: "15px" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* 営業時間 */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
                <div style={{ padding: "20px 28px", background: "linear-gradient(135deg, #f5820a, #c96200)", color: "#fff" }}>
                  <h2 style={{ fontSize: "18px", color: "#fff", margin: 0 }}>営業時間・支払方法</h2>
                </div>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "事務所営業時間", value: "9:30〜15:30", color: "#f5820a" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07"/><circle cx="12" cy="12" r="10"/></svg>, label: "連絡受付時間", value: "9:00〜19:00", color: "#f5820a" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>, label: "定休日", value: "不定休", color: "#f5820a" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, label: "代金支払方法", value: "現金・銀行振込・クレジット・代金引換", color: "#f5820a" },
                ].map(({ icon, label, value, color }, i, arr) => (
                  <div key={label} style={{ display: "flex", gap: "16px", padding: "14px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, width: "32px", height: "32px", background: "rgba(245,130,10,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "2px" }}>{label}</div>
                      <div style={{ fontSize: "14.5px", color: "var(--color-text)" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .info-layout { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ===== 代表メッセージ ===== */}
      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">MESSAGE</span>
            <h2>社名の由来・代表メッセージ</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "48px", alignItems: "start", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "48px", boxShadow: "0 4px 16px rgba(28,60,120,0.06)" }} className="message-block">
            {/* ロゴ */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: "var(--color-bg-tint)", border: "4px solid var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Image src="/logo-backclear.png" alt="BULLCOMロゴ" width={180} height={180} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: "16px" }}>BULLCOM</div>
              </div>
              {/* SNS */}
              <div style={{ display: "flex", gap: "10px" }}>
                <a href="#" style={{ width: "36px", height: "36px", background: "var(--color-bg-tint)", border: "1px solid var(--color-border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.7 1.7 4.8 4.8.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.1-1.6 4.7-4.8 4.8-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1C4 21.4 2.4 19.8 2.3 16.7 2.2 15.5 2.2 15.1 2.2 12s0-3.6.1-4.8C2.4 4.1 4 2.5 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-2.2.1-3.2 1.1-3.3 3.3C3.8 8.5 3.8 8.8 3.8 12s0 3.5.1 4.8c.1 2.2 1.1 3.2 3.3 3.3 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c2.2-.1 3.2-1.1 3.3-3.3.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-2.2-1.1-3.2-3.3-3.3C15.5 4 15.2 4 12 4zm0 3.1A4.9 4.9 0 1 1 12 17 4.9 4.9 0 0 1 12 7.1zm0 8a3.1 3.1 0 1 0 0-6.2A3.1 3.1 0 0 0 12 15.1zm4.9-8.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg>
                </a>
                <a href="#" style={{ width: "36px", height: "36px", background: "var(--color-bg-tint)", border: "1px solid var(--color-border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            <div>
              {/* 引用装飾 */}
              <div style={{ position: "relative", marginBottom: "24px" }}>
                <div style={{ fontSize: "60px", fontFamily: "Georgia,serif", color: "var(--color-primary-light)", lineHeight: 1, position: "absolute", top: "-10px", left: "-8px", opacity: 0.4 }}>"</div>
                <h3 style={{ fontSize: "22px", paddingLeft: "28px", lineHeight: 1.4 }}>「BULL」のように、強気で上向きに。</h3>
              </div>
              <p style={{ color: "var(--color-text-soft)", lineHeight: 2, marginBottom: "16px" }}>
                BULLCOMという名前は、ロゴのブルドッグにちなんだ部分もありますが、本来の由来は「BULL」という金融経済用語から名付けました。BULLとは雄牛を表し、その角が上に向かって突き上がる姿、下から力強く突き上げる姿から<strong>「強気で上向き」</strong>を意味します。
              </p>
              <p style={{ color: "var(--color-text-soft)", lineHeight: 2, marginBottom: "28px" }}>
                会社の名に恥じぬよう精進してまいりますので、末永くよろしくお願い申し上げます。
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "20px", borderTop: "1px solid var(--color-border)" }}>
                <div style={{ width: "2px", height: "32px", background: "var(--color-primary)", borderRadius: "2px" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "16px" }}>芦原 陽右</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>BULLCOM 代表</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .message-block { grid-template-columns: 1fr !important; padding: 28px 20px !important; } }`}</style>
      </section>

      {/* ===== アクセス ===== */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">ACCESS</span>
            <h2>アクセス</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "start" }} className="access-layout">
            {/* マップ */}
            <div style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", overflow: "hidden", aspectRatio: "16/9" }}>
              <iframe
                src="https://maps.google.com/maps?q=%E5%85%B5%E5%BA%AB%E7%9C%8C%E7%A5%9E%E6%88%B8%E5%B8%82%E8%A5%BF%E5%8C%BA%E4%BC%8A%E5%B7%9D%E8%B0%B7%E7%94%BA%E6%9C%89%E7%80%AC846-10&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BULLCOMアクセスマップ"
              />
            </div>
            {/* 住所・連絡先 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "24px", border: "1px solid var(--color-border)" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "16px", color: "var(--color-primary-dark)" }}>〒651-2113</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.8, margin: "0 0 16px", color: "var(--color-text)" }}>兵庫県神戸市西区<br />伊川谷町有瀬846-10<br />ギャラリエ1F</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--color-text-soft)" }}>
                  <span>📞 <a href="tel:0789122656" style={{ color: "var(--color-primary)", fontWeight: 600 }}>078-912-2656</a></span>
                  <span>🕐 事務所: 9:30〜15:30</span>
                  <span>📱 連絡受付: 9:00〜19:00</span>
                  <span>📅 定休日: 不定休</span>
                </div>
              </div>
              <a href="https://maps.google.com/?q=兵庫県神戸市西区伊川谷町有瀬846-10+ギャラリエ1F" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--color-primary)", color: "#fff", padding: "14px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Google Mapsで開く
              </a>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .access-layout { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ===== CTA ===== */}
      <section className="tight bg-soft">
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
