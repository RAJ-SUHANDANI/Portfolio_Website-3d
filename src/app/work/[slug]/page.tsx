import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowRight,ArrowUpRight,Github,Code2,MoveUpRight} from 'lucide-react';
import type {CSSProperties} from 'react';
import type {Metadata} from 'next';
import {projects,profile} from '@/lib/data';
import {projectStories} from '@/lib/projectStories';
import ProjectDevice from '@/components/ProjectDevice';
import ProjectScrollMotion from '@/components/ProjectScrollMotion';

export const dynamicParams=false;

export function generateStaticParams(){
 return projects.map(project=>({slug:project.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const project=projects.find(item=>item.slug===slug);
 return {title:project?project.name+' | Selected Work | Raj Suhandani':'Project',description:project?.summary};
}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=projects.find(item=>item.slug===slug);
 const story=projectStories[slug];
 if(!project||!story)notFound();
 const index=projects.findIndex(item=>item.slug===slug);
 const next=projects[(index+1)%projects.length];
 const more=[1,2].map(offset=>projects[(index+offset)%projects.length]);

 return <main className="project-case" style={{'--case-accent':project.color} as CSSProperties}>
  <ProjectScrollMotion/>
  <header className="pc-header">
   <Link href="/" className="pc-logo" aria-label="Back to Raj's portfolio">R<span>.</span>S✳</Link>
   <span className="pc-header-middle">THE WORK / CASE STUDIES <span>© 2026</span></span>
   <Link href="/#work" className="pc-back">ALL PROJECTS <ArrowUpRight size={17}/></Link>
  </header>

  <section className="pc-hero">
   <div className="pc-grid" aria-hidden="true"/>
   <div className="pc-hero-superline"><span>SELECTED WORK <b> / {story.number} OF 07</b></span><span>{story.scope}</span></div>
   <div className="pc-title-wrap">
    <p className="pc-kicker"><span className="pc-live-dot"/> {story.tagline}</p>
    <h1 className={project.name.length>8?"pc-long-title":""}>{project.name}<span className="pc-fullstop">.</span></h1>
    <p className="pc-hero-lead">{story.intro}</p>
   </div>
   <div className="pc-hero-visual"><ProjectDevice project={project} story={story}/></div>
   <div className="pc-hero-bottom"><span>ENGINEERING / DESIGN / EXPLORATION</span><a href="#overview">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span>PROJECT {story.number} / 07</span></div>
  </section>

  <div className="pc-info-bar">
   <div><span>01 / PROJECT TYPE</span><strong>{story.scope}</strong></div>
   <div><span>02 / DISCIPLINE</span><strong>{story.discipline}</strong></div>
   <div><span>03 / TECHNOLOGY</span><strong>{project.stack.slice(0,3).join('  /  ')}</strong></div>
   <div><span>04 / STATUS</span><strong>{project.live?'LIVE APPLICATION':'SOURCE AVAILABLE'}</strong></div>
  </div>

  <section className="pc-overview pc-section" id="overview">
   <div className="pc-section-index"><span>01 / AT A GLANCE</span><span>PROJECT OVERVIEW ↗</span></div>
   <div className="pc-overview-layout">
    <h2>{story.statement}</h2>
    <div className="pc-overview-text">
     <span className="pc-mini-label">THE IDEA</span>
     <p>{project.summary}</p>
     <p>{story.intro}</p>
     <a href={project.live||project.github} target="_blank" rel="noopener noreferrer" className="pc-text-link">{project.live?'EXPLORE THE LIVE SITE':'EXPLORE THE SOURCE'} <ArrowUpRight size={19}/></a>
    </div>
   </div>
  </section>

  <section className="pc-problem pc-section">
   <div className="pc-section-index"><span>02 / BEHIND THE PRODUCT</span><span>THE THINKING ↗</span></div>
   <div className="pc-narrative-grid">
    <article><span className="pc-mini-label">THE CHALLENGE / 01</span><h2>THE PROBLEM.</h2><p>{story.problem}</p></article>
    <article><span className="pc-mini-label">THE APPROACH / 02</span><h2>THE SOLUTION.</h2><p>{story.solution}</p></article>
   </div>
  </section>

  <section className="pc-workings pc-section">
   <div className="pc-section-index"><span>03 / THE EXPERIENCE</span><span>FUNCTION MEETS FORM ↗</span></div>
   <div className="pc-section-heading"><h2>WHAT MAKES<br/>IT <em>WORK.</em></h2><p>Four details that shape the experience, from its foundation to the way people use it.</p></div>
   <div className="pc-workings-list">
    {story.deepDive.map(item=><div className="pc-workings-item" key={item.number}>
      <span className="pc-workings-count">{item.number} / FEATURE</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <ArrowUpRight size={25} aria-hidden="true"/>
     </div>)}
   </div>
  </section>

  <section className="pc-media pc-section">
   <div className="pc-section-index"><span>04 / LOOK INSIDE</span><span>PRODUCT VISUALS ↗</span></div>
   <div className="pc-section-heading"><h2>A CLOSER<br/><em>LOOK.</em></h2><p>{story.previewNote}</p></div>
   {story.screenshots.length?
    <div className="pc-gallery">
      {story.screenshots.map((shot,i)=><figure className="pc-gallery-item" key={shot.src}>
       <div className="pc-gallery-image"><img src={shot.src} alt={shot.alt} loading="lazy" decoding="async"/></div>
       <figcaption><span>0{i+1} / {shot.label.toUpperCase()}</span><span>PROJECT VISUAL ↗</span></figcaption>
      </figure>)}
    </div>:
    <div className="pc-no-gallery"><div className="pc-no-gallery-shape" aria-hidden="true"><Code2 size={72}/><div className="pc-shape-line"/><div className="pc-shape-line short"/><div className="pc-shape-tiles"><span/><span/><span/></div></div>
     <div><span className="pc-mini-label">AN INVITATION TO EXPLORE</span><h3>SEE THE REAL<br/>PRODUCT.</h3><p>No verified repository screenshots are included for this project. The laptop above presents an illustrative UI inspired by its documented features. {project.live?'Visit the live application to see the actual design.':'The GitHub repository is the best place to inspect the current work.'}</p><a href={project.live||project.github} target="_blank" rel="noopener noreferrer">{project.live?'OPEN THE LIVE PROJECT':'VIEW SOURCE CODE'} <ArrowUpRight size={18}/></a></div>
    </div>}
  </section>

  <section className="pc-decisions pc-section">
   <div className="pc-section-index"><span>05 / UNDER THE HOOD</span><span>THE BUILD ↗</span></div>
   <div className="pc-section-heading"><h2>GOOD DESIGN.<br/><em>REAL DECISIONS.</em></h2><p>Every product comes with tradeoffs. These are three implementation choices that shaped the result.</p></div>
   <div className="pc-decision-grid">{story.decisions.map((choice,i)=><article key={choice.title}><span>0{i+1} / DECISION</span><h3>{choice.title}</h3><p>{choice.description}</p><MoveUpRight size={25} aria-hidden="true"/></article>)}</div>
  </section>

  <section className="pc-stack pc-section">
   <div className="pc-section-index"><span>06 / THE BUILDING BLOCKS</span><span>TOOLS & TECHNOLOGY ↗</span></div>
   <div className="pc-stack-layout">
    <div><span className="pc-mini-label">POWERING {project.name.toUpperCase()}</span><h2>THE<br/><em>STACK.</em></h2><p>Technology chosen to support the product experience, not just to fill a list.</p></div>
    <div className="pc-stack-tags">{project.stack.map((technology,i)=><div key={technology}><span>{String(i+1).padStart(2,'0')}</span><strong>{technology}</strong><ArrowUpRight size={18}/></div>)}</div>
   </div>
  </section>

  <section className="pc-explore pc-section">
   <div className="pc-section-index"><span>07 / TAKE A LOOK</span><span>YOUR TURN ↗</span></div>
   <p className="pc-explore-label">ENOUGH TALKING ABOUT IT.</p>
   <h2>GO SEE THE<br/><span>REAL THING.</span></h2>
   <p className="pc-explore-desc">{project.live?'Visit the application to explore the experience, or open GitHub to see how the code is organized.':'There is no documented live deployment for this project. Explore the repository to inspect the current implementation.'}</p>
   <div className="pc-explore-buttons">
    <a className="pc-primary-cta" href={project.live||project.github} target="_blank" rel="noopener noreferrer">{project.live?'VISIT THE PROJECT WEBSITE':'EXPLORE SOURCE ON GITHUB'} <ArrowUpRight size={25}/></a>
    <a className="pc-secondary-cta" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={21}/> GITHUB REPOSITORY <ArrowUpRight size={20}/></a>
   </div>
  </section>

  <section className="pc-more pc-section">
   <div className="pc-section-index"><span>08 / KEEP EXPLORING</span><span>MORE WORK ↗</span></div>
   <h2>ONE PROJECT<br/><em>IS NEVER ENOUGH.</em></h2>
   <div className="pc-more-grid">
    {more.map((other,i)=><Link href={'/work/'+other.slug} key={other.slug} style={{'--related-accent':other.color} as CSSProperties}><span className="pc-more-top">0{i+1} / {other.category}<ArrowUpRight size={20}/></span><strong>{other.name}<span>.</span></strong><p>{other.summary}</p><span className="pc-more-action">VIEW CASE STUDY <ArrowRight size={17}/></span></Link>)}
   </div>
  </section>

  <footer className="pc-footer"><div><Link href="/" className="pc-logo">R<span>.</span>S✳</Link><p>DESIGNED AND BUILT WITH INTENTION.<br/>RAJ MANISH SUHANDANI © 2026</p></div><div className="pc-footer-links"><Link href="/#work"><ArrowLeft size={17}/> ALL PROJECTS</Link><a href={profile.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a></div><Link href={'/work/'+next.slug} className="pc-next"><span>NEXT PROJECT</span><strong>{next.name}</strong><ArrowUpRight size={26}/></Link></footer>
 </main>;
}
