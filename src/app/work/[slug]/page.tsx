import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowRight,ArrowUpRight,Github,Code2,MoveUpRight} from 'lucide-react';
import type {CSSProperties} from 'react';
import type {Metadata} from 'next';
import {projects,profile} from '@/lib/data';
import {projectStories} from '@/lib/projectStories';
import ProjectHeroVisual from '@/components/redesign/ProjectHeroVisual';
import ScreenshotGallery from '@/components/redesign/ScreenshotGallery';
import {capture} from '@/lib/projectMedia';
import Signature from '@/components/redesign/Signature';
import ProjectScrollMotion from '@/components/ProjectScrollMotion';
import {ThemeToggle} from '@/components/redesign/Theme';
import ProjectLikeButton from '@/components/redesign/ProjectLikeButton';

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
   <Link href="/" className="pc-logo art-pc-logo" aria-label="Back to Raj's portfolio"><Signature/></Link>
   <span className="pc-header-middle">Selected projects <span>© 2026</span></span>
   <div className="art-case-header-actions"><ThemeToggle/><Link href="/#work" className="pc-back">ALL PROJECTS <ArrowUpRight size={17}/></Link></div>
  </header>

  <section className="pc-hero">
   <div className="pc-grid" aria-hidden="true"/>
   <div className="pc-hero-superline" data-motion="fade"><span>Project <b>{story.number} of {String(projects.length).padStart(2,'0')}</b></span><span>{story.scope}</span></div>
   <div className="pc-title-wrap">
    <p className="pc-kicker" data-motion="eyebrow"><span className="pc-live-dot"/> {story.tagline}</p>
    <h1 data-motion="headline" data-motion-order="1" className={project.name.length>8?"pc-long-title":""}>{project.name}<span className="pc-fullstop">.</span></h1>
    <p className="pc-hero-lead" data-motion="rise" data-motion-order="2">{story.intro}</p><ProjectLikeButton slug={project.slug} name={project.name}/>
   </div>
   <div className="pc-hero-visual" data-motion="visual" data-motion-order="3" data-scroll-parallax="13"><ProjectHeroVisual slug={project.slug} name={project.name} live={project.live}/></div>
   <div className="pc-hero-bottom"><span>An inside look at what I made</span><a href="#overview">Keep reading <span aria-hidden="true">↓</span></a><span>PROJECT {story.number} / {String(projects.length).padStart(2,'0')}</span></div>
  </section>

  <div className="pc-info-bar" data-motion="rise">
   <div><span>Project type</span><strong>{story.scope}</strong></div>
   <div><span>Discipline</span><strong>{story.discipline}</strong></div>
   <div><span>Tools</span><strong>{project.stack.slice(0,3).join('  /  ')}</strong></div>
   <div><span>Status</span><strong>{project.live?'LIVE APPLICATION':'SOURCE AVAILABLE'}</strong></div>
  </div>

  <section className="pc-overview pc-section" id="overview">
   <div className="pc-section-index"><span>The idea</span><span>What is it?</span></div>
   <div className="pc-overview-layout">
    <h2 data-motion="headline">{story.statement}</h2>
    <div className="pc-overview-text" data-motion="rise" data-motion-order="1">
     <span className="pc-mini-label">THE IDEA</span>
     <p>{project.summary}</p>
     <p>{story.intro}</p>
     <a href={project.live||project.github} target="_blank" rel="noopener noreferrer" className="pc-text-link">{project.live?'EXPLORE THE LIVE SITE':'EXPLORE THE SOURCE'} <ArrowUpRight size={19}/></a>
    </div>
   </div>
  </section>

  <section className="pc-problem pc-section">
   <div className="pc-section-index"><span>The story</span><span>How it started</span></div>
   <div className="pc-narrative-grid">
    <article data-motion="rise" data-motion-order="1"><span className="pc-mini-label">THE CHALLENGE / 01</span><h2>The challenge.</h2><p>{story.problem}</p></article>
    <article data-motion="rise" data-motion-order="2"><span className="pc-mini-label">THE APPROACH / 02</span><h2>The approach.</h2><p>{story.solution}</p></article>
   </div>
  </section>

  <section className="pc-workings pc-section">
   <div className="pc-section-index"><span>Inside the product</span><span>The details</span></div>
   <div className="pc-section-heading"><h2 data-motion="headline">Inside the<br/><em>experience.</em></h2><p>A few details worth noticing when you use it.</p></div>
   <div className="pc-workings-list">
    {story.deepDive.map((item,i)=><div className="pc-workings-item" key={item.number} data-motion="row" data-motion-order={i%4+1}>
      <span className="pc-workings-count">{item.number} / FEATURE</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <ArrowUpRight size={25} aria-hidden="true"/>
     </div>)}
   </div>
  </section>

  <section className="pc-media pc-section">
   <div className="pc-section-index"><span>Screenshots</span><span>What the live site looks like</span></div>
   <div className="pc-section-heading"><h2 data-motion="headline">See it<br/><em>for yourself.</em></h2><p>{story.previewNote}</p></div>
   <ScreenshotGallery shots={story.screenshots}/>
  </section>

  <section className="pc-decisions pc-section">
   <div className="pc-section-index"><span>Engineering</span><span>Decisions that mattered</span></div>
   <div className="pc-section-heading"><h2 data-motion="headline">Choices that<br/><em>shaped the build.</em></h2><p>There is always a reason behind how something is built.</p></div>
   <div className="pc-decision-grid">{story.decisions.map((choice,i)=><article key={choice.title} data-motion="tile" data-motion-order={i+1}><span>0{i+1} / DECISION</span><h3>{choice.title}</h3><p>{choice.description}</p><MoveUpRight size={25} aria-hidden="true"/></article>)}</div>
  </section>

  <section className="pc-stack pc-section">
   <div className="pc-section-index"><span>Technology</span><span>What powers it?</span></div>
   <div className="pc-stack-layout">
    <div data-motion="rise"><span className="pc-mini-label">POWERING {project.name.toUpperCase()}</span><h2>What it<br/><em>runs on.</em></h2><p>The libraries and systems that make the experience possible.</p></div>
    <div className="pc-stack-tags">{project.stack.map((technology,i)=><div key={technology} data-motion="row" data-motion-order={i%5+1}><span>{String(i+1).padStart(2,'0')}</span><strong>{technology}</strong><ArrowUpRight size={18}/></div>)}</div>
   </div>
  </section>

  <section className="pc-explore pc-section">
   <div className="pc-section-index"><span>Try it</span><span>See it working</span></div>
   <p className="pc-explore-label" data-motion="eyebrow">The best way to understand it?</p>
   <h2 data-motion="headline">Open the<br/><span>actual website.</span></h2>
   <p className="pc-explore-desc" data-motion="rise" data-motion-order="1">{project.live?'Visit the application to explore the experience, or open GitHub to see how the code is organized.':'There is no documented live deployment for this project. Explore the repository to inspect the current implementation.'}</p>
   <div className="pc-explore-buttons" data-motion="rise" data-motion-order="2">
    <a className="pc-primary-cta art-magnetic" href={project.live||project.github} target="_blank" rel="noopener noreferrer">{project.live?'Visit the website':'EXPLORE SOURCE ON GITHUB'} <ArrowUpRight size={25}/></a>
    {project.slug!=='auditai'&&<a className="pc-secondary-cta" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={21}/> View the code <ArrowUpRight size={20}/></a>}
   </div>
  </section>

  <section className="pc-more pc-section">
   <div className="pc-section-index"><span>Keep exploring</span><span>More projects</span></div>
   <h2 data-motion="headline">Curious what<br/><em>came next?</em></h2>
   <div className="pc-more-grid">
    {more.map((other,i)=><Link href={'/work/'+other.slug} data-motion="tile" data-motion-order={i+1} key={other.slug} style={{'--related-accent':other.color} as CSSProperties}><span className="pc-more-top">A little more to explore <ArrowUpRight size={20}/></span><div className="art-case-next-image"><img src={capture(other.slug)} alt={'Actual browser screenshot of '+other.name} width={1560} height={980} loading="lazy" decoding="async"/></div><strong>{other.name}<span>.</span></strong><p>{other.summary}</p><span className="pc-more-action">Explore the project <ArrowRight size={17}/></span></Link>)}
   </div>
  </section>

  <footer className="pc-footer" data-motion="fade"><div><Link href="/" className="pc-logo art-pc-logo" aria-label="Home"><Signature/></Link><p>Made by someone who likes making things.<br/>RAJ MANISH SUHANDANI © 2026</p></div><div className="pc-footer-links"><Link href="/#work"><ArrowLeft size={17}/> ALL PROJECTS</Link><a href={profile.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a></div><Link href={'/work/'+next.slug} className="pc-next"><span>NEXT PROJECT</span><strong>{next.name}</strong><ArrowUpRight size={26}/></Link></footer>
 </main>;
}
