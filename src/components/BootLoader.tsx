import { useEffect, useState, useRef } from 'react';

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  'SPANDAN_OS [Version 2.6.30]',
  '(c) 2026 Spandan Banerjee. All rights reserved.',
  '',
  'INITIALIZING SYSTEM CORES...',
  '[ OK ] Load Kernel Modules',
  '[ OK ] Initialize Graphics Driver (React 19 + Vite)',
  '[ OK ] Establish Network Port Protocols (HTTPS)',
  '[ OK ] Mounting portfolio workspace: /Users/spandanbanerjee/Developer',
  '',
  'RETRIEVING EMPLOYMENT ARCHIVES...',
  '>> FETCH: JPMorgan Chase & Co. (Full Stack Software Engineer)',
  '>> FETCH: UBS (Software Engineer)',
  '>> FETCH: Vellore Institute of Technology (B.Tech ECE)',
  '>> Status: Loaded successfully',
  '',
  'COMPILING TECH-STACK RELATIONSHIP GRAPH...',
];

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [loadingPercent, setLoadingPercent] = useState(-1); // -1 means not starting yet
  const [bootStep, setBootStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Skip boot handler
  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      sessionStorage.setItem('portfolio-booted', 'true');
      onComplete();
    }, 600); // Allow fadeout animation to finish
  };

  // Step-by-step console line printing
  useEffect(() => {
    if (bootStep >= BOOT_LINES.length) {
      // Start the progress bar loading phase
      setLoadingPercent(0);
      return;
    }

    const delay = BOOT_LINES[bootStep] === '' ? 100 : Math.random() * 80 + 40;
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, BOOT_LINES[bootStep]]);
      setBootStep((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [bootStep]);

  // Loading progress bar physics
  useEffect(() => {
    if (loadingPercent < 0 || loadingPercent >= 100) {
      if (loadingPercent === 100) {
        // Finishing line messages
        const timer = setTimeout(() => {
          setLines((prev) => [
            ...prev,
            '>> Nodes mapped: 5 categories, 48 nodes, 112 connections.',
            '',
            'SYSTEM SECURE. LAUNCHING PORTFOLIO INTERFACE...',
          ]);
          
          // Complete and fade out after a brief delay
          const completeTimer = setTimeout(() => {
            handleSkip();
          }, 800);

          return () => clearTimeout(completeTimer);
        }, 300);
        return () => clearTimeout(timer);
      }
      return;
    }

    const increment = Math.floor(Math.random() * 8) + 4;
    const delay = Math.random() * 80 + 30;
    const timer = setTimeout(() => {
      setLoadingPercent((prev) => Math.min(100, prev + increment));
    }, delay);

    return () => clearTimeout(timer);
  }, [loadingPercent]);

  // Autoscroll terminal content to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, loadingPercent]);

  // Generate progress bar visual representation
  const renderProgressBar = () => {
    if (loadingPercent < 0) return null;
    const barWidth = 30;
    const filledCount = Math.round((loadingPercent / 100) * barWidth);
    const emptyCount = barWidth - filledCount;
    const barStr = '='.repeat(filledCount) + ' '.repeat(emptyCount);
    const arrow = filledCount < barWidth ? '>' : '=';
    
    // Replace last character of progress with arrow if not 100%
    const finalBar = filledCount > 0 && filledCount < barWidth
      ? barStr.slice(0, filledCount - 1) + arrow + barStr.slice(filledCount)
      : barStr;

    return `[${finalBar}] ${loadingPercent}%`;
  };

  return (
    <div
      ref={containerRef}
      className={`bootloader-container ${isFadingOut ? 'crt-power-off' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* CRT Scanline Filter effect overlays */}
      <div className="crt-overlay"></div>
      <div className="crt-scanlines"></div>

      <div className="bootloader-terminal">
        {lines.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}
        {loadingPercent >= 0 && (
          <div className="terminal-line progress-line text-cyan">
            {renderProgressBar()}
          </div>
        )}
        <div className="terminal-line cursor-line">
          <span className="terminal-caret"></span>
        </div>
      </div>

      <button className="bootloader-skip-btn" onClick={handleSkip}>
        [SKIP BOOT SEQUENCE]
      </button>
    </div>
  );
}
