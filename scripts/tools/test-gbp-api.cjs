#!/usr/bin/env node
/**
 * GBP API 動作確認スクリプト
 * 既存の GBP_REFRESH_TOKEN を使ってアクセストークン更新 → accounts.list を叩く
 *
 * 実行: node scripts/test-gbp-api.cjs
 */

// .env.local を読み込む
{
  const fs = require("fs");
  const path = require("path");
  const envPath = path.join(__dirname, "..", ".env.local");
  try {
    const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}

const https = require("https");
const { URLSearchParams } = require("url");

const CLIENT_ID = process.env.GBP_CLIENT_ID;
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GBP_REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error("ERROR: GBP_CLIENT_ID / GBP_CLIENT_SECRET / GBP_REFRESH_TOKEN いずれか欠落");
  process.exit(1);
}

console.log("=== 設定 ===");
console.log("Project:", process.env.GBP_PROJECT_ID);
console.log("Client ID:", CLIENT_ID.slice(0, 30) + "...");
console.log("Refresh Token:", REFRESH_TOKEN.slice(0, 20) + "...\n");

(async () => {
  // 1. リフレッシュトークン → アクセストークン
  console.log("=== Step 1: アクセストークン取得 ===");
  const tokenRes = await postForm(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    })
  );
  if (tokenRes.status >= 400) {
    console.error("❌ トークン取得失敗:", JSON.stringify(tokenRes.body, null, 2));
    process.exit(1);
  }
  console.log("✅ access_token:", tokenRes.body.access_token.slice(0, 30) + "...");
  console.log("expires_in:", tokenRes.body.expires_in, "sec");
  console.log("scope:", tokenRes.body.scope, "\n");

  const accessToken = tokenRes.body.access_token;

  // 2. accounts.list
  console.log("=== Step 2: accounts.list ===");
  const acc = await getJson(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    accessToken
  );
  console.log("HTTP", acc.status);
  console.log(JSON.stringify(acc.body, null, 2));

  if (acc.status !== 200 || !acc.body.accounts) {
    console.log("\n⚠️ accounts.list が空または失敗");
    return;
  }

  // 3. 最初のアカウントの locations.list
  const accountName = acc.body.accounts[0].name;
  console.log("\n=== Step 3: locations.list for", accountName, "===");
  const locUrl =
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations` +
    `?readMask=name,title,storefrontAddress,phoneNumbers,websiteUri,storeCode`;
  const loc = await getJson(locUrl, accessToken);
  console.log("HTTP", loc.status);
  console.log(JSON.stringify(loc.body, null, 2));
})();

// ===== Helpers =====

function postForm(url, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, body: data });
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body.toString());
    req.end();
  });
}

function getJson(url, accessToken) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization: `Bearer ${accessToken}` } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, body: data });
          }
        });
      })
      .on("error", reject);
  });
}
