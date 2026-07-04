'use client';

import VideoIntro from '@/components/VideoIntro/VideoIntro';
import SkillsSection from '@/components/SkillsSection/SkillsSection';
import { useState } from 'react';
import Link from 'next/link';
import Contact from '@/components/Contact/Contact';

const projects = [
  {
    title: 'Brain Tumor MRI Classifier',
    tag: 'Deep Learning · Computer Vision',
    desc: 'CNN-based classifier trained on MRI scans to detect and categorise brain tumors with 88.6% accuracy, macro AUC-ROC of 0.977, and MCC of 0.846. Built with TensorFlow and Keras.',
    stack: ['TensorFlow', 'Keras', 'CNN', 'Python'],
    github: 'https://github.com/devansh-durgapal/Brain-tumor-classification',
    highlight: true,
    color: '#FF6F00',
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
    title: 'Prerana — Persona Chatbot',
    tag: 'Generative AI · LangChain',
    desc: 'A persona-driven conversational AI built on LangChain with RAG pipelines, ChromaDB vector memory, and Groq (LLaMA 3.1) for cloud inference and Ollama for local fallback.',
    stack: ['LangChain', 'ChromaDB', 'Groq', 'Ollama'],
    github: 'https://github.com/devansh-durgapal/AI-Assistant',
    color: '#1C7C54',
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
    color: '#1D9BF0',
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
    color: '#EA4335',
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
    color: '#9C27B0',
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
    color: '#049EF4',
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
        borderRadius: '18px',
        padding: '26px 24px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        fontFamily: 'SF Pro Display, -apple-system, sans-serif',
        transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px ${p.color}55, 0 0 40px ${p.color}18`
          : p.highlight
            ? '0 0 0 1px rgba(255,168,55,0.22)'
            : '0 0 0 1px rgba(255,255,255,0.07)',
        background: hovered
          ? 'rgba(255,255,255,0.055)'
          : p.highlight
            ? 'rgba(255,168,55,0.03)'
            : 'rgba(255,255,255,0.025)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background 0.3s ease',
      }}
    >
      {/* Mouse-follow spotlight */}
      <div style={{
        position: 'absolute',
        width: '240px', height: '240px', borderRadius: '50%',
        background: `radial-gradient(circle, ${p.color}22 0%, transparent 70%)`,
        left: pos.x - 120, top: pos.y - 120,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 0,
      }} />

      {/* Ambient glow blob */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '18px',
        background: `radial-gradient(circle at 30% 30%, ${p.color}28 0%, transparent 60%)`,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        zIndex: 0,
      }} />

      {/* Top row: icon + stat badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          color: hovered ? p.color : 'rgba(255,255,255,0.4)',
          transform: hovered ? 'scale(1.2) rotate(-6deg)' : 'scale(1) rotate(0deg)',
          filter: hovered ? `drop-shadow(0 0 10px ${p.color}bb)` : 'none',
          transition: 'color 0.35s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.35s ease',
          width: 30, height: 30,
        }}>
          {p.icon}
        </div>
        <span style={{
          fontSize: '10px', letterSpacing: '0.1em',
          color: hovered ? p.color : 'rgba(255,255,255,0.3)',
          background: hovered ? `${p.color}18` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${hovered ? p.color + '44' : 'rgba(255,255,255,0.08)'}`,
          padding: '3px 10px', borderRadius: '40px',
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          transition: 'all 0.3s ease',
        }}>
          {p.stat}
        </span>
      </div>

      {/* Tag */}
      <p style={{
        fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: hovered ? p.color : 'rgba(255,168,55,0.55)',
        margin: 0, position: 'relative', zIndex: 1,
        transition: 'color 0.3s ease',
      }}>
        {p.tag}
      </p>

      {/* Title */}
      <h3 style={{
        fontSize: '17px', fontWeight: 600, letterSpacing: '-0.01em',
        margin: 0, position: 'relative', zIndex: 1,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
        transition: 'color 0.3s ease',
      }}>
        {p.title}
      </h3>

      {/* Desc — slides in on hover */}
      <div style={{
        overflow: 'hidden',
        maxHeight: hovered ? '120px' : '0px',
        opacity: hovered ? 1 : 0,
        transition: 'max-height 0.4s ease, opacity 0.35s ease',
        position: 'relative', zIndex: 1,
      }}>
        <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'rgba(255,255,255,0.42)', margin: '2px 0 0', fontWeight: 300 }}>
          {p.desc}
        </p>
      </div>

      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px', position: 'relative', zIndex: 1 }}>
        {p.stack.map((s) => (
          <span key={s} style={{
            padding: '3px 10px', borderRadius: '40px',
            background: hovered ? `${p.color}14` : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hovered ? p.color + '33' : 'rgba(255,255,255,0.08)'}`,
            fontSize: '10px',
            color: hovered ? p.color : 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em',
            transition: 'all 0.3s ease',
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* GitHub link — slides up on hover */}
      <div style={{
        overflow: 'hidden',
        maxHeight: hovered ? '40px' : '0px',
        opacity: hovered ? 1 : 0,
        transition: 'max-height 0.35s ease, opacity 0.3s ease',
        position: 'relative', zIndex: 1,
      }}>
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '12px', color: p.color, textDecoration: 'none', letterSpacing: '0.06em', marginTop: '4px', display: 'inline-block', opacity: 0.85 }}
          onClick={(e) => e.stopPropagation()}
        >
          View on GitHub →
        </a>
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', borderRadius: '0 0 18px 18px',
        background: p.color,
        transformOrigin: 'left',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 2,
      }} />
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
      <section id="about" style={styles.section}>
        <div style={styles.aboutContainer}>

          {/* Top: full-width heading */}
          <div style={styles.aboutTopRow}>
            <p style={styles.sectionTag}>About</p>
            <h2 style={styles.aboutHeadingLarge}>
              Building at the{' '}
              <span style={styles.orange}>frontier of AI</span>
            </h2>
          </div>

          {/* Bottom: 3-column info grid */}
          <div style={styles.aboutInfoGrid}>
            <div style={styles.aboutInfoCard}>
              <div style={styles.aboutInfoIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <p style={styles.aboutInfoLabel}>Background</p>
              <p style={styles.aboutInfoText}>
                Third-year CS undergraduate at GBPIET, graduating 2027. Deep focus on
                machine learning, NLP, and generative AI systems — building things at
                the intersection of research and real-world engineering.
              </p>
            </div>

            <div style={styles.aboutInfoCard}>
              <div style={styles.aboutInfoIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </div>
              <p style={styles.aboutInfoLabel}>What I Build</p>
              <p style={styles.aboutInfoText}>
                Neural networks on clinical and vision data, LLM pipelines with LangChain,
                and cinematic frontend experiences with Next.js and Three.js. Competed in
                NASA Space Apps Challenge and Smart India Hackathon.
              </p>
            </div>

            <div style={styles.aboutInfoCard}>
              <div style={styles.aboutInfoIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p style={styles.aboutInfoLabel}>Beyond Code</p>
              <p style={styles.aboutInfoText}>
                Actively seeking ML internships on site and remote. When not training
                models or debugging embeddings, you'll find me out on a run, in the gym,
                or deep in a chess match.
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
  section: { padding: '100px 0', background: '#080402' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 6vw' },
  projectsContainer: { width: '100%', padding: '0 4vw' },

  // About — full width
  aboutContainer: { width: '100%', padding: '0 4vw' },
  aboutTopRow: { marginBottom: '4rem' },
  aboutHeadingLarge: {
    fontSize: 'clamp(42px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em',
    lineHeight: 1.0, color: '#fff', fontFamily: 'SF Pro Display, -apple-system, sans-serif',
    margin: 0,
  },
  aboutInfoGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  aboutInfoCard: {
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '18px',
    padding: '28px 26px 26px',
    display: 'flex', flexDirection: 'column', gap: '10px',
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
  },
  aboutInfoIcon: {
    color: 'rgba(255,168,55,0.7)',
    width: 20, height: 20,
    marginBottom: '4px',
  },
  aboutInfoLabel: {
    fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'rgba(255,168,55,0.65)', margin: 0,
  },
  aboutInfoText: {
    fontSize: '14.5px', lineHeight: 1.82, color: 'rgba(255,255,255,0.44)',
    margin: 0, fontWeight: 300,
  },

  sectionTag: {
    fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase',
    color: 'rgba(255,168,55,0.7)', marginBottom: '1.4rem',
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
  },
  aboutHeading: {
    fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em',
    lineHeight: 1.1, color: '#fff', fontFamily: 'SF Pro Display, -apple-system, sans-serif', margin: 0,
  },
  orange: { color: 'rgba(255,168,55,0.92)' },
  aboutPara: {
    fontSize: '15px', lineHeight: 1.85, color: 'rgba(255,255,255,0.45)',
    marginBottom: '1.2rem', fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontWeight: 300,
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
    margin: '0 6vw',
  },
  projectGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  footer: { padding: '48px 6vw', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' },
  footerText: { fontSize: '13px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', fontFamily: 'SF Pro Display, -apple-system, sans-serif' },
  footerLink: { color: 'rgba(255,168,55,0.5)', textDecoration: 'none' },
};
