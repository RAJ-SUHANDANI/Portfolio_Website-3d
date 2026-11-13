'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {projects} from '@/lib/data';

const categories=['All','Creative','Productivity','Full-stack','3D','AI'];
const screenshots:Record<string,string>={
 memeismine:'https://raw.githubusercontent.com/RAJ-SUHANDANI/MemeIsMine/main/public/editor-preview.jpg',
 veyra:'https://raw.githubusercontent.com/RAJ-SUHANDANI/Veyra/main/screenshots/03-dashboard-overview.png',
 savora:'https://raw.githubusercontent.com/RAJ-SUHANDANI/Savora/main/docs/screenshots/01-home-desktop.jpg',
 studynotion:'https://raw.githubusercontent.com/RAJ-SUHANDANI/StudyNotion/main/images/mainpage.png',
 auditai:'/project-previews/auditai-home.png'
};
const match:Record<string,string[]>={
 memeismine:['Creative','Full-stack'],convotools:['Productivity','Full-stack'],
 veyra:['Productivity','3D','Full-stack'],savora:['Full-stack'],
 pulsefit:['Productivity'],vaultiq:['Productivity','Full-stack','3D'],
 gymspot:['Full-stack'],studynotion:['Creative','3D'],auditai:['AI','Full-stack']
};
const summaries:Record<string,string>={
 memeismine:'A creative home for image and video memes.',
 convotools:'A browser-first desk for file work.',
 veyra:'Making project work visible.',
 savora:'A better way to reserve a table.'
};
export default function ProjectArchive(){
 const [category,setCategory]=useState('All');
 const [active,setActive]=useState('memeismine');
 const visible=useMemo(()=>projects.filter(project=>category==='All'||(match[project.slug]||[]).includes(category)),[category]);
 const preview=projects.find(project=>project.slug===active&&visible.some(item=>item.slug===active))||visible[0];
 return <div className="rd-archive">
  <div className="rd-archive-head">
   <div><span className="rd-micro">THE COMPLETE INDEX</span><h3>Everything<br/><em>else, too.</em></h3></div>
   <p>Nine selected projects. Different problems, one guiding principle: make the useful feel considered.</p>
  </div>
  <div className="rd-archive-filters" role="group" aria-label="Filter projects">
   {categories.map(item=><button type="button" key={item} onClick={()=>{setCategory(item);setActive('');}} aria-pressed={category===item} className={category===item?'is-current':''}>{item}</button>)}
  </div>
  <div className="rd-archive-layout">
   <div className="rd-archive-list">
    {visible.map((project,index)=><Link href={'/work/'+project.slug} key={project.slug} onMouseEnter={()=>setActive(project.slug)} onFocus={()=>setActive(project.slug)} className={project.slug===preview?.slug?'is-previewed':''}>
     <span className="rd-archive-number">{String(index+1).padStart(2,'0')}</span>
     <div><strong>{project.name}</strong><span>{summaries[project.slug]||project.category}</span></div>
     <ArrowUpRight size={22}/>
    </Link>)}
    {!visible.length?<p>No projects in this category yet.</p>:null}
   </div>
   <div className="rd-archive-preview" aria-hidden="true">
    {preview?<div className={'rd-archive-preview-inner rd-archive-preview--'+preview.slug}>
       {screenshots[preview.slug]?<img src={screenshots[preview.slug]} alt="" loading="lazy" decoding="async"/>:<div className="rd-archive-preview-art"><span>PROJECT / {preview.slug.toUpperCase()}</span><strong>{preview.name}</strong><small>{preview.category}</small></div>}
       <span className="rd-archive-preview-label">{preview.name} <ArrowRight size={17}/></span>
    </div>:null}
   </div>
  </div>
 </div>;
}
