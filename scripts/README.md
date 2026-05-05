# ブログ自動公開スクリプト

## 使い方

### 新しい記事を書く

1. `scripts/articles/` に `.md` ファイルを作成
2. front matter を設定（下記参照）
3. スクリプトを実行

```bat
REM articles\フォルダのmdファイルを指定
publish-blog.bat articles\new-article.md

REM 確認だけしたい（投稿しない）
publish-blog.bat articles\new-article.md --dry-run

REM 既存記事を更新
publish-blog.bat articles\existing-article.md --update
```

---

## front matter の書き方

```yaml
---
title: 記事タイトル
thumbnail: eyecatch-image.png     # public/blog-thumbnails/ 内のファイル名
category: テクノロジー             # テクノロジー / 更新情報 / チュートリアル
publish: true                      # true=公開 / false=下書き保存
id: wmcef_pc7                      # 更新時のみ（既存記事のコンテンツID）
---

本文（マークダウン）...
```

---

## サムネイル画像の準備

1. サムネイル用の HTML を `public/blog-thumbnails/` に作成（例: `win10-thumbnail.html`）
2. ブラウザでスクリーンショット → `public/blog-thumbnails/xxx-eyecatch.png` として保存
3. `git push` → Cloudflare Workers に自動デプロイ
4. スクリプト実行時に自動でCloudflare WorkersのURLをアイキャッチとして設定

---

## 対応するMarkdown記法

| 記法 | 出力 |
|------|------|
| `## 見出し2` | H2タグ |
| `### 見出し3` | H3タグ |
| `**太字**` | Bold |
| `*斜体*` | Italic |
| `- リスト` | 箇条書き |
| `1. リスト` | 番号付きリスト |
| `` `コード` `` | インラインコード |
| ` ```ブロック``` ` | コードブロック |
| `[テキスト](URL)` | リンク |

---

## 既存カテゴリ

| カテゴリ名 | 説明 |
|-----------|------|
| テクノロジー | Windows・PC関連、技術情報 |
| 更新情報 | お知らせ・サービス更新 |
| チュートリアル | 使い方・設定ガイド |
