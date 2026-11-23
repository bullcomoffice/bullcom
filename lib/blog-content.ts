/**
 * 記事本文（microCMS のリッチテキストHTML）を表示前に補正する。
 *
 * 背景: 2026-08 に一括登録した記事で、Markdown の表とリンクが変換されないまま
 * 本文に残っていた（「| 状況 | 原因 |」「[神戸市](/area/kobe)」がそのまま表示）。
 * 2026-09-29 時点で公開済み23本・予約済み33本が該当。microCMS 側を1本ずつ直すと
 * Webhook で SNS 投稿の処理が走るため、表示時にまとめて補正する。
 */

const BR = /<br\s*\/?>/i;
const ROW = /^\|.*\|$/;
const SEP = /^\|(\s*:?-{3,}:?\s*\|)+$/;

function cells(row: string): string[] {
  return row.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function toTable(rows: string[]): string {
  const [head, , ...body] = rows;
  const th = cells(head).map((c) => `<th>${c}</th>`).join("");
  const tr = body.map((r) => `<tr>${cells(r).map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

/** 段落内の「| a | b |」の行（<br>区切り）を表に変換する。表が無ければ null */
function tablesInParagraph(inner: string): string | null {
  const lines = inner.split(BR);
  if (!lines.some((l) => SEP.test(l.trim()))) return null;

  const out: string[] = [];
  let buf: string[] = [];
  const flush = () => {
    const text = buf.join("<br>").replace(/^(\s*<br>)+/, "").replace(/(<br>\s*)+$/, "").trim();
    if (text) out.push(`<p>${text}</p>`);
    buf = [];
  };

  for (let i = 0; i < lines.length; ) {
    if (ROW.test(lines[i].trim()) && i + 1 < lines.length && SEP.test(lines[i + 1].trim())) {
      let j = i + 2;
      while (j < lines.length && ROW.test(lines[j].trim())) j++;
      flush();
      out.push(toTable(lines.slice(i, j).map((l) => l.trim())));
      i = j;
    } else {
      buf.push(lines[i]);
      i++;
    }
  }
  flush();
  return out.join("");
}

function isInternal(href: string): boolean {
  return href.startsWith("/") || /^https:\/\/bullcom\.jp(\/|$)/.test(href);
}

export function fixBlogContent(html: string): string {
  if (!html) return html;

  let out = html.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner: string) => tablesInParagraph(inner) ?? m);

  // [テキスト](URL) → リンク
  out = out.replace(
    /\[([^\]\n<>]{1,100})\]\((\/[^)\s"<>]*|https?:\/\/[^)\s"<>]+)\)/g,
    (_, text: string, href: string) =>
      isInternal(href) ? `<a href="${href}">${text}</a>` : `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`,
  );

  // 自サイト内リンクの nofollow・別タブを外す（旧変換スクリプトが全リンクに付けていた）
  out = out.replace(/<a href="([^"]*)" target="_blank" rel="noopener noreferrer nofollow">/g, (m, href: string) =>
    isInternal(href) ? `<a href="${href}">` : m,
  );

  // **太字** → <strong>（リッチエディタに Markdown の記号が残っている記事がある・2026-11-15 時点で26本）
  out = out.replace(/\*\*([^*<>\n]{1,80})\*\*/g, "<strong>$1</strong>");

  // 横に長い表はスマホで横スクロールできるようにする
  out = out.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");

  return out;
}

// 記事の途中に置く相談ボタン（A-37・2026-11-23）
// 記事末尾のボタン（ArticleCta）は2週続けてタップ0だった一方、/boot-repair の途中に置いたボタン（A-35）は1週で4件押された。
// 読み進めて「自分では無理そう」と感じた位置で相談できるよう、2つ目の見出し（h2）の直前に差し込む。
// meta description の生成（buildDescription）には fixBlogContent を使うので、ボタンの文言が混ざらないよう表示時だけ別に呼ぶ。
// タップは layout.tsx の計測が data-*-loc を読む（link_location = blog-mid）。
const MID_CTA_HTML =
  '<aside class="blog-mid-cta" aria-label="ご相談の窓口">' +
  '<p class="blog-mid-cta__lead">うまくいかないとき・自分で触るのが不安なときは、ご相談ください</p>' +
  '<p class="blog-mid-cta__note">持ち込み診断無料／神戸・明石は出張（一律¥5,500〜）／遠方の方は配送修理（全国対応）</p>' +
  '<div class="blog-mid-cta__actions">' +
  '<a href="tel:0789122656" data-tel-loc="blog-mid" class="blog-mid-cta__btn blog-mid-cta__btn--tel">電話で相談 078-912-2656</a>' +
  '<a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" data-line-loc="blog-mid" class="blog-mid-cta__btn blog-mid-cta__btn--line">LINEで相談</a>' +
  '<a href="/contact" class="blog-mid-cta__btn blog-mid-cta__btn--form">フォームで相談</a>' +
  "</div></aside>";

export function insertMidCta(html: string): string {
  if (!html) return html;
  const first = html.indexOf("<h2");
  if (first < 0) return html;
  const second = html.indexOf("<h2", first + 3);
  // 見出しが1つしかない短い記事は、末尾のボタンだけで足りる
  if (second < 0) return html;
  return html.slice(0, second) + MID_CTA_HTML + html.slice(second);
}
