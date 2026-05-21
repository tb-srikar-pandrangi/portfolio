# Portfolio Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-screen hub portfolio as a plain HTML/CSS/JS site — portrait left, name + tagline + three clickable bars right — where each bar expands in-place into a section with hash routing.

**Architecture:** One `index.html` (HTML structure + `<style>` block) loads `portfolio.js` as an ES module. All text is in HTML source. JS handles load animation, bar→section transitions, and hash routing. CSS handles all visual states and transitions using only `transform` and `opacity`.

**Tech Stack:** Vanilla HTML5, CSS custom properties, ES module JavaScript, Vitest + jsdom for JS behaviour tests.

---

## File Map

| File | What it does |
|------|-------------|
| `index.html` | Full site: semantic HTML + `<style>` + `<script type="module" src="portfolio.js">` |
| `portfolio.js` | All JS: `openSection`, `closeSection`, `handleHash`, `animateIn`, `initListeners` — exported for testing, auto-inits in browser |
| `tests/portfolio.test.js` | Vitest tests for routing and section toggle logic |
| `public/Image.png` | Portrait placeholder (user replaces with WebP before deploy) |
| `public/resume.pdf` | Resume download (already exists) |

---

## Task 1: HTML skeleton

**Files:**
- Create: `index.html`

Write the semantic HTML structure with no styles and no JS. Placeholder `<div>` for portrait. All text content present in source.

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Srikar Pandrangi</title>
  <meta name="description" content="Designer turned growth operator. Marketing, AI, growth.">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link
    rel="stylesheet"
    href="https://api.fontshare.com/v2/css?f[]=boska@400,500&f[]=general-sans@400,500&display=swap"
  >
</head>
<body>

  <main class="hub" id="hub">

    <div class="portrait-col">
      <img
        src="public/Image.png"
        alt="Srikar Pandrangi"
        width="760"
        height="1080"
        class="portrait"
        fetchpriority="high"
      >
    </div>

    <div class="content-col">

      <header class="name-row">
        <h1 class="name">Srikar Pandrangi</h1>
        <nav class="util-links" aria-label="Utility links">
          <a href="/public/resume.pdf" class="util-link" download>Resume ↗</a>
          <a href="https://linkedin.com/in/srikar-pandrangi" class="util-link" target="_blank" rel="noopener">LinkedIn ↗</a>
        </nav>
      </header>

      <div class="tagline">
        <p class="tagline-display">Most people send a resume. I send the working thing.</p>
        <p class="tagline-body">Designer turned growth operator. Marketing, AI, growth.</p>
      </div>

      <div class="bars" role="list">
        <button
          class="bar"
          data-section="ai-automation"
          role="listitem"
          aria-expanded="false"
          aria-controls="ai-automation"
        >
          <span class="bar-index" aria-hidden="true">01</span>
          <span class="bar-label">AI &amp; Automation</span>
          <span class="bar-desc">Working agents, dashboards, and systems I've built and deployed.</span>
        </button>

        <button
          class="bar"
          data-section="brand-marketing"
          role="listitem"
          aria-expanded="false"
          aria-controls="brand-marketing"
        >
          <span class="bar-index" aria-hidden="true">02</span>
          <span class="bar-label">Brand &amp; Marketing</span>
          <span class="bar-desc">Campaigns, creative direction, content, and positioning.</span>
        </button>

        <button
          class="bar"
          data-section="growth-gtm"
          role="listitem"
          aria-expanded="false"
          aria-controls="growth-gtm"
        >
          <span class="bar-index" aria-hidden="true">03</span>
          <span class="bar-label">Growth &amp; GTM</span>
          <span class="bar-desc">Go-to-market strategy, funnels, retention, and growth systems.</span>
        </button>
      </div>

      <a href="#outside-work" class="outside-link">outside work ↗</a>

    </div>
  </main>

  <!-- Sections: content in HTML source, shown/hidden via JS class toggling -->
  <section class="section" id="ai-automation" hidden aria-label="AI and Automation">
    <button class="section-back" aria-label="Back to home">← Back</button>
    <h2 class="section-header">AI &amp; Automation</h2>
    <p class="section-placeholder">Content coming soon.</p>
  </section>

  <section class="section" id="brand-marketing" hidden aria-label="Brand and Marketing">
    <button class="section-back" aria-label="Back to home">← Back</button>
    <h2 class="section-header">Brand &amp; Marketing</h2>
    <p class="section-placeholder">Content coming soon.</p>
  </section>

  <section class="section" id="growth-gtm" hidden aria-label="Growth and GTM">
    <button class="section-back" aria-label="Back to home">← Back</button>
    <h2 class="section-header">Growth &amp; GTM</h2>
    <p class="section-placeholder">Content coming soon.</p>
  </section>

  <section class="section" id="outside-work" hidden aria-label="Outside work">
    <button class="section-back" aria-label="Back to home">← Back</button>
    <h2 class="section-header">Outside Work</h2>
    <p class="section-placeholder">Content coming soon.</p>
  </section>

  <script type="module" src="portfolio.js"></script>

