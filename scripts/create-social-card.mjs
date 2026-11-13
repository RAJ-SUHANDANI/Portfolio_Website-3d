/**
 * Share image built from real live website captures and the original signature.
 * No fabricated screenshots and no generative imagery.
 */
import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd();
const logoSource=await readFile(path.join(root,'src/components/redesign/Signature.tsx'),'utf8');
const source=logoSource.match(/const signaturePath\s*=\s*("(?:[^"\\]|\\.)*")\s*;/);
if(!source)throw new Error('Missing original signature vector');
const signature=JSON.parse(source[1]);
const screenshot=async slug=>{
 const p=path.join(root,'public','project-captures',slug+'-desktop.webp');
 const png=await sharp(await readFile(p)).png().toBuffer();
 return 'data:image/png;base64,'+png.toString('base64');
};
const meme=await screenshot('memeismine');
const convo=await screenshot('convotools');
const svg=[
 '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
 '<defs><pattern id="p" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0H0V72" fill="none" stroke="#aec9ab" stroke-opacity=".10"/></pattern></defs>',
 '<rect width="1200" height="630" fill="#19221c"/><rect width="1200" height="630" fill="url(#p)"/>',
 '<circle cx="1030" cy="165" r="350" stroke="#94b88c" stroke-opacity=".14" fill="none"/>',
 '<path d="M0 592H1200" stroke="#9fba9b" stroke-opacity=".38"/>',
 '<g transform="translate(71 41) scale(.17)" fill="#f4f4e9"><path fill-rule="evenodd" d="'+signature+'"/></g>',
 '<text x="71" y="192" font-family="DejaVu Sans,Arial,sans-serif" font-weight="700" font-size="24" fill="#c7ef99" letter-spacing="1.5">CREATIVE DEVELOPER</text>',
 '<text x="67" y="279" font-family="DejaVu Sans,Arial,sans-serif" font-weight="700" font-size="72" fill="#f5f5ec" letter-spacing="-4">Some ideas</text>',
 '<text x="67" y="360" font-family="DejaVu Sans,Arial,sans-serif" font-weight="700" font-size="72" fill="#f5f5ec" letter-spacing="-4">don&apos;t leave</text>',
 '<text x="68" y="442" font-family="DejaVu Serif,Georgia,serif" font-style="italic" font-size="74" fill="#c7ef99" letter-spacing="-4">me alone.</text>',
 '<text x="71" y="501" font-family="DejaVu Sans,Arial,sans-serif" font-size="23" fill="#e3eadd">So I build them.</text>',
 '<g transform="rotate(-2 910 303)">',
 '<rect x="635" y="132" width="480" height="331" rx="12" fill="#f4f3e9"/>',
 '<rect x="645" y="141" width="460" height="26" fill="#e2e8dc"/>',
 '<circle cx="663" cy="154" r="4" fill="#cc745b"/><circle cx="675" cy="154" r="4" fill="#d4b862"/><circle cx="687" cy="154" r="4" fill="#7da47a"/>',
 '<text x="880" y="157" text-anchor="middle" font-family="DejaVu Sans" font-size="10" fill="#415346">memeismine.vercel.app</text>',
 '<image href="'+meme+'" x="645" y="168" width="460" height="289" preserveAspectRatio="xMidYMid meet"/>',
 '</g>',
 '<g transform="rotate(2 985 445)">',
 '<rect x="815" y="340" width="338" height="224" rx="10" fill="#f5f4eb"/>',
 '<rect x="823" y="349" width="322" height="22" fill="#e4e3f2"/>',
 '<circle cx="835" cy="360" r="3.5" fill="#b78573"/><circle cx="845" cy="384" r="3.5" fill="#d4b862"/><circle cx="855" cy="384" r="3.5" fill="#7da47a"/>',
 '<text x="990" y="363" text-anchor="middle" font-family="DejaVu Sans" font-size="9" fill="#5a5074">convotool.vercel.app</text>',
 '<image href="'+convo+'" x="823" y="371" width="322" height="202" preserveAspectRatio="xMidYMid meet"/>',
 '</g>',
 '<text x="71" y="610" font-family="DejaVu Sans,Arial,sans-serif" font-size="13" font-weight="700" fill="#d3e2cd">RAJ SUHANDANI</text>',
 '<text x="1118" y="610" text-anchor="end" font-family="DejaVu Sans,Arial,sans-serif" font-size="13" fill="#b9cbbb">9 REAL PROJECTS</text>',
 '</svg>'
].join('\n');
const dest=path.join(root,'public','social-card.jpg');
await sharp(Buffer.from(svg)).jpeg({quality:91,chromaSubsampling:'4:4:4',mozjpeg:true}).toFile(dest);
console.log('Generated social card at',dest);
