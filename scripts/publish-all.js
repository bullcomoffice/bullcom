#!/usr/bin/env node
/**
 * 全記事一括アップロードスクリプト
 * 使い方: node scripts/publish-all.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.MICROCMS_API_KEY || 'xbKRCEGIpylDJ1u7yRkvpGHv3YZDDMuw1nY4';
const SERVICE_DOMAIN = 'bullcom';
const CF_BASE_URL = 'https://bullcom.bullcom-office.workers.dev';
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;
const ARTICLES_DIR = path.join(__dirname, 'articles');

// ============================================================
// Utilities (publish-blog.js と共通)
// ============================================================
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const data = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      let val = rest.join(':').trim().replace(/#.*$/, '').trim();
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      data[key.trim()] = val;
    }
  });
  return { data, body: match[2].trim() };
}

function inlineFormat(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer nofollow">$1</a>');
}

function markdownToHtml(md) {
  let html = md;
  const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) => `<pre><code>${escape(code.trim())}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escape(code)}</code>`);
  html = html.replace(/^### (.+)$/gm, (_, t) => `<h3>${t}</h3>`);
  html = html.replace(/^## (.+)$/gm, (_, t) => `<h2>${t}</h2>`);
  html = html.replace(/^# (.+)$/gm, (_, t) => `<h2>${t}</h2>`);
  html = html.replace(/^---+$/gm, '<hr>');
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(line => `<li><p>${inlineFormat(line.replace(/^\d+\. /, '').trim())}</p></li>`).join('');
    return `<ol>${items}</ol>`;
  });
  html = html.replace(/((?:^[-*] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(line => `<li><p>${inlineFormat(line.replace(/^[-*] /, '').trim())}</p></li>`).join('');
    return `<ul>${items}</ul>`;
  });
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[23]|ul|ol|pre|hr|li)/.test(block)) return block;
    return `<p>${block.split('\n').map(line => inlineFormat(line)).join('<br>')}</p>`;
  }).join('');
  return html;
}

function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    const bodyStr = body ? JSON.stringify(body) : '';
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'X-MICROCMS-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

// 1秒待機
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================
// カテゴリキャッシュ
// ============================================================
let categoryCache = null;
async function getCategoryId(categoryName) {
  if (!categoryCache) {
    const res = await apiRequest('GET', '/categories?limit=100', null);
    categoryCache = {};
    res.contents.forEach(c => { categoryCache[c.name] = c.id; });
  }
  return categoryCache[categoryName] || null;
}

// ============================================================
// 1ファイルを投稿
// ============================================================
async function publishFile(filePath, isDryRun) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: meta, body: mdBody } = parseFrontMatter(content);

  if (!meta.title) throw new Error('title が見つかりません');

  const htmlContent = markdownToHtml(mdBody);

  let eyecatch;
  if (meta.thumbnail) {
    eyecatch = { url: `${CF_BASE_URL}/blog-thumbnails/${meta.thumbnail}` };
  }

  let categoryId;
  if (meta.category && !isDryRun) {
    categoryId = await getCategoryId(meta.category);
  }

  const postBody = {
    title: String(meta.title),
    content: htmlContent,
    ...(eyecatch ? { eyecatch } : {}),
    ...(categoryId ? { category: categoryId } : {}),
  };

  if (isDryRun) {
    return { id: 'dry-run', title: meta.title };
  }

  // 既存IDがあれば PATCH、なければ POST
  let result;
  if (meta.id) {
    result = await apiRequest('PATCH', `/blogs/${meta.id}`, postBody);
  } else {
    result = await apiRequest('POST', '/blogs', postBody);
  }

  return { id: result.id, title: meta.title };
}

// ============================================================
// メイン
// ============================================================
async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const skipFirst = process.argv.includes('--skip-published'); // 公開済みスキップ

  // 02〜20の記事だけ（windows10-end-of-support.mdは公開済みなのでスキップ）
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md') && /^\d{2}-/.test(f))
    .sort()
    .map(f => path.join(ARTICLES_DIR, f));

  console.log(`\n📚 ${files.length}本の記事を${isDryRun ? '[DRY RUN]' : ''}アップロード開始\n`);
  console.log('=' .repeat(60));

  const results = { success: [], failed: [] };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = path.basename(file);
    process.stdout.write(`[${i + 1}/${files.length}] ${fileName} ... `);

    try {
      const result = await publishFile(file, isDryRun);
      console.log(`✅ ${result.title.substring(0, 40)} (ID: ${result.id})`);
      results.success.push({ file: fileName, ...result });

      // APIレート制限対策：0.5秒待機
      if (!isDryRun) await sleep(500);
    } catch (err) {
      console.log(`❌ エラー: ${err.message}`);
      results.failed.push({ file: fileName, error: err.message });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 結果: 成功 ${results.success.length}本 / 失敗 ${results.failed.length}本\n`);

  if (results.failed.length > 0) {
    console.log('失敗したファイル:');
    results.failed.forEach(r => console.log(`  - ${r.file}: ${r.error}`));
  }

  if (!isDryRun && results.success.length > 0) {
    console.log('\n📝 投稿されたコンテンツIDを articles/ の front matter に追加してください:');
    results.success.forEach(r => {
      if (r.id !== 'dry-run') {
        console.log(`  ${r.file}: id: ${r.id}`);
      }
    });
  }

  console.log('\n🎉 完了!\n');
}

main().catch(err => {
  console.error('\n❌ 致命的エラー:', err.message);
  process.exit(1);
});
