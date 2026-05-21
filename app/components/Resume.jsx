const experience = [
  { company: 'Untitled Creatives', title: 'Founder', year: '2024–Present' },
  { company: 'Capgemini', title: 'Associate Consultant', year: '2022-23' },
]

const education = [
  { institution: 'Mesa School of Business', program: 'PGP Startup Leadership', year: '2025–Present' },
  { institution: 'NIT Warangal', program: 'B.Tech Mechanical Engineering', year: '2018–2022' },
  { institution: 'CAT', program: '99.3 percentile', year: '2024' },
]

function TimelineItem({ primary, secondary, year }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '16px',
      paddingLeft: '20px',
      borderLeft: '3px solid var(--text)',
      paddingBottom: '24px',
      fontFamily: 'var(--font-sans)',
    }}>
      <div>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{primary}</p>
        <p style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text)' }}>{secondary}</p>
      </div>
      <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>{year}</p>
    </div>
  )
}

export function Resume() {
  return (
    <section id="resume" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '3px solid var(--border)',
      backgroundColor: 'var(--bg)',
    }}>
      <p style={{
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        marginBottom: '56px',
        fontFamily: 'var(--font-sans)',
      }}>
        Resume
      </p>

      <div className="resume-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        marginBottom: '56px',
      }}>
        <div>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            marginBottom: '32px',
            fontFamily: 'var(--font-sans)',
          }}>
            Experience
          </h3>
          {experience.map(item => (
            <TimelineItem
              key={item.company}
              primary={item.company}
              secondary={item.title}
              year={item.year}
            />
          ))}
        </div>

        <div>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            marginBottom: '32px',
            fontFamily: 'var(--font-sans)',
          }}>
            Education
          </h3>
          {education.map(item => (
            <TimelineItem
              key={item.institution}
              primary={item.institution}
              secondary={item.program}
              year={item.year}
            />
          ))}
        </div>
      </div>

      <a
        href="/resume.pdf"
        download
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text)',
          textDecoration: 'underline',
          textDecorationThickness: '2px',
          textUnderlineOffset: '6px',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Download Full Resume
      </a>

      <style>{`
        @media (max-width: 767px) {
          #resume { padding: var(--section-pad-y) 24px; }
          .resume-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
