'use client';

import { useState } from 'react';
import styles from './SkillsSection.module.css';
import { color } from 'three/src/nodes/tsl/TSLCore';

const skills = [
  {
    name: 'TensorFlow',
    color: '#FF6F00',
    desc: 'Deep learning framework for training and deploying neural networks at scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.153 3.564zm21.416 2.79L12.46 0v24l4.095-2.378V7.603l6.153 3.564z" />
      </svg>
    ),
  },
  {
    name: 'PyTorch',
    color: '#EE4C2C',
    desc: 'Flexible deep learning framework favoured for research and NLP work.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0 9.865 9.865 0 000-14.022L16.53 9.497a5.918 5.918 0 010 8.366 5.918 5.918 0 01-8.367 0 5.918 5.918 0 010-8.366zM15.29 3.61a1.24 1.24 0 11-1.754 1.754A1.24 1.24 0 0115.29 3.61z" />
      </svg>
    ),
  },
  {
    name: 'LangChain',
    color: '#1C7C54',
    desc: 'Framework for building LLM-powered apps, RAG pipelines, and AI agents.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M17 8C8 10 5.9 16.17 3.82 21c-.09.22.13.44.34.34C6.17 19.1 12.4 17 17 8zM7 20.5c0 .83.67 1.5 1.5 1.5S10 21.33 10 20.5 9.33 19 8.5 19 7 19.67 7 20.5z" />
      </svg>
    ),
  },
  {
    name: 'Langgraph',
    color: '#155cae',
    desc: "Framework for building multi-actor AI agents.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M7 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-5 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        <path d="M8.6 8.2l6.8-.4.1 1.4-6.8.4-.1-1.4zm2.2 4.1l-3-2 .8-1.2 3 2-.8 1.2zm2.4-.1l3-2 .8 1.2-3 2-.8-1.2z" />
      </svg>
    ),
  },
  {
    name: 'HuggingFace',
    color: '#FFD21E',
    desc: 'Hub for pre-trained transformers, tokenizers, and model fine-tuning.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z" />
      </svg>
    ),
  },
  {
    name: 'Scikit-learn',
    color: '#F7931E',
    desc: 'Go-to library for classical ML — classification, regression, and pipelines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.93V16a1 1 0 00-2 0v.93A8.001 8.001 0 014.07 11H5a1 1 0 000-2h-.93A8.001 8.001 0 0111 4.07V5a1 1 0 002 0v-.93A8.001 8.001 0 0119.93 11H19a1 1 0 000 2h.93A8.001 8.001 0 0113 16.93zM12 13a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    color: '#05998B',
    desc: 'High-performance Python web framework for building production ML APIs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    color: '#FCC624',
    desc: 'Primary dev environment — shell scripting, venvs, and server config.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232C15.293 7.337 15.071 5.2 14.753 4c-1.151.23-.665 2.25-.369 3.588-1.015-.5-1.867-.928-2.97-1.073C10.47 6.36 9.927 5.815 9.613 5c-.23.864.171 1.745.578 2.381C8.795 7.15 7.822 7.007 7 7c-.021.553.274 1.28 1.498 1.824-.799.189-1.471.383-1.926.726C6.32 9.743 6.2 10 6.2 10s.549-.169 1.378-.3C6.758 10.189 6.2 10.9 6.2 11.8c0 1.156.693 2.15 1.73 2.7-.406.483-.733 1.038-.856 1.654-.483-.159-1.068-.374-1.546-.557C4.448 15.122 4 15 4 15s.408.914 1.912 1.554c-.289.619-.476 1.302-.387 2.081C5.9 20.348 8 21 8 21c-.19-.381-.481-.895-.707-1.443.603.141 1.267.218 1.96.218.63 0 1.25-.068 1.842-.19.591.122 1.211.19 1.841.19.693 0 1.357-.077 1.96-.218-.226.548-.517 1.062-.707 1.443 0 0 2.1-.652 2.475-2.365.089-.779-.098-1.462-.387-2.081C18.592 15.914 19 15 19 15s-.448.122-1.528.597c-.478.183-1.063.398-1.546.557-.123-.616-.45-1.171-.856-1.654 1.037-.55 1.73-1.544 1.73-2.7 0-.9-.558-1.611-1.378-2.1C16.252 9.831 16.8 10 16.8 10s-.12-.257-.372-.474C15.973 9.183 15.3 8.989 14.502 8.8 15.726 8.256 16.021 7.529 16 6.976c-.822.007-1.795.15-2.591.381.407-.636.808-1.517.578-2.381-.314.815-.857 1.36-1.801 1.515-1.103.145-1.955.573-2.97 1.073C9.512 6.25 9.998 4.23 8.847 4c-.318 1.2-.54 3.337-2.076 4.9C4.923 10.8 3.373 13.766 3.926 17.131c-.571.486-.357 1.471-.907 1.917-.55.447-1.019.585-1.019.585s.616.691 1.62.465c.415-.094.662-.274.823-.488-.285.638-.343 1.342.232 1.9.831.818 2.625.4 2.625.4s-.74-.298-1.09-.866c-.351-.568-.174-1.307.27-1.662.444-.355.853-.032 1.634-.214.823-.189 1.576-.618 2.144-1.173C11.018 19.43 11.499 19.5 12 19.5s.982-.07 1.742-.505c.568.555 1.321.984 2.144 1.173.781.182 1.19-.141 1.634.214.444.355.621 1.094.27 1.662-.35.568-1.09.866-1.09.866s1.794.418 2.625-.4c.575-.558.517-1.262.232-1.9.161.214.408.394.823.488 1.004.226 1.62-.465 1.62-.465s-.469-.138-1.019-.585z" />
      </svg>
    ),
  },
];

