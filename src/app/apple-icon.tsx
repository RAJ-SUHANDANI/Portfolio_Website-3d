import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function AppleIcon() {
  const mark = await readFile(join(process.cwd(), 'public', 'favicon.svg'), 'utf8');
  const source = 'data:image/svg+xml;base64,' + Buffer.from(mark).toString('base64');

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#eeeee8' }}>
      <img src={source} alt="" width={180} height={180} />
    </div>,
    { ...size }
  );
}