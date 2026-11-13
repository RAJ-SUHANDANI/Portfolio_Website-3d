import Link from 'next/link';
import {ArrowDown,ArrowRight,ArrowUpRight,Download,ExternalLink,Github,Linkedin,Mail} from 'lucide-react';
import {experience,profile} from '@/lib/data';
import RedesignNavigation from '@/components/redesign/Navigation';
import LivePreview from '@/components/redesign/LivePreview';
import ProjectArchive from '@/components/redesign/ProjectArchive';
import {capture} from '@/lib/projectMedia';
import Signature from '@/components/redesign/Signature';
import SharePortfolio from '@/components/redesign/SharePortfolio';
import PortfolioPreloader from '@/components/redesign/PortfolioPreloader';
import ScrollPhone from '@/components/redesign/ScrollPhone';
import ResumeHoverCard from '@/components/redesign/ResumeHoverCard';
import FocusSocials from '@/components/redesign/FocusSocials';
import ProjectLikeButton from '@/components/redesign/ProjectLikeButton';

const source=[
 {number:'01',name:'Meme Is Mine',slug:'memeismine',type:'Creative tools',tagline:'Memes should be fun to make, too.',description:'I wanted a faster way to turn a familiar reaction into something personal. This is a proper image and video meme studio with a template library, editing tools and a place to keep your work.',live:'https://memeismine.vercel.app/',tone:'meme'},
 {number:'02',name:'ConvoTools',slug:'convotools',type:'Utility workspace',tagline:'A lot of little jobs. One good place to do them.',description:'Most people just need to resize an image, fix a PDF or convert a file. I brought the everyday tools together, with processing that stays in the browser when supported.',live:'https://convotool.vercel.app/',tone:'convo'},
 {number:'03',name:'Veyra',slug:'veyra',type:'Project management',tagline:'Make the work easier to see.',description:'A project workspace for the messy middle of getting things done. Tasks, dashboards, client views and a spatial Pulse experience share the same place.',live:'https://veyra-saas-ai.vercel.app/',tone:'veyra'},
 {number:'04',name:'Savora',slug:'savora',type:'Restaurant bookings',tagline:'A table should never be booked twice.',description:'A restaurant website with a considered guest experience and database rules that protect the reservation system when things get busy.',live:'https://savora-booking-engine.vercel.app/',tone:'savora'}
] as const;

function FeatureLink({slug,live,name}:{slug:string;live:string;name:string}){
 return <div className="art-feature-actions"><ProjectLikeButton slug={slug} name={name}/><Link href={'/work/'+slug} className="art-case-link art-magnetic">Explore the build <ArrowUpRight size={19}/></Link><a href={live} target="_blank" rel="noopener noreferrer" className="art-website-link">Visit website <ExternalLink size={16}/></a></div>;
}
function FeaturedWork(){
 return <div className="art-features">
  {source.slice(0,2).map((project,index)=><article className={'art-feature-large art-feature-'+project.tone} key={project.slug}>
   <div className="art-feature-words"><div className="art-feature-meta"><span>{project.number} of 04</span><span>{project.type}</span></div><div><p className="art-feature-thought">{project.tagline}</p><h3>{project.slug==='memeismine'?<>Meme Is<br/>Mine<span>.</span></>:<>Convo<br/>Tools<span>.</span></>}</h3><p className="art-feature-description">{project.description}</p></div><FeatureLink slug={project.slug} live={project.live} name={project.name}/></div>
   <Link href={'/work/'+project.slug} className="art-feature-shot" aria-label={'Explore the '+project.name+' case study'}>
    <div className="art-feature-browser"><div className="art-feature-chrome"><span><i/><i/><i/></span><small>{new URL(project.live).hostname}</small><ArrowUpRight size={15}/></div><img src={capture(project.slug)} alt={'Real screenshot of the '+project.name+' website'} width={1560} height={980} loading="lazy" decoding="async"/></div>
    <div className="art-feature-mobile"><img src={capture(project.slug,'mobile')} alt={'Mobile capture of the '+project.name+' website'} width={420} height={912} loading="lazy" decoding="async"/></div>
    <span className="art-feature-shot-caption">{index===0?'A look inside the meme studio':'The ConvoTools file desk, as it is today'}</span>
   </Link>
  </article>)}
  <div className="art-feature-duo">
   {source.slice(2).map(project=><article className={'art-feature-small art-feature-'+project.tone} key={project.slug}>
    <Link href={'/work/'+project.slug} className="art-small-photo" aria-label={'View '+project.name+' case study'}>
     <img src={capture(project.slug)} alt={'Screenshot of the deployed '+project.name+' website'} width={1560} height={980} loading="lazy" decoding="async"/>
     <span className="art-small-open">View case study <ArrowUpRight size={18}/></span>
    </Link>
    <div className="art-small-bottom"><div><p className="art-small-number">{project.number} / {project.type}</p><h3>{project.name}</h3><p>{project.tagline}</p></div><div className="art-small-actions"><ProjectLikeButton slug={project.slug} name={project.name}/><Link href={'/work/'+project.slug} aria-label={'Explore '+project.name}><ArrowUpRight size={25}/></Link></div></div>
   </article>)}
  </div>
 </div>;
}

