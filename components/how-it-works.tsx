import type { CSSProperties } from 'react';
import { MotionGroup, RevealHeading } from './motion';
import { steps } from '@/config/products';

/* A drawn example of one setup, start to finish. Prices are on a 0-100 scale; nothing here is market data. */
const closes = [60,63,61,66,70,74,79,81,77,79,73,68,70,64,58,60,54,49,51,45,40,42,37,39,35,37,34,36,33,35,36,40,38,44,49,47,54,58,56,63,67,65,71,74];
const SWEEP = 30;
const W = 1000, H = 350, TOP = 24, SCALE = 3.5, STEP = 21.6, LEFT = 36;
const y = (price: number) => TOP + (92 - price) * SCALE;
const x = (index: number) => LEFT + index * STEP;

const candles = closes.map((close, i) => {
  const open = i === 0 ? 58 : closes[i - 1];
  const wick = ((i * 7) % 5) + 1.5;
  const high = Math.max(open, close) + wick * 0.8;
  const low = i === SWEEP ? 23 : Math.min(open, close) - wick * 0.7;
  return { open, close, high, low, up: close >= open };
});

function Marker({ n, cx, cy }: { n: number; cx: number; cy: number }) {
  return <g className={`chart-marker chart-marker-${n}`}><circle cx={cx} cy={cy} r="15" className="marker-dot" /><text x={cx} y={cy + 5.5} textAnchor="middle" className="marker-num">{n}</text></g>;
}

export function HowItWorks() {
  const regimeSplit = x(SWEEP + 1) + 6;
  return (
    <section id="how" className="how">
      <div className="container">
        <RevealHeading>How a setup gets made</RevealHeading>
        <p className="section-lede">One example, start to finish. The numbers on the chart match the four steps below it.</p>
        <MotionGroup className="chart-sequence">
        <figure className="read-figure card">
          <div className="read-scroll" tabIndex={0} role="group" aria-label="Example chart, scrolls sideways on small screens">
            <svg className="read-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="read-title read-desc">
              <title id="read-title">How SwiftChart reads a chart</title>
              <desc id="read-desc">Price falls from a resistance zone to a support zone, spikes briefly below support, then recovers. The market regime changes from neutral to confirmed, and a setup is sent.</desc>
              {[0, 1, 2, 3].map(i => <path key={i} d={`M0 ${TOP + i * 78}H${W}`} className="grid-line" />)}

              <rect x="0" y={y(84)} width={W} height={y(77) - y(84)} className="zone zone-supply" />
              <text x={W - 14} y={y(84) - 8} textAnchor="end" className="zone-label supply-text">Resistance zone</text>
              <rect x="0" y={y(37)} width={W} height={y(30) - y(37)} className="zone zone-demand" />
              <text x={W - 14} y={y(30) + 19} textAnchor="end" className="zone-label demand-text">Support zone</text>

              {candles.map((c, i) => (
                <g key={i} style={{ animationDelay: `${i * 25}ms` }} className={i === SWEEP ? 'candle candle-sweep' : c.up ? 'candle candle-up' : 'candle candle-down'}>
                  <path d={`M${x(i)} ${y(c.high)}V${y(c.low)}`} />
                  <rect x={x(i) - 5.5} y={y(Math.max(c.open, c.close))} width="11" height={Math.max(2, Math.abs(c.close - c.open) * SCALE)} rx="1" />
                </g>
              ))}

              <path d={`M${x(SWEEP + 1)} ${y(36)}H${x(SWEEP + 9)}`} className="entry-line" />
              <g transform={`translate(${x(SWEEP + 3) + 4} ${y(36) + 22})`}><g className="flag-drop">
                <rect width="112" height="30" rx="6" className="sent-flag" />
                <text x="56" y="20" textAnchor="middle" className="sent-text">Setup sent</text>
              </g></g>

              <rect x="0" y={H - 22} width={regimeSplit} height="8" rx="4" className="regime regime-wait" />
              <rect x={regimeSplit + 6} y={H - 22} width={W - regimeSplit - 6} height="8" rx="4" className="regime regime-go" />
              <text x="14" y={H - 32} className="regime-label wait-text">Regime: neutral, waiting</text>
              <text x={regimeSplit + 20} y={H - 32} className="regime-label go-text">Regime: edge confirmed</text>

              <Marker n={1} cx={x(7)} cy={y(84) - 14} />
              <Marker n={2} cx={x(SWEEP) - 30} cy={y(24)} />
              <Marker n={3} cx={regimeSplit + 3} cy={H - 56} />
              <Marker n={4} cx={x(SWEEP + 9) + 26} cy={y(36)} />
            </svg>
          </div>
          <figcaption>Drawn example, not live market data.<span className="swipe-hint"> Swipe sideways to follow it.</span></figcaption>
        </figure>
        <ol className="steps">
          {steps.map((step, i) => (
            <li key={step.title} style={{ '--step-delay': `${[175, 750, 1100, 1400][i]}ms` } as CSSProperties}>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        </MotionGroup>
      </div>
    </section>
  );
}
