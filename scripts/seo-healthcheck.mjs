/**
 * seo-healthcheck.mjs
 * bullcom.jp のSEO/GEOシグナルを外形監視（依存なし・Node18+ の global fetch 使用）。
 *
 * 使い方:
 *   node scripts/seo-healthcheck.mjs            # レポートを標準出力
 *   node scripts/seo-healthcheck.mjs --append   # _seo/health-log.md に追記も行う
 *
 * 判定は「実装が生きているか」の外形チェック。検索順位・表示回数など
 * GSC由来の指標は含まない（それは週次・月次の手動GSC確認で見る）。
 *
 * bullcom.jp は trailingSlash 未指定＝末尾スラッシュ無しが正規形。
 * 姉妹サイト bullcom.net（末尾スラッシュあり）とは判定が逆になる点に注意。
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://bullcom.jp";
const BLOG_SAMPLE = "0ll2y72d_mg7"; // 構造化データ・description確認用のサンプル記事
const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_PATH = join(__dirname, "..", "_seo", "health-log.md");

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
}

async function fetchRaw(url, { redirect = "manual" } = {}) {
  const res = await fetch(url, { redirect, headers: { "User-Agent": "bullcom-seo-healthcheck" } });
  return { status: res.status, location: res.headers.get("location"), body: await res.text() };
}
const get = (path, opts) => fetchRaw(BASE + path, opts);

/** 1つのチェックを実行し、例外は失敗として記録する */
async function guard(name, fn) {
  try {
    await fn();
  } catch (e) {
    check(name, false, e.message);
  }
}

