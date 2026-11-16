# SwiftChart showcase website

A one-page Next.js site that introduces SwiftChart and sends visitors to its four products: Signals (Telegram), the Web App, Agent Swift (Telegram), and the TradingView Indicator. It is separate from the trading app itself and contains no trading logic.

## Run it

```sh
npm install
npm run dev        # http://127.0.0.1:3200
npm run build      # production build
```

## Where things live

| What | File |
| --- | --- |
| All wording, product links, FAQs, the four "how it works" steps | `config/products.ts` |
| Page layout | `components/site.tsx` |
| The annotated example chart | `components/how-it-works.tsx` |
| Example Telegram messages (stand-ins until real captures exist) | `components/previews.tsx` |
| Colours, fonts, spacing | `app/globals.css` |
| Real product captures | `public/screenshots/` |

## Things to do before launch

1. **Real Telegram captures.** Signals and Agent Swift currently show drawn example messages, labelled as examples. Save real captures into `public/screenshots/` and fill the `screenshot` field for that product in `config/products.ts`; the drawn example is replaced automatically.
2. **Better captures of the app and indicator.** The app capture shows the "no setup" state; one with a live setup on screen sells harder. The indicator capture is a light-theme forex chart; a dark crypto chart with the panel readable would match the site.
3. **TradingView link.** Set `destinationUrl` on the indicator once it is published. Until then the page says "Coming to TradingView soon".
4. **Domain.** Set `siteConfig.publicOrigin`. That also switches on search-engine indexing, which is off until then.
5. **Check the claims.** The copy says: live Binance and Hyperliquid data, seven market regimes, take-profit alerts, a 48-hour window on every signal, crypto and forex. Edit `config/products.ts` if any of these is not live yet.

The site makes no performance or profit claims, and the footer carries a risk notice. Keep it that way unless you have published results to point to.

Fonts (Anton, Space Grotesk, JetBrains Mono) are bundled through `@fontsource`, so the build needs no outside font service.