export default function EditorialPortfolio(){
 return <div className="redesign editorial-v2">
  <PortfolioPreloader/>
  <RedesignNavigation/>
  <ScrollPhone/>
  <main id="main">
   <section id="intro" className="art-hero" aria-labelledby="art-hero-title">
    <div className="art-hero-grain" aria-hidden="true"/>
    <div className="art-hero-inner">
     <div className="art-hero-copy">
      <p className="art-hero-hello"><span aria-hidden="true">✳</span> Hi, I'm Raj. I make things for the web.</p>
      <h1 id="art-hero-title">Some ideas<br/>don't leave<br/><em>me alone.</em></h1>
      <p className="art-hero-after">So I build them.</p>
      <p className="art-hero-bio">A meme studio. A file toolbox. A place to plan projects. I'm a developer who cares just as much about how something feels as how it works.</p>
      <div className="art-hero-ctas"><a href="#work" className="art-primary-link art-magnetic">See what I've made <ArrowDown size={18}/></a><a href="#about" className="art-secondary-link art-magnetic">Meet the maker <ArrowUpRight size={18}/></a></div>
     </div>
     <div className="art-hero-stage"><LivePreview/></div>
    </div>
    <div className="art-hero-bottom"><span>RAJ SUHANDANI <span aria-hidden="true">✳</span> BHAVNAGAR, INDIA</span><span>Scroll a little. There is more than one kind of project here.</span><a href="#work">Keep going <ArrowDown size={16}/></a></div>
   </section>

   <section className="art-work" id="work" aria-labelledby="art-work-title">
    <div className="art-section-head">
     <p className="art-eyebrow art-eyebrow-dark">Selected work</p>
     <div className="art-work-intro"><h2 id="art-work-title">The stuff<br/><em>I've made.</em></h2><p>Some things started as small annoyances. Some started as curiosity. What they have in common is that you can actually open them.</p></div>
    </div>
    <FeaturedWork/>
    <ProjectArchive/>
   </section>

   <section id="note" className="art-note" aria-label="A note about the work">
    <div className="art-note-top"><span>A note from the maker</span><span>Made to be used</span></div>
    <p>Sometimes the most interesting part of an idea is the part that makes you ask <em>“could this actually work?”</em></p>
    <div className="art-note-bottom"><span>Then you open the editor.</span><span>And find out.</span></div>
   </section>

   <section className="art-thinking" id="approach" aria-labelledby="art-thinking-title">
    <p className="art-eyebrow art-eyebrow-dark">What I've learned by building</p>
    <div className="art-thinking-intro"><h2 id="art-thinking-title">Pretty isn't<br/><em>the whole point.</em></h2><p>A good-looking screen might get your attention. The decisions underneath are what make a product worth returning to.</p></div>
    <div className="art-thinking-list">
     <article><span className="art-thinking-n">01</span><div><h3>Let people get to the fun part.</h3><p>In Meme Is Mine, trying a caption on the homepage opens the same text in the real editor. The demo and the product belong together.</p><Link href="/work/memeismine">The meme studio <ArrowUpRight size={17}/></Link></div></article>
     <article><span className="art-thinking-n">02</span><div><h3>Make the right thing happen twice.</h3><p>For Savora, a beautiful reservation form is only half the job. PostgreSQL makes sure two people cannot claim the same table at the same time.</p><Link href="/work/savora">Inside the booking system <ArrowUpRight size={17}/></Link></div></article>
     <article><span className="art-thinking-n">03</span><div><h3>Don't make everyone carry every tool.</h3><p>ConvoTools keeps heavier browser engines out of the initial load. You should not need a video processor just to resize a JPG.</p><Link href="/work/convotools">How the file desk works <ArrowUpRight size={17}/></Link></div></article>
    </div>
   </section>

   <section id="about" className="art-about" aria-labelledby="art-about-title">
    <div className="art-about-layout">
     <div className="art-about-photo"><img src="/raj-suhandani-portrait.webp" width={800} height={1000} alt="Portrait of Raj Suhandani" loading="lazy" decoding="async"/><span>Behind the keyboard</span></div>
     <div className="art-about-content">
      <p className="art-eyebrow art-eyebrow-dark">A little about me</p>
      <h2 id="art-about-title">Curious by<br/><em>default.</em></h2>
      <p>I'm Raj, a developer from Bhavnagar, India. I spend a lot of time wondering how the internet could feel a little better, then figuring out what it would take to make that happen.</p>
      <p>Code is my way of building things. Design is how I make them feel like they belong in someone's day. The interesting work happens when both are taken seriously.</p>
      <div className="art-about-links"><FocusSocials/><ResumeHoverCard label="Resume"/></div>
     </div>
    </div>
   </section>

   <section className="art-experience" id="experience" aria-labelledby="art-exp-title">
    <div className="art-experience-top"><p className="art-eyebrow art-eyebrow-dark">Along the way</p><h2 id="art-exp-title">Learning in public.<br/><em>Building for real.</em></h2></div>
    <div className="art-experience-lines">
     {experience.map((item,i)=><article key={item.company}><span className="art-experience-no">0{i+1}</span><div><h3>{item.title}</h3><p>{item.company}</p><p>{item.description}</p></div><span className="art-experience-date">{item.date}</span></article>)}
    </div>
    <div className="art-resume-out"><span>The longer version is in my resume.</span><ResumeHoverCard label="Open my resume"/></div>
   </section>

   <section className="art-contact" id="contact" aria-labelledby="art-contact-title">
    <div className="art-contact-top"><span>One more thing</span><span>There is always room for another good idea.</span></div>
    <h2 id="art-contact-title">Got something<br/><em>worth making?</em></h2>
    <div className="art-contact-rows"><p>Tell me what you're thinking. I read my messages, and I like meeting people who care about what they make.</p><a className="art-contact-email art-magnetic" href={'mailto:'+profile.email}>Let's talk <ArrowUpRight size={30}/></a></div>
   </section>
  </main>
  <footer className="art-footer"><Link href="/" className="art-footer-name" aria-label="Back to top"><Signature/></Link><span>Made with code and unreasonable curiosity.</span><FocusSocials className="art-footer-socials"/><a className="art-footer-top" href="#main">Back to top ↑</a><SharePortfolio/><small>© {new Date().getFullYear()} Raj Suhandani</small></footer>
 </div>;
}
