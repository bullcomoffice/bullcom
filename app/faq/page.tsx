import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "パソコン修理・設定に関するよくある質問をまとめています。診断・費用・修理期間など。",
};

const faqs = [
  {
    id: "fee", num: "01", label: "料金・費用",
    color: "#f5820a", bg: "#fff7f0",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    items: [
      { q: "診断だけでも来店できますか？", a: "もちろん大丈夫です。診断のみのご来店も大歓迎です。お気軽にどうぞ。" },
      { q: "持ち込み診断は本当に無料ですか？", a: "診断のみであれば無料です。修理が不要な場合も費用はかかりません。" },
      { q: "見積もり後にキャンセルできますか？", a: "見積もり後のキャンセルも問題ございません。ご安心ください。" },
      { q: "支払方法は何がありますか？", a: "お支払いは「現金」「クレジット」「請求書での振込」がございます。ただし「請求書での振込」は初めてのお客様はご利用いただけません。" },
      { q: "出張費用はいくらかかりますか？", a: "出張費用は¥5,500〜となります。詳しくは料金ページの出張エリアをご確認ください。" },
    ],
  },
  {
    id: "work", num: "02", label: "修理・作業",
    color: "#3a73d1", bg: "#f0f5ff",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    items: [
      { q: "修理にどれくらいの時間がかかりますか？", a: "内容により様々です。気になる方は作業前にお尋ねください。お見積りの段階でも目安をお伝えします。" },
      { q: "WindowsとMac、どちらも対応していますか？", a: "どちらも対応可能です。デスクトップ・ノートPC・一体型など機種は問いません。" },
      { q: "修理できない場合はどうなりますか？", a: "修理不可の場合は診断までとなります。診断料は無料ですのでご安心ください。" },
      { q: "修理後に同じ症状が再発した場合は？", a: "再発不良扱いにて対応可能です。ただし対応後1週間を経過した後の再発、またお客様が原因となる事象は対象外となります。" },
      { q: "パソコンを預けている間、データは安全ですか？", a: "もちろん安全です。プライバシーポリシーに則ってデータ保全には最善を尽くしております。" },
    ],
  },
  {
    id: "mail", num: "03", label: "郵送",
    color: "#9b59d4", bg: "#f8f0ff",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    items: [
      { q: "郵送での修理依頼はどうすればいいですか？", a: "事前にご予約が必要となります。電話・LINEにてご連絡いただきご予約ください。" },
      { q: "梱包はどうすればいいですか？", a: "梱包は丁寧にお願いします。自信がない場合にはヤマトのパソコン宅急便などをご利用ください。" },
      { q: "着払いで送ってもいいですか？", a: "基本的に着払いは不可です。内容によっては可能な場合もございますが、事前に当社の了承が必要となります。" },
      { q: "修理完了後の返送料はかかりますか？", a: "返送代金は当社負担となりますので¥0です。ご安心ください。" },
    ],
  },
  {
    id: "travel", num: "04", label: "出張",
    color: "#2db87a", bg: "#f0fff8",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,
    items: [
      { q: "出張エリア外でも来てもらえますか？", a: "出張エリア外も対応可能ではございますが、出張料金が変わります。料金については先にご相談ください。" },
      { q: "出張当日、何を準備しておけばいいですか？", a: "基本的に必要となりますのは「インターネットの環境設定通知書」です。IDやパスワードなどが記載されているものになります。" },
      { q: "法人で複数台まとめて対応できますか？", a: "まとめて対応可能です。ただし台数によっては複数日での対応となりますので、事前打ち合わせが必要となります。" },
    ],
  },
  {
    id: "biz", num: "05", label: "法人向け",
    color: "#00b4d8", bg: "#f0faff",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    items: [
      { q: "定期保守サポート契約とはどんな内容ですか？", a: "定期保守サポートはございません。リモートサポート契約がございますので、そちらをご活用ください。" },
      { q: "急なトラブルにも対応してもらえますか？", a: "基本対応しておりますが、内容や予約次第では承れないケースがございます。" },
      { q: "請求書払いは対応していますか？", a: "請求書払いは2回目以降のお客様に限っております。" },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero sub="FAQ" title="よくあるご質問" crumb="よくある質問" lead="皆様からよくいただくご質問をカテゴリ別にまとめました。解決しない場合はお気軽にお問い合わせください。" />

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "48px", alignItems: "start" }} className="faq-layout">

            {/* ===== 左：スティッキーナビ ===== */}
            <div style={{ position: "sticky", top: "100px" }} className="faq-sticky">
              <p style={{ fontFamily: "var(--font-en)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-text-muted)", marginBottom: "12px" }}>CATEGORIES</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {faqs.map((f) => (
                  <a key={f.id} href={`#${f.id}`} className="faq-nav-link" style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px", borderRadius: "var(--radius-lg)",
                    background: "#fff", border: "1px solid var(--color-border)",
                    textDecoration: "none", transition: "all 0.15s",
                    color: "var(--color-text)",
                  }}>
                    <span style={{ width: "32px", height: "32px", background: f.color, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <div style={{ fontFamily: "var(--font-en)", fontSize: "10px", color: "var(--color-text-muted)", letterSpacing: "0.1em" }}>{f.num}</div>
                      <div style={{ fontWeight: 600, fontSize: "14px" }}>{f.label}</div>
                    </div>
                    <svg style={{ marginLeft: "auto", color: "var(--color-text-muted)", flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                ))}
              </nav>

              {/* ミニCTAカード */}
              <div style={{ marginTop: "24px", background: "linear-gradient(135deg, #1e3a6f, #2c5fb8)", borderRadius: "var(--radius-lg)", padding: "24px 20px" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "16px", lineHeight: 1.7 }}>解決しないことがあればお気軽にご相談ください。</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer" className="btn btn-line" style={{ fontSize: "13px", padding: "10px 16px", justifyContent: "center" }}>LINEで相談</a>
                  <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "10px 16px", borderRadius: "var(--radius)", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>お問い合わせ</Link>
                </div>
              </div>
            </div>

            {/* ===== 右：FAQ本体 ===== */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {faqs.map((group) => (
                <div key={group.id} id={group.id} style={{ background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 8px rgba(28,60,120,0.04)" }}>
                  {/* カテゴリヘッダー */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "20px 28px", background: group.bg, borderBottom: `2px solid ${group.color}44` }}>
                    <span style={{ width: "40px", height: "40px", background: group.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0, boxShadow: `0 4px 12px ${group.color}44` }}>{group.icon}</span>
                    <div>
                      <span style={{ fontFamily: "var(--font-en)", fontSize: "11px", fontWeight: 700, color: group.color, letterSpacing: "0.12em" }}>{group.num}</span>
                      <h2 style={{ fontSize: "18px", margin: 0, color: "var(--color-text)" }}>{group.label}</h2>
                    </div>
                    <span style={{ marginLeft: "auto", fontFamily: "var(--font-en)", fontSize: "12px", color: "var(--color-text-muted)", fontWeight: 600 }}>{group.items.length} items</span>
                  </div>

                  {/* アコーディオン */}
                  <div>
                    {group.items.map((item, i) => (
                      <details key={item.q} style={{ borderBottom: i < group.items.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                        <summary style={{
                          listStyle: "none", padding: "18px 28px", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: "16px",
                          fontWeight: 600, fontSize: "15px", userSelect: "none",
                        }}>
                          <span style={{
                            flexShrink: 0, width: "28px", height: "28px",
                            background: group.color, color: "#fff", borderRadius: "7px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "13px",
                          }}>Q</span>
                          <span>{item.q}</span>
                          <svg style={{ marginLeft: "auto", color: group.color, flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                        </summary>
                        <div style={{ display: "flex", gap: "16px", padding: "16px 28px 20px", background: group.bg }}>
                          <span style={{ flexShrink: 0, width: "28px", height: "28px", background: "rgba(255,255,255,0.8)", border: `1.5px solid ${group.color}55`, color: group.color, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "13px" }}>A</span>
                          <p style={{ margin: 0, color: "var(--color-text-soft)", fontSize: "14.5px", lineHeight: 1.85 }}>{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "8px" }}>
                <CtaBanner
                  title="解決しないことがあれば、お気軽にご相談ください。"
                  desc="LINE・電話・フォームでお問い合わせいただけます。"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .faq-nav-link:hover {
          border-color: var(--color-primary) !important;
          background: var(--color-bg-tint) !important;
          color: var(--color-primary) !important;
        }
        @media (max-width: 900px) {
          .faq-layout { grid-template-columns: 1fr !important; }
          .faq-sticky { position: static !important; }
        }
      `}</style>
    </>
  );
}
