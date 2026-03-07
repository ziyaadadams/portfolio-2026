'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { HexagonBackground } from '@/components/ui/hexagon-background';

// ── Data ──────────────────────────────────────────────────────────────────────

const navItems = [
  { label: 'ABOUT US',   href: '#about'      },
  { label: 'PORTFOLIO',  href: '#work'        },
  { label: 'EXPERIENCE', href: '#skills'      },
  { label: 'CAREER',     href: '#experience'  },
];

const workHistory = [
  { company: 'Digital Modus',    role: 'Salesforce Developer', date: '2025 — Present', location: 'Cape Town, South Africa',  description: 'Outsourced Salesforce Developer and Consultant for high-profile enterprise accounts including NHS Professionals (UK Government).', clients: ['NHS / UK Government'] },
  { company: 'BlueSky',          role: 'Salesforce Developer', date: '2022 — 2025',   location: 'Cape Town, South Africa',  description: 'Delivered full-cycle Salesforce projects across banking, FMCG, and global consumer industries.', clients: ['Capitec Bank', 'ABSA', 'Philip Morris'] },
  { company: 'Cloudmuscle B.V.', role: 'Salesforce Developer', date: '2022',          location: 'Remote · Netherlands',    description: 'Development and consulting services as a flexible project resource.', clients: ['Heineken', 'Distell'] },
  { company: 'Cloudsmiths',      role: 'Salesforce Developer', date: '2020 — 2022',   location: 'Cape Town, South Africa',  description: 'Developed and maintained full-stack applications on the Salesforce Platform.', clients: ['Four Paws International'] },
];

const services = [
  { title: 'Apex Development',        description: 'We specialise in Salesforce Apex, crafting custom business logic, batch processes and complex server-side integrations that power enterprise operations.' },
  { title: 'LWC & UI Development',    description: 'Our LWC expertise delivers intuitive, responsive interfaces on the Salesforce platform — ensuring every user interaction is seamless and engaging.' },
  { title: 'Marketing Cloud',         description: 'We build sophisticated customer journeys, automated email campaigns and data extensions for enterprise-scale marketing operations.' },
  { title: 'Integration & APIs',      description: 'We connect Salesforce with your wider tech stack using MuleSoft, REST/SOAP APIs and middleware — bridging legacy systems with modern cloud solutions.' },
  { title: 'IT-Consulting',           description: 'Our Salesforce consulting guides businesses through digital transformation, offering expert insights to optimise platform adoption and strategy.' },
  { title: 'Data Driven Development', description: 'We harness Data Cloud, data modelling and SOQL optimisation to ensure solutions are driven by real insight and aligned with business demands.' },
];

const projects = [
  { company: 'via Digital Modus',  title: 'UK Government Healthcare',    description: 'Patient engagement journeys for NHS Professionals, handling millions of healthcare communications across the UK public health network.', tags: ['Marketing Cloud', 'Data Cloud', 'Apex'],    bg: '#0a0f1e' },
  { company: 'via BlueSky',        title: 'Capitec Bank Fraud System',   description: "Enterprise fraud detection and case management processing thousands of daily alerts for South Africa's largest retail bank.",                tags: ['OmniStudio', 'LWC', 'Flows'],             bg: '#0d0d0d' },
  { company: 'via BlueSky',        title: 'ABSA Complaints Platform',    description: 'Enterprise complaints management integrating Service Cloud with legacy banking systems across multiple African markets.',                  tags: ['Service Cloud', 'Flows', 'Apex'],          bg: '#110a1a' },
  { company: 'via Cloudmuscle',    title: 'Heineken B2B Commerce',       description: 'B2B commerce platform with CPQ and MuleSoft integrations for distributor ordering and account management across Africa.',                 tags: ['CPQ', 'MuleSoft', 'B2B Commerce'],         bg: '#0a1408' },
  { company: 'via Cloudsmiths',    title: 'Four Paws NPSP Migration',    description: 'Global donor data migration to NPSP and automated fundraising workflows deployed across 15 countries.',                                   tags: ['NPSP', 'Data Migration', 'Flows'],         bg: '#1a0d0a' },
  { company: 'via BlueSky',        title: 'PMI Experience Cloud',        description: 'Customer portal for product registration and support integrating with global ERP systems for Philip Morris International.',                  tags: ['Experience Cloud', 'Apex', 'REST API'],   bg: '#0a0d1a' },
];

// ── Multi-dot snake cursor (clouddevs.pro style) ───────────────────────────

