/**
 * BraveBot — original concept illustration (SVG).
 * Compact upright torso + two articulated wheel-legs + top sensor mast.
 * This is a concept visualization, not a product photograph.
 */
export function BraveBotSVG({
  className = "",
  scanFx = false,
  title = "BraveBot wheel-legged inspection robot — concept visualization",
}: {
  className?: string;
  scanFx?: boolean;
  title?: string;
}) {
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
          <stop offset="0" stopColor="#f1f4f9" />
          <stop offset="0.5" stopColor="#c3cdda" />
          <stop offset="1" stopColor="#9aa7bb" />
        </linearGradient>
        <linearGradient id="bbShellSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b97ac" />
          <stop offset="1" stopColor="#5b6679" />
        </linearGradient>
        <linearGradient id="bbMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#46506a" />
          <stop offset="0.5" stopColor="#8b97ac" />
          <stop offset="1" stopColor="#3a4258" />
        </linearGradient>
        <linearGradient id="bbHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dde3ec" />
          <stop offset="1" stopColor="#aab4c4" />
        </linearGradient>
        <radialGradient id="bbVisor" cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#9ff3ff" />
          <stop offset="0.6" stopColor="#38d6ef" />
          <stop offset="1" stopColor="#0c4a63" />
        </radialGradient>
        <radialGradient id="bbHub2" cx="0.4" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#e6ebf2" />
          <stop offset="0.65" stopColor="#9aa6ba" />
          <stop offset="1" stopColor="#414a60" />
        </radialGradient>
        <linearGradient id="bbOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9148" />
          <stop offset="1" stopColor="#e2560f" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="180" cy="548" rx="150" ry="14" fill="#000000" opacity="0.45" />

      {/* ===== LEGS (behind torso) ===== */}
      {[
        { hip: [130, 446], knee: [96, 500], wheel: [132, 524], k: "L" },
        { hip: [230, 446], knee: [264, 500], wheel: [228, 524], k: "R" },
      ].map((leg) => (
        <g key={leg.k}>
          {/* thigh strut */}
          <line
            x1={leg.hip[0]}
            y1={leg.hip[1]}
            x2={leg.knee[0]}
            y2={leg.knee[1]}
            stroke="url(#bbShellSide)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <line
            x1={leg.hip[0]}
            y1={leg.hip[1]}
            x2={leg.knee[0]}
            y2={leg.knee[1]}
            stroke="#2a3146"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.25"
          />
          {/* shin strut */}
          <line
            x1={leg.knee[0]}
            y1={leg.knee[1]}
            x2={leg.wheel[0]}
            y2={leg.wheel[1]}
            stroke="url(#bbShellSide)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* hip actuator */}
          <circle cx={leg.hip[0]} cy={leg.hip[1]} r="15" fill="#566275" stroke="#cdd6e2" strokeWidth="2" />
          <circle cx={leg.hip[0]} cy={leg.hip[1]} r="5" fill="#ff8a3d" />
          {/* knee actuator */}
          <circle cx={leg.knee[0]} cy={leg.knee[1]} r="12" fill="#566275" stroke="#cdd6e2" strokeWidth="2" />
          <circle cx={leg.knee[0]} cy={leg.knee[1]} r="4" fill="#ff8a3d" />
        </g>
      ))}

      {/* ===== WHEELS ===== */}
      {[
        [132, 524],
        [228, 524],
      ].map(([cx, cy]) => (
        <g key={`w${cx}`}>
          <circle cx={cx} cy={cy} r="29" fill="#0c0f16" />
          <circle cx={cx} cy={cy} r="29" fill="none" stroke="#1c2230" strokeWidth="2" />
          {/* tread ticks */}
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * 25}
                y1={cy + Math.sin(a) * 25}
                x2={cx + Math.cos(a) * 29}
                y2={cy + Math.sin(a) * 29}
                stroke="#2b3344"
                strokeWidth="2.4"
              />
            );
          })}
          <circle cx={cx} cy={cy} r="16" fill="url(#bbHub2)" />
          <circle cx={cx} cy={cy} r="16" fill="none" stroke="#3a4258" strokeWidth="1.5" />
          {/* hub spokes */}
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(a) * 14}
                y2={cy + Math.sin(a) * 14}
                stroke="#5b6679"
                strokeWidth="3"
              />
            );
          })}
          <circle cx={cx} cy={cy} r="5" fill="#ff8a3d" />
        </g>
      ))}

      {/* ===== TORSO ===== */}
      {/* orange protective rails */}
      <rect x="78" y="250" width="13" height="162" rx="6" fill="url(#bbOrange)" />
      <rect x="269" y="250" width="13" height="162" rx="6" fill="url(#bbOrange)" />

      {/* torso body */}
      <rect x="90" y="226" width="180" height="228" rx="20" fill="url(#bbShell)" stroke="#7d8aa0" strokeWidth="2" />
      {/* side shading */}
      <rect x="90" y="226" width="22" height="228" rx="20" fill="url(#bbShellSide)" opacity="0.55" />
      <rect x="248" y="226" width="22" height="228" rx="20" fill="url(#bbShellSide)" opacity="0.55" />

      {/* top + bottom bumpers */}
      <rect x="86" y="222" width="188" height="14" rx="7" fill="#3a4258" />
      <rect x="86" y="444" width="188" height="14" rx="7" fill="#3a4258" />

      {/* front dark screen / sensor panel */}
      <rect x="116" y="250" width="128" height="96" rx="10" fill="#070b14" stroke="#1d2c47" strokeWidth="2" />
      <rect x="124" y="258" width="112" height="80" rx="6" fill="#0a1322" />
      {/* screen UI lines */}
      <line x1="134" y1="276" x2="216" y2="276" stroke="#38d6ef" strokeWidth="2.4" opacity="0.85" />
      <line x1="134" y1="290" x2="196" y2="290" stroke="#38d6ef" strokeWidth="2" opacity="0.5" />
      <line x1="134" y1="302" x2="206" y2="302" stroke="#ff8a3d" strokeWidth="2" opacity="0.7" />
      <rect x="134" y="312" width="44" height="16" rx="3" fill="#0e2a3a" stroke="#38d6ef" strokeWidth="1" opacity="0.8" />
      <rect x="184" y="312" width="44" height="16" rx="3" fill="#2a1608" stroke="#ff8a3d" strokeWidth="1" opacity="0.8" />

      {/* compute module */}
      <rect x="118" y="356" width="124" height="36" rx="6" fill="#11192b" stroke="#2b3a57" strokeWidth="1.6" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={i}
          x1={130 + i * 14}
          y1={362}
          x2={130 + i * 14}
          y2={386}
          stroke="#38d6ef"
          strokeWidth="2"
          opacity="0.4"
        />
      ))}
      <circle cx="232" cy="374" r="3" fill="#4ade80" />

      {/* hot-swap battery module */}
      <rect x="118" y="400" width="124" height="38" rx="6" fill="#1a2236" stroke="#2b3a57" strokeWidth="1.6" />
      <rect x="126" y="408" width="60" height="22" rx="4" fill="#0c1322" />
      {/* battery level */}
      <rect x="129" y="411" width="40" height="16" rx="2" fill="#ff8a3d" opacity="0.85" />
      {/* swap handle */}
      <rect x="196" y="406" width="38" height="10" rx="5" fill="#3a4258" />
      <path d="M204 426 h22 m-6 -5 l6 5 -6 5" stroke="#38d6ef" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* panel screws */}
      {[
        [104, 240],
        [256, 240],
        [104, 440],
        [256, 440],
      ].map(([x, y]) => (
        <circle key={`s${x}${y}`} cx={x} cy={y} r="3.4" fill="#5b6679" stroke="#2a3146" strokeWidth="1" />
      ))}
      {/* side handle */}
      <path d="M268 286 q16 0 16 18 v22 q0 18 -16 18" fill="none" stroke="#3a4258" strokeWidth="6" strokeLinecap="round" />
      {/* cable channel */}
      <path d="M96 300 q-6 40 4 90" fill="none" stroke="#2b3a57" strokeWidth="3" strokeDasharray="2 4" />

      {/* ===== NECK / MAST POST ===== */}
      <rect x="166" y="186" width="28" height="46" rx="6" fill="url(#bbMetal)" />
      <line x1="170" y1="196" x2="190" y2="196" stroke="#2a3146" strokeWidth="2" />
      <line x1="170" y1="206" x2="190" y2="206" stroke="#2a3146" strokeWidth="2" />
      <line x1="170" y1="216" x2="190" y2="216" stroke="#2a3146" strokeWidth="2" />

      {/* ===== SENSOR HEAD / MAST ===== */}
      {/* antenna */}
      <line x1="180" y1="44" x2="180" y2="26" stroke="#3a4258" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="180" cy="24" r="4" fill="#ff8a3d" className={scanFx ? "anim-blink" : ""} />

      {/* head housing */}
      <rect x="94" y="44" width="172" height="150" rx="18" fill="url(#bbHead)" stroke="#7d8aa0" strokeWidth="2" />
      <rect x="94" y="44" width="20" height="150" rx="16" fill="url(#bbShellSide)" opacity="0.5" />
      <rect x="246" y="44" width="20" height="150" rx="16" fill="url(#bbShellSide)" opacity="0.5" />

      {/* visor band */}
      <rect x="104" y="64" width="152" height="58" rx="12" fill="#070b14" stroke="#1d2c47" strokeWidth="2" />

      {/* acoustic imaging array (left) — hex of mic ports */}
      {[
        [128, 80],
        [142, 80],
        [156, 80],
        [121, 93],
        [135, 93],
        [149, 93],
        [128, 106],
        [142, 106],
        [156, 106],
      ].map(([x, y]) => (
        <circle key={`m${x}${y}`} cx={x} cy={y} r="4.2" fill="#0d2a3a" stroke="#38d6ef" strokeWidth="1.3" />
      ))}

      {/* thermal camera lens (right) */}
      <circle cx="214" cy="93" r="17" fill="#0a0f1a" stroke="#3a4258" strokeWidth="2" />
      <circle cx="214" cy="93" r="11" fill="url(#bbVisor)" opacity="0.5" />
      <circle cx="214" cy="93" r="11" fill="none" stroke="#ff8a3d" strokeWidth="2" />
      <circle cx="210" cy="89" r="3" fill="#ffd9b3" opacity="0.9" />

      {/* visual AI camera (center, below visor) */}
      <rect x="150" y="132" width="60" height="42" rx="8" fill="#0a0f1a" stroke="#3a4258" strokeWidth="2" />
      <circle cx="180" cy="153" r="14" fill="#070b14" stroke="#38d6ef" strokeWidth="2" />
      <circle cx="180" cy="153" r="7" fill="url(#bbVisor)" />
      <circle cx="176" cy="149" r="2.6" fill="#dffaff" />

      {/* gas / laser telemetry module (protrudes at base of head) */}
      <rect x="158" y="188" width="44" height="20" rx="6" fill="#11192b" stroke="#2b3a57" strokeWidth="1.6" />
      <circle cx="170" cy="198" r="4" fill="#4ade80" />
      <circle cx="190" cy="198" r="4" fill="#38d6ef" />

      {/* head detail screws */}
      {[
        [104, 54],
        [256, 54],
        [104, 184],
        [256, 184],
      ].map(([x, y]) => (
        <circle key={`hs${x}${y}`} cx={x} cy={y} r="3" fill="#7d8aa0" stroke="#3a4258" strokeWidth="1" />
      ))}

      {/* ===== SCAN FX overlay ===== */}
      {scanFx && (
        <g style={{ pointerEvents: "none" }}>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx="180"
              cy="120"
              r="60"
              fill="none"
              stroke="#38d6ef"
              strokeWidth="2"
              opacity="0"
              style={{
                transformOrigin: "180px 120px",
                animation: `pulse-ring 3.4s ${i * 1.13}s ease-out infinite`,
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
