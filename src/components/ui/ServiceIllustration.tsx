import type { ReactNode } from "react";

/*
 * Kachel-Illustrationen der Leistungsübersicht — eine pro Leistung, alle im
 * selben Stil: flächige Körper mit hellerer Oberkante und dunklerer Seite,
 * ausschließlich in der Glanzwerk-Palette (Marineblau, Markenblau, Eisblau,
 * Weiß). Jede Zeichnung steht auf einer Fläche von 240 × 200 und läuft
 * bewusst über den rechten und unteren Rand hinaus; die Kachel schneidet sie
 * ab, wie auf der Vorlage.
 *
 * Die Motive zeigen die Leistung, nicht nur das Reinigen im Allgemeinen:
 * Bürotisch, Behandlungsliege, Treppe, Fenster, Waage, Hantel, Auto, Cloche.
 */

const c = {
  navy: "#17326d",
  navyD: "#0f2250",
  blue: "#1e5bc6",
  blueM: "#3b82e8",
  blueL: "#a5cdff",
  blueP: "#dce9fb",
  ice: "#f4f7fc",
  white: "#ffffff",
  steel: "#c9d2e0",
  steelD: "#9aa7bd",
  shade: "#b7c4da",
} as const;

function Sparkle({ x, y, s = 1, fill = c.white }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-12C1.2-4 4-1.2 12 0 4 1.2 1.2 4 0 12-1.2 4-4 1.2-12 0-4-1.2-1.2-4 0-12Z"
      fill={fill}
    />
  );
}

function Bucket({ x, y, s = 1, body = c.blue, rim = c.blueM }: { x: number; y: number; s?: number; body?: string; rim?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M6 8 Q25 -20 44 8" stroke={c.steelD} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M2 4H48L43 40Q42.6 44 38.5 44H11.5Q7.4 44 7 40Z" fill={body} />
      <path d="M8 8H16L18.5 40H12Z" fill={c.white} opacity=".2" />
      <rect x="0" y="0" width="50" height="8" rx="4" fill={rim} />
    </g>
  );
}

function Spray({ x, y, s = 1, body = c.blue }: { x: number; y: number; s?: number; body?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="24" width="26" height="40" rx="7" fill={body} />
      <rect x="4" y="36" width="18" height="16" rx="3" fill={c.white} opacity=".92" />
      <rect x="4" y="29" width="4" height="30" rx="2" fill={c.white} opacity=".2" />
      <rect x="7" y="15" width="12" height="11" fill={c.navy} />
      <path d="M4 4H20Q25 4 25 9V16H4Z" fill={c.navy} />
      <rect x="22" y="5" width="11" height="5" rx="2" fill={c.navyD} />
      <rect x="-3" y="22" width="6" height="15" rx="3" fill={c.navyD} />
    </g>
  );
}

function Cube({
  x,
  y,
  size = 52,
  front,
  top,
  side,
  letter,
  ink,
}: {
  x: number;
  y: number;
  size?: number;
  front: string;
  top: string;
  side: string;
  letter: string;
  ink: string;
}) {
  const d = 14;
  const k = 10;
  return (
    <g strokeLinejoin="round" strokeWidth="3">
      <polygon points={`${x},${y} ${x + d},${y - k} ${x + size + d},${y - k} ${x + size},${y}`} fill={top} stroke={top} />
      <polygon
        points={`${x + size},${y} ${x + size + d},${y - k} ${x + size + d},${y + size - k} ${x + size},${y + size}`}
        fill={side}
        stroke={side}
      />
      <rect x={x} y={y} width={size} height={size} fill={front} stroke={front} />
      <text
        x={x + size / 2}
        y={y + size / 2 + 11}
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill={ink}
        stroke="none"
      >
        {letter}
      </text>
    </g>
  );
}

function Dumbbell({ x, y, s = 1, plate = c.navy, inner = c.blue }: { x: number; y: number; s?: number; plate?: string; inner?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="0" width="18" height="80" rx="7" fill={plate} />
      <rect x="18" y="12" width="12" height="56" rx="4" fill={inner} />
      <rect x="30" y="32" width="58" height="16" rx="6" fill={c.steel} />
      <rect x="34" y="35" width="50" height="4" rx="2" fill={c.white} opacity=".7" />
      <rect x="88" y="12" width="12" height="56" rx="4" fill={inner} />
      <rect x="100" y="0" width="18" height="80" rx="7" fill={plate} />
      <rect x="4" y="6" width="4" height="68" rx="2" fill={c.white} opacity=".16" />
      <rect x="104" y="6" width="4" height="68" rx="2" fill={c.white} opacity=".16" />
    </g>
  );
}

