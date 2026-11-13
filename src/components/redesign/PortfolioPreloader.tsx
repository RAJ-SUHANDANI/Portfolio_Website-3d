'use client';
import {useEffect,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import Signature from './Signature';

export default function PortfolioPreloader(){
 const [visible,setVisible]=useState(true);
 const [step,setStep]=useState(0);
 const reduced=useReducedMotion();
 useEffect(()=>{
  let dismissed=false;
  try{dismissed=sessionStorage.getItem('raj-portfolio-intro-v1')==='seen';}catch{}
  if(dismissed||window.matchMedia('(prefers-reduced-motion: reduce)').matches){setVisible(false);return;}
  const timers=[
   window.setTimeout(()=>setStep(1),400),
   window.setTimeout(()=>setStep(2),800),
   window.setTimeout(()=>dismiss(),1330)
  ];
  function dismiss(){
   setVisible(false);
   try{sessionStorage.setItem('raj-portfolio-intro-v1','seen');}catch{}
  }
  return ()=>timers.forEach(window.clearTimeout);
 },[]);
 function skip(){
  setVisible(false);
  try{sessionStorage.setItem('raj-portfolio-intro-v1','seen');}catch{}
 }
 const words=['Ideas.','Built.','Shared.'];
 return <AnimatePresence>
  {visible?<motion.div className="art-preloader" initial={{opacity:1}} exit={reduced?{opacity:0}:{clipPath:'inset(0 0 100% 0 round 0 0 45% 45%)'}} transition={{duration:reduced?0:.62,ease:[.77,0,.18,1]}} role="status" aria-label="Opening portfolio">
   <div className="art-preloader-top"><Signature/><span>STUDIO / RAJ SUHANDANI</span></div>
   <div className="art-preloader-middle">
    <span>THE MAKING OF A GOOD IDEA</span>
    <AnimatePresence mode="wait">
     <motion.strong key={words[step]} initial={reduced?{opacity:0}:{opacity:0,y:42,rotateX:28}} animate={{opacity:1,y:0,rotateX:0}} exit={reduced?{opacity:0}:{opacity:0,y:-35,rotateX:-20}} transition={{duration:reduced?0:.34,ease:[.2,.8,.2,1]}}>{words[step]}</motion.strong>
    </AnimatePresence>
   </div>
   <div className="art-preloader-bottom"><span>LOOK CLOSER. THERE'S MORE.</span><button type="button" onClick={skip}>Skip intro <span aria-hidden="true">↗</span></button></div>
  </motion.div>:null}
 </AnimatePresence>;
}
