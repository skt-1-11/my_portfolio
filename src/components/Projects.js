'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal, RevealChild } from './SectionReveal';
import styles from './Projects.module.css';

const projects = [
  {
    role: 'Data Platform Build',
    title: 'Real-time healthcare data backbone',
    description: 'Reworked brittle data flows into a cloud-native platform with cleaner orchestration, stronger quality checks, and monitoring that helped teams trust the data again.',
    impact: 'Shifted workflows from reactive firefighting to dependable operations.',
    highlights: ['Streaming + batch architecture', 'Data quality guardrails', 'Operational visibility'],
    tags: ['Azure', 'Databricks', 'Kafka', 'Python', 'SQL'],
    color: '#5b8cff',
    featured: true,
  },
  {
    role: 'GenAI Delivery',
    title: 'Document intelligence with RAG',
    description: 'Built the retrieval, embeddings, and serving layer for a document-heavy AI workflow designed for production rather than just impressive in a notebook.',
    impact: 'Made unstructured information faster to query and operationalize.',
    highlights: ['Embedding pipeline', 'Vector search architecture', 'Low-latency retrieval'],
    tags: ['LangChain', 'FAISS', 'Pinecone', 'OpenAI', 'Python'],
    color: '#8b5cf6',
    featured: true,
  },
  {
    role: 'MLOps Infrastructure',
    title: 'Multi-cloud model delivery layer',
    description: 'Standardized model training, deployment, and retraining across cloud environments so teams could move faster without sacrificing control.',
    impact: 'Created a repeatable path from experimentation to monitored release.',
    highlights: ['Versioning & registry', 'Automated retraining', 'A/B testing support'],
    tags: ['MLflow', 'Kubeflow', 'Docker', 'GitHub Actions', 'SageMaker'],
    color: '#34d399',
  },
  {
    role: 'Streaming Systems',
    title: 'Operational analytics in motion',
    description: 'Designed event-driven pipelines for near real-time reporting with dead-letter handling, freshness checks, and visibility into failure modes.',
    impact: 'Improved confidence in high-volume event processing under pressure.',
    highlights: ['Fault-tolerant streams', 'Freshness monitoring', 'Analytics reliability'],
    tags: ['Kafka', 'Apache Beam', 'BigQuery', 'Dataflow', 'Python'],
    color: '#fbbf24',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 50, y: 50 }); }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0, 1] }}
    >
      {/* Hover glow */}
      <div
        className={styles.hoverGlow}
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${project.color}12 0%, transparent 60%)`
            : 'none',
        }}
      />
      {/* Border glow */}
      <div
        className={styles.borderGlow}
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${project.color}40 0%, transparent 60%)`
            : 'none',
        }}
      />

      <div className={styles.cardContent}>
        <div className={styles.cardRole} style={{ color: project.color }}>
          <span className={styles.roleBar} style={{ background: project.color }} />
          {project.role}
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        <div className={styles.impactBox}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1v14M1 8h14" stroke={project.color} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>{project.impact}</span>
        </div>

        <ul className={styles.highlights}>
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag} style={{ borderColor: `${project.color}20` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionReveal>
          <div className={styles.heading}>
            <div>
              <RevealChild>
                <div className="eyebrow">Selected Work</div>
              </RevealChild>
              <RevealChild>
                <h2 className={styles.sectionTitle}>
                  Outcomes, not just <span className="text-gradient">tools.</span>
                </h2>
              </RevealChild>
            </div>
            <RevealChild>
              <p className={styles.intro}>
                Focused on the systems built, problems solved, and operational impact created.
              </p>
            </RevealChild>
          </div>
        </SectionReveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
