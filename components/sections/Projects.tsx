"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

interface Project {
  id: string;
  title: string;
  titleLine2?: string;
  tech: string;
  logo: string;
  image1?: string;
  image2?: string;
  color: string;
  animClass: string;
  description: string;
  employer: string;
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    impact: string;
    techStack: string[];
  };
}

const projects: Project[] = [
  {
    id: "uk-gov",
    title: "UK Government",
    titleLine2: "Healthcare",
    description:
      "Built patient engagement journeys for the NHS Professionals platform, handling millions of healthcare communications.",
    tech: "MARKETING CLOUD · DATA CLOUD · APEX",
    logo: "/logos/uk-gov.svg",
    image1: "/images/uk-gov-1.webp",
    image2: "/images/uk-gov-2.webp",
    color: "#3B82F6",
    animClass: "uk-gov-anim",
    employer: "via Digital Modus",
    caseStudy: {
      overview:
        "Led the development of a patient engagement platform for NHS Professionals (NHSP), the UK Government's healthcare staffing arm, managing digital communications across the national health system.",
      challenge:
        "NHSP needed to modernise their communication infrastructure to handle millions of healthcare worker touchpoints — shift confirmations, compliance reminders, and onboarding journeys — with strict NHS data governance requirements.",
      solution:
        "Designed and built multi-channel engagement journeys in Marketing Cloud, integrated with Data Cloud for unified healthcare worker profiles. Built custom Apex services for real-time data sync between Salesforce and legacy NHS systems.",
      impact:
        "Processed millions of automated communications monthly, reduced manual admin overhead by 60%, and improved healthcare worker engagement rates across the platform.",
      techStack: [
        "Marketing Cloud",
        "Data Cloud",
        "Apex",
        "AMPscript",
        "Journey Builder",
        "REST APIs",
      ],
    },
  },
  {
    id: "capitec",
    title: "Capitec Bank",
    titleLine2: "Bank",
    description:
      "Developed a fraud detection and case management system processing thousands of daily alerts for South Africa's largest digital bank.",
    tech: "OMNISTUDIO · APEX · LWC · FLOWS",
    logo: "/logos/capitec.svg",
    image1: "/images/capitec-1.webp",
    image2: "/images/capitec-2.webp",
    color: "#10B981",
    animClass: "capitec-anim",
    employer: "via BlueSky",
    caseStudy: {
      overview:
        "Built an enterprise fraud detection and case management system for Capitec Bank, South Africa's largest digital bank with over 21 million clients.",
      challenge:
        "Capitec needed a scalable system to process thousands of daily fraud alerts, route them to investigation teams, and maintain full audit trails — all within strict banking compliance requirements.",
      solution:
        "Architected OmniStudio-powered investigation workflows with dynamic case routing. Built custom LWC components for real-time fraud dashboards and Apex services for automated alert triage and SLA management.",
      impact:
        "Reduced average fraud case resolution time by 40%, automated 70% of initial alert triage, and achieved full regulatory audit compliance across the platform.",
      techStack: [
        "OmniStudio",
        "Apex",
        "LWC",
        "Flows",
        "Platform Events",
        "Service Cloud",
      ],
    },
  },
  {
    id: "absa",
    title: "ABSA",
    titleLine2: "Bank",
    description:
      "Architected an enterprise complaints management platform integrating Service Cloud with legacy banking systems.",
    tech: "SERVICE CLOUD · FLOWS · APEX",
    logo: "/logos/absa.svg",
    image1: "/images/absa-1.webp",
    image2: "/images/absa-2.webp",
    color: "#DC2626",
    animClass: "absa-anim",
    employer: "via BlueSky",
    caseStudy: {
      overview:
        "Delivered an enterprise complaints management platform for ABSA Bank, one of Africa's largest financial services groups, serving millions of customers across the continent.",
      challenge:
        "ABSA's complaint process was fragmented across legacy systems with no unified view, leading to SLA breaches, regulatory risk, and poor customer experience across multiple business units.",
      solution:
        "Built a centralised Service Cloud complaints platform with automated case routing, escalation flows, and custom Apex integrations to legacy banking middleware. Implemented real-time SLA tracking and regulatory reporting dashboards.",
      impact:
        "Unified complaints management across 5 business units, reduced SLA breaches by 55%, and enabled real-time regulatory reporting to the South African Banking Ombudsman.",
      techStack: [
        "Service Cloud",
        "Flows",
        "Apex",
        "REST APIs",
        "Report Builder",
        "Lightning App Builder",
      ],
    },
  },
  {
    id: "heineken",
    title: "Heineken",
    titleLine2: "/ Distell",
    description:
      "Delivered a B2B commerce platform with CPQ and MuleSoft integrations for distributor ordering across Africa.",
    tech: "CPQ · MULESOFT · B2B COMMERCE",
    logo: "/logos/heineken.svg",
    image1: "/images/heineken-1.webp",
    image2: "/images/heineken-2.webp",
    color: "#D97706",
    animClass: "heineken-anim",
    employer: "via Cloudmuscle",
    caseStudy: {
      overview:
        "Built a B2B commerce and distributor management platform for Heineken/Distell, one of Africa's largest beverage companies, supporting distributor ordering at scale.",
      challenge:
        "Heineken/Distell needed to digitise their distributor ordering process — previously handled via phone and spreadsheet — across multiple African markets with complex pricing, promotions, and inventory rules.",
      solution:
        "Implemented Salesforce CPQ with custom pricing rules and product bundles. Built MuleSoft integrations connecting Salesforce to SAP ERP for real-time inventory and order fulfilment. Deployed B2B Commerce storefronts for self-service ordering.",
      impact:
        "Digitised ordering for 200+ distributors, reduced order processing time from days to minutes, and improved order accuracy to 98% through automated validation.",
      techStack: [
        "CPQ",
        "MuleSoft",
        "B2B Commerce",
        "Apex",
        "SAP Integration",
        "Experience Cloud",
      ],
    },
  },
  {
    id: "fourpaws",
    title: "Four Paws",
    titleLine2: "International",
    description:
      "Migrated global donor data to NPSP and automated fundraising workflows across 15 countries.",
    tech: "NPSP · DATA MIGRATION · FLOWS",
    logo: "/logos/fourpaws.svg",
    image1: "/images/fourpaws-1.webp",
    image2: "/images/fourpaws-2.webp",
    color: "#8B5CF6",
    animClass: "fourpaws-anim",
    employer: "via Cloudsmiths",
    caseStudy: {
      overview:
        "Led the Salesforce implementation for Four Paws International, a global animal welfare organisation operating across 15 countries with thousands of active donors.",
      challenge:
        "Four Paws had donor data scattered across multiple legacy systems and spreadsheets in different countries, with no unified view of donor engagement or fundraising performance.",
      solution:
        "Migrated and deduplicated 100K+ donor records into Salesforce NPSP. Built automated fundraising workflows including donation receipting, recurring gift management, and multi-currency campaign tracking. Implemented custom reports for global fundraising analytics.",
      impact:
        "Achieved a unified donor database across 15 countries, automated 80% of donation admin workflows, and increased donor retention by 25% through targeted re-engagement campaigns.",
      techStack: [
        "NPSP",
        "Data Loader",
        "Flows",
        "Process Builder",
        "Reports & Dashboards",
        "Campaigns",
      ],
    },
  },
  {
    id: "philipmorris",
    title: "Philip Morris",
    titleLine2: "International",
    description:
      "Built a customer portal for product registration and support, integrating with global ERP and identity systems.",
    tech: "EXPERIENCE CLOUD · APEX · REST API",
    logo: "/logos/philipmorris.svg",
    color: "#F59E0B",
    animClass: "philipmorris-anim",
    employer: "via BlueSky",
    caseStudy: {
      overview:
        "Developed a customer-facing Experience Cloud portal for Philip Morris International, supporting product registration and customer support for their smoke-free product line across multiple markets.",
      challenge:
        "PMI needed a self-service portal for customers to register products, track warranty claims, and access support — all integrated with their global SAP ERP and Azure AD identity systems, across multiple languages and markets.",
      solution:
        "Built a branded Experience Cloud portal with custom Apex REST integrations to SAP for product registration and warranty validation. Implemented SSO via Azure AD, multi-language support, and custom LWC components for a seamless customer experience.",
      impact:
        "Launched across 3 markets, reduced support ticket volume by 35% through self-service, and achieved 95% customer satisfaction scores on the portal experience.",
      techStack: [
        "Experience Cloud",
        "Apex",
        "REST APIs",
        "LWC",
        "Azure AD SSO",
        "SAP Integration",
      ],
    },
  },
];

