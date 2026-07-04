'use client';

import { useEffect, useRef } from 'react';
import styles from './CinematicLayer.module.css';

const PARTICLE_COUNT = 360;

export default function CinematicLayer() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let THREE;
    let scene, camera, renderer, points, geo;
    const mouse = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };
    const phases = new Float32Array(PARTICLE_COUNT);
    let t = 0;

    async function init() {
      THREE = (await import('three')).default || (await import('three'));

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      geo = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const rnd = Math.random();
        if (rnd > 0.65) {
          // warm orange
          colors[i * 3]     = 1.0;
          colors[i * 3 + 1] = 0.58 + Math.random() * 0.22;
          colors[i * 3 + 2] = 0.1 + Math.random() * 0.15;
        } else if (rnd > 0.35) {
          // warm white
          colors[i * 3]     = 1.0;
          colors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
          colors[i * 3 + 2] = 0.82 + Math.random() * 0.18;
        } else {
          // cool blue accent
          colors[i * 3]     = 0.45 + Math.random() * 0.3;
          colors[i * 3 + 1] = 0.65 + Math.random() * 0.2;
          colors[i * 3 + 2] = 1.0;
        }

        sizes[i] = 2.5 + Math.random() * 20;
        phases[i] = Math.random() * Math.PI * 2;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

      const vertexShader = `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const fragmentShader = `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist) * 0.52;
          gl_FragColor = vec4(vColor, alpha);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      points = new THREE.Points(geo, material);
      scene.add(points);

      const onMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.9;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.55;
      };

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);

      function animate() {
        animRef.current = requestAnimationFrame(animate);
        t += 0.004;

        const posArr = geo.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          posArr[i * 3 + 1] += Math.sin(t + phases[i]) * 0.0015;
          posArr[i * 3]     += Math.cos(t * 0.65 + phases[i]) * 0.0007;
        }
        geo.attributes.position.needsUpdate = true;

        targetCam.x += (mouse.x - targetCam.x) * 0.035;
        targetCam.y += (mouse.y - targetCam.y) * 0.035;
        camera.position.x = targetCam.x * 1.6;
        camera.position.y = targetCam.y * 1.1;
        camera.lookAt(0, 0, 0);

        points.rotation.y = t * 0.01;
        renderer.render(scene, camera);
      }

      animate();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    }

    const cleanup = init();

    return () => {
      cancelAnimationFrame(animRef.current);
      cleanup.then((fn) => fn?.());
      if (geo) geo.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
