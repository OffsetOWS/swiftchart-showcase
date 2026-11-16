/* A drawn bank of clouds for the bottom of a sky section. Pure SVG, no image file. */
const puffs: [number, number, number, number][] = [
  [60, 250, 150, 70], [210, 215, 120, 80], [340, 255, 160, 75], [470, 200, 110, 70], [560, 250, 150, 80],
  [720, 225, 130, 85], [850, 260, 170, 70], [990, 205, 120, 75], [1100, 250, 150, 80], [1240, 215, 130, 85],
  [1380, 255, 150, 70], [150, 150, 80, 50], [420, 135, 70, 42], [680, 150, 85, 48], [1040, 130, 75, 44], [1300, 150, 80, 46],
];
const wisps: [number, number, number, number][] = [
  [120, 190, 190, 60], [520, 160, 170, 55], [900, 175, 200, 60], [1280, 185, 180, 58], [300, 110, 110, 34], [1150, 95, 100, 30],
];

export function Clouds({ id, className = '' }: { id: string; className?: string }) {
  return (
    <svg className={`clouds ${className}`} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <filter id={`${id}-soft`} x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.02" numOctaves="4" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" />
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${id}-haze`} x="-10%" y="-40%" width="120%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.016" numOctaves="3" seed="19" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" />
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <g filter={`url(#${id}-haze)`} fill="#f8fafc" opacity="0.55">
        {wisps.map(([cx, cy, rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />)}
      </g>
      <g filter={`url(#${id}-soft)`} fill="#f8fafc">
        {puffs.map(([cx, cy, rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />)}
        <rect x="-40" y="262" width="1520" height="90" />
      </g>
      <rect x="0" y="300" width="1440" height="20" fill="#f8fafc" />
    </svg>
  );
}
