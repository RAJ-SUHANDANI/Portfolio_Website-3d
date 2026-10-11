'use client';
import {useEffect} from 'react';

export default function ProjectScrollMotion(){
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const root=document.querySelector<HTMLElement>('.project-case');
  if(!root)return;
  const blocks=Array.from(root.querySelectorAll<HTMLElement>('.pc-section, .pc-info-bar, .pc-hero'));
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){(entry.target as HTMLElement).dataset.inview='true'}}},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
  blocks.forEach(item=>observer.observe(item));
  let raf=0;
  const update=()=>{
   raf=0;
   const height=window.innerHeight||800;
   for(const el of blocks){
    const r=el.getBoundingClientRect();
    if(r.bottom<0||r.top>height)continue;
    const progress=Math.min(1,Math.max(0,(height-r.top)/(height+r.height)));
    el.style.setProperty('--scroll-progress',progress.toFixed(3));
    el.style.setProperty('--scroll-shift',((progress-.5)*48).toFixed(1)+'px');
    el.style.setProperty('--scroll-tilt',((.5-progress)*4).toFixed(2)+'deg');
   }
  };
  const schedule=()=>{if(!raf)raf=window.requestAnimationFrame(update)};
  schedule();
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  return()=>{observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);if(raf)cancelAnimationFrame(raf)};
 },[]);
 return null;
}
