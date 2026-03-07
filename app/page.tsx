'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ParticleBackground } from '@/components/ui/particle-background';

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
  {
    company: 'via Digital Modus',
    client:  'NHS Professionals',
    logo:    '/logos/nhsp.svg',
    title:   'UK Government Healthcare',
    description: 'Designed and deployed complex, data-driven, multi-channel user journeys and automation flows to support large-scale public engagement and service delivery. Managed end-to-end configuration of Marketing Cloud, focusing on robust data architecture, advanced segmentation logic, and adherence to strict government data and security compliance standards.',
    tags: ['Marketing Cloud', 'Data Cloud', 'Apex', 'AMPscript'],
    bg: '#0a0f1e',
    industry: 'Government / Healthcare',
  },
  {
    company: 'via BlueSky',
    client:  'Capitec Bank',
    logo:    '/logos/capitec.svg',
    title:   'Fraud Detection System',
    description: 'Engineered and enhanced the Salesforce platform for the Fraud Department, leveraging OmniStudio, Flows, and Lightning Web Components (LWC) to build dynamic fraud-focused features and case automation tools. Delivered solutions that streamlined internal processes and improved efficiency for agents investigating and managing fraud cases — tools currently active in production.',
    tags: ['OmniStudio', 'LWC', 'Flows', 'Service Cloud'],
    bg: '#001a0d',
    industry: 'Financial Services',
  },
  {
    company: 'via BlueSky',
    client:  'ABSA Bank',
    logo:    '/logos/absa.svg',
    title:   'Credit & Complaints Platform',
    description: 'Led the development of new CIB Complaints and Credit Application forms as the sole developer, accelerating ABSA Bank\'s migration of key business processes to Salesforce. Implemented a customer feature for bulk case transfers and ensured UI compliance with external Adobe XD design templates. Successfully enabled the client to manage all complaints and new credit applications within a centralised CRM environment.',
    tags: ['Service Cloud', 'Flows', 'Apex', 'LWC'],
    bg: '#1a0306',
    industry: 'Financial Services',
  },
  {
    company: 'via Cloudmuscle B.V.',
    client:  'Heineken / Distell',
    logo:    '/logos/heineken.svg',
    title:   'B2B Distribution Platform',
    description: 'Served as Senior Salesforce Developer, developing new B2B sales features for a nationwide and international liquor distribution platform. Managed complex third-party integrations with SAP, Apigee, and WhatsApp, in addition to developing solutions for Experience Cloud chatbots and ordering processes.',
    tags: ['B2B Commerce', 'Experience Cloud', 'MuleSoft', 'SAP'],
    bg: '#0a1408',
    industry: 'FMCG / Distribution',
  },
  {
    company: 'via Cloudsmiths',
    client:  'Four Paws International',
    logo:    '/logos/fourpaws.svg',
    title:   'Global NPO Donation Platform',
    description: 'Managed end-to-end development of migrating an international NPO\'s global donation platform to Salesforce. Created a single, dynamic donation page capable of routing donors to multiple campaigns based on internal logic. Implemented essential financial and marketing integrations, including Pay Gate, Facebook Pixel, and custom subscription/unsubscribe forms.',
    tags: ['NPSP', 'Data Migration', 'Apex Triggers', 'Pay Gate'],
    bg: '#1a0d0a',
    industry: 'Non-Profit',
  },
  {
    company: 'via Cloudsmiths',
    client:  'Main One',
    logo:    '/logos/mainone.svg',
    title:   'ISP Opportunity Automation',
    description: 'Automated core customer opportunity processes across Africa by developing efficient Workflow Rules and optimized Apex Triggers, ensuring high performance and compliance with Salesforce CPU limits. Created a custom Home Page component displaying the top 10 opportunities with an export feature for ad-hoc analysis (CSV output).',
    tags: ['Apex', 'Workflow Rules', 'Custom Components', 'LWC'],
    bg: '#030a1a',
    industry: 'Telecommunications',
  },
  {
    company: 'via BlueSky',
    client:  'Philip Morris / IQOS',
    logo:    '/logos/pmi.svg',
    title:   'IQOS Customer Portal',
    description: 'Developed the IQOS Customer Portal, focusing on building the user account, rewards, and inventory/sales tracking systems. Managed a critical MuleSoft integration that required decrypting and synchronising encrypted data across servers. Built various custom components and forms (LWC, Aura, Visualforce) and ensured proper Google Tag processing for analytics.',
    tags: ['Experience Cloud', 'MuleSoft', 'LWC', 'REST API'],
    bg: '#0a0d1a',
    industry: 'FMCG / Consumer',
  },
  {
    company: 'via BlueSky',
    client:  'CAFU',
    logo:    '/logos/cafu.svg',
    title:   'Field Service Dispatching',
    description: 'Automated and optimised mechanic dispatching within Salesforce Field Service Lightning (FSL) for a major UAE service provider. Developed a custom AWS integration for storing job completion images and implemented sophisticated geolocation-based polygon map logic to automatically assign drivers.',
    tags: ['Field Service Lightning', 'AWS', 'Apex', 'Geolocation'],
    bg: '#1a1400',
    industry: 'Field Services / UAE',
  },
  {
    company: 'via BlueSky',
    client:  'Sygnia',
    logo:    '/logos/sygnia.svg',
    title:   'Investment Lead Generation',
    description: 'Developed custom features to enhance lead generation and customer service, including automating lead processes based on site entry and Google Ad click data. Implemented a complex automation trigger to notify agents, with dynamic retrieval and display of relevant agent information by securely passing data via URL parameters.',
    tags: ['Sales Cloud', 'Apex', 'Automation', 'Google Ads API'],
    bg: '#06061a',
    industry: 'Financial Services',
  },
  {
    company: 'via BlueSky',
    client:  'Urban MGT',
    logo:    '/logos/urbanmgt.svg',
    title:   'Client Satisfaction Portal',
    description: 'Designed and built a live Client Satisfaction Form within the Lightning Experience Builder using Lightning frameworks. The solution dynamically retrieved and displayed relevant agent information by securely passing data via URL parameters.',
    tags: ['Lightning Experience', 'LWC', 'Aura', 'Flows'],
    bg: '#0d0f12',
    industry: 'Business Consulting',
  },
];

