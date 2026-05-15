/**
 * BraveBot — original concept illustration (SVG).
 *
 * Modelled on the real LimX Dynamics TRON 1 (WF_TRON1A) wheel-legged biped:
 * a compact rounded body, two prominent articulated legs with chunky
 * cylindrical hip/knee actuators in the signature bent-knee stance, and
 * rugged wheels at the feet. Modified for BraveBot's inspection role with a
 * top sensor mast, orange protective rails and sealed sensor housings.
 *
 * This is a concept visualization, not a product photograph.
 */
export function BraveBotSVG({
  className = "",
  scanFx = false,
  title = "BraveBot — a modified LimX TRON 1 wheel-legged inspection robot (concept visualization)",
}: {
  className?: string;
  scanFx?: boolean;
  title?: string;
}) {
  /* Leg joint coordinates — bent-knee TRON 1 stance. */
  const legs = [
    { hip: [138, 366], knee: [100, 452], wheel: [142, 512], far: false, k: "L" },
    { hip: [222, 366], knee: [260, 452], wheel: [218, 512], far: true, k: "R" },
  ];

  return (
    <svg
      viewBox="0 0 360 560"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="bbShell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfcfe" />
          <stop offset="0.55" stopColor="#d3dae5" />
          <stop offset="1" stopColor="#a7b2c4" />
        </linearGradient>
        <linearGradient id="bbShellSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9aa6ba" />
          <stop offset="1" stopColor="#5f6a7e" />
        </linearGradient>
        <linearGradient id="bbHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef1f6" />
          <stop offset="1" stopColor="#b6c0cf" />
        </linearGradient>
        <linearGradient id="bbLeg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2b3242" />
          <stop offset="0.5" stopColor="#586377" />
          <stop offset="1" stopColor="#262c3a" />
        </linearGradient>
        <linearGradient id="bbMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#414a5e" />
          <stop offset="0.5" stopColor="#8b97ac" />
          <stop offset="1" stopColor="#363d4f" />
        </linearGradient>
        <radialGradient id="bbJoint" cx="0.38" cy="0.34" r="0.8">
          <stop offset="0" stopColor="#e3e8f0" />
          <stop offset="0.55" stopColor="#8a96aa" />
          <stop offset="1" stopColor="#2f3645" />
        </radialGradient>
        <radialGradient id="bbHub" cx="0.4" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#e6ebf2" />
          <stop offset="0.65" stopColor="#9aa6ba" />
          <stop offset="1" stopColor="#3b4255" />
        </radialGradient>
        <radialGradient id="bbVisor" cx="0.5" cy="0.38" r="0.78">
          <stop offset="0" stopColor="#aef3ff" />
          <stop offset="0.6" stopColor="#1fb6cf" />
          <stop offset="1" stopColor="#0a4a59" />
        </radialGradient>
        <linearGradient id="bbOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#d4490a" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="180" cy="546" rx="146" ry="13" fill="#161a22" opacity="0.16" />

      {/* ===== LEGS — TRON 1 bent-knee articulation (drawn behind body) ===== */}
      {legs.map((leg) => (
        <g key={leg.k} opacity={leg.far ? 0.92 : 1}>
          {/* thigh strut */}
          <line
            x1={leg.hip[0]}
            y1={leg.hip[1]}
            x2={leg.knee[0]}
            y2={leg.knee[1]}
            stroke="url(#bbLeg)"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <line
            x1={leg.hip[0]}
            y1={leg.hip[1]}
            x2={leg.knee[0]}
            y2={leg.knee[1]}
            stroke="#aab4c4"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* shin strut */}
          <line
            x1={leg.knee[0]}
            y1={leg.knee[1]}
            x2={leg.wheel[0]}
            y2={leg.wheel[1]}
            stroke="url(#bbLeg)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <line
            x1={leg.knee[0]}
            y1={leg.knee[1]}
            x2={leg.wheel[0]}
            y2={leg.wheel[1]}
            stroke="#aab4c4"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* hip / abad actuator */}
          <circle cx={leg.hip[0]} cy={leg.hip[1]} r="19" fill="url(#bbJoint)" stroke="#2f3645" strokeWidth="2" />
          <circle cx={leg.hip[0]} cy={leg.hip[1]} r="8" fill="#3a4254" stroke="#aab4c4" strokeWidth="1.5" />

          {/* knee — the signature chunky cylindrical TRON 1 motor */}
          <circle cx={leg.knee[0]} cy={leg.knee[1]} r="23" fill="url(#bbJoint)" stroke="#2f3645" strokeWidth="2.5" />
          <circle cx={leg.knee[0]} cy={leg.knee[1]} r="14" fill="#444d61" stroke="#aab4c4" strokeWidth="1.6" />
          <circle cx={leg.knee[0]} cy={leg.knee[1]} r="6" fill="url(#bbOrange)" />
          {/* knee bolt detail */}
          {[0, 1, 2, 3].map((i) => {
            const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
            return (
              <circle
                key={i}
                cx={leg.knee[0] + Math.cos(a) * 18}
                cy={leg.knee[1] + Math.sin(a) * 18}
                r="2.4"
                fill="#cdd6e2"
              />
            );
          })}
        </g>
      ))}

      {/* ===== WHEELS ===== */}
      {legs.map((leg) => {
        const [cx, cy] = leg.wheel;
        return (
          <g key={`w${leg.k}`} opacity={leg.far ? 0.92 : 1}>
            <circle cx={cx} cy={cy} r="32" fill="#0d1018" />
            <circle cx={cx} cy={cy} r="32" fill="none" stroke="#272d3b" strokeWidth="2.5" />
            {/* tread ticks */}
            {Array.from({ length: 18 }).map((_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(a) * 27}
                  y1={cy + Math.sin(a) * 27}
                  x2={cx + Math.cos(a) * 32}
                  y2={cy + Math.sin(a) * 32}
                  stroke="#2d3445"
                  strokeWidth="2.6"
                />
              );
            })}
            <circle cx={cx} cy={cy} r="17" fill="url(#bbHub)" />
            <circle cx={cx} cy={cy} r="17" fill="none" stroke="#3b4255" strokeWidth="1.6" />
            {Array.from({ length: 5 }).map((_, i) => {
              const a = (i / 5) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={cx + Math.cos(a) * 15}
                  y2={cy + Math.sin(a) * 15}
                  stroke="#5f6a7e"
                  strokeWidth="3.2"
                />
              );
            })}
            <circle cx={cx} cy={cy} r="5.5" fill="url(#bbOrange)" />
          </g>
        );
      })}

      {/* ===== TRON 1 BODY — compact rounded module ===== */}
      {/* orange protective rails */}
      <rect x="74" y="208" width="14" height="132" rx="7" fill="url(#bbOrange)" />
      <rect x="272" y="208" width="14" height="132" rx="7" fill="url(#bbOrange)" />

      {/* main body shell */}
      <rect x="86" y="186" width="188" height="192" rx="30" fill="url(#bbShell)" stroke="#828ea3" strokeWidth="2" />
      {/* side shading */}
      <rect x="86" y="186" width="26" height="192" rx="26" fill="url(#bbShellSide)" opacity="0.5" />
      <rect x="248" y="186" width="26" height="192" rx="26" fill="url(#bbShellSide)" opacity="0.5" />

      {/* top + bottom bumpers */}
      <rect x="92" y="180" width="176" height="14" rx="7" fill="#3a4254" />
      <rect x="100" y="368" width="160" height="14" rx="7" fill="#3a4254" />

      {/* front dark sensor / display panel */}
      <rect x="112" y="204" width="136" height="96" rx="12" fill="#0c111c" stroke="#2a3344" strokeWidth="2" />
      <rect x="120" y="212" width="120" height="80" rx="7" fill="#0a1019" />
      {/* on-panel UI */}
      <line x1="131" y1="230" x2="214" y2="230" stroke="#1fb6cf" strokeWidth="2.6" opacity="0.9" />
      <line x1="131" y1="244" x2="195" y2="244" stroke="#1fb6cf" strokeWidth="2" opacity="0.5" />
      <line x1="131" y1="256" x2="205" y2="256" stroke="#ff8a3d" strokeWidth="2" opacity="0.75" />
      <rect x="131" y="266" width="46" height="16" rx="3" fill="#0e2a33" stroke="#1fb6cf" strokeWidth="1" opacity="0.85" />
      <rect x="183" y="266" width="46" height="16" rx="3" fill="#2a1608" stroke="#ff8a3d" strokeWidth="1" opacity="0.85" />

      {/* compute module strip */}
      <rect x="114" y="308" width="132" height="30" rx="6" fill="#11192a" stroke="#2b3a52" strokeWidth="1.6" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={126 + i * 14}
          y1={313}
          x2={126 + i * 14}
          y2={333}
          stroke="#1fb6cf"
          strokeWidth="2"
          opacity="0.4"
        />
      ))}
      <circle cx="236" cy="323" r="3" fill="#4ade80" />

      {/* hot-swap battery module */}
      <rect x="114" y="344" width="132" height="22" rx="5" fill="#1b2336" stroke="#2b3a52" strokeWidth="1.6" />
      <rect x="121" y="349" width="56" height="12" rx="3" fill="#0c1119" />
      <rect x="123" y="351" width="38" height="8" rx="2" fill="#ff8a3d" opacity="0.85" />
      <path d="M196 355 h26 m-7 -5 l7 5 -7 5" stroke="#1fb6cf" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* body screws + side handle */}
      {[
        [102, 200],
        [258, 200],
        [104, 360],
        [256, 360],
      ].map(([x, y]) => (
        <circle key={`s${x}${y}`} cx={x} cy={y} r="3.4" fill="#5f6a7e" stroke="#2a3140" strokeWidth="1" />
      ))}
      <path d="M274 246 q14 0 14 16 v18 q0 16 -14 16" fill="none" stroke="#3a4254" strokeWidth="6" strokeLinecap="round" />

      {/* ===== NECK / MAST POST (BraveBot modification) ===== */}
      <rect x="166" y="142" width="28" height="50" rx="6" fill="url(#bbMetal)" />
      <line x1="170" y1="152" x2="190" y2="152" stroke="#262c3a" strokeWidth="2" />
      <line x1="170" y1="162" x2="190" y2="162" stroke="#262c3a" strokeWidth="2" />
      <line x1="170" y1="172" x2="190" y2="172" stroke="#262c3a" strokeWidth="2" />

      {/* ===== SENSOR HEAD / MAST (BraveBot modification) ===== */}
      {/* antenna */}
      <line x1="180" y1="32" x2="180" y2="14" stroke="#3a4254" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="180" cy="12" r="4" fill="#ff8a3d" className={scanFx ? "anim-blink" : ""} />

      {/* head housing */}
      <rect x="104" y="32" width="152" height="116" rx="18" fill="url(#bbHead)" stroke="#828ea3" strokeWidth="2" />
      <rect x="104" y="32" width="20" height="116" rx="16" fill="url(#bbShellSide)" opacity="0.45" />
      <rect x="236" y="32" width="20" height="116" rx="16" fill="url(#bbShellSide)" opacity="0.45" />

      {/* visor band */}
      <rect x="114" y="50" width="132" height="46" rx="11" fill="#0a1019" stroke="#2a3344" strokeWidth="2" />

      {/* acoustic imaging array (left — hex of mic ports) */}
      {[
        [134, 62],
        [147, 62],
        [160, 62],
        [127, 73],
        [140, 73],
        [153, 73],
        [134, 84],
        [147, 84],
        [160, 84],
      ].map(([x, y]) => (
        <circle key={`m${x}${y}`} cx={x} cy={y} r="3.9" fill="#0d2730" stroke="#1fb6cf" strokeWidth="1.3" />
      ))}

      {/* thermal camera lens (right) */}
      <circle cx="212" cy="73" r="16" fill="#090d15" stroke="#3a4254" strokeWidth="2" />
      <circle cx="212" cy="73" r="10" fill="url(#bbVisor)" opacity="0.5" />
      <circle cx="212" cy="73" r="10" fill="none" stroke="#ff8a3d" strokeWidth="2" />
      <circle cx="208" cy="69" r="2.6" fill="#ffd9b3" opacity="0.9" />

      {/* visual AI camera (center, below visor) */}
      <rect x="152" y="104" width="56" height="38" rx="8" fill="#090d15" stroke="#3a4254" strokeWidth="2" />
      <circle cx="180" cy="123" r="13" fill="#0a1019" stroke="#1fb6cf" strokeWidth="2" />
      <circle cx="180" cy="123" r="6.5" fill="url(#bbVisor)" />
      <circle cx="176" cy="119" r="2.4" fill="#dffaff" />

      {/* gas / laser telemetry module (protrudes at base of head) */}
      <rect x="158" y="142" width="44" height="18" rx="6" fill="#11192a" stroke="#2b3a52" strokeWidth="1.6" />
      <circle cx="170" cy="151" r="3.6" fill="#4ade80" />
      <circle cx="190" cy="151" r="3.6" fill="#1fb6cf" />

      {/* head screws */}
      {[
        [114, 42],
        [246, 42],
        [114, 138],
        [246, 138],
      ].map(([x, y]) => (
        <circle key={`hs${x}${y}`} cx={x} cy={y} r="3" fill="#828ea3" stroke="#3a4254" strokeWidth="1" />
      ))}

      {/* ===== SCAN FX overlay ===== */}
      {scanFx && (
        <g style={{ pointerEvents: "none" }}>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx="180"
              cy="92"
              r="58"
              fill="none"
              stroke="#3d6dfb"
              strokeWidth="2"
              opacity="0"
              style={{
                transformOrigin: "180px 92px",
                animation: `pulse-ring 3.4s ${i * 1.13}s ease-out infinite`,
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
