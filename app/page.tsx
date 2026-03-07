"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Paper, Category, Send, Swap, InfoSquare, Graph } from "react-iconly";
import { Mail, Linkedin, Github, Globe } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "ABOUT US", href: "#about" },
  { label: "PORTFOLIO", href: "#work" },
  { label: "EXPERIENCE", href: "#skills" },
  { label: "CAREER", href: "#experience" },
];

const workHistory = [
  {
    company: "Digital Modus",
    role: "Salesforce Developer",
    date: "2025 — Present",
    location: "Cape Town, South Africa",
    description:
      "Outsourced Salesforce Developer and Consultant for high-profile enterprise accounts including NHS Professionals (UK Government).",
    clients: ["NHS / UK Government"],
  },
  {
    company: "BlueSky",
    role: "Salesforce Developer",
    date: "2022 — 2025",
    location: "Cape Town, South Africa",
    description:
      "Delivered full-cycle Salesforce projects across banking, FMCG, and global consumer industries.",
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
      "Developed and maintained full-stack applications on the Salesforce Platform.",
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
    client: "NHS Professionals",
    logo: "/logos/nhsp.svg",
    title: "UK Government Healthcare",
    description:
      "Designed and deployed complex, data-driven, multi-channel user journeys and automation flows to support large-scale public engagement and service delivery. Managed end-to-end configuration of Marketing Cloud, focusing on robust data architecture, advanced segmentation logic, and adherence to strict government data and security compliance standards.",
    tags: ["Marketing Cloud", "Data Cloud", "Apex", "AMPscript"],
    bg: "#0a0f1e",
    industry: "Government / Healthcare",
  },
  {
    company: "via BlueSky",
    client: "Capitec Bank",
    logo: "/logos/capitec.svg",
    title: "Fraud Detection System",
    description:
      "Engineered and enhanced the Salesforce platform for the Fraud Department, leveraging OmniStudio, Flows, and Lightning Web Components (LWC) to build dynamic fraud-focused features and case automation tools. Delivered solutions that streamlined internal processes and improved efficiency for agents investigating and managing fraud cases — tools currently active in production.",
    tags: ["OmniStudio", "LWC", "Flows", "Service Cloud"],
    bg: "#001a0d",
    industry: "Financial Services",
  },
  {
    company: "via BlueSky",
    client: "ABSA Bank",
    logo: "/logos/absa.svg",
    title: "Credit & Complaints Platform",
    description:
      "Led the development of new CIB Complaints and Credit Application forms as the sole developer, accelerating ABSA Bank's migration of key business processes to Salesforce. Implemented a customer feature for bulk case transfers and ensured UI compliance with external Adobe XD design templates. Successfully enabled the client to manage all complaints and new credit applications within a centralised CRM environment.",
    tags: ["Service Cloud", "Flows", "Apex", "LWC"],
    bg: "#1a0306",
    industry: "Financial Services",
  },
  {
    company: "via Cloudmuscle B.V.",
    client: "Heineken / Distell",
    logo: "/logos/heineken.svg",
    title: "B2B Distribution Platform",
    description:
      "Served as Senior Salesforce Developer, developing new B2B sales features for a nationwide and international liquor distribution platform. Managed complex third-party integrations with SAP, Apigee, and WhatsApp, in addition to developing solutions for Experience Cloud chatbots and ordering processes.",
    tags: ["B2B Commerce", "Experience Cloud", "MuleSoft", "SAP"],
    bg: "#0a1408",
    industry: "FMCG / Distribution",
  },
  {
    company: "via Cloudsmiths",
    client: "Four Paws International",
    logo: "/logos/fourpaws.svg",
    title: "Global NPO Donation Platform",
    description:
      "Managed end-to-end development of migrating an international NPO's global donation platform to Salesforce. Created a single, dynamic donation page capable of routing donors to multiple campaigns based on internal logic. Implemented essential financial and marketing integrations, including Pay Gate, Facebook Pixel, and custom subscription/unsubscribe forms.",
    tags: ["NPSP", "Data Migration", "Apex Triggers", "Pay Gate"],
    bg: "#1a0d0a",
    industry: "Non-Profit",
  },
  {
    company: "via Cloudsmiths",
    client: "Main One",
    logo: "/logos/mainone.svg",
    title: "ISP Opportunity Automation",
    description:
      "Automated core customer opportunity processes across Africa by developing efficient Workflow Rules and optimized Apex Triggers, ensuring high performance and compliance with Salesforce CPU limits. Created a custom Home Page component displaying the top 10 opportunities with an export feature for ad-hoc analysis (CSV output).",
    tags: ["Apex", "Workflow Rules", "Custom Components", "LWC"],
    bg: "#030a1a",
    industry: "Telecommunications",
  },
  {
    company: "via BlueSky",
    client: "Philip Morris / IQOS",
    logo: "/logos/pmi.svg",
    title: "IQOS Customer Portal",
    description:
      "Developed the IQOS Customer Portal, focusing on building the user account, rewards, and inventory/sales tracking systems. Managed a critical MuleSoft integration that required decrypting and synchronising encrypted data across servers. Built various custom components and forms (LWC, Aura, Visualforce) and ensured proper Google Tag processing for analytics.",
    tags: ["Experience Cloud", "MuleSoft", "LWC", "REST API"],
    bg: "#0a0d1a",
    industry: "FMCG / Consumer",
  },
  {
    company: "via BlueSky",
    client: "CAFU",
    logo: "/logos/cafu.svg",
    title: "Field Service Dispatching",
    description:
      "Automated and optimised mechanic dispatching within Salesforce Field Service Lightning (FSL) for a major UAE service provider. Developed a custom AWS integration for storing job completion images and implemented sophisticated geolocation-based polygon map logic to automatically assign drivers.",
    tags: ["Field Service Lightning", "AWS", "Apex", "Geolocation"],
    bg: "#1a1400",
    industry: "Field Services / UAE",
  },
  {
    company: "via BlueSky",
    client: "Sygnia",
    logo: "/logos/sygnia.svg",
    title: "Investment Lead Generation",
    description:
      "Developed custom features to enhance lead generation and customer service, including automating lead processes based on site entry and Google Ad click data. Implemented a complex automation trigger to notify agents, with dynamic retrieval and display of relevant agent information by securely passing data via URL parameters.",
    tags: ["Sales Cloud", "Apex", "Automation", "Google Ads API"],
    bg: "#06061a",
    industry: "Financial Services",
  },
  {
    company: "via BlueSky",
    client: "Urban MGT",
    logo: "/logos/urbanmgt.svg",
    title: "Client Satisfaction Portal",
    description:
      "Designed and built a live Client Satisfaction Form within the Lightning Experience Builder using Lightning frameworks. The solution dynamically retrieved and displayed relevant agent information by securely passing data via URL parameters.",
    tags: ["Lightning Experience", "LWC", "Aura", "Flows"],
    bg: "#0d0f12",
    industry: "Business Consulting",
  },
];

