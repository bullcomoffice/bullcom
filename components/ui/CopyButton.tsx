"use client";

import { useState } from "react";

/** 文字列をクリップボードにコピーするボタン（配送先の住所など） */
export default function CopyButton({ text, label = "コピー", className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const onClick = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Clipboard API が使えない・拒否されたブラウザ向けの古い方法
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      document.body.removeChild(ta);
    }
    if (ok) {
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }
  };
  return (
    <button type="button" onClick={onClick} className={className} aria-live="polite">
      {done ? "コピーしました" : label}
    </button>
  );
}
