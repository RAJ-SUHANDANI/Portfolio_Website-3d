'use client';
import {useEffect,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {capture} from '@/lib/projectMedia';

const chapters=[
 {id:'intro',label:'Opening',type:'image',src:capture('memeismine','mobile')},
 {id:'work',label:'The work',type:'image',src:capture('convotools','mobile')},
 {id:'note',label:'A thought',type:'quote',text:'Could this actually work?'},
 {id:'approach',label:'The approach',type:'quote',text:'Pretty is not the whole point.'},
 {id:'about',label:'About Raj',type:'portrait',src:'/raj-suhandani-portrait.webp'},
 {id:'experience',label:'Experience',type:'quote',text:'Learning in public. Building for real.'},
 {id:'contact',label:'Say hello',type:'quote',text:"Let's make something."}
] as const;
export default function ScrollPhone(){
 const [active,setActive]=useState(0);
 const [show,setShow]=useState(false);
 const reduced=useReducedMotion();
 useEffect(()=>{
  let frame=0;
  function update(){
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const point=window.innerHeight*.53;
    let next=0;
    chapters.forEach((chapter,index)=>{
     const element=document.getElementById(chapter.id);
     if(element&&element.getBoundingClientRect().top<=point)next=index;
    });
    setActive(prev=>prev===next?prev:next);
    const first=document.getElementById('intro');
    const threshold=(first?.getBoundingClientRect().height??850)*.7;
    setShow(window.scrollY>threshold);
   });
  }
  update();
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};
 },[]);
 const chapter=chapters[active];
 return <motion.aside className="art-scroll-viewport" aria-hidden="true" initial={false} animate={{opacity:show?1:0,y:show?0:15,pointerEvents:'none',top:(29+active*5)+'vh'}} transition={reduced?{duration:0}:{duration:.48,ease:[.2,.8,.2,1]}}>
  <div className="art-scroll-chapter">{String(active+1).padStart(2,'0')} <span>/</span> {String(chapters.length).padStart(2,'0')}</div>
  <div className="art-scroll-device">
   <span className="art-scroll-device-notch"/>
   <div className="art-scroll-device-screen">
    <AnimatePresence mode="wait" initial={false}>
     <motion.div className="art-scroll-device-page" key={chapter.id} initial={reduced?{opacity:0}:{opacity:0,y:12,filter:'blur(2px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={reduced?{opacity:0}:{opacity:0,y:-11,filter:'blur(2px)'}} transition={{duration:reduced?0:.3}}>
      {chapter.type==='image'?<img src={chapter.src} alt="" width={420} height={912} decoding="async"/>:
      chapter.type==='portrait'?<img src={chapter.src} alt="" decoding="async"/>:
      <div className="art-scroll-device-typography"><span>RAJ SUHANDANI</span><strong>{chapter.text}</strong><small>THOUGHTFULLY MADE ON THE WEB</small></div>}
     </motion.div>
    </AnimatePresence>
   </div>
  </div>
  <span className="art-scroll-chapter-name">{chapter.label}</span>
 </motion.aside>;
}