const freelanceProjects = [
  {
    client: "Personal",
    logo: "/logos/portfolio.svg",
    title: "Portfolio 2026",
    description:
      "This portfolio — built with Next.js 14, TypeScript, Framer Motion, Three.js, shadcn/ui, and a custom hexagon background. Designed to showcase enterprise Salesforce engineering work with a premium, animation-driven aesthetic.",
    tags: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "shadcn/ui"],
    link: null,
    industry: "Web Development",
  },
  {
    client: "Veloracer",
    logo: "/logos/veloracer.svg",
    title: "Custom Cycle Wear E-Commerce",
    description:
      "End-to-end WordPress WooCommerce store for a custom cycling apparel brand. Includes product configurator, custom order forms, and payment gateway integration.",
    tags: ["WordPress", "WooCommerce", "PHP", "E-Commerce"],
    link: null,
    industry: "E-Commerce / Sports",
  },
  {
    client: "Side Project",
    logo: "/logos/invoiceapp.svg",
    title: "Invoice Platform",
    description:
      "Full-stack invoice generation and management web application. Create, send, and track professional invoices with PDF export, client management, and payment status tracking.",
    tags: ["React", "Next.js", "TypeScript", "Vercel"],
    link: "https://invoice-web-app-six.vercel.app",
    industry: "SaaS / Productivity",
  },
];

