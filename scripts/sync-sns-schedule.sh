#!/usr/bin/env bash
# Dropbox 内のソース md をリポジトリにコピー
# 使い方: bash scripts/sync-sns-schedule.sh
set -e
SRC="/d/Data/Dropbox/AI/Claude/code/HP/blog_check/bullcom_jp_x_schedule.md"
DST="$(dirname "$0")/sns-schedule.md"
if [ ! -f "$SRC" ]; then
  echo "❌ Source not found: $SRC"
  exit 1
fi
cp "$SRC" "$DST"
echo "✅ Synced: $SRC → $DST"
echo "   git add scripts/sns-schedule.md && git commit -m 'sync: sns-schedule' && git push"
