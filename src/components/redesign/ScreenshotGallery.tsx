'use client';
import {useRef,useState} from 'react';
import {Maximize2,X} from 'lucide-react';
export type GalleryShot={src:string;alt:string;label:string};
export default function ScreenshotGallery({shots}:{shots:GalleryShot[]}){
 const dialog=useRef<HTMLDialogElement>(null);
 const [active,setActive]=useState(0);
 function open(index:number){setActive(index);dialog.current?.showModal();}
 return <>
  <div className="art-case-gallery">{shots.map((shot,index)=><figure key={shot.src} data-motion="visual" data-motion-order={index+1}><button type="button" className="art-case-gallery-image" aria-label={'Enlarge '+shot.label} onClick={()=>open(index)}><img src={shot.src} alt={shot.alt} loading="lazy" decoding="async"/><span><Maximize2 size={18}/> View full size</span></button><figcaption>{String(index+1).padStart(2,'0')}. {shot.label}</figcaption></figure>)}</div>
  <dialog ref={dialog} className="art-case-lightbox" aria-label="Enlarged project screenshot" onClick={event=>{if(event.target===dialog.current)dialog.current.close();}}><div className="art-case-lightbox-inside"><div><span>{shots[active]?.label}</span><button type="button" onClick={()=>dialog.current?.close()}>Close <X size={20}/></button></div>{shots[active]?<img src={shots[active].src} alt={shots[active].alt}/>:null}</div></dialog>
 </>;
}