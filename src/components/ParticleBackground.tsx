import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    class Particle {
      x!: number;
      y!: number;
      r!: number;
      speedY!: number;
      speedX!: number;
      life!: number;
      maxLife!: number;
      isCross!: boolean;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.4 + 0.3;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        this.isCross = Math.random() < 0.04;
      }

      update() {
        this.life++;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.life > this.maxLife || this.y < -10) this.reset();
      }

      draw(ctx: CanvasRenderingContext2D) {
        const progress = this.life / this.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 1;
        
        if (this.isCross) {
          ctx.save();
          ctx.globalAlpha = alpha * 0.25;
          ctx.strokeStyle = '#C9A96E';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - 5);
          ctx.lineTo(this.x, this.y + 5);
          ctx.moveTo(this.x - 3.5, this.y - 1);
          ctx.lineTo(this.x + 3.5, this.y - 1);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,169,110,${alpha * 0.4})`;
          ctx.fill();
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 120; i++) {
      const p = new Particle();
      p.life = Math.floor(Math.random() * p.maxLife);
      particles.push(p);
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
      id="particles"
    />
  );
};

export default ParticleBackground;
