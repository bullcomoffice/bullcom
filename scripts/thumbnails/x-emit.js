/**
 * x-emit.js - x-schedule.json の N 番目の本文をクリップボードへ入れる
 * 使い方: node scripts/thumbnails/x-emit.js 0
 *
 * 本文を JS/コマンドに一切埋め込まず、ファイル → クリップボード → Ctrl+V で渡す。
 * 書き写しによる文字化け（x-schedule skill §1 の事故）が原理的に起きない。
 * 出力の sha1 をページ側の innerText と突き合わせれば全文一致を機械照合できる。
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const FINAL_DIR = 'D:\\Data\\Projects\\Next\\design\\bullcomjp_blog\\final';

const items = JSON.parse(fs.readFileSync(path.join(HERE, 'x-schedule.json'), 'utf8'));
const i = parseInt(process.argv[2], 10);
if (!(i >= 0 && i < items.length)) {
  console.error(`index 範囲外: ${process.argv[2]} (0..${items.length - 1})`);
  process.exit(1);
}
const e = items[i];
const text = `【新着】${e.head}\n\n${e.body}\n\n→ https://bullcom.jp/blog/${e.id}\n\n${e.tags}`;

const tmp = path.join(HERE, 'x-current.txt');
fs.writeFileSync(tmp, text, 'utf8');

const ps = (cmd) => execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', cmd], { encoding: 'utf8' });

// PowerShell 単引用符内はバックスラッシュがそのままなのでエスケープ不要
ps(`Set-Clipboard -Value ([System.IO.File]::ReadAllText('${tmp}', [System.Text.Encoding]::UTF8))`);

// クリップボードから読み戻して全文一致を検証
const back = ps(`[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; Get-Clipboard -Raw`);
const norm = back.replace(/\r\n/g, '\n').replace(/\n+$/, '');
const clipboardOK = norm === text;

const thumb = path.join(FINAL_DIR, `${e.id}.jpg`);
if (!fs.existsSync(thumb)) {
  console.error(`サムネなし: ${thumb}`);
  process.exit(1);
}

const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex').slice(0, 8);
const [y, m, d] = e.date.split('-').map(Number);

console.log(JSON.stringify({ i, date: e.date, y, m, d, id: e.id, sha1, len: text.length, clipboardOK, thumb }));
if (!clipboardOK) process.exit(1);
