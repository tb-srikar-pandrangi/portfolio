import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActiveSection } from '../src/hooks/useActiveSection'

describe('useActiveSection', () => {
  beforeEach(() => {
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
    vi.stubGlobal('IntersectionObserver', vi.fn(function () { return mockObserver }))
  })

  it('returns the first section id as default active', () => {
    const { result } = renderHook(() =>
      useActiveSection(['hero', 'work', 'about'])
    )
    expect(result.current).toBe('hero')
  })
})
