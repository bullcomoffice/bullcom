// 全ページ共通の構造化データ（GEO・2026-10-17）
// AI検索は1ページ単位で読むため、どのページから引用されても店名・所在地・電話・対応エリアが
// 取れるよう、事業者の情報を layout で全ページに出す。各ページのJSON-LDは @id で参照する。
// 値はサイトに表示している情報（会社概要・料金・フッター）と必ず揃えること。

export const SITE_URL = "https://bullcom.jp";
export const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Googleマップの店舗ページ（エリアページの「Googleマップで見る」と同じ）
const GOOGLE_MAP_URL = "https://maps.google.com/?cid=12639856680861104051";

/** JSON-LD を <script> に埋め込む文字列にする（"<" をエスケープ） */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const city = (name: string) => ({
  "@type": "City",
  name,
  containedInPlace: { "@type": "State", name: "兵庫県" },
});

// price を省くと金額なし（郵送修理の見積もりなど）。minPrice は「〜」付きの料金
const offer = (name: string, price?: number, description?: string, minPrice = false) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name, ...(description ? { description } : {}) },
  ...(price === undefined
    ? {}
    : minPrice
      ? { priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: "JPY", valueAddedTaxIncluded: true } }
      : { price, priceCurrency: "JPY", priceSpecification: { "@type": "PriceSpecification", price, priceCurrency: "JPY", valueAddedTaxIncluded: true } }),
});

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "BULLCOM（ブルコム）パソコン修理",
  url: SITE_URL,
  inLanguage: "ja",
  publisher: { "@id": BUSINESS_ID },
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: "BULLCOM（ブルコム）パソコン修理",
  alternateName: ["パソコン修理 BULLCOM", "ブルコム", "BULLCOM"],
  description:
    "兵庫県神戸市西区伊川谷町（明石市との市境）にあるパソコン修理・設定の専門店。持ち込み診断料無料、出張（神戸市・明石市ほか）と郵送（全国）に対応。2002年創業。",
  url: SITE_URL,
  telephone: "078-912-2656",
  faxNumber: "078-939-6660",
  email: "info@bullcom.jp",
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo-full.png`,
  foundingDate: "2002-07",
  founder: { "@type": "Person", name: "芦原 陽右", jobTitle: "代表" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "伊川谷町有瀬846-10 ギャラリエ1F",
    addressLocality: "神戸市西区",
    addressRegion: "兵庫県",
    postalCode: "651-2113",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.7028,
    longitude: 135.0188,
  },
  hasMap: GOOGLE_MAP_URL,
  sameAs: [GOOGLE_MAP_URL],
  // 出張エリアA（料金ページ）と、エリアページで出張対応と書いている近隣の町
  areaServed: [
    city("神戸市"),
    city("明石市"),
    { "@type": "AdministrativeArea", name: "神戸市西区" },
    { "@type": "AdministrativeArea", name: "神戸市垂水区" },
    city("芦屋市"),
    city("尼崎市"),
    city("西宮市"),
    city("姫路市"),
    city("加古川市"),
    { "@type": "AdministrativeArea", name: "播磨町" },
    { "@type": "AdministrativeArea", name: "稲美町" },
    { "@type": "AdministrativeArea", name: "兵庫県" },
  ],
  // 会社概要の「事務所 9:30〜15:30／連絡受付 9:00〜19:00／不定休」とは異なるが、
  // 2026-10-17 にユーザーの判断で従来の「毎日 9:00〜19:00」のままとした
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "19:00",
  }],
  openingHours: "Mo-Su 09:00-19:00",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "078-912-2656",
    contactType: "customer service",
    areaServed: "JP",
    availableLanguage: "ja",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
  },
  paymentAccepted: "現金, 銀行振込, クレジットカード, 代金引換",
  currenciesAccepted: "JPY",
  priceRange: "¥¥",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "パソコン修理・設定サービス",
    url: `${SITE_URL}/price`,
    itemListElement: [
      offer("持ち込み診断", 0, "店舗にお持ちいただいた場合の診断・見積もり。修理しない場合も無料"),
      offer("出張診断・対応", 5500, "出張エリアA（神戸市全域・明石市ほか）。エリアにより変動", true),
      offer("郵送修理（全国）", undefined, "お見積り後に作業。送料は往復ともお客様負担（元払い・基本的に着払い不可）"),
      offer("新規パソコン設定", 11000, "開梱・設置・初期設定・プリンター・ネット接続・メール設定", true),
      offer("リカバリーパック", 16500, "初期化・初期設定・Office設定・フルアップデート", true),
      offer("ウイルス診断・駆除", 8800),
      offer("データバックアップ", 5500, undefined, true),
      offer("データ移行", 11000, undefined, true),
      offer("リモートサポート（年間契約）", 11000, "1台あたり・月3回まで"),
    ],
  },
};

/** 固定ページのパンくず（トップ → ページ） */
export const breadcrumbJsonLd = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "トップ", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

// 料金ページの全メニュー（/price の表と同じ金額。金額を変えるときは両方を揃えること）
export const priceCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "BULLCOM パソコン修理・設定の料金（税込）",
  url: `${SITE_URL}/price`,
  provider: { "@id": BUSINESS_ID },
  itemListElement: [
    {
      "@type": "OfferCatalog",
      name: "基本料金",
      itemListElement: [
        offer("持ち込み診断", 0, "店舗にお持ちいただいた場合の診断・見積もり。修理が不要だったときも無料"),
        offer("出張診断・対応", 5500, "ご自宅・オフィスへお伺いし現地で対応。エリアにより変動", true),
        offer("郵送修理", undefined, "全国対応。お見積り後に作業。送料は往復ともお客様負担（元払い）"),
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "パソコン設定・リカバリー",
      itemListElement: [
        offer("新規パソコン設定A", 11000, "開梱・設置・初期設定、プリンター・ネット接続、メール設定"),
        offer("新規パソコン設定B", 16500, "Aプランの全内容＋旧PCからのデータ移行"),
        offer("リカバリーパックA", 16500, "初期化・初期設定、Office設定、フルアップデート"),
        offer("リカバリーパックB", 22000, "Aプランの全内容＋データバックアップと復元"),
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "セキュリティ・データ",
      itemListElement: [
        offer("ウイルス診断・駆除", 8800),
        offer("スパム診断・駆除", 8800),
        offer("データバックアップ", 5500, undefined, true),
        offer("データ移行", 11000, undefined, true),
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "ネットワーク・機器設定",
      itemListElement: [
        offer("ネットワークルーター設定", 8800),
        offer("Wi-Fi接続設定", 2200),
        offer("メール設定", 2200),
        offer("プリンター設定", 3300),
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "サポート契約",
      itemListElement: [offer("リモートサポート（年間）", 11000, "1台あたり・月3回まで")],
    },
    {
      "@type": "OfferCatalog",
      name: "出張料金（エリア別）",
      itemListElement: [
        offer("出張エリアA", 5500, "神戸市全域・明石市・芦屋市・尼崎市・西宮市・姫路市・加古川市 ほか"),
        offer("出張エリアB", 11000, "相生市・赤穂市・淡路市・大阪市全域・茨木市・高槻市 ほか"),
        offer("出張エリアC", 16500, "養父市・朝来市・豊岡市・京都府亀岡市"),
      ],
    },
  ],
};

// 会社概要ページ（中身は layout の LocalBusiness を参照）
export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "会社概要｜BULLCOM（ブルコム）パソコン修理",
  url: `${SITE_URL}/about`,
  inLanguage: "ja",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": BUSINESS_ID },
  mainEntity: { "@id": BUSINESS_ID },
};
