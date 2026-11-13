'use client';
import {useEffect} from 'react';
export default function MagneticInteractions(){
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches)return;
  let active:HTMLElement|null=null;
  let raf=0;
  function move(event:PointerEvent){
   const target=event.target instanceof Element?event.target.closest<HTMLElement>('.art-magnetic'):null;
   if(active!==target){active?.style.removeProperty('translate');active=target;}
   if(!target)return;
   cancelAnimationFrame(raf);
   raf=requestAnimationFrame(()=>{
    const rect=target.getBoundingClientRect();
    const x=((event.clientX-(rect.left+rect.width/2))/rect.width)*9;
    const y=((event.clientY-(rect.top+rect.height/2))/rect.height)*9;
    target.style.translate=x.toFixed(1)+'px '+y.toFixed(1)+'px';
   });
  }
  function leave(){cancelAnimationFrame(raf);active?.style.removeProperty('translate');active=null;}
  document.addEventListener('pointermove',move,{passive:true});
  function out(event:PointerEvent){
   if(active&&event.target instanceof Node&&active.contains(event.target)&&!(event.relatedTarget instanceof Node&&active.contains(event.relatedTarget)))leave();
  }
  document.addEventListener('pointerout',out);
  window.addEventListener('blur',leave);
  return ()=>{document.removeEventListener('pointermove',move);document.removeEventListener('pointerout',out);window.removeEventListener('blur',leave);leave();};
 },[]);
 return null;
}
