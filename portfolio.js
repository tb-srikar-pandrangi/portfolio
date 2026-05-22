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

let _toastTimer = null
function showToast(message) {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = message
  el.classList.add('toast--visible')
  clearTimeout(_toastTimer)
  _toastTimer = setTimeout(() => el.classList.remove('toast--visible'), 2500)
}

export function initListeners() {
  // Card clicks → update hash
  document.querySelectorAll('[data-section]').forEach(bar => {
    bar.addEventListener('click', () => {
      window.location.hash = bar.dataset.section
    })
  })

  // Email copy to clipboard
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.copyEmail
      try {
        await navigator.clipboard.writeText(email)
      } catch {
        // Fallback for browsers without clipboard API
        const ta = document.createElement('textarea')
        ta.value = email
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      showToast('Email copied to clipboard')
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

// ── GSAP entrance animation ───────────────────────────────────────
function gsapAnimateIn() {
  const gsap = window.gsap
  if (!gsap) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Topbar: slide in from above
  tl.fromTo('.topbar',
    { opacity: 0, y: -18 },
    { opacity: 1, y: 0, duration: 0.6 },
    0
  )
  // Portrait: scale-in reveal
  .fromTo('.card--portrait',
    { opacity: 0, scale: 1.04 },
    { opacity: 1, scale: 1, duration: 0.9 },
    0.05
  )
  // Left column: stagger up
  .fromTo('.bento-col--left .card',
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.075 },
    0.08
  )
  // Center top small card
  .fromTo('.bento-col--center .card--sm',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.06
  )
  // Center bottom socials card
  .fromTo('.bento-col--center .card--socials',
    { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.11
  )
  // Right column: stagger up
  .fromTo('.bento-col--right .card',
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
    0.1
  )
}

// ── GSAP hover & click interactions ──────────────────────────────
function gsapInitInteractions() {
  const gsap = window.gsap
  if (!gsap) return

  // Interactive cards: lift + press feedback
  document.querySelectorAll('.card--interactive').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.025, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
    card.addEventListener('mousedown', () => {
      gsap.to(card, { scale: 0.97, duration: 0.1, ease: 'power2.in', overwrite: 'auto' })
    })
    card.addEventListener('mouseup', () => {
      gsap.to(card, { scale: 1.025, duration: 0.25, ease: 'back.out(1.5)', overwrite: 'auto' })
    })
  })

  // Social buttons: spring scale
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.12, duration: 0.2, ease: 'back.out(2)', overwrite: 'auto' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
    })
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, { scale: 0.9, duration: 0.08, ease: 'power2.in', overwrite: 'auto' })
    })
    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.12, duration: 0.25, ease: 'back.out(2)', overwrite: 'auto' })
    })
  })

  // Portrait: slow parallax zoom on hover
  const portraitImg = document.querySelector('.portrait')
  const portraitCard = document.querySelector('.card--portrait')
  if (portraitImg && portraitCard) {
    portraitCard.addEventListener('mouseenter', () => {
      gsap.to(portraitImg, { scale: 1.06, duration: 1.2, ease: 'power2.out' })
    })
    portraitCard.addEventListener('mouseleave', () => {
      gsap.to(portraitImg, { scale: 1, duration: 1.0, ease: 'power2.out' })
    })
  }

  // Topbar CTA: press spring
  const ctaBtn = document.querySelector('.topbar-cta')
  if (ctaBtn) {
    ctaBtn.addEventListener('mousedown', () => {
      gsap.to(ctaBtn, { scale: 0.96, duration: 0.08, ease: 'power2.in', overwrite: 'auto' })
    })
    ctaBtn.addEventListener('mouseup', () => {
      gsap.to(ctaBtn, { scale: 1, duration: 0.25, ease: 'back.out(2)', overwrite: 'auto' })
    })
    ctaBtn.addEventListener('mouseleave', () => {
      gsap.to(ctaBtn, { scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
    })
  }
}

// ── Auto-init in browser only (not during test imports) ──────────
if (typeof window !== 'undefined' && typeof document !== 'undefined' && !window.__TESTING__) {
  document.addEventListener('DOMContentLoaded', () => {
    handleHash()
    initListeners()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (window.gsap && !prefersReducedMotion) {
      gsapAnimateIn()
      gsapInitInteractions()
    } else {
      // CSS keyframe fallback (no GSAP, or user prefers reduced motion)
      animateIn()
    }
  })
}
