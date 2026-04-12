import { describe, it, expect } from 'vitest'
import { filterProjects } from '../src/utils/filterProjects'

const mockProjects = [
  { id: 'a', category: ['AI/Automation', 'Analytics'] },
  { id: 'b', category: ['Brand', 'GTM'] },
  { id: 'c', category: ['Growth'] },
]

describe('filterProjects', () => {
  it('returns all projects when filter is "All"', () => {
    expect(filterProjects(mockProjects, 'All')).toHaveLength(3)
  })

  it('filters correctly when a project belongs to multiple categories', () => {
    const result = filterProjects(mockProjects, 'Brand')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('b')
  })

  it('filters correctly when a project belongs to a single category', () => {
    const result = filterProjects(mockProjects, 'Growth')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('c')
  })

  it('returns empty array when no projects match the category', () => {
    expect(filterProjects(mockProjects, 'NonExistent')).toHaveLength(0)
  })

  it('returns multiple projects when several match the category', () => {
    const result = filterProjects(mockProjects, 'AI/Automation')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('a')
  })
})
