import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "会社概要" },
  { href: "/services", label: "サービス一覧" },
  { href: "/price", label: "料金・プラン" },
  { href: "/faq", label: "よくある質問" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* ブランド */}
          <div>
            <p className="text-xl font-bold text-white">BULLCOM</p>
            <p className="mt-1 text-sm text-gray-400">パソコン修理・設定</p>
            <p className="mt-4 text-sm leading-relaxed">
              神戸・明石のパソコントラブル、<br />
              まずご相談ください。<br />
              持ち込み診断料無料。
            </p>
          </div>

          {/* ナビ */}
          <div>
            <p className="mb-4 font-bold text-white">メニュー</p>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 連絡先 */}
          <div>
            <p className="mb-4 font-bold text-white">お問い合わせ</p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>〒651-2113<br />兵庫県神戸市西区伊川谷町846-10<br />ギャラリエ1F</p>
              <p>TEL: <a href="tel:0789122656" className="hover:text-white">078-912-2656</a></p>
              <p>事務所：9:30〜15:30</p>
              <p>連絡受付：9:00〜19:00</p>
              <p>定休日：不定休</p>
            </div>
            <div className="mt-4 flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">X</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BULLCOM All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
