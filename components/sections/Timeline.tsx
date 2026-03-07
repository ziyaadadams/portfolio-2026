'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Timeline() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const timeline = [
    {
      period: '2023-NOW',
      company: 'Digital Modus',
      role: 'Lead Architect',
      highlight: '20+ Projects',
      color: '#00d9ff',
    },
    {
      period: '2021-2023',
      company: 'BlueSky',
      role: 'Senior Developer',
      highlight: '$50M+ Saved',
      color: '#a78bfa',
    },
    {
      period: '2019-2021',
      company: 'Cloudsmiths',
      role: 'SF Developer',
      highlight: 'OmniStudio Expert',
      color: '#10b981',
    },
    {
      period: '2017-2019',
      company: 'Consulting',
      role: 'Full-Stack Dev',
      highlight: 'Foundation',
      color: '#f59e0b',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20 relative"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-accent-purple font-mono text-sm tracking-widest">// EXPERIENCE</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 gradient-text-animated">
            The Journey
          </h2>
        </motion.div>

        {/* Horizontal timeline for desktop */}
        <div className="hidden md:block relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <div className="grid grid-cols-4 gap-4">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Node */}
                <motion.div
                  className="w-full aspect-square glass rounded-xl p-4 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: `0 20px 40px ${item.color}25`,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}15 0%, transparent 70%)` }}
                  />

                  {/* Period */}
                  <span 
                    className="font-mono text-xs tracking-wider"
                    style={{ color: item.color }}
                  >
                    {item.period}
                  </span>

                  {/* Company */}
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-0.5">
                      {item.company}
                    </h3>
                    <p className="text-text-secondary/60 text-sm font-mono">
                      {item.role}
                    </p>
                  </div>

                  {/* Highlight */}
                  <span 
                    className="text-xs px-2 py-1 rounded font-mono inline-block w-fit"
                    style={{ 
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.highlight}
                  </span>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ border: `1px solid ${item.color}40` }}
                  />
                </motion.div>

                {/* Connector dot */}
                <motion.div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 15px ${item.color}` }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical timeline for mobile */}
        <div className="md:hidden space-y-4">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-xl p-4 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ background: item.color }}
              />
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold" style={{ color: item.color }}>{item.company}</h3>
                <span className="text-xs font-mono text-text-secondary/60">{item.period}</span>
              </div>
              <p className="text-sm text-text-secondary/80">{item.role}</p>
              <span 
                className="text-xs mt-2 inline-block px-2 py-0.5 rounded font-mono"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
