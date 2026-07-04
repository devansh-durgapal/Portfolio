'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CursorEffect.module.css';

export default function CursorEffect() {
  const dotRef        = useRef(null);
  const ringRef       = useRef(null);
  const spotlightRef  = useRef(null);

  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);

  const [clicked,  setClicked]  = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Spotlight follows instantly
      if (spotlightRef.current) {
        spotlightRef.current.style.background =
          `radial-gradient(circle 380px at ${e.clientX}px ${e.clientY}px,
            rgba(255,168,55,0.055) 0%,
            rgba(255,140,30,0.025) 40%,
            transparent 70%)`;
      }
    };

    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);

    // Detect hoverable elements
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-hover]');
      setHovering(!!el);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('mouseover', onOver);

    // Smooth ring lerp loop
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);

      if (ringRef.current) {
        const size = hovering ? 52 : clicked ? 28 : 36;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform =
          `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
        ringRef.current.style.borderColor = hovering
          ? 'rgba(255,168,55,0.85)'
          : 'rgba(255,255,255,0.45)';
        ringRef.current.style.background = hovering
          ? 'rgba(255,168,55,0.06)'
          : 'transparent';
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf.current);
    };
  }, [hovering, clicked]);

  return (
    <>
      {/* Full-page spotlight overlay */}
      <div ref={spotlightRef} className={styles.spotlight} />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className={styles.ring}
        style={{ borderColor: 'rgba(255,255,255,0.45)' }}
      />

      {/* Sharp center dot */}
      <div
        ref={dotRef}
        className={styles.dot}
        style={{ transform: clicked ? 'scale(0.5)' : 'scale(1)' }}
      />
    </>
  );
}
