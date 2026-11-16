'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { reducedMotionQuery, useInView } from './use-in-view';

export function RevealHeading({ children }: { children: ReactNode }) {
  const { ref, motion } = useInView<HTMLHeadingElement>();
  return <h2 ref={ref} className="reveal-heading" data-motion={motion}>{children}</h2>;
}

export function MotionSection({ children, className, id }: { children: ReactNode; className: string; id?: string }) {
  const { ref, motion } = useInView<HTMLElement>();
  return <section ref={ref} id={id} className={className} data-motion={motion}>{children}</section>;
}

export function MotionGroup({ children, className, label }: { children: ReactNode; className: string; label?: string }) {
  const { ref, motion } = useInView<HTMLDivElement>();
  return <div ref={ref} className={className} aria-label={label} data-motion={motion}>{children}</div>;
}

export function TypedHeading({ text, as: Heading = 'h1' }: { text: string; as?: 'h1' | 'h2' }) {
  return (
    <Heading className="typed-heading" aria-label={text} style={{ '--type-duration': `${text.length * 90}ms` } as CSSProperties}>
      <span className="typed-visual" aria-hidden="true">
        {Array.from(text).map((letter, index) => <span className="typed-letter" key={index} style={{ '--letter-delay': `${index * 90}ms` } as CSSProperties}>{letter}</span>)}
      </span>
    </Heading>
  );
}

export function HeroMotion({ children }: { children: ReactNode }) {
  const { ref, motion } = useInView<HTMLElement>();
  const frame = useRef(0);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const enabled = window.matchMedia(`(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 901px)`);
    const layers = [...hero.querySelectorAll<HTMLElement>('[data-parallax]')];
    const reset = () => {
      cancelAnimationFrame(frame.current);
      for (const layer of layers) layer.style.transform = '';
    };
    const onMove = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType === 'touch') return;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const horizontal = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        const vertical = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
        const distance = Math.max(1, Math.hypot(horizontal, vertical));
        layers.forEach((layer, index) => {
          const depth = [6, 10, 8][index] ?? 6;
          layer.style.transform = `translate3d(${horizontal / distance * depth}px, ${vertical / distance * depth}px, 0)`;
        });
      });
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', reset);
    enabled.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frame.current);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', reset);
      enabled.removeEventListener('change', reset);
      reset();
    };
  }, [ref]);

  return <section id="top" className="hero" ref={ref} data-motion={motion}>{children}</section>;
}

export function CountPrice({ price, delay }: { price: string; delay: number }) {
  const { ref, motion } = useInView<HTMLSpanElement>();
  const display = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const output = display.current;
    if (!output) return;
    if (motion === 'idle' || motion === 'static') {
      output.textContent = price;
      return;
    }
    output.textContent = '$0.00';
    if (motion !== 'running') return;
    const target = Number(price.replace('$', ''));
    let frame = 0;
    let start: number | undefined;
    const tick = (now: number) => {
      if (window.matchMedia(reducedMotionQuery).matches) { output.textContent = price; return; }
      start ??= now;
      const progress = Math.min(1, Math.max(0, (now - start - delay) / 800));
      output.textContent = progress === 1 ? price : `$${(target * (1 - (1 - progress) ** 3)).toFixed(2)}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [motion, price, delay]);

  return <span ref={ref} className="count-price" aria-label={price}><span className="price-reserve" aria-hidden="true">{price}</span><span className="price-value" aria-hidden="true" ref={display}>{price}</span></span>;
}

export function PlanMotion({ children, index, className }: { children: ReactNode; index: number; className: string }) {
  const { ref, motion } = useInView<HTMLElement>();
  return <article ref={ref} className={className} data-motion={motion} style={{ '--plan-delay': `${index * 140}ms` } as CSSProperties}>{children}</article>;
}
