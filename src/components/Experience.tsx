interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  date: string;
  details: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Software Engineer - 2',
      company: 'JPMorgan Chase & Co.',
      location: 'India',
      date: 'Aug 2025 – Present',
      details: [
        'Developed a scalable frontend application from scratch using React.js, TypeScript, Redux Toolkit, and React Router, translating 30+ Figma screens into production-ready UI and improving development efficiency by 30%.',
        'Built 25+ reusable React components and custom hooks to standardize UI patterns, reducing feature development time by 30%.',
        'Implemented React Query for server-state management with caching and background updates, reducing redundant API calls by 40%.',
        'Designed and optimized high-performance data tables using AG Grid, supporting 10k+ rows with sorting, filtering, and pagination.',
        'Converted 30+ Figma designs into responsive and pixel-perfect UI using Tailwind CSS, ensuring cross-browser compatibility.',
        'Developed 50+ unit/integration tests using Jest and React Testing Library, and built E2E testing pipelines with Playwright.',
        'Leveraged AI-assisted development tools (GitHub Copilot) to accelerate coding, improving overall development productivity by 20%.'
      ],
    },
    {
      id: 2,
      role: 'Software Engineer - 2',
      company: 'UBS',
      location: 'Pune, Maharashtra',
      date: 'July 2022 – July 2025',
      details: [
        'Developed a high-performance, scalable finance web application using React.js, Redux, React Router, and TypeScript, resulting in a 30% reduction in user navigation time and 25% increase in engagement.',
        'Reduced web load times by 58% through strategic UI/UX and DOM rendering enhancements.',
        'Implemented secure user authentication and session management using Microsoft Authentication Library (MSAL), ensuring 99.9% uptime.',
        'Optimized UI polling mechanism by introducing smart fetching logic, cutting microservices memory usage by 50%.',
        'Engineered caching solutions with SWR, decreasing redundant API calls by 40% and improving page load times by 35%.'
      ],
    },
    {
      id: 3,
      role: 'Software Developer Intern',
      company: 'UBS',
      location: 'Pune, Maharashtra',
      date: 'Jan 2022 – June 2022',
      details: [
        'Collaborated on end-to-end development in a microservices architecture using ReactJS, Spring Boot, and PostgreSQL, driving a 40% improvement in team productivity.',
        'Enhanced web application responsive layouts by implementing CSS media queries and flexbox layouts, increasing mobile usability by 40% and lowering bounce rates by 20%.',
        'Wrote and executed unit and integration test suites using Jest and React Testing Library, increasing overall code coverage by 25%.'
      ],
    },
  ];

  return (
    <section id="experience" className="section">
      <h2 className="text-gradient">Work Experience</h2>
      
      <div className="timeline" style={{ marginTop: '4rem' }}>
        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content glass-card">
              <div className="timeline-header">
                <div className="timeline-title">
                  <h3>{exp.role}</h3>
                  <span className="timeline-company">{exp.company}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '10px' }}>({exp.location})</span>
                </div>
                <span className="timeline-date">{exp.date}</span>
              </div>
              <ul className="timeline-details">
                {exp.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
