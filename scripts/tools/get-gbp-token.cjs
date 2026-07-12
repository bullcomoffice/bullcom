#!/usr/bin/env node
/**
 * GBP API リフレッシュトークン取得スクリプト
 *
 * 1. localhost:3000 にコールバックサーバを立てる
 * 2. ブラウザで Google OAuth 同意画面を開く（手動で URL コピペでもOK）
 * 3. 承認後コールバックでコード受信 → トークン交換
 * 4. 取得した refresh_token を表示
 * 5. ついでに accounts.list を叩いて動作確認
 *
 * 実行: node scripts/get-gbp-token.cjs
 */

// .env.local を手動で読み込む（dotenv不要）
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

const http = require("http");
const https = require("https");
const { URL, URLSearchParams } = require("url");
const { exec } = require("child_process");

const CLIENT_ID = process.env.GBP_CLIENT_ID;
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/auth/callback/google";
const SCOPE = "https://www.googleapis.com/auth/business.manage";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("ERROR: GBP_CLIENT_ID / GBP_CLIENT_SECRET が .env.local にない");
  process.exit(1);
}

// 1. 認可URL
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  }).toString();

console.log("\n=== Step 1: ブラウザで以下のURLを開いて承認 ===\n");
console.log(authUrl);
console.log("\n（自動でブラウザが開かない場合は手動でコピペ）\n");

// 2. ローカルコールバックサーバ
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3000");
  if (url.pathname !== "/api/auth/callback/google") {
    res.writeHead(404).end("Not found");
    return;
  }
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");

  if (err) {
    res.writeHead(400).end(`OAuth error: ${err}`);
    console.error("OAuth error:", err);
    server.close();
    return;
  }
  if (!code) {
    res.writeHead(400).end("No code");
    return;
  }

  console.log("✅ Authorization code 受信、トークン交換中...");

  // 3. コード→トークン交換
  try {
    const tokens = await postForm(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      })
    );

    console.log("\n=== Step 2: トークン取得成功 ===\n");
    console.log("access_token:", tokens.access_token?.slice(0, 30) + "...");
    console.log("refresh_token:", tokens.refresh_token);
    console.log("expires_in:", tokens.expires_in, "sec");
    console.log("scope:", tokens.scope);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(`
      <h1>✅ 認証成功</h1>
      <p>ターミナルに戻ってください。リフレッシュトークンが表示されています。</p>
    `);

    // 4. accounts.list で動作確認
    console.log("\n=== Step 3: accounts.list で動作確認 ===\n");
    const accounts = await getJson(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      tokens.access_token
    );
    console.log(JSON.stringify(accounts, null, 2));

    console.log("\n=== Step 4: .env.local に追記する内容 ===\n");
    console.log(`GBP_REFRESH_TOKEN=${tokens.refresh_token}`);
  } catch (e) {
    console.error("Error:", e);
    res.writeHead(500).end("Server error: " + e.message);
  } finally {
    setTimeout(() => server.close(), 500);
  }
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000\n");
  // 自動でブラウザ起動（Windows）
  exec(`start "" "${authUrl}"`);
});

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
            const json = JSON.parse(data);
            if (res.statusCode >= 400) reject(new Error(data));
            else resolve(json);
          } catch (e) {
            reject(new Error(`Parse error: ${data}`));
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
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, body: json });
          } catch {
            resolve({ status: res.statusCode, body: data });
          }
        });
      })
      .on("error", reject);
  });
}
