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
 *                publish: false なら下書きのまま、true なら公開中の本文を更新する。
 *                今の状態（下書き／公開中）と publish が食い違うときは更新せずに止まる
 *
 * front matter 例:
 * ---
 * title: Windows 10のサポートが終了しました
 * thumbnail: win10-eyecatch.png   # public/blog-thumbnails/ 内のファイル名
 * category: テクノロジー          # テクノロジー / 更新情報 / チュートリアル
 * publish: true                   # false で下書き保存（?status=draft を付与）
 * publishAt: 2026-08-09 09:00     # 任意。予約公開の日時（JSTとして解釈）
 * id: wmcef_pc7                   # 更新時のみ（既存記事のコンテンツID）
 * ---
 *
 * 注意:
 *  - microCMS の POST は既定で「公開」で作成される。下書きにするには ?status=draft が必須。
 *    これが無いために意図せず公開＋SNS自動投稿まで発火した事故あり（2026-08-12）。
 *  - 投稿後は必ずマネジメントAPIで実ステータスを検証し、想定と違えば異常終了する。
 *  - eyecatch には外部URLを渡せない（microCMSにアップロードした画像のみ）。
 *    サムネイルは別途アップロードして紐付ける。
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ============================================================
// 設定
// ============================================================
const API_KEY = process.env.MICROCMS_API_KEY;
if (!API_KEY) {
  console.error('エラー: 環境変数 MICROCMS_API_KEY が未設定です。');
  console.error('例: MICROCMS_API_KEY=xxxx node scripts/publish-blog.js <mdファイル>');
  process.exit(1);
}
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
  // 改行を LF にそろえる（CRLF の原稿だと表の判定で行末の \r が邪魔をする）
  let html = md.replace(/\r\n?/g, '\n');

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

  // 表（| 見出し | … | の行のあとに |---| の区切り行が続くブロック）
  // ※ 以前は変換しておらず、「| … |」の文字のまま本文に保存されていた（2026-10-24 修正）
  html = html.replace(/((?:^\|.*\|[ \t]*(?:\n|$))+)/gm, (block) => {
    const rows = block.trim().split('\n');
    if (rows.length < 2 || !/^\|[\s:|-]+\|$/.test(rows[1].trim())) return block;
    const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => inlineFormat(c.trim()));
    const th = cells(rows[0]).map((c) => `<th>${c}</th>`).join('');
    const tr = rows.slice(2).map((r) => `<tr>${cells(r).map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
    return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>\n\n`;
  });

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

  // 見出し・リスト・表などのブロック要素の前後に空行を入れる。
  // ※ 見出しやリストの直後に空行なしで段落が続くと、段落が <p> で包まれず、
  //   中の太字・リンクが「**」「[…](…)」のまま残っていた（2026-10-30 修正）
  html = html
    .replace(/(<\/(?:h2|h3|ul|ol|table|pre)>|<hr>)/g, '$1\n\n')
    .replace(/(<(?:h2|h3|ul|ol|table|pre)>|<hr>)/g, '\n\n$1');

  // 段落（空行で区切られたブロック）
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    // 既にHTMLタグ（h2,h3,ul,ol,pre,hr）で始まる場合はそのまま
    if (/^<(h[23]|ul|ol|pre|hr|li|table)/.test(block)) return block;
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
// microCMS マネジメントAPI（ステータス確認・予約公開）
//   ※ APIキーに「コンテンツの取得」「公開状態を変更」「スケジュール設定を変更」の
//      権限が必要（2026-08-12 付与済み）
// ============================================================
const MGMT_BASE = `https://${SERVICE_DOMAIN}.microcms-management.io/api/v1`;

function mgmtRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${MGMT_BASE}${endpoint}`);
    const bodyStr = body !== undefined ? JSON.stringify(body) : '';
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
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data ? JSON.parse(data) : {});
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

// 実際のステータスを取得（スクリプトの出力ではなくAPIの事実を確認するため）
async function fetchActualState(contentId) {
  const c = await mgmtRequest('GET', `/contents/blogs/${contentId}`);
  return {
    status: c.status || [],
    publishTime: c.reservationTime ? c.reservationTime.publishTime : null,
  };
}

// front matter の publishAt (JST想定) を ISO8601(UTC) へ
function toIsoUtc(value) {
  const s = String(value).trim();
  // タイムゾーン未指定なら JST として解釈する
  const hasTz = /[Zz]$|[+-]\d{2}:?\d{2}$/.test(s);
  const d = new Date(hasTz ? s : `${s.replace(' ', 'T')}+09:00`);
  if (isNaN(d.getTime())) throw new Error(`publishAt の日時を解釈できません: ${value}`);
  return d.toISOString();
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
  // ※ microCMS の POST は既定で「公開」状態で作成される。下書きにしたい場合は
  //   必ず ?status=draft を付ける（2026-08-12: これが無く意図せず公開された事故あり）
  const wantPublish = meta.publish === true;
  let result;
  if (isUpdate && meta.id) {
    // ※ PATCH も ?status=draft が無いと「公開」で保存される。以前は常に付けずに更新しており、
    //   下書き（予約記事）に --update すると今すぐ公開され SNS 自動投稿まで走る作りだった（2026-10-24 修正）。
    //   今の状態と front matter の publish を突き合わせ、食い違うときは更新しない。
    const before = await fetchActualState(meta.id);
    const isPublished = before.status.includes('PUBLISH');
    console.log(`\n🔍 更新前の状態: ${JSON.stringify(before.status)} / 予約 ${before.publishTime || '(なし)'}`);
    if (isPublished && !wantPublish) {
      throw new Error(
        `公開中の記事に publish: false で更新しようとしています（公開版と別に下書きができてしまいます）。` +
        `公開中の本文を更新するなら front matter を publish: true にしてください。`
      );
    }
    if (!isPublished && wantPublish) {
      throw new Error(
        `下書きの記事に publish: true で更新しようとしています（今すぐ公開され、SNS 自動投稿も走ります）。` +
        `下書きのまま更新するなら publish: false にしてください。`
      );
    }
    console.log(`\n📤 記事を更新中...（${wantPublish ? '公開中の本文を更新' : '下書きのまま更新'}） (ID: ${meta.id})`);
    result = await apiRequest('PATCH', `/blogs/${meta.id}${wantPublish ? '' : '?status=draft'}`, postBody);
    console.log(`✅ 更新完了! ID: ${result.id}`);
  } else {
    console.log(`\n📤 記事を新規投稿中...（${wantPublish ? '公開' : '下書き'}）`);
    result = await apiRequest('POST', `/blogs${wantPublish ? '' : '?status=draft'}`, postBody);
    console.log(`✅ 投稿完了! ID: ${result.id}`);
    console.log(`\n💡 次回この記事を更新する場合は front matter に以下を追加:`);
    console.log(`   id: ${result.id}`);
  }

  const contentId = result.id || meta.id;

  // 予約公開（front matter の publishAt。例: 2026-08-09 09:00 → JSTとして解釈）
  if (meta.publishAt) {
    const iso = toIsoUtc(meta.publishAt);
    console.log(`\n⏰ 予約公開を設定中: ${meta.publishAt} (JST) → ${iso}`);
    await mgmtRequest('PUT', `/contents/blogs/${contentId}/reservation`, { publishTime: iso });
    console.log('✅ 予約設定完了');
  }

  // 投入結果を必ずAPIで検証する（スクリプトの表示を信用しない）
  console.log('\n🔍 実ステータスを検証中...');
  const actual = await fetchActualState(contentId);
  const expected = wantPublish ? 'PUBLISH' : 'DRAFT';
  const ok = actual.status.includes(expected);
  console.log(`   status         : ${JSON.stringify(actual.status)} (期待: ${expected}) ${ok ? '✅' : '❌'}`);
  console.log(`   reservationTime: ${actual.publishTime || '(なし)'}`);

  if (!ok) {
    throw new Error(
      `想定と異なる状態で登録されました（期待 ${expected} / 実際 ${JSON.stringify(actual.status)}）。` +
      `ID ${contentId} を確認してください。`
    );
  }
  if (meta.publishAt && !actual.publishTime) {
    throw new Error(`予約公開が反映されていません。ID ${contentId} を確認してください。`);
  }

  console.log('\n🎉 完了!\n');
}

main().catch(err => {
  console.error('\n❌ エラー:', err.message);
  process.exit(1);
});
