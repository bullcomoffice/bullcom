/**
 * お問い合わせが「どのページから来た人か」を、フォームの送信内容に載せるための記録。
 *
 * 背景：10月の月報で「アクセスは増えたが、問い合わせがどの記事から来たか分からない」状態だった。
 * GA4 の generate_lead だけでは流入記事とメールの中身を突き合わせられないので、
 * 最初に開いたページ（検索から着地した記事）と、フォームの直前に見ていたページを
 * sessionStorage に残し、フォームの隠し項目としてメールに入れる（bullcom.org と同じ仕組み）。
 * タブを閉じれば消える。サーバーや Cookie には何も残さない。
 */

const STORAGE_KEY = "bullcom_visit_source";

export type VisitSource = {
  /** セッションで最初に開いたページ */
  landing: string;
  /** 最初のページに来る前のサイト（検索エンジンなど）。直接来た場合は空 */
  referrer: string;
  /** お問い合わせページ以外で最後に見たページ */
  last: string;
};

/** フォームの直前ページとして数えないページ（送信完了はページ遷移しないので /contact だけ） */
const SKIP_PATHS = ["/contact"];

function read(): VisitSource | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VisitSource) : null;
  } catch {
    return null;
  }
}

function referrerHost(): string {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? "" : host;
  } catch {
    return "";
  }
}

/** bullcom.jp の正規形は末尾スラッシュ無し（ルートだけ "/"） */
function normalize(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/** ページを開くたびに呼ぶ */
export function recordPageView(pathname: string) {
  const path = normalize(pathname);
  const current = read() ?? { landing: path, referrer: referrerHost(), last: "" };
  if (!SKIP_PATHS.includes(path)) current.last = path;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // プライベートブラウズ等で使えない場合は記録しない
  }
}

/** フォームに載せる値。記録が無ければ null */
export function readVisitSource(): VisitSource | null {
  return read();
}
