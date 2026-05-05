import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像の最適化設定
  images: {
    // microCMS の画像ドメインを許可
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/**",
      },
      // その他外部画像が必要になったら追記
    ],
    // Cloudflare Pages では自動最適化が使えないため無効化
    unoptimized: true,
  },

  // Cloudflare Pages 向け: Node.js API を使わない設定
  // （必要に応じてコメントアウト解除）
  // output: "export",
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
