import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Raj Suhandani — Some people collect ideas. I build mine.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function OpenGraphImage() {
  const svg = await readFile(join(process.cwd(), 'public', 'brand-signature.svg'), 'utf8');
  const signature = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#f0eee7', color: '#20211e', padding: '44px 57px', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #20211e', paddingBottom: 21 }}>
        <img src={signature} alt="" width={210} height={84} style={{ objectFit: 'contain' }} />
        <span style={{ fontSize: 16, letterSpacing: 2, color: '#596157' }}>PERSONAL INTERNET SPACE / 2026</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: 85, lineHeight: 1.04, fontWeight: 900, letterSpacing: -6 }}>
        <span>SOME PEOPLE</span>
        <span>COLLECT IDEAS.</span>
        <span style={{ color: '#fff', background: '#e54b31', padding: '6px 25px 15px', marginTop: 10 }}>I BUILD MINE.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderTop: '1px solid #20211e', paddingTop: 24, fontSize: 15, letterSpacing: 1 }}>
        <span>DESIGN-MINDED ENGINEERING / INTERACTIVE EXPERIENCES</span>
        <span>RAJSUHANDANI.VERCEL.APP ↗</span>
      </div>
    </div>,
    { ...size }
  );
}