import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "ブログ・コラム",
  description: "パソコン修理・設定に関するお役立ち情報・コラム。",
};

const posts = [
  { tag: "修理", date: "2026.04.28", title: "突然パソコンが起動しない？まず確認したい3つのチェックポイント", excerpt: "電源ボタンを押しても反応がないとき、修理に出す前に試したい確認手順をまとめました…" },
  { tag: "セキュリティ", date: "2026.04.20", title: "怪しいメールを開いてしまったら—被害を最小限にする初動対応", excerpt: "フィッシングメールのリンクをクリックしてしまった、添付ファイルを開いてしまった…" },
  { tag: "設定", date: "2026.04.12", title: "新しいパソコンに買い替え。データ移行のベストな手順とは", excerpt: "買い替え時に悩むのがデータ移行。手段ごとのメリット・デメリットを比較…" },
  { tag: "修理", date: "2026.04.05", title: "パソコンの動作が遅い…原因と自分でできる対策", excerpt: "「最近遅くなった気がする」原因はストレージ・メモリ・常駐ソフト等さまざま…" },
  { tag: "データ", date: "2026.03.28", title: "外付けHDDが認識しない！壊れる前にやるべきこと", excerpt: "外付けHDDが認識しなくなった時、データを救う可能性を高める対応とは…" },
  { tag: "お知らせ", date: "2026.03.20", title: "ゴールデンウィーク期間中の営業について", excerpt: "2026年のGW期間中の営業日・休業日のお知らせです…" },
];

const categories = [
  { label: "修理", count: 12 }, { label: "設定", count: 8 },
  { label: "セキュリティ", count: 6 }, { label: "データ", count: 5 }, { label: "お知らせ", count: 4 },
];

export default function BlogPage() {
  return (
    <>
      <PageHero sub="BLOG" title="ブログ・コラム" crumb="ブログ" lead="パソコンに関するお役立ち情報・症状別の対処法・スタッフからのお知らせなどを発信しています。" />

      <section>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "56px", alignItems: "start" }} className="blog-layout">
            {/* メイン */}
            <div>
              {/* カテゴリ */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
                {["すべて", "修理", "設定", "セキュリティ", "データ", "お知らせ"].map((cat, i) => (
                  <a key={cat} href="#" style={{ padding: "8px 16px", border: "1.5px solid", borderColor: i === 0 ? "var(--color-primary)" : "var(--color-border)", borderRadius: "999px", background: i === 0 ? "var(--color-primary)" : "#fff", color: i === 0 ? "#fff" : "var(--color-text-soft)", fontSize: "13px", fontWeight: 600 }}>{cat}</a>
                ))}
              </div>

              {/* 記事グリッド */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="post-grid">
                {posts.map((post) => (
                  <a key={post.title} href="#" style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.18s", display: "flex", flexDirection: "column", textDecoration: "none" }}>
                    <div style={{ aspectRatio: "16/10", background: "repeating-linear-gradient(135deg, #e8eef7 0 12px, #dee6f3 12px 24px)", position: "relative" }}>
                      <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',monospace", fontSize: "11px", color: "rgba(44,95,184,0.5)", letterSpacing: "0.2em" }}>BLOG IMAGE</span>
                    </div>
                    <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>
                        <span className="tag">{post.tag}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 style={{ fontSize: "17px", lineHeight: 1.6, color: "var(--color-text)" }}>{post.title}</h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-soft)", margin: 0 }}>{post.excerpt}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* ページネーション */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "48px" }}>
                {["1", "2", "3", "→"].map((p, i) => (
                  <a key={p} href="#" style={{ padding: "10px 16px", border: "1px solid", borderColor: i === 0 ? "var(--color-primary)" : "var(--color-border)", borderRadius: "6px", fontFamily: "var(--font-en)", fontWeight: 600, color: i === 0 ? "#fff" : "var(--color-text-soft)", background: i === 0 ? "var(--color-primary)" : "#fff" }}>{p}</a>
                ))}
              </div>
            </div>

            {/* サイドバー */}
            <aside>
              {/* 検索 */}
              <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "22px", marginBottom: "20px" }}>
                <h4 style={{ fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.1em", color: "var(--color-primary-dark)", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid var(--color-border)" }}>SEARCH</h4>
                <div style={{ display: "flex" }}>
                  <input type="search" placeholder="キーワード検索" style={{ flex: 1, padding: "10px 12px", border: "1px solid var(--color-border)", borderRadius: "6px 0 0 6px", fontSize: "14px" }} />
                  <button style={{ background: "var(--color-primary)", color: "#fff", padding: "0 16px", borderRadius: "0 6px 6px 0", cursor: "pointer" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                  </button>
                </div>
              </div>

              {/* カテゴリ */}
              <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "22px", marginBottom: "20px" }}>
                <h4 style={{ fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.1em", color: "var(--color-primary-dark)", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid var(--color-border)" }}>CATEGORIES</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {categories.map((cat) => (
                    <a key={cat.label} href="#" style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderRadius: "6px", fontSize: "14px", color: "var(--color-text)" }}>
                      {cat.label} <span style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-en)", fontSize: "12px" }}>{cat.count}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 最新記事 */}
              <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "22px" }}>
                <h4 style={{ fontFamily: "var(--font-en)", fontSize: "13px", letterSpacing: "0.1em", color: "var(--color-primary-dark)", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid var(--color-border)" }}>LATEST POSTS</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {posts.slice(0, 3).map((post) => (
                    <li key={post.title}>
                      <a href="#" style={{ fontSize: "13.5px", color: "var(--color-text)", display: "block", lineHeight: 1.6 }}>
                        {post.title}
                        <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)", display: "block", marginTop: "4px" }}>{post.date}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .blog-layout { grid-template-columns: 1fr !important; } .post-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
