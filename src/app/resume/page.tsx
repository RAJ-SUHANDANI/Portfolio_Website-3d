import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Résumé — Raj Suhandani',
  description: 'Professional résumé for Raj Suhandani. View or download the original document.'
};

const resume = '/Raj-Suhandani-Resume.pdf';

export default function ResumePage() {
  return (
    <main className="award-resume">
      <header className="award-resume-nav">
        <Link href="/" aria-label="Raj Suhandani portfolio homepage"><img src="/brand-signature.svg" alt="Raj Suhandani" width={186} height={70} /></Link>
        <Link href="/"><ArrowLeft size={17} /> BACK TO THE PROOF LAB</Link>
      </header>
      <section className="award-resume-hero">
        <div className="award-section-kicker"><span>THE PROFESSIONAL RECORD / 2026</span><span>THE PERSON BEHIND THE WORK</span></div>
        <p className="award-overline">A LITTLE MORE CONTEXT.</p>
        <h1>THE STORY<br />SO <em>FAR.</em></h1>
        <div className="award-resume-actions">
          <p>The original résumé, presented without changing its contents. Open it directly or download a copy.</p>
          <div>
            <a href={resume} target="_blank" rel="noopener noreferrer">VIEW ORIGINAL PDF <ArrowUpRight size={20} /></a>
            <a href={resume} download="Raj_Suhandani_Resume.pdf">DOWNLOAD RÉSUMÉ <Download size={20} /></a>
          </div>
        </div>
      </section>
      <section className="award-resume-document">
        <div className="award-resume-document-heading"><span>THE DOCUMENT / PDF</span><span>ORIGINAL FILE</span></div>
        <iframe src={resume + '#toolbar=1&navpanes=0&view=FitH'} title="Raj Suhandani professional résumé PDF" loading="lazy" />
        <p>Document preview unavailable? <a href={resume} target="_blank" rel="noopener noreferrer">Open the PDF in a new tab.</a></p>
      </section>
      <footer className="award-resume-footer"><Link href="/">← RETURN TO PORTFOLIO</Link><span>© 2026 RAJ SUHANDANI</span></footer>
    </main>
  );
}
