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
          <div className="hero-blob-wrapper"></div>
        </div>
      </div>
      <style>{`
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: var(--secondary); }
        }
      `}</style>
    </section>
  );
}
