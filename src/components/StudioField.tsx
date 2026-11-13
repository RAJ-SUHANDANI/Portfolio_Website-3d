'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, RotateCcw } from 'lucide-react';

type Controls = { tension: number; detail: number };
type Pointer = { x: number; y: number; active: boolean };

export default function StudioField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<Pointer>({ x: .5, y: .5, active: false });
  const controls = useRef<Controls>({ tension: 52, detail: 19 });
  const [tension, setTension] = useState(52);
  const [detail, setDetail] = useState(19);
  const [frame, setFrame] = useState(0);
  const [isReduced, setIsReduced] = useState(false);
  const visible = useRef(true);
  const animationFrame = useRef<number>(0);
  const phase = useRef(0);

  useEffect(() => {
    controls.current = { tension, detail };
  }, [tension, detail]);

  const draw = useCallback((dt = 0) => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d', { alpha: false });
    if (!ctx) return;
    const rect = el.getBoundingClientRect();
    const width = Math.max(300, rect.width);
    const height = Math.max(250, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(width * dpr), H = Math.round(height * dpr);
    if (el.width !== W || el.height !== H) {
      el.width = W;
      el.height = H;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#edeee9';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#b6b9ae';
    ctx.lineWidth = 1;

    if (!isReduced) phase.current += Math.min(dt, .06) * .42;

    const cols = controls.current.detail;
    const rows = Math.round(cols * .62);
    const left = width * .075;
    const top = height * .13;
    const w = width * .85;
    const h = height * .74;
    const radius = Math.min(w, h) * .39;
    const force = controls.current.tension / 100;
    const originX = pointer.current.active ? pointer.current.x * width : width * .48;
    const originY = pointer.current.active ? pointer.current.y * height : height * .46;

    const bend = (x: number, y: number) => {
      const dx = x - originX;
      const dy = y - originY;
      const falloff = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
      const sign = Math.sin((x / width) * 7 + (y / height) * 6 + phase.current);
      return {
        x: x + Math.sin(dy / 85 + phase.current) * 13 * force + dx * falloff * force * -.58,
        y: y + sign * 7 * force + dy * falloff * force * -.72
      };
    };
    for (let row = 0; row <= rows; row++) {
      ctx.beginPath();
      for (let column = 0; column <= cols * 6; column++) {
        const x = left + (column / (cols * 6)) * w;
        const y = top + (row / rows) * h;
        const p = bend(x, y);
        if (column === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let col = 0; col <= cols; col++) {
      ctx.beginPath();
      for (let row = 0; row <= rows * 6; row++) {
        const x = left + (col / cols) * w;
        const y = top + (row / (rows * 6)) * h;
        const p = bend(x, y);
        if (row === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    const marker = pointer.current.active ? { x: originX, y: originY } : bend(width * .5, height * .46);
    ctx.strokeStyle = '#e44b2f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(marker.x, marker.y, 14, 0, Math.PI * 2);
    ctx.moveTo(marker.x - 20, marker.y);
    ctx.lineTo(marker.x + 20, marker.y);
    ctx.moveTo(marker.x, marker.y - 20);
    ctx.lineTo(marker.x, marker.y + 20);
    ctx.stroke();
    ctx.font = '11px monospace';
    ctx.fillStyle = '#666c63';
    ctx.fillText('FIELD / 001', 20, 26);
    ctx.fillText('X ' + Math.round(marker.x).toString().padStart(3, '0') + '    Y ' + Math.round(marker.y).toString().padStart(3, '0'), 20, height - 22);
    ctx.textAlign = 'right';
    ctx.fillText('DRAG TO DISTURB THE FIELD', width - 20, height - 22);
    ctx.textAlign = 'left';
  }, [isReduced]);

  useEffect(() => {
    setIsReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const host = canvas.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (visible.current && !animationFrame.current) animationFrame.current = requestAnimationFrame(loop);
    }, { rootMargin: '120px' });
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      draw(dt);
      animationFrame.current = !isReduced && visible.current ? requestAnimationFrame(loop) : 0;
    };
    observer.observe(host);
    animationFrame.current = requestAnimationFrame(loop);
    const onResize = () => draw(0);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = 0;
    };
  }, [draw, isReduced, frame]);

  const movePointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - box.left) / box.width,
      y: (event.clientY - box.top) / box.height,
      active: true
    };
    if (isReduced) draw();
  };
  const save = () => {
    if (!canvas.current) return;
    draw();
    const link = document.createElement('a');
    link.href = canvas.current.toDataURL('image/png');
    link.download = 'raj-suhandani-field-study.png';
    link.click();
  };
  const reset = () => {
    setTension(52);
    setDetail(19);
    pointer.current = { x: .5, y: .5, active: false };
    phase.current = 0;
    setFrame(v => v + 1);
  };

  return (
    <div className="studio-field">
      <div className="studio-field-board">
        <canvas ref={canvas} role="img" aria-label="Interactive field of curved grid lines; move your pointer or adjust the sliders to change the pattern"
          onPointerMove={movePointer} onPointerLeave={() => { pointer.current.active = false; if (isReduced) draw(); }} />
      </div>
      <div className="studio-field-controls">
        <div className="studio-field-title">
          <span>CODE SKETCH 001 / INTERACTIVE STUDY</span>
          <strong>An imperfect grid.</strong>
          <p>A small experiment in translating movement into form. Disturb the field, tune the parameters, then take a frame home.</p>
        </div>
        <div className="studio-field-knobs">
          <label>01 — TENSION <output>{tension}%</output>
            <input type="range" min="0" max="100" value={tension} onChange={e => setTension(Number(e.target.value))} />
          </label>
          <label>02 — DETAIL <output>{detail}</output>
            <input type="range" min="10" max="32" step="1" value={detail} onChange={e => setDetail(Number(e.target.value))} />
          </label>
          <div className="studio-field-actions">
            <button type="button" onClick={reset}><RotateCcw size={15} /> RESET</button>
            <button type="button" onClick={save}><ArrowDownToLine size={15} /> SAVE THE FRAME</button>
          </div>
        </div>
      </div>
    </div>
  );
}