'use client';

import { useEffect, useRef, useState } from 'react';
import { links } from '@/config/products';
import { Brand, Icon } from './icon';

const navigation = [
  { label: 'How it works', href: '#how' },
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Questions', href: '#faq' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 40);
      let current = '';
      for (const item of navigation) {
        const section = document.querySelector(item.href);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = item.href;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const line = indicatorRef.current;
    if (!nav || !line) return;
    const update = () => {
      const link = nav.querySelector<HTMLElement>('[aria-current]');
      line.style.opacity = link ? '1' : '0';
      if (link) line.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(nav);
    let alive = true;
    document.fonts.ready.then(() => { if (alive) update(); });
    return () => { alive = false; resize.disconnect(); };
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia('(min-width: 761px)');
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    media.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      media.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="header-inner container" ref={menuRef} onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
        <a href="#top" className="brand-link" aria-label="SwiftChart home"><Brand /></a>
        <nav className="desktop-nav" aria-label="Main navigation" ref={navRef}>
          <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          {navigation.map(item => <a key={item.href} href={item.href} aria-current={active === item.href ? 'location' : undefined}>{item.label}</a>)}
        </nav>
        <a className="button button-primary header-cta" href={links.app} target="_blank" rel="noopener noreferrer">Open the web app<span className="sr-only"> (opens in a new tab)</span></a>
        <button ref={buttonRef} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={23} />
        </button>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
          {navigation.map(item => <a key={item.href} href={item.href} aria-current={active === item.href ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
          <a className="button button-primary" href={links.app} target="_blank" rel="noopener noreferrer">Open the web app</a>
        </nav>
      </div>
    </header>
  );
}
