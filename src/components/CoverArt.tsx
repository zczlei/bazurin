import type { EffectScene } from "@/lib/effects";

type Pose = "stand" | "wave" | "dance" | "zombie";

function Person({
  x,
  y,
  s = 1,
  pose = "stand",
  fill,
}: {
  x: number;
  y: number;
  s?: number;
  pose?: Pose;
  fill: string;
}) {
  const arms: Record<Pose, [number, number, number, number]> = {
    stand: [x - 11 * s, y + 31 * s, x + 11 * s, y + 31 * s],
    wave: [x - 11 * s, y + 31 * s, x + 15 * s, y - 7 * s],
    dance: [x - 16 * s, y - 6 * s, x + 16 * s, y - 6 * s],
    zombie: [x - 19 * s, y + 15 * s, x + 19 * s, y + 13 * s],
  };
  const [lx, ly, rx, ry] = arms[pose];
  const tilt = pose === "zombie" ? 2.5 * s : 0;
  return (
    <g fill={fill} stroke={fill} strokeLinecap="round">
      <circle cx={x + tilt} cy={y} r={6.4 * s} stroke="none" />
      <rect x={x - 8.5 * s} y={y + 8 * s} width={17 * s} height={27 * s} rx={7 * s} stroke="none" />
      <rect x={x - 7.5 * s} y={y + 31 * s} width={6.4 * s} height={24 * s} rx={3 * s} stroke="none" />
      <rect x={x + 1.1 * s} y={y + 31 * s} width={6.4 * s} height={24 * s} rx={3 * s} stroke="none" />
      <line x1={x - 7 * s} y1={y + 12 * s} x2={lx} y2={ly} strokeWidth={4.6 * s} />
      <line x1={x + 7 * s} y1={y + 12 * s} x2={rx} y2={ry} strokeWidth={4.6 * s} />
    </g>
  );
}

