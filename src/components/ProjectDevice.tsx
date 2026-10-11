'use client';

import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {useReducedMotion} from 'framer-motion';
import type {Project} from '@/lib/data';
import type {ProjectStory} from '@/lib/projectStories';

const Laptop=dynamic(()=>import('./ProjectLaptop3D'),{ssr:false,loading:()=>null});

function Placeholder({project,story}:{project:Project;story:ProjectStory}){
 const photo=story.screenshots[0];
 return <div className="project-device-placeholder" aria-label={project.name+' interface preview'}>
  <div className="project-device-placeholder-screen">
   {photo?<img src={photo.src} alt={photo.alt} loading="lazy"/>:
    <div className="project-device-illustration">
     <div className="illustration-browser"><i/><i/><i/></div>
     <small>{project.category}</small><strong>{project.name}</strong>
     <p>{project.features[0]}</p><div className="illustration-panels"><span/><span/><span/></div>
    </div>}
  </div><div className="project-device-placeholder-base"/>
 </div>;
}

export default function ProjectDevice({project,story}:{project:Project;story:ProjectStory}){
 const host=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 const [supported,setSupported]=useState(false);
 const reduced=useReducedMotion();
 useEffect(()=>{
  let can=false;
  try{can=!!document.createElement('canvas').getContext('webgl')}catch{can=false}
  setSupported(can);
  if(!can||!host.current)return;
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){setReady(true);observer.disconnect()}
  },{rootMargin:'180px'});
  observer.observe(host.current);
  return()=>observer.disconnect();
 },[]);
 return <div className="project-device" ref={host} style={{'--project-accent':project.color} as CSSProperties}>
  <div className="project-device-stage">
   {supported&&ready&&!reduced?
    <Laptop name={project.name} slug={project.slug} accent={project.color} previewUrl={story.screenshots[0]?.src} previewLabel={story.previewType==='repository'?'REAL PROJECT SCREENSHOT':'PROJECT CONCEPT PREVIEW'}/>:
    <Placeholder project={project} story={story}/>}
  </div>
  <div className="project-device-actions">
   {project.live?<a className="project-live-action" href={project.live} target="_blank" rel="noopener noreferrer">VISIT PROJECT WEBSITE <span aria-hidden="true">↗</span></a>:
   <a className="project-live-action" href={project.github} target="_blank" rel="noopener noreferrer">EXPLORE SOURCE CODE <span aria-hidden="true">↗</span></a>}
   {project.slug!=='auditai'&&<a href={project.github} target="_blank" rel="noopener noreferrer" className="project-source-action">GITHUB ↗</a>}
  </div>
  <p className="project-preview-disclaimer">{story.previewNote}</p>
 </div>;
}