</body>
</html>
```

- [ ] **Step 2: Open in browser, verify structure**

Open `index.html` directly in a browser (no server needed yet). Confirm:
- Unstyled text renders correctly: name, tagline, three bars, four sections (hidden by default)
- Page title shows "Srikar Pandrangi" in the tab
- Portrait image loads (may be stretched/unstyled — OK at this stage)
- No console errors

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add html skeleton — all text content in source"
```

---

## Task 2: CSS — tokens, reset, layout, hub

**Files:**
- Modify: `index.html` — add `<style>` block inside `<head>`

Add CSS custom properties, reset, the asymmetric hub grid, portrait column, and content column layout. No colour on individual components yet — just the structural skeleton.

- [ ] **Step 1: Add `<style>` block to `<head>` in `index.html`**

Paste this inside `<head>`, after the Fontshare `<link>`:

```html
<style>
/* ─── Tokens ─────────────────────────────────────────────────── */
:root {
  --bg:        #F4F0E8;
  --ink:       #1C1A17;
  --mid:       #6B6660;
  --accent:    #B8502D;
  --border:    rgba(28, 26, 23, 0.12);

  --font-display: 'Boska', Georgia, serif;
  --font-body:    'General Sans', system-ui, -apple-system, sans-serif;

  --ease:      cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast:  150ms;
  --dur-mid:   250ms;
  --dur-slow:  400ms;
}

/* ─── Reset ──────────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden; /* no scroll on desktop — intentional */
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* ─── Hub grid ───────────────────────────────────────────────── */
.hub {
  display: grid;
  grid-template-columns: 39fr 61fr;
  height: 100vh;
  width: 100%;
}

/* ─── Portrait column ────────────────────────────────────────── */
.portrait-col {
  position: relative;
  overflow: hidden;
  background: var(--mid); /* fallback while image loads */
}

.portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* ─── Content column ──────────────────────────────────────────── */
.content-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.75rem;
  padding: 4rem 4.5rem;
  overflow-y: auto;
}

/* ─── Sections (hidden by default, shown by JS) ───────────────── */
.section {
  position: fixed;
  inset: 0;
  background: var(--bg);
  padding: 4rem 4.5rem;
  overflow-y: auto;
  /* initial off state for transition — set before display */
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity   var(--dur-slow) var(--ease),
    transform var(--dur-slow) var(--ease);
  pointer-events: none;
}

/* [hidden] overrides display:block that .section--visible would set */
.section[hidden] {
  display: none !important;
}

.section--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Hub hidden state */
.hub--hidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-slow) var(--ease);
}

/* ─── prefers-reduced-motion ──────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hub--hidden,
  .section {
    transition: opacity var(--dur-mid) var(--ease);
    transform: none !important;
  }
}
</style>
```

- [ ] **Step 2: Verify layout in browser**

Reload `index.html`. Confirm:
- Page fills viewport with two columns (portrait left ~39%, content right)
- Portrait image fills its column top-to-bottom
- Background is warm oat `#F4F0E8`
- No scrollbar on desktop at 1440px
- Content column has visible padding

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add css tokens, reset, hub grid layout"
```

---

## Task 3: CSS — typography, name row, tagline, bars, outside link

**Files:**
- Modify: `index.html` — extend `<style>` block

Style all content-column components. This task completes the visual hub (minus animation and interaction states).

- [ ] **Step 1: Append to the `<style>` block**

Add after the existing rules:

```css
/* ─── Name row ───────────────────────────────────────────────── */
.name-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3.25rem);
  font-weight: 500;
  color: var(--ink);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.util-links {
  display: flex;
  gap: 1.25rem;
  list-style: none;
}

.util-link {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--mid);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: color var(--dur-fast) var(--ease);
}

.util-link:hover { color: var(--ink); }

.util-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ─── Tagline ─────────────────────────────────────────────────── */
.tagline {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.tagline-display {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2vw, 1.875rem); /* min 24px always */
  font-weight: 400;
  color: var(--ink);
  line-height: 1.25;
}

.tagline-body {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--mid);
  line-height: 1.5;
}

