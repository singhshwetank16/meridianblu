import React, { useEffect, useRef } from 'react';

interface SnowflakeParticle {
  x: number;
  y: number;
  radius: number;
  density: number;
  speed: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
}

export const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Number of flakes based on screen width
    const particleCount = Math.floor(Math.min(width / 20, 70));

    const particles: SnowflakeParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.6 + 1.1,
        density: Math.random() * particleCount,
        speed: Math.random() * 0.9 + 0.45,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.4,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.01;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Draw soft snowflake with icy Himalayan crystal glow
        ctx.save();
        ctx.shadowColor = 'rgba(14, 165, 233, 0.4)';
        ctx.shadowBlur = 4;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
        gradient.addColorStop(0.45, `rgba(186, 230, 253, ${p.opacity * 0.85})`);
        gradient.addColorStop(0.8, `rgba(56, 189, 248, ${p.opacity * 0.45})`);
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();

        // Update position with natural sine-wave drift
        p.y += p.speed;
        p.x += Math.sin(angle + p.swayOffset) * 0.75;

        // Wrap around borders
        if (p.y > height + 5) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width + 5) {
          p.x = -5;
        } else if (p.x < -5) {
          p.x = width + 5;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-90"
      aria-hidden="true"
    />
  );
};
