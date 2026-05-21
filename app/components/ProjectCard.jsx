'use client'

import Image from 'next/image'

export function ProjectCard({ project, featured = false }) {
  const { title, tagline, category, skills, link, image, colSpan } = project

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        gridColumn: `span ${colSpan ?? 1}`,
        display: 'block',
        backgroundColor: 'var(--bg)',
        border: '2px solid var(--text)',
        borderRadius: '0px',
        padding: '0px',
        transition: 'all 200ms ease',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '8px 8px 0px rgba(0,0,0,1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Image: full bleed, no border */}
      <div style={{
        width: '100%',
        aspectRatio: featured ? '16/7' : '16/9',
        backgroundColor: 'var(--surface)',
        marginBottom: '0px',
        overflow: 'hidden',
        borderBottom: '2px solid var(--text)',
      }}>
        {typeof image === 'string' ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        ) : (
          <Image
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Content: dense and bold */}
      <div style={{ padding: '24px' }}>
        {/* Category tag */}
        <p style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '12px',
          fontFamily: 'var(--font-sans)',
        }}>
          {category[0]}
        </p>

        {/* Title */}
        <h3 style={{
          fontSize: featured ? '24px' : '18px',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: 'var(--text)',
          marginBottom: '12px',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.2,
        }}>
          {title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '20px',
          lineHeight: 1.5,
          fontFamily: 'var(--font-sans)',
        }}>
          {tagline}
        </p>

        {/* Skills: stark tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map(skill => (
            <span key={skill} style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--text)',
              borderRadius: '0px',
              padding: '4px 8px',
              fontFamily: 'var(--font-sans)',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
