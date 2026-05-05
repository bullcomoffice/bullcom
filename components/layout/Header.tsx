"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "トップ" },
  { href: "/services", label: "サービス" },
  { href: "/price", label: "料金" },
  { href: "/faq", label: "よくある質問" },
  { href: "/blog", label: "ブログ" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#6495ED]">BULLCOM</span>
            <span className="hidden text-sm text-gray-500 sm:block">
              パソコン修理・設定
            </span>
          </Link>

          {/* PC ナビ */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-700 transition hover:text-[#6495ED]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="tel:0789122656"
              className="text-sm font-bold text-gray-700 hover:text-[#6495ED]"
            >
              📞 078-912-2656
            </a>
            <a
              href="https://lin.ee/XXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#06C755] px-4 py-2 text-sm font-bold text-white transition hover:opacity-80"
            >
              LINEで相談
            </a>
          </div>

          {/* ハンバーガー（SP） */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* SP メニュー */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b py-3 text-sm text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:0789122656" className="mt-4 text-center text-sm font-bold text-gray-700">
              📞 078-912-2656
            </a>
            <a
              href="https://lin.ee/XXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 rounded-full bg-[#06C755] py-2 text-center text-sm font-bold text-white"
            >
              LINEで相談
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
