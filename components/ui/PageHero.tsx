import Link from "next/link";
import TerminalBg from "@/components/sections/TerminalBg";

type Props = {
  sub: string;
  title: string;
  lead?: string;
  crumb: string;
};

export default function PageHero({ sub, title, lead, crumb }: Props) {
  return (
    <section className="page-hero">
      <TerminalBg />
      <div className="page-hero__scrim" aria-hidden="true" />
      <div className="page-hero__scanline" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <div className="page-hero__crumb">
            <Link href="/">トップ</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span>{crumb}</span>
          </div>
          <div className="page-hero__eyebrow"><span aria-hidden="true" /> <p>{sub}</p></div>
          <h1 className="page-hero__title">{title}</h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
        </div>
        <div className="page-hero__agent" aria-hidden="true">
          <div className="page-hero__agent-bar"><span /><span /><span /> <b>SYSTEM STATUS</b></div>
          <div className="page-hero__agent-body">
            <p><span>&gt;</span> BULLCOM AGENT ONLINE</p>
            <p><span>✓</span> diagnosis ready</p>
            <p><span>✓</span> secure support channel</p>
            <div><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