// ── Multi-dot snake cursor (clouddevs.pro style) ───────────────────────────

function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

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
  }, []);

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

const HEADLINE_WORDS = ["BUILDING", "ENTERPRISE", "SALESFORCE", "SOLUTIONS"];

function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        paddingTop: "76px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main content — centered */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem clamp(1rem,3vw,2.5rem) 2rem",
          textAlign: "center",
        }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "100px",
            padding: "0.35rem 0.875rem",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#00e676",
              boxShadow: "0 0 6px #00e676",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Available for Work
          </span>
        </motion.div>

        {/* Main headline — word-by-word slide up */}
        <h1
          style={{
            fontSize: "clamp(3rem,8vw,7rem)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "2.25rem",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + i * 0.1,
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Name + role + location */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "clamp(0.875rem,1.4vw,1.0625rem)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Ziyaad Adams
          </span>
          <span
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.58)",
              letterSpacing: "0.06em",
            }}
          >
            Senior Salesforce Engineer
          </span>
          <span
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.58)",
              letterSpacing: "0.06em",
            }}
          >
            Cape Town 🇿🇦
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(0.875rem,1.2vw,1rem)",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.75,
            maxWidth: "38rem",
            marginBottom: "2.5rem",
          }}
        >
          5 years of enterprise-grade Salesforce development across banking,
          healthcare, and FMCG — delivering complex Apex, LWC, Marketing Cloud,
          and integration solutions for Fortune 500 clients.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.55 }}
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.625rem",
              background: "#fff",
              color: "#000",
              borderRadius: "100px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View Projects <span style={{ fontSize: "1rem" }}>→</span>
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.625rem",
              background: "transparent",
              color: "#fff",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
            }
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Bottom stats band */}
      <div style={{ borderTop: "1px solid #666666" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem clamp(1rem,3vw,2.5rem)",
            flexWrap: "wrap",
            gap: "1.5rem",
            borderBottom: "1px solid #666666",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.72)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Breakthrough
          </span>
          <div
            style={{
              display: "flex",
              gap: "clamp(1.5rem,5vw,5rem)",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              { v: 5, s: "+", l: "YEARS EXP" },
              { v: 8, s: "", l: "CERTS" },
              { v: 30, s: "+", l: "PROJECTS" },
              { v: 5, s: "", l: "COUNTRIES" },
            ].map((stat) => (
              <div key={stat.l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(1.1rem,2vw,1.5rem)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  <Counter target={stat.v} suffix={stat.s} />
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                  }}
                >
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.72)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Technology
          </span>
        </motion.div>
      </div>
    </section>
  );
}

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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "76px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem,3vw,2.5rem)",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #666666",
      }}
    >
      <a href="#hero" style={{ textDecoration: "none" }}>
        <span
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          ZIYAAD ADAMS
        </span>
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1rem,2.5vw,2.5rem)",
        }}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link"
            style={{
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              textDecoration: "none",
              color: "#ffffff",
              textTransform: "uppercase",
              opacity: active === item.href.slice(1) ? 1 : 0.65,
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-link"
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#ffffff",
            textDecoration: "none",
            borderBottom: "1px solid #ffffff",
            paddingBottom: "2px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          CONTACT US
        </a>
      </div>
    </motion.nav>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section
      id="about"
      style={{
        padding: "3.5rem clamp(1rem,3vw,2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader label="ABOUT ME" title="WHO I AM" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ ...CARD, gridColumn: "span 2" }}
          >
            <RevealWords
              text="SENIOR SALESFORCE ENGINEER INSPIRED BY CUTTING-EDGE TECHNOLOGIES AND ENTERPRISE PRODUCT DEVELOPMENT"
              style={{
                fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.45,
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.75,
              }}
            >
              I build scalable, enterprise-grade solutions on the Salesforce
              platform — from complex Apex back-end logic and LWC interfaces to
              Marketing Cloud journeys and MuleSoft integrations. Certified
              across 8 Salesforce disciplines and deployed across 5 countries.
            </motion.p>
          </motion.div>
          {/* Stat cards */}
          {[
            { v: 5, s: "+", l: "Years Experience" },
            { v: 8, s: "", l: "Certifications" },
            { v: 4, s: "", l: "Industries" },
            { v: 30, s: "+", l: "Projects Delivered" },
          ].map((stat, i) => (
            <motion.div
              key={stat.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
              style={CARD}
            >
              <div
                style={{
                  fontSize: "clamp(2.5rem,4vw,3.5rem)",
                  fontWeight: 500,
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                <Counter target={stat.v} suffix={stat.s} />
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.58)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {stat.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function ProjectCard({
  p,
  i,
  link,
}: {
  p: (typeof projects)[0] & { link?: string | null };
  i: number;
  link?: string | null;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        ...CARD,
        display: "flex",
        flexDirection: "column",
        gap: "1.125rem",
        cursor: link ? "pointer" : "default",
      }}
    >
      {/* Logo + meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <img
          src={p.logo}
          alt={(p as any).client ?? p.company}
          style={{
            height: "36px",
            width: "auto",
            maxWidth: "100px",
            objectFit: "contain",
            borderRadius: "4px",
            opacity: 0.9,
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span
          style={{
            fontSize: "0.625rem",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            paddingTop: "2px",
          }}
        >
          {(p as any).industry ?? ""}
        </span>
      </div>
      {/* Title + via */}
      <div>
        <div
          style={{
            fontSize: "0.6875rem",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "0.3rem",
          }}
        >
          {p.company}
        </div>
        <h3
          style={{
            fontSize: "1.075rem",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {p.title}
        </h3>
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.72)",
          fontSize: "0.8125rem",
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {p.description}
      </p>
      {/* Tags */}
      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
        {p.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "0.18rem 0.7rem",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.625rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {link && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(0,200,180,0.7)",
            letterSpacing: "0.04em",
          }}
        >
          View Project →
        </div>
      )}
    </motion.div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {card}
      </a>
    );
  }
  return card;
}

function Projects() {
  const [tab, setTab] = useState<"enterprise" | "personal">("enterprise");

  return (
    <section
      id="work"
      style={{
        padding: "3.5rem clamp(1rem,3vw,2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
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
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                  tab === t ? "2px solid #fff" : "2px solid transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.58)",
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
              gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
              gap: "1rem",
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} i={i} />
            ))}
          </div>
        )}

        {tab === "personal" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
              gap: "1rem",
            }}
          >
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
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
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
          color: "rgba(255,255,255,0.55)",
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
          color: "#fff",
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
        borderTop: "1px solid rgba(255,255,255,0.08)",
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
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderRight:
                    i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "0.05rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Icon set="bulk" size={22} />
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.68)",
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
        borderTop: "1px solid rgba(255,255,255,0.08)",
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
              background: "rgba(255,255,255,0.1)",
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
                    background: "#fff",
                    boxShadow: "0 0 8px rgba(255,255,255,0.4)",
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
                        color: "#fff",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {job.company}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.58)",
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
                        color: "rgba(255,255,255,0.62)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {job.date}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.45)",
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
                    color: "rgba(255,255,255,0.68)",
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
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.68)",
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
        borderTop: "1px solid rgba(255,255,255,0.08)",
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
                color: "rgba(255,255,255,0.55)",
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
                color: "#fff",
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
                background: "#fff",
                color: "#000",
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
                color: "#fff",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)",
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
              href="https://trailblazer.salesforce.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.625rem",
                background: "transparent",
                color: "#fff",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <Globe size={16} />
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
                color: "#fff",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)",
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
              color: "rgba(255,255,255,0.58)",
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
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "1.5rem clamp(1rem,3vw,2.5rem)",
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
            color: "rgba(255,255,255,0.50)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} Ziyaad Adams
        </div>
        <a
          href="mailto:ziyaada22@gmail.com"
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.50)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
        >
          ziyaada22@gmail.com
        </a>
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.50)",
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
      {/* Hexagon background */}
      <ParticleBackground className="z-0" aria-hidden="true" />
      <CustomCursor />
      <div className="holo-left" aria-hidden="true" />
      <div className="holo-right" aria-hidden="true" />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
