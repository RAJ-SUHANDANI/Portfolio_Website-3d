'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const studioSlides = [
  '/studio/beyond-gravity.png',
  '/studio/meme-is-mine.jpg',
  '/studio/convotools-logo.svg',
  '/studio/savora.jpg',
  '/studio/veyra.png'
] as const;

const strokes = ['#ef4931', '#e7b88d', '#a4d2d2', '#e5d0a3', '#b9c3ff'];
const clamp = THREE.MathUtils.clamp;

function aWrappedOffset(index: number, selected: number, count: number) {
  let delta = index - selected;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

function Card({ index, selected, map }: { index: number; selected: number; map: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  const offset = aWrappedOffset(index, selected, studioSlides.length);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const t = Math.min(dt, 0.05);
    const z = offset === 0 ? .62 : -Math.abs(offset) * 1.12;
    const x = offset * 1.55;
    const y = offset === 0 ? .14 : -.12 + Math.abs(offset) * .09;
    g.position.x = THREE.MathUtils.damp(g.position.x, x, 5.5, t);
    g.position.y = THREE.MathUtils.damp(g.position.y, y, 5.5, t);
    g.position.z = THREE.MathUtils.damp(g.position.z, z, 5.5, t);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -offset * .33, 5.5, t);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, offset * -.035, 5.5, t);
    const s = THREE.MathUtils.damp(g.scale.x, offset === 0 ? 1.05 : .89, 5.5, t);
    g.scale.setScalar(s);
  });

  return (
    <group ref={group} position={[offset * 1.55, .1, offset === 0 ? .62 : -Math.abs(offset) * 1.12]} rotation={[0, -offset * .33, offset * -.035]} scale={offset === 0 ? 1.05 : .89}>
      <RoundedBox args={[3.2, 2.38, .13]} radius={.045} smoothness={4}>
        <meshStandardMaterial color="#d9d5ce" metalness={.22} roughness={.48} />
      </RoundedBox>
      <mesh position={[0, .2, .073]}>
        <planeGeometry args={[3.02, 1.78]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      <mesh position={[0, -1.015, .079]}>
        <planeGeometry args={[3.06, .09]} />
        <meshBasicMaterial color={strokes[index]} toneMapped={false} />
      </mesh>
      <mesh position={[-1.36, -.82, .078]}>
        <circleGeometry args={[.05, 22]} />
        <meshBasicMaterial color="#22211f" />
      </mesh>
      <mesh position={[-1.18, -.82, .078]}>
        <circleGeometry args={[.027, 22]} />
        <meshBasicMaterial color="#22211f" />
      </mesh>
      <mesh position={[1.35, -.82, .078]}>
        <boxGeometry args={[.27, .026, .01]} />
        <meshBasicMaterial color="#22211f" />
      </mesh>
      <mesh position={[0, 0, -.085]}>
        <planeGeometry args={[3.05, 2.27]} />
        <meshBasicMaterial color="#22211f" />
      </mesh>
    </group>
  );
}

function CardCollection({ selected, pointer }: { selected: number; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const textures = useTexture([...studioSlides]);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const t = Math.min(dt, .05);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * .065, 2.1, t);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * .045, 2.1, t);
  });

  return (
    <group ref={group}>
      {textures.map((map, index) => <Card key={studioSlides[index]} index={index} selected={selected} map={map} />)}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.53, -1.0]} scale={[1, .43, 1]}>
        <circleGeometry args={[3.2, 90]} />
        <meshBasicMaterial color="#181918" transparent opacity={.08} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function StudioCarousel3D({ selected }: { selected: number }) {
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setSupported(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = clamp(((event.clientX - rect.left) / rect.width - .5) * 2, -1, 1);
    pointer.current.y = clamp(((event.clientY - rect.top) / rect.height - .5) * 2, -1, 1);
  };

  if (!supported) {
    return (
      <div className="studio-stage-fallback" ref={host}>
        <img src={studioSlides[selected]} alt="" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="studio-stage-canvas" ref={host} onPointerMove={onPointerMove} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
      <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 1.45]} camera={{ position: [0, .2, 6.8], fov: 38 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} aria-hidden="true">
        <ambientLight intensity={1.65} />
        <hemisphereLight args={['#f5f1e7', '#b6aea1', 1.9]} />
        <directionalLight position={[-4, 6, 6]} intensity={3.4} color="#fff8ed" />
        <directionalLight position={[4, 2, -3]} intensity={2} color="#ffffff" />
        <Suspense fallback={null}>
          <CardCollection selected={selected} pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}