function Gebaeude() {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <rect x="52" y="90" width="64" height="130" rx="3" fill={c.blue} />
      <rect x="52" y="90" width="64" height="8" rx="3" fill={c.blueM} />
      {[0, 1, 2, 3, 4].flatMap((r) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`b${r}-${col}`}
            x={60 + col * 19}
            y={106 + r * 21}
            width="13"
            height="14"
            rx="2"
            fill={(r + col) % 4 === 0 ? c.white : c.blueL}
          />
        )),
      )}
      <polygon points="112,28 140,16 204,16 176,28" fill={c.white} />
      <polygon points="176,28 204,16 204,202 176,214" fill={c.shade} />
      <rect x="112" y="28" width="64" height="190" fill={c.ice} />
      {rows.flatMap((r) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`t${r}-${col}`}
            x={120 + col * 19}
            y={42 + r * 21}
            width="13"
            height="14"
            rx="2"
            fill={(r * 3 + col) % 5 === 1 ? c.white : c.blueM}
            stroke={(r * 3 + col) % 5 === 1 ? c.blueL : "none"}
          />
        )),
      )}
      <g transform="translate(176 28) skewY(-23.2)">
        {rows.map((r) => (
          <rect key={`s${r}`} x="7" y={14 + r * 21} width="14" height="14" rx="2" fill={c.blue} />
        ))}
      </g>
      <rect x="140" y="2" width="4" height="14" rx="2" fill={c.steelD} />
      <Bucket x={6} y={150} s={0.95} />
      <Sparkle x={92} y={48} s={1.3} fill={c.blueM} />
      <Sparkle x={216} y={64} s={0.9} fill={c.blueM} />
      <Sparkle x={34} y={110} s={0.7} fill={c.blueL} />
    </>
  );
}

function Buero() {
  return (
    <>
      <rect x="40" y="136" width="10" height="70" fill={c.navy} />
      <rect x="206" y="136" width="10" height="70" fill={c.navy} />
      <rect x="22" y="126" width="218" height="10" rx="4" fill={c.shade} />
      <rect x="22" y="119" width="218" height="11" rx="5" fill={c.white} />
      <rect x="96" y="115" width="40" height="5" rx="2.5" fill={c.steelD} />
      <rect x="111" y="105" width="10" height="12" fill={c.steel} />
      <rect x="72" y="54" width="88" height="56" rx="6" fill={c.navy} />
      <rect x="77" y="59" width="78" height="44" rx="3" fill={c.blueM} />
      <rect x="85" y="68" width="30" height="5" rx="2.5" fill={c.white} opacity=".92" />
      <rect x="85" y="78" width="46" height="5" rx="2.5" fill={c.white} opacity=".7" />
      <rect x="85" y="88" width="22" height="5" rx="2.5" fill={c.white} opacity=".7" />
      <Sparkle x={140} y={74} s={0.9} />
      <Spray x={34} y={72} s={0.78} />
      <Bucket x={64} y={158} s={0.8} />
      <rect x="191" y="148" width="8" height="30" rx="3" fill={c.steelD} />
      <path d="M195 178L168 191M195 178L222 191" stroke={c.navy} strokeWidth="5" strokeLinecap="round" />
      <circle cx="166" cy="193" r="5.5" fill={c.navyD} />
      <circle cx="224" cy="193" r="5.5" fill={c.navyD} />
      <rect x="176" y="66" width="38" height="72" rx="16" fill={c.blue} />
      <rect x="182" y="72" width="7" height="58" rx="3.5" fill={c.blueM} />
      <rect x="164" y="136" width="62" height="16" rx="8" fill={c.navy} />
    </>
  );
}