async function run() {
  await guard("トップ 200応答", async () => {
    const r = await get("/", { redirect: "follow" });
    check("トップ 200応答", r.status === 200, `HTTP ${r.status}`);
  });

  await guard("www→非www 301", async () => {
    const r = await fetchRaw("https://www.bullcom.jp/");
    const ok = r.status === 301 && (r.location || "").startsWith("https://bullcom.jp");
    check("www→非www 301", ok, `HTTP ${r.status} -> ${r.location || "(なし)"}`);
  });

  await guard("http→https 301", async () => {
    const r = await fetchRaw("http://bullcom.jp/");
    const ok = r.status === 301 && (r.location || "").startsWith("https://bullcom.jp");
    check("http→https 301", ok, `HTTP ${r.status} -> ${r.location || "(なし)"}`);
  });

  // 末尾スラッシュ付きは非スラッシュへ「301（恒久）」で寄せたい。
  // 307（一時）だとGoogleが評価を統合せず、同一記事が2URLでインデックスされうる。
  // 姉妹サイト bullcom.net では実際にこれが起きていた（あちらのA-17）。
  await guard("末尾スラッシュ 301正規化", async () => {
    const r = await get(`/blog/${BLOG_SAMPLE}/`);
    const ok = r.status === 301 && (r.location || "").endsWith(`/blog/${BLOG_SAMPLE}`);
    check("末尾スラッシュ 301正規化", ok, `HTTP ${r.status} -> ${r.location || "(なし)"}`);
  });

  await guard("トップ canonical", async () => {
    const r = await get("/", { redirect: "follow" });
    const href = r.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || "";
    check("トップ canonical", href === BASE, href || "(なし)");
  });

  await guard("sitemap.xml", async () => {
    const r = await get("/sitemap.xml", { redirect: "follow" });
    const count = (r.body.match(/<loc>/g) || []).length;
    const withSlash = (r.body.match(/<loc>[^<]*\/<\/loc>/g) || []).length;
    check("sitemap.xml", r.status === 200 && count > 0, `HTTP ${r.status} / ${count} URL`);
    check("sitemap 末尾スラッシュ混入なし", withSlash === 0, withSlash === 0 ? "0件" : `${withSlash}件混入`);
  });

  await guard("robots.txt AIボット許可", async () => {
    const r = await get("/robots.txt", { redirect: "follow" });
    const bots = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"];
    const missing = bots.filter((b) => !r.body.includes(b));
    check("robots.txt AIボット許可", missing.length === 0, missing.length ? `未記載: ${missing.join(",")}` : "GPTBot/OAI/Claude/Perplexity 全て記載");
    check("robots.txt Sitemap行", r.body.includes(`Sitemap: ${BASE}/sitemap.xml`), r.body.includes("Sitemap:") ? "あり" : "なし");
  });

  await guard("llms.txt 設置", async () => {
    const r = await get("/llms.txt", { redirect: "follow" });
    check("llms.txt 設置", r.status === 200 && r.body.length > 100, `HTTP ${r.status} / ${r.body.length}字`);
  });

  await guard("トップ LocalBusiness", async () => {
    const r = await get("/", { redirect: "follow" });
    const ok = r.body.includes('"@type":["LocalBusiness","ProfessionalService"]');
    check("トップ LocalBusiness", ok, ok ? "検出" : "未検出");
  });

  await guard("/faq FAQPage構造化データ", async () => {
    const r = await get("/faq", { redirect: "follow" });
    const hasFaq = r.body.includes('"@type":"FAQPage"');
    const desc = r.body.match(/<meta name="description" content="([^"]+)"/)?.[1] || "";
    check("/faq FAQPage構造化データ", hasFaq, hasFaq ? "検出" : "未検出");
    check("/faq 固有meta description", desc.length > 30 && !desc.startsWith("神戸市・明石市のパソコン修理・設定専門店BULLCOM。持ち込み"), desc ? `${desc.slice(0, 24)}…` : "(なし)");
  });

  await guard("エリアページ FAQPage", async () => {
    const r = await get("/area/kobe", { redirect: "follow" });
    const ok = r.body.includes('"@type":"FAQPage"');
    check("エリアページ FAQPage", ok, ok ? "検出（/area/kobe）" : "未検出");
  });

  await guard("ブログ 構造化データ", async () => {
    const r = await get(`/blog/${BLOG_SAMPLE}`, { redirect: "follow" });
    check("ブログ Article構造化データ", r.body.includes('"@type":"Article"'), r.body.includes("Article") ? "検出" : "未検出");
    check("ブログ BreadcrumbList", r.body.includes('"@type":"BreadcrumbList"'), r.body.includes("BreadcrumbList") ? "検出" : "未検出");
  });

  // lib/excerpt.ts の退行監視。description がタイトルと同一に戻ったら
  // 検索結果でスニペットがタイトルの繰り返しになる（2026-08-17に修正した状態）。
  await guard("ブログ description がタイトルと別文", async () => {
    const r = await get(`/blog/${BLOG_SAMPLE}`, { redirect: "follow" });
    // 記事タイトル自体に「｜」が含まれることがあるので、先頭で分割してはいけない。
    // title テンプレートのサイト名サフィックスだけを末尾から取り除く。
    const SUFFIX = "｜パソコン修理・設定 BULLCOM";
    const rawTitle = (r.body.match(/<title>([^<]*)<\/title>/)?.[1] || "").trim();
    const title = rawTitle.endsWith(SUFFIX) ? rawTitle.slice(0, -SUFFIX.length).trim() : rawTitle;
    const desc = r.body.match(/<meta name="description" content="([^"]+)"/)?.[1] || "";
    const ok = desc.length > 30 && desc !== title;
    check("ブログ description がタイトルと別文", ok, ok ? `${desc.length}字` : "タイトルと同一/空");
  });

  // ---- レポート生成 ----
  const now = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";
  const passed = results.filter((r) => r.ok).length;
  const total = results.length;
  const allOk = passed === total;

  let md = `\n## ${now} — ${passed}/${total} PASS ${allOk ? "✅" : "⚠️ 要確認"}\n\n`;
  md += `| 項目 | 判定 | 詳細 |\n|---|---|---|\n`;
  for (const r of results) {
    md += `| ${r.name} | ${r.ok ? "✅" : "❌"} | ${r.detail} |\n`;
  }
  if (!allOk) {
    md += `\n**要対応:** ${results.filter((r) => !r.ok).map((r) => r.name).join(" / ")}\n`;
  }

  console.log(md);

  if (process.argv.includes("--append")) {
    mkdirSync(dirname(LOG_PATH), { recursive: true });
    const SENTINEL = "<!-- 最新を上に追記 -->";
    const defaultHeader =
      `# bullcom.jp SEO/GEO ヘルスチェック履歴\n\n` +
      `外形の自動チェック履歴（新しい順）。GSC由来の指標（検索順位・表示回数・インデックス数）は週次・月次の手動確認で別途記録する。\n\n` +
      `${SENTINEL}\n`;
    const current = existsSync(LOG_PATH) ? readFileSync(LOG_PATH, "utf8") : defaultHeader;
    const marker = current.includes(SENTINEL) ? SENTINEL : "\n\n";
    const idx = current.indexOf(marker) + marker.length;
    const updated = current.slice(0, idx) + "\n" + md.trimStart() + "\n" + current.slice(idx);
    writeFileSync(LOG_PATH, updated, "utf8");
    console.log(`\n(→ ${LOG_PATH} に追記しました)`);
  }

  // CIで使えるよう、失敗があれば非0終了
  process.exitCode = allOk ? 0 : 1;
}

run();
