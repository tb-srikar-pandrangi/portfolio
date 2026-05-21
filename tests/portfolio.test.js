// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

let animateIn, openSection, closeSection, handleHash, SECTION_IDS

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
    <main class="hub" id="hub" aria-hidden="false">
      <div class="portrait-col"></div>
      <div class="content-col">
        <header class="name-row"></header>
        <div class="tagline"></div>
        <div class="bars">
          <button class="bar" data-section="ai-automation" aria-expanded="false"></button>
          <button class="bar" data-section="brand-marketing" aria-expanded="false"></button>
          <button class="bar" data-section="growth-gtm" aria-expanded="false"></button>
        </div>
        <a class="outside-link"></a>
      </div>
    </main>
    <section class="section" id="ai-automation" hidden></section>
    <section class="section" id="brand-marketing" hidden></section>
    <section class="section" id="growth-gtm" hidden></section>
    <section class="section" id="outside-work" hidden>
      <button class="section-back"></button>
    </section>
  `
  vi.useFakeTimers()
  const mod = await import('../portfolio.js?t=' + Date.now())
  animateIn    = mod.animateIn
  openSection  = mod.openSection
  closeSection = mod.closeSection
  handleHash   = mod.handleHash
  SECTION_IDS  = mod.SECTION_IDS
})

afterEach(() => {
  vi.useRealTimers()
  vi.resetModules()
})

describe('animateIn', () => {
  it('adds anim-ready to all animated elements', () => {
    animateIn()
    const ready = document.querySelectorAll('.anim-ready')
    expect(ready.length).toBeGreaterThanOrEqual(6)
  })

  it('adds anim-in after the stagger delay fires', () => {
    animateIn()
    expect(document.querySelectorAll('.anim-in').length).toBe(0)
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
    const barDelays = calls.slice(3, 6)
    expect(barDelays[0]).toBeLessThan(barDelays[1])
    expect(barDelays[1]).toBeLessThan(barDelays[2])
  })
})

describe('openSection', () => {
  it('removes hidden from the target section', () => {
    openSection('ai-automation')
    expect(document.getElementById('ai-automation').hidden).toBe(false)
  })

  it('adds section--visible to the target section', () => {
    openSection('brand-marketing')
    expect(document.getElementById('brand-marketing').classList.contains('section--visible')).toBe(true)
  })

  it('adds hub--hidden to the hub', () => {
    openSection('ai-automation')
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(true)
  })

  it('sets aria-expanded true on the matching bar only', () => {
    openSection('ai-automation')
    const bars = document.querySelectorAll('[data-section]')
    expect(bars[0].getAttribute('aria-expanded')).toBe('true')
    expect(bars[1].getAttribute('aria-expanded')).toBe('false')
    expect(bars[2].getAttribute('aria-expanded')).toBe('false')
  })

  it('does nothing for an unknown id', () => {
    openSection('does-not-exist')
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(false)
  })
})

describe('closeSection', () => {
  it('removes hub--hidden from the hub', () => {
    openSection('ai-automation')
    closeSection()
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(false)
  })

  it('removes section--visible from all sections', () => {
    openSection('ai-automation')
    closeSection()
    SECTION_IDS.forEach(id => {
      const s = document.getElementById(id)
      if (s) expect(s.classList.contains('section--visible')).toBe(false)
    })
  })

  it('resets all bars to aria-expanded false', () => {
    openSection('ai-automation')
    closeSection()
    document.querySelectorAll('[data-section]').forEach(bar => {
      expect(bar.getAttribute('aria-expanded')).toBe('false')
    })
  })
})

describe('handleHash', () => {
  it('opens the matching section when hash is a known id', () => {
    Object.defineProperty(window, 'location', {
      value: { hash: '#ai-automation' },
      configurable: true,
    })
    handleHash()
    expect(document.getElementById('ai-automation').classList.contains('section--visible')).toBe(true)
  })

  it('calls closeSection when hash is empty', () => {
    openSection('ai-automation')
    Object.defineProperty(window, 'location', {
      value: { hash: '' },
      configurable: true,
    })
    handleHash()
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(false)
  })
})
