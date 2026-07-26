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