function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const AMOUNT = 20;
    const SINE_DOTS = Math.floor(AMOUNT * 0.3);
    const WIDTH = 26;
    const IDLE_TIMEOUT = 150;

    let mousePos = { x: -200, y: -200 };
    let idle = false;
    let timeoutID: ReturnType<typeof setTimeout>;

    interface DotData {
      el: HTMLSpanElement;
      x: number; y: number;
      scale: number;
      range: number;
      anglespeed: number;
      angleX: number; angleY: number;
      lockX: number; lockY: number;
    }

    const dots: DotData[] = [];

    for (let i = 0; i < AMOUNT; i++) {
      const span = document.createElement('span');
      span.className = 'cursor-dot';
      container.appendChild(span);
      const scale = 1 - 0.05 * i;
      gsap.set(span, { scale });
      dots.push({ el: span, x: -200, y: -200, scale, range: WIDTH / 2 - (WIDTH / 2) * scale + 2, anglespeed: 0.05, angleX: 0, angleY: 0, lockX: 0, lockY: 0 });
    }

    const goInactive = () => {
      idle = true;
      dots.forEach(d => { d.lockX = d.x; d.lockY = d.y; d.angleX = Math.PI * 2 * Math.random(); d.angleY = Math.PI * 2 * Math.random(); });
    };

    const resetIdleTimer = () => { clearTimeout(timeoutID); idle = false; timeoutID = setTimeout(goInactive, IDLE_TIMEOUT); };

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX - WIDTH / 2, y: e.clientY - WIDTH / 2 };
      resetIdleTimer();
      container.style.opacity = '1';
    };

    const render = () => {
      let x = mousePos.x;
      let y = mousePos.y;
      dots.forEach((dot, i) => {
        const next = dots[i + 1] || dots[0];
        dot.x = x; dot.y = y;
        if (!idle || i <= SINE_DOTS) {
          gsap.set(dot.el, { x: dot.x, y: dot.y });
        } else {
          dot.angleX += dot.anglespeed; dot.angleY += dot.anglespeed;
          dot.y = dot.lockY + Math.sin(dot.angleY) * dot.range;
          dot.x = dot.lockX + Math.sin(dot.angleX) * dot.range;
          gsap.set(dot.el, { x: dot.x, y: dot.y });
        }
        if (!idle || i <= SINE_DOTS) { x += (next.x - dot.x) * 0.35; y += (next.y - dot.y) * 0.35; }
      });
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(render);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); clearTimeout(timeoutID); };
  }, []);

  return (
    <>
      <svg style={{ display: 'none' }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 99999, filter: 'url("#goo")', mixBlendMode: 'difference', opacity: 0, transition: 'opacity 0.4s' }}
      />
    </>
  );
}

// ── Iridescent Orb ────────────────────────────────────────────────────────────

function IridescentOrb() {
  return (
    <div style={{ position: 'relative', width: 'clamp(180px, 28vw, 440px)', height: 'clamp(200px, 31vw, 491px)', flexShrink: 0, animation: 'orb-float 7s ease-in-out infinite' }}>
      {/* Outer glow */}
      <div style={{ position: 'absolute', inset: '-20%', borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%', background: 'radial-gradient(ellipse, rgba(130,0,255,0.5) 0%, rgba(255,0,120,0.3) 40%, rgba(0,100,255,0.2) 70%, transparent 85%)', filter: 'blur(35px)' }} />
      {/* Main orb blob */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
        background: `conic-gradient(from 0deg at 40% 40%, #ff006680 0deg, #8800ff 60deg, #00ccff 120deg, #00ff88 180deg, #ffcc00 240deg, #ff5500 300deg, #ff006680 360deg)`,
        boxShadow: 'inset -25px -25px 70px rgba(0,0,180,0.6), inset 15px 15px 50px rgba(200,0,200,0.4), inset 0 0 100px rgba(0,150,255,0.2), 0 0 80px rgba(120,0,255,0.5), 0 0 150px rgba(0,80,200,0.25)',
        animation: 'orb-hue 8s ease-in-out infinite',
        overflow: 'hidden',
      }}>
        {/* Specular highlight */}
        <div style={{ position: 'absolute', top: '8%', left: '12%', width: '32%', height: '26%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)', filter: 'blur(4px)' }} />
        {/* Inner depth */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: 'radial-gradient(circle at 70% 70%, rgba(0,0,30,0.85) 0%, transparent 60%)', mixBlendMode: 'multiply' }} />
        {/* Rainbow sheen */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: 'linear-gradient(135deg, rgba(255,80,200,0.3) 0%, transparent 40%, rgba(0,200,255,0.25) 70%, transparent 100%)', mixBlendMode: 'screen' }} />
      </div>
    </div>
  );
}

// ── Animated word reveal ──────────────────────────────────────────────────────

