// REPLACE href values with actual links
const links = [
  { label: 'Email', href: 'mailto:srikarpandrangi121@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/srikarpandrangi' },
  { label: 'GitHub', href: 'https://github.com/tb-srikar-pandrangi' }
]

export function Contact() {
  return (
    <>
      <section id="contact" style={{
        padding: 'var(--section-pad-y) 64px',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '16px',
        }}>
          Contact
        </p>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '12px',
        }}>
          Let's talk.
        </h2>
        <p style={{
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '48px',
        }}>
          Open to growth, brand, and GTM roles at Series A–C startups.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--text)',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)' }}
            >
              {label} →
            </a>
          ))}
        </div>

        <style>{`
          @media (max-width: 767px) {
            #contact { padding: var(--section-pad-y) 24px; }
            footer { padding: 24px; }
          }
        `}</style>
      </section>

      <footer style={{
        padding: '24px 64px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>
          Srikar Pandrangi · 2026
        </p>
      </footer>
    </>
  )
}
