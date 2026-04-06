'use client';
import { motion } from 'framer-motion';
import { SectionReveal, RevealChild } from './SectionReveal';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.gradientBorder} />
          <div className={styles.inner}>
            <div className={styles.glowOrb} />

            <SectionReveal className={styles.content}>
              <RevealChild>
                <h2 className={styles.title}>
                  Let&apos;s build something<br />
                  <span className="text-gradient-hero">that actually works.</span>
                </h2>
              </RevealChild>

              <RevealChild>
                <p className={styles.description}>
                  Currently exploring opportunities where I can help teams build
                  reliable AI/ML infrastructure. If you need someone who bridges
                  experimentation and production — let&apos;s talk.
                </p>
              </RevealChild>

              <RevealChild>
                <div className={styles.contactLinks}>
                  <motion.a
                    href="mailto:your.email@example.com"
                    className={styles.contactItem}
                    whileHover={{ x: 6 }}
                  >
                    <div className={styles.iconBox}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <span>your.email@example.com</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.arrow}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactItem}
                    whileHover={{ x: 6 }}
                  >
                    <div className={styles.iconBox}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span>linkedin.com/in/yourprofile</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.arrow}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://github.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactItem}
                    whileHover={{ x: 6 }}
                  >
                    <div className={styles.iconBox}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <span>github.com/yourprofile</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.arrow}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                </div>
              </RevealChild>

              <RevealChild>
                <div className={styles.cta}>
                  <motion.a
                    href="mailto:your.email@example.com"
                    className="button button-primary"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send an Email
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.a>
                  <motion.a
                    href="/resume.pdf"
                    className="button button-secondary"
                    download
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Download Resume
                  </motion.a>
                </div>
              </RevealChild>
            </SectionReveal>

            {/* Sidebar */}
            <motion.div
              className={styles.sidebar}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.statusCard}>
                <div className={styles.statusHeader}>
                  <div className={styles.statusDot} />
                  <span className={styles.statusText}>Available Now</span>
                </div>
                <p>Open to full-time roles as Senior Data Engineer or ML Platform Engineer</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Looking For</h3>
                <ul>
                  {['Teams building production ML', 'Data platform modernization', 'Cloud-native architecture', 'End-to-end ownership'].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={styles.stackCard}>
                <span className={styles.stackLabel}>Primary Stack</span>
                <div className={styles.stackPills}>
                  {['Python', 'Spark', 'Kafka', 'AWS', 'K8s'].map((t) => (
                    <span key={t} className={styles.stackPill}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
