'use client'

const links = [
  { label: 'Email', href: 'mailto:srikarpandrangi121@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/srikarpandrangi' },
  { label: 'GitHub', href: 'https://github.com/tb-srikar-pandrangi' }
]

function ContactLink({ label, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      style={{
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--text)',
        textDecoration: 'underline',
        textDecorationThickness: '2px',
        textUnderlineOffset: '6px',
        transition: 'color 200ms ease',
        fontFamily: 'var(--font-sans)',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)' }}
    >
      {label}
    </a>
  )
}

export function Contact() {
  return (
    <>
      <section id="contact" style={{
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
          marginBottom: '24px',
          fontFamily: 'var(--font-sans)',
        }}>
          Contact
        </p>
        <h2 style={{
          fontSize: '56px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '24px',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.1,
        }}>
          Let's talk.
        </h2>
        <p style={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '56px',
          lineHeight: 1.6,
          fontFamily: 'var(--font-sans)',
        }}>
          Open to growth, brand, and GTM roles at Series A–C startups.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          {links.map(({ label, href }) => (
            <ContactLink key={label} label={label} href={href} />
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
        padding: '40px 64px',
        borderTop: '3px solid var(--border)',
        textAlign: 'left',
        backgroundColor: 'var(--bg)',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
          Srikar Pandrangi · 2026
        </p>
      </footer>
    </>
  )
}
