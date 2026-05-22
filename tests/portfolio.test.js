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
      <nav class="topbar"></nav>
      <div class="bento">
        <div class="bento-col bento-col--left">
          <button class="card card--interactive" data-section="education"         aria-expanded="false"></button>
          <button class="card card--interactive" data-section="experience"        aria-expanded="false"></button>
          <button class="card card--interactive" data-section="skills"            aria-expanded="false"></button>
        </div>
        <div class="bento-col bento-col--center">
          <button class="card card--interactive card--sm" data-section="outside-work" aria-expanded="false"></button>
          <div class="card card--portrait"></div>
          <div class="card card--socials"></div>
        </div>
        <div class="bento-col bento-col--right">
          <button class="card card--interactive card--lg" data-section="featured-projects" aria-expanded="false"></button>
          <button class="card card--interactive"          data-section="ai-automations"    aria-expanded="false"></button>
        </div>
      </div>
    </main>
    <section class="section" id="education"         hidden></section>
    <section class="section" id="experience"        hidden></section>
    <section class="section" id="skills"            hidden></section>
    <section class="section" id="outside-work"      hidden>
      <button class="section-back"></button>
    </section>
    <section class="section" id="featured-projects" hidden></section>
    <section class="section" id="ai-automations"    hidden></section>
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
  it('does not add loaded to hub before the timer fires', () => {
    animateIn()
    expect(document.getElementById('hub').classList.contains('loaded')).toBe(false)
  })

  it('adds loaded to hub after the timer fires', () => {
    animateIn()
    vi.runAllTimers()
    expect(document.getElementById('hub').classList.contains('loaded')).toBe(true)
  })

  it('does nothing when hub element is absent', () => {
    document.getElementById('hub').remove()
    expect(() => { animateIn(); vi.runAllTimers() }).not.toThrow()
  })
})

describe('openSection', () => {
  it('removes hidden from the target section', () => {
    openSection('education')
    expect(document.getElementById('education').hidden).toBe(false)
  })

  it('adds section--visible to the target section', () => {
    openSection('experience')
    expect(document.getElementById('experience').classList.contains('section--visible')).toBe(true)
  })

  it('adds hub--hidden to the hub', () => {
    openSection('education')
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(true)
  })

  it('sets aria-expanded true on the matching card only', () => {
    openSection('education')
    const cards = document.querySelectorAll('[data-section]')
    expect(cards[0].getAttribute('aria-expanded')).toBe('true')   // education
    expect(cards[1].getAttribute('aria-expanded')).toBe('false')  // experience
    expect(cards[2].getAttribute('aria-expanded')).toBe('false')  // skills
  })

  it('does nothing for an unknown id', () => {
    openSection('does-not-exist')
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(false)
  })
})

describe('closeSection', () => {
  it('removes hub--hidden from the hub', () => {
    openSection('education')
    closeSection()
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(false)
  })

  it('removes section--visible from all sections', () => {
    openSection('education')
    closeSection()
    SECTION_IDS.forEach(id => {
      const s = document.getElementById(id)
      if (s) expect(s.classList.contains('section--visible')).toBe(false)
    })
  })

  it('resets all cards to aria-expanded false', () => {
    openSection('education')
    closeSection()
    document.querySelectorAll('[data-section]').forEach(card => {
      expect(card.getAttribute('aria-expanded')).toBe('false')
    })
  })
})

describe('handleHash', () => {
  it('opens the matching section when hash is a known id', () => {
    Object.defineProperty(window, 'location', {
      value: { hash: '#education' },
      configurable: true,
    })
    handleHash()
    expect(document.getElementById('education').classList.contains('section--visible')).toBe(true)
  })

  it('calls closeSection when hash is empty', () => {
    openSection('education')
    Object.defineProperty(window, 'location', {
      value: { hash: '' },
      configurable: true,
    })
    handleHash()
    expect(document.getElementById('hub').classList.contains('hub--hidden')).toBe(false)
  })
})
