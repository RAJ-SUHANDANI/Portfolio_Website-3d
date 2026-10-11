import Link from 'next/link';
import {notFound} from 'next/navigation';
import {projects} from '@/lib/data';
import type {Metadata} from 'next';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(project => ({slug: project.slug}));
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const project = projects.find(item => item.slug === slug);
  return {title: project ? project.name + ' | Raj Suhandani' : 'Project', description: project?.summary};
}

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  return <main className="case-page">
    <Link href="/#work">← BACK TO PROJECTS</Link>
    <div className="eyebrow">PROJECT STUDY / {project.category}</div>
    <h1>{project.name}<span style={{color:'#8caf76'}}>.</span></h1>
    <div className="case-meta">{project.stack.map(technology => <span key={technology}>{technology}</span>)}</div>
    <div className="case-panel" style={{background: project.color}}><strong>{project.name.toUpperCase()}</strong></div>
    <section className="case-section">
      <div className="eyebrow">01 / PROJECT OVERVIEW</div>
      <p className="case-text">{project.summary}</p>
    </section>
    <section className="case-section">
      <div className="eyebrow">02 / HOW IT WORKS</div>
      <p className="case-text">{project.approach}</p>
    </section>
    <section className="case-section">
      <div className="eyebrow">03 / HIGHLIGHTS</div>
      <h2 style={{fontSize:'clamp(40px,6vw,82px)',letterSpacing:'-.06em'}}>A CLOSER<br/>LOOK.</h2>
      <div className="case-features">{project.features.map((feature, index) => <div className="case-feature" key={feature}><small>0{index + 1} / FEATURE</small><h3>{feature}</h3></div>)}</div>
    </section>
    <section className="case-section">
      <div className="eyebrow">04 / EXPLORE THE PROJECT</div>
      <p className="case-text">{project.live ? 'Try the application yourself, or browse the implementation on GitHub.' : 'This project does not have a documented public demo. Explore the repository on GitHub.'}</p>
      <div className="case-links">
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={'Visit '+project.name+' live application'}>VISIT PROJECT WEBSITE ↗</a>}
        <a href={project.github} target="_blank" rel="noopener noreferrer">EXPLORE ON GITHUB ↗</a>
      </div>
    </section>
    <Link href="/#work">← VIEW ALL PROJECTS</Link>
  </main>;
}
