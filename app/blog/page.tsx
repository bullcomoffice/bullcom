import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "ブログ・コラム",
  description: "パソコン修理・設定に関するお役立ち情報・コラム。",
};

const catColors: Record<string, string> = {
  "修理": "#e84a5f",
  "セキュリティ": "#f5820a",
  "設定": "#3a73d1",
  "データ": "#9b59d4",
  "お知らせ": "#2db87a",
};

const posts = [
  { tag: "修理", date: "2026.04.28", title: "突然パソコンが起動しない？まず確認したい3つのチェックポイント", excerpt: "電源ボタンを押しても反応がないとき、修理に出す前に試したい確認手順をまとめました。まずは基本的なところから確認していきましょう。" },
  { tag: "セキュリティ", date: "2026.04.20", title: "怪しいメールを開いてしまったら—被害を最小限にする初動対応", excerpt: "フィッシングメールのリンクをクリックしてしまった、添付ファイルを開いてしまった場合の初動対応を解説します。" },
  { tag: "設定", date: "2026.04.12", title: "新しいパソコンに買い替え。データ移行のベストな手順とは", excerpt: "買い替え時に悩むのがデータ移行。手段ごとのメリット・デメリットを比較します。" },
  { tag: "修理", date: "2026.04.05", title: "パソコンの動作が遅い…原因と自分でできる対策", excerpt: "「最近遅くなった気がする」原因はストレージ・メモリ・常駐ソフト等さまざまです。" },
  { tag: "データ", date: "2026.03.28", title: "外付けHDDが認識しない！壊れる前にやるべきこと", excerpt: "外付けHDDが認識しなくなった時、データを救う可能性を高める対応とは。" },
  { tag: "お知らせ", date: "2026.03.20", title: "ゴールデンウィーク期間中の営業について", excerpt: "2026年のGW期間中の営業日・休業日のお知らせです。" },
];

