import Image from 'next/image';
import { siteConfig } from '@/config/products';
import type { IconName } from '@/config/products';
export function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    web: <><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M8 21h8M12 18v3M3 9h18"/></>,
    signals: <><path d="m21 3-6 18-4-8-8-4L21 3ZM11 13l5-5"/></>,
    agent: <><path d="M20 11.5a8 8 0 0 1-8 8H5l-3 3v-11a9 9 0 0 1 18 0Z"/><path d="m12 7 .9 2.6L15.5 11l-2.6 1.1-.9 2.9-1-2.9L8.5 11 11 9.6 12 7Z"/></>,
    indicator: <><path d="M5 4v16M12 2v17M19 6v16"/><rect x="3" y="8" width="4" height="7" rx="1"/><rect x="10" y="5" width="4" height="8" rx="1"/><rect x="17" y="10" width="4" height="7" rx="1"/></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>, arrowUp: <path d="M6 18 18 6M6 6h12v12"/>,
    check: <path d="m5 12 4 4L19 6"/>, menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>, plus: <path d="M12 5v14M5 12h14"/>, chevron: <path d="m8 5 7 7-7 7"/>,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className="brand"><Image className="brand-mark" src={siteConfig.brandMark} alt="" width={38} height={38} sizes="38px"/>{!compact && <span>SwiftChart<span className="brand-dot">.</span></span>}</span>;
}
