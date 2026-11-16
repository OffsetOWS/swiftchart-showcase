/** All public content lives here. Never add private credentials or private invite links.
 * Set destinationUrl only once the public destination is confirmed; null shows a "coming soon" note.
 * To swap a mock-up for a real capture: put the image in public/screenshots/ and fill `screenshot`.
 */
export type ProductId = 'web' | 'signals' | 'agent' | 'indicator';
export type IconName = ProductId | 'arrow' | 'arrowUp' | 'check' | 'menu' | 'close' | 'plus' | 'chevron';

export type Screenshot = { src: string; alt: string; width: number; height: number; caption: string };

export type Product = {
  id: ProductId;
  name: string;
  shortName: string;
  /** Where it runs, shown as a small tag beside the name. */
  platform: string;
  plan: 'Basic and Pro' | 'Pro';
  /** One line that says what you get. */
  headline: string;
  description: string;
  /** Three or four concrete things it does. */
  points: string[];
  destinationUrl: string | null;
  accessLabel: string;
  screenshot: Screenshot | null;
  /** Optional second capture, shown as a close-up in the product's own section. */
  detail?: Screenshot;
};

export const links = {
  app: 'https://swiftchart.xyz/app/home',
  signals: 'https://t.me/SwiftChartBot',
  agent: 'https://t.me/swift_agent_bot',
};

/** Pricing. Edit the plans here; the page builds the section from this. */
export type Plan = {
  id: 'basic' | 'pro';
  name: string;
  price: string;
  period: string;
  summary: string;
  features: string[];
  cta: string;
};

export const pricing = {
  /** Flip to true once people can actually pay. Until then both cards say they open soon. */
  checkoutAvailable: false,
  /** Where the plan buttons send people once checkoutAvailable is true. */
  checkoutUrl: links.app,
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: 'a month',
      summary: 'Confirmed setups sent to your Telegram.',
      features: [
        'Confirmed setups from the SwiftChart Signals bot',
        'Take-profit alerts on Telegram',
        'A 48-hour window on every signal',
        'Web App access',
      ],
      cta: 'Get Basic',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: 'a month',
      summary: 'Every SwiftChart tool, plus new features as they launch.',
      features: [
        'Everything in Basic',
        'Agent Swift',
        'The TradingView Indicator',
        'Access to new features as they launch',
      ],
      cta: 'Go Pro',
    },
  ] as Plan[],
  note: 'Both plans are billed monthly. There is no free plan and no lifetime plan.',
};

export const products: Product[] = [
  {
    id: 'signals',
    name: 'SwiftChart Signals',
    shortName: 'Signals',
    platform: 'Telegram',
    plan: 'Basic and Pro',
    headline: 'The setup comes to you.',
    description:
      'A Telegram bot that messages you when a setup is confirmed, then keeps you posted as the trade plays out. No chart-watching in between. Included in Basic and Pro.',
    points: [
      'Only confirmed setups are sent. Weak, mid-range ones are filtered out before they reach you.',
      'You get an alert the moment a trade hits take-profit.',
      'Every signal has a 48-hour window, so nothing is left hanging open.',
    ],
    destinationUrl: links.signals,
    accessLabel: 'Open the Telegram bot',
    screenshot: null,
  },
  {
    id: 'web',
    name: 'SwiftChart Web App',
    shortName: 'Web App',
    platform: 'Browser',
    plan: 'Basic and Pro',
    headline: 'The whole market on one screen.',
    description:
      'Open it on your phone or laptop to see what the market is doing right now, run a scan yourself, and look back through past setups.',
    points: [
      'Switch between crypto and forex with one tap.',
      'See the current market regime in plain words, such as “Bearish, selective”.',
      'Open any setup for the full plan: entry zone, stop loss, two targets and the reasoning.',
      'Every past setup is kept in History.',
    ],
    destinationUrl: links.app,
    accessLabel: 'Open the web app',
    screenshot: {
      src: '/screenshots/web-app.jpg',
      alt: 'SwiftChart Web App home screen: market summary for HYPEUSDT, a “Bearish, selective” market regime, and a list of the latest short setups.',
      width: 880,
      height: 1573,
      caption: 'SwiftChart Web App home screen, captured 16 November 2026.',
    },
    detail: {
      src: '/screenshots/web-app-setup.jpg',
      alt: 'SwiftChart trade analysis for a HYPEUSDT short on the 4H chart: 3.0R, a 48-hour tracking exit, and a trade plan with stop loss, entry zone and two targets.',
      width: 880,
      height: 1562,
      caption: 'SwiftChart Web App setup detail, captured 16 November 2026.',
    },
  },
  {
    id: 'agent',
    name: 'Agent Swift',
    shortName: 'Agent Swift',
    platform: 'Telegram',
    plan: 'Pro',
    headline: 'Ask it about any chart.',
    description:
      'A market analyst you can message. Ask what a coin is doing, why a setup looks the way it does, or what to watch next, and keep asking until it makes sense.',
    points: [
      'Ask in plain language. No commands to learn.',
      'Follow up as many times as you need.',
      'Separate from Signals: this one talks back.',
    ],
    destinationUrl: links.agent,
    accessLabel: 'Chat with Agent Swift',
    screenshot: null,
  },
  {
    id: 'indicator',
    name: 'SwiftChart Indicator',
    shortName: 'Indicator',
    platform: 'TradingView',
    plan: 'Pro',
    headline: 'The same read, on your own chart.',
    description:
      'Add SwiftChart to TradingView and a panel on your chart shows the bias, the zones, and what to do next, on the pair and timeframe you already have open.',
    points: [
      'Marks the supply and demand zones with their price levels.',
      'Shows the bias on your timeframe and the one above it.',
      'Gives a clear next action, including “Wait, do not enter”.',
      'Works on forex and crypto.',
    ],
    destinationUrl: null,
    accessLabel: 'Add it on TradingView',
    screenshot: {
      src: '/screenshots/tradingview-indicator.jpg',
      alt: 'SwiftChart indicator on a EURGBP four-hour TradingView chart, with a panel listing bias, supply and demand levels, and a "Wait, do not enter" instruction.',
      width: 1280,
      height: 720,
      caption: 'SwiftChart on a EURGBP 4H TradingView chart. Historical chart, not live data.',
    },
  },
];

