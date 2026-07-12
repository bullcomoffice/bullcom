import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

export type AreaFaq = { q: string; a: string };
export type AreaDistrict = { name: string; note?: string };

export type AreaData = {
  slug: string;            // "kobe" | "akashi"
  cityName: string;        // 表示用エリア名（例: 神戸市）
  heroSub: string;         // PageHero の eyebrow
  heroTitle: string;
  heroLead: string;
  crumb: string;
  intro: { heading: string; body: string[] };
  districtsHeading: string;
  districtsLead: string;
  districts: AreaDistrict[];
  accessNote: string[];    // 店舗からのアクセス補足
  faqs: AreaFaq[];
};

// よくあるご依頼（両エリア共通）
const commonRequests = [
  { title: "起動しない・電源が入らない", desc: "電源ユニット・マザーボード・ストレージの故障診断から復旧まで対応します。", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>, color: "#e05252", bg: "#fff5f5" },
  { title: "動作が遅い・固まる", desc: "SSD換装・メモリ増設・クリーンアップで購入時の快適さを取り戻します。", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, color: "#f5820a", bg: "#fff7f0" },
  { title: "ウイルス感染・セキュリティ", desc: "偽警告・フィッシング・マルウェアの駆除と再発防止の設定を行います。", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, color: "#9b59d4", bg: "#f8f0ff" },
  { title: "インターネット・Wi-Fi設定", desc: "回線開通後の接続設定、Wi-Fiが繋がらない・遅いトラブルを解決します。", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>, color: "#2db87a", bg: "#f0fff8" },
  { title: "データ復旧・バックアップ", desc: "消してしまったデータの復旧、故障前のバックアップ体制づくりを支援します。", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, color: "#3a73d1", bg: "#f0f5ff" },
  { title: "新しいパソコンの初期設定", desc: "購入後のセットアップ、旧PCからのデータ移行までまとめて対応します。", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, color: "#00b4d8", bg: "#f0faff" },
];

