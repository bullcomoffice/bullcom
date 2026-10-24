"use client";

import { useState } from "react";
import { readVisitSource } from "@/lib/visit-source";

// 問い合わせ内容へのURL混入チェック（サーバー側と同じ判定。送信前に即時フィードバックするため）
// 「gmail.com」「office.com」やメールアドレスは正規の相談でも書かれるので拒否しない
const URL_PATTERN = /https?:\/\/|www\.\S/i;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("送信に失敗しました。お手数ですがお電話またはLINEでご連絡ください。");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // 送信前チェック（本体の防御はサーバー側。ここは正規ユーザーへの即時フィードバック用）
    const message = String(data.get("お問い合わせ内容") || "");
    if (URL_PATTERN.test(message)) {
      setErrorMsg("お問い合わせ内容にURLは含めないでください。");
      setStatus("error");
      return;
    }

    // どのページから来た人かをメールに載せる（lib/visit-source.ts 参照）。
    // Worker は「_」で始まらない項目をすべてメールの表に入れるので、末尾に足すだけで表の最後に載る
    const source = readVisitSource();
    if (source) {
      data.append("最初に見たページ", source.landing);
      data.append("流入元", source.referrer || "直接・不明");
      data.append("直前に見たページ", source.last || "なし");
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        // GA4 コンバージョン計測（お問い合わせ送信完了）
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.("event", "generate_lead", {
          form_name: "contact_form",
          category: String(data.get("お問い合わせ種別") || "未選択"),
        });
      } else {
        setErrorMsg(json.message || "送信に失敗しました。お手数ですがお電話またはLINEでご連絡ください。");
        setStatus("error");
      }
    } catch {
      setErrorMsg("送信に失敗しました。お手数ですがお電話またはLINEでご連絡ください。");
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
            お問い合わせありがとうございます。<br />
            確認メールをお送りしましたので、ご確認ください。<br />営業時間内に順次ご返信いたします。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* ハニーポット（bot対策）。人間には見えないので入力されない */}
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
            <div>
              <label style={labelStyle}>お名前 <span style={{ color: "#f87171" }}>*</span></label>
              <input type="text" name="お名前" required placeholder="山田 太郎" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>電話番号</label>
              <input
                type="tel"
                name="電話番号"
                placeholder="078-000-0000"
                pattern="[0０][0-9０-９\-ー－\s()（）]*"
                title="0から始まる電話番号をご入力ください"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>メールアドレス <span style={{ color: "#f87171" }}>*</span></label>
            <input type="email" name="メールアドレス" required placeholder="example@email.com" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>お問い合わせ種別</label>
            {/* 選択肢の一覧は OS の白い背景で開くため、文字色を白のままにすると読めない（Windows の Chrome など） */}
            <select name="お問い合わせ種別" style={{ ...inputStyle, cursor: "pointer" }}>
              {[
                ["", "選択してください"],
                ["パソコン修理", "パソコン修理"],
                ["パソコン設定・セットアップ", "パソコン設定・セットアップ"],
                ["データ復旧・バックアップ", "データ復旧・バックアップ"],
                ["ウイルス・セキュリティ対策", "ウイルス・セキュリティ対策"],
                ["法人・オフィスサポート", "法人・オフィスサポート"],
                ["出張サポート", "出張サポート"],
                ["その他", "その他"],
              ].map(([value, label]) => (
                <option key={value} value={value} style={{ color: "#1a2332", background: "#fff" }}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>お問い合わせ内容 <span style={{ color: "#f87171" }}>*</span></label>
            <textarea
              name="お問い合わせ内容"
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
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
