/**
 * parse-sns-schedule.cjs
 * scripts/sns-schedule.md からターゲット記事の投稿テキストを取り出す
 *
 * md内の ``` ... ``` ブロックに `/blog/{id}` を含む行があれば、そのブロックを返す
 */

const fs = require('fs');
const path = require('path');

/**
 * @param {string} articleId microCMS の id（例: 'coa_wy4weig9'）
 * @returns {{ full: string, mainText: string, hashtags: string, url: string } | null}
 */
function getPostContent(articleId) {
  if (!articleId) return null;
  try {
    const mdPath = path.join(__dirname, 'sns-schedule.md');
    if (!fs.existsSync(mdPath)) {
      console.log('[sns-schedule] sns-schedule.md が見つからないため fallback');
      return null;
    }
    const text = fs.readFileSync(mdPath, 'utf8');
    const blocks = [...text.matchAll(/```\s*([\s\S]*?)```/g)];
    for (const m of blocks) {
      const body = m[1].trim();
      if (!body.includes(`/blog/${articleId}`)) continue;

      // 行解析
      const lines = body.split('\n');
      const hashtags = lines.filter((l) => l.trim().startsWith('#')).join(' ').trim();
      const urlMatch = body.match(/→\s*(https?:\/\/\S+)/);
      const url = urlMatch ? urlMatch[1] : '';
      // mainText = URL行・ハッシュタグ行を除いた本文
      const mainText = lines
        .filter((l) => !l.trim().startsWith('→') && !l.trim().startsWith('#'))
        .join('\n')
        .trim();

      console.log(`[sns-schedule] 投稿テキストをmdから取得 (id=${articleId})`);
      return { full: body, mainText, hashtags, url };
    }
    console.log(`[sns-schedule] id=${articleId} の投稿テキストが md に未登録 → fallback`);
    return null;
  } catch (e) {
    console.log(`[sns-schedule] パース失敗: ${e.message}`);
    return null;
  }
}

module.exports = { getPostContent };