export default function SkillsSection() {
  const [hovered, setHovered] = useState(null);

  const row1 = skills.slice(0, 4);  // TF, PyTorch, LangChain, HuggingFace
  const row2 = skills.slice(4, 9);  // Sklearn, FastAPI, Next, Three, Linux — wait, that's 5
  // Split 9 skills as 4 + 5, but we want 4+4+1 — let's do 5+4 so rows are balanced
  // Actually user said 4 in one row and 4 in another — we have 9 skills now
  // So let's do row1=4, row2=4, row3=1 centered OR just 5+4
  // User said "4 in one row and 4 in other" so we respect that with first 8, sklearn on its own? 
  // Better: show 4+5 with the last row centered. We'll do this via CSS grid fixed 4 cols.

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* <p className={styles.sectionTag}>Skills</p> */}
        <h2 className={styles.heading}>
          Tools I <span className={styles.accent}>work with</span>
        </h2>
        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className={styles.card}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                transform: hovered === i ? 'translateY(-10px) scale(1.04)' : 'translateY(0) scale(1)',
                boxShadow: hovered === i
                  ? `0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px ${skill.color}66, 0 0 40px ${skill.color}22`
                  : '0 0 0 1px rgba(255,255,255,0.07)',
                background: hovered === i
                  ? `rgba(255,255,255,0.06)`
                  : 'rgba(255,255,255,0.025)',
              }}
            >
              {/* Glow blob */}
              <div
                className={styles.glow}
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${skill.color}55 0%, transparent 65%)`,
                  opacity: hovered === i ? 1 : 0,
                }}
              />

              {/* Icon */}
              <div
                className={styles.iconWrap}
                style={{
                  color: hovered === i ? skill.color : 'rgba(255,255,255,0.4)',
                  transform: hovered === i ? 'scale(1.22) rotate(-6deg)' : 'scale(1) rotate(0deg)',
                  filter: hovered === i ? `drop-shadow(0 0 12px ${skill.color}bb)` : 'none',
                }}
              >
                {skill.icon}
              </div>

              {/* Name */}
              <p
                className={styles.name}
                style={{ color: hovered === i ? '#fff' : 'rgba(255,255,255,0.72)' }}
              >
                {skill.name}
              </p>

              {/* Desc slides in */}
              <div
                className={styles.descWrap}
                style={{
                  maxHeight: hovered === i ? '80px' : '0px',
                  opacity: hovered === i ? 1 : 0,
                }}
              >
                <p className={styles.desc}>{skill.desc}</p>
              </div>

              {/* Bottom accent bar */}
              <div
                className={styles.bar}
                style={{
                  background: `linear-gradient(to right, ${skill.color}, ${skill.color}88)`,
                  transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
