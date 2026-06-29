import { useEffect, useState } from 'react';

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
          <div className="hero-toy-container">
            <img 
              src="/src/assets/avatar.png" 
              alt="Spandan Banerjee Software Engineer Action Figure" 
              className="hero-toy-image" 
            />
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
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(168, 85, 247, 0.15);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: perspective(1000px) rotateY(-8deg) rotateX(4deg) rotateZ(-1deg);
        }

        .hero-toy-container:hover {
          transform: perspective(1000px) rotateY(4deg) rotateX(-4deg) rotateZ(0deg) translateY(-8px) scale(1.04);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 45px rgba(168, 85, 247, 0.35);
          border-color: rgba(168, 85, 247, 0.4);
        }

        .hero-toy-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        /* Highlight shimmer effect on hover */
        .hero-toy-container::before {
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

        .hero-toy-container:hover::before {
          left: 150%;
          transition: all 0.8s ease-in-out;
        }
      `}</style>
    </section>
  );
}
