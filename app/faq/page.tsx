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
    id: "fee", num: "01", label: "料金・費用について",
    items: [
      { q: "診断だけでも来店できますか？", a: "もちろん大丈夫です。" },
      { q: "持ち込み診断は本当に無料ですか？", a: "診断のみであれば無料です。" },
      { q: "見積もり後にキャンセルできますか？", a: "見積もり後のキャンセルも問題ございません。" },
      { q: "支払方法は何がありますか？", a: "お支払いは「現金」「クレジット」「請求書での振込」がございます。ただし「請求書での振込」は初めてのお客様はご利用いただけません。" },
      { q: "出張費用はいくらかかりますか？", a: "出張費用は¥5,500〜となります。詳しくは出張エリアについてをご確認ください。" },
    ],
  },
  {
    id: "work", num: "02", label: "修理・作業について",
    items: [
      { q: "修理にどれくらいの時間がかかりますか？", a: "内容により様々です。気になる方は作業前にお尋ねください。" },
      { q: "WindowsとMac、どちらも対応していますか？", a: "どちらも対応可能です。" },
      { q: "修理できない場合はどうなりますか？", a: "修理不可の場合は診断までとなります。" },
      { q: "修理後に同じ症状が再発した場合は対応してもらえますか？", a: "再発不良扱いにて対応可能です。ただし対応後1週間を経過した後の再発、またお客様が原因となる事象の場合は再発不良扱いとなりません。" },
      { q: "パソコンを預けている間、データは安全ですか？", a: "もちろん安全です。プライバシーポリシーに則ってデータ保全には最善を尽くしております。" },
    ],
  },
  {
    id: "mail", num: "03", label: "郵送について",
    items: [
      { q: "郵送での修理依頼はどうすればいいですか？", a: "事前にご予約が必要となります。電話・LINEにてご連絡いただきご予約ください。" },
      { q: "梱包はどうすればいいですか？", a: "梱包は丁寧にお願いします。自信がない場合にはヤマトのパソコン宅急便などをご利用ください。" },
      { q: "着払いで送ってもいいですか？", a: "基本的に着払いは不可です。内容によっては可能な場合もございますが、事前に当社の了承が必要となります。" },
      { q: "修理完了後、返送にどれくらいかかりますか？", a: "返送代金は当社負担となりますので¥0です。ご安心ください。" },
    ],
  },
  {
    id: "travel", num: "04", label: "出張について",
    items: [
      { q: "出張エリア外でも来てもらえますか？", a: "出張エリア外も対応可能ではございますが、出張料金が変わります。料金については先にご相談ください。" },
      { q: "出張当日、何を準備しておけばいいですか？", a: "基本的に必要となりますのは「インターネットの環境設定通知書」です。IDやパスワードなどが記載されているものになります。" },
      { q: "法人の場合、複数台まとめて対応できますか？", a: "まとめて対応可能です。ただし台数によっては複数日での対応となりますので、事前打ち合わせが必要となります。" },
    ],
  },
  {
    id: "biz", num: "05", label: "法人向け",
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
      <PageHero sub="FAQ" title="よくあるご質問" crumb="よくある質問" lead="皆様からよくいただくご質問をカテゴリ別にまとめました。解決しないことがあればお気軽にお問い合わせください。" />

      <section>
        <div className="container container-narrow">
          {/* カテゴリナビ */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" }}>
            {[{ href: "#", label: "すべて" }, ...faqs.map((f) => ({ href: `#${f.id}`, label: f.label }))].map((cat) => (
              <a key={cat.label} href={cat.href} className="faq-cat-link">
                {cat.label}
              </a>
            ))}
          </div>

          {/* FAQグループ */}
          {faqs.map((group) => (
            <div key={group.id} id={group.id} style={{ marginBottom: "48px" }}>
              <h2 style={{ fontSize: "22px", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid var(--color-primary-light)", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-en)", fontSize: "13px", color: "var(--color-primary)", background: "var(--color-bg-tint)", padding: "4px 10px", borderRadius: "4px", fontWeight: 700 }}>{group.num}</span>
                {group.label}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {group.items.map((item) => (
                  <details key={item.q} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                    <summary style={{ listStyle: "none", padding: "22px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: "18px", fontWeight: 600, fontSize: "16px" }}>
                      <span style={{ flexShrink: 0, width: "32px", height: "32px", background: "var(--color-primary)", color: "#fff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-en)", fontWeight: 700 }}>Q</span>
                      {item.q}
                      <svg style={{ marginLeft: "auto", color: "var(--color-text-muted)", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </summary>
                    <div style={{ padding: "0 28px 24px 78px", color: "var(--color-text-soft)", fontSize: "14.5px", lineHeight: 1.85 }}>{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: "56px" }}>
            <CtaBanner
              title="解決しないことがあれば、お気軽にご相談ください。"
              desc="LINE・電話・フォームでお問い合わせいただけます。"
            />
          </div>
        </div>
      </section>

      <style>{`
        .faq-cat-link {
          padding: 10px 20px;
          border: 1.5px solid var(--color-border);
          border-radius: 999px;
          background: #fff;
          color: var(--color-text-soft);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.15s;
          text-decoration: none;
        }
        .faq-cat-link:hover {
          border-color: var(--color-primary);
          background: var(--color-primary);
          color: #fff;
        }
      `}</style>
    </>
  );
}
