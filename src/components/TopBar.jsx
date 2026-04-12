export function TopBar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em' }}>
        Srikar Pandrangi
      </span>
      <nav style={{ display: 'flex', gap: '24px' }}>
        {['Work', 'About', 'Contact'].map(label => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