function Scene({ scene, uid }: { scene: EffectScene; uid: string }) {
  const g = (n: string) => `${uid}-${n}`;
  switch (scene) {
    case "booth":
      return (
        <>
          <defs>
            <linearGradient id={g("bg")} x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="#ff9440" />
              <stop offset="0.5" stopColor="#ff5d17" />
              <stop offset="1" stopColor="#b33406" />
            </linearGradient>
            <radialGradient id={g("glow")} cx="0.5" cy="0.35" r="0.6">
              <stop offset="0" stopColor="#ffe0b0" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffe0b0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="90" height="160" fill={`url(#${g("bg")})`} />
          <rect width="90" height="160" fill={`url(#${g("glow")})`} />
          {[20, 45, 70].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#7a2405" strokeOpacity="0.25" strokeWidth="0.8" />
          ))}
          <line x1="45" y1="0" x2="45" y2="38" stroke="#2a1408" strokeWidth="0.8" />
          <rect x="42.2" y="38" width="5.6" height="11" rx="2.6" fill="#3b2c22" />
          <Person x={27} y={70} s={1.05} pose="wave" fill="#4a1a06" />
          <Person x={63} y={70} s={1.05} pose="stand" fill="#3a1404" />
        </>
      );
    case "party":
      return (
        <>
          <defs>
            <linearGradient id={g("bg")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5a3614" />
              <stop offset="1" stopColor="#140a04" />
            </linearGradient>
            <radialGradient id={g("ch")} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffe7b0" stopOpacity="0.95" />
              <stop offset="1" stopColor="#ffb850" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="90" height="160" fill={`url(#${g("bg")})`} />
          <circle cx="24" cy="20" r="22" fill={`url(#${g("ch")})`} />
          <circle cx="68" cy="16" r="24" fill={`url(#${g("ch")})`} />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 37) % 90}
              cy={70 + ((i * 53) % 80)}
              r={1.2 + (i % 3)}
              fill="#ffc46b"
              opacity={0.25 + (i % 4) * 0.1}
            />
          ))}
          <Person x={18} y={92} s={0.8} fill="#2b1708" />
          <Person x={74} y={90} s={0.85} fill="#2b1708" />
          <Person x={45} y={74} s={1.15} pose="wave" fill="#120804" />
          <circle cx="62" cy="64" r="2.6" fill="#d9d9d9" />
        </>
      );
    case "redroom":
      return (
        <>
          <defs>
            <radialGradient id={g("bg")} cx="0.5" cy="0.3" r="0.9">
              <stop offset="0" stopColor="#ff3355" />
              <stop offset="0.5" stopColor="#8a0b22" />
              <stop offset="1" stopColor="#1e0207" />
            </radialGradient>
          </defs>
          <rect width="90" height="160" fill={`url(#${g("bg")})`} />
          <Person x={45} y={64} s={1.2} pose="dance" fill="#1a0206" />
          {[8, 24, 40, 56, 72, 88].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={128 - (i % 2) * 4} r="7" fill="#0c0103" />
              <ellipse cx={x} cy={150 - (i % 2) * 4} rx="10" ry="14" fill="#0c0103" />
            </g>
          ))}
          {[14, 50, 78].map((x) => (
            <rect key={x} x={x} y="110" width="4" height="7" rx="1" fill="#fff" opacity="0.85" />
          ))}
        </>
      );
    case "rain":
      return (
        <>
          <defs>
            <linearGradient id={g("bg")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#101c48" />
              <stop offset="1" stopColor="#060a1e" />
            </linearGradient>
            <radialGradient id={g("pink")} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ff3caa" stopOpacity="0.7" />
              <stop offset="1" stopColor="#ff3caa" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={g("blue")} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#2ab8ff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#2ab8ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="90" height="160" fill={`url(#${g("bg")})`} />
          <circle cx="10" cy="50" r="34" fill={`url(#${g("pink")})`} />
          <circle cx="84" cy="36" r="38" fill={`url(#${g("blue")})`} />
          <ellipse cx="45" cy="150" rx="40" ry="8" fill="#7a6bff" opacity="0.35" />
          <Person x={45} y={70} s={1.2} pose="dance" fill="#04060f" />
          {Array.from({ length: 46 }).map((_, i) => {
            const x = (i * 23) % 92;
            const y = (i * 41) % 160;
            return (
              <line key={i} x1={x} y1={y} x2={x - 1.6} y2={y + 9} stroke="#cfe3ff" strokeOpacity="0.45" strokeWidth="0.5" />
            );
          })}
        </>
      );
    case "zombie":
      return (
        <>
          <defs>
            <linearGradient id={g("bg")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#24402a" />
              <stop offset="1" stopColor="#050a06" />
            </linearGradient>
            <radialGradient id={g("fog")} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#cfe8cf" stopOpacity="0.35" />
              <stop offset="1" stopColor="#cfe8cf" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="90" height="160" fill={`url(#${g("bg")})`} />
          <circle cx="45" cy="30" r="30" fill="#9dff7a" opacity="0.12" />
          <Person x={45} y={70} s={1.2} pose="zombie" fill="#050805" />
          <circle cx="44.5" cy="69" r="1" fill="#9dff7a" />
          <circle cx="50" cy="69" r="1" fill="#9dff7a" />
          <ellipse cx="20" cy="140" rx="40" ry="18" fill={`url(#${g("fog")})`} />
          <ellipse cx="75" cy="148" rx="40" ry="16" fill={`url(#${g("fog")})`} />
        </>
      );
  }
}

export function CoverArt({
  scene,
  uid,
  className = "",
  children,
}: {
  scene: EffectScene;
  /** Unique per render on the page (SVG gradient ids). */
  uid: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`cover ${className}`}>
      <svg viewBox="0 0 90 160" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <Scene scene={scene} uid={uid} />
      </svg>
      {children}
    </div>
  );
}
