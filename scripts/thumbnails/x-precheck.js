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

// X の文字数（twitter-text の重み付け）: URL は1本23、Latin などの範囲は1、日本語・全角・絵文字は2。上限280
// ※ 以前は「日本語=1・ASCII=0.5」で数えて上限280と比べており、実際の半分に見積もっていた（2026-10-24 修正）
const xWeightedLength = (text) => {
  const urls = text.match(/https?:\/\/\S+/g) || [];
  const rest = text.replace(/https?:\/\/\S+/g, '');
  const light = (c) => c <= 0x10ff || (c >= 0x2000 && c <= 0x200d) || (c >= 0x2010 && c <= 0x201f) || (c >= 0x2032 && c <= 0x2037);
  return urls.length * 23 + [...rest].reduce((s, ch) => s + (light(ch.codePointAt(0)) ? 1 : 2), 0);
};

const buildText = (e) => `【新着】${e.head}\n\n${e.body}\n\n→ https://bullcom.jp/blog/${e.id}\n\n${e.tags}`;

(async () => {
  const problems = [];
  const seenDate = new Set();
  const seenId = new Set();

  // microCMS 側の予約日と公開状態を取得（100件を超えるので全ページ読む）
  const cms = {};
  const published = new Set();
  for (let offset = 0; ; ) {
    const res = await fetch(`https://${D}.microcms-management.io/api/v1/contents/blogs?limit=100&offset=${offset}`, {
      headers: { 'X-MICROCMS-API-KEY': K },
    });
    const j = await res.json();
    const list = j.contents || [];
    for (const c of list) {
      if (c.reservationTime && c.reservationTime.publishTime) {
        cms[c.id] = c.reservationTime.publishTime.slice(0, 10);
      }
      if ((c.status || []).includes('PUBLISH')) published.add(c.id);
    }
    offset += list.length;
    if (!list.length || offset >= j.totalCount) break;
  }

  for (const e of items) {
    const text = buildText(e);

    if (seenDate.has(e.date)) problems.push(`${e.date}: 日付が重複`);
    seenDate.add(e.date);
    if (seenId.has(e.id)) problems.push(`${e.date}: ID重複 ${e.id}`);
    seenId.add(e.id);

    // microCMS の予約日と一致するか（公開済みの記事は予約が消えているので対象外）
    if (!cms[e.id] && published.has(e.id)) { /* 公開済み */ }
    else if (!cms[e.id]) problems.push(`${e.date}: microCMSに予約が無い (${e.id})`);
    else if (cms[e.id] !== e.date) problems.push(`${e.date}: 予約日不一致 CMS=${cms[e.id]} (${e.id})`);

    // サムネ実在 & サイズ
    const thumb = path.join(FINAL, `${e.id}.jpg`);
    if (!fs.existsSync(thumb)) problems.push(`${e.date}: サムネなし ${e.id}.jpg`);
    else if (fs.statSync(thumb).size > 5 * 1024 * 1024) problems.push(`${e.date}: サムネ5MB超`);

    // 裸ドメイン（URLを除去してから検出）
    const bare = text.replace(/https?:\/\/\S+/g, '').match(/\b[a-z0-9-]+\.(com|jp|net|org)\b/gi);
    if (bare) problems.push(`${e.date}: 裸ドメイン ${bare.join(',')}`);

    const len = xWeightedLength(text);
    if (len > 280) problems.push(`${e.date}: 文字数超過 ${len}（上限280）`);
  }

  console.log(`件数: ${items.length}`);
  console.log(`期間: ${items[0].date} 〜 ${items[items.length - 1].date}`);
  console.log(`\n問題: ${problems.length} 件`);
  problems.forEach((p) => console.log('  - ' + p));

  // 最長・最短を参考表示
  const lens = items.map((e) => xWeightedLength(buildText(e)));
  console.log(`\nX換算文字数: 最小 ${Math.min(...lens)} / 最大 ${Math.max(...lens)} （上限280）`);
})();
