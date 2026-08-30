# SEO / GEO 運用（bullcom.jp）

bullcom.jp のSEO/GEO対策を「実装 → スケジュールで答え合わせ → 改善」で回す。
週報・月報の**タイミングと中身の定義は [`report-operation.md`](./report-operation.md) が正**。
このファイルはサイト固有の情報（対象KW・実装済み対策・実務メモ）を持つ。

## サイトの前提
- 正規形は**末尾スラッシュ無し**（`trailingSlash` 未指定）。姉妹サイト bullcom.net は逆なので混同しないこと。
- GSCプロパティ: `sc-domain:bullcom.jp`（ドメインプロパティ）。
  URLプレフィックス形式を resource_id に渡すと「アクセス権がありません」になる。
- 静的エクスポート（`output: "export"`）を Cloudflare へデプロイ。push でデプロイが走る。

## いま入っている対策（2026-08-30時点）
- 全ページ self-canonical（末尾スラッシュ無し）
- Organization + WebSite + **LocalBusiness/ProfessionalService** 構造化データ（住所・営業時間・対応エリア）
- ブログ記事に **Article** + **BreadcrumbList**
- `/faq` と エリアページ（`/area/kobe`・`/area/akashi`）に **FAQPage**
- robots.txt でAIクローラ許可（GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot 他）+ llms.txt
- sitemap.xml を microCMS から動的生成（`app/sitemap.ts`）
- 記事の meta description を本文から自動生成（`lib/excerpt.ts`）
- 旧WordPress URL の 301 リダイレクト（`public/_redirects`）

## 対象キーワード

2026-07 の運用開始時から使っている確定セット（旧カレンダー予定・週次ログから引き継ぎ）。

- **神戸 パソコン修理** / **明石 パソコン修理**
- **神戸 パソコン設定** / **明石 パソコン設定**

週次ログで定点観測している本命KWの実測（第5回・2026-08-23時点）:
「パソコン修理 明石市」26.8位 ／「神戸 パソコン 修理」29.0位。3週連続で動いていない。

> 個別KWの順位精査は**月次**が担当する（週次では追わない）。
> 月次では毎回、選定時に無かった**新規クエリの台頭**も確認して主軸KWを見直す。

## GEO の重要な知見（第5回・2026-08-23）

**同じ地域でも、質問の型によって結果が真逆になる。**

| 質問の型 | 神戸 | 明石 |
|---|---|---|
| 「**おすすめ**は？」（評価軸） | ❌ 非掲載 | ❌ 非掲載 |
| 「**出張修理を頼める店**は？」（条件・機能軸） | ✅ 掲載 | ✅ 掲載 |

条件軸ではエリアページの「出張エリアA ¥5,500」がそのまま引用されている。
**クチコミ0がボトルネックなのは評価軸クエリだけで、条件軸は既に取れている。**
GEO引用テストでは**両方の型を必ず投げて定点観測する**こと。片方だけ見ると実力を見誤る。

## コマンド
```bash
npm run seo:check   # 外形チェックの結果を表示するだけ
npm run seo:log     # 表示 + _seo/health-log.md に追記
```
全項目PASSなら終了コード0、1つでも失敗なら1。

## 実務メモ

### GSCは URL パラメータで直接開ける
```
https://search.google.com/search-console/performance/search-analytics
  ?resource_id=sc-domain%3Abullcom.jp
  &start_date=20260823&end_date=20260829            ← YYYYMMDD（ハイフンなし）
  &metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION
  &breakdown=page
```
- 日付は**ハイフンありでは効かない**
- クエリ数・ページ数は表の右下「1〜10/102」から読む（合計値の表示はない）

### DOMをスクレイプするときの罠
検索パフォーマンス画面には、**過去に表示した期間のテーブルがDOM上に残る**。
`document.querySelectorAll('table')` は複数返り、先頭が古い期間のデータのことがある。
必ず `getBoundingClientRect().width > 0`（＝表示中）のテーブルを選ぶこと。

### 外形チェックの「ブログ description」判定
記事タイトル自体に「｜」が入ることがあるため、title を先頭の「｜」で分割してはいけない。
サイト名サフィックス `｜パソコン修理・設定 BULLCOM` を末尾から除去して比較する。
（初版でこれを誤り、description がタイトルと同一なのにPASSしていた）

## 記録ファイルの移動（2026-08-30）

第0〜5回の週次ログ・月次記録は Dropbox 配下
`D:\Data\Dropbox\AI\Claude\code\HP\seo_geo\` にあった。
git で版管理するため `_seo/` へ移行済み（7月分のレポートは `_seo/reports/`）。
**旧ディレクトリのファイルはもう更新しないこと。**

## 記録ファイル
| ファイル | 役割 |
|---|---|
| [`report-operation.md`](./report-operation.md) | 週報・月報の運用ルール（タイミング・中身の定義） |
| [`weekly-log.md`](./weekly-log.md) | 週次記録（最新を上に追記） |
| [`monthly-review.md`](./monthly-review.md) | 月次チェックリスト兼記録先 |
| [`action-log.md`](./action-log.md) | 対策台帳（A-番号で採番・ステータス管理） |
| [`health-log.md`](./health-log.md) | 外形自動チェックの履歴 |
