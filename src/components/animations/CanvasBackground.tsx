import React, { useEffect, useRef } from 'react';
import { useHealth } from '../../context/HealthContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const CanvasBackground: React.FC = () => {
  const { theme } = useHealth();
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

    // Mouse position for particle interaction
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate Firefly Glowing Particles
    const particleCount = 45;
    const particles: Particle[] = [];
    const colors = theme === 'dark' 
      ? ['#2563EB', '#06B6D4', '#10B981', '#60A5FA', '#34D399']
      : ['#93C5FD', '#67E8F9', '#6EE7B7', '#3B82F6', '#10B981'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let waveTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Mesh Gradient Aurora Lights
      waveTime += 0.005;

      const grad1X = width * 0.2 + Math.sin(waveTime) * 150;
      const grad1Y = height * 0.3 + Math.cos(waveTime * 0.8) * 100;
      const grad1 = ctx.createRadialGradient(grad1X, grad1Y, 10, grad1X, grad1Y, width * 0.45);

      if (theme === 'dark') {
        grad1.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
        grad1.addColorStop(0.6, 'rgba(6, 182, 212, 0.08)');
        grad1.addColorStop(1, 'rgba(11, 15, 25, 0)');
      } else {
        grad1.addColorStop(0, 'rgba(219, 234, 254, 0.6)');
        grad1.addColorStop(0.6, 'rgba(207, 250, 254, 0.3)');
        grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2X = width * 0.8 + Math.cos(waveTime * 1.2) * 120;
      const grad2Y = height * 0.7 + Math.sin(waveTime * 0.9) * 120;
      const grad2 = ctx.createRadialGradient(grad2X, grad2Y, 10, grad2X, grad2Y, width * 0.4);

      if (theme === 'dark') {
        grad2.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
        grad2.addColorStop(0.5, 'rgba(37, 99, 235, 0.06)');
        grad2.addColorStop(1, 'rgba(11, 15, 25, 0)');
      } else {
        grad2.addColorStop(0, 'rgba(209, 250, 229, 0.5)');
        grad2.addColorStop(0.5, 'rgba(224, 242, 254, 0.3)');
        grad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw and update glowing firefly particles
      particles.forEach(p => {
        // Subtle Mouse Interaction deflection
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Floating Medical Glass Shapes & SVGs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Capsule */}
        <div className="absolute top-[15%] left-[8%] animate-float-slow opacity-25 dark:opacity-40">
          <svg className="w-16 h-16 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.594 15.12a2 2 0 00-1.583 1.838l-.006.141A2 2 0 005.428 19.428l2.387.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387.477a2 2 0 002.164-1.705l.024-.265a2 2 0 00-.596-1.59zM8.5 7.5l7 7" />
          </svg>
        </div>

        {/* Floating DNA */}
        <div className="absolute top-[25%] right-[6%] animate-float-medium opacity-20 dark:opacity-35">
          <svg className="w-20 h-20 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4c0 8.837 7.163 16 16 16M20 4c0 8.837-7.163 16-16 16" />
          </svg>
        </div>

        {/* Floating Heart */}
        <div className="absolute bottom-[20%] left-[12%] animate-float-fast opacity-25 dark:opacity-40">
          <svg className="w-14 h-14 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        {/* Floating Stethoscope / Microscope */}
        <div className="absolute bottom-[15%] right-[15%] animate-float-slow opacity-20 dark:opacity-35">
          <svg className="w-16 h-16 text-brand-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
