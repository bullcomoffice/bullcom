"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  compact?: boolean; // TOPページ用のコンパクト版
};

export default function ContactForm({ compact = false }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
    formData.append("subject", "【BULLCOMサイト】お問い合わせが届きました");
    formData.append("from_name", "BULLCOM お問い合わせフォーム");
    formData.append("to", "form@bullcom.jp");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: compact ? "32px 24px" : "48px", textAlign: "center", border: "1px solid var(--color-border)" }}>
        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #2db87a, #1a8a58)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "var(--color-text)" }}>送信が完了しました！</h3>
        <p style={{ color: "var(--color-text-soft)", lineHeight: 1.8, marginBottom: "24px" }}>
          お問い合わせありがとうございます。<br />
          営業時間内に順次ご返信いたします。
        </p>
        <button onClick={() => setStatus("idle")} style={{ background: "var(--color-bg-tint)", border: "1px solid var(--color-border)", color: "var(--color-text)", padding: "10px 24px", borderRadius: "var(--radius)", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}>
          別のお問い合わせをする
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: compact ? "32px 24px" : "48px", display: "grid", gap: "20px", boxShadow: compact ? "none" : "0 24px 48px rgba(0,0,0,0.2)", border: compact ? "1px solid var(--color-border)" : "none" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
        <div className="form-field">
          <label>お名前 <span className="req">必須</span></label>
          <input type="text" name="name" placeholder="山田 太郎" required />
        </div>
        <div className="form-field">
          <label>電話番号 <span className="req">必須</span></label>
          <input type="tel" name="phone" placeholder="090-0000-0000" required />
        </div>
      </div>
      <div className="form-field">
        <label>メールアドレス <span className="opt">任意</span></label>
        <input type="email" name="email" placeholder="example@bullcom.jp" />
      </div>
      <div className="form-field">
        <label>お客様区分 <span className="req">必須</span></label>
        <div className="form-radio-row">
          <label className="form-radio"><input type="radio" name="customer_type" value="個人" defaultChecked />個人</label>
          <label className="form-radio"><input type="radio" name="customer_type" value="法人" />法人</label>
        </div>
      </div>
      <div className="form-field">
        <label>ご相談内容 <span className="req">必須</span></label>
        <textarea name="message" rows={compact ? 4 : 5} placeholder="症状や、お困りの状況をお聞かせください" required />
      </div>

      {status === "error" && (
        <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: "var(--radius)", padding: "12px 16px", color: "#c0392b", fontSize: "14px" }}>
          送信に失敗しました。時間をおいて再度お試しください。
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{ background: status === "sending" ? "#94a3b8" : "linear-gradient(180deg,#3a73d1,#2c5fb8)", color: "#fff", padding: "16px 32px", borderRadius: "var(--radius)", fontSize: "16px", fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer", boxShadow: status === "sending" ? "none" : "0 6px 18px rgba(44,95,184,0.3)", border: "none", transition: "all 0.2s" }}
      >
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
      <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textAlign: "center", margin: 0 }}>
        ※ 送信内容は <Link href="/privacy" style={{ color: "var(--color-primary)" }}>プライバシーポリシー</Link> に基づいて取り扱います
      </p>
    </form>
  );
}
