import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import InteractiveBackground from './components/InteractiveBackground';
import BootLoader from './components/BootLoader';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

function MatrixRain({ active, onClose }: { active: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22c55e'; // Green code rain
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const interval = setInterval(draw, 30);
    
    // Auto-timeout after 3.5 seconds
    const timeout = setTimeout(() => {
      onClose();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, onClose]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        pointerEvents: 'auto',
        background: 'rgba(0,0,0,0.85)',
      }}
    />
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'cyberpunk' | 'matrix' | 'synthwave' | 'slate'>('cyberpunk');
  const [isGlitchActive, setIsGlitchActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isBooting, setIsBooting] = useState(() => !sessionStorage.getItem('portfolio-booted'));
  const particleIdRef = useRef(0);
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const cycleTheme = () => {
    const themes: ('cyberpunk' | 'matrix' | 'synthwave' | 'slate')[] = ['cyberpunk', 'matrix', 'synthwave', 'slate'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);

    // Update document element class
    document.documentElement.className = '';
    if (nextTheme !== 'cyberpunk') {
      document.documentElement.classList.add(`theme-${nextTheme}`);
    }
  };

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'experience', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Track cursor position to update CSS variables & handle custom cursor springs
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    const handleMouseMoveGlow = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMoveGlow);

    if (!dot || !ring) return () => window.removeEventListener('mousemove', handleMouseMoveGlow);

    // Hide custom cursor on mobile touch interfaces
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return () => window.removeEventListener('mousemove', handleMouseMoveGlow);
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMoveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a') || 
                            target.closest('button') || 
                            target.closest('.project-card') || 
                            target.closest('.terminal-shortcut-btn') || 
                            target.closest('.avatar-box-wrapper') ||
                            target.closest('.toggle-btn') ||
                            target.closest('.social-icon');
      
      if (isInteractive) {
        document.documentElement.classList.add('cursor-expand');
      } else {
        document.documentElement.classList.remove('cursor-expand');
      }
    };

    window.addEventListener('mousemove', handleMouseMoveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    let animFrameId: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      animFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlow);
      window.removeEventListener('mousemove', handleMouseMoveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Initialize intersection observer for scroll-reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Listen for the custom trigger-glitch event
  useEffect(() => {
    const handleGlitch = () => {
      setIsGlitchActive(true);
    };
    window.addEventListener('trigger-glitch', handleGlitch);
    return () => window.removeEventListener('trigger-glitch', handleGlitch);
  }, []);

  // Listen for clicks to spawn neon particle sparks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.terminal-window') || target.closest('button') || target.closest('a')) {
        return;
      }

      const colors = ['#a855f7', '#06b6d4', '#ec4899', '#3b82f6']; // Theme accents
      const newParticles: Particle[] = [];
      const count = 10;
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2.5;
        newParticles.push({
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4,
          alpha: 1,
        });
      }
      
      setParticles((prev) => [...prev, ...newParticles].slice(-100)); // Cap particles limit
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Particle update loop
  useEffect(() => {
    if (particles.length === 0) return;
    
    const frame = requestAnimationFrame(() => {
      setParticles((prev) => 
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.05, // Subtle gravity pull down
            alpha: p.alpha - 0.03,
          }))
          .filter((p) => p.alpha > 0)
      );
    });
    
    return () => cancelAnimationFrame(frame);
  }, [particles]);

  return (
    <div className="app-container">
      {/* BootLoader Screen overlay */}
      {isBooting && <BootLoader onComplete={() => setIsBooting(false)} />}

      {/* Custom lagging pointer cursor */}
      <div ref={cursorDotRef} className="custom-cursor" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={cursorRingRef} className="custom-cursor-ring" aria-hidden="true" style={{ opacity: 0 }} />

      {/* Interactive Canvas 3D Perspective Grid Background */}
      <InteractiveBackground theme={theme} />

      {/* Matrix Glitch Overlay */}
      <MatrixRain active={isGlitchActive} onClose={() => setIsGlitchActive(false)} />

      {/* Click Particles Sparks Overlay */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: p.alpha,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 10px ${p.color}`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      {/* Interactive mouse follow glow */}
      <div className="mouse-glow" aria-hidden="true"></div>

      {/* Background Decorative Neon Glows */}
      <div className="bg-glow-container" aria-hidden="true">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {/* Sticky Header Menu */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main>
        <Hero />
        <div className="reveal">
          <About theme={theme} />
        </div>
        <div className="reveal">
          <Projects />
        </div>
        <div className="reveal">
          <Experience />
        </div>
        <div className="reveal">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            Spandan<span>.dev</span>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Spandan Banerjee. Built with React & TypeScript. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Theme Switcher Widget */}
      <button 
        onClick={cycleTheme} 
        className="theme-switcher-btn"
        title={`Cycle theme (Current: ${theme})`}
        aria-label="Cycle theme"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span className="theme-switcher-text">{theme}</span>
      </button>
    </div>
  );
}

export default App;
