import { useState } from 'react'
import { projects, categories } from '../data/projects'
import { filterProjects } from '../utils/filterProjects'
import { ProjectCard } from './ProjectCard'

export function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visible = filterProjects(projects, activeCategory)
  const featured = visible.find(p => p.featured)
  const rest = visible.filter(p => !p.featured)

  return (
    <section id="work" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '1px solid var(--border)',
    }}>
      {/* Section label */}
      <p style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: '8px',
      }}>
        Work
      </p>

      <h2 style={{
        fontSize: '32px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        marginBottom: '40px',
      }}>
        GTM strategies, AI agents, and analytics tools — built for real problems.
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid var(--border)',
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--surface)',
              color: activeCategory === cat ? '#fff' : 'var(--muted)',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'background-color 150ms ease, color 150ms ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
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
