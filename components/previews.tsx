import type { CSSProperties, ReactNode } from 'react';
import { MotionGroup } from './motion';
import { Icon } from './icon';

/* Stand-ins for the two Telegram bots until real captures are added (see config/products.ts).
   They are labelled as examples on the page; replace them with real screenshots when you have them. */

export function SignalBubble() {
  return (
    <div className="bubble">
      <p className="bubble-title"><span className="tag tag-go">Long</span>SOLUSDT · 4H</p>
      <p>Support held after a liquidity sweep. Regime: edge confirmed.</p>
      <dl className="levels">
        <div><dt>Entry</dt><dd>182.40</dd></div>
        <div><dt>Stop</dt><dd>176.90</dd></div>
        <div><dt>Target</dt><dd>194.00</dd></div>
      </dl>
      <p className="bubble-foot">Valid for 48 hours</p>
    </div>
  );
}

export function TakeProfitBubble() {
  return (
    <div className="bubble bubble-win">
      <p className="bubble-title"><Icon name="check" size={16} />Take-profit hit</p>
      <p>SOLUSDT reached 194.00. Setup closed.</p>
    </div>
  );
}

function ChatTop({ icon, name }: { icon: 'signals' | 'agent'; name: string }) {
  return <div className="chat-top"><span className="chat-avatar"><Icon name={icon} size={18} /></span><div><b>{name}</b><span>bot</span></div></div>;
}

function Message({ children, delay, bot = false }: { children: ReactNode; delay: number; bot?: boolean }) {
  return (
    <div className={`chat-message ${bot ? 'chat-message-bot' : 'chat-message-human'}`} style={{ '--message-delay': `${delay}ms`, '--typing-delay': `${Math.max(0, delay - 600)}ms` } as CSSProperties}>
      {bot && <div className="typing" aria-hidden="true"><span /><span /><span /></div>}
      <div className="message-content">{children}</div>
    </div>
  );
}

export function SignalsExample() {
  return (
    <MotionGroup className="chat" label="Example of SwiftChart Signals messages">
      <ChatTop icon="signals" name="SwiftChart Signals" />
      <Message delay={600} bot><SignalBubble /></Message>
      <Message delay={1300} bot><TakeProfitBubble /></Message>
      <p className="example-note">Example messages. Real signals carry live prices.</p>
    </MotionGroup>
  );
}

export function AgentExample() {
  return (
    <MotionGroup className="chat" label="Example of a conversation with Agent Swift">
      <ChatTop icon="agent" name="Agent Swift" />
      <Message delay={0}><div className="bubble bubble-me"><p>Is ETH worth a look right now?</p></div></Message>
      <Message delay={700} bot><div className="bubble">
        <p>Not yet. ETH is sitting in the middle of its range, between support below and resistance above.</p>
        <p>I would wait for a sweep of the range low before looking for a long.</p>
      </div></Message>
      <Message delay={1400}><div className="bubble bubble-me"><p>What would confirm it?</p></div></Message>
      <Message delay={2100} bot><div className="bubble"><p>A quick dip under support that closes back above it, with the regime moving out of neutral.</p></div></Message>
      <p className="example-note">Example conversation.</p>
    </MotionGroup>
  );
}
