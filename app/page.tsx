"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Paper, Category, Send, Swap, InfoSquare, Graph } from "react-iconly";
import { Mail, Linkedin, Github, Globe, ArrowUp } from "lucide-react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Preloader } from "@/components/Preloader";
import { ThemeToggle } from "@/components/theme-toggle";
import { useReducedMotion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const workHistory = [
  {
    company: "Digital Modus",
    role: "Salesforce Developer",
    date: "2025 — Present",
    location: "Cape Town, South Africa",
    description:
      "Architecting and deploying scalable Salesforce solutions for high-consequence enterprise environments within the public sector." +
      "Acting as a strategic technical consultant, bridging the gap between complex business requirements and robust platform delivery for the NHS." +
      "Managing end-to-end integration and automation workflows to streamline large-scale workforce management.",
    clients: ["NHS / UK Government"],
  },
  {
    company: "BlueSky",
    role: "Salesforce Developer",
    date: "2022 — 2025",
    location: "Cape Town, South Africa",
    description:
      "Spearheaded full-cycle Salesforce implementations for industry leaders in Banking, FMCG, and Global Consumer Goods." +
      "Engineered bespoke Apex and Lightning Web Components (LWC) to enhance digital banking experiences and global supply chain visibility." +
      "Collaborated with cross-functional stakeholders to translate legacy business processes into high-performing cloud solutions.",
    clients: ["Capitec Bank", "Distell", "Heineken"],
  },
  {
    company: "Cloudmuscle B.V.",
    role: "Salesforce Developer",
    date: "2022",
    location: "Remote · Netherlands",
    description:
      "Development and consulting services as a flexible project resource.",
    clients: ["Pay Per"],
  },
  {
    company: "Cloudsmiths",
    role: "Salesforce Developer",
    date: "2020 — 2022",
    location: "Cape Town, South Africa",
    description:
      "Provided high-velocity development and technical consulting as an agile project resource for international clients." +
      "Optimized existing Salesforce orgs through refactoring legacy code and implementing best-practice declarative and programmatic solutions.",
    clients: [
      "CAFU",
      "Main One",
      "Philip Morris",
      "Sygnia",
      "Wunderman & Thompson",
      "Four Paws International",
    ],
  },
];

const services = [
  {
    title: "Apex Development",
    description:
      "We specialise in Salesforce Apex, crafting custom business logic, batch processes and complex server-side integrations that power enterprise operations.",
  },
  {
    title: "LWC & UI Development",
    description:
      "Our LWC expertise delivers intuitive, responsive interfaces on the Salesforce platform — ensuring every user interaction is seamless and engaging.",
  },
  {
    title: "Marketing Cloud",
    description:
      "We build sophisticated customer journeys, automated email campaigns and data extensions for enterprise-scale marketing operations.",
  },
  {
    title: "Integration & APIs",
    description:
      "We connect Salesforce with your wider tech stack using MuleSoft, REST/SOAP APIs and middleware — bridging legacy systems with modern cloud solutions.",
  },
  {
    title: "IT-Consulting",
    description:
      "Our Salesforce consulting guides businesses through digital transformation, offering expert insights to optimise platform adoption and strategy.",
  },
  {
    title: "Data Driven Development",
    description:
      "We harness Data Cloud, data modelling and SOQL optimisation to ensure solutions are driven by real insight and aligned with business demands.",
  },
];

const projects = [
  {
    company: "via Digital Modus",
    companyLogo: "/logos/digitalmodus.png",
    client: "NHS Professionals",
    logo: "/logos/NHS-01.svg",
    industry: "Healthcare",
    description:
      "Designed and deployed complex, data-driven, multi-channel user journeys and automation flows to support large-scale public engagement and service delivery. Managed end-to-end configuration of Marketing Cloud, focusing on robust data architecture, advanced segmentation logic, and adherence to strict government data and security compliance standards.",
    tags: ["Marketing Cloud", "Mulesoft ", "Apex", "LWC"],
    bg: "#0a0f1e",
  },
  {
    company: "via BlueSky",
    companyLogo: "/logos/bluesky.svg",
    client: "Capitec Bank",
    logo: "/logos/CPI.JO_BIG.svg",
    industry: "Banking",
    description:
      "Engineered and enhanced the Salesforce platform for the Fraud Department, leveraging OmniStudio, Flows, and Lightning Web Components (LWC) to build dynamic fraud-focused features and case automation tools. Delivered solutions that streamlined internal processes and improved efficiency for agents investigating and managing fraud cases — tools currently active in production.",
    tags: ["OmniStudio", "LWC", "Flows", "Service Cloud"],
    bg: "#001a0d",
  },
  {
    company: "via BlueSky",
    companyLogo: "/logos/bluesky.svg",
    client: "ABSA Bank",
    logo: "/logos/ABSP.JO.svg",
    industry: "Banking",
    description:
      "Led the development of new CIB Complaints and Credit Application forms as the sole developer, accelerating ABSA Bank's migration of key business processes to Salesforce. Implemented a customer feature for bulk case transfers and ensured UI compliance with external Adobe XD design templates. Successfully enabled the client to manage all complaints and new credit applications within a centralised CRM environment.",
    tags: ["Service Cloud", "Flows", "Apex", "LWC"],
    bg: "#1a0306",
  },
  {
    company: "via Cloudmuscle B.V.",
    companyLogo: "/logos/cloudmuscle.svg",
    client: "Heineken / Distell",
    logo: "/logos/heineken.svg",
    industry: "FMCG",
    description:
      "Served as Senior Salesforce Developer, developing new B2B sales features for a nationwide and international liquor distribution platform. Managed complex third-party integrations with SAP, Apigee, and WhatsApp, in addition to developing solutions for Experience Cloud chatbots and ordering processes.",
    tags: ["B2B Commerce", "Experience Cloud", "MuleSoft", "SAP"],
    bg: "#0a1408",
  },
  {
    company: "via Cloudsmiths",
    companyLogo: "/logos/cloudsmiths.png",
    client: "Four Paws International",
    logo: "/logos/fourpaws.svg",
    industry: "Non-Profit",
    description:
      "Managed end-to-end development of migrating an international NPO's global donation platform to Salesforce. Created a single, dynamic donation page capable of routing donors to multiple campaigns based on internal logic. Implemented essential financial and marketing integrations, including Pay Gate, Facebook Pixel, and custom subscription/unsubscribe forms.",
    tags: ["NPSP", "Data Migration", "Apex Triggers", "Pay Gate"],
    bg: "#1a0d0a",
  },
  {
    company: "via Cloudsmiths",
    companyLogo: "/logos/cloudsmiths.png",
    client: "Main One",
    logo: "/logos/mainone.svg",
    industry: "Telecom",
    description:
      "Automated core customer opportunity processes across Africa by developing efficient Workflow Rules and optimized Apex Triggers, ensuring high performance and compliance with Salesforce CPU limits. Created a custom Home Page component displaying the top 10 opportunities with an export feature for ad-hoc analysis (CSV output).",
    tags: ["Apex", "Workflow Rules", "Custom Components", "LWC"],
    bg: "#030a1a",
  },
  {
    company: "via BlueSky",
    companyLogo: "/logos/bluesky.svg",
    client: "Philip Morris / IQOS",
    logo: "/logos/pmi.svg",
    industry: "FMCG",
    description:
      "Developed the IQOS Customer Portal, focusing on building the user account, rewards, and inventory/sales tracking systems. Managed a critical MuleSoft integration that required decrypting and synchronising encrypted data across servers. Built various custom components and forms (LWC, Aura, Visualforce) and ensured proper Google Tag processing for analytics.",
    tags: ["Experience Cloud", "MuleSoft", "LWC", "REST API"],
    bg: "#0a0d1a",
  },
  {
    company: "via BlueSky",
    companyLogo: "/logos/bluesky.svg",
    client: "CAFU",
    logo: "/logos/cafu.svg",
    industry: "Field Service",
    description:
      "Automated and optimised mechanic dispatching within Salesforce Field Service Lightning (FSL) for a major UAE service provider. Developed a custom AWS integration for storing job completion images and implemented sophisticated geolocation-based polygon map logic to automatically assign drivers.",
    tags: ["Field Service Lightning", "AWS", "Apex", "Geolocation"],
    bg: "#1a1400",
  },
  {
    company: "via BlueSky",
    companyLogo: "/logos/bluesky.svg",
    client: "Sygnia",
    logo: "/logos/sygnia.svg",
    industry: "Finance",
    description:
      "Developed custom features to enhance lead generation and customer service, including automating lead processes based on site entry and Google Ad click data. Implemented a complex automation trigger to notify agents, with dynamic retrieval and display of relevant agent information by securely passing data via URL parameters.",
    tags: ["Sales Cloud", "Apex", "Automation", "Google Ads API"],
    bg: "#06061a",
  },
  {
    company: "via BlueSky",
    companyLogo: "/logos/bluesky.svg",
    client: "Urban MGT",
    logo: "/logos/urbanmgt.svg",
    industry: "Property",
    description:
      "Designed and built a live Client Satisfaction Form within the Lightning Experience Builder using Lightning frameworks. The solution dynamically retrieved and displayed relevant agent information by securely passing data via URL parameters.",
    tags: ["Lightning Experience", "LWC", "Aura", "Flows"],
    bg: "#0d0f12",
  },
];

const freelanceProjects = [
  {
    client: "Personal",
    logo: "/logos/portfolio.svg",
    industry: "Portfolio",
    description:
      "This portfolio — built with Next.js 14, TypeScript, Framer Motion, Three.js, shadcn/ui, and a custom hexagon background. Designed to showcase enterprise Salesforce engineering work with a premium, animation-driven aesthetic.",
    tags: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "shadcn/ui"],
    link: null,
  },
  {
    client: "Veloracer",
    logo: "/logos/veloracer.svg",
    industry: "E-Commerce",
    description:
      "End-to-end WordPress WooCommerce store for a custom cycling apparel brand. Includes product configurator, custom order forms, and payment gateway integration.",
    tags: ["WordPress", "WooCommerce", "PHP", "E-Commerce"],
    link: null,
  },
  {
    client: "Side Project",
    logo: "/logos/invoiceapp.svg",
    industry: "SaaS",
    description:
      "Full-stack invoice generation and management web application. Create, send, and track professional invoices with PDF export, client management, and payment status tracking.",
    tags: ["React", "Next.js", "TypeScript", "Vercel"],
    link: "https://invoice-web-app-six.vercel.app",
  },
];

