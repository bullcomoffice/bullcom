import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogById, getBlogs } from "@/lib/microcms";
import PageHero from "@/components/ui/PageHero";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { contents } = await getBlogs(100);
  return contents.map((blog) => ({ slug: blog.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogById(slug);
  const ogImage = blog.eyecatch?.url ?? "/og-image.jpg";
  return {
    title: blog.title,
    description: blog.title,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.title,
      url: `https://bullcom.jp/blog/${slug}`,
      siteName: "BULLCOM（ブルコム）パソコン修理",
      locale: "ja_JP",
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.title,
      images: [ogImage],
    },
  };
}

const catColors: Record<string, string> = {
  "修理": "#e84a5f",
  "セキュリティ": "#f5820a",
  "設定": "#3a73d1",
  "データ": "#9b59d4",
  "お知らせ": "#2db87a",
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogById(slug);
  const color = catColors[blog.category?.name ?? ""] ?? "#3a73d1";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://bullcom.jp" },
      { "@type": "ListItem", "position": 2, "name": "ブログ", "item": "https://bullcom.jp/blog" },
      { "@type": "ListItem", "position": 3, "name": blog.title, "item": `https://bullcom.jp/blog/${slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.eyecatch?.url ?? "https://bullcom.jp/og-image.jpg",
    "datePublished": blog.publishedAt ?? blog.createdAt,
    "dateModified": blog.updatedAt ?? blog.publishedAt ?? blog.createdAt,
    "author": {
      "@type": "Organization",
      "name": "BULLCOM（ブルコム）パソコン修理",
      "url": "https://bullcom.jp",
    },
    "publisher": {
      "@type": "Organization",
      "name": "BULLCOM（ブルコム）パソコン修理",
      "url": "https://bullcom.jp",
    },
    "url": `https://bullcom.jp/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* ヒーロー */}
      <section style={{ background: `linear-gradient(135deg, #1e3a6f, #2c5fb8)`, padding: "64px 0 56px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* パンくず */}
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>トップ</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity={0.5}><polyline points="9 18 15 12 9 6"/></svg>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ブログ</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity={0.5}><polyline points="9 18 15 12 9 6"/></svg>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>記事</span>
          </div>
          {/* カテゴリ・日付 */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
            {blog.category && (
              <span style={{ background: color, color: "#fff", padding: "5px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 700 }}>{blog.category.name}</span>
            )}
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-en)" }}>{formatDate(blog.publishedAt ?? blog.createdAt)}</span>
          </div>
          {/* タイトル */}
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#fff", maxWidth: "800px", lineHeight: 1.4 }}>{blog.title}</h1>
        </div>
      </section>

      {/* 本文 */}
      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "48px", alignItems: "start" }} className="article-layout">

            {/* 記事本文 */}
            <article>
              {/* アイキャッチ */}
              {blog.eyecatch && (
                <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "40px", aspectRatio: "16/9", position: "relative" }}>
                  <Image src={blog.eyecatch.url} alt={blog.title} fill style={{ objectFit: "cover" }} />
                </div>
              )}

              {/* 本文 */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "40px", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}
              />

              {/* 戻るボタン */}
              <div style={{ marginTop: "40px" }}>
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", fontWeight: 600, textDecoration: "none", fontSize: "15px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  ブログ一覧へ戻る
                </Link>
              </div>
            </article>

            {/* サイドバー */}
            <aside style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "24px 20px" }}>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "16px", lineHeight: 1.7 }}>パソコンでお困りですか？<br />気軽にご相談ください。</p>
                <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ width: "100%", justifyContent: "center", fontSize: "14px", padding: "12px" }}>LINEで相談</a>
                <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "11px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>お問い合わせ</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .blog-content h2 { font-size: 22px; margin: 32px 0 16px; padding-bottom: 10px; border-bottom: 2px solid var(--color-primary-light); }
        .blog-content h3 { font-size: 18px; margin: 24px 0 12px; }
        .blog-content p { margin: 0 0 16px; line-height: 1.9; color: var(--color-text-soft); }
        .blog-content ul, .blog-content ol { padding-left: 24px; margin: 0 0 16px; line-height: 2; color: var(--color-text-soft); }
        .blog-content img { border-radius: var(--radius); max-width: 100%; height: auto; margin: 24px 0; }
        .blog-content a { color: var(--color-primary); }
        .blog-content strong { color: var(--color-text); }
        .blog-content code { background: var(--color-bg-tint); padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: monospace; }
        .blog-content blockquote { border-left: 4px solid var(--color-primary-light); padding: 12px 20px; margin: 16px 0; background: var(--color-bg-soft); border-radius: 0 var(--radius) var(--radius) 0; color: var(--color-text-soft); }
        @media (max-width: 900px) { .article-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
