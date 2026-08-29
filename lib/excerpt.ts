/**
 * 記事本文（リッチテキストHTML）から meta description 用の抜粋を作る。
 *
 * 背景: 全記事で microCMS の description が空のまま、コード側が
 * `description: blog.title` としていたため、検索結果でタイトルとスニペットが
 * 同一文言になっていた（2026-08-17 の週次チェックで検出）。
 * 「雷 パソコン 使いたい」等、順位9台で224表示ありながらCTR 0%だった一因。
 */

const MAX_LEN = 120;

/** HTMLタグ・実体参照を除去して素のテキストにする */
function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * meta description を決める。
 * microCMS の description が入っていればそれを優先し、無ければ本文から抜粋する。
 */
export function buildDescription(blog: { title: string; content: string; description?: string }): string {
  const manual = blog.description?.trim();
  if (manual) return manual.slice(0, MAX_LEN);

  const text = stripHtml(blog.content ?? "");
  if (!text) return blog.title;

  if (text.length <= MAX_LEN) return text;

  // 句点で切って文の途中で終わらないようにする
  const cut = text.slice(0, MAX_LEN);
  const lastPeriod = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("！"), cut.lastIndexOf("？"));
  if (lastPeriod >= 60) return cut.slice(0, lastPeriod + 1);
  return cut + "…";
}
