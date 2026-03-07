'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const skills = [
    { category: 'Salesforce', items: ['Apex', 'LWC', 'OmniStudio', 'Marketing Cloud', 'Service Cloud'] },
    { category: 'Integration', items: ['Mulesoft', 'SAP', 'AWS', 'REST APIs', 'GraphQL'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Architecture', items: ['System Design', 'Microservices', 'Cloud', 'Security'] },
  ];

  return (
    <section id="skills" ref={ref} className="py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-neutral-500 text-sm tracking-wide mb-4">Expertise</p>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-16">Skills</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h3 className="text-neutral-400 text-sm tracking-wide mb-4">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm text-neutral-300 border border-neutral-800 rounded-full hover:border-neutral-600 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
