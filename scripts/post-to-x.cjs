/**
 * post-to-x.cjs
 * microCMSの最新公開記事をX（Twitter）に自動投稿するスクリプト
 * GitHub Actions sns-post.yml から呼ばれる想定（現在は if:false で自動実行停止中・手動運用）
 */

const { TwitterApi } = require('twitter-api-v2');
const { getPostContent } = require('./parse-sns-schedule.cjs');
const {
  loadEnvLocal,
  fetchLatestArticle,
  isWithinPostWindow,
  getLastPostedId,
  saveLastPostedId,
} = require('./lib/sns-common.cjs');

loadEnvLocal();

// 予期せぬエラーでもデプロイを継続する
process.on('uncaughtException', (e) => {
  console.error('[X投稿] 予期せぬエラー:', e.message);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  console.error('[X投稿] 未処理のPromiseエラー:', e?.message || e);
  process.exit(1);
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

// ハッシュタグ生成（SNS_HASHTAGS 環境変数優先。未設定時は従来の固定タグ + タイトル連動）
function generateHashtags(title) {
  const tags = process.env.SNS_HASHTAGS
    ? process.env.SNS_HASHTAGS.split(' ')
    : ['#BULLCOM', '#パソコン修理', '#神戸', '#明石'];
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
    const article = await fetchLatestArticle('id,title,publishedAt,eyecatch');
    console.log(`[X投稿] 最新記事: ${article.title} (ID: ${article.id})`);

    // 重複投稿チェック
    const lastId = getLastPostedId('.last-posted-id');
    if (lastId === article.id) {
      console.log(`[X投稿] 既に投稿済み (ID: ${article.id}) のためスキップします`);
      process.exit(0);
    }

    // 公開時間チェック（公開から60分以内の記事のみ投稿）
    // microCMSのスケジュール公開時のみ投稿し、コードpush時のビルドはスキップ
    if (!isWithinPostWindow(article, '[X投稿]')) {
      console.log(`[X投稿] 上限超過のためスキップ`);
      process.exit(0);
    }

    // ツイート文作成（sns-schedule.md があればそれを使用）
    const siteUrl = process.env.SITE_URL || 'https://bullcom.jp';
    const url = `${siteUrl}/blog/${article.id}`;
    const scheduled = getPostContent(article.id);
    const tweet = scheduled
      ? scheduled.full
      : `【新着記事】${article.title}\n\n${url}\n\n${generateHashtags(article.title)}`;

    console.log(`[X投稿] ツイート内容:\n${tweet}`);
    console.log(`[X投稿] 文字数: ${tweet.length}`);

    // X APIクライアント
    const client = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
    });

    // 画像アップロードは Free tier 無料枠外で従量課金されるため省略
    // 記事URLからXがOGP画像を自動展開してくれる
    const result = await client.v2.tweet(tweet);
    console.log(`[X投稿] 投稿成功! Tweet ID: ${result.data.id}`);

    // 投稿済みIDを保存
    saveLastPostedId('.last-posted-id', article.id);

  } catch (e) {
    console.error('[X投稿] エラー:', e.message);
    process.exit(1);
  }
}

main();