/* ─── Bars ────────────────────────────────────────────────────── */
.bars {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.bar {
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  align-items: start;

  padding: 1.25rem 0.75rem 1.25rem 0;
  border: none;
  border-bottom: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;

  transition:
    background  var(--dur-fast) var(--ease),
    transform   var(--dur-fast) var(--ease);
}

.bar-index {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.05em;
  grid-row: 1;
  grid-column: 1;
  padding-top: 0.35rem;
  align-self: start;
}

.bar-label {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2vw, 1.875rem); /* min 24px */
  font-weight: 400;
  color: var(--ink);
  line-height: 1.2;
  grid-row: 1;
  grid-column: 2;
}

.bar-desc {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--mid);
  line-height: 1.5;
  grid-row: 2;
  grid-column: 2;
  margin-top: 0.25rem;
}

/* ─── Bar hover / focus / active ─────────────────────────────── */
.bar:hover {
  background: rgba(184, 80, 45, 0.05);
  transform: translateX(3px);
}

.bar:hover .bar-index {
  color: var(--accent);
}

.bar:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
  border-radius: 2px;
}

.bar:active {
  background: rgba(184, 80, 45, 0.1);
  transform: translateX(1px);
}

.bar[aria-expanded="true"] {
  background: rgba(184, 80, 45, 0.07);
}

/* ─── Outside link ────────────────────────────────────────────── */
.outside-link {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--mid);
  text-decoration: none;
  letter-spacing: 0.01em;
  align-self: flex-start;
  transition: color var(--dur-fast) var(--ease);
}

.outside-link:hover { color: var(--ink); }

.outside-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ─── Section layout ──────────────────────────────────────────── */
.section-back {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--mid);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 3rem;
  display: inline-block;
  transition: color var(--dur-fast) var(--ease);
}

.section-back:hover { color: var(--ink); }

.section-back:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

.section-header {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 500;
  color: var(--ink);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

.section-placeholder {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--mid);
}
```

- [ ] **Step 2: Verify visuals at multiple viewports**

Open `index.html`. Check all of the following:

| Check | Pass condition |
|-------|----------------|
| Boska font loaded | Name, tagline line 1, bar labels render in serif |
| Boska minimum size | No Boska text appears below 24px |
| Name size | Large, prominent, not competing with bars |
| Tagline line 2 | Visibly quieter than line 1 (General Sans, `--mid` colour) |
| Resume + LinkedIn | Small, mid-grey, not drawing eye away from bars |
| Index numbers | Burnt sienna `#B8502D` |
| Bar separators | Subtle — `rgba(28,26,23,0.12)` |
| Hover on bar | Slight rightward shift + faint sienna background |
| Focus ring | Tab to a bar — 2px sienna ring visible |
| Outside link | Quiet, below bars |

- [ ] **Step 3: Check at 1024px and 375px viewports**

Use browser DevTools to resize. At 375px (mobile):
- Content should still be readable (may overflow — OK, mobile responsive is Task 7)
- No JS errors

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add content column styles — typography, bars, hover states"
```

---

## Task 4: Load animation

**Files:**
- Create: `portfolio.js`
- Create: `tests/portfolio.test.js`

TDD: write the test first, make it fail, then implement `animateIn`.

- [ ] **Step 1: Create `tests/portfolio.test.js`**

```js
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

// We import animateIn — it should not auto-run on import
// portfolio.js guards auto-init with a window check
let animateIn

beforeEach(async () => {
  // Reset DOM before each test
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
  // Re-import fresh module each test
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
    // Spy on setTimeout to capture delays
    const calls = []
    vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn, delay) => {
      calls.push(delay)
      fn() // call immediately for simplicity
      return 0
    })
    animateIn()
    // Portrait, name-row, tagline, bar1, bar2, bar3 — delays should be ascending
    const barDelays = calls.slice(3, 6)
    expect(barDelays[0]).toBeLessThan(barDelays[1])
    expect(barDelays[1]).toBeLessThan(barDelays[2])
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm run test:run -- tests/portfolio.test.js
```

Expected: `FAIL` — `Cannot find module '../portfolio.js'`

- [ ] **Step 3: Create `portfolio.js`**

```js
// portfolio.js — ES module, auto-inits in browser only

export const SECTION_IDS = ['ai-automation', 'brand-marketing', 'growth-gtm', 'outside-work']

const STAGGER = [0, 100, 200, 300, 360, 420, 480]

