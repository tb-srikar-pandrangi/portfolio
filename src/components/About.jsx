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
            Every startup wants growth. Most start by hiring for channels.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text)', lineHeight: 1.7 }}>
              An ads person, an SEO person, maybe a social media manager. Before anyone's figured out why people should care in the first place. I've seen this play out enough times to know that channels without a story just burns money faster. So I work the other way. Start with what makes someone stop and pay attention, then figure out how to get that in front of more people.
            </p>
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text)', lineHeight: 1.7 }}>
              I studied mechanical engineering at NIT Warangal. Loved how engineers think in systems, didn't love where the career was headed. Joined Capgemini after college, learned how large organizations operate, and figured out pretty quickly that wasn't for me either. After I quit, I spent time learning brand design, started freelancing, and eventually turned that into Untitled Creatives. That's where I kept getting pulled toward strategy and execution — not just brand guidelines. Took the CAT, scored 99.3 percentile, and picked Mesa School of Business for its Bengaluru roots and startup ecosystem.
            </p>
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text)', lineHeight: 1.7 }}>
              I pick up context fast. Went from knowing nothing about the silver jewellery market to delivering a 16-slide strategy deck with 83 cited sources for GIVA in days. I also build things myself — if I need a dashboard or an AI agent, I'll put it together with n8n and OpenAI rather than writing a brief and waiting. The engineering background helps. I think in systems, not channels.
            </p>
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text)', lineHeight: 1.7 }}>
              I want to join a startup and own the full journey from "some people know who we are" to "we know exactly how we grow." If you're hiring or know someone who is, let's talk.
            </p>
          </div>

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
