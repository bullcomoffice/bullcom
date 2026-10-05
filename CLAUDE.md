@AGENTS.md

## ブログの急ぎのネタ（LINE）

急ぎのネタは、ユーザーが LINE グループ「修理ブログネタ」に送る（ふだんのネタ出しは `/blog-create` のいつもの流れ）。
`PYTHONIOENCODING=utf-8 python scripts/line-topics.py` で新着を読む。新着があれば、裏取りしたうえで**いちばん近い公開日に割り込ませる案**を出し、承認を得てから進める。
記事にしたら `--mark` で既読を記録して `scripts/line-topics-state.json` をコミットする。仕組み（受信 Worker・LINE の鍵）は bullcom-ai 側で管理している。
