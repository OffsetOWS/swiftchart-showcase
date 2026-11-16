/* A drawn bank of clouds for the bottom of a sky section. Pure SVG, no image file. */
const puffs: [number, number, number, number][] = [
  [60, 250, 150, 70], [210, 215, 120, 80], [340, 255, 160, 75], [470, 200, 110, 70], [560, 250, 150, 80],
  [720, 225, 130, 85], [850, 260, 170, 70], [990, 205, 120, 75], [1100, 250, 150, 80], [1240, 215, 130, 85],
  [1380, 255, 150, 70], [150, 150, 80, 50], [420, 135, 70, 42], [680, 150, 85, 48], [1040, 130, 75, 44], [1300, 150, 80, 46],
];
const wisps: [number, number, number, number][] = [
  [120, 190, 190, 60], [520, 160, 170, 55], [900, 175, 200, 60], [1280, 185, 180, 58], [300, 110, 110, 34], [1150, 95, 100, 30],
];

function CloudArt({ id, haze }: { id: string; haze: boolean }) {
  const shapes = haze ? wisps : puffs;
  return (
    <svg className="cloud-art" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={id} x="0" y="-40%" width="100%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency={haze ? '0.008 0.016' : '0.011 0.02'} numOctaves={haze ? 3 : 4} seed={haze ? 19 : 7} stitchTiles="stitch" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={haze ? 90 : 70} />
          <feGaussianBlur stdDeviation={haze ? 16 : 7} />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill="#f8fafc" opacity={haze ? 0.55 : 1}>
        {[-1440, 0, 1440].map(offset => (
          <g key={offset} transform={`translate(${offset} 0)`}>
            {shapes.map(([cx, cy, rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />)}
          </g>
        ))}
        {!haze && <rect x="-40" y="262" width="1520" height="90" />}
      </g>
      {!haze && <rect x="0" y="300" width="1440" height="20" fill="#f8fafc" />}
    </svg>
  );
}

export function Clouds({ id, className = '' }: { id: string; className?: string }) {
  return (
    <div className={`clouds ${className}`} aria-hidden="true">
      {['back', 'front'].map(layer => (
        <div key={layer} className={`cloud-track cloud-track-${layer}`}>
          {[0, 1].map(copy => <CloudArt key={copy} id={`${id}-${layer}-${copy}`} haze={layer === 'back'} />)}
        </div>
      ))}
    </div>
  );
}

export function SkyClouds() {
  return (
    <div className="sky-clouds" aria-hidden="true">
      {[0, 1, 2, 3].map(i => (
        <svg key={i} className={`sky-cloud sky-cloud-${i}`} viewBox="0 0 220 85">
          <path fill="#f8fafc" d="M25 72C-2 72 0 40 29 39C26 7 77 1 88 29C106 2 153 10 157 38C188 17 219 45 209 61C206 73 191 77 173 77H35Z" />
        </svg>
      ))}
    </div>
  );
}
