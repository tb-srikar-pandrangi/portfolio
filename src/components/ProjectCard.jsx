export function ProjectCard({ project, featured = false }) {
  const { title, tagline, category, skills, link, image, colSpan } = project

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        gridColumn: `span ${colSpan || 1}`,
        display: 'block',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Category tag */}
      <p style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '12px',
      }}>
        {category[0]}
      </p>

      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: featured ? '16/7' : '16/9',
        backgroundColor: 'var(--border)',
        borderRadius: '8px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.parentElement.style.display = 'none' }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: featured ? '22px' : '18px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text)',
        marginBottom: '8px',
      }}>
        {title}
      </h3>

      {/* Tagline */}
      <p style={{
        fontSize: '14px',
        fontWeight: 400,
        color: 'var(--muted)',
        marginBottom: '16px',
        lineHeight: 1.5,
      }}>
        {tagline}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {skills.map(skill => (
          <span key={skill} style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--muted)',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '3px 10px',
          }}>
            {skill}
          </span>
        ))}
      </div>
    </a>
  )
}
