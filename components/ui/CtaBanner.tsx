import Link from "next/link";

type Props = {
  title: string;
  desc: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CtaBanner({
  title, desc,
  primaryLabel = "LINEで相談",
  primaryHref = "https://lin.ee/vX5z2Xf",
  secondaryLabel = "お問い合わせ",
  secondaryHref = "/contact",
}: Props) {
  return (
    <div className="cta-banner">
      <div className="cta-banner__agent" aria-hidden="true">
        <div><span /><span /><span /> AGENT CHANNEL</div>
        <p><b>●</b> READY TO ASSIST</p>
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="cta-banner__copy">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="cta-banner__actions">
        <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="btn btn-line">{primaryLabel}</a>
        <Link href={secondaryHref} className="btn btn-outline">{secondaryLabel}</Link>
      </div>
    </div>
  );
}