function RevealWords({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const words = text.split(' ');
  return (
    <div ref={ref} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%', opacity: 0 }} animate={isInView ? { y: '0%', opacity: 1 } : {}} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.055 }}>
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ── Number counter ────────────────────────────────────────────────────────────

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  useEffect(() => {
    if (!isInView) return;
    const dur = 1200, start = performance.now();
    const step = (now: number) => { const t = Math.min((now - start) / dur, 1); setCount(Math.round((1 - Math.pow(1 - t, 3)) * target)); if (t < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Marquee ticker ────────────────────────────────────────────────────────────

const TICKER = ['BREAKTHROUGH', '/', 'INSPIRE', '/', 'TECHNOLOGY', '/', 'SALESFORCE', '/', 'INNOVATION', '/', 'ENTERPRISE', '/', 'BREAKTHROUGH', '/', 'INSPIRE', '/', 'TECHNOLOGY', '/', 'SALESFORCE', '/', 'INNOVATION', '/', 'ENTERPRISE', '/'];

function Marquee() {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 0' }}>
      <div className="marquee-track" style={{ display: 'inline-flex', gap: '2rem', paddingRight: '2rem' }}>
        {TICKER.map((item, i) => (
          <span key={i} style={{ fontSize: '0.6875rem', fontWeight: item === '/' ? 300 : 500, color: item === '/' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const fn = () => { for (const id of ['hero','about','work','skills','experience','contact']) { const el = document.getElementById(id); if (el) { const { top, bottom } = el.getBoundingClientRect(); if (top <= 120 && bottom >= 120) { setActive(id); break; } } } };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1rem,3vw,2.5rem)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #666666' }}
    >
      <a href="#hero" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>ZIYAAD ADAMS</span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem,2.5vw,2.5rem)' }}>
        {navItems.map(item => (
          <a key={item.label} href={item.href} className="nav-link"
            style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.04em', textDecoration: 'none', color: '#ffffff', textTransform: 'uppercase', opacity: active === item.href.slice(1) ? 1 : 0.65 }}>
            {item.label}
          </a>
        ))}
        <a href="#contact" className="nav-link"
          style={{ fontSize: '14px', fontWeight: 400, color: '#ffffff', textDecoration: 'none', borderBottom: '1px solid #ffffff', paddingBottom: '2px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          CONTACT US
        </a>
      </div>
    </motion.nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

const HEADLINE_WORDS = ['BUILDING', 'ENTERPRISE', 'SALESFORCE', 'SOLUTIONS'];

function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', paddingTop: '76px', position: 'relative', overflow: 'hidden' }}>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '3rem clamp(1rem,3vw,2.5rem) 2rem', gap: '3rem', flexWrap: 'wrap' }}>

        {/* Left: statement + meta + CTAs */}
        <div style={{ flex: '1 1 420px', minWidth: 0 }}>

          {/* Availability badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '0.35rem 0.875rem', marginBottom: '2.5rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 6px #00e676', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Available for Work</span>
          </motion.div>

          {/* Main headline — word-by-word slide up */}
          <h1 style={{ fontSize: 'clamp(2.75rem,6.5vw,6rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            {HEADLINE_WORDS.map((word, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: '0%' }}
                  transition={{ duration: 0.75, ease: [0.16,1,0.3,1], delay: 0.12 + i * 0.1 }}>
                  {word}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Name + location */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(0.875rem,1.4vw,1.0625rem)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Ziyaad Adams</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.06em' }}>Senior Salesforce Engineer</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.06em' }}>Cape Town 🇿🇦</span>
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.65, ease: [0.16,1,0.3,1] }}
            style={{ fontSize: 'clamp(0.875rem,1.2vw,1rem)', color: 'rgba(255,255,255,0.36)', lineHeight: 1.75, maxWidth: '36rem', marginBottom: '2.5rem' }}>
            5 years of enterprise-grade Salesforce development across banking, healthcare, and FMCG — delivering complex Apex, LWC, Marketing Cloud, and integration solutions for Fortune 500 clients.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92, duration: 0.55 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.625rem', background: '#fff', color: '#000', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              View Projects <span style={{ fontSize: '1rem' }}>→</span>
            </a>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.625rem', background: 'transparent', color: '#fff', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8125rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}>
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right: Orb */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.16,1,0.3,1], delay: 0.2 }} style={{ flexShrink: 0 }}>
          <IridescentOrb />
        </motion.div>
      </div>

      {/* Bottom stats band */}
      <div style={{ borderTop: '1px solid #666666' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem clamp(1rem,3vw,2.5rem)', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid #666666' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Breakthrough</span>
          <div style={{ display: 'flex', gap: 'clamp(1.5rem,5vw,5rem)', flexWrap: 'wrap', alignItems: 'center' }}>
            {[{ v: 5, s: '+', l: 'YEARS EXP' }, { v: 8, s: '', l: 'CERTS' }, { v: 30, s: '+', l: 'PROJECTS' }, { v: 5, s: '', l: 'COUNTRIES' }].map(stat => (
              <div key={stat.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.1rem,2vw,1.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1 }}><Counter target={stat.v} suffix={stat.s} /></div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '0.3rem' }}>{stat.l}</div>
              </div>
            ))}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technology</span>
        </motion.div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{ padding: '5rem clamp(1rem,3vw,2.5rem)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader label="ABOUT ME" title="WHO I AM" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1rem', marginBottom: '1rem' }}>
          {/* Bio card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ ...CARD, gridColumn: 'span 2' }}>
            <RevealWords text="SENIOR SALESFORCE ENGINEER INSPIRED BY CUTTING-EDGE TECHNOLOGIES AND ENTERPRISE PRODUCT DEVELOPMENT"
              style={{ fontSize: 'clamp(1.1rem,2.2vw,1.5rem)', fontWeight: 500, color: '#fff', lineHeight: 1.45, textTransform: 'uppercase', marginBottom: '1.25rem' }} />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75 }}>
              I build scalable, enterprise-grade solutions on the Salesforce platform — from complex Apex back-end logic and LWC interfaces to Marketing Cloud journeys and MuleSoft integrations. Certified across 8 Salesforce disciplines and deployed across 5 countries.
            </motion.p>
          </motion.div>
          {/* Stat cards */}
          {[{ v: 5, s: '+', l: 'Years Experience' }, { v: 8, s: '', l: 'Certifications' }, { v: 4, s: '', l: 'Industries' }, { v: 30, s: '+', l: 'Projects Delivered' }].map((stat, i) => (
            <motion.div key={stat.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
              style={CARD}>
              <div style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)', fontWeight: 500, color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
                <Counter target={stat.v} suffix={stat.s} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{stat.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="work" style={{ padding: '5rem clamp(1rem,3vw,2.5rem)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader label="SELECTED WORK" title="PROJECTS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1rem' }}>
          {projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>{p.company}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.title}</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.875rem', lineHeight: 1.65, flex: 1 }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', fontSize: '0.6875rem', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Shared card style ─────────────────────────────────────────────────────────
const CARD: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '1.75rem 2rem',
};

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ display: 'block', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        {label}
      </motion.span>
      <RevealWords text={title} style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase' }} />
    </div>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="skills" style={{ padding: '5rem clamp(1rem,3vw,2.5rem)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader label="CORE EXPERTISE" title="WHAT I DO" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={CARD}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#fff', marginBottom: '0.625rem' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" style={{ padding: '5rem clamp(1rem,3vw,2.5rem)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader label="CAREER" title="WHERE I'VE WORKED" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {workHistory.map((job, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ ...CARD, display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{job.company}</h3>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>· {job.role}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '0.875rem', maxWidth: '48rem' }}>{job.description}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {job.clients.map(c => (
                    <span key={c} style={{ padding: '0.2rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', fontSize: '0.6875rem', letterSpacing: '0.04em' }}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>{job.date}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.25rem', whiteSpace: 'nowrap' }}>{job.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" style={{ padding: '5rem clamp(1rem,3vw,2.5rem) 4rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader label="GET IN TOUCH" title="LET'S TALK" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
          <motion.a href="mailto:ziyaada22@gmail.com" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ ...CARD, textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>EMAIL</div>
            <div style={{ color: '#fff', fontSize: '0.9375rem' }}>ziyaada22@gmail.com</div>
          </motion.a>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            style={CARD}>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>LOCATION</div>
            <div style={{ color: '#fff', fontSize: '0.9375rem' }}>Cape Town, South Africa 🇿🇦</div>
          </motion.div>
          <motion.a href="https://linkedin.com/in/ziyaad-adams-8b0b001a2" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ ...CARD, textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>LINKEDIN</div>
            <div style={{ color: '#fff', fontSize: '0.9375rem' }}>ziyaad-adams-8b0b001a2 ↗</div>
          </motion.a>
          <motion.a href="https://trailblazer.salesforce.com" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ ...CARD, textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>TRAILHEAD</div>
            <div style={{ color: '#fff', fontSize: '0.9375rem' }}>View Certifications ↗</div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem clamp(1rem,3vw,2.5rem)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em' }}>© {new Date().getFullYear()} Ziyaad Adams</div>
        <a href="mailto:ziyaada22@gmail.com" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)', textDecoration: 'none', letterSpacing: '0.06em' }}>ziyaada22@gmail.com</a>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Privacy Policy</div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* Fixed hexagon grid background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <HexagonBackground />
      </div>
      <CustomCursor />
      <div className="holo-left" aria-hidden="true" />
      <div className="holo-right" aria-hidden="true" />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