function Praxis() {
  return (
    <>
      <rect x="100" y="166" width="22" height="22" fill={c.navy} />
      <rect x="84" y="184" width="54" height="12" rx="6" fill={c.navyD} />
      <g transform="rotate(24 66 142)">
        <rect x="14" y="130" width="62" height="24" rx="12" fill={c.blue} />
        <rect x="22" y="134" width="40" height="5" rx="2.5" fill={c.white} opacity=".25" />
      </g>
      <rect x="52" y="134" width="118" height="30" rx="14" fill={c.blue} />
      <rect x="62" y="139" width="98" height="5" rx="2.5" fill={c.white} opacity=".28" />
      <rect x="60" y="158" width="102" height="8" rx="4" fill={c.navy} />
      <rect x="44" y="40" width="58" height="58" rx="13" fill={c.shade} />
      <rect x="40" y="34" width="58" height="58" rx="13" fill={c.white} />
      <rect x="62" y="44" width="14" height="38" rx="3" fill={c.blue} />
      <rect x="50" y="56" width="38" height="14" rx="3" fill={c.blue} />
      <rect x="198" y="108" width="7" height="90" fill={c.steel} />
      <rect x="172" y="100" width="62" height="9" rx="4.5" fill={c.white} />
      <rect x="172" y="106" width="62" height="5" rx="2.5" fill={c.shade} />
      <rect x="188" y="66" width="30" height="34" rx="9" fill={c.blue} />
      <rect x="193" y="80" width="20" height="13" rx="3" fill={c.white} opacity=".92" />
      <rect x="196" y="58" width="14" height="10" fill={c.navy} />
      <rect x="192" y="46" width="30" height="13" rx="5" fill={c.navy} />
      <rect x="220" y="49" width="10" height="5" rx="2" fill={c.navyD} />
      <Sparkle x={150} y={60} s={1.1} fill={c.blueM} />
      <Sparkle x={118} y={104} s={0.8} fill={c.blueL} />
    </>
  );
}

function Unterhalt() {
  return (
    <>
      <rect x="164" y="58" width="6" height="132" rx="3" fill={c.navy} />
      <path d="M172 66H230L224 140Q223.5 144 219.5 144H183.5Q179.5 144 179 140Z" fill={c.blueL} />
      <rect x="186" y="78" width="7" height="54" rx="3.5" fill={c.white} opacity=".55" />
      <path d="M198 96l8 8 14-16" stroke={c.navy} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="166" y="58" width="68" height="10" rx="5" fill={c.navy} />
      <rect x="34" y="170" width="6" height="22" fill={c.navy} />
      <rect x="196" y="170" width="6" height="22" fill={c.navy} />
      <rect x="28" y="168" width="180" height="8" rx="4" fill={c.steel} />
      <rect x="34" y="140" width="6" height="30" fill={c.navy} />
      <rect x="196" y="140" width="6" height="30" fill={c.navy} />
      <rect x="22" y="134" width="190" height="10" rx="4" fill={c.shade} />
      <rect x="22" y="127" width="190" height="11" rx="5" fill={c.white} />
      <circle cx="48" cy="192" r="11" fill={c.navy} />
      <circle cx="48" cy="192" r="4" fill={c.steel} />
      <circle cx="188" cy="192" r="11" fill={c.navy} />
      <circle cx="188" cy="192" r="4" fill={c.steel} />
      <path d="M62 84L112 14" stroke={c.steelD} strokeWidth="5" strokeLinecap="round" />
      <Bucket x={36} y={84} />
      <ellipse cx="58" cy="85" rx="15" ry="6" fill={c.white} />
      <Spray x={104} y={66} s={0.92} body={c.navy} />
      <Spray x={134} y={66} s={0.92} />
      <Sparkle x={128} y={34} s={1} fill={c.blueM} />
    </>
  );
}

function Treppenhaus() {
  const cols = [0, 1, 2, 3, 4, 5];
  return (
    <>
      {cols.map((k) => {
        const x = 62 + k * 30;
        const y = 152 - k * 22;
        return (
          <g key={k}>
            <rect x={x} y={y} width="32" height={210 - y} fill={k % 2 === 0 ? c.blue : c.blueM} />
            <rect x={x} y={y} width="6" height={210 - y} fill={c.white} opacity=".14" />
            <rect x={x} y={y} width="32" height="8" fill={c.white} />
            <rect x={x} y={y + 8} width="32" height="3" fill={c.shade} />
          </g>
        );
      })}
      {[0, 2, 4].map((k) => (
        <rect key={k} x={62 + k * 30 + 12} y={152 - k * 22 - 40} width="5" height="40" rx="2.5" fill={c.navy} />
      ))}
      <path d="M72 106L226 -2" stroke={c.navy} strokeWidth="6" strokeLinecap="round" />
      <path d="M30 150L50 48" stroke={c.steelD} strokeWidth="5" strokeLinecap="round" />
      <Bucket x={8} y={150} s={1} />
      <ellipse cx="31" cy="151" rx="13" ry="5.5" fill={c.white} />
      <Sparkle x={112} y={60} s={1.1} fill={c.blueM} />
      <Sparkle x={196} y={38} s={0.8} fill={c.blueL} />
    </>
  );
}

