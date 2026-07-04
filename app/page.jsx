'use client';

import VideoIntro from '@/components/VideoIntro/VideoIntro';
import SkillsSection from '@/components/SkillsSection/SkillsSection';
import Contact from '@/components/Contact/Contact';
import { useState } from 'react';
// import Link from 'next/link';

const projects = [
  {
    title: 'Brain Tumor MRI Classifier',
    tag: 'Deep Learning · Computer Vision',
    desc: 'CNN-based classifier trained on MRI scans to detect and categorise brain tumors with 88.6% accuracy, macro AUC-ROC of 0.977, and MCC of 0.846. Built with TensorFlow and Keras.',
    stack: ['TensorFlow', 'Keras', 'CNN', 'Python'],
    github: 'https://github.com/devansh-durgapal/Brain-tumor-classification',
    highlight: true,

    stat: '88.6% Accuracy',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M13 2.5C13 2.5 14.5 3 15 4.5C15.5 6 14 7 14 7C14 7 16 6.5 17 8C18 9.5 17 11 17 11C17 11 19 11 19.5 13C20 15 18.5 16 18.5 16C18.5 16 19.5 18 18 19.5C16.5 21 14.5 20.5 14.5 20.5C14.5 20.5 14 22 12 22C10 22 9.5 20.5 9.5 20.5C9.5 20.5 7.5 21 6 19.5C4.5 18 5.5 16 5.5 16C5.5 16 4 15 4.5 13C5 11 7 11 7 11C7 11 6 9.5 7 8C8 6.5 10 7 10 7C10 7 8.5 6 9 4.5C9.5 3 11 2.5 11 2.5L12 5L13 2.5Z" />
        <circle cx="12" cy="13" r="2.5" />
        <path d="M9 13h-2M15 13h2M12 10v-2M12 16v2" />
      </svg>
    ),
  },
  {
    tag: 'Generative AI · LangChain',
    desc: 'A persona-driven conversational AI built on LangChain with RAG pipelines, ChromaDB vector memory, and Groq (LLaMA 3.1) for cloud inference and Ollama for local fallback.',
    stack: ['LangChain', 'ChromaDB', 'Groq', 'Ollama'],
    github: 'https://github.com/devansh-durgapal/AI-Assistant',
    stat: 'RAG + Memory',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </svg>
    ),
  },
  {
    title: 'Twitter Sentiment Analyser',
    tag: 'NLP · Sequence Modelling',
    desc: 'BiLSTM model for Twitter sentiment classification achieving 91.2% training accuracy. Explored sequence modelling with embeddings, dropout regularisation, and class-balanced training.',
    stack: ['PyTorch', 'BiLSTM', 'NLP', 'HuggingFace'],
    github: 'https://github.com/devansh-durgapal-ship-it',
    stat: '91.2% Accuracy',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    title: 'Heart Failure Predictor',
    tag: 'Healthcare AI · Neural Networks',
    desc: 'Neural network trained on clinical patient data to predict heart failure risk. Focused on interpretability, precision-recall tradeoffs, and handling class imbalance in medical datasets.',
    stack: ['TensorFlow', 'Keras', 'Python', 'Scikit-learn'],
    github: 'https://github.com/devansh-durgapal/heart-failure-prediction',
    stat: 'Clinical AI',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    title: 'RAG Knowledge Pipeline',
    tag: 'LLM · Retrieval Augmented Generation',
    desc: 'LangChain-based RAG system with FAISS and ChromaDB vector stores, ArXiv and Wikipedia retrievers, and persistent message history. Supports Groq cloud and local Ollama inference.',
    stack: ['LangChain', 'FAISS', 'ChromaDB', 'LLaMA'],
    github: 'https://github.com/devansh-durgapal-ship-it',
    stat: 'Multi-retriever',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    title: 'Cinematic Portfolio',
    tag: 'Frontend · Three.js · Next.js',
    desc: 'This very site — a Next.js App Router portfolio with a Three.js particle bokeh layer, ambient dual-layer video hero, glassmorphism controls, and cinematic entrance animations.',
    stack: ['Next.js', 'Three.js', 'React', 'CSS Modules'],
    github: 'https://github.com/devansh-durgapal/Portfolio',
    emoji: '🎬',
    stat: 'Live Site',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M12 3l1.09 3.26L16.5 5.5l-2.5 2.5.91 3.5L12 9.75 9.09 11.5l.91-3.5L7.5 5.5l3.41.76L12 3zM5 15h14v2H5v-2zm-2 4h18v2H3v-2z" />
      </svg>
    ),
  },
];

