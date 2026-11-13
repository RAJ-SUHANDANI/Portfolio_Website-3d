'use client';
import dynamic from 'next/dynamic';
import {useEffect,useState} from 'react';
const Laptop=dynamic(()=>import('@/components/Laptop3D'),{ssr:false,loading:()=>null});

export default function Workstation(){
 const [enhanced,setEnhanced]=useState(false);
 const [active,setActive]=useState(false);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow=window.matchMedia('(max-width: 760px)');
  function update(){
   let webgl=false;
   try{webgl=!!document.createElement('canvas').getContext('webgl')}catch{webgl=false}
   setEnhanced(webgl&&!reduced.matches&&!narrow.matches);
  }
  update();
  reduced.addEventListener('change',update);
  narrow.addEventListener('change',update);
  return ()=>{reduced.removeEventListener('change',update);narrow.removeEventListener('change',update);};
 },[]);
 useEffect(()=>{
  if(!enhanced){setActive(false);return;}
  const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){setActive(true);observer.disconnect();}},{rootMargin:'150px'});
  const target=document.getElementById('rd-workstation');
  if(target)observer.observe(target);
  return ()=>observer.disconnect();
 },[enhanced]);
 return <div className="rd-machine" id="rd-workstation">
   <div className="rd-machine-static" aria-hidden="true">
    <div className="rd-static-display">
      <div className="rd-static-toolbar"><span/><span/><span/><i>raj / workspace</i></div>
      <div className="rd-static-content"><small>PROJECT INDEX / 2026</small><strong>DESIGN.<br/>ENGINEER.<br/>REPEAT.</strong><span>an independent practice in digital craft</span></div>
    </div>
    <div className="rd-static-base"/>
   </div>
   {enhanced&&active?<div className="rd-machine-canvas"><Laptop/></div>:null}
   <span className="rd-machine-caption">FIG. 01 &nbsp; / &nbsp; DIGITAL WORKSTATION</span>
   <span className="rd-machine-gesture">{enhanced?'DRAG TO ROTATE':'MADE TO EXPLORE'}</span>
 </div>;
}