const freelanceProjects = [
  {
    client:      'Personal',
    logo:        '/logos/portfolio.svg',
    title:       'Portfolio 2026',
    description: 'This portfolio — built with Next.js 14, TypeScript, Framer Motion, Three.js, shadcn/ui, and a custom hexagon background. Designed to showcase enterprise Salesforce engineering work with a premium, animation-driven aesthetic.',
    tags:        ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'shadcn/ui'],
    link:        null,
    industry:    'Web Development',
  },
  {
    client:      'Veloracer',
    logo:        '/logos/veloracer.svg',
    title:       'Custom Cycle Wear E-Commerce',
    description: 'End-to-end WordPress WooCommerce store for a custom cycling apparel brand. Includes product configurator, custom order forms, and payment gateway integration.',
    tags:        ['WordPress', 'WooCommerce', 'PHP', 'E-Commerce'],
    link:        null,
    industry:    'E-Commerce / Sports',
  },
  {
    client:      'Side Project',
    logo:        '/logos/invoiceapp.svg',
    title:       'Invoice Platform',
    description: 'Full-stack invoice generation and management web application. Create, send, and track professional invoices with PDF export, client management, and payment status tracking.',
    tags:        ['React', 'Next.js', 'TypeScript', 'Vercel'],
    link:        'https://invoice-web-app-six.vercel.app',
    industry:    'SaaS / Productivity',
  },
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

// ── Floating Tech Card (hero right) ──────────────────────────────────────────

