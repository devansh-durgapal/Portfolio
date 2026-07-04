'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(
  () => import('../CinematicLayer/CinematicLayer'),
  { ssr: false }
);

// ─── Animation helper ──────────────────────────────────────────────────────────
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateIn(el, delay, duration, fromY = 30) {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = `translateY(${fromY}px)`;

  setTimeout(() => {
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      el.style.opacity = String(eased);
      el.style.transform = `translateY(${fromY * (1 - eased)}px)`;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, delay);
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function VideoIntro({
  videoSrc = '/video/hero.mp4',
  firstName = 'Devansh',
  lastName = 'Durgapal',
  tagline = 'Full-Stack AI Engineer · Builder · Creator',
  role = 'Deep Learning · NLP · Generative AI',
  roleDetail = 'Building intelligent systems at the frontier of machine learning',
  onScrollNext,
}) {
  const videoMainRef = useRef(null);
  const videoBgRef   = useRef(null);

  const taglineRef  = useRef(null);
  const firstRef    = useRef(null);
  const lastRef     = useRef(null);
  const roleRef     = useRef(null);
  const controlsRef = useRef(null);
  const scrollRef   = useRef(null);
  const hintRef     = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted]     = useState(true);
  const [hintVisible, setHintVisible] = useState(true);

  // ── Entrance animation ──────────────────────────────────────────────────────
  useEffect(() => {
    animateIn(hintRef.current, 400, 800, 0);
    animateIn(taglineRef.current, 700, 900, 20);
    animateIn(firstRef.current, 1000, 1050, 50);
    animateIn(lastRef.current, 1200, 1050, 50);
    animateIn(roleRef.current, 1450, 900, 22);

    const showControls = setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.style.transition = 'opacity 1s ease';
        controlsRef.current.style.opacity = '1';
      }
      if (scrollRef.current) {
        scrollRef.current.style.transition = 'opacity 1.2s ease';
        scrollRef.current.style.opacity = '1';
      }
    }, 1900);

    const hideHint = setTimeout(() => setHintVisible(false), 4800);

    return () => {
      clearTimeout(showControls);
      clearTimeout(hideHint);
    };
  }, []);

  // ── Play / Pause ────────────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const vMain = videoMainRef.current;
    const vBg   = videoBgRef.current;
    if (!vMain) return;
    if (playing) {
      vMain.pause();
      vBg?.pause();
    } else {
      vMain.play();
      vBg?.play();
    }
    setPlaying((p) => !p);
  }, [playing]);

  // ── Mute / Unmute ───────────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const vMain = videoMainRef.current;
    if (!vMain) return;
    vMain.muted = !muted;
    setMuted((m) => !m);
    if (muted) setHintVisible(false);
  }, [muted]);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (onScrollNext) {
      onScrollNext();
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, [onScrollNext]);

  return (
    <section className={styles.hero}>
      {/* ── Ambient blurred background video ── */}
      <video
        ref={videoBgRef}
        className={styles.videoBg}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* ── Three.js particle bokeh ── */}
      <CinematicLayer />

      {/* ── Gradient overlays ── */}
      <div className={`${styles.overlay} ${styles.overlayTop}`}    aria-hidden="true" />
      <div className={`${styles.overlay} ${styles.overlayBottom}`} aria-hidden="true" />
      <div className={`${styles.overlay} ${styles.overlaySides}`}  aria-hidden="true" />

      {/* ── Monitor-glow vertical glare ── */}
      <div className={styles.glare} aria-hidden="true" />

      {/* ── Foreground talking-head video ── */}
      <video
        ref={videoMainRef}
        className={styles.videoMain}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Sound hint badge ── */}
      <div
        ref={hintRef}
        className={styles.soundHint}
        style={{ opacity: hintVisible ? undefined : '0' }}
        aria-live="polite"
      >
        <span className={styles.soundDot} />
        <span>Tap for sound</span>
      </div>

      {/* ── Portfolio copy ── */}
      <div className={styles.content}>
        <p ref={taglineRef} className={styles.tagline} style={{ opacity: 0 }}>
          {tagline}
        </p>

        <div className={styles.nameBlock}>
          <span ref={firstRef} className={styles.nameFirst} style={{ opacity: 0 }}>
            {firstName}
          </span>
          <span ref={lastRef} className={styles.nameLast} style={{ opacity: 0 }}>
            {lastName}
          </span>
        </div>

        <p ref={roleRef} className={styles.role} style={{ opacity: 0 }}>
          {role}
          <span className={styles.roleDetail}>{roleDetail}</span>
        </p>
      </div>

      {/* ── Controls ── */}
      <div ref={controlsRef} className={styles.controls} style={{ opacity: 0 }}>
        <button
          className={styles.ctrlBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className={styles.ctrlBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
              <path d="M16.5 12A4.5 4.5 0 0014 7.97V10.18l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 19L19 20.27 20.27 19 5.27 4 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className={styles.scrollIndicator}
        style={{ opacity: 0 }}
        onClick={handleScroll}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => e.key === 'Enter' && handleScroll()}
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </div>
    </section>
  );
}
