/**
 * x-precheck.js - X予約投稿データの事前チェック
 * 裸ドメイン / X換算文字数 / サムネ実在 / microCMS側の予約日との一致
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'x-schedule.json'), 'utf8'));
const FINAL = 'D:\\Data\\Projects\\Next\\design\\bullcomjp_blog\\final';

const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const D = env.MICROCMS_SERVICE_DOMAIN, K = env.MICROCMS_API_KEY;

const buildText = (e) => `【新着】${e.head}\n\n${e.body}\n\n→ https://bullcom.jp/blog/${e.id}\n\n${e.tags}`;

(async () => {
  const problems = [];
  const seenDate = new Set();
  const seenId = new Set();

  // microCMS 側の予約日を取得
  const res = await fetch(`https://${D}.microcms-management.io/api/v1/contents/blogs?limit=100`, {
    headers: { 'X-MICROCMS-API-KEY': K },
  });
  const cms = {};
  for (const c of (await res.json()).contents || []) {
    if (c.reservationTime && c.reservationTime.publishTime) {
      cms[c.id] = c.reservationTime.publishTime.slice(0, 10);
    }
  }

  for (const e of items) {
    const text = buildText(e);

    if (seenDate.has(e.date)) problems.push(`${e.date}: 日付が重複`);
    seenDate.add(e.date);
    if (seenId.has(e.id)) problems.push(`${e.date}: ID重複 ${e.id}`);
    seenId.add(e.id);

    // microCMS の予約日と一致するか
    if (!cms[e.id]) problems.push(`${e.date}: microCMSに予約が無い (${e.id})`);
    else if (cms[e.id] !== e.date) problems.push(`${e.date}: 予約日不一致 CMS=${cms[e.id]} (${e.id})`);

    // サムネ実在 & サイズ
    const thumb = path.join(FINAL, `${e.id}.jpg`);
    if (!fs.existsSync(thumb)) problems.push(`${e.date}: サムネなし ${e.id}.jpg`);
    else if (fs.statSync(thumb).size > 5 * 1024 * 1024) problems.push(`${e.date}: サムネ5MB超`);

    // 裸ドメイン（URLを除去してから検出）
    const bare = text.replace(/https?:\/\/\S+/g, '').match(/\b[a-z0-9-]+\.(com|jp|net|org)\b/gi);
    if (bare) problems.push(`${e.date}: 裸ドメイン ${bare.join(',')}`);

    // X換算文字数（URL=11.5 / ASCII=0.5 / その他=1、上限280）
    const noUrl = text.replace(/https?:\/\/\S+/g, '');
    const len = [...noUrl].reduce((s, c) => s + (c.charCodeAt(0) < 128 ? 0.5 : 1), 0)
      + (text.match(/https?:\/\/\S+/g) || []).length * 11.5;
    if (len > 280) problems.push(`${e.date}: 文字数超過 ${Math.ceil(len)}`);
  }

  console.log(`件数: ${items.length}`);
  console.log(`期間: ${items[0].date} 〜 ${items[items.length - 1].date}`);
  console.log(`\n問題: ${problems.length} 件`);
  problems.forEach((p) => console.log('  - ' + p));

  // 最長・最短を参考表示
  const lens = items.map((e) => {
    const t = buildText(e).replace(/https?:\/\/\S+/g, '');
    return Math.ceil([...t].reduce((s, c) => s + (c.charCodeAt(0) < 128 ? 0.5 : 1), 0) + 11.5);
  });
  console.log(`\nX換算文字数: 最小 ${Math.min(...lens)} / 最大 ${Math.max(...lens)} （上限280）`);
})();
