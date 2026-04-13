const badges = [
  '5+ AI agents deployed',
  '3 Series A GTM strategies',
  'Revenue analytics in production',
]

export function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 64px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '640px' }}>

        {/* Portrait circle */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          marginBottom: '24px',
          backgroundColor: 'var(--surface)',
        }}>
          <img
            src="/Image.png"
            alt="Srikar Pandrangi"
            width={72}
            height={72}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        </div>

        {/* Eyebrow */}
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '16px',
        }}>
          Growth · Brand · AI Automation
        </p>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 4vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '20px',
        }}>
          I build GTM playbooks and AI agents for early-stage startups.
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '32px',
          lineHeight: 1.5,
        }}>
          Currently at Mesa School of Business. Previously: Untitled Creatives, D2C co-founder, GTM consulting.
        </p>

        {/* Outcome badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {badges.map(badge => (
            <span key={badge} style={{
              display: 'inline-block',
              padding: '6px 14px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text)',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#work" style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '-0.01em',
          }}>
            View Work →
          </a>
          <a href="/resume.pdf" download style={{
            fontSize: '15px',
            fontWeight: 400,
            color: 'var(--muted)',
          }}>
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--muted)',
        fontSize: '20px',
        userSelect: 'none',
      }}>
        ↓
      </div>

      <style>{`
        @media (max-width: 767px) {
          #hero { padding: 80px 24px 64px; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
