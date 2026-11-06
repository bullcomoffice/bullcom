import Link from "next/link";

// トップのヒーロー直下に置く緊急の告知。
// 2026年10月末から Windows 11 の自動修復ループの持ち込みが続いているため、詳しい案内（/boot-repair）へつなぐ。
// 落ち着いたら外す（ヒーロー直下に恒常的に置くものではない）。
// 右の黒い画面は、実際のエラー画面を文字で再現したもの（同じ画面の人が「これだ」と気づけるように。/boot-repair と同じ表示）。
export default function BootRepairBanner() {
  return (
    <section className="boot-banner" aria-labelledby="boot-banner-title">
      <div className="container">
        <Link href="/boot-repair" className="boot-banner__card">
          <span className="boot-banner__tag">急増中</span>
          <p id="boot-banner-title" className="boot-banner__title">
            Windows 11 が起動しない<br />
            「デバイスで問題が発生したため、<br />修復できませんでした」
          </p>
          <div className="boot-banner__screen" role="img" aria-label="「デバイスで問題が発生したため、修復できませんでした。」と表示された画面">
            <p>デバイスで問題が発生したため、修復できませんでした。</p>
            <p>その他の回復オプションを表示するには、クリックまたは Enter キーを押します。</p>
            <p className="boot-banner__screen-log">ログ ファイル: C:\WINDOWS\System32\Logfiles\Srt\SrtTrail.txt</p>
          </div>
          <p className="boot-banner__lead">
            2026年10月末から同じ症状のご相談が続いています。当社では<strong>初期化せず・データそのまま</strong>で修復した実績があります。
            修理料金 <strong>16,500円（税込）</strong>、直らなければ料金はかかりません。
          </p>
          <span className="boot-banner__more">
            症状と修理の詳しいご案内
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </Link>
      </div>
      <style>{`
        .boot-banner { background: #fff; padding: 28px 0; border-bottom: 1px solid var(--color-border); }
        .boot-banner__card {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); column-gap: 28px; row-gap: 10px;
          grid-template-areas: "tag screen" "title screen" "lead screen" "more screen";
          align-items: start; padding: 24px 28px; border-radius: var(--radius-lg);
          background: linear-gradient(135deg, #fff7ed, #fff1f2); border: 2px solid #f97316; color: var(--color-text);
          text-decoration: none; box-shadow: 0 10px 28px rgba(249,115,22,.15); transition: transform .15s, box-shadow .15s;
        }
        .boot-banner__card:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(249,115,22,.25); color: var(--color-text); }
        .boot-banner__tag { grid-area: tag; justify-self: start; background: #dc2626; color: #fff; font-weight: 800; font-size: 14px; padding: 6px 14px; border-radius: 999px; white-space: nowrap; }
        .boot-banner__title { grid-area: title; margin: 0; font-size: 20px; font-weight: 800; line-height: 1.5; color: #9a3412; }
        .boot-banner__lead { grid-area: lead; margin: 0; font-size: 14px; line-height: 1.8; color: var(--color-text-soft); }
        .boot-banner__lead strong { color: #c2410c; }
        .boot-banner__more { grid-area: more; justify-self: start; margin-top: 4px; display: inline-flex; align-items: center; gap: 8px; background: #f97316; color: #fff; font-weight: 700; font-size: 15px; padding: 12px 18px; border-radius: 12px; white-space: nowrap; }
        .boot-banner__screen { grid-area: screen; align-self: center; background: #000; color: #f2f2f2; border-radius: 12px; padding: 32px 20px; text-align: center; }
        .boot-banner__screen p { margin: 0 0 14px; font-size: 13.5px; font-weight: 600; line-height: 1.7; }
        .boot-banner__screen .boot-banner__screen-log { margin: 20px 0 0; font-size: 11px; font-weight: 400; color: #bbb; word-break: break-all; }
        @media (max-width: 900px) {
          .boot-banner { padding: 20px 0; }
          .boot-banner__card { grid-template-columns: minmax(0, 1fr); grid-template-areas: "tag" "title" "screen" "lead" "more"; row-gap: 12px; padding: 18px 16px; }
          .boot-banner__tag { font-size: 12px; padding: 5px 12px; }
          .boot-banner__title { font-size: 17px; }
          .boot-banner__screen { padding: 22px 14px; }
          .boot-banner__screen p { font-size: 12px; margin-bottom: 10px; }
          .boot-banner__screen .boot-banner__screen-log { font-size: 10px; margin-top: 14px; }
          .boot-banner__lead { font-size: 13px; }
          .boot-banner__more { justify-self: stretch; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
