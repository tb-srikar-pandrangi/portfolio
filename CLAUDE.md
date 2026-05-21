# Portfolio Site — Srikar Pandrangi

## What this is
A single-screen hub portfolio targeting startup founders and operators in India.
One viewport: portrait, name, tagline, three clickable bars that expand into
sections in-place. No page loads. No framework. No build step.

---

## Assumptions (explicit — challenge these before coding)
- Portrait image will be supplied as WebP/AVIF, already cropped and sized.
  If not available, use a placeholder `<div>` that reserves exact dimensions.
- "Single file" means one `index.html`. CSS and JS live in `<style>` and
  `<script>` blocks inside it, not in separate files.
- "Hosted on GitHub Pages or Vercel" — build order does not depend on
  deployment target. Deployment is out of scope until all four build steps pass.
- Section content (projects, writing, etc.) is out of scope for the initial
  build. Placeholder HTML structure is in scope.
- No analytics, no contact form, no CMS — not asked for, not built.

---

## Tradeoffs (decided — do not re-open without a reason)
- **Single file vs. separate assets:** Single file chosen for zero-dependency
  deploy. Downside: file grows large as sections fill in. Acceptable given scope.
- **Hash routing vs. no routing:** Hash routing chosen so each section is
  directly linkable. Downside: adds a small JS listener. Acceptable.
- **CSS transitions vs. JS animation:** CSS transitions chosen (transform +
  opacity only) for 60fps without a library. Downside: complex sequencing
  requires JS class toggling. Acceptable.
- **Fontshare CDN vs. self-hosted:** Fontshare chosen per spec. Downside:
  external dependency. Mitigation: preconnect + font-display: swap + fallback.

---

## Tech constraints
- Plain HTML, CSS, JS. Single `index.html`. No framework, no build step.
- All text content in HTML source — not JS-injected. Required for crawlability
  and first-paint speed.
- Animate only `transform` and `opacity`. Never `width`, `height`, `top`, `left`.
- Three motion durations: `150ms`, `250ms`, `400ms`. One easing: `cubic-bezier(0.4, 0, 0.2, 1)`.
- `prefers-reduced-motion`: replace all motion with simple crossfades.

---

## Colour tokens
```
--bg:        #F4F0E8   /* warm oat — base surface */
--ink:       #1C1A17   /* warm near-black — primary text */
--mid:       #6B6660   /* mid warm-grey — secondary text */
--accent:    #B8502D   /* burnt sienna — index nums, hover, focus (~5% surface) */
```

---

## Typography rules
- **Boska** (from Fontshare): name, tagline line 1, bar labels, section headers.
  **Never below 24px.** No exceptions.
- **General Sans** (from Fontshare): everything else.
- Font loading: preconnect to `api.fontshare.com`. `font-display: swap`.
  Fallback stack: `Georgia, serif` for Boska; `system-ui, sans-serif` for General Sans.

---

## Layout
```
[Portrait — 38–40% vw, full height] | [Content column]
                                     |   Name
                                     |   Resume ↗  LinkedIn ↗   ← quiet, small
                                     |
                                     |   Tagline line 1 (Boska)
                                     |   Tagline line 2 (General Sans, muted)
                                     |
                                     |   [Bar 01 — AI & Automation]
                                     |   [Bar 02 — Brand & Marketing]
                                     |   [Bar 03 — Growth & GTM]
                                     |
                                     |   outside work ↗           ← quiet link
```
Mobile: portrait collapses to a top banner or is de-emphasised. Bars stack
full-width. Small amount of scroll on mobile is acceptable.

---

## Bar content
Each bar: index number (accent) + Boska label + General Sans descriptor.
No project counts.

| # | Label | Descriptor |
|---|-------|------------|
| 01 | AI & Automation | Working agents, dashboards, and systems I've built and deployed. |
| 02 | Brand & Marketing | Campaigns, creative direction, content, and positioning. |
| 03 | Growth & GTM | Go-to-market strategy, funnels, retention, and growth systems. |

Hash targets: `#ai-automation`, `#brand-marketing`, `#growth-gtm`.

---

## Interaction spec
- Click bar → hub transitions out, section transitions in (~400ms ease-out).
  URL hash updates. Browser back returns to hub.
- Section placeholder HTML must exist in source. JS shows/hides via class toggle.
  Do not generate section HTML from JS.
- Keyboard: bars are `<button>` elements. Focus-visible ring uses `--accent`.
  Escape key closes open section and returns to hub.

---

## Load animation
Staggered on DOMContentLoaded:
1. Portrait fades + drifts up (0ms delay)
2. Name (100ms delay)
3. Tagline (200ms delay)
4. Bar 01 (300ms), Bar 02 (360ms), Bar 03 (420ms)

Each: `opacity 0→1` + `translateY(8px)→0`, duration `250ms`.
Under `prefers-reduced-motion`: opacity only, no translate, no stagger.

---

## Accessibility
- WCAG AA contrast minimum on all text/background combinations.
- Semantic HTML: `<main>`, `<nav>` if needed, `<section>`, `<button>`, `<img alt>`.
- All interactive elements: `:hover`, `:focus-visible`, `:active` states defined.
- Focus-visible ring: `2px solid var(--accent)`, `2px offset`.

---

## Build order — do not skip steps

### Step 1 — Hub layout, type, colour, load animation
**Build:** Static hub. Portrait placeholder. Name, tagline, three bars (non-interactive).
Load animation. No section content yet.

**Done when:**
- [ ] Hub renders correctly at 1440px, 1024px, 768px, 375px viewports.
- [ ] Boska never appears below 24px.
- [ ] Load animation plays and respects `prefers-reduced-motion`.
- [ ] No layout shift (check with DevTools Performance panel).
- [ ] Colour tokens match spec. Accent appears only on index numbers at rest.
- [ ] Fallback fonts render without CLS when Fontshare is blocked.

### Step 2 — Hover and click states on bars
**Build:** Hover lift/accent-edge on bars. Focus-visible ring. Active state.

**Done when:**
- [ ] Hover state changes within 150ms. No bounce, no jank.
- [ ] Focus-visible ring appears on keyboard Tab. Not visible on mouse click.
- [ ] Active (pressed) state is visually distinct.
- [ ] States work across all three bars independently.

### Step 3 — Bar-to-section expand transition + hash routing
**Build:** Click opens section, hub hides. Hash updates. Back button returns to hub.
Direct URL load of `#ai-automation` (etc.) opens correct section immediately.

**Done when:**
- [ ] Expand transition completes in ~400ms. No overshoot.
- [ ] Close returns to hub. Hub re-entrance animation does not replay.
- [ ] Browser back/forward navigates correctly.
- [ ] Direct hash URL loads correct section on first paint.
- [ ] Escape key closes section.
- [ ] Section placeholder content is visible (not blank white).

### Step 4 — Section content (one section at a time)
**Build:** Real content per section, added incrementally.
Spec for each section to be written when Step 3 is complete.

**Done when:** Defined per section at time of build.

---

## What is explicitly out of scope
- Analytics
- Contact form
- CMS or data fetching
- Dark mode
- Animations beyond what is specified
- Any section content beyond placeholder HTML (until Step 4)
