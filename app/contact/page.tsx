import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "BULLCOMへのお問い合わせ。電話・LINE・フォームからご連絡ください。",
};

export default function ContactPage() {
  return (
    <>
      <PageHero sub="CONTACT" title="お問い合わせ" crumb="お問い合わせ" lead="電話・LINE・フォームの3つの方法でお問い合わせいただけます。お急ぎの場合はお電話またはLINEにてご連絡ください。" />

      <section>
        <div className="container container-narrow">
          {/* 3択カード */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "56px" }} className="contact-opts">
            {/* 電話 */}
            <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "32px 28px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg-tint)", color: "var(--color-primary)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>電話で相談</h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", marginBottom: "20px" }}>直接スタッフがご対応いたします。</p>
              <div style={{ fontFamily: "var(--font-en)", fontSize: "28px", fontWeight: 700, color: "var(--color-primary-dark)", lineHeight: 1, marginBottom: "6px" }}>078-912-2656</div>
              <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>受付 9:00〜19:00</div>
              <a href="tel:0789122656" className="btn btn-outline" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>電話をかける</a>
            </div>

            {/* LINE */}
            <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "32px 28px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#e6f9ed", color: "#06c755" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 2.8 1.8 5.3 4.6 6.7-.1.6-.6 2.4-.7 2.7-.1.4.2.4.4.3.2-.1 2.6-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.3S17.5 2 12 2z"/></svg>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>LINEで相談</h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", marginBottom: "20px" }}>写真を送るだけで概算のご案内ができます。</p>
              <div style={{ fontFamily: "var(--font-en)", fontSize: "18px", fontWeight: 700, color: "#06c755", lineHeight: 1, marginBottom: "6px" }}>@bullcom</div>
              <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>24時間受付・返信は営業時間内</div>
              <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>LINEで相談する</a>
            </div>

            {/* フォーム */}
            <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "32px 28px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff4e0", color: "#d68a00" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>フォームで相談</h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", marginBottom: "20px" }}>下記フォームから詳細をお送りいただけます。</p>
              <div style={{ fontFamily: "var(--font-en)", fontSize: "18px", fontWeight: 700, color: "var(--color-text)", lineHeight: 1, marginBottom: "6px" }}>24時間 受付</div>
              <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>営業時間内に順次返信</div>
              <a href="#contact-form" className="btn btn-outline" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>フォームへ移動</a>
            </div>
          </div>

          {/* フォームタイトル */}
          <div id="contact-form" style={{ marginBottom: "32px", textAlign: "center" }}>
            <span className="section-head__eyebrow">FORM</span>
            <h2 style={{ fontSize: "28px" }}>お問い合わせフォーム</h2>
            <p style={{ color: "var(--color-text-soft)", marginTop: "12px" }}>必要事項をご入力のうえ、送信ボタンを押してください。</p>
          </div>

          {/* フォーム */}
          <form style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "48px", display: "grid", gap: "20px", boxShadow: "var(--shadow-sm)" }} className="contact-form">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
              <div className="form-field"><label>お名前 <span className="req">必須</span></label><input type="text" placeholder="山田 太郎" required /></div>
              <div className="form-field"><label>電話番号 <span className="req">必須</span></label><input type="tel" placeholder="090-0000-0000" required /></div>
            </div>
            <div className="form-field"><label>メールアドレス <span className="opt">任意</span></label><input type="email" placeholder="example@bullcom.jp" /></div>
            <div className="form-field">
              <label>お客様区分 <span className="req">必須</span></label>
              <div className="form-radio-row">
                <label className="form-radio"><input type="radio" name="type" defaultChecked />個人</label>
                <label className="form-radio"><input type="radio" name="type" />法人</label>
              </div>
            </div>
            <div className="form-field"><label>ご相談内容 <span className="req">必須</span></label><textarea rows={6} placeholder="症状や、お困りの状況をお聞かせください" required /></div>
            <button type="submit" style={{ background: "linear-gradient(180deg,#3a73d1,#2c5fb8)", color: "#fff", padding: "16px 32px", borderRadius: "var(--radius)", fontSize: "16px", fontWeight: 700, cursor: "pointer", marginTop: "12px", boxShadow: "0 6px 18px rgba(44,95,184,0.3)" }}>
              送信する
            </button>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textAlign: "center", margin: 0 }}>
              ※ 送信内容は <Link href="/privacy" style={{ color: "var(--color-primary)" }}>プライバシーポリシー</Link> に基づいて取り扱います
            </p>
          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) { .contact-opts { grid-template-columns: 1fr !important; } .form-row { grid-template-columns: 1fr !important; } .contact-form { padding: 28px 20px !important; } }
      `}</style>
    </>
  );
}
