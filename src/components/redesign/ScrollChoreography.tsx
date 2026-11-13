'use client';

import {useEffect} from 'react';
import {motion, useReducedMotion, useScroll, useSpring} from 'framer-motion';
import {usePathname} from 'next/navigation';

/**
 * One observer controls the whole editorial sequence. Content is visible by
 * default: the animation styles only activate after this client enhancement
 * has initialized, and never activate for reduced motion.
 *
 * No scroll locking, snap points, or layout-changing animation. The CSS
 * individual "translate" property leaves existing card hover transforms intact.
 */
export default function ScrollChoreography(){
 const pathname=usePathname();
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll();
 const progress=useSpring(scrollYProgress,{stiffness:95,damping:29,mass:.23,restDelta:.001});

 useEffect(()=>{
  const doc=document.documentElement;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches){
   doc.removeAttribute('data-scroll-motion');
   return;
  }
  let cancelled=false;
  let frame=0;
  let registerFrame=0;
  const all=new Set<HTMLElement>();
  const drift=new Set<HTMLElement>();

  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    const element=entry.target as HTMLElement;
    element.dataset.motionState='visible';
    observer.unobserve(element);
   }
  },{root:null,rootMargin:'0px 0px -8% 0px',threshold:0.06});

  const driftObserver=new IntersectionObserver(entries=>{
   for(const entry of entries){
    const element=entry.target as HTMLElement;
    if(entry.isIntersecting)drift.add(element);
    else drift.delete(element);
   }
  },{rootMargin:'22% 0px 22% 0px',threshold:0});

  function discover(){
   registerFrame=0;
   if(cancelled)return;
   document.querySelectorAll<HTMLElement>('[data-motion]').forEach(element=>{
    if(all.has(element))return;
    all.add(element);
    const rect=element.getBoundingClientRect();
    // Elements already in view never flash invisible before first paint.
    if(rect.top < window.innerHeight*.94 && rect.bottom > 0){
     element.dataset.motionState='visible';
    }else{
     observer.observe(element);
    }
   });
   document.querySelectorAll<HTMLElement>('[data-scroll-parallax]').forEach(element=>{
    if(element.dataset.parallaxRegistered==='true')return;
    element.dataset.parallaxRegistered='true';
    driftObserver.observe(element);
   });
  }
  function scheduleDiscover(){
   if(!registerFrame)registerFrame=requestAnimationFrame(discover);
  }
  function updateDrift(){
   frame=0;
   if(cancelled || document.hidden)return;
   const height=window.innerHeight||800;
   for(const element of drift){
    const rect=element.getBoundingClientRect();
    const distance=Math.min(32,Math.abs(Number(element.dataset.scrollParallax)||15));
    const sign=Number(element.dataset.scrollParallax)<0?-1:1;
    const position=((height*.5)-(rect.top+rect.height*.5))/(height*.5+rect.height*.5);
    const amount=Math.max(-1,Math.min(1,position))*distance*sign;
    element.style.setProperty('--scroll-drift',amount.toFixed(2)+'px');
   }
  }
  function scheduleDrift(){if(!frame)frame=requestAnimationFrame(updateDrift);}
  function onVisible(){if(!document.hidden)scheduleDrift();}

  // First scan before switching on the reveal CSS avoids an empty first frame.
  discover();
  doc.dataset.scrollMotion='ready';
  const mutations=new MutationObserver(records=>{
   if(records.some(record=>record.addedNodes.length>0))scheduleDiscover();
  });
  mutations.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('scroll',scheduleDrift,{passive:true});
  window.addEventListener('resize',scheduleDrift,{passive:true});
  document.addEventListener('visibilitychange',onVisible);
  scheduleDrift();

  return()=>{
   cancelled=true;
   observer.disconnect();
   driftObserver.disconnect();
   mutations.disconnect();
   all.clear();
   drift.clear();
   cancelAnimationFrame(frame);
   cancelAnimationFrame(registerFrame);
   window.removeEventListener('scroll',scheduleDrift);
   window.removeEventListener('resize',scheduleDrift);
   document.removeEventListener('visibilitychange',onVisible);
   doc.removeAttribute('data-scroll-motion');
  };
 },[pathname]);

 return <motion.div aria-hidden="true" className="art-scroll-progress" style={{scaleX:reduced?scrollYProgress:progress}}/>;
}
