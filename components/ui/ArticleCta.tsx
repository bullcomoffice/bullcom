import Link from "next/link";

// ブログ記事の本文直後に置く問い合わせ導線。
// サイドバーの CTA はスマホでは「ブログ一覧へ戻る」より下に落ちて読まれないため、
// 読み終えた位置で電話とフォームを案内する（LINE はスマホの追従ボタンがある）。
// 文言はサービス・料金・お問い合わせページの記載に合わせる。
export default function ArticleCta() {
  return (
    <section aria-labelledby="article-cta-title" className="article-cta">
      <div className="article-cta__eyebrow" aria-hidden="true"><b /> SUPPORT DESK</div>
      <p id="article-cta-title" className="article-cta__title">パソコンの不調、ご相談ください</p>
      {/* リモートサポートは当社でPCを購入した方と年間契約者だけが対象（/remote）。単発の相談先と誤解されないよう書かない。
          読者の多くは全国からなので、遠方の人に向けて郵送修理を出す */}
      <p className="article-cta__lead">持ち込み診断無料。神戸・明石は出張、遠方の方は郵送修理（全国対応）で承ります。</p>
      <div className="article-cta__actions">
        <a href="tel:0789122656" data-tel-loc="blog-article" className="article-cta__btn article-cta__btn--tel">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span className="article-cta__btn-text">
            <small>電話 9:00〜19:00</small>
            <strong>078-912-2656</strong>
          </span>
          <svg className="article-cta__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <Link href="/contact" className="article-cta__btn article-cta__btn--form">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></svg>
          <span className="article-cta__btn-text">
            <small>24時間受付</small>
            <strong>フォームで相談</strong>
          </span>
          <svg className="article-cta__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </div>
      <style>{`
        .article-cta { position: relative; overflow: hidden; margin-top: 32px; padding: 36px 40px; border-radius: var(--radius-lg); background-color: #0b2853; background-image: linear-gradient(135deg, rgba(9,31,68,.95), rgba(18,77,156,.9)), linear-gradient(to right, rgba(143,204,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(143,204,255,.08) 1px, transparent 1px); background-size: auto, 28px 28px, 28px 28px; box-shadow: var(--shadow-lg); }
        .article-cta::before { content: ""; position: absolute; width: 300px; height: 300px; right: -110px; top: -150px; border: 1px solid rgba(142,201,255,.3); border-radius: 50%; box-shadow: 0 0 0 44px rgba(112,177,255,.06), 0 0 0 88px rgba(112,177,255,.04); pointer-events: none; }
        .article-cta > * { position: relative; }
        .article-cta__eyebrow { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; padding: 4px 10px; border: 1px solid rgba(147,209,255,.35); border-radius: 999px; background: rgba(3,23,55,.5); color: #b9ddff; font-family: "SF Mono", "Menlo", Consolas, monospace; font-size: 11px; font-weight: 700; letter-spacing: .12em; }
        .article-cta__eyebrow b { width: 7px; height: 7px; border-radius: 50%; background: #55dfa4; box-shadow: 0 0 0 3px rgba(85,223,164,.25); }
        .article-cta__title { margin: 0 0 6px; color: #fff; font-family: var(--font-display); font-size: 24px; font-weight: 700; line-height: 1.4; }
        .article-cta__lead { margin: 0 0 24px; color: #cfe0fa; font-size: 14px; line-height: 1.6; }
        .article-cta__actions { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .article-cta__btn { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 14px; color: #fff; text-decoration: none; transition: transform .15s, box-shadow .15s, background .15s; }
        .article-cta__btn:hover { color: #fff; transform: translateY(-2px); }
        .article-cta__btn--tel { background: linear-gradient(135deg, #3d8bff, #1f5fd0); box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 10px 24px rgba(10,40,100,.45); }
        .article-cta__btn--tel:hover { box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 14px 30px rgba(10,40,100,.55); }
        .article-cta__btn--form { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.4); backdrop-filter: blur(4px); }
        .article-cta__btn--form:hover { background: rgba(255,255,255,.16); }
        .article-cta__btn svg { flex-shrink: 0; }
        .article-cta__arrow { margin-left: auto; opacity: .7; transition: transform .15s; }
        .article-cta__btn:hover .article-cta__arrow { transform: translateX(3px); opacity: 1; }
        .article-cta__btn-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
        .article-cta__btn-text small { font-size: 11px; color: rgba(255,255,255,.75); }
        .article-cta__btn-text strong { font-size: 18px; font-weight: 800; white-space: nowrap; }
        .article-cta__btn--tel strong { font-family: var(--font-en); letter-spacing: .02em; }
        @media (max-width: 600px) {
          .article-cta { margin-top: 20px; padding: 20px 16px; }
          .article-cta__eyebrow { margin-bottom: 8px; font-size: 10px; }
          .article-cta__title { font-size: 18px; margin-bottom: 4px; }
          .article-cta__lead { font-size: 12px; margin-bottom: 14px; }
          .article-cta__actions { gap: 8px; }
          .article-cta__btn { gap: 8px; padding: 12px 10px; border-radius: 12px; }
          .article-cta__btn svg { width: 18px; height: 18px; }
          .article-cta__arrow { display: none; }
          .article-cta__btn-text small { font-size: 10px; }
          .article-cta__btn-text strong { font-size: 14px; }
        }
      `}</style>
    </section>
  );
}