/** The four steps behind every signal. Each one is marked on the chart diagram by its number. */
export const steps = [
  { title: 'Maps the zones', body: 'Finds the support and resistance levels where price has turned before, from live Binance and Hyperliquid data.' },
  { title: 'Spots the sweep', body: 'Catches the moment price spikes through a level to grab liquidity, then snaps back.' },
  { title: 'Reads the regime', body: 'Sorts the market into one of seven regimes, so a setup is only taken when conditions suit it.' },
  { title: 'Sends it, or waits', body: 'Confirmed setups go to Telegram. Everything else is dropped, and you are told to wait.' },
];

export const siteConfig = {
  name: 'SwiftChart',
  brandMark: '/brand-mark.png',
  title: 'SwiftChart: trade setups for crypto and forex, sent when they are confirmed',
  description:
    'SwiftChart reads the market for you. It maps support and resistance, spots liquidity sweeps, and sends a setup to Telegram only when it is confirmed. Web app, Telegram signals, Agent Swift, and a TradingView indicator.',
  /** Set to the final public address (for example "https://swiftchart.xyz") to switch on search indexing and share links. */
  publicOrigin: null as string | null,
  contactLinks: [] as { label: string; url: string }[],
};

export const faqs = [
  { question: 'What does it cost?', answer: 'Basic is $9.99 a month and covers Telegram signals. Pro is $19.99 a month and adds Agent Swift, the TradingView Indicator and access to new features. There is no free plan.' },
  { question: 'What is the difference between Basic and Pro?', answer: 'Basic gets you the signals on Telegram. Pro gets you every SwiftChart tool: signals, Agent Swift, the TradingView Indicator, and new features as they launch.' },
  { question: 'Which markets does SwiftChart cover?', answer: 'Crypto and forex. The web app switches between the two, and the TradingView indicator works on both.' },
  { question: 'Does it place trades for me?', answer: 'No. SwiftChart finds and explains setups. You decide whether to take them and place the trade yourself, on whichever exchange or broker you use.' },
  { question: 'How is Signals different from Agent Swift?', answer: 'Signals is a feed: it messages you when a setup is confirmed and when a trade hits take-profit. Agent Swift is a conversation: you ask it questions and it answers. They are two separate Telegram bots.' },
  { question: 'Why did I not get a signal today?', answer: 'Because nothing passed the filter. SwiftChart drops weak and mid-range setups, so quiet days are expected. The web app shows the current regime, so you can see why it is waiting.' },
  { question: 'How long does a signal stay open?', answer: 'Up to 48 hours. If a setup has not played out by then, it is closed, so you are never left holding an old idea.' },
  { question: 'Do I need TradingView?', answer: 'Only for the indicator. The web app runs in any browser, and Signals and Agent Swift run in Telegram.' },
];
