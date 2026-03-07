'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Zap, Cog, Lightbulb } from 'lucide-react';

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const services = [
    {
      id: 1,
      icon: Code2,
      title: 'Architecture',
      subtitle: 'Enterprise Salesforce Design',
      tags: ['Multi-cloud', 'Scalable', 'Optimized'],
      color: '#00d9ff',
    },
    {
      id: 2,
      icon: Zap,
      title: 'Integration',
      subtitle: 'Connect Everything',
      tags: ['Mulesoft', 'APIs', 'Real-time'],
      color: '#a78bfa',
    },
    {
      id: 3,
      icon: Cog,
      title: 'Automation',
      subtitle: 'Eliminate Manual Work',
      tags: ['Flow', 'Apex', 'AI'],
      color: '#10b981',
    },
    {
      id: 4,
      icon: Lightbulb,
      title: 'Consulting',
      subtitle: 'Strategic Guidance',
      tags: ['Audits', 'Migration', 'Training'],
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
    hidden: { opacity: 0, y: 40, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20 relative"
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"
            style={{ top: `${30 + i * 20}%`, left: '-100%', right: '-100%' }}
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 2 }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-accent-blue font-mono text-sm tracking-widest">// SERVICES</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 gradient-text-animated">
            What I Build
          </h2>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group glass rounded-xl p-6 cursor-pointer relative overflow-hidden h-64"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 25px 50px ${service.color}25`,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Glow background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${service.color}15 0%, transparent 70%)` }}
                />

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-lg p-2.5 mb-4 relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}20, transparent)`,
                    border: `1px solid ${service.color}30`,
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-full h-full" style={{ color: service.color }} />
                </motion.div>

                {/* Content */}
                <h3 
                  className="text-xl font-bold mb-1 transition-colors"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                <p className="text-text-secondary/60 text-sm mb-4 font-mono">
                  {service.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 absolute bottom-6 left-6 right-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ 
                        background: `${service.color}10`,
                        color: `${service.color}`,
                        border: `1px solid ${service.color}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ border: `1px solid ${service.color}40` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