function ProjectCard({ p }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        ...styles.card,
        ...(p.highlight ? styles.cardHighlight : {}),
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? p.highlight
            ? '0 24px 60px rgba(255,168,55,0.18), 0 0 0 1px rgba(255,168,55,0.35)'
            : '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.12)'
          : p.highlight
            ? '0 0 0 1px rgba(255,168,55,0.25)'
            : '0 0 0 1px rgba(255,255,255,0.07)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background 0.3s ease',
        background: hovered
          ? p.highlight ? 'rgba(255,168,55,0.08)' : 'rgba(255,255,255,0.06)'
          : p.highlight ? 'rgba(255,168,55,0.04)' : 'rgba(255,255,255,0.03)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'absolute', width: '220px', height: '220px', borderRadius: '50%',
        background: p.highlight
          ? 'radial-gradient(circle, rgba(255,168,55,0.13) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
        left: pos.x - 110, top: pos.y - 110, pointerEvents: 'none',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 0,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontSize: '28px',
          transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'inline-block',
        }}>{p.emoji}</span>
        <span style={{
          fontSize: '10px', letterSpacing: '0.1em',
          color: p.highlight ? 'rgba(255,168,55,0.9)' : 'rgba(255,255,255,0.35)',
          background: p.highlight ? 'rgba(255,168,55,0.12)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${p.highlight ? 'rgba(255,168,55,0.3)' : 'rgba(255,255,255,0.1)'}`,
          padding: '3px 10px', borderRadius: '40px',
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          opacity: hovered ? 1 : 0.6, transition: 'opacity 0.3s ease',
        }}>{p.stat}</span>
      </div>

      <p style={{ ...styles.cardTag, position: 'relative', zIndex: 1 }}>{p.tag}</p>
      <h3 style={{
        ...styles.cardTitle, position: 'relative', zIndex: 1,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
        transition: 'color 0.3s ease',
      }}>{p.title}</h3>

      <div style={{
        overflow: 'hidden', maxHeight: hovered ? '120px' : '0px',
        opacity: hovered ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.35s ease',
        position: 'relative', zIndex: 1,
      }}>
        <p style={styles.cardDesc}>{p.desc}</p>
      </div>

      <div style={{ ...styles.stackRow, position: 'relative', zIndex: 1 }}>
        {p.stack.map((s) => (
          <span key={s} style={{
            ...styles.stackPill,
            background: hovered
              ? p.highlight ? 'rgba(255,168,55,0.1)' : 'rgba(255,255,255,0.09)'
              : 'rgba(255,255,255,0.05)',
            transition: 'background 0.3s ease',
          }}>{s}</span>
        ))}
      </div>

      <div style={{
        overflow: 'hidden', maxHeight: hovered ? '40px' : '0px',
        opacity: hovered ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.3s ease',
        position: 'relative', zIndex: 1,
      }}>
        <a href={p.github} target="_blank" rel="noopener noreferrer"
          style={styles.cardLink} onClick={(e) => e.stopPropagation()}>
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main style={styles.main}>
      <VideoIntro
        videoSrc="/video/hero.mp4"
        firstName="Devansh"
        lastName="Durgapal"
        tagline="Full-Stack AI Engineer · Builder · Creator"
        role="Deep Learning · NLP · Generative AI"
        roleDetail="Building intelligent systems at the frontier of machine learning"
      />

      {/* About */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutHeadingWrap}>
              <p style={styles.sectionTag}>About</p>
              <h2 style={styles.aboutHeading}>
                Building at the<br />
                <span style={styles.orange}>frontier of AI</span>
              </h2>
            </div>

            <div style={styles.aboutCopy}>
              <p style={styles.aboutPara}>
                I&apos;m Devansh Durgapal, a third-year Computer Science undergraduate
                at GBPIET (graduating 2027), with a deep focus on machine learning,
                NLP, and generative AI systems. I build things that sit at the
                intersection of research and real-world engineering.
              </p>
              <p style={styles.aboutPara}>
                My work spans training neural networks on clinical and vision data,
                architecting LLM pipelines with LangChain, and crafting cinematic
                frontend experiences with Next.js and Three.js. I&apos;ve competed in the
                NASA International Space Apps Challenge and Smart India Hackathon,
                and I&apos;m actively seeking ML internships where I can push these
                systems further.
              </p>
              <p style={styles.aboutPara}>
                When I&apos;m not training models or debugging embeddings, you&apos;ll find me
                exploring Vedic astrology or obsessing over the aesthetics of a
                well-designed interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* Skills */}
      <SkillsSection />

      <div style={styles.divider} />

      {/* Projects */}
      <section id="projects" style={styles.section}>
        <div style={styles.projectsContainer}>
          {/* <p style={styles.sectionTag}>Projects</p> */}
          <h2 style={{ ...styles.aboutHeading, marginBottom: '0.6rem' }}>
            Things I&apos;ve <span style={styles.orange}>built</span>
          </h2>
          <p style={{ ...styles.aboutPara, marginBottom: '3rem' }}>
            Hover over a project to explore it.
          </p>
          <div style={styles.projectGrid}>
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* Contact */}
      <section id="contact">
        <Contact showBackButton={false} />
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Devansh Durgapal &nbsp;·&nbsp; GBPIET, Uttarakhand &nbsp;·&nbsp;
          <a href="https://github.com/devansh-durgapal" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
            GitHub
          </a>
          &nbsp;·&nbsp;
        </p>
        <p style={{ ...styles.footerText, marginTop: '0.5rem', fontSize: '11px', opacity: 0.3 }}>
          Last update on July 2026
        </p>
      </footer>
    </main>
  );
}

