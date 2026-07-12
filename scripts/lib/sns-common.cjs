/**
 * sns-common.cjs
 * SNS自動投稿スクリプト（post-to-x / post-to-instagram / post-to-gbp）の共通処理。
 * ロジックは post-to-gbp.cjs の実装をそのまま移設したもの（挙動不変）。
 *
 * 注意: このファイルは scripts/lib/ 配下にあるため、
 *       リポジトリルートは __dirname の2階層上、scripts/ は1階層上。
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// .env.local を手動読み込み（dotenv不要）。既に設定済みの環境変数は上書きしない。
function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '..', '.env.local');
  try {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}

function httpsGetJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    }).on('error', reject);
  });
}

function httpsPostJson(url, headers, bodyObj) {
  const body = JSON.stringify(bodyObj);
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
    req.write(body);
    req.end();
  });
}

function httpsPostForm(url, body) {
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

// microCMS から最新公開記事を1件取得（API ID は 'blogs' 固定）
async function fetchLatestArticle(fields) {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const url = `https://${domain}.microcms.io/api/v1/blogs?limit=1&orders=-publishedAt&fields=${fields}`;
  const res = await httpsGetJson(url, { 'X-MICROCMS-API-KEY': apiKey });
  if (res.status !== 200 || !res.body.contents?.length) {
    throw new Error(`microCMS取得失敗: ${res.status}`);
  }
  return res.body.contents[0];
}

// 公開時間ゲート: 公開から SNS_POST_MAX_MINUTES 分（既定60）以内なら true。
// 経過時間ログはここで出す。スキップ時のログ出力と exit は呼び出し側の責務。
function isWithinPostWindow(article, logPrefix) {
  const publishedAt = new Date(article.publishedAt);
  const now = new Date();
  const minutesSincePublish = (now - publishedAt) / 1000 / 60;
  const maxMinutes = process.env.SNS_POST_MAX_MINUTES
    ? Number(process.env.SNS_POST_MAX_MINUTES)
    : 60;
  console.log(`${logPrefix} 公開からの経過時間: ${Math.round(minutesSincePublish)}分 (上限: ${maxMinutes}分)`);
  return minutesSincePublish <= maxMinutes;
}

// 投稿済みID（重複投稿防止）。ファイルは scripts/ 直下に置く（従来と同じ場所）。
function getLastPostedId(filename) {
  try {
    const filePath = path.join(__dirname, '..', filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8').trim();
    }
  } catch {}
  return null;
}

function saveLastPostedId(filename, id) {
  try {
    fs.writeFileSync(path.join(__dirname, '..', filename), id, 'utf8');
  } catch {}
}

module.exports = {
  loadEnvLocal,
  httpsGetJson,
  httpsPostJson,
  httpsPostForm,
  fetchLatestArticle,
  isWithinPostWindow,
  getLastPostedId,
  saveLastPostedId,
};
