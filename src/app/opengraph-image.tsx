import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Raj Suhandani — Make Ideas Feel Real. The Proof Lab.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const signature = (await readFile(join(process.cwd(), 'public', 'brand-signature.svg'), 'utf8'))
    .replace('fill="black"', 'fill="#f2f3e9"');
  const signatureSource = 'data:image/svg+xml;base64,' + Buffer.from(signature).toString('base64');

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#121a15', color: '#f4f5ef', padding: '56px 68px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #6d7e6e', paddingBottom: '28px' }}>
        <img src={signatureSource} alt="" style={{ width: '245px', height: '90px' }} />
        <span style={{ display: 'flex', color: '#d8ef80', fontSize: 16, letterSpacing: 4 }}>THE PROOF LAB / 2026</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '18px' }}>
        <span style={{ fontSize: 18, letterSpacing: 4, color: '#b3c1af', marginBottom: 20 }}>DESIGN × ENGINEERING × CURIOSITY</span>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 112, letterSpacing: -7, lineHeight: 1.02 }}>MAKE IDEAS</span>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 112, letterSpacing: -7, lineHeight: 1.02, color: '#d8ef80' }}>FEEL REAL.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: '1px solid #6d7e6e', paddingTop: '25px', fontSize: 17, color: '#c3cfc0' }}>
        <span>CREATIVE DEVELOPER & SOFTWARE ENGINEER</span>
        <span>RAJSUHANDANI.VERCEL.APP ↗</span>
      </div>
      <div style={{ position: 'absolute', right: -150, top: 105, width: 460, height: 460, border: '1px solid #aec88c40', borderRadius: '50%', display: 'flex', pointerEvents: 'none' }} />
    </div>,
    { ...size }
  );
}