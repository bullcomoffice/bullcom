// ブログカード表示用の共通定義（トップページ / ブログ一覧で共用）
// 注意: app/blog/[slug]/page.tsx の catColors・formatDate は意図的に別物（詳細ページ専用）。統合しないこと。
export const catColors: Record<string, string> = {
  "テクノロジー":   "#3a73d1",
  "更新情報":       "#2db87a",
  "チュートリアル": "#f5820a",
  "修理":           "#e84a5f",
  "セキュリティ":   "#9b59d4",
  "設定":           "#00b4d8",
  "データ":         "#6366f1",
  "お知らせ":       "#2db87a",
};
export const defaultCatColor = "#3a73d1";

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};
