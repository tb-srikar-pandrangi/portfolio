# Srikar Pandrangi — Portfolio Website Design Spec
**Date:** 2026-04-12
**Status:** Approved by user

---

## Context

Srikar is an early-career growth marketer and builder targeting Series A–C startups (growth, brand, GTM roles). The portfolio needs to communicate his value prop in under 15 seconds, surface his best work fast, and make it frictionless for hiring managers to reach out. It is the primary hub for his LinkedIn-driven personal brand.

---

## Tech Stack

- **Framework:** React + Vite (static output)
- **Deployment:** GitHub Pages via GitHub Actions
- **Fonts:** [Satoshi](https://www.fontshare.com/fonts/satoshi) (via Fontshare CDN or self-hosted)
- **No SSR.** Fully static build (`vite build` → `dist/` → GitHub Pages)
- **No backend.** Contact uses a `mailto:` link. Resume is a downloadable PDF.

---

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F5F2ED` | Page background |
| `--text` | `#1A1A1A` | Primary text |
| `--accent` | `#C4622D` | CTAs, active states, tags |
| `--muted` | `#8A8580` | Secondary text, labels |
| `--surface` | `#EDEAE4` | Card backgrounds |
| `--border` | `#D8D4CE` | Dividers, card borders |

### Typography (Satoshi)
| Role | Weight | Size | Tracking |
|---|---|---|---|
| Display headline | 700 | 56px | -0.02em |
| Section headline | 700 | 32px | -0.02em |
| Card title | 700 | 18px | -0.01em |
| Body | 400 | 16px | 0 |
| Subheadline | 400 | 18px | 0 |
| Label/tag | 500 | 11px | 0.08em (uppercase) |

### Spacing
- Section padding: `120px` top/bottom (desktop), `64px` (mobile)
- Max content width: `1200px`, centered
- Card gap: `16px`
- Sidebar width: `220px` (fixed, desktop only)

### Motion
- Transitions: `200ms ease` for hover states
- Filter fade: `150ms opacity` on project card show/hide
- No scroll-triggered animations. No parallax. No entrance effects.

---

## Layout

### Global Shell (Desktop ≥ 768px)
```
[ Sidebar 220px fixed ] [ Main content area, scrollable ]
```

### Global Shell (Mobile < 768px)
```
[ Sticky top bar: name left · Work About Contact right ]
[ Main content area, scrollable ]
```

---

## Page Sections (in order)

### 1. Hero
**Viewport:** `100vh`
**Layout:** Single column, centered vertically in the main content area

**Elements (top to bottom):**
1. **Portrait** — 72px diameter circle, cropped to face, `1px` border in `--border`. Casual photo (class talk). No filter.
2. **Eyebrow** — `GROWTH · BRAND · AI AUTOMATION` — Satoshi 500, 11px, uppercase, `--muted`
3. **Headline** — `"I build GTM playbooks and AI agents for early-stage startups."` — Satoshi 700, 56px, `--text`
4. **Subheadline** — One sentence, Satoshi 400, 18px, `--muted`. e.g. `"Currently at Mesa School of Business. Previously: Untitled Creatives, D2C co-founder, GTM consulting."`
5. **Outcome badges** — 3 horizontal pill tags, background `--surface`, border `--border`, text `--text` 13px:
   - `5+ AI agents deployed`
   - `3 Series A GTM strategies`
   - `Revenue analytics in production`
6. **CTAs** — Two inline text links (not buttons): `View Work →` in `--accent`, `Download Resume` in `--muted`
7. **Scroll indicator** — Small downward arrow, `--muted`, bottom of section

**Mobile:** Portrait shrinks to 56px. Headline drops to 36px. Badges stack if needed.

---

### 2. Work / Projects (Bento Grid)
**Section label:** `WORK`
**Descriptor:** One line, e.g. `"GTM strategies, AI agents, and analytics tools — built for real problems."`

**Tag filter bar:**
- Pills: `All · Growth · Brand · AI/Automation · Analytics · GTM`
- Active pill: background `--accent`, text white
- Inactive: background `--surface`, text `--muted`
- Filter interaction: `150ms` opacity fade on cards

**Bento grid structure:**
- **Row 1:** 1 hero card — full width (or 2/3 + 1/3 split). Reserved for **Marketplace Performance Digest Agent**
- **Row 2+:** Mixed 3-column grid. Some cards span 2 columns, some 1. Layout is intentional, not random — give more space to richer projects

**Each card:**
- Background: `--surface`
- Border: `1px solid --border`
- Border-radius: `12px`
- Padding: `24px`
- Contents:
  - Category tag (uppercase, 11px, `--accent`)
  - Project title (Satoshi 700, 18px)
  - One-line outcome (Satoshi 400, 14px, `--muted`)
  - Preview image/screenshot placeholder (lazy-loaded, aspect ratio `16:9` or `4:3`)
  - Skills row: small gray pills (`--surface` darker, 11px)
  - `View →` link — hidden by default, appears on hover (`200ms`)
- Hover state: `box-shadow: 0 4px 24px rgba(0,0,0,0.07)`, slight `translateY(-2px)`

**Priority projects (must render):**
1. Marketplace Performance Digest Agent — hero card
2. AI Agents (n8n + OpenAI/Gemini)
3. Brand & GTM Strategy (Roma Global)
4. Revenue Analytics (FleetlyHQ)
5. Brand Voice / Positioning (NOTO Ice Creams)
6. WhatsApp Customer Service Agent (Rebel Foods)
7. AI Content Production Agent (Zelo)
8. ERPNext Case Study (SKV Homes)

---

### 3. About
**Section label:** `ABOUT`
**Layout:** Two-column desktop (55% left / 45% right), stacked mobile

**Left column:**
- Headline (~32px): `"Builder by instinct, strategist by training."` (placeholder — user will provide full copy)
- Body: ~150–180 words. Conversational, no hype. User will provide full text.
- Two inline links: `View Resume →` (`--accent`) and `Let's Talk →` (`--muted`)

**Right column:**
- Full photo — large rounded rectangle (`border-radius: 16px`), no filter, natural crop. Same candid talk photo as hero circle, uncropped.
- Below photo: 4 sparse stat lines, Satoshi 400, 13px, `--muted`:
  - `NIT Warangal · B.Tech Mechanical`
  - `CAT 99.3 percentile`
  - `Mesa PGP · Startup Leadership`
  - `Bengaluru · Open to roles`

**Mobile:** Photo full width, stacked above text.

---

### 4. Resume
**Section label:** `RESUME`
**Note:** User will provide updated resume PDF and content.

**Layout:** Two-column desktop, stacked mobile

**Left column — Experience:**
- Timeline-style list: company name (Satoshi 700, 15px) + title + year (Satoshi 400, 13px, `--muted`)
- No bullet descriptions in this section — just the overview
- Thin `1px --border` left border acting as the timeline line

**Right column — Education:**
- Same sparse treatment: institution, degree/program, year
- NIT Warangal, Mesa PGP, CAT score

**Below both columns:**
- `Download Full Resume (PDF) →` — Satoshi 700, `--accent`, prominent

---

### 5. Contact
**Section label:** `CONTACT`
**Layout:** Single column, left-aligned

**Elements:**
- Headline (~32px): `"Let's talk."`
- Subtext (Satoshi 400, 18px, `--muted`): `"Open to growth, brand, and GTM roles at Series A–C startups."`
- 4 text links (stacked or 2×2 grid):
  - `Email →` (JS-obfuscated mailto)
  - `LinkedIn →`
  - `GitHub →`
  - `Twitter/X →`
- All links: Satoshi 500, 16px, `--text` default → `--accent` on hover

**Footer (below contact):**
- `Srikar Pandrangi · 2026` — Satoshi 400, 12px, `--muted`, centered
- No copyright symbol, no extra links

---

## Sidebar (Desktop)

**Fixed left, full viewport height, `220px` wide**

Contents (top to bottom):
- Name: `Srikar Pandrangi` — Satoshi 700, 14px, `--text`, tight tracking
- Nav dots: 5 dots (one per section: Hero, Work, About, Resume, Contact)
  - Each dot: `8px` circle, `--border` default
  - Active: filled with `--accent`
  - On hover: section label appears to the right of the dot, Satoshi 400, 12px, `--muted`
- Bottom of sidebar: `Open to roles · Bengaluru` — Satoshi 400, 11px, `--muted`

Active section tracked via `IntersectionObserver`.

---

## Project Data Structure

Projects stored in `/src/data/projects.js` as a JSON array:

```js
{
  id: 'marketplace-digest',
  title: 'Marketplace Performance Digest Agent',
  tagline: 'Live n8n + AI dashboard built for The Niche application.',
  category: ['AI/Automation', 'Analytics'],
  what: '...',
  contribution: '...',
  outcome: '...',
  skills: ['n8n', 'OpenAI API', 'HTML', 'Analytics'],
  link: '...',
  image: '/assets/projects/marketplace-digest.png',
  featured: true,
  colSpan: 2  // bento layout hint
}
```

---

## File Structure

```
/
├── public/
│   ├── assets/
│   │   ├── photo-circle.jpg       # Cropped portrait for hero
│   │   ├── photo-full.jpg         # Full photo for about
│   │   └── projects/              # Project screenshots
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx             # Mobile nav
│   │   ├── Hero.jsx
│   │   ├── Work.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── About.jsx
│   │   ├── Resume.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── projects.js
│   ├── styles/
│   │   ├── tokens.css             # CSS custom properties (design tokens)
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## GitHub Pages Deployment

- `vite.config.js` sets `base` to the repo name (e.g., `/portfolio/`)
- GitHub Actions workflow: on push to `main`, run `npm run build`, deploy `dist/` to `gh-pages` branch
- Custom domain optional via `CNAME` file in `public/`

---

## Content Placeholders (to be filled by user)

- [ ] About section full copy (~150-180 words)
- [ ] Resume PDF + timeline content
- [ ] Project screenshots / previews for all 8 projects
- [ ] Live links for each project (GitHub, Notion, tool URL)
- [ ] Portrait photo (circle crop for hero, full for about)
- [ ] Social links (LinkedIn, GitHub, Twitter/X, email)
- [ ] Outcome badges — confirm the 3 stats are accurate
- [ ] Project outcomes — quantified where possible

---

## What This Is NOT

- No blog / writing section
- No Approach / How I Work section
- No testimonials
- No service offerings or pricing
- No animations beyond hover states and filter fades
- No dark mode
- No third-party embeds (social feeds, Calendly, etc.)
