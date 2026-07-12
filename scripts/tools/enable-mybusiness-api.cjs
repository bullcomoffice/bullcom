/**
 * enable-mybusiness-api.cjs
 * bullcom-seo プロジェクトで mybusiness.googleapis.com (v4) を有効化する
 * Cloud Console UIから有効化できない（許可リスト承認済みAPIはUIで隠される）ため、
 * Service Usage API 経由で直接有効化する
 *
 * 使い方:
 * 1. OAuth Playground でscope `https://www.googleapis.com/auth/cloud-platform` で認証
 *    https://developers.google.com/oauthplayground/
 *    歯車 → Use your own OAuth credentials → client_id/secret 入力
 *    Step 1 → Input your own scopes に `https://www.googleapis.com/auth/cloud-platform`
 *    Authorize APIs → bullcom.office@gmail.com で承認
 *    Step 2 → Exchange → access_token をコピー
 * 2. このスクリプトに access_token を引数で渡す:
 *    node scripts/enable-mybusiness-api.cjs <access_token>
 */

const https = require('https');

const accessToken = process.argv[2];
if (!accessToken) {
  console.error('Usage: node scripts/enable-mybusiness-api.cjs <ACCESS_TOKEN>');
  console.error('');
  console.error('OAuth Playground で cloud-platform scope の access_token を取得して引数で渡してください。');
  console.error('https://developers.google.com/oauthplayground/');
  process.exit(1);
}

const PROJECT_NUMBER = '487208345458'; // bullcom-seo
const SERVICE = 'mybusiness.googleapis.com';

function httpsPostJson(url, headers, bodyObj) {
  const body = bodyObj ? JSON.stringify(bodyObj) : '';
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, body: data });
          }
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  console.log(`[Enable] Project: ${PROJECT_NUMBER}, Service: ${SERVICE}`);

  const url = `https://serviceusage.googleapis.com/v1/projects/${PROJECT_NUMBER}/services/${SERVICE}:enable`;
  console.log(`[Enable] POST ${url}`);

  const res = await httpsPostJson(
    url,
    { Authorization: `Bearer ${accessToken}` },
    {}
  );

  console.log(`[Enable] HTTP ${res.status}`);
  console.log(JSON.stringify(res.body, null, 2));

  if (res.status === 200) {
    if (res.body.done) {
      console.log('\n✅ 有効化完了！数分待ってから post-to-gbp.cjs を再実行してください。');
    } else {
      console.log('\n⏳ 有効化処理が開始されました。完了まで数分かかります。');
      console.log(`   Operation: ${res.body.name}`);
    }
  } else {
    console.error('\n❌ 有効化失敗');
  }
})();
