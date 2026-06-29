import { useEffect, useRef, useState } from 'react';

interface SkillsForceGraphProps {
  theme: 'cyberpunk' | 'matrix' | 'synthwave' | 'slate';
}

interface Node {
  id: string;
  label: string;
  isCategory: boolean;
  categoryId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  length: number;
}

const DATA_CATEGORIES = [
  { id: 'prog', label: 'Languages', colorIndex: 0 },
  { id: 'front', label: 'Frontend', colorIndex: 1 },
  { id: 'back', label: 'Backend & DB', colorIndex: 2 },
  { id: 'devops', label: 'DevOps & QA', colorIndex: 3 },
  { id: 'ai', label: 'AI & Auto', colorIndex: 4 }
];

const DATA_SKILLS = [
  // Programming Languages
  { label: 'TypeScript', categoryId: 'prog' },
  { label: 'JavaScript', categoryId: 'prog' },
  { label: 'Java', categoryId: 'prog' },
  { label: 'SQL', categoryId: 'prog' },
  
  // Frontend
  { label: 'React', categoryId: 'front' },
  { label: 'Redux Toolkit', categoryId: 'front' },
  { label: 'Tailwind CSS', categoryId: 'front' },
  { label: 'Material-UI', categoryId: 'front' },
  { label: 'AG Grid', categoryId: 'front' },
  { label: 'HTML5/CSS3', categoryId: 'front' },
  { label: 'Figma', categoryId: 'front' },

  // Backend
  { label: 'Spring Boot', categoryId: 'back' },
  { label: 'Spring Security', categoryId: 'back' },
  { label: 'PostgreSQL', categoryId: 'back' },
  { label: 'Oracle SQL', categoryId: 'back' },
  { label: 'Node.js', categoryId: 'back' },
  { label: 'REST APIs', categoryId: 'back' },
  { label: 'JWT Auth', categoryId: 'back' },

  // DevOps & QA
  { label: 'Jest / RTL', categoryId: 'devops' },
  { label: 'Docker', categoryId: 'devops' },
  { label: 'Kubernetes', categoryId: 'devops' },
  { label: 'Cypress', categoryId: 'devops' },
  { label: 'Playwright', categoryId: 'devops' },
  { label: 'Git / GitLab', categoryId: 'devops' },
  { label: 'CI/CD Pipelines', categoryId: 'devops' },
  { label: 'AWS', categoryId: 'devops' },

  // AI & Engineering
  { label: 'GitHub Copilot', categoryId: 'ai' },
  { label: 'LLMs & Prompting', categoryId: 'ai' },
  { label: 'AI Agent Workflows', categoryId: 'ai' },
];

