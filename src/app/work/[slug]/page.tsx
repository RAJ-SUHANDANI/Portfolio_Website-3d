import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { awardProjects, getAwardProject } from '@/lib/awardContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return awardProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getAwardProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name + ' — Project Study | Raj Suhandani',
    description: project.description,
    openGraph: {
      title: project.name + ' | Raj Suhandani',
      description: project.description,
      type: 'article',
      ...(project.image ? { images: [{ url: project.image, alt: project.imageAlt || project.name }] } : {})
    }
  };
}

function Signature() {
  return <img src="/brand-signature.svg" alt="Raj Suhandani" className="award-signature award-signature-light" width={190} height={70} />;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getAwardProject(slug);
  if (!project) notFound();
  const currentIndex = awardProjects.findIndex((item) => item.slug === project.slug);
  const next = awardProjects[(currentIndex + 1) % awardProjects.length];

  return (
    <main className="award-case" style={{ '--case-accent': project.accent } as CSSProperties}>
      <header className="award-case-nav">
        <Link href="/" aria-label="Back to Raj Suhandani portfolio"><Signature /></Link>
        <div className="award-case-nav-right"><span>THE WORK / {project.number}</span><Link href="/#work"><ArrowLeft size={18} /> ALL PROJECTS</Link></div>
      </header>

      <section className="award-case-hero">
        <div className="award-case-hero-kicker"><span>PROJECT {project.number} / THE PROOF LAB</span><span>{project.category.toUpperCase()}</span></div>
        <h1>{project.name}<span>.</span></h1>
        <div className="award-case-hero-lead"><p>{project.lead}</p><span>SELECTED PROJECT / {project.year}<br />SCROLL TO INVESTIGATE ↓</span></div>
      </section>

      <section className={'award-case-visual award-surface-' + project.surface} aria-label={project.name + ' project preview'}>
        {project.image ? <div className="award-case-screen"><span>● &nbsp; ● &nbsp; ● &nbsp; / {project.name.toUpperCase()}</span><img src={project.image} alt={project.imageAlt || project.name + ' interface screenshot'} /></div> :
          <div className="award-case-diagram"><span>THE PRODUCT / A CONCEPTUAL ILLUSTRATION</span><strong>{project.name}</strong><div><span>DISCOVER</span><span>PREPARE</span><span>EXPORT</span></div></div>}
        <span className="award-case-visual-note">{project.image ? 'IMAGE / ORIGINAL PROJECT REPOSITORY' : 'ILLUSTRATIVE DIAGRAM / NOT A SCREENSHOT'}</span>
      </section>

      <div className="award-case-body">
        <div className="award-case-metadata">
          <div><small>01 / CATEGORY</small><strong>{project.category}</strong></div>
          <div><small>02 / RELEASE</small><strong>{project.year}</strong></div>
          <div><small>03 / FOCUS</small><strong>{project.proof}</strong></div>
        </div>

        <section className="award-case-intro">
          <h2>THE IDEA<br /><em>BEHIND IT.</em></h2>
          <div><p>{project.description}</p><p>These notes describe the product&apos;s documented approach and implementation decisions, not invented customer outcomes or performance metrics.</p></div>
        </section>

        <section className="award-case-section" aria-labelledby="case-problem">
          <div className="award-case-section-head"><span>01 / START WITH THE QUESTION</span><span>PROBLEM → APPROACH</span></div>
          <h2 id="case-problem">WHY BUILD<br /><em>THIS?</em></h2>
          <div className="award-case-paired">
            <article><span>THE CHALLENGE</span><p>{project.challenge}</p></article>
            <article><span>THE RESPONSE</span><p>{project.solution}</p></article>
          </div>
        </section>

        <section className="award-case-section" aria-labelledby="case-decisions">
          <div className="award-case-section-head"><span>02 / ENGINEERING AS DESIGN</span><span>DECISIONS THAT COUNT</span></div>
          <h2 id="case-decisions">UNDER THE<br /><em>SURFACE.</em></h2>
          <div className="award-case-decisions">
            {project.decisions.map((decision, index) => (
              <article key={decision.title}><small>0{index + 1}</small><h3>{decision.title}</h3><p>{decision.body}</p></article>
            ))}
          </div>
        </section>

        <section className="award-case-section" aria-labelledby="case-stack">
          <div className="award-case-section-head"><span>03 / THE BUILD</span><span>TECHNOLOGY IN CONTEXT</span></div>
          <h2 id="case-stack">TOOLS FOR<br /><em>THE JOB.</em></h2>
          <div className="award-case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="award-case-actions">
            {project.live && <a className="award-case-btn" href={project.live} target="_blank" rel="noopener noreferrer">VISIT THE LIVE APPLICATION <ArrowUpRight size={20} /></a>}
            <a className="award-case-btn award-case-btn-ghost" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={19} /> READ THE SOURCE <ArrowUpRight size={20} /></a>
          </div>
        </section>
      </div>

      <section className="award-case-next"><div><span>KEEP EXPLORING / NEXT EXPERIMENT</span><h2>{next.name}<span>.</span></h2></div><Link href={'/work/' + next.slug}>NEXT PROJECT <ArrowUpRight size={21} /></Link></section>
      <footer className="award-case-foot"><Link href="/" aria-label="Return to homepage"><Signature /></Link><Link href="/#work">BACK TO SELECTED WORK ↑</Link></footer>
    </main>
  );
}