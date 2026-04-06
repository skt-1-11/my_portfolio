'use client';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './SkillConstellation.module.css';

const CATEGORIES = [
  {
    name: 'Platform & Pipelines',
    short: 'Pipelines',
    color: '#5b8cff',
    pct: 92,
    skills: ['Airflow', 'dbt', 'Kafka', 'Apache Beam', 'Databricks', 'Snowflake'],
  },
  {
    name: 'ML & GenAI',
    short: 'ML/AI',
    color: '#8b5cf6',
    pct: 88,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'OpenAI'],
  },
  {
    name: 'Cloud & Infra',
    short: 'Cloud',
    color: '#34d399',
    pct: 85,
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes'],
  },
  {
    name: 'Datastores',
    short: 'Data',
    color: '#06b6d4',
    pct: 90,
    skills: ['PostgreSQL', 'MySQL', 'BigQuery', 'DynamoDB', 'MongoDB', 'Redis'],
  },
  {
    name: 'MLOps',
    short: 'MLOps',
    color: '#f472b6',
    pct: 82,
    skills: ['MLflow', 'Kubeflow', 'GitHub Actions', 'Model Registry', 'Monitoring'],
  },
  {
    name: 'Search & Retrieval',
    short: 'Search',
    color: '#fbbf24',
    pct: 78,
    skills: ['FAISS', 'Pinecone', 'Weaviate', 'OpenSearch', 'ChromaDB'],
  },
];

// SVG dimensions
const W = 700;
const H = 500;
const CX = W / 2;
const CY = H / 2;
const CAT_RADIUS = 165;
const SKILL_RADIUS = 55;

function toRad(deg) { return (deg * Math.PI) / 180; }

function getCatCenter(index) {
  const angle = toRad(270 + (360 / CATEGORIES.length) * index);
  return { x: CX + CAT_RADIUS * Math.cos(angle), y: CY + CAT_RADIUS * Math.sin(angle) };
}

function getSkillPos(catIndex, skillIndex, totalSkills) {
  const center = getCatCenter(catIndex);
  const angle = ((2 * Math.PI) / totalSkills) * skillIndex - Math.PI / 2;
  return {
    x: center.x + SKILL_RADIUS * Math.cos(angle),
    y: center.y + SKILL_RADIUS * Math.sin(angle),
  };
}

const CONNECTIONS = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4],[2,5]];

