import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

/**
 * Windows 11 の自動修復ループ（「デバイスで問題が発生したため、修復できませんでした」）の修理案内。
 *
 * 2026年10月末から同じ症状の持ち込みが続き、11月上旬に複数台をリカバリーせずに起動させた実績から作った
 * （原稿: Dropbox の hp_video/hp_article.md）。トップのヒーロー下から案内している。
 *
 * 書かないこと（原稿の社内メモより）:
 * - 原因の更新プログラムの番号（確定していない）
 * - 修復の具体的な手順（当社のノウハウ）
 * - 「必ず直る」（スナップショットが残っていない PC は再インストールになる）
 * - 修復できなかった PC を再インストールする場合の料金（問い合わせ時に別途案内）
 */

const title = "Windows 11が起動しない「自動修復」ループの修理｜データそのまま・16,500円";
const description =
  "「自動修復を準備しています」「PC を診断中」のあと「デバイスで問題が発生したため、修復できませんでした」と出て起動しないWindows 11を、初期化せずデータを残したまま修復します。修理料金16,500円（税込）、直らなければ料金はかかりません。持ち込み・配送修理に対応。";

const PAGE_URL = "https://bullcom.jp/boot-repair";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/boot-repair" },
  openGraph: {
    title: `${title}｜BULLCOM`,
    description,
    url: PAGE_URL,
    siteName: "BULLCOM（ブルコム）パソコン修理",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/videos/boot-loop-poster.jpg", width: 1920, height: 1080, alt: "デバイスで問題が発生したため、修復できませんでした。の画面" }],
  },
  twitter: { card: "summary_large_image", title: `${title}｜BULLCOM`, description, images: ["/videos/boot-loop-poster.jpg"] },
};

// 動画の流れ（原稿の秒数のまま）
const timeline: [string, string][] = [
  ["0:00", "メーカーロゴが表示される"],
  ["0:06ごろ", "画面が消えて電源が落ちる（モニターに「映像信号がありません」）"],
  ["0:15ごろ", "再びロゴが出て「自動修復を準備しています」"],
  ["0:26ごろ", "また画面が消えて再起動"],
  ["0:33ごろ", "「回復の準備をしています」"],
  ["0:37ごろ", "「PC を診断中」"],
  ["0:59ごろ", "「ネットワークに接続しています…」"],
  ["1:36ごろ", "「ソリューションを探しています…」"],
  ["2:11ごろ", "「デバイスで問題が発生したため、修復できませんでした。」"],
];

const faqs = [
  {
    q: "「自動修復を準備しています」のあと「デバイスで問題が発生したため、修復できませんでした」と出て起動しません。直りますか？",
    a: "2026年10月末ごろから同じ症状のご相談が続いており、当社では11月上旬だけで複数台を、Windows を初期化せずデータを残したまま起動できる状態に戻しています。パソコンの状態によっては修復できない場合もありますが、その場合は料金はかかりません。",
  },
  {
    q: "修理料金はいくらですか？",
    a: "修理料金は16,500円（税込）です。修復できなかった場合は料金はかかりません。持ち込みのほか、配送修理にも対応しています（配送の場合は往復の送料をご負担ください）。",
  },
  {
    q: "データは消えませんか？",
    a: "Windows の再インストール（初期化）はせず、写真・書類・メールなどのデータはそのまま、壊れる前の状態に戻して起動させます。作業前にディスクの複製（バックアップ）を取り、データを守りながら作業します。",
  },
  {
    q: "自分で直す方法はありますか？",
    a: "Windows 標準の「自動修復」では直らず、「システムの復元」も復元ポイントが見つからず使えないケースがほとんどです。「この PC を初期状態に戻す」や「ドライブから回復する」を実行するとデータが消えることがあるため、画面が同じならそのままの状態でご相談ください。",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Windows 11 が起動しない（自動修復ループ）症状の実際の画面",
    description:
      "メーカーロゴのあと電源が落ち、「自動修復を準備しています」「PC を診断中」「ソリューションを探しています」と進んだあと、「デバイスで問題が発生したため、修復できませんでした。」と表示されて起動しないWindows 11の実際の画面です。",
    thumbnailUrl: "https://bullcom.jp/videos/boot-loop-poster.jpg",
    contentUrl: "https://bullcom.jp/videos/boot-loop-symptom.mp4",
    uploadDate: "2026-11-06T22:00:00+09:00",
    duration: "PT2M19S",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: "https://bullcom.jp" },
      { "@type": "ListItem", position: 2, name: "Windows 11 起動しない（自動修復ループ）の修理", item: PAGE_URL },
    ],
  },
];

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "28px 32px",
  marginBottom: "28px",
};