const categories = [
  { label: "修理", count: 12 },
  { label: "設定", count: 8 },
  { label: "セキュリティ", count: 6 },
  { label: "データ", count: 5 },
  { label: "お知らせ", count: 4 },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero sub="BLOG" title="ブログ・コラム" crumb="ブログ" lead="パソコンに関するお役立ち情報・症状別の対処法・スタッフからのお知らせを発信しています。" />

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          {/* ===== カテゴリフィルター ===== */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            <a href="#" style={{ padding: "9px 20px", borderRadius: "999px", background: "linear-gradient(135deg, #3a73d1, #2c5fb8)", color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 10px rgba(44,95,184,0.3)" }}>すべて</a>
            {categories.map((cat) => (
              <a key={cat.label} href="#" style={{ padding: "9px 20px", borderRadius: "999px", background: "#fff", border: `1.5px solid ${catColors[cat.label]}44`, color: catColors[cat.label], fontSize: "13px", fontWeight: 700, textDecoration: "none", transition: "all 0.15s" }}>
                {cat.label}
                <span style={{ marginLeft: "6px", fontFamily: "var(--font-en)", fontSize: "11px", opacity: 0.7 }}>{cat.count}</span>
              </a>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }} className="blog-layout">

            {/* ===== メイン ===== */}
            <div>
              {/* フィーチャード記事 */}
              <a href="#" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", textDecoration: "none", marginBottom: "24px", boxShadow: "0 4px 16px rgba(28,60,120,0.08)", transition: "transform 0.18s, box-shadow 0.18s" }} className="featured-card">
                {/* サムネイル */}
                <div style={{ background: `linear-gradient(135deg, ${catColors[featured.tag]}22, ${catColors[featured.tag]}08)`, position: "relative", minHeight: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", padding: "32px" }}>
                    <div style={{ width: "72px", height: "72px", background: catColors[featured.tag], borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", margin: "0 auto 16px", boxShadow: `0 8px 20px ${catColors[featured.tag]}44` }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </div>
                    <span style={{ fontFamily: "var(--font-en)", fontSize: "11px", fontWeight: 700, color: catColors[featured.tag], letterSpacing: "0.1em" }}>FEATURED</span>
                  </div>
                </div>
                {/* テキスト */}
                <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ background: catColors[featured.tag], color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>{featured.tag}</span>
                    <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>{featured.date}</span>
                  </div>
                  <h2 style={{ fontSize: "20px", lineHeight: 1.55, color: "var(--color-text)", marginBottom: "14px" }}>{featured.title}</h2>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", lineHeight: 1.8, margin: "0 0 20px" }}>{featured.excerpt}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: catColors[featured.tag], fontWeight: 700, fontSize: "14px" }}>
                    続きを読む
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                </div>
              </a>

              {/* 記事グリッド */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="post-grid">
                {rest.map((post) => {
                  const color = catColors[post.tag] || "var(--color-primary)";
                  return (
                    <a key={post.title} href="#" style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", transition: "transform 0.18s, box-shadow 0.18s", display: "flex", flexDirection: "column", textDecoration: "none", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                      {/* カラーバー */}
                      <div style={{ height: "4px", background: color }} />
                      {/* サムネイル */}
                      <div style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, ${color}18, ${color}06)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "48px", height: "48px", background: color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: 0.8 }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                      </div>
                      {/* テキスト */}
                      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ background: color, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>{post.tag}</span>
                          <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>{post.date}</span>
                        </div>
                        <h3 style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--color-text)", margin: 0 }}>{post.title}</h3>
                        <p style={{ fontSize: "12.5px", color: "var(--color-text-soft)", margin: 0, lineHeight: 1.7 }}>{post.excerpt}</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color, fontWeight: 700, fontSize: "12px", marginTop: "auto" }}>
                          続きを読む <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* ページネーション */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "48px", alignItems: "center" }}>
                <a href="#" style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text-muted)", background: "#fff", textDecoration: "none" }}>←</a>
                {["1", "2", "3"].map((p, i) => (
                  <a key={p} href="#" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid", borderColor: i === 0 ? "var(--color-primary)" : "var(--color-border)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, color: i === 0 ? "#fff" : "var(--color-text-soft)", background: i === 0 ? "var(--color-primary)" : "#fff", textDecoration: "none" }}>{p}</a>
                ))}
                <a href="#" style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text-muted)", background: "#fff", textDecoration: "none" }}>→</a>
              </div>
            </div>

            {/* ===== サイドバー ===== */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" }}>

              {/* 検索 */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", color: "#fff" }}>
                  <span style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em" }}>SEARCH</span>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex" }}>
                    <input type="search" placeholder="キーワード検索" style={{ flex: 1, padding: "10px 12px", border: "1px solid var(--color-border)", borderRadius: "6px 0 0 6px", fontSize: "14px" }} />
                    <button style={{ background: "var(--color-primary)", color: "#fff", padding: "0 16px", borderRadius: "0 6px 6px 0", cursor: "pointer", border: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* カテゴリ */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, #2db87a, #1a8a58)", color: "#fff" }}>
                  <span style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em" }}>CATEGORIES</span>
                </div>
                <div style={{ padding: "8px" }}>
                  {categories.map((cat) => (
                    <a key={cat.label} href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "6px", fontSize: "14px", color: "var(--color-text)", textDecoration: "none", transition: "background 0.15s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: catColors[cat.label], flexShrink: 0 }} />
                        {cat.label}
                      </div>
                      <span style={{ background: `${catColors[cat.label]}18`, color: catColors[cat.label], fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "12px", padding: "2px 8px", borderRadius: "999px" }}>{cat.count}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 最新記事 */}
              <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, #f5820a, #c96200)", color: "#fff" }}>
                  <span style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em" }}>LATEST POSTS</span>
                </div>
                <div style={{ padding: "8px" }}>
                  {posts.slice(0, 4).map((post) => (
                    <a key={post.title} href="#" style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px", borderRadius: "6px", textDecoration: "none", transition: "background 0.15s" }}>
                      <div style={{ flexShrink: 0, width: "8px", height: "8px", background: catColors[post.tag], borderRadius: "50%", marginTop: "6px" }} />
                      <div>
                        <div style={{ fontSize: "13.5px", color: "var(--color-text)", lineHeight: 1.55, marginBottom: "4px" }}>{post.title}</div>
                        <div style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>{post.date}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTAバナー */}
              <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "24px 20px", textAlign: "center" }}>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "16px", lineHeight: 1.7 }}>
                  パソコンでお困りですか？<br />気軽にご相談ください。
                </p>
                <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ width: "100%", justifyContent: "center", fontSize: "14px", padding: "12px" }}>LINEで相談</a>
                <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "11px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>お問い合わせ</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .blog-layout { grid-template-columns: 1fr !important; }
          .post-grid { grid-template-columns: 1fr !important; }
          .featured-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