export default function SkillConstellation() {
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const dur = 1500;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      setAnimProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  const allNodes = useMemo(() =>
    CATEGORIES.map((cat, ci) => ({
      ...cat,
      center: getCatCenter(ci),
      skillPositions: cat.skills.map((s, si) => ({
        name: s,
        ...getSkillPos(ci, si, cat.skills.length),
      })),
      index: ci,
    }))
  , []);

  const handleHover = useCallback((ci) => setHovered(ci), []);
  const handleLeave = useCallback(() => setHovered(null), []);

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.glow} />
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
        <defs>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {CATEGORIES.map((cat, i) => (
            <radialGradient key={i} id={`cat-glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={cat.color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={cat.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Grid dots */}
        {Array.from({ length: 18 }, (_, i) =>
          Array.from({ length: 13 }, (_, j) => (
            <circle
              key={`g-${i}-${j}`}
              cx={(i + 0.5) * (W / 18)}
              cy={(j + 0.5) * (H / 13)}
              r="0.6"
              fill="rgba(255,255,255,0.025)"
            />
          ))
        )}

        {/* Cross-category connections */}
        {CONNECTIONS.map(([a, b], i) => {
          const posA = allNodes[a].center;
          const posB = allNodes[b].center;
          const active = hovered === a || hovered === b;
          return (
            <g key={`conn-${i}`}>
              <line
                x1={posA.x} y1={posA.y}
                x2={posA.x + (posB.x - posA.x) * animProgress}
                y2={posA.y + (posB.y - posA.y) * animProgress}
                stroke={active ? 'rgba(0, 212, 255, 0.25)' : 'rgba(255,255,255,0.03)'}
                strokeWidth={active ? 1.2 : 0.5}
                strokeDasharray={active ? 'none' : '4 6'}
                style={{ transition: 'all 0.4s ease' }}
              />
              {animProgress > 0.5 && (
                <circle r="1.5" fill={CATEGORIES[a].color} opacity={active ? 0.8 : 0.3}>
                  <animateMotion
                    dur={`${4 + i * 0.7}s`}
                    repeatCount="indefinite"
                    path={`M${posA.x},${posA.y} L${posB.x},${posB.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Category clusters */}
        {allNodes.map((cat, ci) => {
          const active = hovered === ci;
          const dimmed = hovered !== null && hovered !== ci;
          return (
            <g
              key={cat.name}
              onMouseEnter={() => handleHover(ci)}
              onMouseLeave={handleLeave}
              style={{ cursor: 'pointer' }}
              opacity={dimmed ? 0.25 : 1}
            >
              {/* Category ambient glow */}
              <circle
                cx={cat.center.x} cy={cat.center.y}
                r={(active ? 85 : 65) * animProgress}
                fill={`url(#cat-glow-${ci})`}
                opacity={active ? 0.35 : 0.12}
                style={{ transition: 'all 0.4s ease' }}
              />

              {/* Orbital ring */}
              <circle
                cx={cat.center.x} cy={cat.center.y}
                r={SKILL_RADIUS * animProgress}
                fill="none"
                stroke={cat.color}
                strokeWidth="0.6"
                opacity={active ? 0.35 : 0.08}
                strokeDasharray="3 5"
                style={{ transition: 'opacity 0.4s ease' }}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${cat.center.x} ${cat.center.y}`}
                  to={`${ci % 2 === 0 ? 360 : -360} ${cat.center.x} ${cat.center.y}`}
                  dur="40s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Lines from center to skills */}
              {cat.skillPositions.map((sp, si) => (
                <line
                  key={`sl-${ci}-${si}`}
                  x1={cat.center.x} y1={cat.center.y}
                  x2={cat.center.x + (sp.x - cat.center.x) * animProgress}
                  y2={cat.center.y + (sp.y - cat.center.y) * animProgress}
                  stroke={cat.color}
                  strokeWidth={active ? 0.8 : 0.3}
                  opacity={active ? 0.35 : 0.08}
                  style={{ transition: 'all 0.4s ease' }}
                />
              ))}

              {/* Center node */}
              <circle
                cx={cat.center.x} cy={cat.center.y}
                r={active ? 7 : 5}
                fill={cat.color}
                filter="url(#node-glow)"
                style={{ transition: 'r 0.3s ease' }}
              />
              {/* Pulse ring */}
              <circle
                cx={cat.center.x} cy={cat.center.y}
                r="10" fill="none" stroke={cat.color} strokeWidth="0.8" opacity="0.2"
              >
                <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Category label */}
              <text
                x={cat.center.x}
                y={cat.center.y + (ci < 3 ? -SKILL_RADIUS - 14 : SKILL_RADIUS + 20) * animProgress}
                textAnchor="middle"
                fill={active ? cat.color : 'rgba(255,255,255,0.35)'}
                fontSize="9"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                style={{ transition: 'fill 0.3s ease', textTransform: 'uppercase' }}
              >
                {cat.short}
              </text>

              {/* Percentage on hover */}
              {active && (
                <text
                  x={cat.center.x}
                  y={cat.center.y + 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {cat.pct}%
                </text>
              )}

              {/* Skill nodes */}
              {cat.skillPositions.map((sp, si) => (
                <g key={`sn-${ci}-${si}`}>
                  <circle
                    cx={cat.center.x + (sp.x - cat.center.x) * animProgress}
                    cy={cat.center.y + (sp.y - cat.center.y) * animProgress}
                    r={active ? 3.5 : 2}
                    fill={active ? cat.color : 'rgba(255,255,255,0.25)'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  {active && animProgress > 0.8 && (
                    <text
                      x={cat.center.x + (sp.x - cat.center.x) * animProgress}
                      y={cat.center.y + (sp.y - cat.center.y) * animProgress - 8}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.75)"
                      fontSize="7.5"
                      fontFamily="var(--font-sans)"
                      fontWeight="500"
                    >
                      {sp.name}
                    </text>
                  )}
                </g>
              ))}
            </g>
          );
        })}

        {/* Center core */}
        <circle cx={CX} cy={CY} r={3 * animProgress} fill="var(--accent-cyan, #00d4ff)" filter="url(#node-glow)" />
        <circle cx={CX} cy={CY} r="15" fill="none" stroke="var(--accent-cyan, #00d4ff)" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="r" values="15;25;15" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.03;0.15" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.name}
            className={`${styles.legendItem} ${hovered === i ? styles.legendActive : ''}`}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
          >
            <span className={styles.legendDot} style={{ background: cat.color, boxShadow: hovered === i ? `0 0 8px ${cat.color}` : 'none' }} />
            <span className={styles.legendLabel}>{cat.short}</span>
            <span className={styles.legendPct} style={{ color: cat.color }}>{cat.pct}%</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
