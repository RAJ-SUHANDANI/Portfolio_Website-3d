'use client';
import {useEffect,useState} from 'react';
import {Heart} from 'lucide-react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';

const prefix='raj-portfolio-liked-';
const eventName='raj-portfolio-like-change';
export default function ProjectLikeButton({slug,name}:{slug:string;name:string}){
 const [liked,setLiked]=useState(false);
 const [ready,setReady]=useState(false);
 const [burst,setBurst]=useState(0);
 const reduced=useReducedMotion();
 useEffect(()=>{
  try{setLiked(localStorage.getItem(prefix+slug)==='1');}catch{}
  setReady(true);
  function onChanged(event:Event){const detail=(event as CustomEvent<{slug:string;liked:boolean}>).detail;if(detail?.slug===slug)setLiked(detail.liked);}
  window.addEventListener(eventName,onChanged);
  return ()=>window.removeEventListener(eventName,onChanged);
 },[slug]);
 function toggle(){
  const next=!liked;
  setLiked(next);
  if(next)setBurst(v=>v+1);
  try{if(next)localStorage.setItem(prefix+slug,'1');else localStorage.removeItem(prefix+slug);}catch{}
  window.dispatchEvent(new CustomEvent(eventName,{detail:{slug,liked:next}}));
 }
 return <div className="art-like-wrap">
  <motion.button type="button" className={'art-like-button'+(liked?' is-liked':'')} whileTap={reduced?undefined:{scale:.94}} aria-pressed={ready&&liked} aria-label={(liked?'Unlike ':'Like ')+name+' on this device'} onClick={toggle} title="A personal reaction saved on this device">
   <Heart size={18} strokeWidth={1.8} fill={liked?'currentColor':'none'} aria-hidden="true"/>
   <span className="art-like-count" aria-hidden="true">{ready&&liked?1:0}</span>
   <AnimatePresence>
   {ready&&liked&&!reduced?<motion.span className="art-like-particles" key={burst} aria-hidden="true">
    {[0,1,2,3,4,5].map(i=><motion.i key={i} style={{'--angle':i*60+'deg'} as React.CSSProperties} initial={{opacity:1,scale:.3,x:0,y:0}} animate={{opacity:0,scale:0,x:Math.cos(i*Math.PI/3)*29,y:Math.sin(i*Math.PI/3)*29}} transition={{duration:.75,delay:i*.045,ease:'easeOut'}}/>)}
   </motion.span>:null}
   </AnimatePresence>
  </motion.button>
  <span className="art-like-hint">Your like</span>
 </div>;
}
