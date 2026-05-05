import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

export const metadata: Metadata = {
  title: "料金・プラン",
  description: "パソコン修理・設定の料金一覧。持ち込み診断料無料。出張・郵送の費用も掲載。",
};

const Block = ({ num, title, lead, children }: { num: string, title: string, lead?: string, children: React.ReactNode }) => (
  <div style={{ marginBottom: "56px" }}>
    <h3 style={{ fontSize: "22px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ fontFamily: "var(--font-en)", fontSize: "13px", color: "var(--color-primary)", background: "var(--color-bg-tint)", padding: "4px 10px", borderRadius: "4px", fontWeight: 700 }}>{num}</span>
      {title}
    </h3>
    {lead && <p style={{ color: "var(--color-text-soft)", marginBottom: "24px" }} dangerouslySetInnerHTML={{ __html: lead }} />}
    {children}
  </div>
);

export default function PricePage() {
  return (
    <>
      <PageHero sub="PRICING" title="料金・プラン" crumb="料金・プラン" lead="わかりやすい価格で、ご納得いただける作業をお約束します。すべて税込価格です。" />

      <section>
        <div className="container">
          {/* FREE HERO */}
          <div style={{ background: "linear-gradient(135deg, #fff7e0 0%, #ffe9b3 100%)", border: "1.5px solid #f0d480", borderRadius: "var(--radius-lg)", padding: "36px 40px", marginBottom: "56px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "28px", alignItems: "center" }} className="free-hero">
            <div style={{ width: "96px", height: "96px", background: "linear-gradient(135deg, #ffce47, #f7a811)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-en)", fontWeight: 800, fontSize: "28px", boxShadow: "0 12px 24px rgba(247,168,17,0.35)", flexShrink: 0 }}>FREE</div>
            <div>
              <h2 style={{ fontSize: "26px", color: "#6e4a00", marginBottom: "6px" }}>持ち込み診断料は無料！</h2>
              <p style={{ color: "#8a6300", margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
                「もしかして…」と思ったら、まずは症状を見せてください。診断のみのご来店も大歓迎です。<br />
                修理が不要だったときも料金はかかりません。お気軽にご相談ください。
              </p>
            </div>
          </div>

          <Block num="01" title="基本料金（持ち込み・出張・郵送）" lead="作業の入口となる基本料金です。">
            <table className="price-table">
              <thead><tr><th>区分</th><th>説明</th><th style={{ textAlign: "right" }}>料金（税込）</th></tr></thead>
              <tbody>
                <tr><td className="name-cell">持ち込み診断料</td><td>店舗にお持ち込みいただいた場合の診断料</td><td className="price-cell" style={{ color: "#c9881a" }}>無料</td></tr>
                <tr><td className="name-cell">出張診断料</td><td>ご自宅・オフィスへお伺いし、症状を確認します</td><td className="price-cell">¥5,500〜</td></tr>
                <tr><td className="name-cell">郵送修理</td><td>送付後、お見積りのうえ作業を実施（送料元払い）</td><td className="price-cell">作業内容に応じて</td></tr>
              </tbody>
            </table>
          </Block>

          <Block num="02" title="サービス別 主要料金" lead={`代表的なサービスの料金です。詳細は<a href="/services" style="color:var(--color-primary)">サービス一覧</a>をご覧ください。`}>
            <table className="price-table">
              <thead><tr><th>サービス</th><th>内容</th><th style={{ textAlign: "right" }}>料金（税込）</th></tr></thead>
              <tbody>
                {[
                  ["新規パソコン設定A", "開梱・設置・初期設定・プリンター・ネット・メール", "¥11,000"],
                  ["新規パソコン設定B", "上記＋データ移行", "¥16,500"],
                  ["リカバリーパックA", "初期化・初期設定・Office・フルアップデート", "¥16,500"],
                  ["リカバリーパックB", "上記＋データバックアップ及び復元", "¥22,000"],
                  ["ウイルス診断・駆除", "ウイルス感染の確認と除去", "¥8,800"],
                  ["スパム診断・駆除", "迷惑メール・スパムの対処", "¥8,800"],
                  ["データバックアップ", "10GBまで / 10GB以上", "¥5,500 / ¥8,800"],
                  ["データ移行", "10GBまで / 10GB以上", "¥11,000 / ¥14,300"],
                  ["ネットワークルーター設定", "ルーターの設置・設定対応", "¥8,800"],
                  ["Wi-Fi接続設定", "接続設定・速度改善など", "¥2,200"],
                  ["メール設定", "メールソフトの設定・移行", "¥2,200"],
                  ["プリンター設定", "プリンターの接続・設定", "¥3,300"],
                  ["リモートサポート", "1台あたり・月3回まで（年間契約）", "¥11,000 / 年"],
                ].map(([name, desc, price]) => (
                  <tr key={name}><td className="name-cell">{name}</td><td>{desc}</td><td className="price-cell">{price}</td></tr>
                ))}
              </tbody>
            </table>
          </Block>

          <Block num="03" title="出張エリア・出張料金" lead="兵庫県・大阪府を中心に、京都府の一部まで対応しています。">
            <table className="price-table">
              <thead><tr><th style={{ width: "100px" }}>エリア</th><th>対象エリア</th><th style={{ textAlign: "right", width: "130px" }}>出張料金（税込）</th></tr></thead>
              <tbody>
                {[
                  { label: "エリアA", color: "var(--color-primary)", desc: "兵庫：神戸市全域・明石市・芦屋市・尼崎市・伊丹市・小野市・神崎郡・川辺郡・加古郡・加古川市・加西市・加東市・川西市・三田市・揖保郡・高砂市・宝塚市・多可郡・たつの市・西宮市・西脇市・姫路市・三木市 ／ 大阪：大阪市（西淀川区・淀川区）・池田市・吹田市・豊中市", fee: "¥5,500" },
                  { label: "エリアB", color: "#4a7fd6", desc: "兵庫：相生市・赤穂市・淡路市・南あわじ市・宍粟市 ／ 大阪：大阪市全域・茨木市・高槻市・箕面市・豊能郡", fee: "¥11,000" },
                  { label: "エリアC", color: "#6495ED", desc: "兵庫：養父市・朝来市・豊岡市 ／ 京都：亀岡市", fee: "¥16,500" },
                ].map((area) => (
                  <tr key={area.label}>
                    <td><span style={{ display: "inline-block", background: area.color, color: "#fff", textAlign: "center", padding: "4px 12px", borderRadius: "4px", fontWeight: 700, fontSize: "13px", fontFamily: "var(--font-en)" }}>{area.label}</span></td>
                    <td style={{ fontSize: "14px" }}>{area.desc}</td>
                    <td className="price-cell">{area.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "12px" }}>※エリア外の場合もお気軽にご相談ください。</p>
          </Block>

          <Block num="04" title="郵送修理 送料目安" lead="片道・佐川急便（2024年10月現在）。往復送料はお客様負担となります。">
            <div style={{ overflowX: "auto" }}>
              <table className="price-table" style={{ fontSize: "14px" }}>
                <thead><tr><th>地域</th><th style={{ textAlign: "right" }}>ノートPC（100サイズ）</th><th style={{ textAlign: "right" }}>デスクトップPC（160サイズ）</th></tr></thead>
                <tbody>
                  {[
                    ["北海道", "¥2,350", "¥3,340"],
                    ["北東北（青森・秋田・岩手）", "¥1,880", "¥2,830"],
                    ["南東北（宮城・山形・福島）", "¥1,740", "¥2,700"],
                    ["関東", "¥1,630", "¥2,570"],
                    ["信越（長野・新潟）", "¥1,630", "¥2,570"],
                    ["東海（静岡・愛知・岐阜・三重）", "¥1,520", "¥2,440"],
                    ["北陸（富山・石川・福井）", "¥1,520", "¥2,440"],
                    ["関西（京都・滋賀・奈良・和歌山・大阪・兵庫）", "¥1,520", "¥2,440"],
                    ["中国（岡山・広島・山口・鳥取・島根）", "¥1,520", "¥2,440"],
                    ["四国", "¥1,630", "¥2,570"],
                    ["北九州（福岡・佐賀・長崎・大分）", "¥1,630", "¥2,570"],
                    ["南九州（熊本・宮崎・鹿児島）", "¥1,630", "¥2,570"],
                    ["沖縄（ゆうパック）", "¥2,160", "¥3,180"],
                  ].map(([area, note, desk]) => (
                    <tr key={area}><td>{area}</td><td style={{ fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--color-primary-dark)", textAlign: "right" }}>{note}</td><td style={{ fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--color-primary-dark)", textAlign: "right" }}>{desk}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background: "#fff", borderLeft: "4px solid var(--color-primary)", padding: "18px 24px", borderRadius: "4px", marginTop: "16px", fontSize: "14px", color: "var(--color-text-soft)", boxShadow: "var(--shadow-sm)", lineHeight: 1.85 }}>
              ※ 往復送料はお客様負担となります。<br />
              ※ <strong style={{ color: "#c0392b" }}>着払いでのお送りはお受けできません。必ず元払いでお願いします。</strong><br />
              ※ 離島など一部地域は別途送料が必要な場合があります。お気軽にご相談ください。
            </div>
          </Block>

          <CtaBanner
            title="お見積りは無料。診断後に追加料金はいただきません。"
            desc="料金についてご不明な点があれば、お気軽にお問い合わせください。"
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) { .free-hero { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
