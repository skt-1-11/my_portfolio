'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionReveal, RevealChild } from './SectionReveal';
import styles from './Experience.module.css';

const companies = [
  {
    company: 'UnitedHealth Group',
    role: 'Data Engineer',
    period: 'Sep 2024 — Present',
    current: true,
    color: '#00d4ff',
    description: 'Building production-grade data platforms and ML infrastructure for healthcare at scale.',
    tech: ['Azure', 'Databricks', 'Kafka', 'Python'],
  },
  {
    company: 'Capital One',
    role: 'Data Engineer',
    period: 'Aug 2020 — Jun 2023',
    current: false,
    color: '#7c3aed',
    description: 'Designed and operated streaming and batch pipelines powering financial data products and ML models.',
    tech: ['AWS', 'Spark', 'Airflow', 'Snowflake'],
  },
  {
    company: 'Kroger',
    role: 'Data Engineer',
    period: 'Jun 2017 — Aug 2020',
    current: false,
    color: '#34d399',
    description: 'Built foundational data infrastructure and ETL systems supporting analytics across retail operations.',
    tech: ['GCP', 'BigQuery', 'Python', 'SQL'],
  },
];

const differentiators = [
  {
    title: 'Production-first engineering',
    text: 'I care about what happens after launch: reliability, observability, cost, and whether the system is still usable six months later.',
    color: '#5b8cff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'Strong partner to product & ML teams',
    text: 'I translate vague business asks into data contracts, platform guardrails, and delivery plans teams can actually execute.',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Own the critical plumbing',
    text: 'Schema drift, backfills, streaming lag, dead-letter paths, deployment hygiene — where durable data systems are won.',
    color: '#34d399',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const workflow = [
  { step: '01', title: 'Frame the real problem', text: 'Map the ask to data flows, model touchpoints, and operational risks before writing code.' },
  { step: '02', title: 'Build the path to production', text: 'Design pipeline, storage, orchestration, and serving as one connected system.' },
  { step: '03', title: 'Instrument what matters', text: 'Add checks for freshness, failures, retries, and downstream impact so issues surface early.' },
  { step: '04', title: 'Keep it practical', text: 'Balance scale, speed, and cost — then leave the team with workflows they can maintain.' },
];

function YearsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={styles.yearsNumber}>
      {inView ? '7+' : '0'}
    </span>
  );
}

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        {/* Section header */}
        <SectionReveal>
          <RevealChild>
            <div className="eyebrow">Experience</div>
          </RevealChild>
          <RevealChild>
            <h2 className={styles.sectionTitle}>
              <YearsCounter /> years building data systems
              <span className="text-gradient"> that teams rely on.</span>
            </h2>
          </RevealChild>
        </SectionReveal>

        {/* Work history timeline */}
        <div className={styles.careerTimeline}>
          {companies.map((job, i) => (
            <motion.div
              key={job.company}
              className={styles.jobCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.4, 0, 1] }}
            >
              {/* Timeline connector */}
              <div className={styles.jobTimeline}>
                <div className={styles.jobDot} style={{ background: job.color, boxShadow: `0 0 12px ${job.color}40` }}>
                  {job.current && <span className={styles.currentPulse} style={{ borderColor: job.color }} />}
                </div>
                {i < companies.length - 1 && <div className={styles.jobLine} />}
              </div>

              {/* Card content */}
              <motion.div
                className={styles.jobContent}
                whileHover={{ borderColor: `${job.color}25`, y: -2 }}
              >
                <div className={styles.jobHeader}>
                  <div>
                    <h3 className={styles.jobCompany}>{job.company}</h3>
                    <p className={styles.jobRole}>{job.role}</p>
                  </div>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobPeriod}>{job.period}</span>
                    {job.current && (
                      <span className={styles.currentBadge}>
                        <span className={styles.currentDot} />
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <p className={styles.jobDesc}>{job.description}</p>
                <div className={styles.jobTech}>
                  {job.tech.map(t => (
                    <span key={t} className={styles.techTag} style={{ borderColor: `${job.color}20`, color: job.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Why hire me + How I work */}
        <div className={styles.wrapper}>
          <SectionReveal>
            <div className={styles.content}>
              <RevealChild>
                <div className="eyebrow">Why Teams Hire Me</div>
              </RevealChild>
              <RevealChild>
                <h2 className={styles.title}>
                  A senior builder for the messy middle between
                  <span className="text-gradient"> data, ML, and delivery.</span>
                </h2>
              </RevealChild>
              <RevealChild>
                <p className={styles.lead}>
                  The value isn&apos;t just technical breadth. It&apos;s knowing how to make complex systems
                  feel stable, understandable, and useful to the people depending on them.
                </p>
              </RevealChild>

              <div className={styles.cards}>
                {differentiators.map((item, i) => (
                  <motion.article
                    key={item.title}
                    className={styles.card}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.4, 0, 1] }}
                    whileHover={{ x: 4, borderColor: `${item.color}20` }}
                  >
                    <div className={styles.cardIcon} style={{ color: item.color, borderColor: `${item.color}20`, background: `${item.color}08` }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Timeline card */}
          <motion.div
            className={styles.timelineCard}
            initial={{ opacity: 0, y: 40, rotateY: -4 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0, 1] }}
          >
            <div className={styles.timelineGlow} />
            <div className={styles.timelineHeader}>
              <span>How I Work</span>
              <span className={styles.headerBadge}>operator mindset</span>
            </div>

            <div className={styles.timeline}>
              {workflow.map((item, i) => (
                <motion.div
                  key={item.step}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <motion.div
                    className={styles.step}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 24px rgba(0, 212, 255, 0.15)' }}
                  >
                    {item.step}
                  </motion.div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                  {i < workflow.length - 1 && (
                    <motion.div
                      className={styles.timelineLine}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
