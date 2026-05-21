// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

let animateIn

beforeEach(async () => {
  // jsdom does not implement matchMedia — stub it
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })

  document.body.innerHTML = `
    <main class="hub" id="hub">
      <div class="portrait-col"></div>
      <div class="content-col">
        <header class="name-row"></header>
        <div class="tagline"></div>
        <div class="bars">
          <button class="bar" data-section="ai-automation"></button>
          <button class="bar" data-section="brand-marketing"></button>
          <button class="bar" data-section="growth-gtm"></button>
        </div>
        <a class="outside-link"></a>
      </div>
    </main>
  `
  vi.useFakeTimers()
  const mod = await import('../portfolio.js?t=' + Date.now())
  animateIn = mod.animateIn
})

afterEach(() => {
  vi.useRealTimers()
  vi.resetModules()
})

describe('animateIn', () => {
  it('adds anim-ready to all animated elements', () => {
    animateIn()
    const ready = document.querySelectorAll('.anim-ready')
    expect(ready.length).toBeGreaterThanOrEqual(6) // portrait, name-row, tagline, 3 bars
  })

  it('adds anim-in after the stagger delay fires', () => {
    animateIn()
    // Before timers fire: no anim-in
    expect(document.querySelectorAll('.anim-in').length).toBe(0)
    // After all timers
    vi.runAllTimers()
    const done = document.querySelectorAll('.anim-in')
    expect(done.length).toBeGreaterThanOrEqual(6)
  })

  it('bars get staggered delays (each bar after the previous)', () => {
    const calls = []
    vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn, delay) => {
      calls.push(delay)
      fn()
      return 0
    })
    animateIn()
    // Portrait, name-row, tagline, bar1, bar2, bar3 — delays should be ascending
    const barDelays = calls.slice(3, 6)
    expect(barDelays[0]).toBeLessThan(barDelays[1])
    expect(barDelays[1]).toBeLessThan(barDelays[2])
  })
})
