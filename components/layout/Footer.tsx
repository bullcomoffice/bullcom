import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* ブランド */}
          <div className="footer-col">
            <div className="footer-logo">
              <Image src="/logo-full.png" alt="BULLCOM" width={160} height={44} style={{ height: "44px", width: "auto", marginBottom: "16px", filter: "brightness(1.05)" }} />
            </div>
            <div className="footer-info">
              <strong>パソコン修理・設定 BULLCOM</strong>
              〒651-2113<br />兵庫県神戸市西区伊川谷町846-10<br />ギャラリエ1F<br /><br />
              TEL: 078-912-2656<br />FAX: 078-939-6660<br />Mail: info@bullcom.jp<br /><br />
              事務所営業時間: 9:30〜15:30<br />連絡受付時間: 9:00〜19:00<br />定休日: 不定休
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">サービス一覧</Link></li>
              <li><Link href="/services#personal">個人のお客様</Link></li>
              <li><Link href="/services#business">法人のお客様</Link></li>
              <li><Link href="/price">料金・プラン</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="footer-col">
            <h4>Information</h4>
            <ul>
              <li><Link href="/about">会社概要</Link></li>
              <li><Link href="/faq">よくある質問</Link></li>
              <li><Link href="/blog">ブログ・コラム</Link></li>
              <li><Link href="/privacy">プライバシーポリシー</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><Link href="/contact">お問い合わせ</Link></li>
              <li><a href="https://lin.ee/vX5z2Xf" target="_blank" rel="noopener noreferrer">LINEで相談</a></li>
              <li><a href="tel:0789122656">電話でお問い合わせ</a></li>
            </ul>
            <h4 style={{ marginTop: "32px" }}>Follow</h4>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.1.5 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.5C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c1.3-.1 2.1-.3 2.9-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.5-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.1-.5-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.8.6 19 .3 18.2.1 16.9.1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.8a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z"/></svg>
              </a>
              <a href="#" aria-label="X">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BULLCOM All Rights Reserved.</span>
          <span><Link href="/privacy">プライバシーポリシー</Link></span>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #0e1a2f;
          color: #c4d0e3;
          padding: 64px 0 32px;
        }
        .site-footer a { color: #c4d0e3; }
        .site-footer a:hover { color: #fff; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
        }
        .footer-col h4 {
          color: #fff; font-size: 14px;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
          font-family: var(--font-en);
          text-transform: uppercase;
        }
        .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .footer-col ul a { font-size: 14px; }
        .footer-info { font-size: 13.5px; line-height: 1.85; color: #94a3bd; }
        .footer-info strong { color: #fff; display: block; margin-bottom: 8px; font-size: 16px; }
        .footer-bottom {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid #1f2e4d;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px;
          color: #7b89a3;
        }
        .footer-social { display: flex; gap: 12px; margin-top: 16px; }
        .footer-social a {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: #1a2a47;
          transition: background 0.15s;
        }
        .footer-social a:hover { background: var(--color-primary); }
        .footer-social svg { width: 16px; height: 16px; fill: currentColor; }
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </footer>
  );
}
