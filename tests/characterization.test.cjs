// tests/characterization.test.cjs
// 既存挙動の固定（リファクタリング前後で不変であること）
const { test } = require('node:test');
const assert = require('node:assert');
const { getPostContent } = require('../scripts/parse-sns-schedule.cjs');

test('sns-schedule.md に存在するIDは投稿文一式を返す', () => {
  const r = getPostContent('uel05wbdklaz'); // 5/29 ランサムウェア記事（sns-schedule.md 記載済み）
  assert.ok(r, 'null が返った');
  assert.match(r.full, /ランサムウェア/);
  assert.strictEqual(r.url, 'https://bullcom.jp/blog/uel05wbdklaz');
  assert.match(r.hashtags, /#PC修理/);
});

test('存在しないIDは null を返す（フォールバック文生成に回る）', () => {
  assert.strictEqual(getPostContent('no-such-id-xyz'), null);
});

test('IDが空なら null', () => {
  assert.strictEqual(getPostContent(''), null);
});
