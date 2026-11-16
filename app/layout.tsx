import type { Metadata, Viewport } from 'next';
import '@fontsource/anton';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import { siteConfig } from '@/config/products';
import './globals.css';

const live = Boolean(siteConfig.publicOrigin);

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.publicOrigin || 'http://127.0.0.1:3200'),
  ...(live ? { alternates: { canonical: '/' } } : {}),
  openGraph: { title: siteConfig.title, description: siteConfig.description, type: 'website', locale: 'en_US', siteName: siteConfig.name },
  twitter: { card: 'summary_large_image', title: siteConfig.title, description: siteConfig.description },
  // Search engines are allowed in automatically once siteConfig.publicOrigin is set.
  robots: { index: live, follow: live },
};
export const viewport: Viewport = { themeColor: '#2c99d6', colorScheme: 'light' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