function Fenster() {
  return (
    <>
      <rect x="48" y="184" width="190" height="12" rx="5" fill={c.shade} />
      <rect x="48" y="178" width="190" height="11" rx="5" fill={c.white} />
      <rect x="62" y="12" width="162" height="170" rx="9" fill={c.navy} />
      <rect x="72" y="22" width="68" height="152" rx="3" fill={c.blueL} />
      <rect x="146" y="22" width="68" height="152" rx="3" fill={c.blueL} />
      <polygon points="72,104 72,64 114,22 138,22" fill={c.white} opacity=".5" />
      <polygon points="100,174 140,128 140,146 118,174" fill={c.white} opacity=".35" />
      <polygon points="146,174 146,160 182,118 200,118" fill={c.white} opacity=".35" />
      <path d="M146 22H214V104Q196 114 180 104T150 108L146 104Z" fill={c.ice} />
      {[
        [158, 40, 9],
        [180, 58, 12],
        [200, 36, 8],
        [166, 78, 7],
        [192, 84, 10],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={c.white} stroke={c.blueL} strokeWidth="2" />
      ))}
      <g transform="rotate(-6 150 106)">
        <rect x="104" y="92" width="92" height="12" rx="4" fill={c.navyD} />
        <rect x="104" y="102" width="92" height="4" rx="2" fill={c.steel} />
        <rect x="140" y="66" width="18" height="28" rx="6" fill={c.blue} />
        <rect x="144" y="70" width="4" height="20" rx="2" fill={c.white} opacity=".35" />
      </g>
      <Sparkle x={92} y={86} s={1.2} />
      <Sparkle x={122} y={152} s={0.9} />
    </>
  );
}

function Grundreinigung() {
  return (
    <>
      <ellipse cx="124" cy="190" rx="116" ry="13" fill={c.blueL} opacity=".55" />
      <ellipse cx="124" cy="190" rx="74" ry="6" fill={c.white} opacity=".7" />
      <rect x="52" y="174" width="144" height="12" rx="6" fill={c.blueM} />
      <rect x="60" y="160" width="128" height="22" rx="11" fill={c.navy} />
      <rect x="76" y="62" width="96" height="104" rx="16" fill={c.blue} />
      <rect x="86" y="72" width="10" height="84" rx="5" fill={c.white} opacity=".22" />
      <rect x="110" y="86" width="46" height="56" rx="9" fill={c.blueP} />
      <rect x="114" y="108" width="38" height="30" rx="6" fill={c.blueM} />
      <rect x="70" y="50" width="108" height="18" rx="8" fill={c.navy} />
      <path d="M172 76L208 26" stroke={c.navy} strokeWidth="8" strokeLinecap="round" />
      <path d="M174 118L202 56" stroke={c.steelD} strokeWidth="4" strokeLinecap="round" />
      <rect x="192" y="14" width="42" height="13" rx="6.5" fill={c.navyD} transform="rotate(-20 213 20)" />
      {[
        [44, 140, 10],
        [26, 116, 6],
        [58, 98, 5],
        [212, 150, 8],
        [226, 128, 5],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={c.white} fillOpacity=".55" stroke={c.white} strokeWidth="2.5" />
      ))}
      <Sparkle x={34} y={168} s={1.2} fill={c.white} />
      <Sparkle x={216} y={104} s={0.9} fill={c.blueM} />
    </>
  );
}

function KitaSchule() {
  return (
    <>
      <Cube x={40} y={140} front={c.blue} top={c.blueM} side={c.navy} letter="A" ink={c.white} />
      <Cube x={112} y={140} front={c.ice} top={c.white} side={c.shade} letter="B" ink={c.navy} />
      <Cube x={76} y={88} front={c.navy} top={c.blue} side={c.navyD} letter="C" ink={c.white} />
      <g transform="rotate(14 214 120)">
        <rect x="204" y="30" width="20" height="104" rx="2" fill={c.blue} />
        <rect x="204" y="30" width="6" height="104" fill={c.blueM} />
        <rect x="204" y="22" width="20" height="12" rx="4" fill={c.steel} />
        <rect x="204" y="14" width="20" height="10" rx="5" fill={c.white} />
        <polygon points="204,134 224,134 214,166" fill={c.ice} />
        <polygon points="209,154 219,154 214,166" fill={c.navy} />
      </g>
      <Sparkle x={34} y={96} s={1.1} fill={c.blueM} />
      <Sparkle x={158} y={62} s={0.9} fill={c.blueL} />
    </>
  );
}

