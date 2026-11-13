'use client';
import {useState} from 'react';
import {ArrowUpRight,Monitor,Smartphone} from 'lucide-react';
import {capture} from '@/lib/projectMedia';
export default function ProjectHeroVisual({slug,name,live}:{slug:string;name:string;live?:string}){
 const [viewport,setViewport]=useState<'desktop'|'mobile'>('desktop');
 return <div className="art-case-stage">
  <div className="art-case-stage-top"><span>Real website screenshots</span><div className="art-case-stage-switch" role="group" aria-label="Choose a screenshot size"><button type="button" aria-pressed={viewport==='desktop'} onClick={()=>setViewport('desktop')}><Monitor size={16}/> Desktop</button><button type="button" aria-pressed={viewport==='mobile'} onClick={()=>setViewport('mobile')}><Smartphone size={16}/> Phone</button></div></div>
  <div className={'art-case-frame art-case-frame-'+viewport}><div className="art-case-frame-bar"><span>● ● ●</span><span>{name} in the browser</span></div><img key={viewport} src={capture(slug,viewport)} alt={'Real '+viewport+' screenshot of '+name+' website'} width={viewport==='desktop'?1560:420} height={viewport==='desktop'?980:912} decoding="async"/></div>
  <div className="art-case-stage-bottom"><span>Captured November 13, 2026</span>{live?<a href={live} target="_blank" rel="noopener noreferrer">Open website <ArrowUpRight size={16}/></a>:null}</div>
 </div>;
}