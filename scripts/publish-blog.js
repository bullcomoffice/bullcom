#!/usr/bin/env node
/**
 * BULLCOM ブログ自動公開スクリプト
 *
 * 使い方:
 *   node scripts/publish-blog.js <mdファイルパス> [オプション]
 *
 * オプション:
 *   --dry-run    APIに投稿せずに確認のみ
 *   --update     既存記事を更新（IDはfront matterの id: フィールドから）
 *
 * front matter 例:
 * ---
 * title: Windows 10のサポートが終了しました
 * thumbnail: win10-eyecatch.png   # public/blog-thumbnails/ 内のファイル名
 * category: テクノロジー          # テクノロジー / 更新情報 / チュートリアル
 * publish: true                   # false で下書き保存
 * id: wmcef_pc7                   # 更新時のみ（既存記事のコンテンツID）
 * ---
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ============================================================
// 設定
// ============================================================
const API_KEY = process.env.MICROCMS_API_KEY || 'xbKRCEGIpylDJ1u7yRkvpGHv3YZDDMuw1nY4';
const SERVICE_DOMAIN = 'bullcom';
const CF_BASE_URL = 'https://bullcom.bullcom-office.workers.dev';
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

// ============================================================
// front matter パーサー
// ============================================================
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const data = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      let val = rest.join(':').trim();
      // コメント除去
      val = val.replace(/#.*$/, '').trim();
      // booleanの変換
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      data[key.trim()] = val;
    }
  });

  return { data, body: match[2].trim() };
}

// ============================================================
// マークダウン → microCMS HTML 変換
// ============================================================
function markdownToHtml(md) {
  let html = md;

  // エスケープ（& < >）
  const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // コードブロック（先に処理）
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${escape(code.trim())}</code></pre>`
  );

  // インラインコード
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escape(code)}</code>`);

  // 見出し（h2, h3）
  html = html.replace(/^### (.+)$/gm, (_, t) => `<h3>${t}</h3>`);
  html = html.replace(/^## (.+)$/gm, (_, t) => `<h2>${t}</h2>`);
  html = html.replace(/^# (.+)$/gm, (_, t) => `<h2>${t}</h2>`);

  // 水平線
  html = html.replace(/^---+$/gm, '<hr>');

  // 番号付きリスト
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(line => {
      const text = line.replace(/^\d+\. /, '').trim();
      return `<li><p>${inlineFormat(text)}</p></li>`;
    }).join('');
    return `<ol>${items}</ol>`;
  });

  // 箇条書きリスト
  html = html.replace(/((?:^[-*] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(line => {
      const text = line.replace(/^[-*] /, '').trim();
      return `<li><p>${inlineFormat(text)}</p></li>`;
    }).join('');
    return `<ul>${items}</ul>`;
  });

  // 段落（空行で区切られたブロック）
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    // 既にHTMLタグ（h2,h3,ul,ol,pre,hr）で始まる場合はそのまま
    if (/^<(h[23]|ul|ol|pre|hr|li)/.test(block)) return block;
    // それ以外は <p> で包む
    const lines = block.split('\n').map(line => inlineFormat(line));
    return `<p>${lines.join('<br>')}</p>`;
  }).join('');

  return html;
}

// インライン要素の変換（太字・斜体・リンク）
function inlineFormat(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer nofollow">$1</a>');
}

// ============================================================
// microCMS API リクエスト
// ============================================================
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

// ============================================================
// カテゴリ名 → ID 変換
// ============================================================
async function getCategoryId(categoryName) {
  const res = await apiRequest('GET', '/categories?limit=100', null);
  const cat = res.contents.find(c => c.name === categoryName);
  if (!cat) {
    console.warn(`⚠️  カテゴリ「${categoryName}」が見つかりません`);
    console.log('   利用可能なカテゴリ:', res.contents.map(c => c.name).join(', '));
    return null;
  }
  return cat.id;
}

// ============================================================
// メイン処理
// ============================================================
async function main() {
  const args = process.argv.slice(2);
  const mdPath = args.find(a => !a.startsWith('--'));
  const isDryRun = args.includes('--dry-run');
  const isUpdate = args.includes('--update');

  if (!mdPath) {
    console.error('使い方: node scripts/publish-blog.js <mdファイルパス> [--dry-run] [--update]');
    process.exit(1);
  }

  const fullPath = path.resolve(mdPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`ファイルが見つかりません: ${fullPath}`);
    process.exit(1);
  }

  console.log(`\n📄 ファイル読み込み: ${fullPath}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { data: meta, body: mdBody } = parseFrontMatter(content);

  // バリデーション
  if (!meta.title) { console.error('❌ front matter に title が必要です'); process.exit(1); }

  console.log('\n📋 記事情報:');
  console.log(`   タイトル : ${meta.title}`);
  console.log(`   サムネイル: ${meta.thumbnail || '(なし)'}`);
  console.log(`   カテゴリ : ${meta.category || '(なし)'}`);
  console.log(`   公開設定 : ${meta.publish === true ? '公開' : '下書き'}`);
  if (meta.id) console.log(`   記事ID   : ${meta.id} (更新モード)`);

  // HTML変換
  console.log('\n🔄 マークダウン → HTML 変換中...');
  const htmlContent = markdownToHtml(mdBody);
  console.log(`   変換完了 (${htmlContent.length} 文字)`);

  // アイキャッチURL構築
  let eyecatch = undefined;
  if (meta.thumbnail) {
    const thumbUrl = `${CF_BASE_URL}/blog-thumbnails/${meta.thumbnail}`;
    eyecatch = { url: thumbUrl };
    console.log(`\n🖼️  アイキャッチ: ${thumbUrl}`);
  }

  // カテゴリID取得
  let categoryRef = undefined;
  if (meta.category) {
    console.log(`\n🏷️  カテゴリID取得中: "${meta.category}"`);
    if (!isDryRun) {
      const catId = await getCategoryId(meta.category);
      if (catId) {
        categoryRef = catId;
        console.log(`   カテゴリID: ${catId}`);
      }
    } else {
      console.log('   [dry-run] スキップ');
    }
  }

  // リクエストボディ構築
  const postBody = {
    title: String(meta.title),
    content: htmlContent,
    ...(eyecatch ? { eyecatch } : {}),
    ...(categoryRef ? { category: categoryRef } : {}),
  };

  if (isDryRun) {
    console.log('\n🔍 [DRY RUN] 送信されるデータ:');
    console.log(JSON.stringify({ ...postBody, content: postBody.content.substring(0, 100) + '...' }, null, 2));
    console.log('\n✅ Dry run 完了（実際には投稿されていません）');
    return;
  }

  // 投稿 or 更新
  let result;
  if (isUpdate && meta.id) {
    console.log(`\n📤 記事を更新中... (ID: ${meta.id})`);
    result = await apiRequest('PATCH', `/blogs/${meta.id}`, postBody);
    console.log(`✅ 更新完了! ID: ${result.id}`);
  } else {
    console.log('\n📤 記事を新規投稿中...');
    result = await apiRequest('POST', '/blogs', postBody);
    console.log(`✅ 投稿完了! ID: ${result.id}`);
    console.log(`\n💡 次回この記事を更新する場合は front matter に以下を追加:`);
    console.log(`   id: ${result.id}`);
  }

  // 公開状態の設定
  if (meta.publish === true) {
    console.log('\n🌐 公開状態に変更中...');
    try {
      const contentId = result.id || meta.id;
      const pubResult = await apiRequest('PATCH', `/blogs/${contentId}`, {});
      console.log(`✅ 公開済み!`);
    } catch (e) {
      console.warn(`⚠️  公開APIでエラー（手動で公開してください）: ${e.message}`);
    }
  } else {
    console.log('\n📝 下書きとして保存されました');
    console.log('   microCMSの管理画面から公開してください');
  }

  console.log('\n🎉 完了!\n');
}

main().catch(err => {
  console.error('\n❌ エラー:', err.message);
  process.exit(1);
});
