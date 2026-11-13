import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Github, ArrowRight } from 'lucide-react';
import { awardProjects, getAwardProject } from '@/lib/awardContent';

export const dynamicParams = false;
export function generateStaticParams() { return awardProjects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getAwardProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name + ' — Raj Suhandani',
    description: project.description,
    openGraph: {
      title: project.name + ' | Raj Suhandani',
      description: project.description,
      type: 'article',
      ...(project.image ? { images: [{ url: project.image, alt: project.imageAlt || project.name }] } : {})
    }
  };
}

const localImage: Record<string, string> = {
  'beyond-gravity': '/studio/beyond-gravity.png',
  memeismine: '/studio/meme-is-mine.jpg',
  convotools: '/studio/convotools-logo.svg',
  savora: '/studio/savora.jpg',
  veyra: '/studio/veyra.png'
};

export default async function ProjectCase({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getAwardProject(slug);
  if (!project) notFound();
  const i = awardProjects.findIndex(item => item.slug === project.slug);
  const next = awardProjects[(i + 1) % awardProjects.length];
  const visual = localImage[project.slug] || project.image;

  return <main className="studio-case">
    <header className="studio-case-nav">
      <Link href="/" aria-label="Return to Raj Suhandani homepage"><img src="/brand-signature.svg" alt="Raj Suhandani" width={195} height={72} /></Link>
      <div><span>CASE FILE / {project.number}</span><Link href="/#work"><ArrowLeft size={18} /> BACK TO THE WORK</Link></div>
    </header>

    <section className="studio-case-opening" aria-labelledby="studio-case-title">
      <div className="studio-case-meta"><span>NO. {project.number} / FROM THE ARCHIVE</span><span>{project.category.toUpperCase()}</span><span>MADE IN {project.year}</span></div>
      <div className="studio-case-title-row"><h1 id="studio-case-title">{project.name}<span>.</span></h1><p>{project.lead}</p></div>
      <div className="studio-case-introfoot"><span>ACTUAL WORK, NOT A DESIGN CONCEPT.</span><span>SCROLL TO GET UNDER THE SURFACE ↓</span></div>
    </section>

    <section className={'studio-case-media ' + (project.slug === 'convotools' ? 'studio-case-media-logo' : '')}>
      {visual ? <img src={visual} alt={project.slug === 'convotools' ? 'Official ConvoTools product logo' : project.imageAlt || project.name + ' project interface'} /> : <div className="studio-case-type-specimen"><span>FIELD NOTE / {project.number}</span><strong>{project.name}</strong><p>{project.proof}</p></div>}
      <span className="studio-case-media-label">{project.slug === 'convotools' ? 'OFFICIAL PRODUCT MARK' : visual ? 'ACTUAL REPOSITORY SCREENSHOT' : 'TYPE COMPOSITION — NOT A SCREENSHOT'}</span>
    </section>

    <section className="studio-case-content">
      <div className="studio-case-facts"><div><span>01 / PRACTICE</span><strong>{project.category}</strong></div><div><span>02 / MADE WITH</span><strong>{project.stack.slice(0, 3).join(' · ')}</strong></div><div><span>03 / NOTES</span><strong>{project.proof}</strong></div></div>
      <div className="studio-case-story">
        <div className="studio-case-story-rail">THE REASON IT EXISTS <span>↳ 001</span></div>
        <div className="studio-case-story-body"><h2>AN IDEA<br />WORTH <em>MAKING.</em></h2><p>{project.description}</p><p>These notes describe the product and the decisions visible in its documented implementation. They aren&apos;t invented user outcomes or performance statistics.</p></div>
      </div>

      <div className="studio-case-problem">
        <div className="studio-case-section-label"><span>THE PROBLEM, THEN THE RESPONSE</span><span>001—002</span></div>
        <div className="studio-case-problem-grid">
          <div><span className="studio-case-small">[ 01 ] WHY THIS WAS NECESSARY</span><h3>The friction.</h3><p>{project.challenge}</p></div>
          <div><span className="studio-case-small">[ 02 ] WHAT I MADE</span><h3>The response.</h3><p>{project.solution}</p></div>
        </div>
      </div>

      <div className="studio-case-decisions">
        <div className="studio-case-section-label"><span>NOT EVERYTHING IS A DESIGN DECISION. THESE WERE.</span><span>003</span></div>
        <div className="studio-case-decisions-layout"><h2>UNDER<br />THE <em>HOOD.</em></h2><div>{project.decisions.map((decision, j) =>
          <article key={decision.title}><span>0{j + 1}</span><div><h3>{decision.title}</h3><p>{decision.body}</p></div></article>)}</div></div>
      </div>

      <div className="studio-case-details">
        <div className="studio-case-section-label"><span>THE MATERIALS</span><span>004</span></div>
        <div className="studio-case-details-layout"><h2>BUILT<br />WITH.</h2><div className="studio-case-stack">{project.stack.map((tool, j) => <div key={tool}><span>{String(j + 1).padStart(2,'0')}</span><strong>{tool}</strong></div>)}</div></div>
        <div className="studio-case-links">
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">OPEN LIVE PROJECT <ArrowUpRight size={21} /></a>}
          <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={20} /> VIEW SOURCE CODE <ArrowUpRight size={21} /></a>
        </div>
      </div>
    </section>

    <section className="studio-case-next"><p>ONE MORE FROM THE COLLECTION</p><Link href={'/work/' + next.slug}><span>{next.name}</span><ArrowRight size={37} /></Link></section>
    <footer className="studio-case-footer"><Link href="/" aria-label="Return to portfolio"><img src="/brand-signature.svg" alt="Raj Suhandani" width={168} height={64} /></Link><span>BE CURIOUS. MAKE SOMETHING.</span><Link href="/#work">ALL PROJECTS ↑</Link></footer>
  </main>;
}