import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
export const metadata: Metadata = { title: 'Résumé — Raj Suhandani', description: 'Raj Suhandani’s original professional résumé.' };
const resume = '/Raj-Suhandani-Resume.pdf';

export default function ResumePage() {
  return <main className="studio-document-page">
    <header className="studio-document-nav"><Link href="/" aria-label="Return to portfolio"><img src="/brand-signature.svg" alt="Raj Suhandani" width={183} height={65} /></Link><Link href="/"><ArrowLeft size={18} /> BACK TO THE STUDIO</Link></header>
    <section className="studio-document-opening"><div className="studio-section-line"><span>FILE 011 / THE HUMAN PART</span><span>RÉSUMÉ, 2026</span></div>
      <p>IN CASE YOU PREFER THE PAPERWORK.</p><h1>THE STORY<br />SO <em>FAR.</em></h1>
      <div className="studio-document-actions"><p>This is my original résumé, exactly as provided. You can open it in a new tab or save the PDF.</p><div><a href={resume} target="_blank" rel="noopener noreferrer">OPEN ORIGINAL <ArrowUpRight size={18} /></a><a href={resume} download="Raj_Suhandani_Resume.pdf">SAVE A COPY <Download size={18} /></a></div></div>
    </section>
    <section className="studio-document-preview"><div className="studio-section-line"><span>THE ACTUAL DOCUMENT</span><span>PDF / ORIGINAL</span></div><iframe src={resume + '#toolbar=1&navpanes=0&view=FitH'} title="Raj Suhandani original résumé PDF" loading="lazy" /><p>Can&apos;t see the preview? <a href={resume} target="_blank" rel="noopener noreferrer">Open the PDF directly.</a></p></section>
    <footer className="studio-document-footer"><Link href="/">← BACK TO MY WORK</Link><span>RAJ SUHANDANI · 2026</span></footer>
  </main>;
}