const styles = {
  main: { background: '#080402' },
  section: {
    minHeight: '100vh',
    padding: 'clamp(72px, 10vh, 120px) 0',
    background: '#080402',
    display: 'flex',
    alignItems: 'center',
  },
  aboutSection: {
    minHeight: '100vh',
    padding: 'clamp(72px, 10vh, 120px) 0',
    background: '#080402',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 6vw',
  },
  projectsContainer: { width: '100%', padding: '0 4vw' },
  sectionTag: {
    fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase',
    color: 'rgba(255,168,55,0.7)', marginBottom: '1.8rem',
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 0.95fr) minmax(0, 1.05fr)',
    gap: 'clamp(2rem, 5vw, 5rem)',
    alignItems: 'center',
    width: '100%',
  },
  aboutHeadingWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  aboutHeading: {
    fontSize: 'clamp(36px, 5vw, 62px)',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: 1.05,
    color: '#fff',
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
    margin: 0,
    maxWidth: '8ch',
  },
  orange: { color: 'rgba(255,168,55,0.92)' },
  aboutCopy: {
    marginTop: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '0.25rem',
    justifyItems: 'start',
  },
  aboutPara: {
    fontSize: '15px',
    lineHeight: 1.9,
    color: 'rgba(255,255,255,0.45)',
    maxWidth: '72ch',
    marginBottom: '0.65rem',
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
    fontWeight: 300,
    textAlign: 'left',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
    margin: '0 6vw',
  },
  projectGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  card: {
    borderRadius: '16px', padding: '24px 24px 22px',
    display: 'flex', flexDirection: 'column', gap: '10px',
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
  },
  cardHighlight: {},
  cardTag: { fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,168,55,0.6)', margin: 0 },
  cardTitle: { fontSize: '17px', fontWeight: 600, letterSpacing: '-0.01em', margin: 0 },
  cardDesc: { fontSize: '13px', lineHeight: 1.75, color: 'rgba(255,255,255,0.42)', margin: '4px 0 0', fontWeight: 300 },
  stackRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' },
  stackPill: {
    padding: '3px 10px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.08)',
    fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em',
  },
  cardLink: { fontSize: '12px', color: 'rgba(255,168,55,0.7)', textDecoration: 'none', letterSpacing: '0.06em', marginTop: '4px', display: 'inline-block' },
  footer: { padding: '48px 6vw', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' },
  footerText: { fontSize: '13px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', fontFamily: 'SF Pro Display, -apple-system, sans-serif' },
  footerLink: { color: 'rgba(255,168,55,0.5)', textDecoration: 'none' },
};
