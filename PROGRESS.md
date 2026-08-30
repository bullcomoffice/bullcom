# PROGRESS

## 2026-07-26 サイト全体デザインリニューアル

- 作業ブランチ: `renewal/site-design`（mainへ直接コミットしない）
- 方針: URL、文言、metadata、JSON-LD、GA4、microCMS・SNS関連の実装は変更せず、共通UIと自作SVGで視覚表現を刷新する。
- 実装済み: デザイン変数、ボタン・共通セクション、ヘッダー、フッター、ページヒーロー、CTAバナー、トップヒーローのイラストを更新。
- 追加SVG: `pc-care.svg`、`service-support.svg`、`contact-support.svg`。
- 検証済み: `npm run build`（61ページの静的生成）、`npm test`（8件）、出力HTMLのcanonical・JSON-LD、1280px／375pxの横スクロールなし、Lighthouse Accessibility 90（トップ）。
- 残作業: コミット・プッシュ。
- 追加刷新: 全下層ページのヒーローを白基調の大判イラストカードに刷新。TOPヒーローはユーザー確認によりダークなターミナル表現とBULLCOMロゴ画像へ復元。モバイル幅375pxでも横スクロールなしを確認。
- 調整: 下層ヒーローはユーザー確認により、白地イラスト型からTOPと同トーンのターミナル背景＋SYSTEM STATUSパネル型バナーへ変更。モバイル幅375pxでも横スクロールなしを確認。
- 調整: 共通CTAバナーも、問い合わせイラストを削除してAGENT CHANNELのターミナル型ステータス表示へ統一。

## 2026-08-13〜08-29 SEO・コンテンツ強化

- 作業ブランチ: `main`（8/17・8/23 の作業が未コミットのまま残っていたため 8/29 に検証のうえ4件に分割してコミット）

### 記事の meta description（`19a5809`）
- 問題: 全記事で microCMS の description が空のまま、コード側が `description: blog.title` だったため、検索結果でタイトルとスニペットが同一文言になっていた。
- 対応: `lib/excerpt.ts` を追加。microCMS の description があればそれを優先し、無ければ本文HTMLから120字以内（句点で切って文途中で終わらせない）の抜粋を生成する。metadata / OG / Twitter card の3箇所に適用。
- `types/blog.ts` の `Blog` に `description?` を追加。

### sitemap.xml の動的生成（`1eec6d9`）
- 問題: 手書きの `public/sitemap.xml` が 2026-07-13 以降更新されておらず、8/23 時点で掲載11件・記事の大半が未掲載だった。
- 対応: `app/sitemap.ts` で microCMS から公開記事を全件ページング取得して生成。`output: "export"` のため `force-static` を明示。
- 注意: bullcom.jp は `trailingSlash` 未指定＝末尾スラッシュ無しが正規形。付けると307リダイレクトを踏ませることになるため付けない。
- 旧ファイルは `scripts/backup/sitemap.xml.bak-20260823` へ退避。`public/` に置いたままだとバックアップごと本番へデプロイされる（実際に `out/sitemap.xml.bak-20260823` が生成されていた）。

### エリアページのFAQ追加（`76fd7cb`）
- 神戸・明石の両ページに、遠方に住む家族のPCの郵送修理（送料の負担条件込み）と、受付時間9:00〜19:00・時間外は翌営業日折り返しの2問を追加。

### 記事とツール（`89c9554`）
- `scripts/articles/` に記事md 68本。すべて microCMS へ投入済みで front matter にIDを記録済み、2026-08-13〜2027-01-04 の範囲で予約公開を設定。
- `scripts/tools/publish-batch.sh`: 記事の一括下書き＋予約投入。eyecatch は microCMS にアップした画像しか受け付けないため thumbnail 行は投入時に除去し、払い出されたIDを元のmdへ書き戻す。
- `scripts/tools/check-gbp-reviews.cjs`: GBPのクチコミ件数・平均評価の取得（読み取り専用）。
- `scripts/thumbnails/`: サムネイル生成とX投稿スケジュール管理。

### 検証（2026-08-29）
- `npm test` 8件パス、`npm run build` 成功（72ページ静的生成）。
- sitemap.xml は67 URL（固定10 + 記事57）、末尾スラッシュ0件、`out/` へのバックアップ流出なし。
- 記事HTML 57件すべてで description がタイトルと不一致、長さ64〜120字。
- エリアページ2件とも本文・FAQPage JSON-LD に追加FAQが反映。

### 残作業
- `git push origin main`（Cloudflare の本番デプロイが走るため未実行）。
- push 後、Search Console で新しい sitemap.xml の取得を確認する。
- 記事のサムネイル画像は未紐付け。`scripts/thumbnails/` で生成・アップロードのうえ各記事の eyecatch に設定する。

## 2026-08-30 週報・月報の運用変更と本番デプロイ

### レポート運用の変更
- 週報を月曜 → **毎週日曜**、月報を毎月1日 → **毎月最終日曜**へ。最終日曜は週報を実施せず月報が兼ねる。
- ルールの正は [`_seo/report-operation.md`](_seo/report-operation.md)。
  他セッションへ持ち込む用の貼り付けプロンプトは [`_seo/report-operation-prompt.md`](_seo/report-operation-prompt.md)。
- cron は第N曜日を表現できないため、週報・月報とも毎週日曜起動にして、プロンプト冒頭の
  「今日+7日が翌月か」で担当日を判定する方式にした。
- bullcom.jp 用に `bullcom-jp-seo-weekly-review` / `bullcom-jp-seo-monthly-review` を新設（日曜11:00）。
  bullcom.net（9:00）・huneya（10:23）とは未反映。

### 外形チェックの導入
- `scripts/seo-healthcheck.mjs` を追加（`npm run seo:check` / `seo:log`）。17項目。
- `_seo/` に README・weekly-log・monthly-review・action-log・health-log を整備。

### A-1〜A-4 の対応（同日中に完了・17/17 PASS）
- **A-1** `http://bullcom.jp/` が301せず200を返していた → `src/worker.js` で301。
- **A-2** 末尾スラッシュの正規化が307（一時）→ 同じくWorkerで301。
  `run_worker_first = true` によりアセット層が307を返す前に正規化できる。
  https・非www・末尾スラッシュ無しの3条件をまとめて評価し、301は1回だけ返す。
- **A-3** 本番sitemapが21URL・記事11本のままだった → デプロイして **67URL** に。
- **A-4** 本番の記事descriptionがタイトルと完全一致だった → デプロイして本文抜粋に。

> `deploy.yml` は **push では起動しない**（`repository_dispatch` / `workflow_dispatch` のみ）。
> `gh workflow run deploy.yml` で手動起動する必要がある。

### 継続観察
- Search Console でサイトマップが「成功しました」になり検出67URLになるか → インデックス数が増えるか。
- description 変更後、表示回数の多い記事のCTRが動くか（月次で確認）。
