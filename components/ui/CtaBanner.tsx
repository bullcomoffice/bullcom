import Link from "next/link";
import Image from "next/image";

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
      <Image className="cta-banner__art" src="/illustrations/contact-support.svg" alt="ご相談を受け付けるイラスト" width={140} height={109} />
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
