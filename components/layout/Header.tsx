"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "トップ", key: "home" },
  { href: "/services", label: "サービス", key: "services" },
  { href: "/price", label: "料金", key: "price" },
  { href: "/faq", label: "FAQ", key: "faq" },
  { href: "/blog", label: "ブログ", key: "blog" },
  { href: "/about", label: "会社概要", key: "about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "saturate(140%) blur(8px)",
      borderBottom: "1px solid var(--color-border)",
      height: "var(--header-h)",
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
              style={{
                padding: "10px 16px",
                color: "var(--color-text)",
                fontWeight: 500,
                fontSize: "15px",
                borderRadius: "6px",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.background = "var(--color-bg-tint)";
                (e.target as HTMLElement).style.color = "var(--color-primary)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "var(--color-text)";
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
            <a href="tel:0789122656" style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-primary-dark)", marginTop: "2px" }}>078-912-2656</a>
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
                style={{ padding: "12px 8px", color: "var(--color-text)", borderBottom: "1px solid var(--color-border)", fontSize: "15px", fontWeight: 500 }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:0789122656" style={{ padding: "12px 8px", fontWeight: 700, color: "var(--color-primary-dark)", fontSize: "18px" }}>
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
      `}</style>
    </header>
  );
}
