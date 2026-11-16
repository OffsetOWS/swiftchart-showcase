import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { products } from '@/config/products';

export const alt = 'SwiftChart: trade setups for crypto and forex, sent when they are confirmed.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const brandImage = await readFile(join(process.cwd(), 'public/brand-mark.png'));
  const brandSource = `data:image/png;base64,${brandImage.toString('base64')}`;
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#2c99d6', color: '#ffffff', padding: '58px 66px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15, fontSize: 30, fontWeight: 700 }}><img src={brandSource} alt="" width={52} height={52} />SwiftChart</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 62, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}><span>Most of the market isn’t worth trading.</span><span style={{ color: '#f8fafc' }}>SwiftChart finds the part that is.</span></div>
      <div style={{ display: 'flex', width: '100%', borderTop: '1px solid #ffffff66', paddingTop: 26, gap: 44 }}>
        {products.map(product => <div key={product.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 22 }}>{product.shortName}</span><span style={{ color: '#e3f1fa', fontSize: 16 }}>{product.platform}</span></div>)}
      </div>
    </div>,
    size,
  );
}