/* ===== Case Study Modal ===== */
function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate in
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "power3.out" },
    );
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(contentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div ref={contentRef} className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__left">
            <span
              className="modal-header__employer"
              style={{ color: project.color }}
            >
              {project.employer.toUpperCase()}
            </span>
            <h2 className="modal-header__title">
              {project.title} {project.titleLine2}
            </h2>
            <p className="modal-header__tech">{project.tech}</p>
          </div>
          <button
            className="modal-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-section">
            <h4 className="modal-section__label">OVERVIEW</h4>
            <p className="modal-section__text">{project.caseStudy.overview}</p>
          </div>
          <div className="modal-section">
            <h4 className="modal-section__label">THE CHALLENGE</h4>
            <p className="modal-section__text">{project.caseStudy.challenge}</p>
          </div>
          <div className="modal-section">
            <h4 className="modal-section__label">THE SOLUTION</h4>
            <p className="modal-section__text">{project.caseStudy.solution}</p>
          </div>
          <div className="modal-section">
            <h4 className="modal-section__label">IMPACT</h4>
            <p className="modal-section__text">{project.caseStudy.impact}</p>
          </div>
          <div className="modal-section">
            <h4 className="modal-section__label">TECH STACK</h4>
            <div className="modal-tags">
              {project.caseStudy.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="modal-tag"
                  style={{
                    borderColor: `${project.color}30`,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Project Card ===== */
function ProjectCard({
  project,
  onViewCase,
}: {
  project: Project;
  onViewCase: (p: Project) => void;
}) {
  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project.image1 || !project.image2 || !hoverRef.current) return;

    let hoverInstance: any = null;

    // Dynamic import hover-effect (it uses Three.js / WebGL)
    import("hover-effect").then((mod) => {
      const HoverEffect = mod.default;
      if (!hoverRef.current) return;
      hoverInstance = new HoverEffect({
        parent: hoverRef.current,
        intensity: 0.3,
        image1: project.image1,
        image2: project.image2,
        displacementImage: "/images/displacement.webp",
      });
    });

    return () => {
      // Clean up Three.js renderer
      if (hoverInstance && hoverInstance.scene) {
        try {
          const canvas = hoverRef.current?.querySelector("canvas");
          if (canvas) canvas.remove();
        } catch (_) {}
      }
    };
  }, [project.image1, project.image2]);

  return (
    <div
      className="project-card"
      style={{ "--project-color": project.color } as React.CSSProperties}
    >
      {/* Image area — hover-effect if images available, else logo */}
      <div className="project-card__logo">
        {project.image1 && project.image2 ? (
          <div ref={hoverRef} className="project-card__hover-effect" />
        ) : (
          <img src={project.logo} alt={`${project.title} logo`} />
        )}
      </div>

      {/* Info below logo */}
      <div className="project-card__info">
        <span className="project-card__employer">{project.employer}</span>
        <h2 className={`project-card__title ${project.animClass}`}>
          {project.title}
          {project.titleLine2 && (
            <>
              <br />
              {project.titleLine2}
            </>
          )}
        </h2>
        <p className="project-card__description">{project.description}</p>
        <p className="project-card__tech">{project.tech}</p>
        <div className="project-card__bottom">
          <button
            className="project-card__link"
            onClick={() => onViewCase(project)}
          >
            VIEW CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Projects Section ===== */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial hidden states
    gsap.set(".section-projects .projects-header", { y: 40, autoAlpha: 0 });
    gsap.set(".project-card", { y: 60, autoAlpha: 0 });

    // Use IntersectionObserver for reliable viewport detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to(".section-projects .projects-header", {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
          }).to(
            ".project-card",
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.4",
          );
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="sectionProjects"
        className="section-projects"
      >
        <div className="projects-header">
          <span className="section-label">03 // WORK</span>
          <h1 className="heading-1">
            <span>Yeah, I work hard </span> <small>💼</small>
          </h1>
          <p className="paragraph">
            Each project is unique. Here are some of my works.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewCase={setActiveProject}
            />
          ))}
        </div>
      </section>

      {activeProject &&
        createPortal(
          <CaseStudyModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />,
          document.body,
        )}
    </>
  );
}
