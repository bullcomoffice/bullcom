import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "BULLCOMへのお問い合わせ。電話・LINE・フォームからご連絡ください。",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        sub="CONTACT"
        title="お問い合わせ"
        crumb="お問い合わせ"
        lead="電話・LINE・フォームの3つの方法でお問い合わせいただけます。"
      />

      {/* ===== 3つの連絡方法 ===== */}
      <section>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="contact-opts">

            {/* 電話 */}
            <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "36px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", right: "-30px", top: "-30px", width: "150px", height: "150px", background: "radial-gradient(closest-side, rgba(255,255,255,0.1), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ width: "64px", height: "64px", margin: "0 auto 20px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "6px", color: "#fff" }}>電話で相談</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>直接スタッフがご対応します</p>
              <div style={{ fontFamily: "var(--font-en)", fontSize: "26px", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: "6px" }}>078-912-2656</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "20px" }}>受付 9:00〜19:00</div>
              <a href="tel:0789122656" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", padding: "12px 20px", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                電話をかける
              </a>
            </div>

            {/* LINE */}
            <div style={{ background: "linear-gradient(135deg, #06c755, #02a347)", borderRadius: "var(--radius-lg)", padding: "36px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", right: "-30px", top: "-30px", width: "150px", height: "150px", background: "radial-gradient(closest-side, rgba(255,255,255,0.1), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ width: "64px", height: "64px", margin: "0 auto 20px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 2.8 1.8 5.3 4.6 6.7-.1.6-.6 2.4-.7 2.7-.1.4.2.4.4.3.2-.1 2.6-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.3S17.5 2 12 2z"/></svg>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "6px", color: "#fff" }}>LINEで相談</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", marginBottom: "20px" }}>写真を送るだけで無料診断</p>
              <div style={{ fontFamily: "var(--font-en)", fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: "6px" }}>@bullcom</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>24時間受付・返信は営業時間内</div>
              <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 20px", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 2.8 1.8 5.3 4.6 6.7-.1.6-.6 2.4-.7 2.7-.1.4.2.4.4.3.2-.1 2.6-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.3S17.5 2 12 2z"/></svg>
                LINEで相談する
              </a>
            </div>

            {/* フォーム */}
            <div style={{ background: "linear-gradient(135deg, #f5820a, #c96200)", borderRadius: "var(--radius-lg)", padding: "36px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", right: "-30px", top: "-30px", width: "150px", height: "150px", background: "radial-gradient(closest-side, rgba(255,255,255,0.1), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ width: "64px", height: "64px", margin: "0 auto 20px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "6px", color: "#fff" }}>フォームで相談</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", marginBottom: "20px" }}>内容を詳しく伝えたい場合に</p>
              <div style={{ fontFamily: "var(--font-en)", fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: "6px" }}>24時間</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>受付・営業時間内に順次返信</div>
              <a href="#contact-form" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", padding: "12px 20px", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                フォームへ移動
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== フォームセクション ===== */}
      <section id="contact-form" style={{ background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", left: "-100px", bottom: "-100px", width: "400px", height: "400px", background: "radial-gradient(closest-side, rgba(100,149,237,0.2), transparent)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "56px", alignItems: "start" }} className="form-layout">

            {/* 左：案内 */}
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: "12px" }}>CONTACT FORM</span>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#fff", marginBottom: "16px" }}>お問い合わせ<br />フォーム</h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14.5px", lineHeight: 1.85, marginBottom: "32px" }}>
                必要事項をご入力のうえ、送信ボタンを押してください。営業時間内に順次ご返信いたします。
              </p>

              {/* 注意事項 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: "⏰", text: "返信目安：翌営業日以内" },
                  { icon: "📞", text: "お急ぎの場合はお電話ください" },
                  { icon: "🔒", text: "入力内容はSSLで暗号化されます" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius)", fontSize: "13.5px", color: "rgba(255,255,255,0.85)" }}>
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* よくある質問リンク */}
              <div style={{ marginTop: "28px", padding: "16px 20px", background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "10px" }}>送信前にご確認ください</p>
                <Link href="/faq" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#93c5fd", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  よくある質問を見る →
                </Link>
              </div>
            </div>

            {/* 右：フォーム */}
            <ContactForm />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .contact-opts { grid-template-columns: 1fr !important; }
          .form-layout { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
