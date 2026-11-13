'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Moon,Sun} from 'lucide-react';

type Theme='light'|'dark';
const ThemeContext=createContext<{theme:Theme;setTheme:(theme:Theme)=>void}>({theme:'light',setTheme:()=>{}});
export function ThemeProvider({children}:{children:React.ReactNode}){
 const [theme,setValue]=useState<Theme>('light');
 useEffect(()=>{
  const attr=document.documentElement.dataset.siteTheme;
  const existing:Theme=attr==='dark'?'dark':'light';
  setValue(existing);
 },[]);
 function setTheme(next:Theme){
  setValue(next);
  document.documentElement.dataset.siteTheme=next;
  try{localStorage.setItem('raj-portfolio-theme',next);}catch{}
 }
 return <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>;
}
export function ThemeToggle({className=''}:{className?:string}){
 const {theme,setTheme}=useContext(ThemeContext);
 const reduced=useReducedMotion();
 const dark=theme==='dark';
 return <button type="button" className={'art-theme-toggle '+className} aria-label={dark?'Switch to light theme':'Switch to dark theme'} title={dark?'Light appearance':'Dark appearance'} aria-pressed={dark} onClick={()=>setTheme(dark?'light':'dark')}>
  <span className="art-theme-icon">
   <AnimatePresence initial={false} mode="wait">
    <motion.span key={theme} initial={reduced?{opacity:0}:{opacity:0,rotate:-90,scale:.5,filter:'blur(2px)'}} animate={{opacity:1,rotate:0,scale:1,filter:'blur(0px)'}} exit={reduced?{opacity:0}:{opacity:0,rotate:90,scale:.5,filter:'blur(2px)'}} transition={{duration:reduced?0:.28,ease:[.23,1,.32,1]}}>
     {dark?<Sun size={20} strokeWidth={1.8}/>:<Moon size={20} strokeWidth={1.8}/>}
    </motion.span>
   </AnimatePresence>
  </span>
  <span className="art-theme-label">{dark?'Light':'Dark'}</span>
 </button>;
}