function Kanzlei() {
  return (
    <>
      <path d="M92 192L100 170H142L150 192Z" fill={c.navy} />
      <rect x="82" y="188" width="78" height="12" rx="6" fill={c.navyD} />
      <rect x="117" y="46" width="8" height="128" rx="4" fill={c.blue} />
      <rect x="119" y="50" width="2.5" height="116" rx="1.2" fill={c.white} opacity=".45" />
      <g transform="rotate(-5 121 52)">
        <rect x="44" y="48" width="154" height="9" rx="4.5" fill={c.navy} />
        <circle cx="48" cy="52.5" r="6.5" fill={c.blue} />
        <circle cx="194" cy="52.5" r="6.5" fill={c.blue} />
      </g>
      <circle cx="121" cy="38" r="10" fill={c.blueM} />
      <circle cx="121" cy="38" r="4" fill={c.white} opacity=".85" />
      <path d="M48 58L16 106M48 58L80 106" stroke={c.steelD} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M194 46L162 94M194 46L226 94" stroke={c.steelD} strokeWidth="2.5" strokeLinecap="round" />
      <g transform="translate(48 104)">
        <path d="M-34 0H34Q32 22 0 25Q-32 22 -34 0Z" fill={c.blue} />
        <rect x="-37" y="-3" width="74" height="6" rx="3" fill={c.blueM} />
      </g>
      <g transform="translate(194 92)">
        <path d="M-34 0H34Q32 22 0 25Q-32 22 -34 0Z" fill={c.blue} />
        <rect x="-37" y="-3" width="74" height="6" rx="3" fill={c.blueM} />
      </g>
      <rect x="164" y="168" width="84" height="24" rx="4" fill={c.navy} />
      <rect x="164" y="173" width="84" height="3" fill={c.blueM} />
      <rect x="170" y="144" width="76" height="24" rx="4" fill={c.blue} />
      <rect x="170" y="149" width="76" height="3" fill={c.blueL} />
      <rect x="166" y="120" width="72" height="24" rx="4" fill={c.white} />
      <rect x="166" y="125" width="72" height="3" fill={c.steel} />
      <text x="210" y="139" textAnchor="middle" fontSize="16" fontWeight="800" fill={c.navy}>
        §
      </text>
      <Sparkle x={86} y={150} s={0.9} fill={c.blueM} />
    </>
  );
}

function Fitness() {
  return (
    <>
      <rect x="50" y="144" width="52" height="56" fill={c.blue} />
      <circle cx="50" cy="172" r="28" fill={c.blueM} />
      <path
        d="M50 172a5 5 0 1 1 10 0a10 10 0 1 1-20 0a15 15 0 1 1 30 0a20 20 0 1 1-40 0"
        stroke={c.blue}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M38 86Q38 56 58 56Q78 56 78 86" stroke={c.navy} strokeWidth="10" fill="none" strokeLinecap="round" />
      <circle cx="58" cy="108" r="30" fill={c.navy} />
      <path d="M38 100Q44 84 58 82" stroke={c.white} strokeWidth="4" fill="none" strokeLinecap="round" opacity=".35" />
      <rect x="226" y="76" width="8" height="124" fill={c.navy} />
      <rect x="98" y="80" width="136" height="8" rx="3" fill={c.steel} />
      <rect x="98" y="174" width="136" height="8" rx="3" fill={c.steel} />
      <Dumbbell x={112} y={96} />
      <Dumbbell x={136} y={12} s={0.8} plate={c.blue} inner={c.navy} />
      <Sparkle x={104} y={34} s={1} fill={c.blueM} />
      <Sparkle x={86} y={134} s={0.7} fill={c.blueL} />
    </>
  );
}

