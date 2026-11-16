# Motion verification — 16 November 2026

- `npx tsc --noEmit` and `npm run build`: passed.
- In-app browser at 1280 × 900 and 390 × 844: page scroll width matched viewport width through the hero, chart, product examples, pricing and closing section. The mobile chart keeps its existing horizontal scroll inside its own panel.
- Confirmed one-shot chart/marker/flag and message sequences, final headline text, final prices ($9.99 and $19.99), staggered ticks, mobile menu and FAQ mouse/keyboard operation.
- Both cloud banks have two copies per layer, unique static filter IDs, and 140s/90s transform loops. Desktop parallax is capped at 10px total displacement and disabled below 901px and for touch input.
- Enabled macOS Accessibility → Motion → Reduce motion, reloaded at both widths: zero hidden animated content, zero active CSS animation names, final prices, and automatic scrolling. Restored the original system preference afterward.
- Served production HTML with every script removed: zero scripts, all motion states `idle`, zero hidden reveal/letter/chart/message/plan elements, final prices.
- Checked original JSX wording and unchanged public configuration/dependencies. All CSS keyframes contain only `transform` and `opacity` declarations.

FAQ expansion uses FLIP: native details layout commits once, while the answer, border and following blocks animate with transforms/opacity. No height, filter, SVG filter attribute, color, or layout property is animated. Without JavaScript the native details interaction remains available.
