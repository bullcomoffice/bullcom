// tests/sns-common.test.cjs
// sns-common.cjs の単体テスト（外部通信なし）
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const {
  loadEnvLocal,
  isWithinPostWindow,
  getLastPostedId,
  saveLastPostedId,
} = require('../scripts/lib/sns-common.cjs');

test('isWithinPostWindow: 公開直後の記事は true（既定60分）', () => {
  const saved = process.env.SNS_POST_MAX_MINUTES;
  delete process.env.SNS_POST_MAX_MINUTES;
  try {
    const article = { publishedAt: new Date().toISOString() };
    assert.strictEqual(isWithinPostWindow(article, '[TEST]'), true);
  } finally {
    if (saved !== undefined) process.env.SNS_POST_MAX_MINUTES = saved;
  }
});

test('isWithinPostWindow: SNS_POST_MAX_MINUTES=0 なら過去記事は false', () => {
  const saved = process.env.SNS_POST_MAX_MINUTES;
  process.env.SNS_POST_MAX_MINUTES = '0';
  try {
    const article = { publishedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() };
    assert.strictEqual(isWithinPostWindow(article, '[TEST]'), false);
  } finally {
    if (saved !== undefined) process.env.SNS_POST_MAX_MINUTES = saved;
    else delete process.env.SNS_POST_MAX_MINUTES;
  }
});

test('saveLastPostedId → getLastPostedId のラウンドトリップ', () => {
  const filename = '.last-posted-test';
  const filePath = path.join(__dirname, '..', 'scripts', filename);
  try {
    saveLastPostedId(filename, 'abc123');
    assert.strictEqual(getLastPostedId(filename), 'abc123');
  } finally {
    fs.rmSync(filePath, { force: true }); // gitignore 対象外のため必ず削除
  }
});

test('getLastPostedId: ファイルが無ければ null', () => {
  assert.strictEqual(getLastPostedId('.last-posted-no-such-file'), null);
});

test('loadEnvLocal: 例外を投げずに実行できる', () => {
  assert.doesNotThrow(() => loadEnvLocal());
});