export default function SkillsForceGraph({ theme }: SkillsForceGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  // References for drag-and-drop mechanics
  const draggedNodeRef = useRef<Node | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });

  // Get active theme colors
  const getThemePalette = () => {
    switch (theme) {
      case 'matrix':
        return [
          '#22c55e', // Emerald
          '#4ade80', // Light green
          '#15803d', // Dark green
          '#86efac', // Pale green
          '#166534', // Deep forest
        ];
      case 'synthwave':
        return [
          '#ec4899', // Hot Pink
          '#f97316', // Neon Orange
          '#d946ef', // Fuchsia
          '#eab308', // Yellow
          '#ef4444', // Red
        ];
      case 'slate':
        return [
          '#64748b', // Slate
          '#94a3b8', // Cool grey
          '#475569', // Dark slate
          '#cbd5e1', // Light slate
          '#334155', // Charcoal slate
        ];
      case 'cyberpunk':
      default:
        return [
          '#06b6d4', // Cyan
          '#a855f7', // Purple
          '#ec4899', // Pink
          '#3b82f6', // Bright Blue
          '#14b8a6', // Teal
        ];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina/High-DPI Auto-Scaling Configuration
    const dpr = window.devicePixelRatio || 1;
    let rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = 480;

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      rect = container.getBoundingClientRect();
      width = rect.width;
      height = 480;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = getThemePalette();

    // 1. Initialize Nodes
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Create category core nodes
    DATA_CATEGORIES.forEach((cat, idx) => {
      // Position category hubs symmetrically in a circle around center
      const angle = (idx / DATA_CATEGORIES.length) * Math.PI * 2;
      const radiusFromCenter = Math.min(width, height) * 0.22;
      
      nodes.push({
        id: cat.id,
        label: cat.label,
        isCategory: true,
        categoryId: cat.id,
        x: width / 2 + Math.cos(angle) * radiusFromCenter,
        y: height / 2 + Math.sin(angle) * radiusFromCenter,
        vx: 0,
        vy: 0,
        radius: 36,
        color: colors[cat.colorIndex % colors.length],
      });
    });

    // Create sub-skill nodes connected to their categories
    DATA_SKILLS.forEach((skill, idx) => {
      const parent = nodes.find((n) => n.id === skill.categoryId);
      if (!parent) return;

      // Spacing out around parent hub
      const angle = Math.random() * Math.PI * 2;
      const offset = 65 + Math.random() * 45;

      const nodeColors = getThemePalette();
      const parentCatIdx = DATA_CATEGORIES.findIndex((c) => c.id === skill.categoryId);
      const baseColor = nodeColors[parentCatIdx % nodeColors.length];

      const skillNodeId = `skill-${idx}`;
      // Balanced node sizing to fit comfortably inside canvas height
      const dynamicRadius = Math.max(22, skill.label.length * 2.8 + 8);
      
      nodes.push({
        id: skillNodeId,
        label: skill.label,
        isCategory: false,
        categoryId: skill.categoryId,
        x: parent.x + Math.cos(angle) * offset,
        y: parent.y + Math.sin(angle) * offset,
        vx: 0,
        vy: 0,
        radius: dynamicRadius,
        color: baseColor,
      });

      // Link to parent category hub
      links.push({
        source: skillNodeId,
        target: skill.categoryId,
        length: 70 + Math.random() * 15, // Spring rest length
      });
    });

    // 2. Event Listeners for Interaction
    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const canvasRect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - canvasRect.left,
        y: clientY - canvasRect.top,
      };
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      mouseRef.current.isDown = true;

      // Find if clicked on any node
      let clickedNode: Node | null = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dist = Math.hypot(n.x - pos.x, n.y - pos.y);
        if (dist < n.radius) {
          clickedNode = n;
          break;
        }
      }

      if (clickedNode) {
        draggedNodeRef.current = clickedNode;
      }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;

      // Find hovered node
      let hoverNode: Node | null = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dist = Math.hypot(n.x - pos.x, n.y - pos.y);
        if (dist < n.radius) {
          hoverNode = n;
          break;
        }
      }
      setHoveredNode(hoverNode);
      
      if (hoverNode) {
        document.documentElement.classList.add('cursor-expand');
      } else {
        document.documentElement.classList.remove('cursor-expand');
      }
    };

    const handleMouseUp = () => {
      draggedNodeRef.current = null;
      mouseRef.current.isDown = false;
      document.documentElement.classList.remove('cursor-expand');
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile compatibility
    canvas.addEventListener('touchstart', handleMouseDown, { passive: true });
    canvas.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // 3. Physics Simulation Loop
    let animationId: number;

    const simulate = () => {
      // Adjusted constants for physical stability
      const gravity = 0.015; // Gentle center pull
      const damping = 0.88; // Viscous velocity friction
      const bounce = 0.4;

      // Apply forces to nodes
      nodes.forEach((n) => {
        if (n === draggedNodeRef.current) {
          // Locked to mouse coordinates if dragging
          n.x += (mouseRef.current.x - n.x) * 0.28;
          n.y += (mouseRef.current.y - n.y) * 0.28;
          n.vx = 0;
          n.vy = 0;
          return;
        }

        // Pull towards canvas center
        const dxCenter = width / 2 - n.x;
        const dyCenter = height / 2 - n.y;
        n.vx += dxCenter * gravity * (n.isCategory ? 1.6 : 0.7) * 0.02;
        n.vy += dyCenter * gravity * (n.isCategory ? 1.6 : 0.7) * 0.02;

        // Apply velocities with damping friction
        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx;
        n.y += n.vy;

        // Boundary restraints
        if (n.x - n.radius < 0) {
          n.x = n.radius;
          n.vx *= -bounce;
        } else if (n.x + n.radius > width) {
          n.x = width - n.radius;
          n.vx *= -bounce;
        }
        if (n.y - n.radius < 0) {
          n.y = n.radius;
          n.vy *= -bounce;
        } else if (n.y + n.radius > height) {
          n.y = height - n.radius;
          n.vy *= -bounce;
        }
      });

      // Apply Spring Links Attraction
      links.forEach((l) => {
        const sourceNode = nodes.find((n) => n.id === l.source);
        const targetNode = nodes.find((n) => n.id === l.target);
        if (!sourceNode || !targetNode) return;

        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const distance = Math.hypot(dx, dy) || 1;

        // Hooke's Law spring simulation
        const stiffness = 0.022;
        const delta = distance - l.length;
        const force = delta * stiffness;

        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        if (sourceNode !== draggedNodeRef.current) {
          sourceNode.vx += fx;
          sourceNode.vy += fy;
        }
        if (targetNode !== draggedNodeRef.current) {
          targetNode.vx -= fx;
          targetNode.vy -= fy;
        }
      });

      // Apply Node-to-Node Repulsion Collision (prevent overlap jittering)
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = n1.radius + n2.radius + 10; // Pad distance

          if (dist < minDist) {
            const overlap = minDist - dist;
            // Lower multiplier prevents extreme velocity explosions (soft body style)
            const pushX = (dx / dist) * overlap * 0.06;
            const pushY = (dy / dist) * overlap * 0.06;

            if (n1 !== draggedNodeRef.current) {
              n1.vx -= pushX;
              n1.vy -= pushY;
            }
            if (n2 !== draggedNodeRef.current) {
              n2.vx += pushX;
              n2.vy += pushY;
            }
          }
        }
      }

      // 4. Render Graph Elements
      ctx.clearRect(0, 0, width, height);

      // Draw Links (connecting glowing lines)
      ctx.lineWidth = 1.2;
      links.forEach((l) => {
        const sourceNode = nodes.find((n) => n.id === l.source);
        const targetNode = nodes.find((n) => n.id === l.target);
        if (!sourceNode || !targetNode) return;

        // Transparent link connection lines
        ctx.strokeStyle = `${sourceNode.color}24`; 
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.stroke();
      });

      // Draw Nodes
      nodes.forEach((n) => {
        const isHovered = n === hoveredNode;
        const isDragged = n === draggedNodeRef.current;

        ctx.save();

        // Neon outer shadow glow
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isHovered || isDragged ? 14 : 4;

        ctx.fillStyle = isHovered || isDragged ? n.color : 'rgba(10, 10, 12, 0.85)';
        ctx.strokeStyle = n.color;
        ctx.lineWidth = n.isCategory ? 2.5 : 1.2;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Node Text Labels
        ctx.fillStyle = isHovered || isDragged ? '#ffffff' : '#e2e8f0';
        ctx.font = n.isCategory ? 'bold 12px var(--font-mono)' : '9px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Word wrap long texts for category nodes
        if (n.isCategory && n.label.includes('&')) {
          const parts = n.label.split('&');
          ctx.fillText(parts[0].trim(), n.x, n.y - 7);
          ctx.fillText(`& ${parts[1].trim()}`, n.x, n.y + 7);
        } else {
          ctx.fillText(n.label, n.x, n.y);
        }
      });

      animationId = requestAnimationFrame(simulate);
    };

    simulate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      cancelAnimationFrame(animationId);
      document.documentElement.classList.remove('cursor-expand');
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="skills-force-graph-container glass-card"
      style={{
        position: 'relative',
        width: '100%',
        height: '480px',
        overflow: 'hidden',
        cursor: hoveredNode ? 'grab' : 'default',
        marginTop: '1.5rem',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          pointerEvents: 'none',
        }}
      >
        ✦ Drag hubs and tags to test physics inertia
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
