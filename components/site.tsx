import { faqs, links, pricing, products, siteConfig } from '@/config/products';
import type { Product } from '@/config/products';
import { Brand, Icon } from './icon';
import { Header } from './header';
import { HowItWorks } from './how-it-works';
import { AccessLink } from './access-link';
import { ScreenshotPreview } from './screenshot-preview';
import { Clouds, SkyClouds } from './clouds';
import { CountPrice, HeroMotion, MotionSection, PlanMotion, RevealHeading, TypedHeading } from './motion';
import { FaqItem } from './faq-item';
import { AgentExample, SignalBubble, SignalsExample, TakeProfitBubble } from './previews';

const heroHeadline = 'Your next setup.';

function ProductMedia({ product }: { product: Product }) {
  if (product.detail) return <ScreenshotPreview product={product} use={product.detail} crop />;
  if (product.screenshot) return <ScreenshotPreview product={product} />;
  return product.id === 'agent' ? <AgentExample /> : <SignalsExample />;
}

function StartButtons() {
  return (
    <div className="start-buttons">
      <a className="button button-primary button-large" href="#pricing">See plans</a>
      <a className="button button-outline button-large" href={links.app} target="_blank" rel="noopener noreferrer">Open the web app<span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <RevealHeading>Signals for $9.99. Everything for $19.99.</RevealHeading>
        <p className="section-lede">Basic sends confirmed setups to your Telegram. Pro adds Agent Swift, the TradingView Indicator and every new feature.</p>
        <div className="plans">
          {pricing.plans.map((plan, index) => (
            <PlanMotion className={`plan plan-${plan.id}`} key={plan.id} index={index}>
              <h3>{plan.name}</h3>
              <p className="plan-price"><CountPrice price={plan.price} delay={index * 140} /> {plan.period}</p>
              <p className="plan-summary">{plan.summary}</p>
              <ul className="points">
                {plan.features.map((feature, index) => <li key={feature} style={{ animationDelay: `${300 + index * 90}ms` }}><Icon name="check" size={17} /><span>{feature}</span></li>)}
              </ul>
              {pricing.checkoutAvailable ? (
                <a className={`button button-${plan.id === 'pro' ? 'primary' : 'outline'} button-large`} href={pricing.checkoutUrl} target="_blank" rel="noopener noreferrer">{plan.cta}<span className="sr-only"> (opens in a new tab)</span></a>
              ) : (
                <p className="plan-soon"><span className="pending-dot" />Opens soon.</p>
              )}
            </PlanMotion>
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
        <HeroMotion headline={heroHeadline}>
          <SkyClouds />
          <div className="container hero-inner">
            <p className="kicker">Crypto and forex setups</p>
            <TypedHeading text={heroHeadline} />
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-lede">Most of the market isn’t worth trading. SwiftChart reads the charts for you and messages you on Telegram only when a setup is confirmed.</p>
                <StartButtons />
                <p className="hero-note">No trades are placed for you. Every decision stays yours.</p>
              </div>
              <div className="stage">
                <div className="float float-signal"><div className="notification-enter"><div className="hero-parallax" data-parallax><div className="float-surface card">
                  <span className="pulse" aria-hidden="true" />
                  <p className="float-label"><Icon name="signals" size={16} />SwiftChart Signals</p>
                  <SignalBubble />
                </div></div></div></div>
                <div className="stage-phone"><div className="phone-rise"><div className="phone-bob"><div className="hero-parallax" data-parallax><ScreenshotPreview product={products.find(p => p.id === 'web')!} /></div></div></div></div>
                <div className="float float-win"><div className="notification-enter"><div className="hero-parallax" data-parallax><div className="float-surface card">
                  <p className="float-label"><Icon name="signals" size={16} />SwiftChart Signals</p>
                  <TakeProfitBubble />
                </div></div></div></div>
                <p className="stage-note">The phone is the real app. The messages are examples.</p>
              </div>
            </div>
          </div>
          <Clouds id="clouds-hero" />
        </HeroMotion>

        <HowItWorks />

        <section id="products" className="products">
          <div className="container">
            <RevealHeading>Four ways to use it</RevealHeading>
            <p className="section-lede">The same analysis sits behind all four. Pick the one that fits how you trade, or use them together.</p>
            <div className="bento">
              {products.map(product => (
                <article id={`product-${product.id}`} className={`tile tile-${product.id} card`} key={product.id}>
                  <div className="tile-copy">
                    <p className="product-name"><span className="product-icon"><Icon name={product.id} size={20} /></span>{product.name}<span className="platform">{product.platform}</span><span className="platform">{product.plan}</span></p>
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
            <RevealHeading>Questions people ask first</RevealHeading>
            <div className="faq-list card">
              {faqs.map(faq => <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />)}
            </div>
          </div>
        </section>

        <MotionSection className="closing">
          <div className="container closing-inner">
            <TypedHeading as="h2" text="Let the setup find you." />
            <p className="closing-lede">Pick Basic for the signals, or Pro for every tool.</p>
            <StartButtons />
          </div>
          <Clouds id="clouds-closing" />
        </MotionSection>
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
