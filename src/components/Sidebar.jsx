import { useActiveSection } from '../hooks/useActiveSection'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export function Sidebar() {
  const active = useActiveSection(sections.map(s => s.id))

  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: 'var(--sidebar-width)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 32px',
      borderRight: '1px solid var(--border)',
      backgroundColor: 'var(--bg)',
      zIndex: 100,
    }}>
      <div>
        <p style={{
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          color: 'var(--text)',
          marginBottom: '48px',
        }}>
          Srikar Pandrangi
        </p>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: active === id ? 'var(--accent)' : 'var(--border)',
                flexShrink: 0,
                transition: 'background-color 200ms ease',
              }} />
              <span style={{
                fontSize: '12px',
                fontWeight: 400,
                color: active === id ? 'var(--text)' : 'var(--muted)',
                transition: 'color 200ms ease',
              }}>
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.02em' }}>
        Open to roles · Bengaluru
      </p>
    </aside>
  )
}
