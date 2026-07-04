'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

const socials = [
  {
    label: 'Gmail',
    value: 'devanshdurgapal18@gmail.com',
    href: 'mailto:devanshdurgapal18@gmail.com',
    color: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/devansh-durgapal',
    href: 'https://www.linkedin.com/in/devansh-durgapal-2150b128a/',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/devansh-durgapal-ship-it',
    href: 'https://github.com/devansh-durgapal',
    color: '#CCCCCC',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Uttarakhand, India',
    href: 'https://maps.google.com/?q=Uttarakhand,India',
    color: '#34A853',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    value: 'Download CV',
    href: 'https://www.overleaf.com/read/vbxrdpkhmpfd#adac95',
    color: '#FF6F00',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7H9v-2h6v2zm2 4H9v-2h8v2z" />
      </svg>
    ),
  },
];

export default function Contact({ showBackButton = true }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('devanshdurgapal18@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <p className={styles.sectionTag}>Contact</p>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h2 className={styles.heading}>
              Let&apos;s build something<br />
              <span className={styles.accent}>together</span>
            </h2>
            <p className={styles.subtext}>
              Open to ML internships, research collaborations, and interesting projects.
              Reach out through any of the channels below — I usually respond within 24 hours.
            </p>
          </div>

          {/* CTA */}
          <div className={styles.ctaWrap}>
            <button className={styles.ctaBtn} onClick={handleCopyEmail}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>{copied ? '✓ Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') || s.href.endsWith('.pdf') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={styles.card}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === i ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
                boxShadow: hoveredCard === i
                  ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${s.color}55`
                  : '0 0 0 1px rgba(255,255,255,0.07)',
                background: hoveredCard === i
                  ? 'rgba(255,255,255,0.055)'
                  : 'rgba(255,255,255,0.025)',
              }}
            >
              {/* Glow blob */}
              <div
                className={styles.glow}
                style={{
                  background: `radial-gradient(circle at 35% 40%, ${s.color}44 0%, transparent 65%)`,
                  opacity: hoveredCard === i ? 1 : 0,
                }}
              />

              {/* Icon */}
              <div
                className={styles.iconWrap}
                style={{
                  color: hoveredCard === i ? s.color : 'rgba(255,255,255,0.4)',
                  transform: hoveredCard === i ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)',
                  filter: hoveredCard === i ? `drop-shadow(0 0 10px ${s.color}99)` : 'none',
                }}
              >
                {s.icon}
              </div>

              <div className={styles.cardContent}>
                <p
                  className={styles.cardLabel}
                  style={{ color: hoveredCard === i ? s.color : 'rgba(255,168,55,0.55)' }}
                >
                  {s.label}
                </p>
                <p
                  className={styles.cardValue}
                  style={{ color: hoveredCard === i ? '#fff' : 'rgba(255,255,255,0.62)' }}
                >
                  {s.value}
                </p>
              </div>

              {/* Arrow */}
              <div
                className={styles.arrow}
                style={{ opacity: hoveredCard === i ? 1 : 0, color: s.color }}
              >
                →
              </div>

              {/* Bottom accent bar */}
              <div
                className={styles.bar}
                style={{
                  background: s.color,
                  transform: hoveredCard === i ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </a>
          ))}
        </div>

        {/* Availability badge */}
        <div className={styles.availability}>
          <span className={styles.dot} />
          <span>Available for ML internships &amp; collaborations</span>
        </div>

      </div>
    </section>
  );
}
