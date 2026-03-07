'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 180;
const TWO_PI = Math.PI * 2;

interface Particle {
  // spiral orbit params
  cx: number;        // orbit center x (0–1 normalised)
  cy: number;        // orbit center y (0–1 normalised)
  radius: number;    // orbit radius in px
  angle: number;     // current angle (radians)
  speed: number;     // radians per ms
  drift: number;     // slow radial drift speed (px/ms)
  driftDir: number;  // +1 / -1 expand or contract
  minR: number;      // min orbit radius
  maxR: number;      // max orbit radius
  size: number;      // dot radius (px)
  // colour phase — each particle has its own offset so colours stagger
  colorOffset: number;
  colorSpeed: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// White → Blue → Teal palette (hue degrees: 0≈white, 210=blue, 180=teal)
function particleColor(phase: number, opacity: number): string {
  // phase 0–1 cycles: white → blue → teal → white
  const t = (Math.sin(phase * TWO_PI) * 0.5) + 0.5; // 0..1
  // Interpolate through three keyframes
  let r: number, g: number, b: number;
  if (t < 0.5) {
    // white → teal
    const s = t / 0.5;
    r = Math.round(lerp(255, 0,   s));
    g = Math.round(lerp(255, 210, s));
    b = Math.round(lerp(255, 220, s));
  } else {
    // teal → blue
    const s = (t - 0.5) / 0.5;
    r = Math.round(lerp(0,   30,  s));
    g = Math.round(lerp(210, 130, s));
    b = Math.round(lerp(220, 255, s));
  }
  return `rgba(${r},${g},${b},${opacity.toFixed(3)})`;
}

function makeParticle(W: number, H: number): Particle {
  const angle = Math.random() * TWO_PI;
  const minR  = 20 + Math.random() * 80;
  const maxR  = minR + 40 + Math.random() * 140;
  const radius = minR + Math.random() * (maxR - minR);
  return {
    cx:           Math.random(),
    cy:           Math.random(),
    radius,
    angle,
    speed:        (0.0002 + Math.random() * 0.0005) * (Math.random() < 0.5 ? 1 : -1),
    drift:        0.008 + Math.random() * 0.018,
    driftDir:     Math.random() < 0.5 ? 1 : -1,
    minR,
    maxR,
    size:         0.8 + Math.random() * 2.2,
    colorOffset:  Math.random(),
    colorSpeed:   0.00006 + Math.random() * 0.00012,
    opacity:      0.15 + Math.random() * 0.65,
    opacityTarget:0.15 + Math.random() * 0.65,
    opacitySpeed: 0.0004 + Math.random() * 0.0008,
  };
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const particles: Particle[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialise particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(makeParticle(W, H));
    }

    let running = true;
    let last = 0;

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last, 50); // cap delta
      last = now;

      ctx.clearRect(0, 0, W, H);
      // Pure black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        // Advance angle
        p.angle += p.speed * dt;

        // Pulsing orbit radius (spiral in/out)
        p.radius += p.drift * p.driftDir * dt * 0.04;
        if (p.radius > p.maxR) { p.driftDir = -1; }
        if (p.radius < p.minR) { p.driftDir =  1; }

        // Opacity breathing
        p.opacity += (p.opacityTarget - p.opacity) * p.opacitySpeed * dt;
        if (Math.abs(p.opacity - p.opacityTarget) < 0.02) {
          p.opacityTarget = 0.08 + Math.random() * 0.7;
        }

        // Colour phase advance
        p.colorOffset = (p.colorOffset + p.colorSpeed * dt) % 1;

        // World position
        const x = p.cx * W + Math.cos(p.angle) * p.radius;
        const y = p.cy * H + Math.sin(p.angle) * p.radius;

        // Skip if outside canvas (avoids dot leaking onto edges)
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;

        const color = particleColor(p.colorOffset, Math.max(0, Math.min(1, p.opacity)));

        // Soft glow: larger transparent circle first, then crisp dot
        const glowR = p.size * 3.5;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        const baseAlpha = Math.max(0, Math.min(1, p.opacity)) * 0.25;
        grd.addColorStop(0,   color.replace(/[\d.]+\)$/, `${baseAlpha})`));
        grd.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, TWO_PI);
        ctx.fillStyle = grd;
        ctx.fill();

        // Solid dot core
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, TWO_PI);
        ctx.fillStyle = color;
        ctx.fill();
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame((now) => { last = now; requestAnimationFrame(tick); });

    return () => {
      running = false;
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
      }}
    />
  );
}
