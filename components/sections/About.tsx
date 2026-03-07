'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 px-6 max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-neutral-500 text-sm tracking-wide mb-4">About</p>
        
        <h2 className="text-3xl md:text-4xl font-light text-white leading-relaxed mb-8">
          I'm a Senior Salesforce Engineer with 8+ years building enterprise systems 
          for <span className="text-neutral-400">Capitec Bank</span>, <span className="text-neutral-400">ABSA</span>, 
          and the <span className="text-neutral-400">UK Government</span>.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { number: '8+', label: 'Years Experience' },
            { number: '40+', label: 'Projects Delivered' },
            { number: '99%', label: 'Success Rate' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="border-t border-neutral-800 pt-6"
            >
              <p className="text-4xl font-light text-white mb-2">{stat.number}</p>
              <p className="text-neutral-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