export default function AreaPageContent({ area }: { area: AreaData }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": area.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${area.cityName}のパソコン修理・設定`,
    "serviceType": "パソコン修理・パソコン設定",
    "provider": { "@id": "https://bullcom.jp/#localbusiness" },
    "areaServed": { "@type": "City", "name": area.cityName, "containedInPlace": { "@type": "State", "name": "兵庫県" } },
    "url": `https://bullcom.jp/area/${area.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "トップ", "item": "https://bullcom.jp/" },
      { "@type": "ListItem", "position": 2, "name": area.crumb, "item": `https://bullcom.jp/area/${area.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <PageHero sub="SERVICE AREA" title={area.heroTitle} crumb={area.crumb} lead={area.heroLead} />

      {/* ===== 3ポイントバー ===== */}
      <section style={{ background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)", padding: "48px 0", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderLeft: "1px solid rgba(255,255,255,0.15)" }} className="stats-grid">
            {[
              { num: "診断料", unit: "¥0", label: "持ち込み無料" },
              { num: "出張", unit: "対応", label: `${area.cityName}ほか近隣` },
              { num: "2002", unit: "年", label: "創業・地域密着" },
              { num: "個人・法人", unit: "", label: "どちらも対応" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "16px 32px", borderRight: "1px solid rgba(255,255,255,0.15)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-en)", fontSize: "clamp(20px, 2.6vw, 32px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.num}<span style={{ fontSize: "clamp(13px, 1.4vw, 17px)", fontWeight: 600, marginLeft: "2px" }}>{s.unit}</span>
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "6px", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* ===== 導入 ===== */}
      <section>
        <div className="container-narrow">
          <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: "24px", textAlign: "center" }}>{area.intro.heading}</h2>
          {area.intro.body.map((p, i) => (
            <p key={i} style={{ fontSize: "15.5px", lineHeight: 2, color: "var(--color-text-soft)", marginBottom: "16px" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* ===== 対応エリア詳細 ===== */}
      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: "12px" }}>{area.districtsHeading}</h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "15px" }}>{area.districtsLead}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", maxWidth: "980px", margin: "0 auto" }}>
            {area.districts.map((d) => (
              <div key={d.name} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "var(--shadow-sm)" }}>
                <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-bg-tint)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text)" }}>{d.name}</div>
                  {d.note && <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px" }}>{d.note}</div>}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13.5px", color: "var(--color-text-muted)" }}>
            上記以外のエリアもご相談ください。出張費は距離により異なります（<Link href="/price" style={{ color: "var(--color-primary)" }}>料金ページ</Link>をご確認ください）。
          </p>
        </div>
      </section>

      {/* ===== よくあるご依頼 ===== */}
      <section>
        <div className="container">
          <div className="section-head">
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: "12px" }}>{area.cityName}でよくあるご依頼</h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "15px" }}>下記以外の症状・ご相談も、まずはお気軽にお問い合わせください。</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {commonRequests.map((r) => (
              <div key={r.title} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "10px", background: r.bg, color: r.color, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.icon}</span>
                  <h3 style={{ fontSize: "16px", margin: 0 }}>{r.title}</h3>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--color-text-soft)", margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/services" className="btn btn-outline">サービス一覧を見る</Link>
          </div>
        </div>
      </section>

      {/* ===== 店舗情報・アクセス ===== */}
      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: "12px" }}>店舗情報・アクセス</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start", maxWidth: "980px", margin: "0 auto" }} className="info-layout">
            <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ padding: "20px 28px", background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", color: "#fff" }}>
                <h3 style={{ fontSize: "17px", color: "#fff", margin: 0 }}>パソコン修理・設定 BULLCOM</h3>
              </div>
              <div style={{ padding: "24px 28px", fontSize: "14.5px", lineHeight: 2, color: "var(--color-text-soft)" }}>
                〒651-2113<br />
                兵庫県神戸市西区伊川谷町有瀬846-10 ギャラリエ1F<br /><br />
                TEL: <a href="tel:0789122656" style={{ color: "var(--color-primary)", fontWeight: 600 }}>078-912-2656</a><br />
                連絡受付時間: 9:00〜19:00（不定休）<br /><br />
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>※ご来店の際は事前にお電話またはLINEでご連絡いただくとスムーズです。</span>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ padding: "20px 28px", background: "linear-gradient(135deg, #2db87a, #1a8a58)", color: "#fff" }}>
                <h3 style={{ fontSize: "17px", color: "#fff", margin: 0 }}>{area.cityName}からのアクセス</h3>
              </div>
              <div style={{ padding: "24px 28px", fontSize: "14.5px", lineHeight: 2, color: "var(--color-text-soft)" }}>
                {area.accessNote.map((line, i) => <p key={i} style={{ margin: "0 0 12px" }}>{line}</p>)}
                <a href="https://maps.google.com/?cid=12639856680861104051" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Googleマップで見る →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== エリアFAQ ===== */}
      <section>
        <div className="container-narrow">
          <div className="section-head">
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: "12px" }}>{area.cityName}のお客様からよくある質問</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {area.faqs.map((f) => (
              <div key={f.q} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontSize: "15.5px", margin: "0 0 10px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, color: "var(--color-primary)", fontFamily: "var(--font-en)", fontWeight: 800 }}>Q.</span>
                  {f.q}
                </h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.9, color: "var(--color-text-soft)", margin: 0, display: "flex", gap: "10px" }}>
                  <span style={{ flexShrink: 0, color: "#2db87a", fontFamily: "var(--font-en)", fontWeight: 800 }}>A.</span>
                  <span>{f.a}</span>
                </p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px" }}>
            <Link href="/faq" style={{ color: "var(--color-primary)", fontWeight: 600 }}>その他のよくある質問を見る →</Link>
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="tight" style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <CtaBanner
            title={`${area.cityName}のパソコンのお困りごと、まずはご相談ください`}
            desc="診断・お見積りは無料です。症状をお聞かせいただければ、おおよその費用と期間をお伝えします。"
          />
        </div>
      </section>

      <style>{`@media (max-width: 800px) { .info-layout { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
