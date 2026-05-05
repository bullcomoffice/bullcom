import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

// ブログ記事の型定義
export type Blog = MicroCMSListContent & {
  title: string;           // 記事タイトル
  content: string;         // 本文（リッチテキスト）
  eyecatch?: MicroCMSImage; // アイキャッチ画像（任意）
  category?: Category;     // カテゴリ（任意）
  description?: string;    // meta description用の概要（任意）
};

// カテゴリの型定義
export type Category = MicroCMSListContent & {
  name: string;   // カテゴリ名
  slug: string;   // URLスラッグ
};
