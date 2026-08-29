/**
 * check-gbp-reviews.cjs
 * Google Business Profile のクチコミ件数・平均評価・直近の内容を取得（読み取り専用）
 *
 * クチコミ獲得施策の進捗を数値で追うために使う。
 * API: My Business v4 reviews
 *   GET https://mybusiness.googleapis.com/v4/{accountId}/{locationId}/reviews
 *
 * 実行: node scripts/tools/check-gbp-reviews.cjs
 */

const https = require('https');
const { URLSearchParams } = require('url');
const { loadEnvLocal, httpsPostForm } = require('../lib/sns-common.cjs');

loadEnvLocal();

const required = ['GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN', 'GBP_ACCOUNT_ID', 'GBP_LOCATION_ID'];
for (const e of required) {
  if (!process.env[e]) {
    console.error(`${e} が未設定です`);
    process.exit(1);
  }
}

function httpsGet(url, token) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'GET', headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const tok = await httpsPostForm(
    'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      client_id: process.env.GBP_CLIENT_ID,
      client_secret: process.env.GBP_CLIENT_SECRET,
      refresh_token: process.env.GBP_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    })
  );
  const token = tok.body && tok.body.access_token;
  if (!token) throw new Error(`アクセストークンを取得できませんでした (HTTP ${tok.status}: ${JSON.stringify(tok.body).slice(0, 200)})`);

  const acc = process.env.GBP_ACCOUNT_ID;   // accounts/xxx
  const loc = process.env.GBP_LOCATION_ID;  // locations/xxx
  const url = `https://mybusiness.googleapis.com/v4/${acc}/${loc}/reviews`;

  const r = await httpsGet(url, token);
  if (r.status !== 200) {
    console.error(`HTTP ${r.status}: ${r.body.slice(0, 400)}`);
    process.exit(1);
  }
  const j = JSON.parse(r.body);

  console.log(`クチコミ件数 : ${j.totalReviewSize ?? 0}`);
  console.log(`平均評価     : ${j.averageRating ?? '-'}`);

  const STAR = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  for (const rv of (j.reviews || []).slice(0, 10)) {
    const stars = STAR[rv.starRating] ?? rv.starRating;
    const name = (rv.reviewer && rv.reviewer.displayName) || '(匿名)';
    const replied = rv.reviewReply ? '返信済' : '**未返信**';
    const text = (rv.comment || '(本文なし)').replace(/\s+/g, ' ').slice(0, 60);
    console.log(`  ★${stars} ${rv.createTime?.slice(0, 10)} ${name} [${replied}] ${text}`);
  }
})().catch((e) => {
  console.error('エラー:', e.message);
  process.exit(1);
});
