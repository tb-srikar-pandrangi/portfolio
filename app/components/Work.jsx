'use client'

import { useState } from 'react'
import { projects, categories } from '@/lib/projects'
import { filterProjects } from '@/lib/filterProjects'
import { ProjectCard } from './ProjectCard'

export function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visible = filterProjects(projects, activeCategory)
  const featured = visible.find(p => p.featured)
  const rest = visible.filter(p => !p.featured)

  return (
    <section id="work" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '3px solid var(--border)',
      backgroundColor: 'var(--bg)',
    }}>
      {/* Section label */}
      <p style={{
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        marginBottom: '24px',
        fontFamily: 'var(--font-sans)',
      }}>
        Work
      </p>

      <h2 style={{
        fontSize: '48px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        marginBottom: '56px',
        fontFamily: 'var(--font-serif)',
        lineHeight: 1.15,
      }}>
        GTM strategies, AI agents, and analytics tools — built for real problems.
      </h2>

      {/* Filter bar: stark rectangles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '64px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 18px',
              borderRadius: '0px',
              border: activeCategory === cat ? '2px solid var(--text)' : '2px solid var(--muted)',
              backgroundColor: activeCategory === cat ? 'var(--text)' : 'transparent',
              color: activeCategory === cat ? 'var(--bg)' : 'var(--text)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 150ms ease',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento grid: harsh borders */}
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
      }}>
        {featured && <ProjectCard project={featured} featured={true} />}
        {rest.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          #work { padding: var(--section-pad-y) 24px; }
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-grid > * { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
