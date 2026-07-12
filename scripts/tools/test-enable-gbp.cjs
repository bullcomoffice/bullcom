/**
 * test-enable-gbp.cjs
 * info@bullcom.jp の cloud-platform scope refresh_token を使って
 * bullcom-gbp (137693928895) で mybusiness.googleapis.com の有効化を試す
 *
 * 目的：新規プロジェクトでも v4 API を有効化できるか確認
 */

const https = require('https');
const { URLSearchParams } = require('url');
const fs = require('fs');
const path = require('path');

// .env.local 読み込み
const envPath = path.join(__dirname, '..', '.env.local');
const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
const env = {};
for (const line of lines) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2];
}

function postForm(url, body) {
  return new Promise((resolve, reject) => {
    const data = body.toString();
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let buf = '';
        res.on('data', (c) => (buf += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(buf) });
          } catch {
            resolve({ status: res.statusCode, body: buf });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function postJson(url, headers, bodyObj) {
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
  // 1. access token 取得
  console.log('=== access_token 取得 ===');
  const tokenRes = await postForm(
    'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      client_id: env.GBP_CLIENT_ID,
      client_secret: env.GBP_CLIENT_SECRET,
      refresh_token: env.GBP_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    })
  );
  if (tokenRes.status !== 200) {
    console.error('❌ token取得失敗:', tokenRes.body);
    return;
  }
  console.log('scope:', tokenRes.body.scope);
  const accessToken = tokenRes.body.access_token;

  // 2. bullcom-gbp (137693928895) で mybusiness.googleapis.com 有効化
  console.log('\n=== bullcom-gbp で mybusiness 有効化試行 ===');
  let res = await postJson(
    'https://serviceusage.googleapis.com/v1/projects/137693928895/services/mybusiness.googleapis.com:enable',
    { Authorization: `Bearer ${accessToken}` },
    {}
  );
  console.log('HTTP', res.status);
  console.log(JSON.stringify(res.body, null, 2));

  // 3. bullcom-seo (487208345458) でも試す
  console.log('\n=== bullcom-seo で mybusiness 有効化試行 ===');
  res = await postJson(
    'https://serviceusage.googleapis.com/v1/projects/487208345458/services/mybusiness.googleapis.com:enable',
    { Authorization: `Bearer ${accessToken}` },
    {}
  );
  console.log('HTTP', res.status);
  console.log(JSON.stringify(res.body, null, 2));
})();
