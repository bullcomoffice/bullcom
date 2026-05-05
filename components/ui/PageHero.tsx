import Link from "next/link";

type Props = {
  sub: string;
  title: string;
  lead?: string;
  crumb: string;
};

export default function PageHero({ sub, title, lead, crumb }: Props) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #1e3a6f 0%, #2c5fb8 60%, #4a7fd6 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      padding: "64px 0 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* グリッドパターン */}
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

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* パンくず */}
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>トップ</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}><polyline points="9 18 15 12 9 6"/></svg>
          <span>{crumb}</span>
        </div>
        {/* eyebrow */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{ display: "inline-block", width: "24px", height: "2px", background: "rgba(255,255,255,0.5)" }} />
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-en)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>{sub}</p>
          <span style={{ display: "inline-block", width: "24px", height: "2px", background: "rgba(255,255,255,0.5)" }} />
        </div>
        {/* タイトル */}
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: lead ? "16px" : "0", color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>{title}</h1>
        {lead && <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", maxWidth: "640px", margin: 0, lineHeight: 1.8 }}>{lead}</p>}
      </div>
    </section>
  );
}
