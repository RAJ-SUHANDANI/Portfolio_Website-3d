'use client';
import Link from 'next/link';
import {useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {ArrowLeft,ArrowRight,ArrowUpRight,ExternalLink} from 'lucide-react';
import {projects} from '@/lib/data';
import {capture,featuredSlugs} from '@/lib/projectMedia';
const kinds:Record<string,string>={
 memeismine:'A meme maker for people with jokes to tell',
 convotools:'The file toolbox I wanted in one tab',
 veyra:'A more visual way to run a workspace',
 savora:'A restaurant experience built around the booking'
};
export default function LivePreview(){
 const [active,setActive]=useState(0);
 const reduced=useReducedMotion();
 const touch=useRef<{x:number;y:number}|null>(null);
 const project=projects.find(item=>item.slug===featuredSlugs[active])!;
 const total=featuredSlugs.length;
 function change(direction:number){setActive(value=>(value+direction+total)%total);}
 return <div className="art-live-stage" aria-label="Explore selected project screenshots">
  <div className="art-live-top"><span className="art-live-dot" aria-hidden="true"/> Actual websites, captured in the browser <span>{String(active+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span></div>
  <div className="art-live-canvas"
   onTouchStart={event=>{touch.current={x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY};}}
   onTouchEnd={event=>{
    if(!touch.current)return;
    const dx=event.changedTouches[0].clientX-touch.current.x;
    const dy=event.changedTouches[0].clientY-touch.current.y;
    if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.25)change(dx<0?1:-1);
    touch.current=null;
   }}>
   <AnimatePresence mode="wait" initial={false}>
    <motion.div key={project.slug} className={'art-live-scene art-live-scene-'+project.slug}
     initial={reduced?false:{opacity:0,y:20,scale:.975}}
     animate={{opacity:1,y:0,scale:1}}
     exit={reduced?{opacity:0}:{opacity:0,y:-12,scale:1.01}}
     transition={{duration:reduced?0:.4,ease:[.2,.7,.3,1]}}>
     <div className="art-screen-art">
      <div className="art-screen-toolbar"><div className="art-dots" aria-hidden="true"><i/><i/><i/></div><span>{new URL(project.live||'https://example.com').hostname}</span><ExternalLink size={13}/></div>
      <img src={capture(project.slug)} alt={'Actual desktop capture of the '+project.name+' website'} width={1560} height={980} decoding="async" fetchPriority="high"/>
     </div>
     <div className="art-mobile-art" aria-label="Mobile website preview"><div className="art-mobile-notch"/><img src={capture(project.slug,'mobile')} alt={'Actual mobile capture of '+project.name} width={420} height={912} decoding="async"/></div>
    </motion.div>
   </AnimatePresence>
  </div>
  <div className="art-live-bottom">
   <div className="art-live-description"><span className="art-live-project">{project.name}</span><span>{kinds[project.slug]}</span></div>
   <div className="art-live-controls">
    <button type="button" onClick={()=>change(-1)} aria-label="Previous featured project"><ArrowLeft size={21}/></button>
    <button type="button" onClick={()=>change(1)} aria-label="Next featured project"><ArrowRight size={21}/></button>
    <Link href={'/work/'+project.slug} aria-label={'Read the '+project.name+' case study'} className="art-live-open"><ArrowUpRight size={21}/></Link>
   </div>
  </div>
  <div className="art-live-select" role="group" aria-label="Choose a project">
   {featuredSlugs.map((slug,index)=><button key={slug} type="button" aria-pressed={index===active} onClick={()=>setActive(index)}><span>0{index+1}</span>{projects.find(item=>item.slug===slug)?.name}</button>)}
  </div>
 </div>;
}