export function animateIn() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const elements = [
    document.querySelector('.portrait-col'),
    document.querySelector('.name-row'),
    document.querySelector('.tagline'),
    ...document.querySelectorAll('.bar'),
    document.querySelector('.outside-link'),
  ].filter(Boolean)

  elements.forEach((el, i) => {
    el.classList.add('anim-ready')
    const delay = prefersReduced ? 0 : (STAGGER[i] ?? i * 60)
    setTimeout(() => el.classList.add('anim-in'), delay)
  })
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
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npm run test:run -- tests/portfolio.test.js
```

Expected: `PASS` — all 3 animateIn tests green.

- [ ] **Step 5: Add animation CSS to `index.html` `<style>` block**

Add after the existing `@media (prefers-reduced-motion: reduce)` block:

```css
/* ─── Load animation ──────────────────────────────────────────── */
.anim-ready {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity   var(--dur-mid) var(--ease),
    transform var(--dur-mid) var(--ease);
}

.anim-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .anim-ready {
    transform: none;
    transition: opacity var(--dur-mid) var(--ease);
  }
}
```

- [ ] **Step 6: Verify animation in browser**

Reload `index.html`. Confirm:
- Elements arrive in sequence: portrait → name → tagline → bar 01 → bar 02 → bar 03
- Motion is upward drift + fade, not a bounce
- Toggle `prefers-reduced-motion: reduce` in DevTools (Rendering panel) and confirm motion is replaced by a simple fade with no stagger

- [ ] **Step 7: Commit**

```bash
git add portfolio.js tests/portfolio.test.js index.html
git commit -m "feat: load animation with staggered fade-up, TDD green"
```

---

## Task 5: Routing and section toggle

**Files:**
- Modify: `tests/portfolio.test.js` — add routing tests
- `portfolio.js` — already implemented, tests verify it

TDD: write tests for `openSection`, `closeSection`, `handleHash`, then verify they pass against the existing implementation.

- [ ] **Step 1: Replace `tests/portfolio.test.js` entirely with the following**

This is the complete file — it replaces what was written in Task 4. The `beforeEach` DOM now includes the section elements needed for routing tests, and all functions are destructured from the module import.

```js
// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

let animateIn, openSection, closeSection, handleHash, SECTION_IDS

