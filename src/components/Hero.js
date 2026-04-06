'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

const titleLine1 = "I build the systems";
const titleLine2 = "teams rely on.";

const metrics = [
  { value: '7+', label: 'Years Shipping', suffix: '' },
  { value: '3', label: 'Cloud Platforms', suffix: '' },
  { value: 'E2E', label: 'Ingestion → Inference', suffix: '' },
];

const techBadges = [
  { label: 'Python', x: '5%', y: '18%', delay: 1.6 },
  { label: 'Kafka', x: '78%', y: '12%', delay: 1.8 },
  { label: 'AWS', x: '85%', y: '55%', delay: 2.0 },
  { label: 'Kubernetes', x: '8%', y: '72%', delay: 2.2 },
  { label: 'Databricks', x: '70%', y: '78%', delay: 2.4 },
  { label: 'PyTorch', x: '42%', y: '88%', delay: 2.6 },
];

const pipelineSteps = [
  { icon: '↓', label: 'Ingest' },
  { icon: '✓', label: 'Validate' },
  { icon: '⚡', label: 'Transform' },
  { icon: '🧠', label: 'Train' },
  { icon: '→', label: 'Serve' },
  { icon: '◉', label: 'Monitor' },
];

function AnimatedCounter({ value, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return <span>{displayed || '\u00A0'}</span>;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Gradient mesh backdrop */}
      <div className={styles.meshGradient} />

      <div className="container">
        <motion.div className={styles.layout} style={{ opacity }}>
          {/* Left — Copy */}
          <motion.div className={styles.copy} style={{ y: yText }}>
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className={styles.statusDot} />
              Senior Data Engineer &middot; ML Platforms
            </motion.div>

            <h1 className={styles.title}>
              <span className={styles.titleLine}>
                {titleLine1.split(' ').map((word, i) => (
                  <motion.span
                    key={`a-${i}`}
                    className={styles.word}
                    initial={{ opacity: 0, y: 50, rotateX: 40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.08,
                      ease: [0.25, 0.4, 0, 1],
                    }}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </span>
              <span className={`${styles.titleLine} ${styles.gradientLine}`}>
                {titleLine2.split(' ').map((word, i) => (
                  <motion.span
                    key={`b-${i}`}
                    className={styles.word}
                    initial={{ opacity: 0, y: 50, rotateX: 40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + i * 0.08,
                      ease: [0.25, 0.4, 0, 1],
                    }}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              7+ years across data platforms, cloud infrastructure, and production ML —
              turning ambitious ideas into pipelines, guardrails, and delivery systems
              that hold up in the real world.
            </motion.p>

            <motion.div
              className={styles.cta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.a
                href="#projects"
                className="button button-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View Selected Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.a>
              <motion.a
                href="#contact"
                className="button button-secondary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Metrics strip */}
            <motion.div
              className={styles.metricsStrip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              {metrics.map((m, i) => (
                <div key={m.label} className={styles.metric}>
                  <strong><AnimatedCounter value={m.value} delay={1.8 + i * 0.15} /></strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div className={styles.visual} style={{ y: yVisual }}>
            {/* Main pipeline card */}
            <motion.div
              className={styles.pipelineCard}
              initial={{ opacity: 0, x: 60, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0, 1] }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>delivery pipeline</span>
                <span className={styles.liveIndicator}>
                  <span className={styles.livePulse} />
                  live
                </span>
              </div>

              <div className={styles.pipeline}>
                {pipelineSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    className={styles.pipeNode}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 1.2 + i * 0.12,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    <div className={styles.nodeIcon}>{step.icon}</div>
                    <span className={styles.nodeLabel}>{step.label}</span>
                    {i < pipelineSteps.length - 1 && (
                      <div className={styles.connector}>
                        <div className={styles.connectorParticle} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Signal rows */}
              <div className={styles.signals}>
                {[
                  { k: 'Cloud', v: 'AWS · Azure · GCP' },
                  { k: 'Focus', v: 'Data + ML Platforms' },
                  { k: 'Style', v: 'Pragmatic, reliable, fast' },
                ].map((s, i) => (
                  <motion.div
                    key={s.k}
                    className={styles.signalRow}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.8 + i * 0.1 }}
                  >
                    <span className={styles.signalKey}>{s.k}</span>
                    <span className={styles.signalVal}>{s.v}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating tech badges */}
            {techBadges.map((badge) => (
              <motion.span
                key={badge.label}
                className={styles.floatingBadge}
                style={{ left: badge.x, top: badge.y }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: badge.delay, type: 'spring', stiffness: 150 }}
              >
                {badge.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
