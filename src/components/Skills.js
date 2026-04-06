'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionReveal, RevealChild } from './SectionReveal';
import SkillConstellation from './SkillConstellation';
import styles from './Skills.module.css';

const focusAreas = [
  { label: 'Production ML', text: 'Turning models into services teams can depend on.', color: '#8b5cf6' },
  { label: 'Data Platforms', text: 'Reliable movement, storage, and orchestration at scale.', color: '#5b8cff' },
  { label: 'Cloud Delivery', text: 'Multi-cloud architecture with operational discipline.', color: '#34d399' },
];

const expertiseAreas = [
  {
    category: 'Platform & Pipelines',
    pct: 92,
    skills: ['Airflow', 'dbt', 'Kafka', 'Apache Beam', 'Databricks', 'Snowflake'],
    color: '#5b8cff',
  },
  {
    category: 'ML & GenAI Systems',
    pct: 88,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'OpenAI'],
    color: '#8b5cf6',
  },
  {
    category: 'Cloud & Infra',
    pct: 85,
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes'],
    color: '#34d399',
  },
  {
    category: 'Datastores',
    pct: 90,
    skills: ['PostgreSQL', 'MySQL', 'BigQuery', 'DynamoDB', 'MongoDB', 'Redis'],
    color: '#06b6d4',
  },
  {
    category: 'MLOps',
    pct: 82,
    skills: ['MLflow', 'Kubeflow', 'GitHub Actions', 'Model Registry', 'Monitoring'],
    color: '#f472b6',
  },
  {
    category: 'Search & Retrieval',
    pct: 78,
    skills: ['FAISS', 'Pinecone', 'Weaviate', 'OpenSearch', 'ChromaDB'],
    color: '#fbbf24',
  },
];

function AnimatedBar({ pct, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <div ref={ref} className={styles.levelBar}>
      <motion.div
        className={styles.levelFill}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0, 1] }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={`section ${styles.section}`}>
      <div className="container">
        <SectionReveal>
          <div className={styles.header}>
            <div>
              <RevealChild>
                <div className="eyebrow">Capability Map</div>
              </RevealChild>
              <RevealChild>
                <h2 className={styles.title}>
                  A stack built for <span className="text-gradient">scale and execution.</span>
                </h2>
              </RevealChild>
            </div>
            <RevealChild>
              <p className={styles.subtitle}>
                Not how many tools appear on the page — but how they connect to real delivery work.
              </p>
            </RevealChild>
          </div>
        </SectionReveal>

        {/* Focus areas */}
        <motion.div
          className={styles.focusStrip}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {focusAreas.map((item) => (
            <motion.div
              key={item.label}
              className={styles.focusCard}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -4, borderColor: `${item.color}30` }}
            >
              <div className={styles.focusAccent} style={{ background: item.color }} />
              <span className={styles.focusLabel} style={{ color: item.color }}>{item.label}</span>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Constellation */}
        <div className={styles.constellationSection}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
          >
            <SkillConstellation />
          </motion.div>
        </div>

        {/* Expertise grid */}
        <div className={styles.expertiseGrid}>
          {expertiseAreas.map((area, i) => (
            <motion.article
              key={area.category}
              className={styles.expertiseCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ borderColor: `${area.color}25`, y: -3 }}
            >
              <div className={styles.expertiseHeader}>
                <h3>{area.category}</h3>
                <span className={styles.pctBadge} style={{ color: area.color, borderColor: `${area.color}30` }}>
                  {area.pct}%
                </span>
              </div>
              <AnimatedBar pct={area.pct} color={area.color} delay={0.15 + i * 0.06} />
              <div className={styles.tagCloud}>
                {area.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className={styles.skillPill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + si * 0.04 }}
                    whileHover={{
                      background: `${area.color}12`,
                      borderColor: `${area.color}25`,
                      color: area.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
