const stats = [
  'NIT Warangal · B.Tech Mechanical',
  'CAT 99.3 percentile',
  'Mesa PGP · Startup Leadership',
  'Bengaluru · Open to roles',
]

export function About() {
  return (
    <section id="about" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="about-grid" style={{
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* Left: copy */}
        <div>
          <p style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '16px',
          }}>
            About
          </p>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: '24px',
          }}>
            Builder by instinct, strategist by training.
          </h2>

          {/* REPLACE with user-provided copy (~150–180 words) */}
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}>
            [About copy — replace this with your provided text.]
          </p>

          <div style={{ display: 'flex', gap: '32px' }}>
            <a href="#resume" style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--accent)',
            }}>
              View Resume →
            </a>
            <a href="#contact" style={{
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--muted)',
            }}>
              Let's Talk →
            </a>
          </div>
        </div>

        {/* Right: photo + stats */}
        <div>
          <div style={{
            width: '100%',
            aspectRatio: '4/5',
            backgroundColor: 'var(--surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
          }}>
            <img
              src="/assets/photo-full.jpg"
              alt="Srikar Pandrangi presenting"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.map(stat => (
              <p key={stat} style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--muted)',
              }}>
                {stat}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #about { padding: var(--section-pad-y) 24px; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
