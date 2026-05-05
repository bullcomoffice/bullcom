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
  primaryHref = "#",
  secondaryLabel = "お問い合わせ",
  secondaryHref = "/contact",
}: Props) {
  return (
    <div className="cta-banner">
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="cta-banner__actions">
        <a href={primaryHref} className="btn btn-line">{primaryLabel}</a>
        <Link href={secondaryHref} className="btn btn-outline">{secondaryLabel}</Link>
      </div>
    </div>
  );
}
