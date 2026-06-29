import { useState, useRef, useEffect } from 'react';

interface HistoryItem {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export default function Projects() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: 'Welcome to Spandan-OS v2.0.0' },
    { type: 'output', text: "Type 'help' to see available commands or click the buttons below." },
  ]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, text: `guest@spandan.dev:~$ ${cmd}` }];

    if (trimmed === '') {
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case 'help':
        setHistory([
          ...newHistory,
          { type: 'output', text: 'Available commands:' },
          { type: 'success', text: '  projects  - Query portfolio projects' },
          { type: 'success', text: '  skills    - View technical power stats' },
          { type: 'success', text: '  about     - Read Spandan\'s character profile' },
          { type: 'success', text: '  clear     - Wipe terminal history' },
          { type: 'error', text: '  sudo ...  - Execute administrative overrides' },
        ]);
        break;
      case 'projects':
        setHistory([
          ...newHistory,
          { type: 'output', text: 'Fetching repositories...' },
          { type: 'error', text: '▶ No active projects to showcase yet.' },
          { type: 'output', text: '  The portfolio showcase is currently under construction and coming soon!' },
          { type: 'success', text: '  Check out my raw source code repositories directly on GitHub:' },
          { type: 'success', text: '  https://github.com/sb007ty' },
        ]);
        break;
      case 'skills':
        setHistory([
          ...newHistory,
          { type: 'output', text: 'Loading character skill matrix...' },
          { type: 'success', text: 'TypeScript/React  [███████████████████░] 95%' },
          { type: 'success', text: 'Java/Spring Boot  [██████████████████░░] 92%' },
          { type: 'success', text: 'SQL & Database    [██████████████████░░] 90%' },
          { type: 'success', text: 'System Design     [████████████████░░░░] 88%' },
        ]);
        break;
      case 'about':
        setHistory([
          ...newHistory,
          { type: 'output', text: 'Name: Spandan Banerjee' },
          { type: 'output', text: 'Title: Software Engineer II (JPMorgan Chase & Co.)' },
          { type: 'output', text: 'Focus: Full Stack systems, robust backend engineering, and rich frontend architectures.' },
          { type: 'output', text: 'Objective: Open for software engineering roles and job opportunities.' },
        ]);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'sudo rm -rf /':
        window.dispatchEvent(new Event('trigger-glitch'));
        setHistory([
          ...newHistory,
          { type: 'error', text: 'CRITICAL WARNING: SYSTEM DELETION OVERRIDE ACTIVATED' },
          { type: 'error', text: 'RUNNING CORRUPTION ALGORITHMS...' },
          { type: 'success', text: 'Just kidding! Re-routing you back to the Matrix...' },
        ]);
        break;
      case 'sudo':
        setHistory([
          ...newHistory,
          { type: 'error', text: 'WARNING: ACCESS OVERRIDE TRIGGERED' },
          { type: 'error', text: 'System files are protected. Overrides blocked.' },
          { type: 'success', text: 'Response: Nice try, hacker! 😉' },
        ]);
        break;
      default:
        setHistory([
          ...newHistory,
          { type: 'error', text: `Command not found: '${cmd}'. Type 'help' for suggestions.` },
        ]);
    }
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="projects" className="section">
      <h2 className="text-gradient">Featured Projects</h2>
      
      {/* Original Coming Soon Card */}
      <div 
        style={{ 
          marginTop: '3rem', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
      >
        <div 
          className="glass-card" 
          style={{ 
            maxWidth: '650px', 
            padding: '3rem 2.5rem', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
          }}
        >
          {/* Neon background lights inside card */}
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

          <div 
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              margin: '0 auto 1.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <svg 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ color: 'var(--secondary)', animation: 'pulse-glow 2s infinite' }}
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
              fontSize: '1.8rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Projects Showcase Coming Soon
          </h3>
          
          <p 
            style={{ 
              fontSize: '1rem', 
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '2rem'
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
              padding: '0.8rem 1.8rem'
            }}
            id="projects-github-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Explore My GitHub
          </a>
        </div>
      </div>

      {/* Interactive Developer Console Below */}
      <div style={{ marginTop: '5rem', textAlign: 'center' }}>
        <h3 className="text-gradient" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
          Interactive Developer Shell
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
          Run query commands to inspect the system terminal logs.
        </p>

        <div className="terminal-window glass-card" onClick={focusInput}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">guest@spandan.dev: ~/projects</div>
            <div style={{ width: '42px' }}></div>
          </div>

          <div className="terminal-body" ref={terminalBodyRef}>
            <div className="terminal-history">
              {history.map((item, index) => (
                <div key={index} className={`terminal-line ${item.type}`}>
                  {item.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="terminal-input-form">
              <span className="terminal-prompt">guest@spandan.dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="terminal-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>

        <div className="terminal-shortcuts" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => handleCommand('projects')} className="btn btn-secondary btn-sm-retro">
            Run 'projects'
          </button>
          <button onClick={() => handleCommand('skills')} className="btn btn-secondary btn-sm-retro">
            Run 'skills'
          </button>
          <button onClick={() => handleCommand('about')} className="btn btn-secondary btn-sm-retro">
            Run 'about'
          </button>
          <button onClick={() => handleCommand('clear')} className="btn btn-secondary btn-sm-retro">
            Clear Screen
          </button>
        </div>
      </div>

      <style>{`
        .terminal-window {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          background: rgba(10, 11, 16, 0.85);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 12px;
          overflow: hidden;
          font-family: var(--font-mono);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(168, 85, 247, 0.05);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: text;
          text-align: left;
        }

        .terminal-window:hover {
          border-color: rgba(168, 85, 247, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(168, 85, 247, 0.1);
        }

        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: rgba(20, 22, 33, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot.red { background: #ef4444; }
        .dot.yellow { background: #eab308; }
        .dot.green { background: #22c55e; }

        .terminal-title {
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .terminal-body {
          padding: 1.5rem;
          height: 260px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .terminal-history {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .terminal-line {
          font-size: 0.9rem;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .terminal-line.input {
          color: var(--text-primary);
          font-weight: bold;
        }

        .terminal-line.output {
          color: var(--text-secondary);
        }

        .terminal-line.success {
          color: var(--secondary);
        }

        .terminal-line.error {
          color: #f43f5e;
        }

        .terminal-input-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: auto;
        }

        .terminal-prompt {
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: bold;
          white-space: nowrap;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          caret-color: var(--secondary);
          padding: 0;
        }

        .btn-sm-retro {
          padding: 0.5rem 1rem !important;
          font-size: 0.8rem !important;
          border-radius: 6px !important;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
