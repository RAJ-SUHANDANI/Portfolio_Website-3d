'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Menu,X} from 'lucide-react';

const items=[
 {label:'Selected work',href:'#work',number:'01'},
 {label:'Approach',href:'#approach',number:'02'},
 {label:'About',href:'#about',number:'03'},
 {label:'Experience',href:'#experience',number:'04'},
 {label:'Contact',href:'#contact',number:'05'}
];

export default function RedesignNavigation(){
 const [open,setOpen]=useState(false);
 const buttonRef=useRef<HTMLButtonElement>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const dialogRef=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus();
  function onKeyDown(event:KeyboardEvent){
   if(event.key==='Escape'){event.preventDefault();setOpen(false);return;}
   if(event.key!=='Tab'||!dialogRef.current)return;
   const nodes=Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
   if(!nodes.length)return;
   const first=nodes[0],last=nodes[nodes.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
  window.addEventListener('keydown',onKeyDown);
  return ()=>{
   document.body.style.overflow=previous;
   window.removeEventListener('keydown',onKeyDown);
   buttonRef.current?.focus();
  };
 },[open]);

 function close(){setOpen(false);}
 return <>
  <a className="rd-skip" href="#main">Skip to main content</a>
  <header className="rd-header">
   <Link href="/" className="rd-brand" aria-label="Raj Suhandani, back to homepage">
    <span>R<span className="rd-brand-dot">.</span>S</span><span className="rd-brand-asterisk" aria-hidden="true">✳</span>
   </Link>
   <div className="rd-header-caption"><span className="rd-status-light" aria-hidden="true"/>INDEPENDENT DEVELOPER <span className="rd-header-divider">/</span> DIGITAL CRAFT</div>
   <div className="rd-header-actions">
    <a className="rd-header-mail" href="mailto:rajsuhandani11@gmail.com">LET'S TALK <ArrowUpRight size={15}/></a>
    <button ref={buttonRef} type="button" className="rd-menu-trigger" onClick={()=>setOpen(v=>!v)} aria-haspopup="dialog" aria-expanded={open} aria-controls="rd-navigation-dialog">
     <span>INDEX</span><Menu size={19}/>
    </button>
   </div>
  </header>
  {open?<div className="rd-menu-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)close();}}>
    <div className="rd-menu-panel" ref={dialogRef} id="rd-navigation-dialog" role="dialog" aria-modal="true" aria-label="Site navigation">
     <div className="rd-menu-top"><span>DIRECTORY / 2026</span><button type="button" ref={closeRef} onClick={close} className="rd-menu-close">CLOSE <X size={18}/></button></div>
     <nav aria-label="Main navigation">
      {items.map(item=><a href={item.href} key={item.href} onClick={close}><span>{item.number}</span><strong>{item.label}</strong><ArrowUpRight size={27}/></a>)}
     </nav>
     <div className="rd-menu-bottom"><span>DESIGNED AND BUILT WITH INTENTION.</span><Link onClick={close} href="/resume">VIEW RESUME <ArrowUpRight size={16}/></Link></div>
    </div>
   </div>:null}
 </>;
}