// ── Multi-dot snake cursor (clouddevs.pro style) ───────────────────────────

function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;
    
    // Check if touch device or reduced motion preferred
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice || shouldReduceMotion) return;

    const AMOUNT = 20;
    const SINE_DOTS = Math.floor(AMOUNT * 0.3);
    const WIDTH = 26;
    const IDLE_TIMEOUT = 150;

    let mousePos = { x: -200, y: -200 };
    let idle = false;
    let timeoutID: ReturnType<typeof setTimeout>;

    interface DotData {
      el: HTMLSpanElement;
      x: number;
      y: number;
      scale: number;
      range: number;
      anglespeed: number;
      angleX: number;
      angleY: number;
      lockX: number;
      lockY: number;
    }

    const dots: DotData[] = [];

    for (let i = 0; i < AMOUNT; i++) {
      const span = document.createElement("span");
      span.className = "cursor-dot";
      container.appendChild(span);
      const scale = 1 - 0.05 * i;
      gsap.set(span, { scale });
      dots.push({
        el: span,
        x: -200,
        y: -200,
        scale,
        range: WIDTH / 2 - (WIDTH / 2) * scale + 2,
        anglespeed: 0.05,
        angleX: 0,
        angleY: 0,
        lockX: 0,
        lockY: 0,
      });
    }

    const goInactive = () => {
      idle = true;
      dots.forEach((d) => {
        d.lockX = d.x;
        d.lockY = d.y;
        d.angleX = Math.PI * 2 * Math.random();
        d.angleY = Math.PI * 2 * Math.random();
      });
    };

    const resetIdleTimer = () => {
      clearTimeout(timeoutID);
      idle = false;
      timeoutID = setTimeout(goInactive, IDLE_TIMEOUT);
    };

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX - WIDTH / 2, y: e.clientY - WIDTH / 2 };
      resetIdleTimer();
      container.style.opacity = "1";
    };

    const render = () => {
      let x = mousePos.x;
      let y = mousePos.y;
      dots.forEach((dot, i) => {
        const next = dots[i + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        if (!idle || i <= SINE_DOTS) {
          gsap.set(dot.el, { x: dot.x, y: dot.y });
        } else {
          dot.angleX += dot.anglespeed;
          dot.angleY += dot.anglespeed;
          dot.y = dot.lockY + Math.sin(dot.angleY) * dot.range;
          dot.x = dot.lockX + Math.sin(dot.angleX) * dot.range;
          gsap.set(dot.el, { x: dot.x, y: dot.y });
        }
        if (!idle || i <= SINE_DOTS) {
          x += (next.x - dot.x) * 0.35;
          y += (next.y - dot.y) * 0.35;
        }
      });
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutID);
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <svg style={{ display: "none" }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          filter: 'url("#goo")',
          mixBlendMode: "difference",
          opacity: 0,
          transition: "opacity 0.4s",
        }}
      />
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    href: "https://linkedin.com/in/ziyaad-adams-8b0b001a2",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/ziyaadsmada",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    href: "https://www.salesforce.com/trailblazer/zadams4",
    label: "Trailhead",
    icon: (
      <img
        src="/logos/trailhead-alt-svgrepo-com.svg"
        alt="Trailhead"
        width={18}
        height={18}
        style={{ filter: "invert(1) opacity(0.75)", display: "block" }}
      />
    ),
  },
  {
    href: "mailto:ziyaada22@gmail.com",
    label: "Email",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const ABOUT_INFO = [
  { label: "Name", value: "Ziyaad Adams" },
  { label: "Nationality", value: "South African" },
  { label: "Email", value: "ziyaada22@gmail.com" },
  { label: "Experience", value: "5+ Years" },
  { label: "Freelance", value: "Available" },
  { label: "Language", value: "English / Afrikaans" },
];

const SKILL_CARDS = [
  {
    title: "Salesforce Stack",
    items: "Apex, LWC, Flows, SOQL, Triggers, OmniStudio, Marketing Cloud, Service Cloud, Experience Cloud, Data Cloud",
  },
  {
    title: "Full Stack",
    items: "HTML, CSS, JavaScript, TypeScript, Node.js, Express, REST APIs, PostgreSQL, MongoDB, AWS, Docker, Heroku",
  },
  {
    title: "React Frameworks",
    items: "React, Next.js, React Native, Tailwind CSS, Framer Motion, shadcn/ui",
  },
  {
    title: "UI & Styling",
    items: "CSS, Sass, Tailwind CSS, Material-UI, shadcn/ui, Animations (GSAP, Framer Motion, Anime.js)",
  },
  {
    title: "Database",
    items: "Salesforce SOQL/SOSL, PostgreSQL, MongoDB, MySQL, Data Modelling, Schema Design, Indexing",
  },
  {
    title: "Integration & APIs",
    items: "MuleSoft, REST, SOAP, OAuth, JWT, Postman, Middleware, Rate Limiting, CORS, Platform Events",
  },
];

function Hero() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background: "var(--hero-bg)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        transition: "background 0.3s ease",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          TOP HALF — Hero: Photo + Name + Description + Social
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-main"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          position: "relative",
          zIndex: 1,
          paddingTop: "70px",
          flex: "1 1 55%",
        }}
      >
        {/* Far-left: vertical labels */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hero-vertical-left"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            padding: "0 clamp(0.6rem, 1.2vw, 1.25rem)",
            width: "clamp(40px, 4vw, 60px)",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "clamp(0.55rem, 0.7vw, 0.65rem)",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--text-4)",
            }}
          >
            Salesforce
          </span>
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-3)",
            }}
          >
            Engineer
          </span>
        </motion.div>

        {/* CENTER CONTENT */}
        <div
          className="hero-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem clamp(1rem, 3vw, 3rem)",
            position: "relative",
          }}
        >
          <div
            className="hero-composition"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "0",
              maxWidth: "1100px",
              width: "100%",
              alignItems: "center",
            }}
          >
            {/* ─── LEFT COLUMN: Photo with name overlay + testimonial ─── */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              {/* DEVELOPER vertical text */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  position: "absolute",
                  left: "-24px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(180deg)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--text-4)",
                  zIndex: 3,
                }}
              >
                DEVELOPER
              </motion.span>

              {/* Photo + overlapping name container */}
              <div style={{ position: "relative" }}>
                {/* Portrait */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.35,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    width: "clamp(220px, 22vw, 340px)",
                    height: "clamp(270px, 28vw, 420px)",
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "clamp(24px, 3vw, 48px)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src="/images/1614900731240.jpg"
                    alt="Ziyaad Adams"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />
                </motion.div>

                {/* ── Name overlay — positioned over the photo's right side ── */}
                <div
                  style={{
                    position: "absolute",
                    right: "-40%",
                    top: "28%",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  {/* Spaced last name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
                      fontWeight: 300,
                      letterSpacing: "0.55em",
                      textTransform: "lowercase",
                      color: "var(--text-3)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    A d a m s
                  </motion.div>

                  {/* Big first name */}
                  <h1
                    style={{
                      fontSize: "clamp(3rem, 6vw, 7rem)",
                      fontWeight: 700,
                      lineHeight: 0.85,
                      letterSpacing: "-0.03em",
                      color: "var(--hero-text)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <motion.span
                        style={{ display: "inline-block" }}
                        initial={{ y: "120%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.85,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.15,
                        }}
                      >
                        Ziyaad
                      </motion.span>
                    </div>
                  </h1>
                </div>
              </div>

            </div>

            {/* ─── RIGHT COLUMN: Description + Button (below name overlap area) ─── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingLeft: "clamp(1rem, 2vw, 2.5rem)",
                paddingBottom: "clamp(2rem, 4vw, 4rem)",
                alignSelf: "end",
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontSize: "clamp(0.72rem, 0.85vw, 0.8rem)",
                  color: "rgba(255,255,255,0.48)",
                  lineHeight: 1.85,
                  maxWidth: "22rem",
                  marginBottom: "clamp(0.75rem, 1.2vw, 1.25rem)",
                }}
              >
                My goal is to write clean, maintainable code that enhances the
                development process and makes coding enjoyable through structured
                and thoughtful practices.
              </motion.p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <motion.a
                  href="#work"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.55 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.6rem 1.75rem",
                    background: "transparent",
                    color: "var(--hero-text)",
                    borderRadius: "4px",
                    border: "1px solid var(--text-3)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    letterSpacing: "0.12em",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--card-bg)";
                    e.currentTarget.style.borderColor = "var(--text-2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "var(--text-3)";
                  }}
                >
                  Portfolio
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.55 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.6rem 1.75rem",
                    background: "transparent",
                    color: "var(--text-3)",
                    borderRadius: "4px",
                    border: "1px solid var(--card-border)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    letterSpacing: "0.12em",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--card-bg)";
                    e.currentTarget.style.borderColor = "var(--text-3)";
                    e.currentTarget.style.color = "var(--hero-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "var(--card-border)";
                    e.currentTarget.style.color = "var(--text-3)";
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Resume
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Far-right: Social icons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hero-vertical-right"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "0 clamp(0.6rem, 1.2vw, 1.25rem)",
            width: "clamp(50px, 5vw, 70px)",
          }}
        >
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-3)",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--card-hover)";
                e.currentTarget.style.color = "var(--hero-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--card-bg)";
                e.currentTarget.style.color = "var(--text-3)";
              }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM HALF — About: Bio + Info + Skill Cards (inside hero section)
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        id="about"
        ref={aboutRef}
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem clamp(1.5rem, 4vw, 4rem) 3rem",
          borderTop: "1px solid var(--card-border)",
          flex: "1 1 45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            top: "-3rem",
            left: "-2rem",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "1px solid var(--card-border)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* About heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--hero-text)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            About
          </motion.h2>

          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(1.5rem, 3vw, 3rem)",
              alignItems: "start",
            }}
          >
            {/* LEFT — Bio + personal info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <p
                style={{
                  fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)",
                  color: "var(--hero-text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                }}
              >
                Hello! I&apos;m Ziyaad Adams, a full-stack Salesforce developer
                with over 5 years of experience. I&apos;ve built scalable
                solutions for enterprise clients across banking, healthcare,
                FMCG, and government. I specialise in Apex, LWC, Marketing
                Cloud, and MuleSoft integrations. Committed to continuous
                learning, I prioritise company success and customer satisfaction.
                Explore my portfolio for innovative solutions. Let&apos;s create
                something amazing!
              </p>

              {/* Info cards grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.65rem",
                }}
              >
                {ABOUT_INFO.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                    style={{
                      padding: "0.7rem 0.85rem",
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(0.58rem, 0.7vw, 0.65rem)",
                        color: "var(--text-4)",
                        textTransform: "capitalize",
                        marginBottom: "0.2rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(0.7rem, 0.85vw, 0.78rem)",
                        color: "var(--text-2)",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Skill cards grid (2×3) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {SKILL_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.55 }}
                  style={{
                    padding: "0.85rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(0.7rem, 0.82vw, 0.76rem)",
                      fontWeight: 600,
                      color: "var(--hero-text)",
                      marginBottom: "0.5rem",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(0.58rem, 0.68vw, 0.64rem)",
                      color: "var(--text-3)",
                      lineHeight: 1.7,
                    }}
                  >
                    {card.items}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "140px",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0 140 Q180 35 360 90 T720 55 T1080 80 T1440 45 L1440 140 Z"
            fill="var(--card-bg)"
          />
          <path
            d="M0 140 Q240 55 480 100 T960 60 T1440 78 L1440 140 Z"
            fill="var(--card-bg)"
          />
          <path
            d="M0 140 Q200 80 400 105 T800 70 T1200 92 T1440 65 L1440 140 Z"
            fill="var(--card-bg)"
          />
        </svg>
      </div>
    </section>
  );
}

// ── RevealWords ───────────────────────────────────────────────────────────────

function RevealWords({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <div
      ref={ref}
      style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0 0.22em" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.055,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ── Number counter ────────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!isInView) return;
    const dur = 1200,
      start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Force scroll to top on mount & clear hash so browser doesn't jump
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fn = () => {
      for (const id of [
        "hero",
        "about",
        "work",
        "skills",
        "experience",
        "contact",
      ]) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-island ${scrolled ? 'nav-island--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#hero" className="nav-island__logo" aria-label="Go to homepage">
          Z<span>.</span>
        </a>
        <div className="nav-island__links" role="menubar">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-island__link"
              role="menuitem"
              aria-current={active === item.href.slice(1) ? 'page' : undefined}
              style={{
                opacity: active === item.href.slice(1) ? 1 : 0.7,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-island__cta">
          Get Started
        </a>
        
        <ThemeToggle />
        
        {/* Mobile menu button */}
        <button
          className="nav-island__menu-btn lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="menu-overlay lg:hidden"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="menu-nav">
            <ul className="menu-links" role="menubar">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="menu-link"
                    onClick={() => setMobileMenuOpen(false)}
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="menu-footer">
              <a href="https://github.com/ziyaadsmada" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/ziyaad-adams-8b0b001a2" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

// ── Tech tag colour map ────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  "Marketing Cloud": "#00A1E0",
  "MuleSoft": "#00A0DF",
  "Apex": "#1798C1",
  "LWC": "#032D60",
  "OmniStudio": "#0070D2",
  "Flows": "#4F7FBF",
  "Service Cloud": "#005FB2",
  "NPSP": "#00857D",
  "Salesforce": "#00A1E0",
  "Experience Cloud": "#1B96FF",
  "REST API": "#4CAF50",
  "B2B Commerce": "#F5A623",
  "SAP": "#0070F2",
  "AWS": "#FF9900",
  "Geolocation": "#34A853",
  "Sales Cloud": "#0676C8",
  "Automation": "#8A4FFF",
  "Data Migration": "#E74C3C",
  "Apex Triggers": "#1798C1",
  "Workflow Rules": "#8E44AD",
  "Custom Components": "#2ECC71",
  "Google Ads API": "#4285F4",
  "Lightning Experience": "#0070D2",
  "Aura": "#00A1E0",
  "Field Service Lightning": "#F4B400",
  "Pay Gate": "#27AE60",
  "Facebook Pixel": "#1877F2",
  "Next.js": "#fff",
  "TypeScript": "#3178C6",
  "Three.js": "#49ef4f",
  "Framer Motion": "#BB4B96",
  "WordPress": "#21759B",
  "WooCommerce": "#96588A",
  "React": "#61DAFB",
  "Vercel": "#fff",
};

function tagColor(tag: string) {
  for (const key of Object.keys(TAG_COLORS)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return TAG_COLORS[key];
  }
  return "rgba(255,255,255,0.55)";
}

// ── Project Modal ──────────────────────────────────────────────────────────────
type AnyProject = {
  logo: string;
  companyLogo?: string;
  description: string;
  tags: string[];
  industry?: string;
  company?: string;
  client?: string;
  bg?: string;
  link?: string | null;
};

function ProjectModal({
  p,
  onClose,
}: {
  p: AnyProject;
  onClose: () => void;
}) {
  const name = (p as any).client ?? (p as any).company ?? "";
  const company = (p as any).company ?? "";

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--card-border)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "580px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--text-3)",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem 0 1rem",
          }}
        >
          <img
            src={p.logo}
            alt={name}
            style={{
              height: "56px",
              maxWidth: "180px",
              objectFit: "contain",
              opacity: 0.95,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Name + meta */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--text-1)",
              marginBottom: "0.3rem",
            }}
          >
            {name}
          </h3>
          {company && company !== name && (
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--text-4)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {company}
            </div>
          )}
          {p.industry && (
            <span
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.2rem 0.75rem",
                borderRadius: "20px",
                border: "1px solid var(--card-border)",
                color: "var(--text-3)",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {p.industry}
            </span>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--card-border)",
            marginBottom: "1.25rem",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-2)",
            lineHeight: 1.85,
            marginBottom: "1.75rem",
          }}
        >
          {p.description}
        </p>

        {/* Tech stack */}
        <div
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-4)",
            marginBottom: "0.75rem",
          }}
        >
          Tech Stack
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map((tag) => {
            const color = tagColor(tag.trim());
            return (
              <span
                key={tag}
                style={{
                  padding: "0.3rem 0.85rem",
                  borderRadius: "20px",
                  background: `${color}18`,
                  border: `1px solid ${color}55`,
                  color: color,
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                {tag.trim()}
              </span>
            );
          })}
        </div>

        {/* External link */}
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "1.5rem",
              fontSize: "0.72rem",
              color: "rgba(0,200,180,0.85)",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            View Live Project →
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Project Card (compact) ────────────────────────────────────────────────────
function ProjectCard({
  p,
  i,
  onOpen,
}: {
  p: AnyProject;
  i: number;
  onOpen: () => void;
}) {
  const name = (p as any).client ?? (p as any).company ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      whileHover={{
        y: -4,
        backgroundColor: "var(--card-hover)",
        borderColor: "var(--text-3)",
        transition: { duration: 0.2 },
      }}
      onClick={onOpen}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        cursor: "pointer",
        padding: "1.5rem 1.25rem 1.25rem",
        minHeight: "160px",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          minHeight: "60px",
        }}
      >
        <img
          src={p.logo}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          style={{
            height: "44px",
            width: "auto",
            maxWidth: "140px",
            objectFit: "contain",
            opacity: 0.95,
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>

      {/* Company + Industry */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--text-3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.35rem",
          }}
        >
          {name}
        </div>
        {(p as any).industry && (
          <span
            style={{
              display: "inline-block",
              padding: "0.15rem 0.6rem",
              borderRadius: "20px",
              border: "1px solid var(--card-border)",
              color: "var(--text-4)",
              fontSize: "0.575rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {(p as any).industry}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function Projects() {
  const [tab, setTab] = useState<"enterprise" | "personal">("enterprise");
  const [modalProject, setModalProject] = useState<AnyProject | null>(null);

  return (
    <section
      id="work"
      style={{
        padding: "3.5rem clamp(1rem,3vw,2.5rem)",
        borderTop: "1px solid var(--card-border)",
        background: "var(--color-background)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader label="SELECTED WORK" title="PROJECTS" />

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            marginBottom: "2.5rem",
            borderBottom: "1px solid var(--card-border)",
            paddingBottom: "0",
          }}
        >
          {(["enterprise", "personal"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "0.6rem 1.25rem",
                background: "none",
                border: "none",
                borderBottom:
                  tab === t ? "2px solid var(--text-1)" : "2px solid transparent",
                color: tab === t ? "var(--text-1)" : "var(--text-3)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s",
                marginBottom: "-1px",
              }}
            >
              {t === "enterprise"
                ? `Enterprise (${projects.length})`
                : `Personal (${freelanceProjects.length})`}
            </button>
          ))}
        </div>

        {tab === "enterprise" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: "1rem",
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={i}
                p={p as AnyProject}
                i={i}
                onOpen={() => setModalProject(p as AnyProject)}
              />
            ))}
          </div>
        )}

        {tab === "personal" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: "1rem",
            }}
          >
            {freelanceProjects.map((p, i) => (
              <ProjectCard
                key={i}
                p={p as AnyProject}
                i={i}
                onOpen={() => setModalProject(p as AnyProject)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            p={modalProject}
            onClose={() => setModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Shared card style ─────────────────────────────────────────────────────────
const CARD: React.CSSProperties = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "10px",
  padding: "1.75rem 2rem",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
};

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          display: "block",
          fontSize: "0.6875rem",
          color: "var(--text-3)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </motion.span>
      <RevealWords
        text={title}
        style={{
          fontSize: "clamp(1.5rem,3vw,2.25rem)",
          fontWeight: 700,
          color: "var(--text-1)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}
      />
    </div>
  );
}

const SERVICE_ICONS = [Paper, Category, Send, Swap, InfoSquare, Graph];

function Services() {
  return (
    <section
      id="skills"
      style={{
        padding: "3.5rem clamp(1rem,3vw,2.5rem)",
        borderTop: "1px solid var(--card-border)",
        background: "var(--color-background)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader label="CORE EXPERTISE" title="WHAT I DO" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: "0",
          }}
        >
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid var(--card-border)",
                  borderRight:
                    i % 2 === 0 ? "1px solid var(--card-border)" : "none",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "0.05rem",
                    color: "var(--text-2)",
                  }}
                >
                  <Icon set="bulk" size={22} />
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--text-1)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-3)",
                      lineHeight: 1.65,
                    }}
                  >
                    {s.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "3.5rem clamp(1rem,3vw,2.5rem)",
        borderTop: "1px solid var(--card-border)",
        background: "var(--color-background)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader label="CAREER" title="EXPERIENCE" />
        <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "6px",
              bottom: "6px",
              width: "1px",
              background: "var(--card-border)",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {workHistory.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ position: "relative" }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.75rem",
                    top: "6px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--text-2)",
                    boxShadow: "0 0 8px var(--text-4)",
                    flexShrink: 0,
                  }}
                />
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "0.375rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text-1)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {job.company}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-3)",
                        fontWeight: 400,
                      }}
                    >
                      · {job.role}
                    </span>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {job.date}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-4)",
                        marginTop: "0.2rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {job.location}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    color: "var(--text-2)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    marginBottom: "0.625rem",
                    maxWidth: "56rem",
                  }}
                >
                  {job.description}
                </p>
                <div
                  style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}
                >
                  {job.clients.map((c) => (
                    <span
                      key={c}
                      style={{
                        padding: "0.15rem 0.65rem",
                        borderRadius: "20px",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-3)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "3.5rem clamp(1rem,3vw,2.5rem) 3rem",
        borderTop: "1px solid var(--card-border)",
        background: "var(--color-background)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                fontSize: "0.6875rem",
                color: "var(--text-3)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              GET IN TOUCH
            </motion.p>
            <RevealWords
              text="LET'S BUILD SOMETHING"
              style={{
                fontSize: "clamp(1.75rem,4vw,3rem)",
                fontWeight: 700,
                color: "var(--text-1)",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="mailto:ziyaada22@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.625rem",
                background: "var(--text-1)",
                color: "var(--surface-1)",
                borderRadius: "100px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <Mail size={16} />
              Email Me
            </a>
            <a
              href="https://github.com/ziyaadsmada"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.625rem",
                background: "transparent",
                color: "var(--text-1)",
                borderRadius: "100px",
                border: "1px solid var(--card-border)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.salesforce.com/trailblazer/zadams4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.625rem",
                background: "transparent",
                color: "var(--text-1)",
                borderRadius: "100px",
                border: "1px solid var(--card-border)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <img
                src="/logos/trailhead-alt-svgrepo-com.svg"
                alt="Trailhead"
                width={16}
                height={16}
                style={{ 
                  filter: "var(--icon-filter, none)", 
                  display: "block" 
                }}
              />
              Trailhead
            </a>
            <a
              href="https://linkedin.com/in/ziyaad-adams-8b0b001a2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.625rem",
                background: "transparent",
                color: "var(--text-1)",
                borderRadius: "100px",
                border: "1px solid var(--card-border)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "0.875rem",
              color: "var(--text-3)",
              letterSpacing: "0.02em",
            }}
          >
            Cape Town, South Africa 🇿🇦 · Available for remote & on-site
            engagements
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--card-border)",
        padding: "1.5rem clamp(1rem,3vw,2.5rem)",
        background: "var(--color-background)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-4)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} Ziyaad Adams
        </div>
        <a
          href="mailto:ziyaada22@gmail.com"
          style={{
            fontSize: "0.75rem",
            color: "var(--text-4)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
        >
          ziyaada22@gmail.com
        </a>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-4)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Privacy Policy
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Preloader />
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10001] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>
      
      {/* Hexagon background */}
      <ParticleBackground className="z-0" aria-hidden="true" />
      <CustomCursor />
      <div className="holo-left" aria-hidden="true" />
      <div className="holo-right" aria-hidden="true" />
      <Navbar />
      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
