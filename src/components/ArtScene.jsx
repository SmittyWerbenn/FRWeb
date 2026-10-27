import { Icon } from '../lib/icons'

/**
 * Artwork vektor per tipe bisnis. Dipakai di kartu katalog maupun hero
 * website pratinjau, sehingga tidak butuh aset eksternal.
 */
function Frame({ children, accent, accent2, ink, soft }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`indigo-${accent.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ink} />
          <stop offset="100%" stopColor={accent2} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#indigo-${accent.slice(1)})`} />
      <circle cx="330" cy="40" r="130" fill={accent} opacity="0.18" />
      <circle cx="40" cy="270" r="110" fill={soft} opacity="0.12" />
      {children}
    </svg>
  )
}

const SCENES = {
  court: ({ accent, soft }) => (
    <>
      <g stroke={soft} strokeWidth="2" opacity="0.55" fill="none">
        <path d="M60 250 L120 110 L340 150 L300 265 Z" />
        <path d="M90 180 L320 208" />
        <path d="M150 270 L200 130" />
        <path d="M245 272 L260 140" />
        <path d="M200 130 L260 140" strokeWidth="4" stroke={accent} />
      </g>
      <circle cx="205" cy="90" r="13" fill={accent} />
      <circle cx="205" cy="90" r="24" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <rect x="46" y="60" width="86" height="26" rx="13" fill={accent} opacity="0.9" />
      <text x="89" y="77" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B2018">
        LIVE SLOT
      </text>
    </>
  ),
  gym: ({ accent, soft }) => (
    <>
      <g stroke={soft} strokeWidth="5" opacity="0.5" fill="none">
        <path d="M80 210 H320" />
        <path d="M80 205 V215 M320 205 V215" />
        <rect x="110" y="186" width="26" height="48" rx="8" />
        <rect x="264" y="186" width="26" height="48" rx="8" />
        <circle cx="200" cy="210" r="34" />
        <path d="M60 110 H120 M280 110 H340" />
      </g>
      <circle cx="200" cy="210" r="52" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
      <path d="M160 90 H240 L256 120 H144 Z" fill={accent} opacity="0.9" />
      <text x="200" y="112" textAnchor="middle" fontSize="14" fontWeight="800" fill="#12100F">
        28 CLASS
      </text>
    </>
  ),
  venue: ({ accent, soft, ink }) => (
    <>
      <ellipse cx="200" cy="250" rx="150" ry="26" fill={soft} opacity="0.18" />
      <g opacity="0.7">
        <path d="M70 250 V120 Q200 40 330 120 V250" fill="none" stroke={soft} strokeWidth="2" />
        <path d="M110 250 V140 Q200 80 290 140 V250" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7" />
        <rect x="160" y="160" width="80" height="90" rx="6" fill={ink} opacity="0.35" />
        <circle cx="200" cy="120" r="10" fill={accent} />
      </g>
      <g fill={accent} opacity="0.85">
        <circle cx="90" cy="80" r="4" />
        <circle cx="310" cy="80" r="4" />
        <circle cx="200" cy="46" r="4" />
      </g>
    </>
  ),
  resto: ({ accent, soft }) => (
    <>
      <circle cx="200" cy="190" r="70" fill={soft} opacity="0.12" />
      <ellipse cx="200" cy="200" rx="104" ry="44" fill={soft} opacity="0.2" />
      <circle cx="200" cy="186" r="46" fill={soft} opacity="0.9" />
      <circle cx="200" cy="186" r="34" fill={accent} opacity="0.85" />
      <path d="M182 186 q18 -22 36 0 q-18 22 -36 0" fill={soft} opacity="0.7" />
      <g stroke={soft} strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <path d="M96 150 v80 M88 150 v26 M104 150 v26" />
        <path d="M304 148 v82 M296 148 q8 22 16 0" />
      </g>
      <text x="200" y="266" textAnchor="middle" fontSize="12" fill={soft} opacity="0.8" letterSpacing="3">
        RESERVASI BERDEPOSIT
      </text>
    </>
  ),
  catering: ({ accent, soft, ink }) => (
    <>
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${110 + i * 18} ${150 - i * 34})`}>
            <rect width="150" height="46" rx="8" fill={soft} opacity={0.9 - i * 0.15} />
            <rect x="12" y="14" width="70" height="6" rx="3" fill={ink} opacity="0.3" />
            <rect x="12" y="27" width="44" height="6" rx="3" fill={accent} />
          </g>
        ))}
      </g>
      <g stroke={soft} strokeWidth="2.5" fill="none" opacity="0.6">
        <path d="M270 96 q10 -16 0 -30 M288 100 q12 -20 0 -36" />
      </g>
      <text x="200" y="262" textAnchor="middle" fontSize="13" fill={soft} opacity="0.9" fontWeight="700">
        HITUNG PAX OTOMATIS
      </text>
    </>
  ),
  d2c: ({ accent, soft, ink }) => (
    <>
      <g transform="translate(78 108)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 62} 0)`}>
            <rect y="26" width="46" height="122" rx="10" fill={soft} opacity={0.85} />
            <rect y="8" width="46" height="24" rx="6" fill={accent} opacity="0.9" />
            <rect x="9" y="66" width="28" height="40" rx="4" fill={ink} opacity="0.25" />
          </g>
        ))}
      </g>
      <g fill={accent}>
        <circle cx="100" cy="72" r="5" />
        <circle cx="128" cy="60" r="3" />
        <circle cx="300" cy="86" r="4" />
      </g>
      <rect x="132" y="252" width="136" height="24" rx="12" fill={accent} opacity="0.9" />
      <text x="200" y="268" textAnchor="middle" fontSize="11" fontWeight="800" fill="#241006">
        FREE ONGKIR
      </text>
    </>
  ),
  furniture: ({ accent, soft }) => (
    <>
      <g stroke={soft} fill="none" strokeWidth="3" opacity="0.9">
        <rect x="92" y="150" width="216" height="18" rx="6" />
        <path d="M118 168 V232 M282 168 V232 M118 214 H282" />
        <rect x="126" y="96" width="64" height="54" rx="8" />
        <path d="M190 150 V120 q26 -18 52 0 V150" />
        <path d="M258 150 v-52 q20 -16 40 0 v52" opacity="0.75" />
      </g>
      <rect x="96" y="246" width="208" height="14" rx="7" fill={accent} opacity="0.8" />
      <circle cx="320" cy="80" r="24" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
      <text x="200" y="286" textAnchor="middle" fontSize="11" fill={soft} letterSpacing="2">
        HANDCRAFTED IN JEPARA
      </text>
    </>
  ),
  material: ({ accent, soft, ink }) => (
    <>
      <g opacity="0.8">
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={60 + c * 38 + (r % 2 ? 19 : 0)}
              y={70 + r * 36}
              width="34"
              height="32"
              rx="4"
              fill={soft}
              opacity={0.12 + r * 0.06}
              stroke={soft}
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          ))
        )}
      </g>
      <g stroke={accent} strokeWidth="4" fill="none" opacity="0.9">
        <path d="M270 210 L330 250" />
        <path d="M250 240 L310 280" />
      </g>
      <rect x="60" y="232" width="150" height="34" rx="6" fill={ink} opacity="0.5" />
      <text x="135" y="254" textAnchor="middle" fontSize="12" fill={accent} fontWeight="700">
        RFQ GROSIR
      </text>
    </>
  ),
  florist: ({ accent, soft }) => (
    <>
      <g transform="translate(200 160)">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-48"
            rx="26"
            ry="42"
            fill={accent}
            opacity="0.65"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="26" fill={soft} opacity="0.95" />
        <circle r="12" fill={accent} />
      </g>
      <g stroke={soft} strokeWidth="3" fill="none" opacity="0.7">
        <path d="M200 200 q-8 40 -26 66" />
        <path d="M200 202 q12 34 30 58" />
        <path d="M186 236 q-24 -4 -34 -22" />
      </g>
      <g fill={soft} opacity="0.8">
        <circle cx="70" cy="70" r="4" />
        <circle cx="330" cy="120" r="5" />
        <circle cx="300" cy="52" r="3" />
      </g>
    </>
  ),
  grosir: ({ accent, soft, ink }) => (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${74 + i * 90} 120)`}>
          <rect width="78" height="94" rx="10" fill={soft} opacity={0.85 - i * 0.1} />
          <rect x="12" y="16" width="54" height="8" rx="4" fill={ink} opacity="0.35" />
          <rect x="12" y="32" width="38" height="8" rx="4" fill={accent} />
          <path d="M22 62 h34 M22 76 h22" stroke={ink} strokeWidth="5" strokeLinecap="round" opacity="0.25" />
        </g>
      ))}
      <path d="M60 226 H340" stroke={soft} strokeWidth="2" opacity="0.4" strokeDasharray="6 6" />
      <text x="200" y="256" textAnchor="middle" fontSize="12" fill={accent} fontWeight="800" letterSpacing="2">
        HARGA AGEN
      </text>
    </>
  ),
  apparel: ({ accent, soft, ink }) => (
    <>
      <g transform="translate(130 62)">
        <path
          d="M40 0 L86 0 L140 32 L120 74 L104 66 V170 H16 V66 L0 74 L-20 32 Z"
          fill={soft}
          opacity="0.9"
          transform="translate(20 0)"
        />
        <circle cx="70" cy="96" r="26" fill={accent} opacity="0.9" />
        <text x="70" y="103" textAnchor="middle" fontSize="18" fontWeight="800" fill={ink}>
          F
        </text>
        <path d="M52 140 h36" stroke={ink} strokeWidth="5" strokeLinecap="round" opacity="0.3" />
      </g>
      <g stroke={accent} strokeWidth="2.5" strokeDasharray="5 5" fill="none" opacity="0.8">
        <path d="M76 250 H324" />
      </g>
      <text x="200" y="278" textAnchor="middle" fontSize="11" fill={soft} letterSpacing="2">
        MIN. 12 PCS • FULL PRINT
      </text>
    </>
  ),
  autocare: ({ accent, soft }) => (
    <>
      <g transform="translate(60 140)">
        <path
          d="M20 62 q4 -34 34 -38 L86 10 q10 -8 24 -8 h60 q14 0 24 8 l32 14 q30 4 34 38 q2 18 -12 22 H32 q-16 -4 -12 -22 Z"
          fill={soft}
          opacity="0.92"
        />
        <path d="M96 20 q10 -10 24 -10 h54 q14 0 24 10 l24 14 H72 Z" fill={accent} opacity="0.55" />
        <circle cx="70" cy="86" r="18" fill="#0B1220" stroke={accent} strokeWidth="3" />
        <circle cx="238" cy="86" r="18" fill="#0B1220" stroke={accent} strokeWidth="3" />
      </g>
      <g stroke={accent} strokeWidth="3" fill="none" opacity="0.8">
        <path d="M300 100 q22 -18 0 -36" />
        <path d="M318 108 q30 -26 0 -52" />
      </g>
      <text x="200" y="272" textAnchor="middle" fontSize="11" fill={soft} letterSpacing="2">
        BOOKING ANTREAN
      </text>
    </>
  ),
  petcare: ({ accent, soft }) => (
    <>
      <g transform="translate(200 150)" fill={accent} opacity="0.85">
        <ellipse cx="-46" cy="-34" rx="17" ry="23" />
        <ellipse cx="-14" cy="-56" rx="17" ry="23" />
        <ellipse cx="24" cy="-52" rx="17" ry="23" />
        <ellipse cx="52" cy="-24" rx="17" ry="23" />
        <path d="M0 30 q-52 -6 -52 -40 q0 -26 26 -26 q18 0 26 14 q8 -14 26 -14 q26 0 26 26 q0 34 -52 40 Z" />
      </g>
      <g stroke={soft} strokeWidth="4" opacity="0.7">
        <path d="M96 236 h32 M112 220 v32" />
      </g>
      <text x="230" y="266" textAnchor="middle" fontSize="11" fill={soft} letterSpacing="2">
        GROOMING &amp; VET
      </text>
    </>
  ),
  rental: ({ accent, soft }) => (
    <>
      <g transform="translate(52 128)">
        <rect x="0" y="36" width="296" height="66" rx="20" fill={soft} opacity="0.9" />
        <path d="M36 36 q10 -34 44 -34 h56 q34 0 44 34 Z" fill={soft} opacity="0.75" />
        <path d="M52 22 h48 v14 H44 Z" fill={accent} opacity="0.6" />
        <circle cx="66" cy="104" r="20" fill="#1A0A0E" stroke={accent} strokeWidth="3" />
        <circle cx="230" cy="104" r="20" fill="#1A0A0E" stroke={accent} strokeWidth="3" />
      </g>
      <path d="M40 250 H360" stroke={soft} strokeWidth="3" strokeDasharray="18 14" opacity="0.5" />
      <g transform="translate(300 72)" fill="none" stroke={accent} strokeWidth="3">
        <circle cx="0" cy="0" r="14" />
        <path d="M0 22 V40 M-10 30 H10" />
      </g>
    </>
  ),
}

export default function ArtScene({ art, theme, className = '' }) {
  const Scene = SCENES[art] || SCENES.court
  const accent = theme?.accent || '#C6FF3D'
  const accent2 = theme?.accent2 || '#12B981'
  const ink = theme?.ink || '#062B22'
  const soft = theme?.soft || '#F6FFF9'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Frame accent={accent} accent2={accent2} ink={ink} soft={soft}>
        <Scene accent={accent} accent2={accent2} ink={ink} soft={soft} />
      </Frame>
    </div>
  )
}

export function ArtGlyph({ name, className, style }) {
  return <Icon name={name} className={className} style={style} />
}
