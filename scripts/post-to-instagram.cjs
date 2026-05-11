/**
 * post-to-instagram.cjs
 * microCMSの最新公開記事をInstagramに自動投稿するスクリプト
 * Cloudflare Workers Buildの postbuild フックで実行される
 *
 * Instagram Graph API (Facebook Login) を使用
 * - IG Business Account ID: 17841405354198125
 * - FB Page ID: 1165513313302170 (It Support Bullcom)
 */

const https = require('https');

// 予期せぬエラーでもデプロイを継続する
process.on('uncaughtException', (e) => {
  console.error('[IG投稿] 予期せぬエラー:', e.message);
  process.exit(0);
});
process.on('unhandledRejection', (e) => {
  console.error('[IG投稿] 未処理のPromiseエラー:', e?.message || e);
  process.exit(0);
});

// 環境変数チェック
const requiredEnvs = [
  'MICROCMS_SERVICE_DOMAIN',
  'MICROCMS_API_KEY',
  'IG_PAGE_ACCESS_TOKEN',
  'IG_BUSINESS_ACCOUNT_ID',
];
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    console.log(`[IG投稿] ${env} が未設定のためスキップします`);
    process.exit(0);
  }
}

// microCMSから最新公開記事を取得
function fetchLatestArticle() {
  return new Promise((resolve, reject) => {
    const domain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    const url = `https://${domain}.microcms.io/api/v1/blogs?limit=1&orders=-publishedAt&fields=id,title,publishedAt`;

    https.get(url, { headers: { 'X-MICROCMS-API-KEY': apiKey } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.contents && json.contents.length > 0) {
            resolve(json.contents[0]);
          } else {
            reject(new Error('記事が見つかりません'));
          }
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// 前回投稿したIDを確認
function getLastPostedId() {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '.last-posted-ig-id');
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8').trim();
    }
  } catch (e) {}
  return null;
}

function saveLastPostedId(id) {
  try {
    const fs = require('fs');
    const path = require('path');
    fs.writeFileSync(path.join(__dirname, '.last-posted-ig-id'), id, 'utf8');
  } catch (e) {}
}

// Instagram Graph API リクエスト
function igPost(endpoint, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body);
    const options = {
      hostname: 'graph.facebook.com',
      path: `/v25.0/${endpoint}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

// コンテナのステータスをポーリング（最大30秒）
function waitForContainer(containerId, pageToken) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      const options = {
        hostname: 'graph.facebook.com',
        path: `/v25.0/${containerId}?fields=status_code&access_token=${pageToken}`,
        method: 'GET',
      };
      https.get(options, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          let d = {};
          try { d = JSON.parse(data); } catch (e) { d = {}; }
          const status = d.status_code;
          console.log(`[IG投稿] コンテナ状態: ${status}`);
          if (status === 'FINISHED') {
            resolve();
          } else if (status === 'ERROR' || status === 'EXPIRED') {
            reject(new Error(`コンテナエラー: ${status}`));
          } else if (attempts >= 6) {
            reject(new Error('コンテナ処理タイムアウト'));
          } else {
            setTimeout(check, 5000);
          }
        });
      }).on('error', reject);
    };
    setTimeout(check, 5000); // 最初に5秒待つ
  });
}

// ハッシュタグ生成
function generateHashtags(title) {
  const tags = ['#BULLCOM', '#パソコン修理', '#神戸', '#明石', '#PC修理'];
  if (title.includes('ウイルス') || title.includes('セキュリティ') || title.includes('ランサムウェア')) {
    tags.push('#セキュリティ対策');
  }
  if (title.includes('Windows')) tags.push('#Windows');
  if (title.includes('バックアップ')) tags.push('#データバックアップ');
  if (title.includes('中古')) tags.push('#中古パソコン');
  if (title.includes('テレワーク') || title.includes('リモート')) tags.push('#テレワーク');
  return tags.slice(0, 8).join(' ');
}

async function main() {
  try {
    console.log('[IG投稿] 最新記事を取得中...');
    const article = await fetchLatestArticle();
    console.log(`[IG投稿] 最新記事: ${article.title} (ID: ${article.id})`);

    // 重複投稿チェック
    const lastId = getLastPostedId();
    if (lastId === article.id) {
      console.log(`[IG投稿] 既に投稿済み (ID: ${article.id}) のためスキップします`);
      process.exit(0);
    }

    // 公開時間チェック（60分以内のみ投稿）
    const publishedAt = new Date(article.publishedAt);
    const now = new Date();
    const minutesSincePublish = (now - publishedAt) / 1000 / 60;
    console.log(`[IG投稿] 公開からの経過時間: ${Math.round(minutesSincePublish)}分`);
    if (minutesSincePublish > 60) {
      console.log(`[IG投稿] 公開から60分以上経過しているためスキップします`);
      process.exit(0);
    }

    const igAccountId = process.env.IG_BUSINESS_ACCOUNT_ID;
    const pageToken = process.env.IG_PAGE_ACCESS_TOKEN;
    const articleUrl = `https://bullcom.jp/blog/${article.id}`;
    const hashtags = generateHashtags(article.title);

    // Instagram投稿キャプション
    const caption = `【新着記事】${article.title}\n\n記事はこちら→プロフィールのリンクから\n🔗 ${articleUrl}\n\n${hashtags}`;
    console.log(`[IG投稿] キャプション:\n${caption}`);

    // サムネイル画像URL（Cloudflare Workers経由）
    const imageUrl = `https://bullcom.bullcom-office.workers.dev/blog-thumbnails/${article.id}.jpg`;
    console.log(`[IG投稿] 画像URL: ${imageUrl}`);

    // Step 1: メディアコンテナ作成
    console.log('[IG投稿] メディアコンテナ作成中...');
    const container = await igPost(`${igAccountId}/media`, {
      image_url: imageUrl,
      caption: caption,
      access_token: pageToken,
    });

    if (!container.id) {
      throw new Error(`コンテナ作成失敗: ${JSON.stringify(container)}`);
    }
    console.log(`[IG投稿] コンテナID: ${container.id}`);

    // Step 2: コンテナの処理完了を待つ
    console.log('[IG投稿] 画像処理待ち...');
    await waitForContainer(container.id, pageToken);

    // Step 3: 投稿を公開
    console.log('[IG投稿] 投稿を公開中...');
    const result = await igPost(`${igAccountId}/media_publish`, {
      creation_id: container.id,
      access_token: pageToken,
    });

    if (!result.id) {
      throw new Error(`公開失敗: ${JSON.stringify(result)}`);
    }
    console.log(`[IG投稿] 投稿成功! Post ID: ${result.id}`);

    // Step 4: Facebookページにも投稿
    const fbPageId = '1165513313302170'; // It Support Bullcom
    const fbMessage = `【新着記事】${article.title}\n\n${articleUrl}\n\n${hashtags}`;
    console.log('[FB投稿] Facebookページに投稿中...');
    const fbResult = await igPost(`${fbPageId}/photos`, {
      url: imageUrl,
      message: fbMessage,
      access_token: pageToken,
    });
    if (fbResult.id) {
      console.log(`[FB投稿] 投稿成功! Post ID: ${fbResult.id}`);
    } else {
      console.log(`[FB投稿] 投稿失敗（インスタは成功済み）: ${JSON.stringify(fbResult)}`);
    }

    // 投稿済みIDを保存
    saveLastPostedId(article.id);

  } catch (e) {
    console.error('[IG投稿] エラー:', e.message);
    process.exit(0); // デプロイは継続
  }
}

main();