function Autohaus() {
  return (
    <>
      <ellipse cx="130" cy="180" rx="116" ry="9" fill={c.navy} opacity=".14" />
      <path
        d="M20 156V132Q20 120 32 118L72 112L98 80Q102 74 110 74H164Q174 74 180 82L202 110L224 116Q238 120 238 134V156Z"
        fill={c.blue}
      />
      <path d="M24 130H236V138H24Z" fill={c.blueM} opacity=".55" />
      <path d="M92 108L110 80H136V108Z" fill={c.blueP} />
      <path d="M142 80H164Q169 80 172 85L190 108H142Z" fill={c.blueP} />
      <path d="M138 80V156" stroke={c.navy} strokeWidth="2" opacity=".35" />
      <rect x="226" y="124" width="12" height="8" rx="3" fill={c.white} />
      <rect x="20" y="124" width="8" height="8" rx="3" fill={c.blueL} />
      <circle cx="68" cy="156" r="25" fill={c.navyD} />
      <circle cx="68" cy="156" r="15" fill={c.blueP} />
      <circle cx="68" cy="156" r="5.5" fill={c.blue} />
      <circle cx="190" cy="156" r="25" fill={c.navyD} />
      <circle cx="190" cy="156" r="15" fill={c.blueP} />
      <circle cx="190" cy="156" r="5.5" fill={c.blue} />
      <Sparkle x={118} y={60} s={1.3} />
      <Sparkle x={170} y={50} s={0.8} fill={c.blueM} />
      <circle cx="40" cy="84" r="8" fill={c.white} fillOpacity=".6" stroke={c.blueL} strokeWidth="2.5" />
      <circle cx="58" cy="66" r="5" fill={c.white} fillOpacity=".6" stroke={c.blueL} strokeWidth="2.5" />
    </>
  );
}

function Gastro() {
  return (
    <>
      <rect x="46" y="154" width="8" height="50" fill={c.navy} />
      <rect x="204" y="154" width="8" height="50" fill={c.navy} />
      <rect x="14" y="148" width="226" height="10" rx="4" fill={c.shade} />
      <rect x="14" y="141" width="226" height="11" rx="5" fill={c.white} />
      <ellipse cx="116" cy="139" rx="66" ry="6" fill={c.white} stroke={c.steel} strokeWidth="2" />
      <path d="M58 136Q58 68 116 68Q174 68 174 136Z" fill={c.blue} />
      <path d="M144 76Q168 90 170 134H150Q150 100 138 82Z" fill={c.navy} opacity=".35" />
      <path d="M72 128Q72 92 96 80" stroke={c.white} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" />
      <rect x="112" y="56" width="8" height="14" rx="3" fill={c.navy} />
      <circle cx="116" cy="54" r="8" fill={c.navy} />
      <path d="M184 72H220Q223 108 202 116Q181 108 184 72Z" fill={c.white} fillOpacity=".85" stroke={c.steelD} strokeWidth="2.5" />
      <path d="M185 96Q202 102 219 96Q217 110 202 114Q187 110 185 96Z" fill={c.blueM} opacity=".85" />
      <rect x="199" y="116" width="6" height="22" fill={c.steel} />
      <ellipse cx="202" cy="139" rx="16" ry="3.5" fill={c.steel} />
      <Spray x={14} y={92} s={0.78} />
      <Sparkle x={86} y={96} s={1.1} />
      <Sparkle x={150} y={46} s={0.8} fill={c.blueM} />
    </>
  );
}

function Fallback() {
  return (
    <>
      <Bucket x={70} y={140} s={1.4} />
      <path d="M100 140L170 30" stroke={c.steelD} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="102" cy="141" rx="22" ry="8" fill={c.white} />
      <Sparkle x={170} y={110} s={1.4} />
    </>
  );
}

const illustrations: Record<string, () => ReactNode> = {
  "gebaeudereinigung-berlin": Gebaeude,
  "bueroreinigung-berlin": Buero,
  "praxisreinigung-berlin": Praxis,
  "unterhaltsreinigung-berlin": Unterhalt,
  "treppenhausreinigung-berlin": Treppenhaus,
  "glas-und-fensterreinigung-berlin": Fenster,
  "grundreinigung-berlin": Grundreinigung,
  "kita-und-schulreinigung-berlin": KitaSchule,
  "kanzleireinigung-berlin": Kanzlei,
  "fitnessstudioreinigung-berlin": Fitness,
  "autohausreinigung-berlin": Autohaus,
  "gastronomiereinigung-berlin": Gastro,
};

/** Dekorative Zeichnung zur Leistung — rein ornamental, daher `aria-hidden`. */
export default function ServiceIllustration({ slug, className = "" }: { slug: string; className?: string }) {
  const Art = illustrations[slug] ?? Fallback;
  return (
    <svg viewBox="0 0 240 200" aria-hidden="true" focusable="false" className={className}>
      <Art />
    </svg>
  );
}
