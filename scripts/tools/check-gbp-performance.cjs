/**
 * check-gbp-performance.cjs
 * Google Business Profile のパフォーマンス指標（電話タップ・経路検索・表示回数など）を取得する（読み取り専用）
 *
 * なぜ必要か:
 *   問い合わせは電話が主導線だが、サイトの tel: リンク計測（GA4 cv_tel_tap）だけでは
 *   Googleマップの「電話」ボタンからの架電が見えない。電話の入口を把握するために、
 *   GBP 側の CALL_CLICKS を週次で並べて見る。（A-13・2026-09-27）
 *
 * API: Business Profile Performance API
 *   GET https://businessprofileperformance.googleapis.com/v1/{locations/ID}:fetchMultiDailyMetricsTimeSeries
 *   GCPプロジェクト bullcom-seo で 2026-09-27 に有効化済み。
 *   ⚠️ 直近数日分は反映が遅れることがある（最新週が0になりやすい）。
 *
 * 実行:
 *   node scripts/tools/check-gbp-performance.cjs                     # 直近28日（昨日まで）を週別に表示
 *   node scripts/tools/check-gbp-performance.cjs 2026-09-20 2026-09-26  # 期間指定
 */

const https = require('https');
const { loadEnvLocal, httpsPostForm } = require('../lib/sns-common.cjs');

loadEnvLocal();

const required = ['GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN', 'GBP_LOCATION_ID'];
for (const e of required) {
  if (!process.env[e]) {
    console.error(`${e} が未設定です`);
    process.exit(1);
  }
}

// 週次レポートで見る指標。表示名は日本語で出す
const METRICS = [
  ['CALL_CLICKS', '電話タップ'],
  ['BUSINESS_DIRECTION_REQUESTS', '経路検索'],
  ['WEBSITE_CLICKS', 'ウェブサイトクリック'],
  ['BUSINESS_IMPRESSIONS_MOBILE_MAPS', '表示: マップ(スマホ)'],
  ['BUSINESS_IMPRESSIONS_DESKTOP_MAPS', '表示: マップ(PC)'],
  ['BUSINESS_IMPRESSIONS_MOBILE_SEARCH', '表示: 検索(スマホ)'],
  ['BUSINESS_IMPRESSIONS_DESKTOP_SEARCH', '表示: 検索(PC)'],
];

function parseDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function get(url, token) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'GET', headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  // 期間: 引数があればそれ、なければ直近28日（昨日まで）
  let end = parseDate(process.argv[3]);
  let start = parseDate(process.argv[2]);
  if (!end) { end = new Date(); end.setDate(end.getDate() - 1); }
  if (!start) { start = new Date(end); start.setDate(start.getDate() - 27); }

  const tokenRes = await httpsPostForm('https://oauth2.googleapis.com/token', new URLSearchParams({
    client_id: process.env.GBP_CLIENT_ID,
    client_secret: process.env.GBP_CLIENT_SECRET,
    refresh_token: process.env.GBP_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }));
  const token = tokenRes.body && tokenRes.body.access_token;
  if (!token) {
    console.error('アクセストークンの取得に失敗しました:', JSON.stringify(tokenRes.body).slice(0, 200));
    process.exit(1);
  }

  const loc = process.env.GBP_LOCATION_ID.replace(/\/$/, ''); // "locations/123..."
  const q = METRICS.map(([m]) => `dailyMetrics=${m}`).join('&')
    + `&dailyRange.start_date.year=${start.getFullYear()}&dailyRange.start_date.month=${start.getMonth() + 1}&dailyRange.start_date.day=${start.getDate()}`
    + `&dailyRange.end_date.year=${end.getFullYear()}&dailyRange.end_date.month=${end.getMonth() + 1}&dailyRange.end_date.day=${end.getDate()}`;
  const res = await get(`https://businessprofileperformance.googleapis.com/v1/${loc}:fetchMultiDailyMetricsTimeSeries?${q}`, token);
  if (res.status !== 200) {
    console.error(`取得に失敗しました: HTTP ${res.status}`);
    console.error(res.body.slice(0, 400));
    process.exit(1);
  }

  // 週の区切り（開始日から7日ごと）
  const weeks = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 7)) {
    const ws = new Date(d);
    const we = new Date(d); we.setDate(we.getDate() + 6);
    weeks.push([ws, we > end ? new Date(end) : we]);
  }

  const totals = {};
  const byWeek = {};
  const data = JSON.parse(res.body);
  for (const series of (data.multiDailyMetricTimeSeries || [])) {
    for (const s of (series.dailyMetricTimeSeries || [])) {
      const vals = (s.timeSeries && s.timeSeries.datedValues) || [];
      totals[s.dailyMetric] = 0;
      byWeek[s.dailyMetric] = weeks.map(() => 0);
      for (const v of vals) {
        const n = Number(v.value || 0);
        const d = new Date(v.date.year, v.date.month - 1, v.date.day);
        totals[s.dailyMetric] += n;
        const wi = weeks.findIndex(([a, b]) => d >= a && d <= b);
        if (wi >= 0) byWeek[s.dailyMetric][wi] += n;
      }
    }
  }

  console.log(`GBP パフォーマンス（${fmt(start)} 〜 ${fmt(end)}）`);
  console.log(`週の区切り: ${weeks.map(([a, b]) => `${fmt(a).slice(5)}〜${fmt(b).slice(5)}`).join(' / ')}`);
  console.log('');
  for (const [key, label] of METRICS) {
    const t = totals[key] ?? 0;
    const w = byWeek[key] || weeks.map(() => 0);
    // 和文と英数字が混ざるラベルは padEnd で揃わないので、数値を先に出してラベルは末尾に置く
    console.log(`  合計 ${String(t).padStart(5)}   週別 ${w.map((x) => String(x).padStart(3)).join(' /')}   ${label}`);
  }
  const imp = METRICS.filter(([k]) => k.startsWith('BUSINESS_IMPRESSIONS')).reduce((a, [k]) => a + (totals[k] || 0), 0);
  console.log('');
  console.log(`  表示回数の合計: ${imp}`);
  console.log('  ※ 直近数日分は反映が遅れることがあります');
})();
