import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { getBlogs, getCategories } from "@/lib/microcms";

export const PER_PAGE = 10;
export const FIRST_PAGE_SIZE = 11; // 1ページ目だけ「フィーチャー1+グリッド10」で11件
export const totalPagesFor = (totalCount: number) =>
  totalCount <= FIRST_PAGE_SIZE ? 1 : 1 + Math.ceil((totalCount - FIRST_PAGE_SIZE) / PER_PAGE);
export const offsetFor = (pageNum: number) =>
  pageNum <= 1 ? 0 : FIRST_PAGE_SIZE + (pageNum - 2) * PER_PAGE;
export const limitFor = (pageNum: number) => (pageNum <= 1 ? FIRST_PAGE_SIZE : PER_PAGE);

const catColors: Record<string, string> = {
  "テクノロジー": "#3a73d1",
  "更新情報":     "#2db87a",
  "チュートリアル": "#f5820a",
  "修理":         "#e84a5f",
  "セキュリティ": "#9b59d4",
  "設定":         "#00b4d8",
  "データ":       "#6366f1",
  "お知らせ":     "#2db87a",
};
const defaultColor = "#3a73d1";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const pageHref = (page: number) => (page <= 1 ? "/blog" : `/blog/page/${page}`);

export async function BlogListView({ pageNum }: { pageNum: number }) {
  const [blogsData, categoriesData, latestData] = await Promise.all([
    getBlogs(limitFor(pageNum), offsetFor(pageNum)),
    getCategories(),
    // サイドバーの「最新記事」は常に最新4件を別取得（ページに依存しない）
    getBlogs(4, 0),
  ]);

  const posts = blogsData.contents;
  const categories = categoriesData.contents;
  const latestPosts = latestData.contents;
  const totalCount = blogsData.totalCount;
  const totalPages = totalPagesFor(totalCount);

  // 1ページ目だけ「フィーチャー記事＋グリッド」、2ページ目以降は全部グリッド
  const isFirstPage = pageNum === 1;
  const [featured, ...rest] = isFirstPage ? posts : [undefined as any, ...posts];

  return (
    <>
      <PageHero sub="BLOG" title="ブログ・コラム" crumb="ブログ" lead="パソコンに関するお役立ち情報・症状別の対処法・スタッフからのお知らせを発信しています。" />

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">

          {/* カテゴリフィルター */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            <a href="/blog" style={{ padding: "9px 20px", borderRadius: "999px", background: "linear-gradient(135deg, #3a73d1, #2c5fb8)", color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 10px rgba(44,95,184,0.3)" }}>すべて</a>
            {categories.map((cat) => {
              const color = catColors[cat.name] ?? defaultColor;
              return (
                <a key={cat.id} href={`/blog?category=${cat.id}`} style={{ padding: "9px 20px", borderRadius: "999px", background: color, color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 10px ${color}44`, opacity: 0.9 }}>
                  {cat.name}
                </a>
              );
            })}
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-muted)" }}>
              <p style={{ fontSize: "18px" }}>記事がまだありません</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }} className="blog-layout">

              {/* メイン */}
              <div>
                {/* フィーチャード記事（1ページ目のみ） */}
                {isFirstPage && featured && (
                  <Link href={`/blog/${featured.id}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", textDecoration: "none", marginBottom: "24px", boxShadow: "0 4px 16px rgba(28,60,120,0.08)" }} className="featured-card">
                    <div style={{ position: "relative", minHeight: "260px", background: "var(--color-bg-tint)" }}>
                      {featured.eyecatch ? (
                        <Image src={featured.eyecatch.url} alt={featured.title} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${(catColors[featured.category?.name ?? ""] ?? defaultColor)}22, ${(catColors[featured.category?.name ?? ""] ?? defaultColor)}08)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={catColors[featured.category?.name ?? ""] ?? defaultColor} strokeWidth="1.5" opacity={0.4}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                      )}
                      <span style={{ position: "absolute", top: "16px", left: "16px", background: catColors[featured.category?.name ?? ""] ?? defaultColor, color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>FEATURED</span>
                    </div>
                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
                        {featured.category && (
                          <span style={{ background: catColors[featured.category.name] ?? defaultColor, color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>{featured.category.name}</span>
                        )}
                        <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>{formatDate(featured.publishedAt ?? featured.createdAt)}</span>
                      </div>
                      <h2 style={{ fontSize: "20px", lineHeight: 1.55, color: "var(--color-text)", marginBottom: "14px" }}>{featured.title}</h2>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: catColors[featured.category?.name ?? ""] ?? defaultColor, fontWeight: 700, fontSize: "14px" }}>
                        続きを読む <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </span>
                    </div>
                  </Link>
                )}

                {/* 記事グリッド */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="post-grid">
                  {rest.filter(Boolean).map((post) => {
                    const color = catColors[post.category?.name ?? ""] ?? defaultColor;
                    return (
                      <Link key={post.id} href={`/blog/${post.id}`} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", textDecoration: "none", boxShadow: "0 2px 6px rgba(28,60,120,0.04)" }}>
                        <div style={{ height: "4px", background: color }} />
                        <div style={{ aspectRatio: "16/9", position: "relative", background: `linear-gradient(135deg, ${color}18, ${color}06)` }}>
                          {post.eyecatch ? (
                            <Image src={post.eyecatch.url} alt={post.title} fill style={{ objectFit: "cover" }} />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" opacity={0.35}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </div>
                          )}
                        </div>
                        <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            {post.category && <span style={{ background: color, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>{post.category.name}</span>}
                            <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                          </div>
                          <h3 style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--color-text)", margin: 0 }}>{post.title}</h3>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color, fontWeight: 700, fontSize: "12px", marginTop: "auto" }}>
                            続きを読む <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* ページネーション */}
                {totalPages > 1 && (
                  <nav aria-label="ページネーション" style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center", marginTop: "48px", flexWrap: "wrap" }}>
                    {/* 前へ */}
                    {pageNum > 1 ? (
                      <Link href={pageHref(pageNum - 1)} style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "13px", color: "var(--color-text)", textDecoration: "none", background: "#fff" }} aria-label="前のページ">
                        ‹ 前へ
                      </Link>
                    ) : (
                      <span style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "13px", color: "var(--color-text-muted)", background: "var(--color-bg-tint)", opacity: 0.5 }} aria-disabled>
                        ‹ 前へ
                      </span>
                    )}
                    {/* ページ番号 */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                      const isCurrent = p === pageNum;
                      return isCurrent ? (
                        <span key={p} aria-current="page" style={{ padding: "10px 16px", border: "1px solid var(--color-primary)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "13px", color: "#fff", background: "var(--color-primary)" }}>
                          {p}
                        </span>
                      ) : (
                        <Link key={p} href={pageHref(p)} style={{ padding: "10px 16px", border: "1px solid var(--color-border)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "13px", color: "var(--color-text)", textDecoration: "none", background: "#fff" }}>
                          {p}
                        </Link>
                      );
                    })}
                    {/* 次へ */}
                    {pageNum < totalPages ? (
                      <Link href={pageHref(pageNum + 1)} style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "13px", color: "var(--color-text)", textDecoration: "none", background: "#fff" }} aria-label="次のページ">
                        次へ ›
                      </Link>
                    ) : (
                      <span style={{ padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: "8px", fontFamily: "var(--font-en)", fontWeight: 700, fontSize: "13px", color: "var(--color-text-muted)", background: "var(--color-bg-tint)", opacity: 0.5 }} aria-disabled>
                        次へ ›
                      </span>
                    )}
                  </nav>
                )}
              </div>

              {/* サイドバー */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" }}>
                {/* カテゴリ */}
                <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                  <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, #2db87a, #1a8a58)", color: "#fff" }}>
                    <span style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em" }}>CATEGORIES</span>
                  </div>
                  <div style={{ padding: "8px" }}>
                    {categories.map((cat) => {
                      const color = catColors[cat.name] ?? defaultColor;
                      return (
                        <a key={cat.id} href={`/blog?category=${cat.id}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "6px", fontSize: "14px", color: "var(--color-text)", textDecoration: "none" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                            {cat.name}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* 最新記事（常に最新4件） */}
                <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                  <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, #f5820a, #c96200)", color: "#fff" }}>
                    <span style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em" }}>LATEST POSTS</span>
                  </div>
                  <div style={{ padding: "8px" }}>
                    {latestPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px", borderRadius: "6px", textDecoration: "none" }}>
                        <div style={{ flexShrink: 0, width: "8px", height: "8px", background: catColors[post.category?.name ?? ""] ?? defaultColor, borderRadius: "50%", marginTop: "6px" }} />
                        <div>
                          <div style={{ fontSize: "13.5px", color: "var(--color-text)", lineHeight: 1.55, marginBottom: "4px" }}>{post.title}</div>
                          <div style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-en)" }}>{formatDate(post.publishedAt ?? post.createdAt)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "24px 20px", textAlign: "center" }}>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "16px", lineHeight: 1.7 }}>パソコンでお困りですか？<br />気軽にご相談ください。</p>
                  <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ width: "100%", justifyContent: "center", fontSize: "14px", padding: "12px" }}>LINEで相談</a>
                  <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "11px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>お問い合わせ</Link>
                </div>
              </aside>
            </div>
          )}
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
