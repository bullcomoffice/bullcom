import Link from "next/link";

type Props = {
  sub: string;       // SERVICES / FAQ etc
  title: string;
  lead?: string;
  crumb: string;     // パンくず表示テキスト
};

export default function PageHero({ sub, title, lead, crumb }: Props) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f5f8fc 0%, #eef3fa 100%)",
      borderBottom: "1px solid var(--color-border)",
      padding: "64px 0 56px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", right: "-120px", top: "-120px", width: "480px", height: "480px", background: "radial-gradient(closest-side, rgba(100,149,237,0.18), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ fontSize: "13px", color: "var(--color-text-muted)", display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)" }}>トップ</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
          <span>{crumb}</span>
        </div>
        <p style={{ fontSize: "14px", color: "var(--color-primary)", fontFamily: "var(--font-en)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 12px" }}>{sub}</p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: "8px" }}>{title}</h1>
        {lead && <p style={{ fontSize: "16px", color: "var(--color-text-soft)", maxWidth: "720px", margin: 0 }}>{lead}</p>}
      </div>
    </section>
  );
}
