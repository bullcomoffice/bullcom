/**
 * trigger-sns-post.cjs
 * Cloudflareビルド完了後（postbuild）にGitHub Actionsの
 * SNS自動投稿ワークフローをトリガーする
 *
 * 環境変数: GH_PAT (GitHub Personal Access Token, repo scope)
 */

const https = require('https');

if (!process.env.GH_PAT) {
  console.log('[GH trigger] GH_PAT が未設定のためスキップ');
  process.exit(0);
}

const body = JSON.stringify({ event_type: 'microcms-publish' });

const options = {
  hostname: 'api.github.com',
  path: '/repos/bullcomoffice/bullcom/dispatches',
  method: 'POST',
  headers: {
    'Authorization': `token ${process.env.GH_PAT}`,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'User-Agent': 'bullcom-cloudflare-build',
  },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 204) {
      console.log('[GH trigger] GitHub Actions起動成功');
    } else {
      console.error(`[GH trigger] エラー (${res.statusCode}):`, data);
    }
  });
});

req.on('error', (e) => {
  console.error('[GH trigger] エラー:', e.message);
});

req.write(body);
req.end();
