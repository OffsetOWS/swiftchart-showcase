import { faqs, links, pricing, products, siteConfig } from '@/config/products';
import type { Product } from '@/config/products';
import { Brand, Icon } from './icon';
import { Header } from './header';
import { HowItWorks } from './how-it-works';
import { AccessLink } from './access-link';
import { ScreenshotPreview } from './screenshot-preview';
import { Clouds } from './clouds';
import { AgentExample, SignalBubble, SignalsExample, TakeProfitBubble } from './previews';

function ProductMedia({ product }: { product: Product }) {
  if (product.detail) return <ScreenshotPreview product={product} use={product.detail} crop />;
  if (product.screenshot) return <ScreenshotPreview product={product} />;
  return product.id === 'agent' ? <AgentExample /> : <SignalsExample />;
}

function StartButtons() {
  return (
    <div className="start-buttons">
      <a className="button button-primary button-large" href={links.app} target="_blank" rel="noopener noreferrer">Start free<span className="sr-only"> (opens in a new tab)</span></a>
      <a className="button button-outline button-large" href="#pricing">See pricing</a>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2>Free to look. $9.99 to be told.</h2>
        <p className="section-lede">Anyone can open SwiftChart and scan for a setup. Pro sends the setup to you, so you do not have to sit at the chart.</p>
        <div className="plans">
          {pricing.plans.map(plan => (
            <article className={`plan plan-${plan.id}`} key={plan.id}>
              <h3>{plan.name}</h3>
              <p className="plan-price"><span>{plan.price}</span> {plan.period}</p>
              <p className="plan-summary">{plan.summary}</p>
              <ul className="points">
                {plan.features.map(feature => <li key={feature}><Icon name="check" size={17} /><span>{feature}</span></li>)}
              </ul>
              {plan.id === 'free' ? (
                <a className="button button-outline button-large" href={links.app} target="_blank" rel="noopener noreferrer">{plan.cta}<span className="sr-only"> (opens in a new tab)</span></a>
              ) : pricing.proAvailable ? (
                <a className="button button-primary button-large" href={pricing.proUrl} target="_blank" rel="noopener noreferrer">{plan.cta}<span className="sr-only"> (opens in a new tab)</span></a>
              ) : (
                <p className="plan-soon"><span className="pending-dot" />Pro opens soon. Start free today.</p>
              )}
            </article>
          ))}
        </div>
        <p className="plan-note">{pricing.note}</p>
      </div>
    </section>
  );
}

export function Site() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section id="top" className="hero">
          <div className="container hero-inner">
            <p className="kicker">Crypto and forex setups</p>
            <h1>Trade clear.</h1>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-lede">Most of the market isn’t worth trading. SwiftChart reads the charts for you and messages you on Telegram only when a setup is confirmed.</p>
                <StartButtons />
                <p className="hero-note">No trades are placed for you. Every decision stays yours.</p>
              </div>
              <div className="stage">
                <div className="float float-signal card">
                  <span className="pulse" aria-hidden="true" />
                  <p className="float-label"><Icon name="signals" size={16} />SwiftChart Signals</p>
                  <SignalBubble />
                </div>
                <div className="stage-phone"><ScreenshotPreview product={products.find(p => p.id === 'web')!} /></div>
                <div className="float float-win card">
                  <p className="float-label"><Icon name="signals" size={16} />SwiftChart Signals</p>
                  <TakeProfitBubble />
                </div>
                <p className="stage-note">The phone is the real app. The messages are examples.</p>
              </div>
            </div>
          </div>
          <Clouds id="clouds-hero" />
        </section>

        <HowItWorks />

        <section id="products" className="products">
          <div className="container">
            <h2>Four ways to use it</h2>
            <p className="section-lede">The same analysis sits behind all four. Pick the one that fits how you trade, or use them together.</p>
            <div className="bento">
              {products.map(product => (
                <article id={`product-${product.id}`} className={`tile tile-${product.id} card`} key={product.id}>
                  <div className="tile-copy">
                    <p className="product-name"><span className="product-icon"><Icon name={product.id} size={20} /></span>{product.name}<span className="platform">{product.platform}</span></p>
                    <h3>{product.headline}</h3>
                    <p className="product-description">{product.description}</p>
                    <ul className="points">
                      {product.points.map(point => <li key={point}><Icon name="check" size={17} /><span>{point}</span></li>)}
                    </ul>
                    <AccessLink product={product} variant={product.id === 'signals' ? 'primary' : 'outline'} />
                  </div>
                  <div className="tile-media"><ProductMedia product={product} /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Pricing />

        <section id="faq" className="faq">
          <div className="container faq-layout">
            <h2>Questions people ask first</h2>
            <div className="faq-list card">
              {faqs.map(faq => <details key={faq.question}><summary>{faq.question}<Icon name="plus" size={20} /></summary><p>{faq.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="closing">
          <div className="container closing-inner">
            <h2>Let the setup find you.</h2>
            <p className="closing-lede">Start free in the web app. Go Pro when you want the setups sent to you.</p>
            <StartButtons />
          </div>
          <Clouds id="clouds-closing" />
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#top" className="brand-link" aria-label="SwiftChart home"><Brand /></a>
          <nav aria-label="Footer navigation">
            {products.filter(p => p.destinationUrl).map(p => <a key={p.id} href={p.destinationUrl!} target="_blank" rel="noopener noreferrer">{p.shortName}<span className="sr-only"> (opens in a new tab)</span></a>)}
            {siteConfig.contactLinks.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<span className="sr-only"> (opens in a new tab)</span></a>)}
          </nav>
          <p className="disclaimer">SwiftChart provides market analysis, not financial advice, and does not place trades. Trading involves risk and you can lose money. © {new Date().getFullYear()} SwiftChart</p>
        </div>
      </footer>
    </>
  );
}
