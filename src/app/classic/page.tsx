import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { awardProjects } from '@/lib/awardContent';

export const metadata: Metadata = {
  title: 'Essential Portfolio — Raj Suhandani',
  description: 'A lightweight, accessible index of Raj Suhandani’s software engineering and creative development projects.'
};

export default function Classic() {
  return (
    <main className="award-essential">
      <header className="award-essential-nav">
        <Link href="/" aria-label="Return to the interactive portfolio"><img src="/brand-signature.svg" alt="Raj Suhandani" width={205} height={74} /></Link>
        <Link href="/">INTERACTIVE EDITION ↗</Link>
      </header>
      <section className="award-essential-intro">
        <p className="award-overline">ANOTHER WAY TO EXPLORE / NO WEBGL REQUIRED</p>
        <h1>THE WORK.<br /><em>WITHOUT THE NOISE.</em></h1>
        <p>I&apos;m Raj Suhandani, a software engineer and creative developer. Below is a direct index of my published work, with links to source code and available demos. No animated scenes, just the projects.</p>
      </section>
      <section className="award-essential-list" aria-labelledby="essential-project-heading">
        <h2 id="essential-project-heading">SELECTED &amp; OTHER PROJECTS</h2>
        {awardProjects.map((project) => (
          <article key={project.slug}>
            <div><small>{project.number} / {project.category.toUpperCase()}</small><h3>{project.name}</h3><p>{project.description}</p></div>
            <div className="award-essential-actions">
              <Link href={'/work/' + project.slug}>CASE STUDY <ArrowUpRight size={16} /></Link>
              <a href={project.github} target="_blank" rel="noopener noreferrer">SOURCE <ArrowUpRight size={16} /></a>
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">LIVE SITE <ArrowUpRight size={16} /></a>}
            </div>
          </article>
        ))}
      </section>
      <footer className="award-essential-footer"><a href="mailto:rajsuhandani11@gmail.com">LET&apos;S TALK ↗</a><Link href="/resume">RÉSUMÉ ↗</Link><Link href="/">RETURN TO INTERACTIVE VIEW ↗</Link></footer>
    </main>
  );
}
