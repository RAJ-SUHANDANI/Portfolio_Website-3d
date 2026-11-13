'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

type PointerState = MutableRefObject<{ x: number; y: number }>;

function KineticInstrument({ mode, pointer }: { mode: number; pointer: PointerState }) {
  const root = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const clock = useRef(0);

  useFrame((_, delta) => {
    if (!root.current || !inner.current || !rings.current) return;
    const dt = Math.min(delta, .05);
    const speed = mode === 2 ? 1.65 : mode === 1 ? .13 : .46;
    clock.current += dt * speed;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * .34 + clock.current * .27, 2.8, dt);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -.1 + pointer.current.y * .22, 2.7, dt);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, mode === 1 ? .42 : -.2, 2, dt);
    inner.current.rotation.x = THREE.MathUtils.damp(inner.current.rotation.x, mode === 1 ? 0 : clock.current * .29, 2.6, dt);
    inner.current.rotation.y = THREE.MathUtils.damp(inner.current.rotation.y, mode === 1 ? 0 : -clock.current * .17, 2.3, dt);
    const ringScale = mode === 1 ? .83 : mode === 2 ? 1.11 + Math.sin(clock.current * 3) * .075 : 1;
    rings.current.scale.setScalar(THREE.MathUtils.damp(rings.current.scale.x, ringScale, 3, dt));
  });

  return (
    <group ref={root} scale={1.04}>
      <group ref={rings}>
        <mesh rotation={[.48, .15, .2]}>
          <torusGeometry args={[2.04, .105, 14, 148]} />
          <meshPhysicalMaterial color="#d3ddc9" metalness={.87} roughness={.19} />
        </mesh>
        <mesh rotation={[1.35, -.52, .12]}>
          <torusGeometry args={[1.69, .085, 12, 128]} />
          <meshPhysicalMaterial color="#8e9d9b" metalness={.86} roughness={.26} />
        </mesh>
        <mesh rotation={[.2, 1.05, .5]}>
          <torusGeometry args={[1.81, .055, 10, 132]} />
          <meshStandardMaterial color="#e3edb5" metalness={.47} roughness={.29} />
        </mesh>
        <mesh rotation={[.55, .1, -.12]} position={[.12, -.08, 0]}>
          <torusGeometry args={[2.42, .014, 8, 150]} />
          <meshBasicMaterial color="#a7b395" transparent opacity={.42} />
        </mesh>
      </group>
      <group ref={inner}>
        <mesh>
          <torusKnotGeometry args={[.92, .28, 190, 20, 2, 3]} />
          <meshPhysicalMaterial color="#c4d1c5" metalness={.83} roughness={.18} clearcoat={.8} clearcoatRoughness={.23} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[.54, 2]} />
          <meshStandardMaterial color="#151a19" metalness={.48} roughness={.25} flatShading />
        </mesh>
      </group>
      <mesh position={[1.91, .57, .28]}>
        <icosahedronGeometry args={[.22, 2]} />
        <meshStandardMaterial color="#dfff84" roughness={.28} metalness={.2} />
      </mesh>
      <mesh position={[-1.75, -.83, .4]}>
        <sphereGeometry args={[.115, 22, 16]} />
        <meshStandardMaterial color="#edeee7" metalness={.6} roughness={.2} />
      </mesh>
      <mesh position={[.4, -2.36, -.6]}>
        <octahedronGeometry args={[.095]} />
        <meshStandardMaterial color="#dfff84" metalness={.24} roughness={.25} />
      </mesh>
    </group>
  );
}

export default function AwardArtifactScene({ mode }: { mode: number }) {
  const [supported, setSupported] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ok = false;
    try {
      const canvas = document.createElement('canvas');
      ok = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch { ok = false; }
    setSupported(ok);
  }, []);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2;
      pointer.current.y = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => window.removeEventListener('pointermove', onPointer);
  }, []);

  if (!supported) return <div className="award-artifact-fallback" data-mode={mode} aria-hidden="true"><span /><span /><span /><b>R/S</b></div>;

  return (
    <Canvas aria-hidden="true" dpr={[1, 1.5]} camera={{ position: [0, .2, 7.9], fov: 42, near: .1, far: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.2} color="#f0eedf" />
      <hemisphereLight args={['#f9f5d9', '#303c3e', 2.1]} />
      <directionalLight position={[3, 5, 6]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-5, 1, -4]} intensity={2.5} color="#a6bf9f" />
      <pointLight position={[0, -3, 4]} intensity={22} color="#ddfa7a" distance={8} />
      <KineticInstrument mode={mode} pointer={pointer} />
    </Canvas>
  );
}