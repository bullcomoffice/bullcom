"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

// ====== 共通コンポーネント ======

const SectionHeader = ({ num, color, title, lead }: { num: string, color: string, title: string, lead: string }) => (
  <div style={{ marginBottom: "28px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
    <div style={{ flexShrink: 0, width: "56px", height: "56px", background: color, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-en)", fontWeight: 900, fontSize: "18px", boxShadow: `0 6px 16px ${color}44` }}>{num}</div>
    <div>
      <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>{title}</h3>
      <p style={{ color: "var(--color-text-soft)", fontSize: "14px", margin: 0 }}>{lead}</p>
    </div>
  </div>
);

const PackCard = ({ title, price, items, accent }: { title: string, price: string, items: string[], accent: string }) => (
  <div style={{ background: "#fff", border: `1.5px solid ${accent}33`, borderRadius: "var(--radius-lg)", padding: "28px 24px", position: "relative", overflow: "hidden", boxShadow: "0 4px 16px rgba(28,60,120,0.06)", transition: "transform 0.18s, box-shadow 0.18s" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: accent }} />
    <h4 style={{ fontSize: "17px", marginBottom: "6px", color: "var(--color-text)" }}>{title}</h4>
    <div style={{ fontFamily: "var(--font-en)", fontSize: "28px", fontWeight: 800, color: accent, marginBottom: "16px", letterSpacing: "-0.02em" }}>
      {price}<small style={{ fontFamily: "var(--font-jp)", fontSize: "12px", color: "var(--color-text-muted)", marginLeft: "4px", fontWeight: 500 }}>税込</small>
    </div>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13.5px", color: "var(--color-text-soft)" }}>
          <svg style={{ flexShrink: 0, marginTop: "2px", color: accent }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const MenuTable = ({ rows, note }: { rows: [string, string, string][], note?: string }) => (
  <div>
    {/* スマホ: カードレイアウト */}
    <div className="menu-card-list">
      {rows.map(([name, desc, price]) => (
        <div key={name} className="menu-card">
          <div className="menu-card__name">{name}</div>
          <div className="menu-card__desc">{desc}</div>
          <div className="menu-card__price">{price}<span>税込</span></div>
        </div>
      ))}
    </div>
    {/* PC: テーブルレイアウト */}
    <div className="menu-table-wrap">
      <table className="price-table" style={{ width: "100%" }}>
        <thead><tr><th>サービス名</th><th>説明</th><th style={{ textAlign: "right" }}>料金（税込）</th></tr></thead>
        <tbody>
          {rows.map(([name, desc, price]) => (
            <tr key={name}><td className="name-cell">{name}</td><td style={{ fontSize: "14px", color: "var(--color-text-soft)" }}>{desc}</td><td className="price-cell">{price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
    {note && <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "12px" }}>{note}</p>}
  </div>
);

// ====== ページ本体 ======

export default function ServicesPage() {
  const [tab, setTab] = useState<"personal" | "business">("personal");

  return (
    <>
      <PageHero sub="SERVICES" title="サービス一覧" crumb="サービス一覧" lead="個人のお客様から法人様まで、幅広く対応しています。" />

      <section>
        <div className="container">

          {/* タブ + 対応機種 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", gap: "4px", padding: "5px", background: "var(--color-bg-tint)", borderRadius: "999px", border: "1px solid var(--color-border)" }}>
              {(["personal", "business"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "14px 36px", borderRadius: "999px", fontWeight: 700, fontSize: "15px",
                  color: tab === t ? "#fff" : "var(--color-text-soft)",
                  background: tab === t ? "linear-gradient(135deg, #3a73d1, #2c5fb8)" : "transparent",
                  boxShadow: tab === t ? "0 4px 12px rgba(44,95,184,0.3)" : "none",
                  transition: "all 0.2s", cursor: "pointer", border: "none",
                }}>
                  {t === "personal" ? "👤 個人のお客様" : "🏢 法人・事業者のお客様"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {["Windows", "Mac", "タブレット", "デスクトップ / ノート"].map((p) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "999px", fontSize: "13px", fontWeight: 600, color: "var(--color-primary-dark)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* ===== 個人タブ ===== */}
          {tab === "personal" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

              {/* 01 出張・リモート */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
                <SectionHeader num="01" color="#3a73d1" title="出張・リモートサポート" lead="「よくわからないから不安…」という方も、ていねいに説明しながら対応します。" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="pack-grid">
                  <PackCard title="出張診断料" price="¥5,500" items={["ご自宅・オフィスへお伺い", "症状の確認・診断", "※持ち込み診断は無料"]} accent="#3a73d1" />
                  <PackCard title="リモートサポート" price="¥11,000 / 年" items={["1台あたり・月3回まで", "年間契約プラン", "遠隔で操作サポート"]} accent="#6366f1" />
                </div>
              </div>

              {/* 02 新規設定 */}
              <div style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)" }}>
                <SectionHeader num="02" color="#2db87a" title="新規パソコン設定" lead="買ったばかりのパソコンを、すぐに使える状態にセットアップします。" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="pack-grid">
                  <PackCard title="新規パソコン設定A" price="¥11,000" items={["開梱・設置・初期設定", "プリンター・ネット接続", "メール設定"]} accent="#2db87a" />
                  <PackCard title="新規パソコン設定B" price="¥16,500" items={["Aプランの全内容", "+ データ移行", "旧PCからの引き継ぎ対応"]} accent="#0d9488" />
                </div>
              </div>

              {/* 03 リカバリー */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
                <SectionHeader num="03" color="#f5820a" title="リカバリーパック" lead="調子が悪くなったパソコンを購入時の状態に戻し、快適に使えるようにします。" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="pack-grid">
                  <PackCard title="リカバリーパックA" price="¥16,500" items={["初期化・初期設定", "Office設定", "フルアップデート"]} accent="#f5820a" />
                  <PackCard title="リカバリーパックB" price="¥22,000" items={["Aプランの全内容", "+ データバックアップ", "復元まで対応"]} accent="#d97706" />
                </div>
              </div>

              {/* 04 個別メニュー */}
              <div style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "40px", border: "1px solid var(--color-border)" }}>
                <SectionHeader num="04" color="#9b59d4" title="個別メニュー" lead="必要な作業だけ、ピンポイントでご依頼いただけます。" />
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {[
                    {
                      label: "ネットワーク", color: "#00b4d8",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12" y2="20.01"/></svg>,
                      items: [
                        ["ネットワークルーター設定", "¥8,800"],
                        ["インターネット・Wi-Fi設定", "¥2,200"],
                        ["ゲーム機ネット設定", "¥5,500"],
                      ],
                    },
                    {
                      label: "機器・ソフト設定", color: "#f5820a",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>,
                      items: [
                        ["メール設定", "¥2,200"],
                        ["プリンター設定", "¥3,300"],
                        ["周辺機器設定", "¥3,300〜"],
                        ["ソフトウェア設定・インストール", "¥3,300〜"],
                      ],
                    },
                    {
                      label: "セキュリティ", color: "#e84a5f",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5z"/></svg>,
                      items: [
                        ["スパム診断・駆除", "¥8,800"],
                        ["ウイルス診断・駆除", "¥8,800"],
                      ],
                    },
                    {
                      label: "データ", color: "#9b59d4",
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>,
                      items: [
                        ["データバックアップ（10GBまで）", "¥5,500"],
                        ["データバックアップ（10GB以上）", "¥8,800"],
                        ["データ移行（10GBまで）", "¥11,000"],
                        ["データ移行（10GB以上）", "¥14,300"],
                      ],
                    },
                  ].map((cat) => (
                    <div key={cat.label} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                      {/* カテゴリヘッダー */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", background: `${cat.color}12`, borderBottom: `2px solid ${cat.color}33` }}>
                        <span style={{ width: "28px", height: "28px", background: cat.color, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{cat.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: "14px", color: cat.color, letterSpacing: "0.05em" }}>{cat.label}</span>
                      </div>
                      {/* アイテム */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                        {cat.items.map(([name, price], i) => (
                          <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: i < cat.items.length - 1 ? "1px solid var(--color-border)" : "none", gap: "12px" }}>
                            <span style={{ fontSize: "14.5px", color: "var(--color-text)" }}>{name}</span>
                            <span style={{ fontFamily: "var(--font-en)", fontWeight: 700, color: cat.color, fontSize: "15px", flexShrink: 0 }}>{price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "16px" }}>※すべて税込価格です。作業内容によって変動する場合は事前にご案内します。</p>
              </div>
            </div>
          )}

          {/* ===== 法人タブ ===== */}
          {tab === "business" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

              {/* 注意書き */}
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "linear-gradient(135deg, #eef4fb, #e4edf9)", border: "1px solid #c5d7f0", borderRadius: "var(--radius-lg)", padding: "20px 24px", marginBottom: "32px" }}>
                <div style={{ flexShrink: 0, width: "40px", height: "40px", background: "var(--color-primary)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 700, margin: "0 0 4px", color: "var(--color-primary-dark)" }}>個人向けメニューの全サービスも法人様にご利用いただけます</p>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", margin: 0 }}>業務のスピードを止めないために、迅速・確実な対応でサポートします。</p>
                </div>
              </div>

              {/* 01 ネットワーク */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
                <SectionHeader num="01" color="#00b4d8" title="法人向けネットワーク" lead="社内のネットワーク環境を整え、業務がスムーズに進む状態をつくります。" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "16px" }} className="pack-grid">
                  <PackCard title="法人ルーター設定" price="¥33,000" items={["法人向けルーター設置", "設定・最適化", "セキュリティ設定含む"]} accent="#00b4d8" />
                  <PackCard title="NAS設定" price="¥22,000" items={["ネットワーク共有ストレージ", "設置・設定・接続確認", "アクセス権限設定"]} accent="#0077a8" />
                </div>
                <MenuTable
                  rows={[
                    ["PCネットワーク設定（5台まで）", "社内LAN・Wi-Fiへの接続設定", "¥22,000"],
                    ["PCネットワーク追加（1台ごと）", "6台目以降の追加設定（1台あたり）", "¥5,500"],
                  ]}
                />
              </div>

              {/* 02 クラウド・セキュリティ */}
              <div style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "40px", border: "1px solid var(--color-border)" }}>
                <SectionHeader num="02" color="#6366f1" title="クラウド・メール・セキュリティ" lead="業務に必要なクラウド・メール・セキュリティ環境の整備をサポートします。" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="pack-grid-3">
                  <PackCard title="クラウドサービス設定" price="¥22,000" items={["OneDrive / Google Drive", "Dropbox のいずれか1サービス", "初期設定・同期確認"]} accent="#6366f1" />
                  <PackCard title="ドメインメール設定" price="¥5,500" items={["独自ドメインのメール設定", "1アカウント対応", "メールソフト接続確認"]} accent="#8b5cf6" />
                  <PackCard title="PCセキュリティ診断" price="¥5,500" items={["PC1台のセキュリティ確認", "診断レポート作成", "対策のご提案"]} accent="#ec4899" />
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "16px" }}>※すべて税込価格です。台数・環境によって別途ご相談となる場合があります。</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: "48px" }}>
            <CtaBanner
              title="料金や作業の詳細は、お気軽にご相談ください。"
              desc="診断・お見積りは無料です。LINE・電話・フォームでお問い合わせいただけます。"
              secondaryLabel="料金一覧を見る"
              secondaryHref="/price"
            />
          </div>
        </div>
      </section>

      <style>{`
        /* テーブル共通スタイル */
        .price-table { border-collapse: collapse; }
        .price-table th { background: var(--color-bg-tint); padding: 12px 16px; font-size: 13px; font-weight: 600; color: var(--color-text-muted); border-bottom: 2px solid var(--color-border); text-align: left; }
        .price-table td { padding: 14px 16px; border-bottom: 1px solid var(--color-border); vertical-align: top; }
        .name-cell { font-weight: 600; font-size: 14px; min-width: 140px; }
        .price-cell { text-align: right; font-weight: 700; color: var(--color-primary); font-family: var(--font-en); font-size: 15px; white-space: nowrap; }

        /* PC: テーブル表示、カード非表示 */
        .menu-card-list { display: none; }
        .menu-table-wrap { display: block; overflow-x: auto; }

        @media (max-width: 760px) {
          .pack-grid { grid-template-columns: 1fr !important; }
          .pack-grid-3 { grid-template-columns: 1fr !important; }
          /* スマホ: カード表示、テーブル非表示 */
          .menu-card-list { display: flex; flex-direction: column; gap: 10px; }
          .menu-table-wrap { display: none; }
          .menu-card { background: var(--color-bg-tint); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; }
          .menu-card__name { font-weight: 700; font-size: 14px; color: var(--color-text); }
          .menu-card__desc { font-size: 13px; color: var(--color-text-soft); line-height: 1.6; }
          .menu-card__price { font-size: 16px; font-weight: 800; color: var(--color-primary); font-family: var(--font-en); margin-top: 4px; }
          .menu-card__price span { font-family: var(--font-jp); font-size: 11px; font-weight: 500; color: var(--color-text-muted); margin-left: 4px; }
        }
      `}</style>
    </>
  );
}
