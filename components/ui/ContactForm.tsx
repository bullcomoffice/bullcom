"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.1)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    borderRadius: "var(--radius)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "6px",
    fontWeight: 600,
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-lg)", padding: "36px" }}>
      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
          <h3 style={{ color: "#fff", fontSize: "20px", marginBottom: "8px" }}>送信完了しました</h3>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
            お問い合わせありがとうございます。<br />営業時間内に順次ご返信いたします。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input type="hidden" name="access_key" value="35b47419-5d55-4b8c-89d1-60e6adde5936" />
          <input type="hidden" name="subject" value="【BULLCOM】お問い合わせが届きました" />
          <input type="hidden" name="from_name" value="BULLCOM お問い合わせフォーム" />
          <input type="hidden" name="redirect" value="false" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
            <div>
              <label style={labelStyle}>お名前 <span style={{ color: "#f87171" }}>*</span></label>
              <input type="text" name="name" required placeholder="山田 太郎" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>電話番号</label>
              <input type="tel" name="phone" placeholder="078-000-0000" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>メールアドレス <span style={{ color: "#f87171" }}>*</span></label>
            <input type="email" name="email" required placeholder="example@email.com" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>お問い合わせ種別</label>
            <select name="category" style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">選択してください</option>
              <option value="パソコン修理">パソコン修理</option>
              <option value="パソコン設定・セットアップ">パソコン設定・セットアップ</option>
              <option value="データ復旧・バックアップ">データ復旧・バックアップ</option>
              <option value="ウイルス・セキュリティ対策">ウイルス・セキュリティ対策</option>
              <option value="法人・オフィスサポート">法人・オフィスサポート</option>
              <option value="出張サポート">出張サポート</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>お問い合わせ内容 <span style={{ color: "#f87171" }}>*</span></label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="症状や状況をできるだけ詳しくご記入ください"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              width: "100%",
              padding: "15px",
              background: status === "sending" ? "rgba(255,255,255,0.3)" : "linear-gradient(135deg, #f5820a, #c96200)",
              border: "none",
              borderRadius: "var(--radius)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {status === "sending" ? "送信中..." : "送信する"}
          </button>

          {status === "error" && (
            <p style={{ color: "#f87171", textAlign: "center", fontSize: "14px" }}>
              送信に失敗しました。お手数ですがお電話またはLINEでご連絡ください。
            </p>
          )}
        </form>
      )}
    </div>
  );
}
