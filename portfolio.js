// portfolio.js — ES module, auto-inits in browser only

export const SECTION_IDS = ['education', 'experience', 'skills', 'outside-work', 'featured-projects', 'ai-automations']

export function animateIn() {
  const hub = document.getElementById('hub')
  if (!hub) return
  // Adding 'loaded' triggers all CSS keyframe animations (revealUp, revealScale, revealFade)
  // Deferred one tick so initial opacity:0 renders before the animation class fires
  setTimeout(() => hub.classList.add('loaded'), 0)
}

export function openSection(id) {
  const hub = document.getElementById('hub')
  const target = document.getElementById(id)
  if (!hub || !target) return

  hub.classList.add('hub--hidden')
  hub.setAttribute('aria-hidden', 'true')

  SECTION_IDS.forEach(sid => {
    const s = document.getElementById(sid)
    if (s && sid !== id) { s.hidden = true; s.classList.remove('section--visible') }
  })

  target.removeAttribute('hidden')
  void target.offsetHeight // force reflow so transition fires
  target.classList.add('section--visible')

  document.querySelectorAll('[data-section]').forEach(bar => {
    bar.setAttribute('aria-expanded', bar.dataset.section === id ? 'true' : 'false')
  })
}

export function closeSection() {
  const hub = document.getElementById('hub')
  if (!hub) return

  SECTION_IDS.forEach(sid => {
    const s = document.getElementById(sid)
    if (!s) return
    s.classList.remove('section--visible')
    s.addEventListener('transitionend', () => { s.hidden = true }, { once: true })
  })

  hub.classList.remove('hub--hidden')
  hub.removeAttribute('aria-hidden')

  document.querySelectorAll('[data-section]').forEach(bar => {
    bar.setAttribute('aria-expanded', 'false')
  })
}

export function handleHash() {
  const hash = window.location.hash.slice(1)
  if (SECTION_IDS.includes(hash)) {
    openSection(hash)
  } else {
    closeSection()
  }
}

export function initListeners() {
  // Bar clicks → update hash
  document.querySelectorAll('[data-section]').forEach(bar => {
    bar.addEventListener('click', () => {
      window.location.hash = bar.dataset.section
    })
  })

  // Back buttons → clear hash and close
  document.querySelectorAll('.section-back').forEach(btn => {
    btn.addEventListener('click', () => {
      history.pushState('', document.title, window.location.pathname)
      closeSection()
    })
  })

  // Escape → close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      history.pushState('', document.title, window.location.pathname)
      closeSection()
    }
  })

  // Hash navigation
  window.addEventListener('hashchange', handleHash)
}

// ── Auto-init in browser only (not during test imports) ──────────
if (typeof window !== 'undefined' && typeof document !== 'undefined' && !window.__TESTING__) {
  document.addEventListener('DOMContentLoaded', () => {
    handleHash()
    initListeners()
    animateIn()
  })
}
