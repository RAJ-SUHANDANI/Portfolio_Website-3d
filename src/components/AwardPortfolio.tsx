'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Command,
  ExternalLink, Github, Mail, Menu, Search, X
} from 'lucide-react';
import { awardProjects, featuredProjects } from '@/lib/awardContent';

const ArtifactScene = dynamic(() => import('./AwardArtifactScene'), { ssr: false, loading: () => null });

const navigation = [
  { name: 'Projects', href: '#work', note: 'The evidence' },
  { name: 'Experiments', href: '#experiments', note: 'The curiosity' },
  { name: 'About', href: '#about', note: 'The person' },
  { name: 'Contact', href: '#contact', note: 'The conversation' }
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -72px 0px' }}
      transition={{ duration: .85, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
}

function Signature({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return <img src="/brand-signature.svg" alt="Raj Suhandani" className={'award-signature ' + (light ? 'award-signature-light ' : '') + className} width={228} height={84} />;
}

function InterfaceSpecimen() {
  const [selected, setSelected] = useState('PDF');
  const operations: Record<string, string[]> = {
    PDF: ['MERGE DOCUMENTS', 'SPLIT PAGES', 'PDF → WORD'],
    IMAGE: ['RESIZE IMAGE', 'PNG → WEBP', 'COMPRESS IMAGE'],
    DATA: ['JSON FORMATTER', 'CSV → XLSX', 'REMOVE DUPLICATES']
  };
  return (
    <div className="award-tool-specimen" aria-label="Illustrative diagram of ConvoTools tool discovery">
      <div className="award-tool-specimen-top"><span><i /> CONVOTOOLS / FIELD NOTES</span><span>INTERACTIVE CONCEPT</span></div>
      <div className="award-tool-specimen-display"><strong>{selected}<small> / UTILITIES</small></strong><span>CHOOSE A FORMAT<br />EXPLORE A WORKFLOW.</span></div>
      <div className="award-tool-switch">
        {Object.keys(operations).map((option) => <button type="button" key={option} onClick={() => setSelected(option)} className={selected === option ? 'is-selected' : ''} aria-pressed={selected === option}>{option}</button>)}
      </div>
      <div className="award-tool-rows">{operations[selected].map((name, index) => <div key={name}><span>0{index + 1}</span>{name}<ArrowUpRight size={16} /></div>)}</div>
      <p>Conceptual interactive illustration. Visit ConvoTools to explore the actual application.</p>
    </div>
  );
}

function ProjectVisual({ project }: { project: (typeof featuredProjects)[number] }) {
  return (
    <div className={'award-project-media award-surface-' + project.surface}>
      <div className="award-project-media-top"><span>EXHIBIT / {project.number}</span><span>© {project.year}</span></div>
      {project.image ? (
        <div className="award-project-image-frame">
          <img src={project.image} alt={project.imageAlt || project.name + ' project screenshot'} loading="lazy" decoding="async" />
        </div>
      ) : <InterfaceSpecimen />}
      <div className="award-project-media-bottom"><span>{project.proof}</span><span className="award-media-plus">+</span></div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: (typeof featuredProjects)[number]; index: number }) {
  return (
    <Reveal className={'award-project-row award-project-row-' + (index % 2 ? 'reverse' : 'normal')}>
      <Link href={'/work/' + project.slug} className="award-project-visual-link" aria-label={'View ' + project.name + ' case study'}>
        <ProjectVisual project={project} />
        <span className="award-project-corner"><ArrowUpRight size={23} strokeWidth={1.5} /></span>
      </Link>
      <div className="award-project-copy">
        <div className="award-project-index"><span>PROJECT {project.number} / {String(featuredProjects.length).padStart(2, '0')}</span><span>{project.year}</span></div>
        <p className="award-project-category">{project.category}</p>
        <h3>{project.name}<span className="award-project-dot">.</span></h3>
        <p className="award-project-lead">{project.lead}</p>
        <p className="award-project-description">{project.description}</p>
        <div className="award-project-tags">{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
        <Link href={'/work/' + project.slug} className="award-inline-link">Explore the case study <ArrowUpRight size={18} strokeWidth={1.6} /></Link>
      </div>
    </Reveal>
  );
}

function LabSpecimen() {
  const [choice, setChoice] = useState(0);
  const items = [
    { label: 'FORM', number: '01', title: 'Give it shape.', body: 'A quiet system of proportions. Rotate the idea until it feels inevitable.' },
    { label: 'FEEDBACK', number: '02', title: 'Make it respond.', body: 'An interaction should explain a state, not just decorate a moment.' },
    { label: 'FEELING', number: '03', title: 'Leave a trace.', body: 'The best digital experiences are unmistakable, not merely impressive.' }
  ];
  return (
    <div className="award-lab-specimen">
      <div className="award-lab-label"><span>INTERACTIVE PROTOTYPE 001</span><span>NO CANVAS REQUIRED</span></div>
      <div className="award-lab-composition" data-shape={choice}>
        <div className="award-lab-line award-lab-line-one" />
        <div className="award-lab-line award-lab-line-two" />
        <div className="award-lab-disc"><div className="award-lab-disc-inner"><span>R / S</span></div></div>
        <div className="award-lab-orbit"><span>EXPERIMENT IN PROGRESS · EXPERIMENT IN PROGRESS · </span></div>
        <span className="award-lab-coordinate">X:0{choice + 1} / Y:026</span>
      </div>
      <div className="award-lab-bottom">
        <div className="award-lab-selector">{items.map((item, index) =>
          <button key={item.label} type="button" onClick={() => setChoice(index)} className={choice === index ? 'is-active' : ''} aria-pressed={choice === index}>
            <small>{item.number}</small> {item.label}
          </button>)}</div>
        <div className="award-lab-readout" aria-live="polite"><h3>{items[choice].title}</h3><p>{items[choice].body}</p></div>
      </div>
    </div>
  );
}

export default function AwardPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [modelMode, setModelMode] = useState(0);
  const [motionOff, setMotionOff] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const commands = useMemo(() => [
    ...navigation.map((item) => ({ label: item.name, href: item.href, type: 'SECTION' })),
    ...awardProjects.map((item) => ({ label: item.name, href: '/work/' + item.slug, type: 'PROJECT' }))
  ].filter((item) => item.label.toLowerCase().includes(search.toLowerCase())), [search]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setCommandOpen((value) => !value); setMenuOpen(false);
      }
      if (event.key === 'Escape') { setCommandOpen(false); setMenuOpen(false); }
    };
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, []);

  useEffect(() => {
    if (commandOpen) searchRef.current?.focus();
  }, [commandOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || commandOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, commandOpen]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      setProgress(root.scrollHeight > window.innerHeight
        ? window.scrollY / (root.scrollHeight - window.innerHeight) : 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current || reduced || motionOff) return;
    if (window.matchMedia('(max-width: 720px)').matches) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSceneReady(true); obs.disconnect(); } }, { rootMargin: '240px' });
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, [reduced, motionOff]);

  const closeNav = () => { setMenuOpen(false); setCommandOpen(false); };
  return (
    <div className="award-site" id="top">
      <div className="award-scroll-track" aria-hidden="true"><div style={{ transform: 'scaleX(' + progress + ')' }} /></div>
      <a className="award-skip" href="#work">Skip to projects</a>

      <header className="award-header">
        <Link href="/" className="award-home-link" aria-label="Raj Suhandani, home"><Signature light /></Link>
        <div className="award-header-middle"><span className="award-status-dot" /> INDEPENDENT CREATIVE DEVELOPER <span className="award-divider">/</span> INDIA</div>
        <div className="award-header-actions">
          <button onClick={() => { setCommandOpen(true); setSearch(''); }} type="button" className="award-search-trigger" aria-label="Open quick navigation"><Command size={15} /> K</button>
          <button onClick={() => setMenuOpen(true)} className="award-menu-trigger" type="button" aria-label="Open navigation"><span>THE INDEX</span><Menu size={23} /></button>
        </div>
      </header>

      <main>
        <section className="award-hero" ref={heroRef} aria-labelledby="award-hero-title">
          <div className="award-hero-grid" aria-hidden="true" />
          <div className="award-hero-overline"><span>THE PRACTICE OF MAKING THINGS REAL.</span><span>PORTFOLIO / EDITION 2026</span></div>
          <div className="award-hero-main">
            <div className="award-hero-type">
              <p className="award-eyebrow"><span className="award-asterisk">✳</span> DESIGN × ENGINEERING × CURIOSITY</p>
              <h1 id="award-hero-title">MAKE<br />IDEAS <em>FEEL</em><br />REAL<span className="award-period">.</span></h1>
              <div className="award-hero-description">
                <div className="award-hero-rule" />
                <p>I&apos;m Raj Suhandani. I design and engineer digital products that reward curiosity — from useful tools to immersive, interactive worlds.</p>
                <a href="#work" className="award-round-link" aria-label="Explore selected projects"><ArrowDownRight size={27} strokeWidth={1.5} /></a>
              </div>
            </div>
            <div className="award-artifact-host" aria-label="An interactive kinetic sculpture representing experimentation in digital space">
              {sceneReady && !reduced && !motionOff
                ? <ArtifactScene mode={modelMode} />
                : <div className="award-artifact-fallback" data-mode={modelMode} aria-hidden="true"><span /><span /><span /><b>R/S</b></div>}
              <div className="award-artifact-mark"><span>OBJ. 001</span><span>AN EXERCISE IN FORM</span></div>
              <div className="award-artifact-controls" aria-label="Choose sculpture state">
                {['ORBIT', 'ALIGN', 'PULSE'].map((name, index) => <button key={name} type="button" className={modelMode === index ? 'is-active' : ''} onClick={() => setModelMode(index)} aria-pressed={modelMode === index}>{String(index + 1).padStart(2, '0')} {name}</button>)}
              </div>
            </div>
          </div>
          <div className="award-hero-floor"><span>SELECTED WORK ↓</span><span>SCROLL TO EXPLORE</span><span>01 — 05 / AN ONGOING PRACTICE</span></div>
        </section>

        <div className="award-ticker" aria-hidden="true"><div>IDEAS INTO OBJECTS <b>✳</b> CODE INTO FEELING <b>✳</b> DESIGN INTO SYSTEMS <b>✳</b> IDEAS INTO OBJECTS <b>✳</b> CODE INTO FEELING <b>✳</b></div></div>

        <section className="award-work" id="work" aria-labelledby="award-work-heading">
          <div className="award-container">
            <div className="award-section-kicker"><span>01 / SELECTED WORK</span><span>EXPERIMENTS WITH REAL CONSEQUENCES</span></div>
            <Reveal className="award-work-heading"><div><p className="award-overline">THE PROOF IS IN THE MAKING.</p><h2 id="award-work-heading">NOT JUST<br /><em>PRETTY</em> PIXELS<span>.</span></h2></div><p>Products to use. Systems to investigate. Experiences worth exploring. These aren&apos;t just visual studies — there&apos;s code behind the curtain.</p></Reveal>
            <div className="award-projects">{featuredProjects.map((project, index) => <ProjectRow key={project.slug} project={project} index={index} />)}</div>
            <Reveal className="award-archive">
              <div className="award-archive-heading"><span>OTHER THINGS I&apos;VE MADE</span><span>THE CONTINUING ARCHIVE ↘</span></div>
              {awardProjects.filter((item) => !item.feature).map((item) =>
                <Link key={item.slug} href={'/work/' + item.slug} className="award-archive-item"><span>{item.number}</span><strong>{item.name}</strong><small>{item.category}</small><ArrowUpRight size={21} /></Link>)}
              <a href="https://github.com/RAJ-SUHANDANI" rel="noopener noreferrer" target="_blank" className="award-inline-link award-archive-github"><Github size={18} /> Explore all repositories <ArrowUpRight size={17} /></a>
            </Reveal>
          </div>
        </section>

        <section className="award-experiments" id="experiments" aria-labelledby="award-exp-heading">
          <div className="award-container">
            <div className="award-section-kicker"><span>02 / INTERACTIVE STUDIES</span><span>PLAY IS A FORM OF RESEARCH</span></div>
            <Reveal className="award-experiments-intro"><p className="award-overline">THE IN-BETWEEN.</p><h2 id="award-exp-heading">SOME THINGS<br />ARE BETTER <em>FELT.</em></h2><p>Movement can clarify. Depth can communicate. An interaction earns its place when it changes how something is understood.</p></Reveal>
            <Reveal><LabSpecimen /></Reveal>
          </div>
        </section>

        <section className="award-method" aria-labelledby="award-method-title">
          <div className="award-container">
            <div className="award-section-kicker"><span>03 / WORKING PRINCIPLES</span><span>THINK / MAKE / REFINE</span></div>
            <Reveal><h2 id="award-method-title">THE DETAILS<br />ARE <em>THE WORK.</em></h2></Reveal>
            <div className="award-method-grid">
              {[
                ['01', 'Question the obvious.', 'A better interface usually begins by asking why an interaction exists at all.'],
                ['02', 'Build the real thing.', 'I care as much about the data flow, edge cases and architecture as the first frame.'],
                ['03', 'Make it feel human.', 'Good feedback, considered motion, and carefully chosen words make software easier to trust.']
              ].map(([number, title, body], i) => <Reveal className="award-method-card" delay={i * .07} key={number}><span>{number} / PRINCIPLE</span><div className="award-method-symbol" aria-hidden="true">✳</div><h3>{title}</h3><p>{body}</p><ArrowUpRight size={22} strokeWidth={1.4} /></Reveal>)}
            </div>
          </div>
        </section>

        <section className="award-about" id="about" aria-labelledby="award-about-title">
          <div className="award-container">
            <div className="award-section-kicker"><span>04 / BEHIND THE WORK</span><span>THE PERSON, NOT THE PERSONA</span></div>
            <div className="award-about-grid">
              <Reveal className="award-about-portrait"><img src="/raj-suhandani-portrait.webp" alt="Portrait of Raj Suhandani" loading="lazy" /><div><span>RAJ SUHANDANI</span><span>BHAVNAGAR, INDIA / 2026</span></div></Reveal>
              <Reveal className="award-about-copy"><p className="award-overline">A NOTE FROM THE MAKER.</p><h2 id="award-about-title">CURIOUS<br />BY <em>DESIGN.</em></h2><p>I&apos;m a full-stack developer studying Information &amp; Communication Technology, and I&apos;ve always been drawn to the space between how something works and how it makes people feel.</p><p>One week that means building a trustworthy booking engine. Another, shaping a 3D story or making an everyday file tool feel effortless. The common thread is curiosity with the discipline to make it real.</p><div className="award-about-links"><a href="https://github.com/RAJ-SUHANDANI" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={17} /></a><a href="https://www.linkedin.com/in/raj-suhandani-a4a393321" target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={17} /></a><Link href="/resume">RÉSUMÉ <ArrowUpRight size={17} /></Link></div></Reveal>
            </div>
          </div>
        </section>

        <section className="award-contact" id="contact" aria-labelledby="award-contact-heading">
          <div className="award-container">
            <div className="award-section-kicker"><span>05 / THE NEXT IDEA</span><span>OPEN TO THE UNEXPECTED</span></div>
            <Reveal><p className="award-overline">IF YOU HAVE SOMETHING INTERESTING IN MIND—</p><h2 id="award-contact-heading">LET&apos;S MAKE<br />IT <em>MATTER.</em></h2><div className="award-contact-foot"><p>Building something ambitious? I&apos;d like to hear about it.</p><a href="mailto:rajsuhandani11@gmail.com" className="award-contact-cta">START A CONVERSATION <ArrowUpRight size={25} strokeWidth={1.5} /></a></div></Reveal>
          </div>
        </section>
      </main>

      <footer className="award-footer"><div className="award-container">
        <div className="award-footer-top"><Link href="/" aria-label="Back to top"><Signature /></Link><span>DESIGN × CODE × THE SPACE BETWEEN</span></div>
        <div className="award-footer-bottom"><span>© 2026 RAJ SUHANDANI — MADE WITH INTENTION.</span><div><button type="button" onClick={() => setMotionOff((value) => !value)} aria-pressed={motionOff}>{motionOff ? 'ENABLE 3D' : 'DISABLE 3D'}</button><a href="mailto:rajsuhandani11@gmail.com">EMAIL ↗</a><a href="https://github.com/RAJ-SUHANDANI" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></div></div>
      </div></footer>

      {menuOpen && <div className="award-full-menu" role="dialog" aria-modal="true" aria-label="Portfolio navigation"><div className="award-full-menu-top"><Signature light /><button type="button" onClick={() => setMenuOpen(false)}>CLOSE <X size={24} /></button></div><div className="award-full-menu-links">{navigation.map((item, index) => <a href={item.href} onClick={closeNav} key={item.name}><small>0{index + 1}</small><span>{item.name}</span><em>{item.note}</em><ArrowUpRight size={27} /></a>)}</div><p>RAJ SUHANDANI / INDEPENDENT CREATIVE DEVELOPER</p></div>}
      {commandOpen && <div className="award-command-overlay" onMouseDown={() => setCommandOpen(false)}><div className="award-command" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(event) => event.stopPropagation()}><div className="award-command-input"><Search size={20} /><input ref={searchRef} autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a project or section..." aria-label="Find a project or section" /><button type="button" onClick={() => setCommandOpen(false)} aria-label="Close search"><X size={19} /></button></div><div className="award-command-results">{commands.length ? commands.map((item) => <Link key={item.href} onClick={closeNav} href={item.href}><small>{item.type}</small><span>{item.label}</span><ArrowUpRight size={17} /></Link>) : <p>No matching projects. Try a different search.</p>}</div><div className="award-command-footer">CTRL / ⌘ + K TO OPEN <span>ESC TO CLOSE</span></div></div></div>}
    </div>
  );
}