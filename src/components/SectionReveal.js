'use client';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0, 1],
    },
  },
};

export function SectionReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        ...sectionVariants,
        visible: {
          ...sectionVariants.visible,
          transition: { ...sectionVariants.visible.transition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealChild({ children, className = '' }) {
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
}
