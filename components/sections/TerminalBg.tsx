"use client";

// ターミナルアニメーション背景コンポーネント
const lines = [
  // 列1
  [
    "$ bullcom --check --target=client_pc",
    "› running diagnostics ........... [ OK ]",
    "› scanning storage / memory .... [ OK ]",
    "› malware signature update ..... [ DONE ]",
    "$ bullcom --service list",
    "  ▸ 修理 / 設定 / ネットワーク",
    "  ▸ 出張 (神戸・明石)",
    "  ▸ 郵送修理 (全国対応)",
    "$ _",
  ],
  // 列2
  [
    "BULLCOM@server:~$ netstat -a",
    "Active connections:",
    "  TCP  0.0.0.0:80   LISTEN",
    "  TCP  0.0.0.0:443  LISTEN",
    "$ ping 192.168.1.1 -c 4",
    "64 bytes: icmp_seq=1 ttl=64",
    "64 bytes: icmp_seq=2 ttl=64",
    "64 bytes: icmp_seq=3 ttl=64",
    "--- 0% packet loss ---",
  ],
  // 列3
  [
    "$ virus-scan --full-scan ./",
    "Scanning: C:\\Users\\... ██████ 100%",
    "Threats found: 0",
    "Status: CLEAN ✓",
    "$ backup --incremental",
    "Backup size: 4.2 GB",
    "Destination: NAS_BULLCOM",
    "Progress: ████████ 100%",
    "Backup complete ✓",
  ],
  // 列4
  [
    "$ wifi-config --ssid HOME_NET",
    "Connecting to HOME_NET...",
    "DHCP lease acquired",
    "IP: 192.168.0.105",
    "Gateway: 192.168.0.1",
    "DNS: 8.8.8.8",
    "Speed: 600 Mbps ↑↓",
    "Status: CONNECTED ✓",
    "$ _",
  ],
  // 列5
  [
    "$ sfc /scannow",
    "Verification 100% complete.",
    "Windows Resource Protection",
    "did not find any integrity",
    "violations.",
    "$ DISM /Online /Cleanup",
    "The operation completed",
    "successfully.",
    "Restart required.",
  ],
  // 列6
  [
    "$ setup-pc --new-user",
    "Installing Windows updates...",
    "Update 1/12 .... [ DONE ]",
    "Update 2/12 .... [ DONE ]",
    "Update 12/12 ... [ DONE ]",
    "Installing Office 365...",
    "Configuring printer...",
    "Setup complete ✓",
    "$ _",
  ],
];

export default function TerminalBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* ダーク背景用オーバーレイ */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.45) 100%)",
        zIndex: 2,
      }} />

      {/* グリッドパターン */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        zIndex: 1,
      }} />

      {/* ターミナルカラム */}
      <div style={{
        position: "absolute", inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${lines.length}, 1fr)`,
        gap: 0,
        zIndex: 1,
      }}>
        {lines.map((col, ci) => (
          <div
            key={ci}
            style={{
              overflow: "hidden",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                animation: `termScroll${ci % 3} ${18 + ci * 4}s linear infinite`,
                animationDelay: `${-ci * 3}s`,
                fontFamily: "'SF Mono','Menlo','Consolas','Courier New',monospace",
                fontSize: "11px",
                lineHeight: "1.8",
                color: "rgba(100,180,255,0.45)",
                padding: "0 12px",
                whiteSpace: "nowrap",
              }}
            >
              {/* テキストを2回繰り返してループ感を出す */}
              {[...col, ...col, ...col].map((line, li) => {
                const isOk = line.includes("[ OK ]") || line.includes("[ DONE ]") || line.includes("✓");
                const isCmd = line.startsWith("$") || line.startsWith("BULLCOM");
                return (
                  <div
                    key={li}
                    style={{
                      color: isOk
                        ? "rgba(80,220,140,0.75)"
                        : isCmd
                        ? "rgba(150,210,255,0.85)"
                        : "rgba(100,180,255,0.4)",
                      fontWeight: isCmd ? 600 : 400,
                    }}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* スキャンライン効果 */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,95,184,0.015) 3px, rgba(44,95,184,0.015) 4px)",
        zIndex: 3,
      }} />

      <style>{`
        @keyframes termScroll0 { from { transform: translateY(0); } to { transform: translateY(-33.33%); } }
        @keyframes termScroll1 { from { transform: translateY(-5%); } to { transform: translateY(-38.33%); } }
        @keyframes termScroll2 { from { transform: translateY(-10%); } to { transform: translateY(-43.33%); } }
      `}</style>
    </div>
  );
}
