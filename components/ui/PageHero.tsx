import Link from "next/link";
import Image from "next/image";

type Props = {
  sub: string;
  title: string;
  lead?: string;
  crumb: string;
};

export default function PageHero({ sub, title, lead, crumb }: Props) {
  const illustration = sub === "CONTACT" ? "/illustrations/contact-support.svg" : sub === "SERVICES" || sub === "PRICE" ? "/illustrations/service-support.svg" : "/illustrations/pc-care.svg";
  const illustrationAlt = sub === "CONTACT" ? "お問い合わせを案内するイラスト" : sub === "SERVICES" || sub === "PRICE" ? "パソコンのサービスを案内するイラスト" : "パソコン修理を案内するイラスト";

  return (
    <section className="page-hero">
      <div className="page-hero__dots" aria-hidden="true" />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />
      {/* 右上の光 */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-80px", top: "-80px",
        width: "400px", height: "400px",
        background: "radial-gradient(closest-side, rgba(100,149,237,0.3), transparent)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      {/* 左下の光 */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "-60px", bottom: "-60px",
        width: "300px", height: "300px",
        background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div className="container page-hero__inner" style={{ position: "relative", zIndex: 1 }}>
        <div className="page-hero__copy">
        {/* パンくず */}
        <div className="page-hero__crumb">
          <Link href="/">トップ</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
          <span>{crumb}</span>
        </div>
        {/* eyebrow */}
        <div className="page-hero__eyebrow">
          <p>{sub}</p>
        </div>
        {/* タイトル */}
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        </div>
        <Image className="page-hero__illustration" src={illustration} alt={illustrationAlt} width={360} height={280} priority />
      </div>
    </section>
  );
}
