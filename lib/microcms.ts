import { createClient } from "microcms-js-sdk";
import type { Blog, Category } from "@/types/blog";

// microCMS クライアント
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// ブログ記事一覧を取得
export const getBlogs = async (limit = 10, offset = 0) => {
  return client.getList<Blog>({
    endpoint: "blogs",
    queries: { limit, offset, orders: "-publishedAt" },
  });
};

// ブログ記事を1件取得（slug指定）
export const getBlogBySlug = async (slug: string) => {
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return data.contents[0] ?? null;
};

// ブログ記事をID指定で取得（microCMSのコンテンツID）
export const getBlogById = async (id: string) => {
  return client.get<Blog>({
    endpoint: "blogs",
    contentId: id,
  });
};

// カテゴリ一覧を取得
export const getCategories = async () => {
  return client.getList<Category>({
    endpoint: "categories",
    queries: { limit: 100 },
  });
};

// トップページ用：最新記事を指定件数取得
export const getLatestBlogs = async (limit = 5) => {
  return client.getList<Blog>({
    endpoint: "blogs",
    queries: { limit, orders: "-publishedAt", fields: "id,title,eyecatch,publishedAt,category" },
  });
};
