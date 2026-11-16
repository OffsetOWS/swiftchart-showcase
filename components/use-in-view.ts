'use client';

import { useEffect, useRef, useState } from 'react';

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
export type MotionState = 'idle' | 'pending' | 'running' | 'static';

// A single observer serves every one-shot reveal on the page.
const listeners = new Map<Element, () => void>();
let observer: IntersectionObserver | undefined;

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const played = useRef(false);
  // Server-rendered content, and content without working JS/IO, stays visible.
  const [motion, setMotion] = useState<MotionState>('idle');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia(reducedMotionQuery);
    const finish = () => {
      played.current = true;
      listeners.delete(element);
      observer?.unobserve(element);
    };
    const onPreference = () => {
      if (preference.matches) {
        finish();
        setMotion('static');
      }
    };
    preference.addEventListener('change', onPreference);
    if (preference.matches || played.current || !('IntersectionObserver' in window)) {
      finish();
      setMotion('static');
    } else {
      try {
        observer ??= new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) listeners.get(entry.target)?.();
          }
        }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
        listeners.set(element, () => {
          finish();
          setMotion('running');
        });
        observer.observe(element);
        // Only arm hidden start states after observation succeeds, after mount.
        setMotion('pending');
      } catch {
        finish();
        setMotion('static');
      }
    }
    return () => {
      listeners.delete(element);
      observer?.unobserve(element);
      preference.removeEventListener('change', onPreference);
    };
  }, []);

  return { ref, motion };
}
