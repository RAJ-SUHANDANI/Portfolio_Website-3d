'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, Mail, Menu, X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { awardProjects, featuredProjects } from '@/lib/awardContent';
import type { AwardProject } from '@/lib/awardContent';
import StudioField from './StudioField';

const StudioCarousel3D = dynamic(() => import('./StudioCarousel3D'), { ssr: false, loading: () => null });

const projects = featuredProjects;
const shots: Record<string, string> = {
  'beyond-gravity': '/studio/beyond-gravity.png',
  memeismine: '/studio/meme-is-mine.jpg',
  convotools: '/studio/convotools-logo.svg',
  savora: '/studio/savora.jpg',
  veyra: '/studio/veyra.png'
};

function Signature({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return <img width={250} height={90} src="/brand-signature.svg" alt="Raj Suhandani" className={'studio-signature ' + (light ? 'studio-signature-light ' : '') + className} />;
}

function ProjectPoster({ project, className = '' }: { project: AwardProject; className?: string }) {
  return <div className={'studio-poster ' + (project.slug === 'convotools' ? 'studio-poster-convo ' : '') + className}>
    <div className="studio-poster-caption"><span>{project.name.toUpperCase()} / {project.year}</span><span>ORIGINAL PROJECT MATERIAL</span></div>
    <img src={shots[project.slug]} alt={project.slug === 'convotools' ? 'ConvoTools official logo' : project.imageAlt || project.name + ' screenshot'} loading="lazy" />
    <div className="studio-poster-bottom"><span>{project.proof}</span><ArrowUpRight size={20} /></div>
  </div>;
}

function SiteIndex({ close }: { close: () => void }) {
  const items = [
    ['00', 'Home', '#top'],
    ['01', 'The interactive archive', '#archive'],
    ['02', 'Selected projects', '#work'],
    ['03', 'A little experiment', '#play'],
    ['04', 'About Raj', '#about'],
    ['05', 'Get in touch', '#contact']
  ];
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const links = Array.from(document.querySelectorAll<HTMLElement>('.studio-index-overlay a, .studio-index-overlay button'));
        if (!links.length) return;
        const first = links[0], last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [close]);

  return <div className="studio-index-overlay" role="dialog" aria-modal="true" aria-label="Portfolio navigation">
    <div className="studio-index-top"><Signature light /><button ref={closeRef} type="button" onClick={close} aria-label="Close navigation">CLOSE INDEX <X size={24} /></button></div>
    <nav aria-label="Full navigation">{items.map(([num, title, href]) => <a key={href} href={href} onClick={close}><span>{num}</span><strong>{title}</strong><ArrowUpRight size={25} /></a>)}</nav>
    <div className="studio-index-foot"><span>BE CURIOUS. MAKE SOMETHING.</span><span>RAJ SUHANDANI / 2026</span></div>
  </div>;
}

