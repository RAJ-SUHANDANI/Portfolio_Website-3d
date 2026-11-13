'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowUpRight,ExternalLink} from 'lucide-react';
import {projects} from '@/lib/data';
import {capture} from '@/lib/projectMedia';
import ProjectLikeButton from '@/components/redesign/ProjectLikeButton';

const filters=['Everything','Creative tools','Productivity','Full stack','Fitness','Experiments'] as const;
const tags:Record<string,string[]>={
 memeismine:['Creative tools','Full stack'],
 convotools:['Productivity','Full stack'],
 veyra:['Productivity','Full stack','Experiments'],
 savora:['Full stack'],
 pulsefit:['Fitness','Productivity'],
 vaultiq:['Productivity','Full stack'],
 gymspot:['Fitness','Full stack'],
 studynotion:['Creative tools','Experiments'],
 auditai:['Experiments','Full stack']
};
const nouns:Record<string,string>={
 memeismine:'Create a meme, without a learning curve.',
 convotools:'Get a file job done, then get back to life.',
 veyra:'A place to keep projects moving.',
 savora:'Dinner plans, handled properly.',
 pulsefit:'Make training progress easier to see.',
 vaultiq:'A clearer picture of personal spending.',
 gymspot:'Find your next place to train.',
 studynotion:'A place to learn and keep exploring.',
 auditai:'A second pair of eyes for website design.'
};
export default function ProjectArchive(){
 const [filter,setFilter]=useState<(typeof filters)[number]>('Everything');
 const filtered=useMemo(()=>projects.filter(project=>filter==='Everything'||tags[project.slug]?.includes(filter)),[filter]);
 return <div className="art-archive">
  <div className="art-archive-heading"><div><p className="art-eyebrow art-eyebrow-dark">There's more.</p><h3>The rest of the<br/><em>rabbit holes.</em></h3></div><p>Not everything belongs in the same category. That is probably my favorite part.</p></div>
  <div className="art-filter-bar" role="group" aria-label="Filter the project gallery">
   {filters.map(name=><button type="button" aria-pressed={filter===name} className={filter===name?'active':''} key={name} onClick={()=>setFilter(name)}>{name}</button>)}
  </div>
  <p className="art-result-count" aria-live="polite">Showing {filtered.length} of {projects.length} projects</p>
  <div className="art-gallery-grid">
   {filtered.map((project,index)=><article key={project.slug} className={'art-tile art-tile-'+project.slug}>
    <Link className="art-tile-visual" href={'/work/'+project.slug} aria-label={'Read about '+project.name}>
     <img className="art-tile-desktop" src={capture(project.slug)} alt={'Screenshot of the real '+project.name+' website'} width={1560} height={980} loading="lazy" decoding="async"/>
     <img className="art-tile-mobile" src={capture(project.slug,'mobile')} alt="" aria-hidden="true" width={420} height={912} loading="lazy" decoding="async"/>
     <span className="art-tile-view">View the story <ArrowUpRight size={18}/></span>
    </Link>
    <div className="art-tile-meta"><span>{String(projects.findIndex(p=>p.slug===project.slug)+1).padStart(2,'0')}</span><span>{tags[project.slug]?.[0]||'Project'}</span></div>
    <div className="art-tile-info"><div><h4>{project.name}</h4><p>{nouns[project.slug]}</p></div><div className="art-tile-actions"><ProjectLikeButton slug={project.slug} name={project.name}/><a target="_blank" rel="noopener noreferrer" href={project.live||project.github} aria-label={'Open '+project.name+' website'}><ExternalLink size={18}/></a></div></div>
   </article>)}
  </div>
 </div>;
}
