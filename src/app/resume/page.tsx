import Link from 'next/link';
import type {Metadata} from 'next';
export const metadata: Metadata={title:'Resume | Raj Manish Suhandani',description:'View or download the original resume PDF.'};
const resume='/Raj-Suhandani-Resume.pdf';
export default function ResumePage(){return <main className="resume-page resume-document-page">
<Link href="/">← BACK TO PORTFOLIO</Link><p className="eyebrow">RESUME / ORIGINAL DOCUMENT</p>
<h1>MY RESUME<span style={{color:'#85a77b'}}>.</span></h1>
<p className="resume-document-intro">View my original resume below or download the same PDF without changes.</p>
<div className="resume-actions"><a className="button" href={resume} target="_blank" rel="noopener noreferrer">VIEW ORIGINAL PDF ↗</a><a href={resume} download="Raj_Suhandani_Resume.pdf">DOWNLOAD PDF ↓</a></div>
<div className="resume-document-frame"><iframe src={resume+'#toolbar=1&navpanes=0&view=FitH'} title="Original resume PDF of Raj Manish Suhandani" loading="lazy"/></div>
<p className="resume-document-fallback">Preview not working? <a href={resume} target="_blank" rel="noopener noreferrer">Open the original PDF</a>.</p></main>}