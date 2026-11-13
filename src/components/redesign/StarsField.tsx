'use client';
import {useEffect,useRef} from 'react';
export default function StarsField(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches)return;
  let frame=0;
  function move(event:PointerEvent){
   if(event.pointerType==='touch')return;
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const x=(event.clientX/window.innerWidth-.5)*-16;
    const y=(event.clientY/window.innerHeight-.5)*-16;
    root.current?.style.setProperty('--stars-x',x.toFixed(1)+'px');
    root.current?.style.setProperty('--stars-y',y.toFixed(1)+'px');
   });
  }
  function visible(){root.current?.classList.toggle('is-paused',document.hidden);}
  document.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('visibilitychange',visible);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visible);};
 },[]);
 return <div ref={root} className="art-stars-field" aria-hidden="true">
  <div className="art-stars-layer art-stars-tiny"/>
  <div className="art-stars-layer art-stars-medium"/>
  <div className="art-stars-layer art-stars-large"/>
 </div>;
}
