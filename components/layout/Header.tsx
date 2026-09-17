"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// accent: true のものは色を変えて目立たせる。電話口で
// 「上のメニューの、青いリモートサポート」と言えば迷わず辿り着けるようにするため。
const navLinks = [
  { href: "/", label: "トップ", key: "home" },
  { href: "/services", label: "サービス", key: "services" },
  { href: "/price", label: "料金", key: "price" },
  { href: "/faq", label: "FAQ", key: "faq" },
  { href: "/blog", label: "ブログ", key: "blog" },
  { href: "/about", label: "会社概要", key: "about" },
  { href: "/remote", label: "リモートサポート", key: "remote", accent: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.90)",
      backdropFilter: "saturate(160%) blur(16px)",
      borderBottom: "1px solid var(--color-border)",
      height: "76px",
      display: "flex", alignItems: "center",
    }}>
      <div className="site-header__inner" style={{
        maxWidth: "var(--container)", margin: "0 auto",
        width: "100%", padding: "0 24px",
        display: "flex", alignItems: "center", gap: "32px",
      }}>
        {/* ロゴ */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image src="/logo-full.png" alt="BULLCOM" width={160} height={50} style={{ height: "50px", width: "auto" }} priority />
        </Link>

        {/* PC ナビ */}
        <nav style={{ display: "flex", gap: "4px", flex: 1 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.accent ? "nav-remote" : undefined}
              style={{
                padding: link.accent ? "10px 14px" : "10px 16px",
                color: link.accent ? "var(--color-primary-dark)" : "var(--color-text)",
                fontWeight: link.accent ? 700 : 500,
                fontSize: "15px",
                // 既存6項目は狭い幅で文字を詰めて収める挙動に頼っているので nowrap を付けない。
                // 付けると本来の幅が出てヘッダーが溢れる。リモートは幅に余裕がある時だけ表示する。
                whiteSpace: link.accent ? "nowrap" : undefined,
                borderRadius: "999px",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.background = "var(--color-bg-tint)";
                (e.target as HTMLElement).style.color = "var(--color-primary)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = link.accent ? "var(--color-primary-dark)" : "var(--color-text)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }} className="desktop-cta">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontFamily: "var(--font-en)", lineHeight: 1.1 }}>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}>TEL ・ 9:00〜19:00</span>
            <a href="tel:0789122656" data-tel-loc="header-desktop" style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-primary-dark)", marginTop: "2px" }}>078-912-2656</a>
          </div>
          <Link href="/contact" className="btn btn-primary">
            お問い合わせ
          </Link>
        </div>

        {/* ハンバーガー（SP） */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニュー"
          style={{ display: "none" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", height: "2px", width: "24px", background: "var(--color-text)", transition: "transform 0.2s", transform: isOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", height: "2px", width: "24px", background: "var(--color-text)", opacity: isOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", height: "2px", width: "24px", background: "var(--color-text)", transition: "transform 0.2s", transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </div>
        </button>
      </div>

      {/* SP メニュー */}
      {isOpen && (
        <div style={{
          position: "absolute", top: "var(--header-h)", left: 0, right: 0,
          background: "#fff", borderBottom: "1px solid var(--color-border)",
          zIndex: 99,
        }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "8px 16px 16px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "12px 8px",
                  color: link.accent ? "var(--color-primary-dark)" : "var(--color-text)",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "15px",
                  fontWeight: link.accent ? 700 : 500,
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:0789122656" data-tel-loc="header-mobile" style={{ padding: "12px 8px", fontWeight: 700, color: "var(--color-primary-dark)", fontSize: "18px" }}>
              📞 078-912-2656
            </a>
            <Link href="/contact" className="btn btn-primary" style={{ marginTop: "12px", justifyContent: "center" }} onClick={() => setIsOpen(false)}>
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .nav-toggle { display: flex !important; margin-left: auto; }
        }
        /* ヘッダーは元から余白ゼロで、1000px時点でナビの空きは1pxしかない。
           7項目目（リモートサポート）を常時出すとどの幅でも必ず溢れ、
           電話番号とお問い合わせボタンが画面外に押し出される。
           電話は最大のコンバージョン導線なのでそちらを優先し、
           リモートは幅に余裕がある画面でのみナビに出す。
           狭い画面でも、ヒーローのボタン・フッター・SPメニューから辿れる。 */
        @media (max-width: 1200px) {
          .nav-remote { display: none !important; }
        }
      `}</style>
    </header>
  );
}
