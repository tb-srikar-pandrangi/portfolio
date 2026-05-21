import Image from 'next/image'

const badges = [
  'AI agents',
  'GTM strategies',
  'Growth Playbooks',
]

export function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 64px',
      position: 'relative',
      borderBottom: '3px solid var(--border)',
    }}>
      <div style={{ maxWidth: '700px' }}>

        {/* Portrait: stark square with border */}
        <div style={{
          width: '120px',
          height: '120px',
          overflow: 'hidden',
          border: '4px solid var(--text)',
          marginBottom: '48px',
          backgroundColor: 'var(--surface)',
        }}>
          <Image
            src="/Image.png"
            alt="Srikar Pandrangi"
            width={120}
            height={120}
            priority
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        {/* Superheading: small caps, all caps */}
        <p style={{
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '32px',
          fontFamily: 'var(--font-sans)',
        }}>
          Growth Strategist · Brand Builder · AI Automation
        </p>

        {/* Headline: oversized serif, brutal and direct */}
        <h1 style={{
          fontSize: 'clamp(48px, 5.5vw, 84px)',
          fontWeight: 700,
          lineHeight: 1.05,
          color: 'var(--text)',
          marginBottom: '32px',
          fontFamily: 'var(--font-serif)',
        }}>
          I take startups from "some people know who we are" to "we know exactly how we grow."
        </h1>

        {/* Subheading: smaller, no frills */}
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '48px',
          lineHeight: 1.7,
          maxWidth: '560px',
          fontFamily: 'var(--font-sans)',
        }}>
          Mesa School of Business. Formerly: Untitled Creatives, Capgemini.
        </p>

        {/* Badges: stark outline boxes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '56px' }}>
          {badges.map(badge => (
            <span key={badge} style={{
              display: 'inline-block',
              padding: '10px 18px',
              backgroundColor: 'transparent',
              border: '2px solid var(--text)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs: bold and underlined */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <a href="#work" style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'underline',
            textDecorationThickness: '2px',
            textUnderlineOffset: '6px',
            fontFamily: 'var(--font-sans)',
          }}>
            View Work
          </a>
          <a href="/resume.pdf" download style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'underline',
            textDecorationThickness: '2px',
            textUnderlineOffset: '6px',
            fontFamily: 'var(--font-sans)',
          }}>
            Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator: minimal */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--text)',
        fontSize: '18px',
        fontWeight: 700,
        userSelect: 'none',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        ↓
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 767px) {
          #hero { padding: 80px 24px 64px; align-items: flex-start; border-bottom: 2px solid var(--border); }
        }
      `}</style>
    </section>
  )
}