export default function StudioPortfolio() {
  const [active, setActive] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [focusProject, setFocusProject] = useState(0);
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const stageProject = projects[active];
  const focus = projects[focusProject];

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 760px)');
    const check = () => setWide(mq.matches);
    check();
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

  useEffect(() => {
    if (!stageRef.current || !wide || reduced) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShowScene(true); observer.disconnect(); }
    }, { rootMargin: '350px' });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [wide, reduced]);

  const changeSlide = (by: number) => setActive(i => (i + by + projects.length) % projects.length);
  const slideTo = (i: number) => { setActive(i); setFocusProject(i); };
  const closeIndex = () => setIndexOpen(false);

  return <div className="studio-site" id="top">
    <a className="studio-skip" href="#work">Skip to projects</a>
    <header className="studio-nav">
      <Link href="/" className="studio-brand" aria-label="Raj Suhandani home"><Signature /></Link>
      <nav className="studio-nav-links" aria-label="Main navigation">
        <a href="#work">WORK <span>05</span></a>
        <a href="#play">PLAY</a>
        <a href="#about">ABOUT</a>
      </nav>
      <div className="studio-nav-right"><a href="mailto:rajsuhandani11@gmail.com" className="studio-nav-contact">LET&apos;S TALK <ArrowUpRight size={16} /></a><button type="button" onClick={() => setIndexOpen(true)} aria-label="Open navigation index">INDEX <Menu size={19} /></button></div>
    </header>

    <main>
      <section className="studio-intro" aria-labelledby="studio-intro-title">
        <div className="studio-intro-top"><span>INDEPENDENT DEVELOPER / DESIGN-MINDED ENGINEER</span><span>BHAVNAGAR, INDIA · 2026</span></div>
        <div className="studio-intro-main">
          <h1 id="studio-intro-title"><span>SOME PEOPLE</span><span>COLLECT IDEAS<span className="studio-stop">.</span></span><span className="studio-intro-twist">I BUILD MINE.</span></h1>
          <div className="studio-intro-aside">
            <div className="studio-portrait-fragment"><img src="/raj-suhandani-portrait.webp" width={500} height={620} alt="Raj Suhandani" /><span>THE PERSON BEHIND THE PIXELS / 2026</span></div>
            <div className="studio-intro-note"><i aria-hidden="true">↳</i><p>I&apos;m Raj. I write code, design interfaces, and get a little too invested in making the small details feel right.</p></div>
          </div>
        </div>
        <div className="studio-intro-bottom"><div><span className="studio-intro-rule" /> A DIGITAL SPACE FOR THE THINGS I&apos;VE MADE, AND THE THINGS I&apos;M STILL FIGURING OUT.</div><a href="#archive">COME EXPLORE <ArrowDown size={18} /></a></div>
      </section>

      <section className="studio-archive" id="archive" aria-labelledby="studio-archive-title">
        <div className="studio-archive-head"><span><i className="studio-record" /> INTERACTIVE WORK ARCHIVE</span><span>FIVE OBJECTS. FIVE DIFFERENT OBSESSIONS.</span><span>VOL. 01 / 2026</span></div>
        <div className="studio-archive-body">
          <div className="studio-archive-info">
            <div className="studio-archive-info-top"><span>ON THE TABLE / <b>{String(active + 1).padStart(2, '0')}</b> OF 05</span><span className="studio-archive-pips">{projects.map((project, i) => <button key={project.slug} type="button" aria-label={'Select ' + project.name} aria-pressed={i === active} onClick={() => slideTo(i)} className={i === active ? 'current' : ''} />)}</span></div>
            <div className="studio-archive-copy" aria-live="polite">
              <p className="studio-archive-type">{stageProject.category}</p>
              <h2 id="studio-archive-title" key={stageProject.slug}>{stageProject.name}<span className="studio-stop">.</span></h2>
              <p className="studio-archive-lead">{stageProject.lead}</p>
              <p className="studio-archive-description">{stageProject.description}</p>
            </div>
            <div className="studio-archive-actions">
              <Link href={'/work/' + stageProject.slug}>INSPECT THIS PROJECT <ArrowUpRight size={21} /></Link>
              <div className="studio-archive-paging"><button type="button" onClick={() => changeSlide(-1)} aria-label="Previous project"><ArrowLeft size={22} /></button><button type="button" onClick={() => changeSlide(1)} aria-label="Next project"><ArrowRight size={22} /></button></div>
            </div>
          </div>
          <div className="studio-stage" ref={stageRef} role="group" tabIndex={0} aria-label="Interactive project slide archive. Use left and right arrow keys to navigate." onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(-1); } else if (e.key === 'ArrowRight') { e.preventDefault(); changeSlide(1); } }}
            onPointerDown={e => { touchStart.current = e.clientX; }}
            onPointerUp={e => { if (touchStart.current !== null) { const dx = e.clientX - touchStart.current; if (Math.abs(dx) > 65) changeSlide(dx < 0 ? 1 : -1); touchStart.current = null; } }}
            onPointerCancel={() => { touchStart.current = null; }}>
            {wide && showScene && !reduced ? <StudioCarousel3D selected={active} /> : <div className={'studio-stage-fallback ' + (stageProject.slug === 'convotools' ? 'is-logo' : '')}><img src={shots[stageProject.slug]} alt="" aria-hidden="true" /></div>}
            <div className="studio-stage-hairline studio-stage-hairline-one" /><div className="studio-stage-hairline studio-stage-hairline-two" />
            <div className="studio-stage-corner studio-stage-corner-tl">+</div><div className="studio-stage-corner studio-stage-corner-br">+</div>
            <div className="studio-stage-bottom-left">ORIGINAL PROJECT MATERIAL</div>
            <div className="studio-stage-bottom-right">{wide && !reduced ? 'DRAG OR USE ARROWS TO BROWSE' : 'USE THE ARROWS TO BROWSE'}</div>
          </div>
        </div>
        <div className="studio-archive-bottom"><span>NOT A CONCEPT PAGE. EACH OBJECT LEADS TO A PROJECT YOU CAN EXPLORE.</span><span>R / S — COLLECTION 001</span></div>
      </section>

      <section className="studio-work" id="work" aria-labelledby="studio-work-heading">
        <div className="studio-section-line"><span>01 / THE WORK</span><span>SELECTED RELEASES, 2026</span></div>
        <div className="studio-work-heading"><h2 id="studio-work-heading">A FEW<br />THINGS I&apos;VE <em>MADE.</em></h2><div><p>Not just pictures of products. These are experiments in systems, interaction, and turning ideas into things you can use.</p><a href="https://github.com/RAJ-SUHANDANI" target="_blank" rel="noopener noreferrer">THE REST IS ON GITHUB <ArrowUpRight size={16} /></a></div></div>
        <div className="studio-work-index">
          <div className="studio-work-index-list">
            {projects.map((project, i) => <Link key={project.slug} className={'studio-work-link ' + (focusProject === i ? 'is-current' : '')} href={'/work/' + project.slug} onMouseEnter={() => setFocusProject(i)} onFocus={() => setFocusProject(i)}>
              <span className="studio-work-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="studio-work-link-main"><strong>{project.name}</strong><small>{project.category}</small></span>
              <ArrowUpRight size={23} strokeWidth={1.6} />
            </Link>)}
          </div>
          <div className="studio-work-preview" aria-live="polite">
            <ProjectPoster project={focus} />
            <p>{focus.lead} <span>↗</span></p>
          </div>
        </div>
        <div className="studio-lower-index"><span>MORE FROM THE ARCHIVE</span><div>{awardProjects.filter(p => !p.feature).map(p => <Link key={p.slug} href={'/work/' + p.slug}>{p.name} <ArrowUpRight size={14} /></Link>)}</div></div>
      </section>

      <section className="studio-play" id="play" aria-labelledby="studio-play-heading">
        <div className="studio-section-line"><span>02 / UNFINISHED BUSINESS</span><span>SMALL EXPERIMENTS</span></div>
        <div className="studio-play-heading"><div><p>BECAUSE SOMETIMES THE BEST WAY TO LEARN IS TO BREAK SOMETHING.</p><h2 id="studio-play-heading">HERE&apos;S ONE<br />YOU CAN <em>TOUCH.</em></h2></div><span className="studio-play-asterisk" aria-hidden="true">✳</span></div>
        <StudioField />
      </section>

      <section className="studio-about" id="about" aria-labelledby="studio-about-heading">
        <div className="studio-section-line"><span>03 / THE PERSON</span><span>NOT AN AGENCY. JUST ME.</span></div>
        <div className="studio-about-layout">
          <div className="studio-about-image"><img src="/raj-suhandani-portrait.webp" loading="lazy" width={800} height={1000} alt="Portrait of Raj Suhandani" /><span>RAJ / BHAVNAGAR, INDIA</span></div>
          <div className="studio-about-writing">
            <p>HELLO, AGAIN.</p>
            <h2 id="studio-about-heading">I LIKE<br />BOTH SIDES<br />OF THE <i>SCREEN.</i></h2>
            <p>I&apos;m studying Information &amp; Communication Technology while building independent software projects. Some are practical, some are playful, and most started with a question I couldn&apos;t leave alone.</p>
            <p>What keeps me going is the mix: the discipline of making things work properly and the freedom to make them feel unlike everything else on the internet.</p>
            <div className="studio-about-foot"><span>CODE / VISUAL DESIGN / 3D / PROBLEM SOLVING</span><Link href="/resume">READ MY RÉSUMÉ <ArrowUpRight size={20} /></Link></div>
          </div>
        </div>
      </section>

      <section className="studio-contact" id="contact" aria-labelledby="studio-contact-heading">
        <div className="studio-section-line"><span>04 / TALK TO ME</span><span>THERE&apos;S MORE TO MAKE</span></div>
        <div className="studio-contact-inner"><p>GOT A GOOD PROBLEM, A STRANGE IDEA, OR SOMETHING YOU&apos;RE EXCITED TO BUILD?</p><h2 id="studio-contact-heading">MY INBOX<br />IS <em>OPEN.</em></h2><a href="mailto:rajsuhandani11@gmail.com" className="studio-email">rajsuhandani11@gmail.com <ArrowUpRight size={34} /></a></div>
      </section>
    </main>

    <footer className="studio-footer">
      <div className="studio-footer-top"><Link href="#top" aria-label="Back to the start"><Signature light /></Link><div><p>AN INDEPENDENT CORNER OF THE INTERNET.</p><a href="#top">BACK TO THE TOP ↑</a></div></div>
      <div className="studio-footer-bottom"><span>© RAJ SUHANDANI · 2026</span><div><a href="https://github.com/RAJ-SUHANDANI" target="_blank" rel="noopener noreferrer"><Github size={16} /> GITHUB</a><a href="https://www.linkedin.com/in/raj-suhandani-a4a393321" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="mailto:rajsuhandani11@gmail.com"><Mail size={16} /> EMAIL</a><Link href="/classic">SIMPLE VIEW ↗</Link></div></div>
    </footer>
    {indexOpen && <SiteIndex close={closeIndex} />}
  </div>;
}