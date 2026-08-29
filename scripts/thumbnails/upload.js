/**
 * upload.js - 生成済みサムネを microCMS に投入して eyecatch に紐付ける
 *
 *  1) POST {service}.microcms-management.io/api/v1/media       （multipart, 201 → {url}）
 *  2) PATCH {service}.microcms.io/api/v1/blogs/{id}?status=draft {eyecatch: url}
 *  3) management API で status / reservationTime が壊れていないか検証
 *  4) content API（draftKey付き）で eyecatch が実際に入ったか検証
 *
 * ※ 投稿事故の教訓により「成功メッセージ」を信用せず、必ず実データで検証する。
 * ※ 429 対策で1件ごとに待機を入れる（予約設定で実際に429を踏んだため）。
 *
 * 実行: node scripts/thumbnails/upload.js [id ...]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SPEC = path.join(__dirname, 'spec.json');
const FINAL_DIR = 'D:\\Data\\Projects\\Next\\design\\bullcomjp_blog\\final';
const SLEEP_MS = 1500;

const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const DOMAIN = env.MICROCMS_SERVICE_DOMAIN;
const KEY = env.MICROCMS_API_KEY;
const MGMT = `https://${DOMAIN}.microcms-management.io/api/v1`;
const CONTENT = `https://${DOMAIN}.microcms.io/api/v1`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadMedia(filePath, name) {
  const buf = fs.readFileSync(filePath);
  const fd = new FormData();
  fd.append('file', new Blob([buf], { type: 'image/jpeg' }), name);
  const r = await fetch(`${MGMT}/media`, {
    method: 'POST',
    headers: { 'X-MICROCMS-API-KEY': KEY },
    body: fd,
  });
  const text = await r.text();
  if (r.status !== 201) throw new Error(`media upload HTTP ${r.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text).url;
}

async function setEyecatch(id, url) {
  const r = await fetch(`${CONTENT}/blogs/${id}?status=draft`, {
    method: 'PATCH',
    headers: { 'X-MICROCMS-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ eyecatch: url }),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`PATCH HTTP ${r.status}: ${text.slice(0, 200)}`);
}

async function verify(id, expectedUrl) {
  const m = await fetch(`${MGMT}/contents/blogs/${id}`, { headers: { 'X-MICROCMS-API-KEY': KEY } });
  if (!m.ok) throw new Error(`検証: management HTTP ${m.status}`);
  const meta = await m.json();

  if (!(meta.status || []).includes('DRAFT')) {
    throw new Error(`下書きでなくなっている: status=${JSON.stringify(meta.status)}`);
  }
  const pub = meta.reservationTime && meta.reservationTime.publishTime;
  if (!pub) throw new Error('予約公開が消えている');

  const c = await fetch(`${CONTENT}/blogs/${id}?draftKey=${meta.draftKey}&fields=eyecatch`, {
    headers: { 'X-MICROCMS-API-KEY': KEY },
  });
  if (!c.ok) throw new Error(`検証: content HTTP ${c.status}`);
  const j = await c.json();
  const got = j.eyecatch && j.eyecatch.url;
  if (got !== expectedUrl) throw new Error(`eyecatch不一致: ${got}`);

  return { publishTime: pub, w: j.eyecatch.width, h: j.eyecatch.height };
}

(async () => {
  let items = JSON.parse(fs.readFileSync(SPEC, 'utf8'));
  const only = process.argv.slice(2);
  if (only.length) items = items.filter((it) => only.includes(it.id));

  console.log(`[START] 対象 ${items.length} 件\n`);
  let ok = 0, skip = 0, ng = 0;

  for (let i = 0; i < items.length; i++) {
    const { id } = items[i];
    const file = path.join(FINAL_DIR, `${id}.jpg`);
    const tag = `[${String(i + 1).padStart(2, '0')}/${items.length}]`;

    if (!fs.existsSync(file)) {
      console.log(`${tag} SKIP ${id} (画像なし)`);
      skip++;
      continue;
    }

    try {
      const url = await uploadMedia(file, `${id}.jpg`);
      await setEyecatch(id, url);
      const v = await verify(id, url);
      console.log(`${tag} OK   ${id}  ${v.w}x${v.h}  予約 ${v.publishTime}`);
      ok++;
    } catch (e) {
      console.log(`${tag} ERR  ${id}: ${e.message}`);
      ng++;
    }
    await sleep(SLEEP_MS);
  }

  console.log(`\n[RESULT] 成功 ${ok} / スキップ ${skip} / 失敗 ${ng}`);
  if (ng) process.exitCode = 1;
})();
