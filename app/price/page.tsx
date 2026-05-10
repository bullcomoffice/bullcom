import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

export const metadata: Metadata = {
  title: "料金・プラン",
  description: "パソコン修理・設定の料金一覧。持ち込み診断料無料。出張・郵送の費用も掲載。",
  alternates: { canonical: "/price" },
  openGraph: {
    title: "料金・プラン｜パソコン修理・設定 BULLCOM",
    description: "パソコン修理・設定の料金一覧。持ち込み診断料無料。出張・郵送の費用も掲載。",
    url: "https://bullcom.jp/price",
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BULLCOM 料金・プラン" }],
  },
  twitter: { card: "summary_large_image", title: "料金・プラン｜パソコン修理・設定 BULLCOM", description: "パソコン修理・設定の料金一覧。持ち込み診断料無料。出張・郵送の費用も掲載。", images: ["/og-image.jpg"] },
};

const SectionHeader = ({ num, color, title, lead }: { num: string, color: string, title: string, lead?: string }) => (
  <div style={{ marginBottom: "28px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
    <div style={{ flexShrink: 0, width: "52px", height: "52px", background: color, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-en)", fontWeight: 900, fontSize: "16px", boxShadow: `0 6px 16px ${color}44` }}>{num}</div>
    <div>
      <h2 style={{ fontSize: "22px", marginBottom: lead ? "4px" : 0 }}>{title}</h2>
      {lead && <p style={{ color: "var(--color-text-soft)", fontSize: "14px", margin: 0 }} dangerouslySetInnerHTML={{ __html: lead }} />}
    </div>
  </div>
);

export default function PricePage() {
  return (
    <>
      <PageHero sub="PRICING" title="料金・プラン" crumb="料金・プラン" lead="わかりやすい価格で、ご納得いただける作業をお約束します。すべて税込価格です。" />

      <section>
        <div className="container">

          {/* ===== FREE HERO ===== */}
          <div style={{
            background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)",
            borderRadius: "var(--radius-lg)", padding: "40px 48px",
            marginBottom: "48px", position: "relative", overflow: "hidden",
            display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "32px", alignItems: "center",
          }} className="free-hero">
            <div aria-hidden="true" style={{ position: "absolute", right: "-60px", top: "-60px", width: "280px", height: "280px", background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ width: "88px", height: "88px", background: "linear-gradient(135deg, #ffce47, #f7a811)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-en)", fontWeight: 900, fontSize: "22px", boxShadow: "0 12px 28px rgba(247,168,17,0.45)", flexShrink: 0 }}>FREE</div>
            <div>
              <h2 style={{ fontSize: "26px", color: "#fff", marginBottom: "8px" }}>持ち込み診断料は<span style={{ color: "#fcd34d" }}>無料</span>！</h2>
              <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
                「もしかして…」と思ったら、まずは症状を見せてください。<br />
                修理が不要だったときも料金はかかりません。お気軽にご相談ください。
              </p>
            </div>
            <Link href="/contact" style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", padding: "14px 24px", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "15px", flexShrink: 0, whiteSpace: "nowrap", textDecoration: "none" }}>
              未店予約をする
            </Link>
          </div>

          {/* ===== 01 基本料金 ===== */}
          <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
            <SectionHeader num="01" color="#3a73d1" title="基本料金" lead="作業の入口となる基本料金です。" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="basic-grid">
              {[
                { label: "持ち込み診断", price: "¥0", note: "診断料無料", desc: "店舗にお持ちいただいた場合の診断・見積もり", color: "#f7a811", badge: "FREE" },
                { label: "出張診断・対応", price: "¥5,500〜", note: "エリアにより変動", desc: "ご自宅・オフィスへお伺いし現地で対応します", color: "#3a73d1", badge: null },
                { label: "郵送修理", price: "お見積り", note: "送料元払い", desc: "全国対応。お見積り後に作業を実施します", color: "#2db87a", badge: null },
              ].map((item) => (
                <div key={item.label} style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "28px 24px", position: "relative", overflow: "hidden", border: `1.5px solid ${item.color}22` }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: item.color }} />
                  {item.badge && (
                    <span style={{ position: "absolute", top: "16px", right: "16px", background: "linear-gradient(135deg, #ffce47, #f7a811)", color: "#7a4700", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "11px", padding: "3px 10px", borderRadius: "999px" }}>{item.badge}</span>
                  )}
                  <p style={{ fontFamily: "var(--font-en)", fontSize: "11px", fontWeight: 700, color: item.color, letterSpacing: "0.1em", margin: "0 0 8px" }}>{item.note.toUpperCase()}</p>
                  <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>{item.label}</h3>
                  <p style={{ fontFamily: "var(--font-en)", fontSize: "30px", fontWeight: 800, color: item.color, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{item.price}</p>
                  <p style={{ fontSize: "13px", color: "var(--color-text-soft)", margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 02 主要サービス料金 ===== */}
          <div style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)" }}>
            <SectionHeader num="02" color="#2db87a" title="主要サービス料金" lead={`代表的なサービスの料金です。詳細は<a href="/services" style="color:var(--color-primary)">サービス一覧</a>をご覧ください。`} />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  category: "パソコン設定・リカバリー", color: "#2db87a",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>,
                  items: [["新規パソコン設定A", "¥11,000"], ["新規パソコン設定B", "¥16,500"], ["リカバリーパックA", "¥16,500"], ["リカバリーパックB", "¥22,000"]],
                },
                {
                  category: "セキュリティ・データ", color: "#e84a5f",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5z"/></svg>,
                  items: [["ウイルス診断・駆除", "¥8,800"], ["スパム診断・駆除", "¥8,800"], ["データバックアップ", "¥5,500〜"], ["データ移行", "¥11,000〜"]],
                },
                {
                  category: "ネットワーク・機器設定", color: "#00b4d8",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/></svg>,
                  items: [["ネットワークルーター設定", "¥8,800"], ["Wi-Fi接続設定", "¥2,200"], ["メール設定", "¥2,200"], ["プリンター設定", "¥3,300"]],
                },
                {
                  category: "サポート契約", color: "#6366f1",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>,
                  items: [["リモートサポート（年間）", "¥11,000 / 年"]],
                },
              ].map((cat) => (
                <div key={cat.category} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", background: `${cat.color}10`, borderBottom: `2px solid ${cat.color}33` }}>
                    <span style={{ width: "28px", height: "28px", background: cat.color, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{cat.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: cat.color }}>{cat.category}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
                    {cat.items.map(([name, price]) => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--color-border)", gap: "12px" }}>
                        <span style={{ fontSize: "14px", color: "var(--color-text)" }}>{name}</span>
                        <span style={{ fontFamily: "var(--font-en)", fontWeight: 800, color: cat.color, fontSize: "15px", flexShrink: 0 }}>{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 03 出張エリア ===== */}
          <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "24px", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
            <SectionHeader num="03" color="#f5820a" title="出張エリア・出張料金" lead="兵庫県・大阪府を中心に、京都府の一部まで対応しています。" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }} className="area-price-grid">
              {[
                { label: "エリアA", color: "#2db87a", shadow: "rgba(45,184,122,0.25)", price: "¥5,500", desc: "神戸市全域・明石市・芦屋市・尼崎市・西宮市・姫路市・加古川市 ほか" },
                { label: "エリアB", color: "#3a73d1", shadow: "rgba(58,115,209,0.25)", price: "¥11,000", desc: "相生市・赤穂市・淡路市・大阪市全域・茨木市・高槻市 ほか" },
                { label: "エリアC", color: "#f5820a", shadow: "rgba(245,130,10,0.25)", price: "¥16,500", desc: "養父市・朝来市・豊岡市・京都府亀岡市" },
              ].map((area) => (
                <div key={area.label} style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "24px", border: `1.5px solid ${area.color}33`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: area.color }} />
                  <span style={{ display: "inline-block", background: area.color, color: "#fff", padding: "4px 14px", borderRadius: "999px", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "13px", marginBottom: "12px", boxShadow: `0 4px 10px ${area.shadow}` }}>{area.label}</span>
                  <div style={{ fontFamily: "var(--font-en)", fontSize: "28px", fontWeight: 800, color: area.color, marginBottom: "10px", letterSpacing: "-0.02em" }}>{area.price}</div>
                  <p style={{ fontSize: "13px", color: "var(--color-text-soft)", margin: 0, lineHeight: 1.7 }}>{area.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>※エリア外の場合もお気軽にご相談ください。別途見積もりいたします。</p>
          </div>

          {/* ===== 04 郵送送料 ===== */}
          <div style={{ background: "var(--color-bg-soft)", borderRadius: "var(--radius-lg)", padding: "40px", marginBottom: "48px", border: "1px solid var(--color-border)" }}>
            <SectionHeader num="04" color="#9b59d4" title="郵送修理 送料目安" lead="片道・佐川急便（2024年10月現在）。往復送料はお客様負担となります。" />
            {/* 凡例 */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px", padding: "14px 20px", background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", fontSize: "13.5px", color: "var(--color-text-soft)" }}>
              <span style={{ fontWeight: 700, color: "var(--color-text)" }}>送料（片道）</span>
              <span>📦 ノートPC → <strong style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-en)" }}>100サイズ</strong></span>
              <span>🖥️ デスクトップPC → <strong style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-en)" }}>160サイズ</strong></span>
            </div>

            {/* エリアグループ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }} className="ship-grid">
              {[
                { group: "北日本", color: "#6366f1", rows: [["北海道", "¥2,350", "¥3,340"], ["北東北（青森・秋田・岩手）", "¥1,880", "¥2,830"], ["南東北（宮城・山形・福島）", "¥1,740", "¥2,700"]] },
                { group: "関東・信越", color: "#3a73d1", rows: [["関東", "¥1,630", "¥2,570"], ["信越（長野・新潟）", "¥1,630", "¥2,570"]] },
                { group: "中部・北陸", color: "#00b4d8", rows: [["東海（静岡・愛知・岐阜・三重）", "¥1,520", "¥2,440"], ["北陸（富山・石川・福井）", "¥1,520", "¥2,440"]] },
                { group: "関西・中国・四国", color: "#2db87a", rows: [["関西（京都・滋賀・奈良・和歌山・大阪・兵庫）", "¥1,520", "¥2,440"], ["中国（岡山・広島・山口・鳥取・島根）", "¥1,520", "¥2,440"], ["四国", "¥1,630", "¥2,570"]] },
                { group: "九州", color: "#f5820a", rows: [["北九州（福岡・佐賀・長崎・大分）", "¥1,630", "¥2,570"], ["南九州（熊本・宮崎・鹿児島）", "¥1,630", "¥2,570"]] },
                { group: "沖縄", color: "#e84a5f", rows: [["沖縄（ゆうパック）", "¥2,160", "¥3,180"]] },
              ].map((grp) => (
                <div key={grp.group} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                  <div style={{ padding: "10px 16px", background: `${grp.color}12`, borderBottom: `2px solid ${grp.color}33`, fontWeight: 700, fontSize: "13px", color: grp.color }}>{grp.group}</div>
                  {grp.rows.map(([area, note, desk]) => (
                    <div key={area} style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)", display: "grid", gridTemplateColumns: "1fr auto auto", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", color: "var(--color-text-soft)" }}>{area}</span>
                      <span style={{ fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--color-primary-dark)", fontSize: "13px" }}>{note}</span>
                      <span style={{ fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--color-text-muted)", fontSize: "13px" }}>{desk}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px", padding: "16px 20px", background: "#fff", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--color-text-soft)" }}>※ 往復送料はお客様負担となります。</p>
              <p style={{ margin: 0, fontSize: "13.5px" }}><strong style={{ color: "#c0392b" }}>⚠️ 着払いでのお送りはお受けできません。必ず元払いでお送りください。</strong></p>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--color-text-soft)" }}>※ 離島など一部地域は別途追加送料が必要な場合があります。</p>
            </div>
          </div>

          <CtaBanner
            title="お見積りは無料。診断後に追加料金はいただきません。"
            desc="料金についてご不明な点があれば、お気軽にお問い合わせください。"
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .free-hero { grid-template-columns: 1fr !important; text-align: center; justify-items: center; padding: 32px 24px !important; }
          .free-hero a { width: 100%; text-align: center; justify-content: center; box-sizing: border-box; }
          .basic-grid { grid-template-columns: 1fr !important; }
          .area-price-grid { grid-template-columns: 1fr !important; }
          .ship-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .ship-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