export default function BootRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        sub="WINDOWS 11 BOOT REPAIR"
        title="「修復できませんでした」と出て起動しないパソコン、ご相談ください"
        lead="Windows 11 の自動修復ループを、初期化せず・データそのままで修復します。修理料金16,500円（税込）、直らなければ料金はかかりません。"
        crumb="Windows 11 起動しない（自動修復ループ）"
      />

      <section className="section boot-repair">
        <div className="container" style={{ maxWidth: "860px" }}>
          {/* 料金の要点を先に */}
          <div className="boot-repair__offer">
            <p className="boot-repair__offer-lead">当社であれば<strong>リカバリーせずに直せる可能性が高い</strong>です</p>
            <div className="boot-repair__offer-grid">
              <div>
                <small>修理料金</small>
                <b>16,500<span>円（税込）</span></b>
              </div>
              <div>
                <small>修復できない場合</small>
                <b>0<span>円</span></b>
              </div>
              <div>
                <small>データ</small>
                <b className="boot-repair__offer-text">そのまま</b>
              </div>
            </div>
            <p className="boot-repair__offer-note">持ち込み・配送修理に対応（配送の場合は往復の送料をご負担ください）</p>
            <div className="boot-repair__actions">
              <a href="tel:0789122656" data-tel-loc="boot-repair-top" className="btn btn-primary">電話で相談する 078-912-2656</a>
              <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" data-line-loc="boot-repair-top" className="btn btn-line">LINEで相談する</a>
            </div>
          </div>

          {/* 症状 */}
          <h2 className="boot-repair__h2">こんな症状でお困りではありませんか？</h2>
          <p>
            2026年10月末ごろから、<strong>ある日突然 Windows 11 が起動しなくなる</strong>というご相談が続いています。
          </p>
          <div className="boot-repair__screen" role="img" aria-label="画面の表示">
            <p>デバイスで問題が発生したため、修復できませんでした。</p>
            <p>その他の回復オプションを表示するには、クリックまたは Enter キーを押します。</p>
            <p className="boot-repair__screen-log">ログ ファイル: C:\WINDOWS\System32\Logfiles\Srt\SrtTrail.txt</p>
          </div>
          <ul className="boot-repair__list">
            <li>電源を入れると、メーカーのロゴが出たあと<strong>一度画面が消えて、電源が落ちたように再起動する</strong></li>
            <li>「<strong>自動修復を準備しています</strong>」→「<strong>PC を診断中</strong>」→「<strong>ソリューションを探しています</strong>」と進む</li>
            <li>最後に「<strong>デバイスで問題が発生したため、修復できませんでした。</strong>」と表示される</li>
            <li>何度電源を入れ直しても同じことを繰り返す</li>
            <li>ブルースクリーン（青い画面のエラー）は出ない</li>
          </ul>
          <p>DELL、dynabook、ASUS など、<strong>メーカーを問わず</strong>同じ症状が起きています。</p>

          {/* 動画 */}
          <h2 className="boot-repair__h2">実際の画面（動画）</h2>
          <video
            className="boot-repair__video"
            controls
            playsInline
            preload="metadata"
            poster="/videos/boot-loop-poster.jpg"
          >
            <source src="/videos/boot-loop-symptom.mp4" type="video/mp4" />
          </video>
          <p style={{ fontSize: "14px", color: "var(--color-text-soft)" }}>
            実際に当社に持ち込まれたパソコンの画面です（音声なし・約2分20秒）。
          </p>
          <ol className="boot-repair__timeline">
            {timeline.map(([t, text]) => (
              <li key={t}><span>{t}</span>{text}</li>
            ))}
          </ol>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            ※ 0:09〜0:12 ごろに出る四角い表示は、モニターの「信号なし」の表示です（パソコンの故障表示ではありません）。
          </p>

          {/* 原因 */}
          <h2 className="boot-repair__h2">原因について</h2>
          <p>
            発生時期から、<strong>2026年10月末に配信された Windows の更新プログラム</strong>のあとに、起動に必要なファイルの状態が崩れたものと考えています。
            ただし、Microsoft からの公式な不具合情報はまだ出ていません（2026年11月6日時点）。
          </p>
          <p>
            Windows 標準の「自動修復」では直らず、「システムの復元」も<strong>復元ポイントが見つからない</strong>などで使えないケースがほとんどです。
          </p>

          {/* 実績 */}
          <h2 className="boot-repair__h2">当社での修復実績</h2>
          <p>2026年11月上旬だけで、この症状のパソコンを<strong>複数台、起動できる状態に戻しています</strong>（ノートパソコン・デスクトップとも）。</p>
          <div style={card}>
            <ul className="boot-repair__checks">
              <li><strong>Windows の再インストール（初期化）はしていません</strong></li>
              <li>写真・書類・メールなどの<strong>データはそのまま</strong>、壊れる前の状態に戻して起動させています</li>
              <li>作業前にディスクのバックアップ（複製）を取り、データを守りながら作業します</li>
            </ul>
          </div>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            ※ パソコンの状態によっては、修復できない場合があります。その場合、修理料金はかかりません。
          </p>

          {/* やってはいけないこと */}
          <div className="boot-repair__warn">
            <h2>自分で直そうとする前に：やってはいけないこと</h2>
            <p>次の操作をすると、データが消えてしまうことがあります。</p>
            <ul>
              <li>「この PC を初期状態に戻す」を実行する</li>
              <li>「ドライブから回復する」で Windows を入れ直す</li>
              <li>何十回も電源の入れ直しを繰り返す</li>
            </ul>
            <p style={{ marginBottom: 0 }}><strong>画面が上の動画と同じなら、そのままの状態でご相談ください。</strong></p>
          </div>

          {/* FAQ */}
          <h2 className="boot-repair__h2">よくあるご質問</h2>
          <div className="boot-repair__faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          {/* 問い合わせ */}
          <div className="boot-repair__contact">
            <h2>修復できずお困りの方は、お気軽にご連絡ください</h2>
            <p>メーカーのサポートで「初期化するしかない」と言われた方も、一度ご相談ください。</p>
            <div className="boot-repair__actions">
              <a href="tel:0789122656" data-tel-loc="boot-repair-bottom" className="btn btn-primary">電話 078-912-2656（受付 9:00〜19:00）</a>
              <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" data-line-loc="boot-repair-bottom" className="btn btn-line">LINEで相談する</a>
              <Link href="/contact" className="btn btn-outline boot-repair__form-btn">フォームで相談する</Link>
            </div>
            <dl className="boot-repair__info">
              <dt>持ち込み先</dt>
              <dd>〒651-2113 兵庫県神戸市西区伊川谷町有瀬846-10 ギャラリエ1F（<Link href="/about">アクセス</Link>）</dd>
              <dt>配送修理</dt>
              <dd>全国から承ります。お送りいただく前に、お電話・LINE・フォームでご連絡ください。往復の送料はお客様のご負担です（元払い。目安は<Link href="/price">料金ページ</Link>）。</dd>
            </dl>
          </div>
        </div>
      </section>

      <style>{`
        .boot-repair p { line-height: 1.9; }
        .boot-repair__h2 { font-size: 22px; margin: 48px 0 16px; padding-left: 12px; border-left: 4px solid var(--color-primary); }
        .boot-repair__offer { background: linear-gradient(135deg, #0b2853, #1d56a8); color: #fff; border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-lg); }
        .boot-repair__offer-lead { font-size: 20px; font-weight: 700; margin: 0 0 20px; text-align: center; }
        .boot-repair__offer-lead strong { color: #fcd34d; }
        .boot-repair__offer-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 14px; }
        .boot-repair__offer-grid > div { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.25); border-radius: 12px; padding: 16px 10px; text-align: center; }
        .boot-repair__offer-grid small { display: block; font-size: 12px; color: #cfe0fa; margin-bottom: 4px; }
        .boot-repair__offer-grid b { font-family: var(--font-en); font-size: 30px; font-weight: 800; line-height: 1.2; }
        .boot-repair__offer-grid b span { font-size: 13px; font-weight: 700; margin-left: 2px; }
        .boot-repair__offer-grid b.boot-repair__offer-text { font-family: inherit; font-size: 24px; }
        .boot-repair__offer-note { text-align: center; font-size: 13px; color: #cfe0fa; margin: 0 0 20px; }
        .boot-repair__actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .boot-repair__actions .btn { padding: 14px 24px; font-size: 15px; justify-content: center; }
        .boot-repair__screen { background: #000; color: #f2f2f2; border-radius: var(--radius); padding: 32px 20px; text-align: center; margin: 20px 0; }
        .boot-repair__screen p { margin: 0 0 14px; font-size: 15px; line-height: 1.7; }
        .boot-repair__screen .boot-repair__screen-log { margin: 22px 0 0; font-size: 12px; color: #bbb; word-break: break-all; }
        .boot-repair__list { padding-left: 22px; line-height: 2; margin-bottom: 16px; }
        .boot-repair__video { width: 100%; aspect-ratio: 16 / 9; background: #000; border-radius: var(--radius); display: block; margin-bottom: 10px; }
        .boot-repair__timeline { list-style: none; padding: 16px 20px; margin: 0 0 8px; background: var(--color-bg-soft); border: 1px solid var(--color-border); border-radius: var(--radius); font-size: 14px; line-height: 1.9; }
        .boot-repair__timeline li { display: grid; grid-template-columns: 80px 1fr; gap: 8px; }
        .boot-repair__timeline span { font-family: var(--font-en); font-weight: 700; color: var(--color-primary-dark); }
        .boot-repair__checks { list-style: none; padding: 0; margin: 0; line-height: 1.9; }
        .boot-repair__checks li { position: relative; padding-left: 30px; margin-bottom: 8px; }
        .boot-repair__checks li::before { content: "✓"; position: absolute; left: 0; top: 0; width: 22px; height: 22px; border-radius: 50%; background: #2db87a; color: #fff; font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-top: 4px; }
        .boot-repair__warn { background: #fff5f5; border: 1px solid #f3c2c2; border-left: 4px solid #d94a4a; border-radius: var(--radius); padding: 24px 28px; margin: 48px 0 0; }
        .boot-repair__warn h2 { font-size: 19px; color: #b93030; margin: 0 0 10px; }
        .boot-repair__warn ul { padding-left: 22px; line-height: 2; margin: 0 0 12px; }
        .boot-repair__faq details { border: 1px solid var(--color-border); border-radius: var(--radius); padding: 16px 20px; margin-bottom: 10px; background: #fff; }
        .boot-repair__faq summary { font-weight: 700; cursor: pointer; line-height: 1.7; }
        .boot-repair__faq details p { margin: 12px 0 0; font-size: 15px; color: var(--color-text-soft); }
        .boot-repair__contact { margin-top: 48px; background: var(--color-bg-soft); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 32px; text-align: center; }
        .boot-repair__contact h2 { font-size: 22px; margin: 0 0 10px; }
        .boot-repair__contact > p { margin: 0 0 20px; }
        .boot-repair__form-btn { background: #fff; }
        .boot-repair__info { text-align: left; margin: 24px 0 0; display: grid; grid-template-columns: 110px 1fr; gap: 10px 16px; font-size: 14px; line-height: 1.8; }
        .boot-repair__info dt { font-weight: 700; color: var(--color-primary-dark); }
        .boot-repair__info dd { margin: 0; }
        .boot-repair__info a { color: var(--color-primary-dark); font-weight: 600; }
        @media (max-width: 600px) {
          .boot-repair__h2 { font-size: 19px; margin-top: 40px; }
          .boot-repair__offer { padding: 24px 16px; }
          .boot-repair__offer-lead { font-size: 17px; }
          .boot-repair__offer-grid { gap: 6px; }
          .boot-repair__offer-grid > div { padding: 12px 4px; }
          .boot-repair__offer-grid b { font-size: 20px; }
          .boot-repair__offer-grid b span { font-size: 10px; }
          .boot-repair__offer-grid b.boot-repair__offer-text { font-size: 17px; }
          .boot-repair__actions .btn { width: 100%; }
          .boot-repair__screen p { font-size: 13px; }
          .boot-repair__warn, .boot-repair__contact { padding: 20px 16px; }
          .boot-repair__info { grid-template-columns: 1fr; gap: 2px; }
          .boot-repair__info dd { margin-bottom: 10px; }
        }
      `}</style>
    </>
  );
}
