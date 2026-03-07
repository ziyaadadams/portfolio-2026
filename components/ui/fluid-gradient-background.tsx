'use client';

import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  r: number;
  ax: number; // x-axis amplitude (0–1 relative to canvas)
  ay: number; // y-axis amplitude
  fx: number; // x frequency
  fy: number; // y frequency
  px: number; // x phase
  py: number; // y phase
  color: [number, number, number];
  speed: number;
}

const ORBS: Orb[] = [
  { x: 0.2,  y: 0.3,  r: 0.55, ax: 0.35, ay: 0.3,  fx: 0.00019, fy: 0.00013, px: 0,    py: 1.1,  color: [100,  20, 220], speed: 1 },
  { x: 0.7,  y: 0.6,  r: 0.5,  ax: 0.28, ay: 0.38, fx: 0.00014, fy: 0.00017, px: 0.8,  py: 2.4,  color: [ 20,  80, 255], speed: 1 },
  { x: 0.5,  y: 0.15, r: 0.48, ax: 0.4,  ay: 0.25, fx: 0.00023, fy: 0.00011, px: 1.6,  py: 0.3,  color: [  0, 180, 200], speed: 1 },
  { x: 0.85, y: 0.8,  r: 0.44, ax: 0.3,  ay: 0.4,  fx: 0.00016, fy: 0.00021, px: 3.1,  py: 1.9,  color: [200,  20, 160], speed: 1 },
  { x: 0.1,  y: 0.75, r: 0.42, ax: 0.25, ay: 0.3,  fx: 0.00021, fy: 0.00015, px: 4.7,  py: 0.6,  color: [ 20, 160,  90], speed: 1 },
  { x: 0.6,  y: 0.5,  r: 0.38, ax: 0.5,  ay: 0.45, fx: 0.00012, fy: 0.00018, px: 2.3,  py: 3.8,  color: [255,  60,  40], speed: 1 },
];

export function FluidGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let running = true;

    const draw = (t: number) => {
      if (!running) return;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'screen';

      for (const orb of ORBS) {
        const cx = (orb.x + orb.ax * Math.sin(t * orb.fx + orb.px)) * W;
        const cy = (orb.y + orb.ay * Math.cos(t * orb.fy + orb.py)) * H;
        const radius = orb.r * Math.min(W, H);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = orb.color;
        grad.addColorStop(0,   `rgba(${r},${g},${b},0.55)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.22)`);
        grad.addColorStop(0.75,`rgba(${r},${g},${b},0.06)`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      // Subtle vignette to keep edges dark
      const vig = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.75);
      vig.addColorStop(0,   'rgba(0,0,0,0)');
      vig.addColorStop(0.6, 'rgba(0,0,0,0.15)');
      vig.addColorStop(1,   'rgba(0,0,0,0.7)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(60px) saturate(1.4)',
      }}
    />
  );
}
