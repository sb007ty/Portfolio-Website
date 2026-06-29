import { useState } from 'react';
import SkillsForceGraph from './SkillsForceGraph';

interface AboutProps {
  theme: 'cyberpunk' | 'matrix' | 'synthwave' | 'slate';
}

export default function About({ theme }: AboutProps) {
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      skills: ['JavaScript', 'TypeScript', 'Java', 'SQL'],
    },
    {
      title: 'Frontend Development',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      skills: [
        'React', 'Redux', 'Redux Toolkit', 'React Router', 'AG Grid',
        'Tailwind CSS', 'Material-UI', 'SWR', 'HTML5', 'CSS3',
        'SCSS', 'LESS', 'Webpack', 'Babel', 'Axios',
        'Accessibility (WCAG)', 'MSAL (Auth)', 'Figma'
      ],
    },
    {
      title: 'Backend & Databases',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
        </svg>
      ),
      skills: [
        'Java Spring Boot', 'Spring Security & OAuth2', 'PostgreSQL',
        'Oracle SQL', 'Node.js', 'REST APIs', 'Hibernate', 'GraphQL', 'JWT (Security)'
      ],
    },
    {
      title: 'QA, DevOps & Cloud',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <polygon points="12 11 12 17 17 14"></polygon>
        </svg>
      ),
      skills: [
        'Jest', 'React Testing Library', 'Cypress', 'Playwright', 'Docker',
        'Kubernetes', 'Azure Kubernetes Services (AKS)', 'Git', 'CI/CD Pipelines',
        'AWS', 'GitLab', 'CLI', 'System Design Patterns'
      ],
    },
    {
      title: 'AI & Engineering Automation',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      skills: [
        'GitHub Copilot', 'AI Agents Automation', 'LLM Prompt Engineering',
        'Workflow Automation', 'Intelligent Code Generation'
      ],
    },
  ];

  return (
    <section id="about" className="section">
      <h2 className="text-gradient">About & Skills</h2>
      
      <div className="about-grid" style={{ marginTop: '3rem' }}>
        <div className="about-details">
          <h3 className="text-gradient">Who I Am</h3>
          <p>
            I am a <strong>Full Stack Software Engineer</strong> at <strong>JPMorgan Chase & Co.</strong>, where I architect high-performance, enterprise-grade web applications. Combining pixel-perfect frontend fidelity with robust backend services, I specialize in translating complex business workflows into seamless, responsive user interfaces.
          </p>
          <p>
            Prior to JPMorgan Chase, I was a Software Engineer at <strong>UBS</strong>, where I developed scalability-focused financial software systems, successfully reducing application load times by 58% and memory overhead by 50%.
          </p>
          <p>
            I hold a <strong>Bachelor of Technology in Electronics and Communication Engineering</strong> from <strong>Vellore Institute of Technology (VIT Vellore)</strong>, graduating with a CGPA of <strong>9.23</strong>.
          </p>
          <p>
            My design and engineering philosophy centers on clean code practices, modular architectures, and data-driven optimization. Whether implementing caching policies, writing automated test suites, or designing database schemas, I focus on delivering scalable, secure, and highly polished digital solutions.
          </p>
        </div>

        <div className="skills-wrapper">
          <div className="skills-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 className="text-gradient" style={{ margin: 0 }}>Technical Skills</h3>
            <div className="view-mode-toggle">
              <button 
                onClick={() => setViewMode('list')} 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                List View
              </button>
              <button 
                onClick={() => setViewMode('graph')} 
                className={`toggle-btn ${viewMode === 'graph' ? 'active' : ''}`}
              >
                Graph View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="skills-list-container">
              {skillCategories.map((category) => (
                <div key={category.title} className="skills-category glass-card">
                  <h4>
                    {category.icon}
                    {category.title}
                  </h4>
                  <div className="skills-list">
                    {category.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SkillsForceGraph theme={theme} />
          )}
        </div>
      </div>
    </section>
  );
}
