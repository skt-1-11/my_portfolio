'use client';
import { useEffect, useRef } from 'react';
import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: -1000, y: -1000 };
    let animId;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    const PARTICLE_COUNT = Math.min(90, Math.floor(width / 16));
    const CONNECTION_DIST = 140;
    const MOUSE_RADIUS = 180;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 1.5 + 0.3;
        this.baseAlpha = Math.random() * 0.35 + 0.05;
        this.alpha = this.baseAlpha;
        // Cyan or violet hue
        this.hue = Math.random() > 0.6 ? 190 + Math.random() * 10 : 260 + Math.random() * 20;
        this.sat = 80 + Math.random() * 20;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.008;
          this.vx += dx * force;
          this.vy += dy * force;
          this.alpha = Math.min(this.baseAlpha + 0.25, 0.7);
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.015;
        }

        this.vx *= 0.997;
        this.vy *= 0.997;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.sat}%, 70%, ${this.alpha})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
      <div className={styles.vignette} />
    </div>
  );
}
