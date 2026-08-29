#!/usr/bin/env bash
# scripts/articles/ 配下の記事をまとめて下書き＋予約投入する。
#
# 使い方:
#   bash scripts/tools/publish-batch.sh <mdファイル...>
#
# 各mdの front matter に publishAt があれば予約公開まで設定する。
# publish-blog.js 側で投入後に実ステータスを検証するため、
# 想定と違う状態になったファイルがあればそこで止まる（成功したものは表示に残る）。
#
# 注意: eyecatch(thumbnail) は microCMS にアップした画像しか受け付けないため、
#       front matter に thumbnail があっても本スクリプトでは一時的に除去して投入する。
#       サムネイルは全記事の本文が揃ってから別途アップロードして紐付ける。

set -u
cd "$(dirname "$0")/../.." || exit 1

if [ -z "${MICROCMS_API_KEY:-}" ]; then
  KEY=$(grep -o '^MICROCMS_API_KEY=.*' .env.local 2>/dev/null | cut -d= -f2)
  if [ -z "$KEY" ]; then
    echo "エラー: MICROCMS_API_KEY が取得できません" >&2
    exit 1
  fi
  export MICROCMS_API_KEY="$KEY"
fi

TMPDIR_LOCAL="${TMPDIR:-/tmp}/bullcom-batch-$$"
mkdir -p "$TMPDIR_LOCAL"
trap 'rm -rf "$TMPDIR_LOCAL"' EXIT

ok=0; ng=0
for f in "$@"; do
  base=$(basename "$f")
  tmp="$TMPDIR_LOCAL/$base"
  # thumbnail 行だけ落として投入用の一時ファイルを作る
  grep -v '^thumbnail:' "$f" > "$tmp"

  # 既に投入済み（front matter に id がある）なら更新モード
  if grep -q '^id:' "$tmp"; then
    mode="--update"
  else
    mode=""
  fi

  echo "────────────────────────────────────────"
  echo "▶ $base ${mode:+(更新)}"
  out=$(node scripts/publish-blog.js "$tmp" $mode 2>&1)
  echo "$out" | grep -E 'ID:|予約公開|status |reservationTime|エラー' | sed 's/^/   /'

  if echo "$out" | grep -q '🎉 完了'; then
    ok=$((ok+1))
    # 新規投入なら、払い出されたIDを元のmdに書き戻す（次回以降は更新扱いにする）
    if [ -z "$mode" ]; then
      newid=$(echo "$out" | grep -oE '^   id: [a-z0-9_-]+' | head -1 | awk '{print $2}')
      [ -z "$newid" ] && newid=$(echo "$out" | grep -oE 'id: [a-z0-9_-]+' | head -1 | awk '{print $2}')
      if [ -n "$newid" ] && ! grep -q '^id:' "$f"; then
        # front matter の閉じ --- の直前に id を挿入
        awk -v id="$newid" 'NR>1 && /^---$/ && !done {print "id: " id; done=1} {print}' "$f" > "$f.new" && mv "$f.new" "$f"
        echo "   → md に id: $newid を記録"
      fi
    fi
  else
    ng=$((ng+1))
    echo "   ⚠ 失敗"
  fi
done

echo "────────────────────────────────────────"
echo "完了: 成功 $ok 件 / 失敗 $ng 件"
[ "$ng" -eq 0 ] || exit 1