const CERTS = [
  { label: 'Salesforce Administrator',       abbr: 'ADM',  color: '#00A1E0' },
  { label: 'Platform Developer I',           abbr: 'PD1',  color: '#00A1E0' },
  { label: 'Platform Developer II',          abbr: 'PD2',  color: '#032D60' },
  { label: 'Marketing Cloud Developer',      abbr: 'MCD',  color: '#F97316' },
  { label: 'Marketing Cloud Email Spec.',    abbr: 'MCE',  color: '#F97316' },
  { label: 'OmniStudio Developer',           abbr: 'OSD',  color: '#8B5CF6' },
  { label: 'Data Cloud Consultant',          abbr: 'DCC',  color: '#10B981' },
  { label: 'AI Associate',                   abbr: 'AIA',  color: '#06B6D4' },
];

const TECH_BADGES = ['Apex', 'LWC', 'SOQL', 'MuleSoft', 'REST', 'AWS', 'React', 'Next.js'];

function FloatingTechCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{
        position: 'relative',
        width: 'clamp(260px, 26vw, 400px)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Certifications card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '1.25rem 1.375rem',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Salesforce Certifications
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CERTS.map((c, i) => (
            <motion.div
              key={c.abbr}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '30px', height: '20px', borderRadius: '4px',
                background: c.color + '22', border: `1px solid ${c.color}44`,
                fontSize: '0.55rem', fontWeight: 700, color: c.color,
                letterSpacing: '0.04em', flexShrink: 0,
              }}>
                {c.abbr}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>{c.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech badges card */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '1rem 1.125rem',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Core Stack
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {TECH_BADGES.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.06 }}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: '0.65rem', fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.04em',
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
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

        {/* Right: floating cert/tech card */}
        <FloatingTechCard />
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

function ProjectCard({ p, i, link }: { p: typeof projects[0] & { link?: string | null }; i: number; link?: string | null }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '1.125rem', cursor: link ? 'pointer' : 'default' }}
    >
      {/* Logo + meta row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <img
          src={p.logo}
          alt={(p as any).client ?? p.company}
          style={{ height: '36px', width: 'auto', maxWidth: '100px', objectFit: 'contain', borderRadius: '4px', opacity: 0.9 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <span style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingTop: '2px' }}>
          {(p as any).industry ?? ''}
        </span>
      </div>
      {/* Title + via */}
      <div>
        <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          {p.company}
        </div>
        <h3 style={{ fontSize: '1.075rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{p.title}</h3>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.8125rem', lineHeight: 1.7, flex: 1 }}>{p.description}</p>
      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
        {p.tags.map(tag => (
          <span key={tag} style={{ padding: '0.18rem 0.7rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.48)', fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{tag}</span>
        ))}
      </div>
      {link && (
        <div style={{ fontSize: '0.75rem', color: 'rgba(0,200,180,0.7)', letterSpacing: '0.04em' }}>
          View Project →
        </div>
      )}
    </motion.div>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{card}</a>;
  }
  return card;
}

function Projects() {
  const [tab, setTab] = useState<'enterprise' | 'personal'>('enterprise');

  return (
    <section id="work" style={{ padding: '5rem clamp(1rem,3vw,2.5rem)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader label="SELECTED WORK" title="PROJECTS" />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0' }}>
          {(['enterprise', 'personal'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '0.6rem 1.25rem',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? '2px solid #fff' : '2px solid transparent',
                color: tab === t ? '#fff' : 'rgba(255,255,255,0.35)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
                marginBottom: '-1px',
              }}
            >
              {t === 'enterprise' ? `Enterprise (${projects.length})` : `Personal (${freelanceProjects.length})`}
            </button>
          ))}
        </div>

        {tab === 'enterprise' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1rem' }}>
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} i={i} />
            ))}
          </div>
        )}

        {tab === 'personal' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1rem' }}>
            {freelanceProjects.map((p, i) => (
              <ProjectCard key={i} p={p as any} i={i} link={(p as any).link} />
            ))}
          </div>
        )}
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
      {/* Particle background */}
      <ParticleBackground />
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
