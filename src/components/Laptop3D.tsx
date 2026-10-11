'use client';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei';
import {Suspense,useCallback,useEffect,useMemo,useRef} from 'react';
import type {PointerEvent as ReactPointerEvent,MutableRefObject} from 'react';
import * as THREE from 'three';

type State={x:number;y:number;hoverX:number;hoverY:number;scroll:number;dragging:boolean};
const clamp=THREE.MathUtils.clamp;
function Screen(){
 const map=useMemo(()=>{const c=document.createElement('canvas');c.width=640;c.height=400;const x=c.getContext('2d');if(!x)return null;x.fillStyle='#101b23';x.fillRect(0,0,640,400);x.fillStyle='#26363d';x.fillRect(0,0,640,50);x.fillStyle='#c7ee96';x.font='bold 20px monospace';x.fillText('RAJ / DEV WORKSPACE',35,32);x.fillStyle='#d5e9da';x.font='20px monospace';['const developer = {','  name: "Raj Suhandani",','  craft: ["Web", "3D", "UI"],','  aim: "Build something real"','};','','// Interactive by design'].forEach((line,i)=>x.fillText(line,38,100+i*39));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t},[]);
 useEffect(()=>()=>map?.dispose(),[map]);
 return map?<mesh position={[0,1.17,.075]}><planeGeometry args={[3.3,2.06]}/><meshBasicMaterial map={map} toneMapped={false}/></mesh>:null;
}
function Machine({state}:{state:MutableRefObject<State>}){
 const root=useRef<THREE.Group>(null),lid=useRef<THREE.Group>(null);const {invalidate}=useThree();
 useFrame((_,d)=>{if(!root.current||!lid.current)return;const s=state.current,dt=Math.min(d,.05);
 const yaw=-.25+s.y+s.hoverX*.1+s.scroll*.9,pitch=.08+s.x-s.hoverY*.07-s.scroll*.14,open=-.2-s.scroll*.14;
 root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,yaw,7,dt);
 root.current.rotation.x=THREE.MathUtils.damp(root.current.rotation.x,pitch,7,dt);
 root.current.position.y=THREE.MathUtils.damp(root.current.position.y,-.45+s.scroll*.3,5,dt);
 lid.current.rotation.x=THREE.MathUtils.damp(lid.current.rotation.x,open,4,dt);
 if(Math.max(Math.abs(root.current.rotation.y-yaw),Math.abs(root.current.rotation.x-pitch),Math.abs(root.current.position.y-(-.45+s.scroll*.3)),Math.abs(lid.current.rotation.x-open))>.001)invalidate();
 });
 return <group ref={root} position={[0,-.45,0]} rotation={[.08,-.25,0]}>
 <RoundedBox args={[3.55,.15,2.5]} radius={.08}><meshStandardMaterial color="#9aa9af" metalness={.7} roughness={.28}/></RoundedBox>
 {Array.from({length:5},(_,r)=>Array.from({length:13},(_,i)=><mesh key={r+'-'+i} position={[-1.57+i*.26,.08,-.84+r*.29]}><boxGeometry args={[.21,.016,.205]}/><meshStandardMaterial color="#223039"/></mesh>))}
 <RoundedBox args={[.91,.014,.52]} radius={.04} position={[0,.09,.76]}><meshStandardMaterial color="#72858e" metalness={.6}/></RoundedBox>
 <group ref={lid} position={[0,.075,-1.18]} rotation={[.95,0,0]}>
 <RoundedBox args={[3.52,2.35,.12]} radius={.06} position={[0,1.17,0]}><meshStandardMaterial color="#91a3ac" metalness={.72} roughness={.28}/></RoundedBox>
 <mesh position={[0,1.17,.063]}><planeGeometry args={[3.38,2.16]}/><meshBasicMaterial color="#050c11"/></mesh><Screen/></group></group>;
}
function Scene({state,setInvalidate}:{state:MutableRefObject<State>;setInvalidate:(f:()=>void)=>void}){
 const {invalidate}=useThree();
 useEffect(()=>{setInvalidate(invalidate);const scroll=()=>{const next=clamp(window.scrollY/Math.max(window.innerHeight*.85,500),0,1);if(Math.abs(next-state.current.scroll)>.002){state.current.scroll=next;invalidate()}};scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[state,invalidate,setInvalidate]);
 return <><ambientLight intensity={1.7}/><hemisphereLight args={['#dbeffa','#505d62',1.4]}/><directionalLight position={[3,6,7]} intensity={3}/><directionalLight position={[-5,3,-4]} intensity={2} color="#b3c7ff"/><Machine state={state}/></>;
}
export default function Laptop3D(){
 const state=useRef<State>({x:0,y:0,hoverX:0,hoverY:0,scroll:0,dragging:false}),last=useRef({x:0,y:0}),invalidate=useRef<()=>void>(()=>{});
 const attach=useCallback((f:()=>void)=>{invalidate.current=f},[]);
 const down=(e:ReactPointerEvent<HTMLDivElement>)=>{if(!e.isPrimary)return;state.current.dragging=true;last.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);invalidate.current()};
 const move=(e:ReactPointerEvent<HTMLDivElement>)=>{const s=state.current;if(s.dragging&&e.currentTarget.hasPointerCapture(e.pointerId)){s.y=clamp(s.y+(e.clientX-last.current.x)*.009,-1.15,1.15);s.x=clamp(s.x+(e.clientY-last.current.y)*.006,-.4,.4);last.current={x:e.clientX,y:e.clientY}}else if(e.pointerType==='mouse'){const r=e.currentTarget.getBoundingClientRect();s.hoverX=((e.clientX-r.left)/r.width-.5)*2;s.hoverY=((e.clientY-r.top)/r.height-.5)*2}invalidate.current()};
 const up=(e:ReactPointerEvent<HTMLDivElement>)=>{state.current.dragging=false;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);invalidate.current()};
 return <div className="laptop-interaction-shell"><div className="laptop-interaction-zone" aria-label="Drag to rotate the laptop. Scroll the page to move it." onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={()=>{state.current.hoverX=0;state.current.hoverY=0;invalidate.current()}}>
 <Canvas className="laptop-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,1.2,7],fov:39}} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}><Suspense fallback={null}><Scene state={state} setInvalidate={attach}/></Suspense></Canvas></div>
 <button className="laptop-reset" onClick={()=>{state.current.x=0;state.current.y=0;invalidate.current()}} type="button">RESET VIEW ↺</button></div>;
}