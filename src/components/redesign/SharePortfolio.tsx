'use client';
import {useState} from 'react';
import {Check,Share2} from 'lucide-react';

export default function SharePortfolio(){
 const [label,setLabel]=useState('Share this portfolio');
 async function share(){
  const url=window.location.href;
  const title='Raj Suhandani: the work so far';
  if(typeof navigator.share==='function'){
   try{await navigator.share({title,url});setLabel('Thanks for sharing');return;}
   catch(error){if(error instanceof DOMException && error.name==='AbortError')return;}
  }
  try{await navigator.clipboard.writeText(url);setLabel('Link copied');}
  catch{setLabel('Copy the link from your address bar');}
 }
 return <button type="button" className="art-share-button" onClick={share} aria-label={label} aria-live="polite">{label==='Link copied'||label==='Thanks for sharing'?<Check size={16}/>:<Share2 size={16}/>} {label}</button>;
}
