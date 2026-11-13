'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import Signature from '@/components/redesign/Signature';
const links=[
 {label:'Work',href:'#work'},
 {label:'About',href:'#about'},
 {label:'How I work',href:'#approach'},
 {label:'Contact',href:'#contact'}
];
export default function RedesignNavigation(){
 const [open,setOpen]=useState(false);
 const buttonRef=useRef<HTMLButtonElement>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const menuRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open)return;
  const old=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus();
  function key(event:KeyboardEvent){
   if(event.key==='Escape'){event.preventDefault();setOpen(false);return;}
   if(event.key!=='Tab'||!menuRef.current)return;
   const nodes=[...menuRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')];
   if(!nodes.length)return;
   if(event.shiftKey&&document.activeElement===nodes[0]){event.preventDefault();nodes[nodes.length-1].focus();}
   if(!event.shiftKey&&document.activeElement===nodes[nodes.length-1]){event.preventDefault();nodes[0].focus();}
  }
  window.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);buttonRef.current?.focus();};
 },[open]);
 return <>
  <a className="art-skip" href="#main">Skip to content</a>
  <header className="art-header">
   <Link href="/" className="art-wordmark" aria-label="Raj Suhandani, homepage"><Signature/></Link>
   <nav className="art-header-links" aria-label="Main navigation">
    {links.slice(0,3).map(item=><a href={item.href} key={item.href}>{item.label}</a>)}
   </nav>
   <div className="art-header-right">
    <a className="art-hello" href="#contact">Say hello <ArrowUpRight size={17}/></a>
    <button className="art-menu-button" type="button" ref={buttonRef} onClick={()=>setOpen(true)} aria-label="Open navigation" aria-haspopup="dialog" aria-controls="art-menu" aria-expanded={open}><Menu size={24}/></button>
   </div>
  </header>
  {open?<div className="art-menu-scrim" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false);}}>
   <div className="art-menu" ref={menuRef} id="art-menu" role="dialog" aria-label="Menu" aria-modal="true">
    <div className="art-menu-top"><span>Find your way around</span><button type="button" ref={closeRef} onClick={()=>setOpen(false)}>Close <X size={20}/></button></div>
    <nav aria-label="Mobile navigation">{links.map((item,index)=><a href={item.href} key={item.href} onClick={()=>setOpen(false)}><small>0{index+1}</small>{item.label}<ArrowUpRight size={23}/></a>)}<Link href="/resume" onClick={()=>setOpen(false)}><small>05</small>Resume<ArrowUpRight size={23}/></Link></nav>
    <a className="art-menu-email" href="mailto:rajsuhandani11@gmail.com">Have something in mind? Let's talk. <ArrowUpRight size={20}/></a>
   </div>
  </div>:null}
 </>;
}
