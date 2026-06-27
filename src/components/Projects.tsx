export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="text-gradient">Featured Projects</h2>
      
      <div 
        style={{ 
          marginTop: '4rem', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '400px'
        }}
      >
        <div 
          className="glass-card" 
          style={{ 
            maxWidth: '650px', 
            padding: '3.5rem 2.5rem', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Neon background light effect inside card */}
          <div 
            style={{
              position: 'absolute',
              top: '-30%',
              left: '-30%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '-30%',
              right: '-30%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }}
          />

          {/* Icon */}
          <div 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              margin: '0 auto 2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ color: 'var(--secondary)', animation: 'pulse 2s infinite' }}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
              <line x1="12" y1="7" x2="12" y2="13"></line>
              <line x1="9" y1="10" x2="15" y2="10"></line>
            </svg>
          </div>

          <h3 
            className="text-gradient" 
            style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Projects Showcase Coming Soon
          </h3>
          
          <p 
            style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '2.5rem'
            }}
          >
            I am currently refactoring and assembling my portfolio showcase to feature enterprise-level fullstack applications. 
            In the meantime, feel free to explore my source code repositories and open-source contributions directly on GitHub.
          </p>

          <a 
            href="https://github.com/sb007ty" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              padding: '1rem 2rem'
            }}
            id="projects-github-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Explore My GitHub
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