beforeEach(async () => {
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
```

- [ ] **Step 2: Append the describe blocks below to the same file (after the `afterEach`)**

- [ ] **Step 3: Run tests — all must pass**

```bash
npm run test:run -- tests/portfolio.test.js
```

Expected: All tests green. If any fail, fix `portfolio.js` until they pass. Do not modify tests to make them pass.

- [ ] **Step 4: Verify hash routing in browser**

Open `index.html` in a browser served over a local server (required for ES module imports):

```bash
npx serve . -p 3000
```

Then open `http://localhost:3000`.

Manual checks:
- [ ] Click "AI & Automation" bar → hub fades out, section fades in, URL becomes `#ai-automation`
- [ ] Click "← Back" → URL clears, hub fades back in
- [ ] Press Escape while a section is open → closes the section
- [ ] Navigate directly to `http://localhost:3000/#brand-marketing` → correct section opens on load
- [ ] Browser back button after opening a section → returns to hub

- [ ] **Step 5: Commit**

```bash
git add portfolio.js tests/portfolio.test.js
git commit -m "feat: hash routing and section toggle, all tests green"
```

---

## Task 6: Mobile responsive layout

**Files:**
- Modify: `index.html` — add responsive CSS to `<style>` block

The desktop hub is two columns. On mobile: portrait becomes a top banner, content stacks below, small scroll is allowed.

- [ ] **Step 1: Append responsive CSS to the `<style>` block**

```css
/* ─── Mobile (≤ 767px) ────────────────────────────────────────── */
@media (max-width: 767px) {
  html, body {
    overflow: auto; /* allow scroll on mobile */
    height: auto;
  }

  .hub {
    grid-template-columns: 1fr;
    grid-template-rows: 45vw auto;
    height: auto;
    min-height: 100vh;
  }

  .portrait-col {
    width: 100%;
    height: 45vw;
  }

  .portrait {
    object-position: center 20%; /* show face not torso */
  }

  .content-col {
    padding: 2.5rem 1.75rem;
    gap: 2rem;
    justify-content: flex-start;
  }

  .name {
    font-size: clamp(2rem, 8vw, 2.75rem);
  }

  .tagline-display {
    font-size: 1.5rem; /* 24px — Boska minimum */
  }

  .bar {
    padding: 1rem 0.5rem 1rem 0;
  }

  .bar-label {
    font-size: 1.5rem; /* 24px — Boska minimum */
  }

  .bar:hover {
    transform: none; /* no horizontal shift on touch */
  }

  .section {
    position: static;
    padding: 2.5rem 1.75rem;
  }

  /* Section needs to overlay on mobile too */
  .section--visible {
    position: fixed;
    inset: 0;
    overflow-y: auto;
  }
}

/* ─── Mid-range tablet (768px – 1023px) ──────────────────────── */
@media (min-width: 768px) and (max-width: 1023px) {
  .hub {
    grid-template-columns: 36fr 64fr;
  }

  .content-col {
    padding: 3rem 3rem;
    gap: 2.25rem;
  }
}
```

- [ ] **Step 2: Verify at 375px, 768px, 1024px, 1440px**

Use DevTools device emulation. For each viewport:

| Viewport | Check |
|----------|-------|
| 375px | Portrait is a top banner. Content below. Page scrolls naturally. |
| 375px | No Boska text below 24px. |
| 375px | Bars are full-width and tappable (min 44px tall). |
| 768px | Two-column layout. Narrower portrait. No horizontal overflow. |
| 1024px | Desktop layout. No scroll. |
| 1440px | Desktop layout. Content column not uncomfortably wide. |

- [ ] **Step 3: Test bar click on mobile viewport**

Emulate mobile, click a bar, confirm section opens and back button works.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: mobile responsive layout — portrait banner, full-width bars"
```

---

## Task 7: Final verification pass

**Files:** None modified — this is a read-only checklist.

Run the full test suite and manually verify every "Done when" condition from the spec.

- [ ] **Step 1: Run all tests**

```bash
npm run test:run
```

Expected: All existing tests plus portfolio tests pass. Zero failures.

- [ ] **Step 2: Spec Step 1 checklist**

| Condition | Check method |
|-----------|-------------|
| Hub renders at 1440/1024/768/375px | DevTools resize |
| Boska never below 24px | Inspect every Boska element in DevTools |
| Load animation plays | Reload page, watch stagger |
| Load animation respects `prefers-reduced-motion` | DevTools → Rendering → Enable `prefers-reduced-motion` |
| No layout shift | DevTools Performance → record page load, check CLS = 0 |
| Colour tokens match spec | Inspect computed styles |
| Accent only on index numbers at rest | Visual check |
| Fonts fall back without CLS | Block `api.fontshare.com` in DevTools Network, reload |

- [ ] **Step 3: Spec Step 2 checklist**

| Condition | Check method |
|-----------|-------------|
| Hover changes within 150ms | Visual — feels immediate |
| No bounce | Visual — linear ease, no spring |
| Focus ring on Tab | Tab through all buttons |
| No focus ring on mouse click | Click a bar, check no ring |
| Active state distinct | Click and hold a bar |

- [ ] **Step 4: Spec Step 3 checklist**

| Condition | Check method |
|-----------|-------------|
| Expand ~400ms, no overshoot | Visual — slow-motion in DevTools |
| Back returns to hub | Click back button |
| Hub re-entrance does not replay load animation | Open section, close — no stagger replays |
| Browser back/forward works | Use browser nav buttons |
| Direct hash URL opens correct section | Navigate to `/#brand-marketing` directly |
| Escape closes section | Open section, press Escape |
| Section placeholder content visible | Confirm "Content coming soon." renders |

- [ ] **Step 5: Accessibility check**

- Tab through entire page: name → resume → linkedin → bar01 → bar02 → bar03 → outside-link → (in section) back → (back to hub)
- All focus rings visible and use accent colour
- Open browser accessibility tree (DevTools → Accessibility) and verify: `<main>`, three `<button>` with `aria-expanded`, four `<section>` with `aria-label`
- Verify contrast: `var(--mid)` on `var(--bg)` meets AA (use DevTools colour picker — `#6B6660` on `#F4F0E8` = 4.7:1 ✓)

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: all spec verification checks pass"
```

---

## Out of scope (do not implement)

- Section content beyond placeholder HTML (Task 4 of spec — future plan)
- Analytics, contact form, dark mode, CMS
- Any animation beyond what is specified
- Service worker or offline support
- Deleting existing Next.js files (leave them — user decides what to remove)

---

## Notes for the implementer

**Serving locally:** ES modules require a server — `file://` won't work. Use `npx serve . -p 3000`.

**Portrait image:** `public/Image.png` is the placeholder. Replace with a WebP/AVIF version before going live. The `<img>` has `width="760" height="1080"` — update these if the real image has different dimensions.

**LinkedIn URL:** The plan uses a placeholder URL. Replace `https://linkedin.com/in/srikar-pandrangi` with the real URL in `index.html`.

**Resume path:** `href="/public/resume.pdf"` — verify this resolves correctly on the deploy target. On GitHub Pages from root, it should be `/resume.pdf` if the PDF is moved to root-level public.
