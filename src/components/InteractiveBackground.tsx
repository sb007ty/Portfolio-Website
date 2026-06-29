import { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  theme: 'cyberpunk' | 'matrix' | 'synthwave' | 'slate';
}

export default function InteractiveBackground({ theme }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3D perspective parameters
    const focalLength = 300;
    const gridSpacing = 45;
    const gridDepth = 15; // Number of horizontal lines in depth
    let time = 0;

    // Stars / Particles
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
    }

    const starsCount = 60;
    const stars: Star[] = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * focalLength * 2,
        size: 1 + Math.random() * 2,
        speed: 0.5 + Math.random() * 1.5,
      });
    }

    const getColors = () => {
      switch (theme) {
        case 'matrix':
          return {
            grid: 'rgba(34, 197, 94, 0.08)',
            dots: 'rgba(34, 197, 94, 0.15)',
            stars: 'rgba(34, 197, 94, 0.25)',
            glow: 'rgba(34, 197, 94, 0.03)',
          };
        case 'synthwave':
          return {
            grid: 'rgba(236, 72, 153, 0.12)', // Hot pink
            dots: 'rgba(249, 115, 22, 0.2)', // Orange glow
            stars: 'rgba(253, 224, 71, 0.35)', // Yellow stars
            glow: 'rgba(236, 72, 153, 0.05)',
          };
        case 'slate':
          return {
            grid: 'rgba(148, 163, 184, 0.1)', // Slate grey
            dots: 'rgba(100, 116, 139, 0.15)',
            stars: 'rgba(203, 213, 225, 0.2)',
            glow: 'rgba(148, 163, 184, 0.02)',
          };
        case 'cyberpunk':
        default:
          return {
            grid: 'rgba(6, 182, 212, 0.1)', // Cyan
            dots: 'rgba(168, 85, 247, 0.18)', // Purple
            stars: 'rgba(6, 182, 212, 0.25)',
            glow: 'rgba(168, 85, 247, 0.04)',
          };
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const colors = getColors();

      // Render 3D Perspective Grid
      time += 0.015; // Grid scrolling velocity
      const scrollOffset = (time % 1) * gridSpacing;

      const horizonY = height * 0.55; // Horizon height
      const cX = width / 2; // Center X

      ctx.lineWidth = 1;

      // Draw Grid Horizontal Lines (perspective lines moving forward)
      for (let i = 0; i < gridDepth; i++) {
        // Calculate z depth with exponential distribution for realistic perspective spacing
        const z = i * gridSpacing - scrollOffset;
        if (z <= 0) continue;

        const scale = focalLength / (focalLength + z);
        const y3d = horizonY + scale * (height - horizonY) * 0.9;

        // Draw horizontal line
        ctx.strokeStyle = colors.grid;
        ctx.beginPath();
        ctx.moveTo(0, y3d);
        ctx.lineTo(width, y3d);
        ctx.stroke();
      }

      // Draw Grid Vertical Lines (converging to horizon point)
      const numVerticalLines = Math.floor(width / gridSpacing) + 6;
      for (let i = -numVerticalLines / 2; i <= numVerticalLines / 2; i++) {
        const xOffset = i * gridSpacing;

        // Draw line starting from horizon center extending to bottom
        ctx.strokeStyle = colors.grid;
        ctx.beginPath();
        ctx.moveTo(cX + xOffset * 0.1, horizonY); // Converged at horizon

        // Bottom point with mouse bending distortion
        const xBottom = cX + xOffset * 3;
        const yBottom = height;

        // Calculate cursor hover distortion on grid vertical lines
        let dx = 0;
        if (mouse.x >= 0 && mouse.y >= horizonY) {
          const distToMouse = Math.hypot(mouse.x - xBottom, mouse.y - yBottom);
          if (distToMouse < 250) {
            const pull = (1 - distToMouse / 250) * 20;
            dx = (mouse.x - xBottom) > 0 ? pull : -pull;
          }
        }

        ctx.lineTo(xBottom + dx, yBottom);
        ctx.stroke();
      }

      // Render Stars / Ambient Particles (moving in 3D space)
      stars.forEach((star) => {
        star.z -= star.speed;

        // Reset stars passing the viewer
        if (star.z <= 0) {
          star.z = focalLength * 2;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const scale = focalLength / star.z;
        const px = cX + star.x * scale;
        const py = horizonY + star.y * scale;

        // Only draw if inside screen bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Adjust star size by distance (scale)
          const size = star.size * scale * 1.5;
          ctx.fillStyle = colors.stars;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.5, Math.min(size, 4)), 0, Math.PI * 2);
          ctx.fill();

          // Subtle neon glow around some stars
          if (star.size > 2) {
            ctx.shadowColor = colors.stars;
            ctx.shadowBlur = 8;
            ctx.fillStyle = colors.stars;
            ctx.fill();
            ctx.shadowBlur = 0; // reset shadow
          }
        }
      });

      // Interactive mouse follow glow overlay
      if (mouse.x >= 0 && mouse.y >= 0) {
        const glowRad = 180;
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRad
        );
        gradient.addColorStop(0, colors.glow);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
