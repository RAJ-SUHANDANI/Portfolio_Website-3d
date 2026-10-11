'use client';

import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei';
import {Suspense,useCallback,useEffect,useMemo,useRef,useState} from 'react';
import type {PointerEvent as ReactPointerEvent,MutableRefObject} from 'react';
import * as THREE from 'three';

type Interaction={yaw:number;pitch:number;hoverX:number;hoverY:number;scroll:number;dragging:boolean};
type Props={name:string;slug:string;accent:string;previewUrl?:string;previewLabel:string};
const limit=THREE.MathUtils.clamp;

function LaptopScreen({name,accent,previewUrl}:{name:string;accent:string;previewUrl?:string}){
  const invalidate=useThree(state=>state.invalidate);
  const texture=useMemo(()=>{
    const element=document.createElement('canvas');
    element.width=900;element.height=550;
    const ctx=element.getContext('2d');
    if(!ctx)return null;
    const fill=(x:number,y:number,w:number,h:number,color:string)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h)};
    const text=(label:string,x:number,y:number,size:number,color:string,weight=500)=>{ctx.fillStyle=color;ctx.font=`${weight} ${size}px Arial, sans-serif`;ctx.fillText(label,x,y)};
    fill(0,0,900,550,'#111a24');
    fill(0,0,900,58,'#1a2834');
    for(let i=0;i<3;i++){ctx.beginPath();ctx.fillStyle=['#ee6a72','#e9c875','#89cba1'][i];ctx.arc(31+i*25,29,6,0,Math.PI*2);ctx.fill()}
    text(name.toUpperCase(),134,36,20,'#eff9f7',700);
    fill(0,58,175,492,'#14212c');
    text('WORKSPACE',22,111,15,accent,700);
    for(let i=0;i<5;i++){fill(22,145+i*61,126,13,i===0?accent:'#435463');fill(22,169+i*61,90+(i%2)*26,7,'#334754')}
    text('OVERVIEW',210,125,18,accent,700);
    text('A clearer way to explore',210,178,37,'#f2f5ee',700);
    fill(210,213,630,1,'#394b56');
    for(let i=0;i<3;i++){const x=210+i*216;fill(x,244,194,112,i===1?'#334454':'#263742');text(['ACTIVITY','OVERVIEW','INSIGHTS'][i],x+17,276,13,'#b9ceca',700);text(['24','86%','07'][i],x+17,329,43,i===1?accent:'#f0f5f2',700)}
    fill(210,384,630,113,'#203440');
    ctx.strokeStyle=accent;ctx.lineWidth=5;ctx.beginPath();for(let i=0;i<10;i++){const x=235+i*64,y=455-Math.sin(i*.84)*18-i*3;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();
    const t=new THREE.CanvasTexture(element);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return {texture:t,element,ctx};
  },[name,accent]);

  useEffect(()=>{
    if(!texture)return;
    if(!previewUrl)return()=>texture.texture.dispose();
    let current=true;
    const img=new Image();
    img.crossOrigin='anonymous';
    img.onload=()=>{if(!current)return;try{
      const {ctx,element}=texture;
      ctx.fillStyle='#111b24';ctx.fillRect(0,0,element.width,element.height);
      const scale=Math.max(element.width/img.width,element.height/img.height);
      const w=img.width*scale,h=img.height*scale;
      ctx.drawImage(img,(element.width-w)/2,(element.height-h)/2,w,h);
      texture.texture.needsUpdate=true;invalidate();
    }catch{/* The locally generated project interface stays visible when browser security blocks a screenshot. */}};
    img.onerror=()=>{/* Keep project specific preview texture when the screenshot cannot load. */};
    img.src=previewUrl;
    return()=>{current=false;img.onload=null;img.onerror=null;texture.texture.dispose()};
  },[texture,previewUrl,invalidate]);
  useEffect(()=>{if(!previewUrl)return;return()=>{}},[previewUrl]);
  return texture?<mesh position={[0,1.16,.079]}><planeGeometry args={[3.3,2.02]}/><meshBasicMaterial map={texture.texture} toneMapped={false}/></mesh>:null;
}
function Computer({motion,name,accent,previewUrl}:{motion:MutableRefObject<Interaction>;name:string;accent:string;previewUrl?:string}){
  const body=useRef<THREE.Group>(null),lid=useRef<THREE.Group>(null);
  const invalidate=useThree(s=>s.invalidate);
  useFrame((_,delta)=>{
    if(!body.current||!lid.current)return;
    const s=motion.current,d=Math.min(delta,.05);
    const yaw=-.22+s.yaw+s.hoverX*.07+s.scroll*.55;
    const pitch=.08+s.pitch-s.hoverY*.035-s.scroll*.10;
    const tilt=-.025+s.scroll*.025;
    const y=-.46+s.scroll*.24;
    const lidAngle=-.12-s.scroll*.10;
    body.current.rotation.y=THREE.MathUtils.damp(body.current.rotation.y,yaw,8,d);
    body.current.rotation.x=THREE.MathUtils.damp(body.current.rotation.x,pitch,8,d);
    body.current.rotation.z=THREE.MathUtils.damp(body.current.rotation.z,tilt,7,d);
    body.current.position.y=THREE.MathUtils.damp(body.current.position.y,y,5,d);
    lid.current.rotation.x=THREE.MathUtils.damp(lid.current.rotation.x,lidAngle,5,d);
    if(Math.abs(body.current.rotation.y-yaw)+Math.abs(body.current.rotation.x-pitch)+Math.abs(body.current.rotation.z-tilt)+Math.abs(body.current.position.y-y)+Math.abs(lid.current.rotation.x-lidAngle)>.002)invalidate();
  });
  return <group ref={body} rotation={[.08,-.22,-.025]} position={[0,-.46,0]}>
    <RoundedBox args={[3.6,.13,2.53]} radius={.08} smoothness={4}><meshStandardMaterial color="#a6b1b6" metalness={.69} roughness={.32}/></RoundedBox>
    <mesh position={[0,.07,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[3.25,2.24]}/><meshStandardMaterial color="#28333a" metalness={.15} roughness={.63}/></mesh>
    {Array.from({length:5},(_,row)=>Array.from({length:12},(_,col)=><mesh key={row+'-'+col} position={[-1.5+col*.269,.082,-.91+row*.32]}><boxGeometry args={[.22,.024,.25]}/><meshStandardMaterial color="#182229" roughness={.56}/></mesh>))}
    <RoundedBox args={[.86,.012,.47]} radius={.03} position={[0,.084,.82]}><meshStandardMaterial color="#82969e" metalness={.48}/></RoundedBox>
    <group ref={lid} rotation={[-.12,0,0]} position={[0,.075,-1.19]}>
      <RoundedBox args={[3.55,2.39,.13]} radius={.065} position={[0,1.18,0]}><meshStandardMaterial color="#9dacb4" metalness={.74} roughness={.27}/></RoundedBox>
      <mesh position={[0,1.17,.068]}><planeGeometry args={[3.41,2.16]}/><meshBasicMaterial color="#071117"/></mesh>
      <LaptopScreen name={name} accent={accent} previewUrl={previewUrl}/>
      <mesh position={[0,2.29,.07]}><sphereGeometry args={[.021,10,8]}/><meshBasicMaterial color="#283038"/></mesh>
    </group>
  </group>;
}
function ActiveScene({motion,attach,name,accent,previewUrl}:{motion:MutableRefObject<Interaction>;attach:(fn:()=>void)=>void;name:string;accent:string;previewUrl?:string}){
  const invalidate=useThree(s=>s.invalidate);
  useEffect(()=>{attach(invalidate);const scroll=()=>{const t=limit(window.scrollY/Math.max(window.innerHeight,650),0,1);if(Math.abs(t-motion.current.scroll)>.004){motion.current.scroll=t;invalidate()}};scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[attach,invalidate,motion]);
  return <><ambientLight intensity={1.55}/><hemisphereLight args={['#dae8fd','#303943',1.8]}/><directionalLight position={[3,5,5]} intensity={3.3} color="#fff7e6"/><directionalLight position={[-5,2,-4]} intensity={1.8} color="#adcafb"/><Computer motion={motion} name={name} accent={accent} previewUrl={previewUrl}/></>;
}
export default function ProjectLaptop3D({name,slug,accent,previewUrl,previewLabel}:Props){
  const motion=useRef<Interaction>({yaw:0,pitch:0,hoverX:0,hoverY:0,scroll:0,dragging:false});
  const last=useRef({x:0,y:0});const invalidate=useRef<()=>void>(()=>{});
  const attach=useCallback((cb:()=>void)=>{invalidate.current=cb},[]);
  const down=(e:ReactPointerEvent<HTMLDivElement>)=>{if(!e.isPrimary)return;motion.current.dragging=true;last.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);invalidate.current()};
  const move=(e:ReactPointerEvent<HTMLDivElement>)=>{const s=motion.current;if(s.dragging&&e.currentTarget.hasPointerCapture(e.pointerId)){s.yaw=limit(s.yaw+(e.clientX-last.current.x)*.009,-.95,.95);s.pitch=limit(s.pitch+(e.clientY-last.current.y)*.006,-.32,.33);last.current={x:e.clientX,y:e.clientY}}else if(e.pointerType==='mouse'){const box=e.currentTarget.getBoundingClientRect();s.hoverX=((e.clientX-box.left)/box.width-.5)*2;s.hoverY=((e.clientY-box.top)/box.height-.5)*2}invalidate.current()};
  const up=(e:ReactPointerEvent<HTMLDivElement>)=>{motion.current.dragging=false;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);invalidate.current()};
  return <div className="project-laptop-root" data-project={slug}><div className="project-laptop-target" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={()=>{motion.current.hoverX=0;motion.current.hoverY=0;invalidate.current()}} aria-label={'Drag to rotate a 3D laptop preview of '+name} role="img">
    <Canvas className="project-laptop-canvas" frameloop="demand" dpr={[1,1.35]} camera={{position:[0,1.1,7.4],fov:38}} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}><Suspense fallback={null}><ActiveScene motion={motion} attach={attach} name={name} accent={accent} previewUrl={previewUrl}/></Suspense></Canvas>
  </div><div className="project-laptop-footer"><span>↔ DRAG TO ROTATE</span><span>{previewLabel}</span><button type="button" onClick={()=>{motion.current.yaw=0;motion.current.pitch=0;invalidate.current()}}>RESET VIEW ↺</button></div></div>;
}
