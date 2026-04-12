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

  it('returns only matching projects for a category', () => {
    const result = filterProjects(mockProjects, 'Brand')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('b')
  })

  it('returns empty array when no category matches', () => {
    const result = filterProjects(mockProjects, 'Growth')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('c')
  })
})
