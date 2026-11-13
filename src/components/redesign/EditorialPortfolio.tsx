import Link from 'next/link';
import {ArrowDown,ArrowRight,ArrowUpRight,Download,Github,Linkedin,Mail} from 'lucide-react';
import {profile,projects,experience} from '@/lib/data';
import RedesignNavigation from '@/components/redesign/Navigation';
import Workstation from '@/components/redesign/Workstation';
import ProjectArchive from '@/components/redesign/ProjectArchive';

const memeEditor='https://raw.githubusercontent.com/RAJ-SUHANDANI/MemeIsMine/main/public/editor-preview.jpg';
const veyraScreen='https://raw.githubusercontent.com/RAJ-SUHANDANI/Veyra/main/screenshots/03-dashboard-overview.png';
const savoraScreen='https://raw.githubusercontent.com/RAJ-SUHANDANI/Savora/main/docs/screenshots/01-home-desktop.jpg';

function LineLabel({index,children}:{index:string;children:React.ReactNode}){
 return <div className="rd-section-line"><span>{index}</span><span>{children}</span></div>;
}
function ProjectAction({slug}:{slug:string}){
 return <Link className="rd-project-action" href={'/work/'+slug} aria-label={'Explore '+(projects.find(project=>project.slug===slug)?.name||'project')+' case study'}><ArrowUpRight size={25}/></Link>;
}
function ConvoArtwork(){
 return <div className="rd-convo-artwork" aria-label="Illustrative ConvoTools interface with a file converting from PDF to DOCX">
  <div className="rd-convo-window">
   <div className="rd-convo-window-top"><span className="rd-convo-mark">C<span>.</span></span><span>THE FILE DESK</span><span>WORKSPACE / 001</span></div>
   <div className="rd-convo-hello"><small>THE DIGITAL FILE DESK</small><strong>Every file has<br/>a next step.</strong></div>
   <div className="rd-convo-documents">
    <div className="rd-convo-file rd-convo-file--from"><span>01 / SOURCE</span><strong>.pdf</strong><small>project-brief.pdf</small></div>
    <div className="rd-convo-convert"><ArrowRight size={27}/><span>CONVERT</span></div>
    <div className="rd-convo-file rd-convo-file--to"><span>02 / OUTPUT</span><strong>.docx</strong><small>project-brief.docx</small></div>
   </div>
   <div className="rd-convo-toolbar"><span>PDF TO WORD</span><span>IMAGE TO WEBP</span><span>MERGE FILES</span><span>+ MORE</span></div>
  </div>
  <span className="rd-art-note">INTERFACE-INSPIRED COMPOSITION / NOT A SCREENSHOT</span>
 </div>;
}
export default function EditorialPortfolio(){
 return <div className="redesign">
  <RedesignNavigation/>
  <main id="main">
   <section className="rd-hero" aria-labelledby="rd-hero-title">
    <div className="rd-hero-grid" aria-hidden="true"/>
    <div className="rd-hero-intro"><span><span className="rd-star">✳</span> PORTFOLIO / EDITION 2026</span><span>BHAVNAGAR, INDIA — BUILDING FROM EVERYWHERE</span></div>
    <div className="rd-hero-head">
     <div className="rd-hero-kicker">HELLO, I'M RAJ — DEVELOPER &amp; CREATIVE TECHNOLOGIST</div>
     <h1 id="rd-hero-title">MAKING<br/><span>THE WEB</span><br/><em>FEEL</em> ALIVE<span className="rd-period">.</span></h1>
     <p>Thoughtful digital products. Uncommon interfaces. Engineering that holds up beyond the first impression.</p>
    </div>
    <div className="rd-hero-workstation"><Workstation/></div>
    <div className="rd-hero-footer">
     <div><span className="rd-star">✳</span> AN INDEPENDENT PRACTICE IN CODE, DESIGN &amp; CURIOSITY</div>
     <a href="#work" className="rd-scroll-link"><span>EXPLORE SELECTED WORK</span><span className="rd-scroll-arrow"><ArrowDown size={24}/></span></a>
     <div className="rd-hero-count">01 / INTRODUCTION</div>
    </div>
   </section>

   <section className="rd-ticker" aria-label="Capabilities"><div>CODE <span>✳</span> DESIGN <span>✳</span> CREATIVE TECHNOLOGY <span>✳</span> REAL PRODUCTS <span>✳</span> CODE <span>✳</span> DESIGN <span>✳</span> CREATIVE TECHNOLOGY <span>✳</span> REAL PRODUCTS <span>✳</span></div></section>

   <section id="work" className="rd-work" aria-labelledby="rd-work-title">
    <LineLabel index="01 / SELECTED PROJECTS">BUILT TO BE USED, NOT JUST SEEN</LineLabel>
    <div className="rd-work-heading"><h2 id="rd-work-title">THE WORK<br/><em>IS THE POINT.</em></h2><p>Products built across creative tools, utility workflows and full-stack systems. A selection of the things I care about getting right.</p></div>

    <article className="rd-feature rd-feature-meme">
     <div className="rd-feature-copy">
      <span className="rd-feature-index">001 / FEATURED PROJECT <span>CREATIVE TOOLS — 2026</span></span>
      <div><span className="rd-feature-kicker">FOR THE CULTURE, AND THE GROUP CHAT.</span><h3>MEME<br/>IS MINE<span>.</span></h3><p>A free browser-based studio to find the format, make the joke and share it. Real image and video editing, without the complicated creative workflow.</p></div>
      <div className="rd-feature-foot"><div><span>IMAGE + VIDEO EDITORS</span><span>NEXT.JS / APPWRITE</span></div><ProjectAction slug="memeismine"/></div>
     </div>
     <Link href="/work/memeismine" className="rd-feature-visual rd-meme-visual" aria-label="View Meme Is Mine case study">
      <div className="rd-meme-edition"><span>THE INTERNET IS YOUR CANVAS</span><span>MAKE SOME NOISE / 001</span></div>
      <div className="rd-meme-image-frame"><img src={memeEditor} alt="Actual Meme Is Mine editing workspace screenshot" loading="lazy" decoding="async"/></div>
      <span className="rd-meme-caption">THE WORKSHOP / ACTUAL PRODUCT INTERFACE</span>
     </Link>
    </article>

    <article className="rd-feature rd-feature-convo">
     <div className="rd-feature-copy">
      <span className="rd-feature-index">002 / FEATURED PROJECT <span>PRODUCTIVITY — 2026</span></span>
      <div><span className="rd-feature-kicker">A BETTER WAY TO GET THE LITTLE THINGS DONE.</span><h3>CONVO<br/>TOOLS<span>.</span></h3><p>A browser-first workspace for everyday file tasks — from PDFs and images to documents, spreadsheets and developer utilities.</p></div>
      <div className="rd-feature-foot"><div><span>42 TOOL ENTRIES / 10 CATEGORIES</span><span>PROCESSING IN THE BROWSER</span></div><ProjectAction slug="convotools"/></div>
     </div>
     <Link href="/work/convotools" className="rd-feature-visual" aria-label="View ConvoTools case study"><ConvoArtwork/></Link>
    </article>

    <div className="rd-project-duo">
     <article className="rd-project-card rd-project-veyra">
      <Link href="/work/veyra" className="rd-duo-image" aria-label="Explore Veyra case study"><img src={veyraScreen} alt="Veyra project workspace dashboard from the project repository" loading="lazy" decoding="async"/><span className="rd-view-project">VIEW PROJECT <ArrowUpRight size={20}/></span></Link>
      <div className="rd-duo-meta"><span>003 / PRODUCTIVITY × 3D</span><span>2026</span></div><div className="rd-duo-title"><div><h3>Veyra<span>.</span></h3><p>Project planning with a spatial pulse.</p></div><ProjectAction slug="veyra"/></div>
     </article>
     <article className="rd-project-card rd-project-savora">
      <Link href="/work/savora" className="rd-duo-image" aria-label="Explore Savora case study"><img src={savoraScreen} alt="Savora restaurant booking website screenshot from the project repository" loading="lazy" decoding="async"/><span className="rd-view-project">VIEW PROJECT <ArrowUpRight size={20}/></span></Link>
      <div className="rd-duo-meta"><span>004 / FULL-STACK SYSTEMS</span><span>2026</span></div><div className="rd-duo-title"><div><h3>Savora<span>.</span></h3><p>Reservations built on reliable data.</p></div><ProjectAction slug="savora"/></div>
     </article>
    </div>
    <ProjectArchive/>
   </section>

   <section className="rd-manifesto" aria-label="Design philosophy">
    <div className="rd-manifesto-head"><span>AN OBSERVATION / 002</span><span>THE DETAILS MAKE THE DIFFERENCE</span></div>
    <div className="rd-manifesto-text">GOOD DESIGN<br/>GETS NOTICED.<br/><em>GOOD ENGINEERING</em><br/>GETS USED.</div>
    <div className="rd-manifesto-bottom"><span>FORM MEETS FUNCTION.</span><span>EVERY TIME. ↗</span></div>
   </section>

   <section id="approach" className="rd-approach">
    <LineLabel index="02 / THE PRACTICE">HOW I THINK ABOUT BUILDING</LineLabel>
    <div className="rd-approach-intro"><h2>MADE WITH<br/><em>INTENTION.</em></h2><p>The best work is rarely about a clever trick. It's a series of good decisions, made carefully, from the first sketch to the last edge case.</p></div>
    <div className="rd-approach-list">
     <div><span>01</span><h3>Understand the real problem.</h3><p>Start with the person using the product, not a list of trendy components.</p><ArrowUpRight size={23}/></div>
     <div><span>02</span><h3>Make every detail earn its place.</h3><p>Typography, interaction, information and motion should all communicate something.</p><ArrowUpRight size={23}/></div>
     <div><span>03</span><h3>Build beyond the happy path.</h3><p>Good interfaces need dependable systems, accessible flows and honest edge-case handling.</p><ArrowUpRight size={23}/></div>
    </div>
   </section>

   <section id="about" className="rd-about">
    <LineLabel index="03 / BEHIND THE WORK">A LITTLE HUMAN CONTEXT</LineLabel>
    <div className="rd-about-layout">
     <div className="rd-about-photo"><img src="/raj-suhandani-portrait.webp" alt="Portrait of Raj Manish Suhandani" loading="lazy" decoding="async" width="800" height="1000"/><span>RAJ / BHAVNAGAR, GUJARAT</span></div>
     <div className="rd-about-copy"><span className="rd-micro">HELLO AGAIN / I'M RAJ.</span><h2>PART ENGINEER.<br/>PART <em>MAKER.</em><br/>ALL CURIOUS.</h2><p>I'm Raj Manish Suhandani, a developer interested in the point where reliable software and thoughtful visual experiences meet.</p><p>My practice spans full-stack development, interaction design and creative technology. I like taking ambitious ideas seriously — understanding the details, refining the edges and making things that feel natural to use.</p><div className="rd-about-availability"><span className="rd-status-light"/> BASED IN BHAVNAGAR, INDIA <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">FIND ME ON LINKEDIN <ArrowUpRight size={16}/></a></div></div>
    </div>
   </section>

   <section id="experience" className="rd-experience">
    <LineLabel index="04 / EXPERIENCE & EDUCATION">THE PATH SO FAR</LineLabel>
    <div className="rd-experience-top"><h2>ALWAYS<br/><em>LEARNING.</em></h2><p>Professional experience, academic foundations and a steady habit of turning ideas into working products.</p></div>
    <div className="rd-career">
     {experience.map((item,index)=><div className="rd-career-row" key={item.company}><span className="rd-career-date">{item.date}</span><div><span className="rd-career-company">{item.company}</span><h3>{item.title}</h3><p>{item.description}</p></div><span className="rd-career-index">0{index+1}</span></div>)}
     <div className="rd-career-row"><span className="rd-career-date">2023 — 2027</span><div><span className="rd-career-company">GOVERNMENT ENGINEERING COLLEGE, BHAVNAGAR</span><h3>BE, Information &amp; Communication Technology</h3><p>Gujarat Technological University · CGPA 8.04/10. Exploring the foundations of software engineering, data structures and digital systems.</p></div><span className="rd-career-index">03</span></div>
    </div>
    <Link href="/resume" className="rd-resume-link"><span>THE EXPERIENCE, IN ONE PLACE.</span><strong>VIEW MY RESUME</strong><Download size={24}/></Link>
   </section>

   <section id="contact" className="rd-contact">
    <LineLabel index="05 / START A CONVERSATION">THE NEXT CHAPTER IS OPEN</LineLabel>
    <span className="rd-contact-pre">HAVE AN IDEA, A PROBLEM OR SOMETHING AMBITIOUS?</span>
    <h2>LET'S MAKE<br/><em>SOMETHING</em><br/>MATTER<span>.</span></h2>
    <div className="rd-contact-bottom"><p>Good conversations make good things happen. Reach out about a project, an opportunity or something worth exploring.</p><a href={'mailto:'+profile.email} className="rd-contact-button">GET IN TOUCH <ArrowUpRight size={25}/></a></div>
   </section>
  </main>
  <footer className="rd-footer"><div className="rd-footer-main"><a href="#main" className="rd-footer-brand">R<span>.</span>S✳</a><span>CRAFTED WITH INTENTION, IN INDIA.</span><a href="#main">BACK TO TOP ↑</a></div><div className="rd-footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16}/> GITHUB</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16}/> LINKEDIN</a><a href={'mailto:'+profile.email}><Mail size={16}/> EMAIL</a><Link href="/resume">RESUME <ArrowUpRight size={16}/></Link><span>© 2026 RAJ SUHANDANI</span></div></footer>
 </div>;
}
