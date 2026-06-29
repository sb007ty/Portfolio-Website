import { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png';

export default function Hero() {
  const titles = [
    'Full Stack Software Engineer',
    'JPMorgan Chase & Co. | Software Engineer II',
    'React, TypeScript & Spring Boot Expert',
    'Database Architect (Postgres & Oracle SQL)'
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentFullText = titles[currentTitleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));

        if (displayText === currentFullText) {
          // Hold title, then start deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(100); // Reset speed
          return;
        }
      }

      setTypingSpeed(isDeleting ? 40 : 80);
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  return (
    <section id="home" className="section">
      <div className="hero-wrapper">
        <div className="hero-content">
          <span className="hero-subtitle">HI, MY NAME IS</span>
          <h1>
            Spandan <span className="text-gradient">Banerjee</span>
          </h1>
          <h3 style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}>
            I'm a&nbsp;
            <span className="text-gradient" style={{ borderRight: '2px solid var(--secondary)', paddingRight: '4px', animation: 'blink 0.75s step-end infinite' }}>
              {displayText}
            </span>
          </h3>
          <p className="hero-desc">
            I build high-performance, enterprise-grade fullstack web applications.
            Focused on combining robust backend services with premium, pixel-perfect user interfaces.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" id="hero-view-work-btn">
              View My Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary" id="hero-contact-btn">
              Let's Connect
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div 
            className={`hero-toy-container ${isFlipped ? 'flipped' : ''}`} 
            onClick={() => setIsFlipped(!isFlipped)}
            title="Click to flip character card!"
          >
            <div className="hero-toy-inner">
              {/* Front: Toy Package */}
              <div className="hero-toy-front">
                <img
                  src={avatar}
                  alt="Spandan Banerjee Software Engineer Action Figure"
                  className="hero-toy-image"
                />
                <div className="click-hint">Click to unbox / flip</div>
              </div>
              
              {/* Back: Card Stats */}
              <div className="hero-toy-back">
                <div className="back-cardboard">
                  <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>CHARACTER DETAILS</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem' }}>
                    Edition: Full Stack Engineer II (JPMorgan Chase)
                  </p>
                  
                  <div className="stats-list">
                    <div className="stat-item">
                      <span>TypeScript & React</span>
                      <div className="stat-bar"><div className="stat-fill" style={{ width: '95%' }}></div></div>
                    </div>
                    <div className="stat-item">
                      <span>Java & Spring Boot</span>
                      <div className="stat-bar"><div className="stat-fill" style={{ width: '92%' }}></div></div>
                    </div>
                    <div className="stat-item">
                      <span>System Design</span>
                      <div className="stat-bar"><div className="stat-fill" style={{ width: '88%' }}></div></div>
                    </div>
                    <div className="stat-item">
                      <span>Database (Postgres/Oracle)</span>
                      <div className="stat-bar"><div className="stat-fill" style={{ width: '90%' }}></div></div>
                    </div>
                  </div>
                  
                  <div className="toy-warning">
                    <p style={{ margin: 0 }}>⚠️ <strong>WARNING</strong>: High performance developer. May refactor codebases spontaneously.</p>
                  </div>
                  
                  <div className="toy-barcode-container">
                    <div className="toy-barcode">|||| | ||||| | || |||| | |</div>
                    <span className="barcode-number">SPNDN-8B9B-2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: var(--secondary); }
        }
        
        .hero-toy-container {
          position: relative;
          max-width: 340px;
          width: 100%;
          height: 480px;
          perspective: 1000px;
          cursor: pointer;
        }

        .hero-toy-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
          transform: rotateY(-8deg) rotateX(4deg);
        }

        .hero-toy-container:hover .hero-toy-inner {
          transform: rotateY(12deg) rotateX(-4deg) translateY(-8px);
        }

        .hero-toy-container.flipped .hero-toy-inner {
          transform: rotateY(180deg) rotateX(0deg);
        }

        .hero-toy-front, .hero-toy-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-toy-front {
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(168, 85, 247, 0.15);
        }

        .hero-toy-back {
          background: linear-gradient(135deg, #11131e 0%, #0a0b10 100%);
          transform: rotateY(180deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(6, 182, 212, 0.15);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-color: rgba(6, 182, 212, 0.2);
        }

        .hero-toy-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .click-hint {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 11, 16, 0.85);
          backdrop-filter: blur(4px);
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--secondary);
          border: 1px solid rgba(6, 182, 212, 0.3);
          animation: pulse 1.5s infinite;
          letter-spacing: 1px;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }

        /* Front shimmer overlay on hover */
        .hero-toy-front::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          transition: none;
          z-index: 2;
          pointer-events: none;
        }

        .hero-toy-container:hover .hero-toy-front::before {
          left: 150%;
          transition: all 0.8s ease-in-out;
        }

        /* Backboard Card styling details */
        .back-cardboard {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1rem 0;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-item span {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }

        .stat-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 4px;
        }

        .toy-warning {
          background: rgba(239, 68, 68, 0.06);
          border: 1px dashed rgba(239, 68, 68, 0.2);
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          font-size: 0.7rem;
          color: #fca5a5;
          line-height: 1.4;
        }

        .toy-barcode-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: auto;
          opacity: 0.7;
        }

        .toy-barcode {
          font-family: 'Fira Code', monospace;
          font-size: 1.2rem;
          letter-spacing: -1px;
          font-weight: 900;
          color: var(--text-primary);
          user-select: none;
        }

        .barcode-number {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 2px;
        }
      `}</style>
    </section>
  );
}
