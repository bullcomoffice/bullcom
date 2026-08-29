import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/microcms";

/**
 * sitemap.xml を microCMS の公開記事から動的生成する。
 *
 * 背景: 従来は public/sitemap.xml に手書きした静的ファイルで、2026-07-13 以降
 * 更新されていなかった。2026-08-23 時点で公開55記事に対しsitemap掲載は11件、
 * 44件が漏れていた（8/13から配信を始めた49本も未掲載）。
 *
 * 注意: bullcom.jp は trailingSlash 未指定＝末尾スラッシュ無しが正規形。
 * スラッシュを付けると307リダイレクトを踏ませることになるため付けないこと。
 */

// output: "export" では静的生成の明示が必要
export const dynamic = "force-static";

const BASE = "https://bullcom.jp";

const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/price", priority: 0.9, changeFrequency: "monthly" },
  { path: "/area/kobe", priority: 0.9, changeFrequency: "monthly" },
  { path: "/area/akashi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // 公開済み記事を全件取得（microCMSのlimit上限は100なのでページング）
  const posts: { id: string; revisedAt?: string; updatedAt?: string; publishedAt?: string }[] = [];
  let offset = 0;
  for (;;) {
    const { contents, totalCount } = await getBlogs(100, offset);
    posts.push(...contents);
    offset += 100;
    if (posts.length >= totalCount || contents.length === 0) break;
  }

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.id}`,
    lastModified: new Date(post.revisedAt ?? post.updatedAt ?? post.publishedAt ?? now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
