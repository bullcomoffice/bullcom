/**
 * post-to-x.cjs
 * microCMSの最新公開記事をX（Twitter）に自動投稿するスクリプト
 * Cloudflare Workers Buildの deploy コマンド前に実行される
 */

const https = require('https');
const { TwitterApi } = require('twitter-api-v2');

// 予期せぬエラーでもデプロイを継続する
process.on('uncaughtException', (e) => {
  console.error('[X投稿] 予期せぬエラー:', e.message);
  process.exit(0);
});
process.on('unhandledRejection', (e) => {
  console.error('[X投稿] 未処理のPromiseエラー:', e?.message || e);
  process.exit(0);
});

// 環境変数チェック
const requiredEnvs = [
  'MICROCMS_SERVICE_DOMAIN',
  'MICROCMS_API_KEY',
  'X_API_KEY',
  'X_API_SECRET',
  'X_ACCESS_TOKEN',
  'X_ACCESS_TOKEN_SECRET',
];
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    console.log(`[X投稿] ${env} が未設定のためスキップします`);
    process.exit(0);
  }
}

// microCMSから最新公開記事を取得
function fetchLatestArticle() {
  return new Promise((resolve, reject) => {
    const domain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;
    const url = `https://${domain}.microcms.io/api/v1/blogs?limit=1&orders=-publishedAt&fields=id,title,publishedAt`;

    const options = {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
    };

    https.get(url, options, (res) => {
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
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// 前回投稿したIDを確認（重複投稿防止）
function getLastPostedId() {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '.last-posted-id');
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
    fs.writeFileSync(path.join(__dirname, '.last-posted-id'), id, 'utf8');
  } catch (e) {}
}

// ハッシュタグ生成
function generateHashtags(title) {
  const tags = ['#BULLCOM', '#パソコン修理', '#神戸', '#明石'];
  if (title.includes('ウイルス') || title.includes('セキュリティ') || title.includes('ランサムウェア')) {
    tags.push('#セキュリティ');
  }
  if (title.includes('Windows') || title.includes('ウィンドウズ')) {
    tags.push('#Windows');
  }
  if (title.includes('バックアップ')) {
    tags.push('#データバックアップ');
  }
  return tags.slice(0, 4).join(' ');
}

async function main() {
  try {
    console.log('[X投稿] 最新記事を取得中...');
    const article = await fetchLatestArticle();
    console.log(`[X投稿] 最新記事: ${article.title} (ID: ${article.id})`);

    // 重複投稿チェック
    const lastId = getLastPostedId();
    if (lastId === article.id) {
      console.log(`[X投稿] 既に投稿済み (ID: ${article.id}) のためスキップします`);
      process.exit(0);
    }

    // 公開時間チェック（公開から60分以内の記事のみ投稿）
    // microCMSのスケジュール公開時のみ投稿し、コードpush時のビルドはスキップ
    const publishedAt = new Date(article.publishedAt);
    const now = new Date();
    const minutesSincePublish = (now - publishedAt) / 1000 / 60;
    const maxMinutes = process.env.SNS_POST_MAX_MINUTES ? Number(process.env.SNS_POST_MAX_MINUTES) : 60;
    console.log(`[X投稿] 公開からの経過時間: ${Math.round(minutesSincePublish)}分 (上限: ${maxMinutes}分)`);
    if (minutesSincePublish > maxMinutes) {
      console.log(`[X投稿] 上限超過のためスキップ`);
      process.exit(0);
    }

    // ツイート文作成
    const url = `https://bullcom.jp/blog/${article.id}`;
    const hashtags = generateHashtags(article.title);
    const tweet = `【新着記事】${article.title}\n\n${url}\n\n${hashtags}`;

    console.log(`[X投稿] ツイート内容:\n${tweet}`);
    console.log(`[X投稿] 文字数: ${tweet.length}`);

    // X APIクライアント
    const client = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
    });

    const result = await client.v2.tweet(tweet);
    console.log(`[X投稿] 投稿成功! Tweet ID: ${result.data.id}`);

    // 投稿済みIDを保存
    saveLastPostedId(article.id);

  } catch (e) {
    console.error('[X投稿] エラー:', e.message);
    // X投稿失敗してもデプロイは継続する
    process.exit(0);
  }
}

main();
