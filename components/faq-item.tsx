'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { Icon } from './icon';
import { reducedMotionQuery } from './use-in-view';

const timing = { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' };

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const rule = useRef<HTMLSpanElement>(null);
  const animations = useRef<Animation[]>([]);
  const ghost = useRef<HTMLElement | null>(null);
  const clear = () => {
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    ghost.current?.remove();
    ghost.current = null;
  };

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    const onChange = () => { if (media.matches) clear(); };
    media.addEventListener('change', onChange);
    return () => { clear(); media.removeEventListener('change', onChange); };
  }, []);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const details = ref.current;
    if (!details || window.matchMedia(reducedMotionQuery).matches || !details.animate) return;
    event.preventDefault();
    // FLIP the height change: layout commits once; only transforms/opacity animate.
    // Native <details> still works without JS, including keyboard activation.
    const moving = [...document.querySelectorAll<HTMLElement>('.faq-item, .closing, .site-footer')].filter(element => element !== details.parentElement);
    const before = moving.map(element => element.getBoundingClientRect().top);
    const ruleTop = rule.current?.getBoundingClientRect().top ?? 0;
    clear();
    const paragraph = details.querySelector('p')!;
    const opening = !details.open;
    if (!opening) {
      const rect = paragraph.getBoundingClientRect();
      const copy = paragraph.cloneNode(true) as HTMLElement;
      copy.setAttribute('aria-hidden', 'true');
      copy.className = 'faq-exit';
      Object.assign(copy.style, { position: 'absolute', top: `${window.scrollY + rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, margin: '0', pointerEvents: 'none' });
      document.body.append(copy);
      ghost.current = copy;
      const exit = copy.animate([{ transform: 'translateY(0) scaleY(1)', opacity: 1 }, { transform: 'translateY(-8px) scaleY(.96)', opacity: 0 }], { ...timing, fill: 'forwards' });
      exit.onfinish = () => { copy.remove(); if (ghost.current === copy) ghost.current = null; };
      animations.current.push(exit);
    }
    details.open = opening;
    if (rule.current) {
      const delta = ruleTop - rule.current.getBoundingClientRect().top;
      animations.current.push(rule.current.animate([{ transform: `translateY(${delta}px)` }, { transform: 'translateY(0)' }], timing));
    }
    moving.forEach((element, index) => {
      const delta = before[index] - element.getBoundingClientRect().top;
      if (delta) animations.current.push(element.animate([{ transform: `translateY(${delta}px)` }, { transform: 'translateY(0)' }], timing));
    });
    if (opening) animations.current.push(paragraph.animate([{ transform: 'translateY(-8px) scaleY(.96)', opacity: 0 }, { transform: 'translateY(0) scaleY(1)', opacity: 1 }], timing));
  };

  return <div className="faq-item"><details ref={ref}><summary onClick={toggle}>{question}<Icon name="plus" size={20} /></summary><p>{answer}</p></details><span className="faq-rule" ref={rule} aria-hidden="true" /></div>;
}
