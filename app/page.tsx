import Image from "next/image";
import Link from "next/link";
import TerminalBg from "@/components/sections/TerminalBg";
import ContactForm from "@/components/ui/ContactForm";
import { getLatestBlogs } from "@/lib/microcms";

export const revalidate = 3600;

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const catColors: Record<string, string> = {
  "テクノロジー":   "#3a73d1",
  "更新情報":       "#2db87a",
  "チュートリアル": "#f5820a",
  "修理":           "#e84a5f",
  "セキュリティ":   "#9b59d4",
  "設定":           "#00b4d8",
  "データ":         "#6366f1",
  "お知らせ":       "#2db87a",
};

export default async function HomePage() {
  const { contents: latestPosts } = await getLatestBlogs(3);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BULLCOM（ブルコム）パソコン修理",
    "url": "https://bullcom.jp",
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BULLCOM（ブルコム）パソコン修理",
    "url": "https://bullcom.jp",
    "telephone": "078-912-2656",
    "image": "https://bullcom.jp/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "伊川谷町有瀬846-10 ギャラリエ1F",
      "addressLocality": "神戸市西区",
      "addressRegion": "兵庫県",
      "postalCode": "651-2113",
      "addressCountry": "JP",
    },
    "openingHours": "Mo-Su 09:00-19:00",
    "priceRange": "¥¥",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* ===== HERO ===== */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #0a1628 0%, #1e3a6f 50%, #2c5fb8 100%)",
        overflow: "hidden",
        padding: 0,
        borderBottom: "none",
      }}>
        {/* ターミナルアニメーション背景 */}
        <TerminalBg />

        <div style={{
          maxWidth: "var(--container)", margin: "0 auto",
          padding: "80px 24px 90px",
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
          gap: "56px", alignItems: "center", position: "relative",
          zIndex: 10,
        }} className="hero-inner">

          {/* コピー */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "var(--font-en)", fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
              padding: "6px 14px", borderRadius: "999px", marginBottom: "24px",
            }}>
              <span style={{ width: "6px", height: "6px", background: "#6495ED", borderRadius: "50%" }} />
              SINCE 2002 · KOBE / AKASHI
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.3,
              letterSpacing: "0.005em", marginBottom: "24px", color: "#fff",
            }}>
              パソコンのお困りごと、<br />
              <span style={{
                background: "linear-gradient(transparent 70%, rgba(100,149,237,0.5) 70%)",
                padding: "0 4px",
              }}>そのままお持ちください。</span>
            </h1>

            <p style={{
              fontSize: "17px", color: "rgba(255,255,255,0.8)",
              lineHeight: 1.85, marginBottom: "32px", maxWidth: "540px",
            }}>
              起動しない・動作が遅い・データが消えた——<br />
              小さな不調から本格的な修理まで、<strong style={{ color: "#fcd34d" }}>持ち込み診断は無料</strong>。<br />
              個人・法人どちらでも、神戸・明石エリアで20年以上の実績があります。
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
              <a href="tel:0789122656" className="btn btn-primary" style={{ padding: "16px 28px", fontSize: "16px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                電話で相談する
              </a>
              <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ padding: "16px 28px", fontSize: "16px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                LINEで相談する
              </a>
            </div>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              {["持ち込み診断 無料", "個人・法人どちらも対応", "出張・郵送OK"].map((text) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                  <span style={{ width: "32px", height: "32px", background: "rgba(100,149,237,0.25)", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#6495ED", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ビジュアル */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "480px", zIndex: 1 }}>
            {/* ¥0チップ */}
            <div style={{
              position: "absolute", top: "20px", left: "-10px",
              background: "linear-gradient(135deg, #fff, #fff5f8)", border: "1px solid #ffd4e1",
              borderRadius: "14px", padding: "14px 18px",
              boxShadow: "0 12px 30px rgba(28,60,120,0.14)",
              display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", zIndex: 2,
            }}>
              <span style={{ fontFamily: "var(--font-en)", fontSize: "22px", fontWeight: 700, color: "var(--color-pink-dark)", lineHeight: 1 }}>¥0</span>
              <span>
                <span style={{ display: "block", fontWeight: 700 }}>持ち込み診断</span>
                <span style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>無料で承ります</span>
              </span>
            </div>
            {/* 24年チップ */}
            <div style={{
              position: "absolute", bottom: "60px", right: "-10px",
              background: "#fff", border: "1px solid var(--color-border)",
              borderRadius: "14px", padding: "14px 18px",
              boxShadow: "0 12px 30px rgba(28,60,120,0.14)",
              display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", zIndex: 2,
            }}>
              <span style={{ fontFamily: "var(--font-en)", fontSize: "22px", fontWeight: 700, color: "var(--color-primary)", lineHeight: 1 }}>24<small style={{ fontSize: "13px" }}>年</small></span>
              <span>
                <span style={{ display: "block", fontWeight: 700 }}>創業 2002年</span>
                <span style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>地域密着</span>
              </span>
            </div>
            <Image
              src="/logo-preview.png"
              alt="BULLCOM"
              width={460}
              height={460}
              style={{ width: "100%", maxWidth: "460px", filter: "drop-shadow(0 30px 60px rgba(44,95,184,0.25))", animation: "floaty 6s ease-in-out infinite" }}
              priority
            />
          </div>
        </div>

        <style>{`
          @keyframes floaty {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-14px) rotate(2deg); }
          }
          @media (max-width: 900px) {
            .hero-inner { grid-template-columns: 1fr !important; padding: 56px 20px 64px !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* ===== CONCEPT ===== */}
      <section style={{
        background: "radial-gradient(ellipse at top right, rgba(100,149,237,0.10), transparent 50%), radial-gradient(ellipse at bottom left, rgba(180,200,235,0.12), transparent 50%), linear-gradient(180deg, #ffffff 0%, #f5f8fc 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "var(--font-en)", fontSize: "13px", fontWeight: 700,
              letterSpacing: "0.22em", color: "var(--color-primary)", marginBottom: "24px",
            }}>
              <span style={{ width: "32px", height: "1.5px", background: "var(--color-primary)", opacity: 0.5 }} />
              CONCEPT
              <span style={{ width: "32px", height: "1.5px", background: "var(--color-primary)", opacity: 0.5 }} />
            </div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.3, marginBottom: "24px" }}>
              パソコンに困ったときは<br />
              <span style={{ color: "var(--color-primary)", position: "relative", display: "inline-block", padding: "0 8px" }}>BULLCOM</span>
            </h2>
            <p style={{ fontSize: "17px", color: "var(--color-text-soft)", lineHeight: 2, maxWidth: "720px", margin: "0 auto" }}>
              パソコンが急に動かなくなった、設定がわからない、インターネットにつながらない——<br />
              そんなとき、<strong>気軽に頼れるお店</strong>でありたい。<br />
              神戸・明石を中心に、個人・法人どちらにも幅広く対応しています。
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", maxWidth: "1100px", margin: "0 auto" }} className="concept-grid">
            {[
              {
                num: "01", key: "DIAGNOSIS",
                title: <>持ち込み診断料<br />無料</>,
                desc: "「もしかして…」と思ったら、まずは症状を見せてください。診断だけのご来店も大歓迎です。",
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
              },
              {
                num: "02", key: "DELIVERY",
                title: <>出張・郵送にも<br />対応</>,
                desc: "神戸・明石エリアは出張で。遠方のお客様には郵送修理を承ります。ご都合に合わせて選べます。",
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,
              },
              {
                num: "03", key: "FOR ALL",
                title: <>個人・法人<br />どちらも対応</>,
                desc: "家庭のパソコンから業務PCまで。Windows・Mac対応。リモート・ネットワーク設定もお任せください。",
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              },
            ].map((card) => (
              <div key={card.num} style={{
                padding: "36px 28px 32px", background: "#fff",
                border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)",
                position: "relative", overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, var(--color-primary-light), var(--color-primary))" }} />
                <span style={{ position: "absolute", top: "24px", right: "28px", fontFamily: "var(--font-en)", fontSize: "56px", fontWeight: 900, color: "rgba(226,71,122,0.18)", lineHeight: 1, letterSpacing: "-0.04em" }}>{card.num}</span>
                <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "24px", boxShadow: "0 8px 20px rgba(44,95,184,0.3)" }}>
                  {card.icon}
                </div>
                <span style={{ display: "inline-block", fontFamily: "var(--font-en)", fontSize: "11px", color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "6px" }}>{card.key}</span>
                <h3 style={{ fontSize: "22px", marginBottom: "12px", lineHeight: 1.4 }}>{card.title}</h3>
                <p style={{ fontSize: "14.5px", color: "var(--color-text-soft)", margin: 0, lineHeight: 1.9 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .concept-grid { grid-template-columns: 1fr !important; max-width: 540px !important; margin: 0 auto !important; } }
        `}</style>
      </section>

      {/* ===== BLOG ===== */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* 背景装飾 */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", right: "-100px", top: "-100px",
          width: "400px", height: "400px",
          background: "radial-gradient(closest-side, rgba(100,149,237,0.25), transparent)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", marginBottom: "12px" }}>BLOG</span>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "#fff" }}>ブログ・コラム</h2>
            </div>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", fontWeight: 600 }}>ブログ一覧を見る →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="blog-grid">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} style={{
                background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)",
                transition: "transform 0.18s, box-shadow 0.18s, background 0.18s",
                display: "flex", flexDirection: "column", textDecoration: "none",
              }}>
                {/* アイキャッチ */}
                <div style={{ aspectRatio: "16/10", position: "relative", background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 12px, rgba(255,255,255,0.03) 12px 24px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  {post.eyecatch && (
                    <Image src={post.eyecatch.url} alt={post.title} fill style={{ objectFit: "cover" }} />
                  )}
                </div>
                <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-en)" }}>
                    {post.category && (
                      <span style={{ display: "inline-block", padding: "3px 10px", background: catColors[post.category.name] ?? "#3a73d1", color: "#fff", fontSize: "12px", borderRadius: "999px", fontWeight: 700 }}>{post.category.name}</span>
                    )}
                    <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                  </div>
                  <h3 style={{ fontSize: "16px", lineHeight: 1.6, color: "#fff" }}>{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .blog-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ===== SERVICES ===== */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">SERVICES</span>
            <h2>主なサービスと料金の目安</h2>
            <p className="section-head__lead">よくご依頼いただく代表的なメニューをご紹介します。すべて税込価格です。</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="service-grid">
            {[
              { color: ["#3a73d1","#1e4a99"], shadow: "rgba(44,95,184,0.28)",  border: "#3a73d1", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: "新規パソコン設定", desc: "開梱・設置・初期設定・周辺機器接続まで", price: "¥11,000〜" },
              { color: ["#e84a5f","#b32244"], shadow: "rgba(232,74,95,0.28)",   border: "#e84a5f", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5z"/></svg>, title: "ウイルス診断・駆除", desc: "感染の有無を確認し、安全に駆除します", price: "¥8,800" },
              { color: ["#2db87a","#1a8a58"], shadow: "rgba(45,184,122,0.28)",  border: "#2db87a", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.2-8.55"/><polyline points="21 4 21 10 15 10"/></svg>, title: "リカバリーパック", desc: "初期化・初期設定・Office・アップデート", price: "¥16,500〜" },
              { color: ["#9b59d4","#7340aa"], shadow: "rgba(155,89,212,0.28)",  border: "#9b59d4", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>, title: "データ移行 / バックアップ", desc: "大切なデータを安全に保存・移行", price: "¥5,500〜" },
              { color: ["#00b4d8","#0077a8"], shadow: "rgba(0,180,216,0.28)",   border: "#00b4d8", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12" y2="20.01"/></svg>, title: "Wi-Fi・ルーター設定", desc: "接続設定・速度改善・買い替え対応", price: "¥2,200〜" },
              { color: ["#f5820a","#c96200"], shadow: "rgba(245,130,10,0.28)",  border: "#f5820a", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, title: "メール設定", desc: "メールソフトの設定・移行", price: "¥2,200" },
              { color: ["#6366f1","#4338ca"], shadow: "rgba(99,102,241,0.28)",  border: "#6366f1", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>, title: "プリンター設定", desc: "プリンター接続・初期設定", price: "¥3,300" },
              { color: ["#ec4899","#be185d"], shadow: "rgba(236,72,153,0.28)",  border: "#ec4899", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>, title: "リモートサポート", desc: "遠隔で年間契約サポート（月3回）", price: "¥11,000 / 年" },
            ].map((svc) => (
              <div key={svc.title} style={{
                background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                border: `1px solid ${svc.border}22`, borderRadius: "var(--radius-lg)",
                padding: "28px 22px 24px", transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
                position: "relative", overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${svc.color[0]}, ${svc.color[1]})` }} />
                <div style={{ width: "52px", height: "52px", background: `linear-gradient(135deg, ${svc.color[0]}, ${svc.color[1]})`, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "18px", boxShadow: `0 6px 14px ${svc.shadow}` }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontSize: "17px", marginBottom: "8px", lineHeight: 1.45 }}>{svc.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-text-soft)", margin: "0 0 18px", lineHeight: 1.7 }}>{svc.desc}</p>
                <div style={{ fontFamily: "var(--font-en)", fontWeight: 800, color: "var(--color-primary-dark)", fontSize: "20px", paddingTop: "14px", borderTop: "1px solid #d9e3f3", letterSpacing: "-0.01em" }}>
                  {svc.price}<small style={{ fontFamily: "var(--font-jp)", fontSize: "11px", color: "var(--color-text-muted)", marginLeft: "4px", fontWeight: 500 }}>税込</small>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/price" className="btn btn-outline">料金一覧を見る →</Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .service-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 500px) { .service-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ===== AREA ===== */}
      <section className="bg-soft">
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">SERVICE AREA</span>
            <h2>出張対応エリア</h2>
            <p className="section-head__lead">兵庫県・大阪府を中心に、京都府の一部まで対応。明石を拠点に出張対応を行っています。</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }} className="area-grid">
            {/* マップ */}
            <div style={{ aspectRatio: "1.1", background: "radial-gradient(circle at 50% 53%, rgba(255,255,255,0.6), transparent 40%), linear-gradient(135deg, #eef4fb, #dde7f5)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", position: "relative", overflow: "hidden" }}>
              <span style={{ position: "absolute", top: "16px", left: "16px", fontFamily: "'Inter',monospace", fontSize: "11px", color: "var(--color-text-muted)", letterSpacing: "0.15em", background: "rgba(255,255,255,0.9)", padding: "4px 8px", borderRadius: "4px", zIndex: 5 }}>MAP: 出張対応エリア</span>
              {/* リング */}
              {[
                { cls: "far", size: "88%", color: "rgba(245,158,44,0.06)", border: "1.5px dashed rgba(245,158,44,0.5)", label: "~50km", labelColor: "#c9881a", labelBorder: "rgba(245,158,44,0.6)" },
                { cls: "mid", size: "62%", color: "radial-gradient(circle, rgba(44,95,184,0.10), transparent 70%)", border: "2px dashed rgba(44,95,184,0.45)", label: "~30km", labelColor: "#2c5fb8", labelBorder: "rgba(44,95,184,0.5)" },
                { cls: "near", size: "38%", color: "radial-gradient(circle, rgba(38,128,90,0.18), rgba(38,128,90,0.05) 70%, transparent)", border: "2px solid rgba(38,128,90,0.4)", label: "~15km", labelColor: "#2c8068", labelBorder: "rgba(38,128,90,0.4)" },
              ].map((ring) => (
                <div key={ring.cls} style={{ position: "absolute", left: "50%", top: "53%", transform: "translate(-50%,-50%)", width: ring.size, aspectRatio: 1, borderRadius: "50%", background: ring.color, border: ring.border, pointerEvents: "none" }}>
                  <span style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Inter',monospace", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700, background: "#fff", padding: "3px 7px", borderRadius: "3px", whiteSpace: "nowrap", color: ring.labelColor, border: `1px solid ${ring.labelBorder}` }}>{ring.label}</span>
                </div>
              ))}
              {/* ピン */}
              <div style={{ position: "absolute", left: "50%", top: "53%", width: "30px", height: "30px", background: "linear-gradient(135deg, #d6486f, #b3214e)", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg) translate(0,-50%)", boxShadow: "0 6px 16px rgba(179,33,78,0.5), 0 0 0 4px rgba(214,72,111,0.2)", zIndex: 3 }}>
                <span style={{ position: "absolute", transform: "rotate(45deg)", top: "-10px", left: "30px", fontSize: "11px", fontWeight: 800, background: "#b3214e", color: "#fff", padding: "2px 7px", borderRadius: "3px", whiteSpace: "nowrap" }}>明石（拠点）</span>
              </div>
              {[
                { left: "56%", top: "50%", size: "22px", bg: "linear-gradient(135deg,#3fb287,#2c8068)", shadow: "0 4px 10px rgba(38,128,90,0.4)", name: "神戸" },
                { left: "44%", top: "58%", size: "22px", bg: "linear-gradient(135deg,#3fb287,#2c8068)", shadow: "0 4px 10px rgba(38,128,90,0.4)", name: "加古川" },
                { left: "64%", top: "44%", size: "18px", bg: "linear-gradient(135deg,#4a7fd6,#2c5fb8)", shadow: "0 4px 10px rgba(44,95,184,0.35)", name: "大阪" },
                { left: "35%", top: "64%", size: "18px", bg: "linear-gradient(135deg,#4a7fd6,#2c5fb8)", shadow: "0 4px 10px rgba(44,95,184,0.35)", name: "姫路" },
                { left: "60%", top: "36%", size: "18px", bg: "linear-gradient(135deg,#4a7fd6,#2c5fb8)", shadow: "0 4px 10px rgba(44,95,184,0.35)", name: "西宮" },
                { left: "72%", top: "30%", size: "14px", bg: "linear-gradient(135deg,#f5a83c,#d97706)", shadow: "0 3px 8px rgba(245,158,44,0.4)", name: "京都" },
              ].map((pin) => (
                <div key={pin.name} style={{ position: "absolute", left: pin.left, top: pin.top, width: pin.size, height: pin.size, background: pin.bg, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg) translate(0,-50%)", boxShadow: pin.shadow, zIndex: 3 }}>
                  <span style={{ position: "absolute", transform: "rotate(45deg)", top: "-6px", left: "26px", fontSize: "11px", fontWeight: 700, background: "#fff", padding: "2px 7px", borderRadius: "3px", whiteSpace: "nowrap", color: "#1e3a6f", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>{pin.name}</span>
                </div>
              ))}
              {/* 凡例 */}
              <div style={{ position: "absolute", bottom: "14px", left: "14px", background: "rgba(255,255,255,0.92)", border: "1px solid var(--color-border)", borderRadius: "6px", padding: "10px 12px", display: "grid", gap: "6px", fontSize: "11px", zIndex: 5 }}>
                {[{ color: "#b3214e", label: "拠点（明石）" }, { color: "#2c8068", label: "近郊エリア" }, { color: "#2c5fb8", label: "中距離エリア" }, { color: "#d97706", label: "遠方エリア" }].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            {/* エリア一覧 */}
            <div>
              <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>出張料金</h3>
              {[
                { name: "エリアA", color: "linear-gradient(135deg,#3fb287,#2c8068)", desc: "神戸市全域・明石市・芦屋市・尼崎市・西宮市・姫路市・三田市・宝塚市 ほか", fee: "¥5,500" },
                { name: "エリアB", color: "linear-gradient(135deg,#4a7fd6,#2c5fb8)", desc: "相生市・赤穂市・淡路市・大阪市全域・茨木市・高槻市 ほか", fee: "¥11,000" },
                { name: "エリアC", color: "linear-gradient(135deg,#f5a83c,#d97706)", desc: "養父市・朝来市・豊岡市・京都府亀岡市", fee: "¥16,500" },
              ].map((area) => (
                <div key={area.name} style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px", gap: "12px", padding: "14px 0", borderBottom: "1px solid var(--color-border)", alignItems: "center" }}>
                  <span style={{ background: area.color, color: "#fff", textAlign: "center", padding: "6px 12px", borderRadius: "6px", fontWeight: 700, fontSize: "13px", fontFamily: "var(--font-en)", letterSpacing: "0.04em" }}>{area.name}</span>
                  <span style={{ fontSize: "13.5px", color: "var(--color-text-soft)" }}>{area.desc}</span>
                  <span style={{ fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--color-primary-dark)", textAlign: "right", fontSize: "16px" }}>{area.fee}</span>
                </div>
              ))}
              <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "16px" }}>※エリア外の場合もお気軽にご相談ください。</p>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .area-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ===== MAILING FLOW ===== */}
      <section style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-head__eyebrow">MAILING REPAIR</span>
            <h2>遠方の方も安心。郵送で修理を受け付けます。</h2>
            <p className="section-head__lead">来店が難しい方には、郵送での修理をご利用いただけます。シンプルな4ステップです。</p>
          </div>

          {/* ステップフロー */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", alignItems: "stretch" }} className="flow-grid">
            {[
              { color: ["#3a73d1","#1e4a99"], num: "01", title: "お申し込み", desc: "LINEまたはお問い合わせフォームから症状をご連絡ください。", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
              { color: ["#f5820a","#c96200"], num: "02", title: "パソコンを送付", desc: "梱包後、元払いでお送りください。着払いは不可です。", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
              { color: ["#9b59d4","#7340aa"], num: "03", title: "診断・お見積り", desc: "到着後に内容を確認し、作業前に必ずお見積りをご連絡します。", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
              { color: ["#2db87a","#1a8a58"], num: "04", title: "修理・返送", desc: "作業完了後、ご指定の住所へお返しいたします。返送料は当社負担です。", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
            ].map((step, i) => (
              <div key={step.title} style={{ position: "relative", display: "flex", alignItems: "stretch" }}>
                {/* カード */}
                <div style={{
                  flex: 1, background: "#fff",
                  border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)",
                  padding: "36px 24px 28px", margin: "0 8px",
                  borderTop: `4px solid ${step.color[0]}`,
                  boxShadow: "0 2px 12px rgba(28,60,120,0.06)",
                }}>
                  {/* ステップ番号 */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "56px", height: "56px",
                    background: `linear-gradient(135deg, ${step.color[0]}, ${step.color[1]})`,
                    borderRadius: "16px", marginBottom: "20px",
                    color: "#fff", boxShadow: `0 6px 16px ${step.color[0]}44`,
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-en)", fontSize: "11px", fontWeight: 800,
                    letterSpacing: "0.12em", color: step.color[0], marginBottom: "6px",
                  }}>STEP {step.num}</div>
                  <h4 style={{ fontSize: "18px", marginBottom: "10px", color: "var(--color-text)" }}>{step.title}</h4>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", margin: 0, lineHeight: 1.75 }}>{step.desc}</p>
                </div>
                {/* 矢印（最後以外） */}
                {i < 3 && (
                  <div style={{
                    position: "absolute", right: "-12px", top: "50%",
                    transform: "translateY(-50%)",
                    width: "24px", height: "24px",
                    background: "#fff", border: "1px solid var(--color-border)",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--color-primary)", zIndex: 2,
                    boxShadow: "0 2px 6px rgba(28,60,120,0.1)",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 送付先バナー */}
          <div style={{
            marginTop: "40px",
            background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)",
            borderRadius: "var(--radius-lg)", padding: "28px 36px",
            display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "24px", alignItems: "center",
            position: "relative", overflow: "hidden",
          }} className="ship-banner">
            <div aria-hidden="true" style={{ position: "absolute", right: "-60px", top: "-60px", width: "200px", height: "200px", background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ width: "56px", height: "56px", background: "rgba(255,255,255,0.15)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M9 16h2"/></svg>
            </div>
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "4px", color: "#fff" }}>郵送修理の送付先</h3>
              <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)", fontSize: "13.5px", margin: 0 }}>〒651-2113 兵庫県神戸市西区伊川谷町有瀬846-10 ギャラリエ1F BULLCOM 宛</p>
              <p style={{ marginTop: "4px", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>TEL: 078-912-2656　送料は元払いでお送りください。着払い不可。</p>
            </div>
            <Link href="/contact" style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", padding: "10px 20px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "14px", flexShrink: 0, whiteSpace: "nowrap" }}>
              郵送修理の申し込み
            </Link>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .flow-grid { grid-template-columns: 1fr 1fr !important; } .ship-banner { grid-template-columns: 1fr !important; text-align: center; justify-items: center; } .ship-banner a { width: 100%; text-align: center; box-sizing: border-box; } }`}</style>
      </section>

      {/* ===== LINE BANNER ===== */}
      <section className="tight bg-soft">
        <div className="container">
          <div style={{ background: "radial-gradient(circle at 90% 90%, rgba(255,255,255,0.18), transparent 40%), linear-gradient(135deg, #06c755 0%, #02a347 100%)", color: "#fff", borderRadius: "var(--radius-lg)", padding: "56px 56px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "32px", position: "relative", overflow: "hidden" }} className="line-inner">
            <div>
              <h3 style={{ fontSize: "28px", color: "#fff", marginBottom: "10px" }}>LINEで気軽に相談できます。</h3>
              <p style={{ color: "rgba(255,255,255,0.92)", margin: 0, lineHeight: 1.8 }}>
                写真を送るだけで、症状の確認・概算のご案内ができます。<br />まずはお気軽にメッセージをどうぞ。
              </p>
              <div style={{ marginTop: "24px" }}>
                <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#fff", color: "#06c755", padding: "16px 28px", fontSize: "16px", fontWeight: 700 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 2.8 1.8 5.3 4.6 6.7-.1.6-.6 2.4-.7 2.7-.1.4.2.4.4.3.2-.1 2.6-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.3S17.5 2 12 2z"/></svg>
                  LINEで相談する
                </a>
              </div>
            </div>
            <div style={{ width: "140px", height: "140px", background: "#fff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px" }}>
              <img src="/line-qr.png" alt="LINE QRコード" width={124} height={124} style={{ borderRadius: "6px" }} />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 760px) {
            .line-inner { padding: 40px 28px !important; grid-template-columns: 1fr !important; text-align: center; align-items: center; }
            .line-inner .btn { display: inline-flex !important; }
            .line-inner > div:last-child { margin: 0 auto; }
          }
        `}</style>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section style={{ background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 100%)", position: "relative", overflow: "hidden" }}>
        {/* 背景装飾 */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", left: "-100px", bottom: "-100px", width: "400px", height: "400px", background: "radial-gradient(closest-side, rgba(100,149,237,0.2), transparent)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "56px", alignItems: "start" }} className="contact-layout">

            {/* 左：連絡方法 */}
            <div>
              <span style={{ display: "inline-block", fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: "12px" }}>CONTACT</span>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "#fff", marginBottom: "12px" }}>お気軽にご相談ください</h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14.5px", lineHeight: 1.8, marginBottom: "40px" }}>営業時間内に順次ご返信いたします。お急ぎの場合はお電話またはLINEにてご連絡ください。</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* 電話 */}
                <a href="tel:0789122656" style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-lg)", padding: "20px 24px", textDecoration: "none", transition: "background 0.15s" }}>
                  <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", fontFamily: "var(--font-en)", marginBottom: "2px" }}>PHONE</div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-en)" }}>078-912-2656</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>9:00〜19:00</div>
                  </div>
                </a>
                {/* LINE */}
                <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(6,199,85,0.25)", border: "1px solid rgba(6,199,85,0.4)", borderRadius: "var(--radius-lg)", padding: "20px 24px", textDecoration: "none" }}>
                  <div style={{ width: "48px", height: "48px", background: "#06c755", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 2.8 1.8 5.3 4.6 6.7-.1.6-.6 2.4-.7 2.7-.1.4.2.4.4.3.2-.1 2.6-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.3S17.5 2 12 2z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", fontFamily: "var(--font-en)", marginBottom: "2px" }}>LINE</div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>LINEで相談する</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>写真送付で無料診断</div>
                  </div>
                </a>
              </div>
            </div>

            {/* 右：フォーム */}
            <ContactForm />
          </div>
        </div>
        <style>{`
          @media (max-width: 760px) { .contact-layout { grid-template-columns: 1fr !important; } .form-row { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-soft">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "56px", alignItems: "start" }} className="faq-layout">

            {/* 左：スティッキーパネル */}
            <div style={{ position: "sticky", top: "100px" }} className="faq-sticky">
              <span style={{ display: "inline-block", fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.18em", color: "var(--color-primary)", fontWeight: 600, marginBottom: "12px" }}>FAQ</span>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", marginBottom: "16px" }}>よくある<br />ご質問</h2>
              <p style={{ fontSize: "14px", color: "var(--color-text-soft)", lineHeight: 1.8, marginBottom: "32px" }}>
                お客様からよくいただくご質問をまとめました。解決しない場合はお気軽にご連絡ください。
              </p>
              {/* CTAカード */}
              <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "24px", color: "#fff" }}>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "16px", lineHeight: 1.7 }}>
                  解決しないことがあれば、お気軽にご相談ください。
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ justifyContent: "center", fontSize: "14px", padding: "12px 16px" }}>LINEで相談</a>
                  <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "12px 16px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>お問い合わせ</Link>
                </div>
              </div>
            </div>

            {/* 右：アコーディオン */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { q: "診断だけでも来店できますか？", a: "もちろん大丈夫です。診断のみであれば無料です。お気軽にご来店ください。" },
                  { q: "修理にどれくらいかかりますか？", a: "内容により様々です。気になる方は作業前にお尋ねください。お見積りの段階で目安の所要時間をお伝えいたします。" },
                  { q: "WindowsとMac、どちらも対応していますか？", a: "どちらも対応可能です。デスクトップ・ノートPC・一体型など機種は問いません。" },
                  { q: "出張費用はいくらかかりますか？", a: "¥5,500〜となります。エリアにより異なりますので、出張エリアのご案内をご確認ください。" },
                  { q: "着払いで送ってもいいですか？", a: "基本的に不可です。必ず元払いでお送りください。内容によっては可能な場合もありますので、事前にご相談ください。" },
                ].map((item, i) => (
                  <details key={item.q} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 2px 8px rgba(28,60,120,0.06)", border: "1px solid var(--color-border)" }}>
                    <summary style={{ listStyle: "none", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", fontWeight: 600, fontSize: "15px" }}>
                      <span style={{ flexShrink: 0, width: "32px", height: "32px", background: `hsl(${220 + i * 15}, 70%, 50%)`, color: "#fff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "14px" }}>Q</span>
                      {item.q}
                      <svg style={{ marginLeft: "auto", color: "var(--color-text-muted)", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </summary>
                    <div style={{ padding: "0 24px 20px 72px", color: "var(--color-text-soft)", fontSize: "14.5px", lineHeight: 1.85, borderTop: "1px solid var(--color-border)" }}>{item.a}</div>
                  </details>
                ))}
              </div>
              <div style={{ marginTop: "28px" }} className="faq-btn-wrap">
                <Link href="/faq" className="btn btn-outline">FAQをすべて見る →</Link>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 760px) {
            .faq-layout { grid-template-columns: 1fr !important; }
            .faq-sticky { position: static !important; }
            .faq-btn-wrap { text-align: center; }
          }
        `}</style>
      </section>
    </>
  );
}
