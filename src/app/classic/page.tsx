import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { awardProjects } from '@/lib/awardContent';

export const metadata: Metadata = {
  title: 'Project Index — Raj Suhandani',
  description: 'An accessible, lightweight index of Raj Suhandani’s software projects, source repositories and published demos.'
};

export default function ClassicPage() {
  return <main className="studio-simple">
    <header className="studio-document-nav"><Link href="/" aria-label="Return to portfolio"><img src="/brand-signature.svg" alt="Raj Suhandani" width={183} height={65} /></Link><Link href="/">INTERACTIVE VIEW ↗</Link></header>
    <section className="studio-simple-opening"><p>NO WEBGL. NO ANIMATION. JUST THE THINGS I&apos;VE MADE.</p><h1>THE WORK<br /><em>INDEX.</em></h1><p>Hi, I&apos;m Raj. This edition is designed for quick browsing, low-power devices and visitors who would rather skip the 3D archive.</p></section>
    <section className="studio-simple-list" aria-label="Project index">{awardProjects.map(project => <article key={project.slug}>
      <span>{project.number} / {project.year}</span>
      <div><h2>{project.name}</h2><p>{project.description}</p><div className="studio-simple-links"><Link href={'/work/' + project.slug}>CASE FILE <ArrowUpRight size={15} /></Link><a href={project.github} target="_blank" rel="noopener noreferrer">SOURCE <ArrowUpRight size={15} /></a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">OPEN PROJECT <ArrowUpRight size={15} /></a>}</div></div>
    </article>)}</section>
    <footer className="studio-document-footer"><a href="mailto:rajsuhandani11@gmail.com">GET IN TOUCH ↗</a><Link href="/resume">RÉSUMÉ ↗</Link><Link href="/">BACK TO THE STUDIO ↑</Link></footer>
  </main>;
}
