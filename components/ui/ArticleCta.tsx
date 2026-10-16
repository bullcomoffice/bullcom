import Link from "next/link";

// ブログ記事の本文直後に置く問い合わせ導線。
// サイドバーの CTA はスマホでは「ブログ一覧へ戻る」より下に落ちて読まれないため、
// 読み終えた位置で電話・LINE・リモート・郵送（エリア外の方）を案内する。
// 料金・条件の文言はサービス・料金ページの記載に合わせる。
const items = [
  {
    key: "tel",
    label: "電話で相談",
    main: "078-912-2656",
    sub: "受付 9:00〜19:00",
    href: "tel:0789122656",
    color: "#2c5fb8",
  },
  {
    key: "line",
    label: "LINEで相談",
    main: "写真を送るだけ",
    sub: "24時間受付・返信は営業時間内",
    href: "https://lin.ee/vX5z2Xf",
    color: "#06c755",
  },
  {
    key: "remote",
    label: "リモートサポート",
    main: "画面を見ながら遠隔で",
    sub: "設定やソフトの困りごとに",
    href: "/services",
    color: "#6366f1",
  },
  {
    key: "mail",
    label: "郵送修理（全国対応）",
    main: "遠方の方はこちら",
    sub: "お見積り後に作業します",
    href: "/price",
    color: "#2db87a",
  },
];

export default function ArticleCta() {
  return (
    <section aria-labelledby="article-cta-title" className="article-cta">
      <p id="article-cta-title" className="article-cta__title">パソコンのお困りごと、BULLCOMにご相談ください</p>
      <p className="article-cta__lead">神戸市西区の店舗で、持ち込み診断は無料です。来店が難しい方は出張・リモート・郵送でも承ります。</p>
      <div className="article-cta__grid">
        {items.map((item) => {
          const body = (
            <>
              <span className="article-cta__label" style={{ color: item.color }}>{item.label}</span>
              <span className="article-cta__main">{item.main}</span>
              <span className="article-cta__sub">{item.sub}</span>
            </>
          );
          const style = { borderTop: `4px solid ${item.color}` };
          if (item.href.startsWith("/")) {
            return <Link key={item.key} href={item.href} className="article-cta__item" style={style}>{body}</Link>;
          }
          const external = item.href.startsWith("http");
          return (
            <a
              key={item.key}
              href={item.href}
              className="article-cta__item"
              style={style}
              {...(item.key === "tel" ? { "data-tel-loc": "blog-article" } : {})}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {body}
            </a>
          );
        })}
      </div>
      <p className="article-cta__form">
        内容を詳しく伝えたい方は<Link href="/contact">お問い合わせフォーム</Link>から（24時間受付）
      </p>
      <style>{`
        .article-cta { margin-top: 32px; background: #fff; border-radius: var(--radius-lg); padding: 32px; border: 1px solid var(--color-border); box-shadow: 0 2px 8px rgba(28,60,120,0.04); }
        .article-cta__title { font-size: 20px; font-weight: 700; color: var(--color-text); margin: 0 0 8px; }
        .article-cta__lead { font-size: 14px; line-height: 1.8; color: var(--color-text-soft); margin: 0 0 20px; }
        .article-cta__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .article-cta__item { display: flex; flex-direction: column; gap: 4px; padding: 16px 18px; background: var(--color-bg-soft); border-radius: var(--radius); text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; }
        .article-cta__item:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(28,60,120,0.08); }
        .article-cta__label { font-size: 13px; font-weight: 700; }
        .article-cta__main { font-size: 18px; font-weight: 800; color: var(--color-text); line-height: 1.4; }
        .article-cta__sub { font-size: 12px; color: var(--color-text-soft); }
        .article-cta__form { margin: 16px 0 0; font-size: 14px; color: var(--color-text-soft); }
        .article-cta__form a { color: var(--color-primary); font-weight: 600; }
        @media (max-width: 600px) {
          .article-cta { padding: 24px 18px; }
          .article-cta__title { font-size: 18px; }
          .article-cta__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
