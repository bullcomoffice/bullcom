"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

const PriceTable = ({ headers, rows, note }: { headers: string[], rows: string[][], note?: string }) => (
  <div style={{ overflowX: "auto" }}>
    <table className="price-table" style={{ width: "100%" }}>
      <thead>
        <tr>{headers.map((h, i) => <th key={i} style={i === headers.length - 1 ? { textAlign: "right" } : {}}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className={j === 0 ? "name-cell" : j === row.length - 1 ? "price-cell" : ""}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {note && <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "12px" }}>{note}</p>}
  </div>
);

const SectionTitle = ({ num, title }: { num: string, title: string }) => (
  <h3 style={{ fontSize: "22px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
    <span style={{ fontFamily: "var(--font-en)", fontSize: "13px", color: "var(--color-primary)", background: "var(--color-bg-tint)", padding: "4px 10px", borderRadius: "4px", fontWeight: 700 }}>{num}</span>
    {title}
  </h3>
);

export default function ServicesPage() {
  const [tab, setTab] = useState<"personal" | "business">("personal");

  return (
    <>
      <PageHero sub="SERVICES" title="サービス一覧" crumb="サービス一覧" lead="個人のお客様から法人様まで、幅広く対応しています。お客様区分でメニューを切り替えてご覧ください。" />

      <section>
        <div className="container">
          {/* タブ */}
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", gap: "4px", padding: "4px", background: "var(--color-bg-tint)", borderRadius: "999px", marginBottom: "32px", border: "1px solid var(--color-border)" }}>
              {(["personal", "business"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "12px 28px", borderRadius: "999px", fontWeight: 600, fontSize: "15px",
                  color: tab === t ? "var(--color-primary-dark)" : "var(--color-text-soft)",
                  background: tab === t ? "#fff" : "transparent",
                  boxShadow: tab === t ? "0 2px 8px rgba(28,60,120,0.1)" : "none",
                  transition: "all 0.15s", cursor: "pointer", border: "none",
                }}>
                  {t === "personal" ? "個人のお客様" : "法人・事業者のお客様"}
                </button>
              ))}
            </div>
          </div>

          {/* 対応機種 */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", maxWidth: "720px", margin: "0 auto 40px", justifyContent: "center", padding: "20px", background: "var(--color-bg-soft)", borderRadius: "var(--radius)" }}>
            <strong style={{ fontSize: "13px", color: "var(--color-text)", alignSelf: "center" }}>対応機種:</strong>
            {["Windows", "Mac", "タブレット", "デスクトップ / ノート"].map((p) => (
              <span key={p} style={{ padding: "6px 14px", background: "#fff", border: "1px solid var(--color-border)", borderRadius: "999px", fontSize: "13px", fontWeight: 600, color: "var(--color-primary-dark)" }}>{p}</span>
            ))}
          </div>

          {/* 個人タブ */}
          {tab === "personal" && (
            <div>
              <div style={{ marginBottom: "56px" }}>
                <SectionTitle num="01" title="出張・リモートサポート" />
                <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }}>「よくわからないから不安…」という方も、ていねいに説明しながら対応します。</p>
                <PriceTable
                  headers={["サービス名", "説明", "料金（税込）"]}
                  rows={[
                    ["出張診断料", "ご自宅・オフィスへお伺いし、症状を確認します", "¥5,500"],
                    ["リモートサポート", "1台あたり・月3回まで（年間契約）", "¥11,000 / 年"],
                  ]}
                  note="※持ち込みの診断料は無料です。"
                />
              </div>

              <div style={{ marginBottom: "56px" }}>
                <SectionTitle num="02" title="新規パソコン設定" />
                <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }}>買ったばかりのパソコンを、すぐに使える状態にセットアップします。</p>
                <PriceTable
                  headers={["サービス名", "内容", "料金（税込）"]}
                  rows={[
                    ["新規パソコン設定A", "開梱・設置・初期設定・プリンター・ネット・メール設定", "¥11,000"],
                    ["新規パソコン設定B", "上記＋データ移行", "¥16,500"],
                  ]}
                />
              </div>

              <div style={{ marginBottom: "56px" }}>
                <SectionTitle num="03" title="リカバリーパック" />
                <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }}>調子が悪くなったパソコンを、購入時の状態に戻して快適に使えるようにします。</p>
                <PriceTable
                  headers={["サービス名", "内容", "料金（税込）"]}
                  rows={[
                    ["リカバリーパックA", "初期化・初期設定・Office設定・フルアップデート", "¥16,500"],
                    ["リカバリーパックB", "上記＋データバックアップ及び復元", "¥22,000"],
                  ]}
                />
              </div>

              <div style={{ marginBottom: "56px" }}>
                <SectionTitle num="04" title="個別メニュー（ネットワーク・設定・データ）" />
                <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }}>必要な作業だけ、ピンポイントでご依頼いただけます。</p>
                <PriceTable
                  headers={["サービス名", "説明", "料金（税込）"]}
                  rows={[
                    ["ネットワークルーター設定", "ルーターの設置・設定対応", "¥8,800"],
                    ["インターネット・Wi-Fi設定", "接続設定・速度改善など", "¥2,200"],
                    ["メール設定", "メールソフトの設定・移行", "¥2,200"],
                    ["ゲーム機ネット設定", "ゲーム機のネット接続設定", "¥5,500"],
                    ["プリンター設定", "プリンターの接続・設定", "¥3,300"],
                    ["周辺機器設定", "機器により価格変動あり", "¥3,300〜"],
                    ["ソフトウェア設定・インストール", "内容によって価格変動あり", "¥3,300〜"],
                    ["スパム診断・駆除", "迷惑メール・スパムの対処", "¥8,800"],
                    ["ウイルス診断・駆除", "ウイルス感染の確認と除去", "¥8,800"],
                    ["データバックアップ（10GBまで）", "大切なデータを安全に保存", "¥5,500"],
                    ["データバックアップ（10GB以上）", "大容量データのバックアップ", "¥8,800"],
                    ["データ移行（10GBまで）", "バックアップ及び復元", "¥11,000"],
                    ["データ移行（10GB以上）", "バックアップ及び復元", "¥14,300"],
                  ]}
                  note="※すべて税込価格です。作業内容によって変動する場合は事前にご案内します。"
                />
              </div>
            </div>
          )}

          {/* 法人タブ */}
          {tab === "business" && (
            <div>
              <div style={{ background: "#fff", borderLeft: "4px solid var(--color-primary)", padding: "18px 24px", borderRadius: "4px", marginBottom: "32px", fontSize: "14.5px", boxShadow: "var(--shadow-sm)" }}>
                業務のスピードを止めないために。迅速・確実な対応でサポートします。<br />
                <strong>※個人向けメニューの全サービスも法人様にご利用いただけます。</strong>
              </div>

              <div style={{ marginBottom: "56px" }}>
                <SectionTitle num="01" title="法人向けネットワーク" />
                <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }}>社内のネットワーク環境を整え、業務がスムーズに進む状態をつくります。</p>
                <PriceTable
                  headers={["サービス名", "説明", "料金（税込）"]}
                  rows={[
                    ["法人ルーター設定", "法人向けルーターの設置・設定・最適化", "¥33,000"],
                    ["PCネットワーク設定（5台まで）", "社内LAN・Wi-Fiへの接続設定（5台まで）", "¥22,000"],
                    ["PCネットワーク追加（1台ごと）", "6台目以降の追加設定（1台あたり）", "¥5,500"],
                    ["NAS設定", "ネットワーク共有ストレージの設置・設定", "¥22,000"],
                  ]}
                />
              </div>

              <div style={{ marginBottom: "56px" }}>
                <SectionTitle num="02" title="クラウド・メール・セキュリティ" />
                <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }}>業務に必要なクラウド・メール・セキュリティ環境の整備をサポートします。</p>
                <PriceTable
                  headers={["サービス名", "説明", "料金（税込）"]}
                  rows={[
                    ["クラウドサービス設定", "OneDrive / Google Drive / Dropbox のいずれか1サービス", "¥22,000"],
                    ["ドメインメール設定", "独自ドメインのメール設定（1アカウント）", "¥5,500"],
                    ["PCセキュリティ診断", "PC1台のセキュリティ状態の確認・レポート", "¥5,500"],
                  ]}
                  note="※すべて税込価格です。台数・環境によって別途ご相談となる場合があります。"
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: "56px" }}>
            <CtaBanner
              title="料金や作業の詳細は、お気軽にご相談ください。"
              desc="診断・お見積りは無料です。LINE・電話・フォームでお問い合わせいただけます。"
              secondaryLabel="料金一覧を見る"
              secondaryHref="/price"
            />
          </div>
        </div>
      </section>
    </>
  );
}
