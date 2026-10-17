// tests/geo-facts.test.cjs
// AI検索に読ませる店舗情報（llms.txt・構造化データ・フッター）が、サイトの表示とずれていないかの確認（GEO・2026-10-17）
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const llms = read('public/llms.txt');
const sd = read('lib/structured-data.ts');
const footer = read('components/layout/Footer.tsx');
const about = read('app/about/page.tsx');

test('llms.txt・構造化データ・フッターの住所が会社概要と同じ（有瀬まで入っている）', () => {
  assert.match(about, /伊川谷町有瀬846-10/);
  assert.match(llms, /伊川谷町有瀬 846-10/);
  assert.match(sd, /伊川谷町有瀬846-10/);
  assert.match(footer, /伊川谷町有瀬846-10/);
});

test('電話番号が揃っている', () => {
  for (const s of [llms, sd, footer, about]) assert.match(s, /078-912-2656/);
});

test('llms.txt の営業時間がサイトの表示（事務所9:30〜15:30・連絡受付9:00〜19:00・不定休）と同じ', () => {
  assert.match(llms, /9:30〜15:30/);
  assert.match(llms, /9:00〜19:00/);
  assert.match(llms, /不定休/);
  assert.doesNotMatch(llms, /年中無休/);
});

test('llms.txt にサイトに無い約束（即日対応）を書いていない', () => {
  assert.doesNotMatch(llms, /即日/);
});

test('llms.txt に所在地の誤解（明石拠点）を防ぐ一文がある', () => {
  assert.match(llms, /明石市内ではありません/);
});

// 各ページの文言は「神戸ページの強化」のPRで揃える。ここでは AI 向けの2ファイルだけを見る
test('llms.txt・構造化データで、郵送修理の送料を「往復ともお客様負担」としている', () => {
  for (const p of ['public/llms.txt', 'lib/structured-data.ts']) {
    assert.doesNotMatch(read(p), /返送(料|代金)は当社負担/, p);
  }
  assert.match(llms, /往復ともお客様負担/);
});
