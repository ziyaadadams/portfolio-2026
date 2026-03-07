'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const workHistory = [
  {
    company: 'Digital Modus',
    role: 'Salesforce Developer',
    date: 'Mar 2025 — Present',
    location: 'Cape Town, South Africa',
    description: 'Outsourced Salesforce Developer and Consultant, specializing in end-to-end client project delivery for high-profile accounts like the NHSP (UK Government Health), translating complex business requirements into robust technical solutions.',
    clients: ['NHSP / UK Government'],
    logo: '/logos/digitalmodus.png',
  },
  {
    company: 'BlueSky',
    role: 'Salesforce Developer',
    date: 'Sep 2022 — Mar 2025',
    location: 'Cape Town, South Africa',
    description: 'Outsourced to major enterprise clients, delivering full-cycle Salesforce projects — from discovery to deployment — across banking, FMCG, and global consumer industries.',
    clients: ['Capitec Bank', 'ABSA Bank', 'Philip Morris International'],
    logo: '/logos/bluesky.svg',
  },
  {
    company: 'Cloudmuscle B.V.',
    role: 'Salesforce Developer',
    date: 'Mar 2022 — Aug 2022',
    location: 'Remote · Netherlands',
    description: 'Executed Salesforce development and consulting services as a flexible project resource — quickly adapting to serve as developer, administrator, or technical consultant based on project demands.',
    clients: ['Heineken / Distell'],
    logo: '/logos/cloudmuscle.svg',
  },
  {
    company: 'Cloudsmiths',
    role: 'Salesforce Developer',
    date: 'Sep 2020 — Mar 2022',
    location: 'Cape Town, South Africa',
    description: 'Developed and maintained full-stack applications on the Salesforce Platform, leveraging diverse frameworks and administrative configurations to meet custom client requirements.',
    clients: ['Four Paws International'],
    logo: '/logos/cloudsmiths.png',
  },
];

const skills = [
  { category: 'SALESFORCE', items: ['Apex', 'LWC', 'Flows', 'SOQL', 'Triggers', 'Platform Events'] },
  { category: 'CLOUD PRODUCTS', items: ['Marketing Cloud', 'Data Cloud', 'Service Cloud', 'CPQ', 'B2B Commerce'] },
  { category: 'INTEGRATION', items: ['MuleSoft', 'REST/SOAP APIs', 'OmniStudio', 'Heroku Connect', 'Event Bus'] },
  { category: 'WEB & TOOLING', items: ['TypeScript', 'React/Next.js', 'Node.js', 'Git', 'CI/CD', 'Jest'] },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial hidden states
    gsap.set('.experience__header', { y: 40, autoAlpha: 0 });
    gsap.set('.work-item', { y: 30, autoAlpha: 0 });
    gsap.set('.skill-group', { y: 30, autoAlpha: 0 });

    // Use IntersectionObserver instead of ScrollTrigger for reliable
    // viewport detection with the custom smooth-scroll container
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to('.experience__header', {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
          })
            .to(
              '.work-item',
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
              },
              '-=0.4'
            )
            .to(
              '.skill-group',
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
              },
              '-=0.4'
            );
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-experience">
      <div className="experience__header">
        <span className="section-label">02 // EXPERIENCE</span>
        <h2 className="heading-2">Where I&apos;ve Worked</h2>
        <p className="paragraph experience__description">
          5+ years as an outsourced Salesforce consultant, building enterprise solutions
          across banking, healthcare, FMCG, and non-profit sectors for major global clients.
        </p>
      </div>

      {/* Work Timeline */}
      <div className="work-timeline">
        <h4 className="work-timeline__title">CAREER HISTORY</h4>
        {workHistory.map((job, i) => (
          <div key={i} className="work-item">
            <div className="work-item__left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="work-item__logo"
              />
              <span className="work-item__role">{job.role}</span>
              <span className="work-item__description">{job.description}</span>
              {job.clients.length > 0 && (
                <div className="work-item__clients">
                  {job.clients.map((client, j) => (
                    <span key={j} className="work-item__client-tag">{client}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="work-item__right">
              <span className="work-item__date">{job.date}</span>
              <span className="work-item__location">{job.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="skills-grid">
        {skills.map((group, i) => (
          <div key={i} className="skill-group">
            <h4 className="skill-group__title">{group.category}</h4>
            <ul className="skill-group__list">
              {group.items.map((item, j) => (
                <li key={j} className="skill-group__item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
