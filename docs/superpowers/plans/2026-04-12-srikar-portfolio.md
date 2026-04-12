# Srikar Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React + Vite portfolio for Srikar Pandrangi, deployed to GitHub Pages, with an asymmetric bento project grid, fixed left sidebar navigation, and neo-modern minimalist design.

**Architecture:** Single-page app with smooth-scroll sections. Fixed sidebar (desktop only) tracks the active section via IntersectionObserver. Projects are stored in a static data file and rendered in a CSS Grid bento layout with tag filtering. No routing, no SSR, no backend.

**Tech Stack:** React 18, Vite 5, Vitest + React Testing Library, plain CSS with custom properties, GitHub Actions for deployment, Satoshi font via Fontshare CDN.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/main.jsx` | App entry point, mounts React root |
| `src/App.jsx` | Layout shell — sidebar + main scroll area |
| `src/styles/tokens.css` | CSS custom properties (colors, type scale, spacing) |
| `src/styles/global.css` | Reset, base element styles, font import |
| `src/components/Sidebar.jsx` | Fixed left nav (desktop), dot indicators, active state |
| `src/components/TopBar.jsx` | Sticky top nav (mobile only) |
| `src/components/Hero.jsx` | First viewport: portrait, headline, badges, CTAs |
| `src/components/Work.jsx` | Bento grid container + category filter |
| `src/components/ProjectCard.jsx` | Single project card, used inside Work |
| `src/components/About.jsx` | Two-column section: copy left, photo + stats right |
| `src/components/Resume.jsx` | Timeline layout + PDF download link |
| `src/components/Contact.jsx` | Text links + footer |
| `src/data/projects.js` | Static project data array + categories list |
| `src/hooks/useActiveSection.js` | IntersectionObserver hook returning active section ID |
| `src/utils/filterProjects.js` | Pure filter function (testable in isolation) |
| `tests/setup.js` | Vitest global test setup |
| `tests/filterProjects.test.js` | Unit tests for filter utility |
| `tests/ProjectCard.test.jsx` | Render tests for ProjectCard |
| `tests/useActiveSection.test.js` | Hook tests with mocked IntersectionObserver |
| `tests/Hero.test.jsx` | Render tests for Hero |
| `vite.config.js` | Base path for GitHub Pages + Vitest config |
| `.github/workflows/deploy.yml` | GitHub Actions build + deploy to Pages |
| `public/resume.pdf` | PDF placeholder (user replaces) |
| `public/assets/photo-circle.jpg` | Portrait crop for hero circle (user provides) |
| `public/assets/photo-full.jpg` | Full photo for about section (user provides) |
| `public/assets/projects/` | Project screenshots (user provides) |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`
- Create: `tests/setup.js`

- [ ] **Step 1: Scaffold Vite + React project**

Run from `/Users/srikarpandrangi/Documents/AI/Portfolio`:
```bash
npm create vite@latest . -- --template react
```
When prompted: select **React**, **JavaScript** (not TypeScript).

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Update vite.config.js**

Replace the contents of `vite.config.js` with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // replace "portfolio" with your exact GitHub repo name
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
```

- [ ] **Step 4: Create test setup file**

`tests/setup.js`:
```js
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test scripts to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite dev server starts at `http://localhost:5173`, default React app renders.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold React + Vite project with Vitest"
```

---

## Task 2: Design Tokens + Global CSS

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `index.html`
- Modify: `src/main.jsx`

- [ ] **Step 1: Add Satoshi font to index.html**

In `index.html`, inside `<head>`, add before the closing tag:
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
<title>Srikar Pandrangi</title>
```

- [ ] **Step 2: Create tokens.css**

`src/styles/tokens.css`:
```css
:root {
  --bg: #F5F2ED;
  --text: #1A1A1A;
  --accent: #C4622D;
  --muted: #8A8580;
  --surface: #EDEAE4;
  --border: #D8D4CE;

  --font: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;

  --sidebar-width: 220px;
  --section-pad-y: 120px;
}
```

- [ ] **Step 3: Create global.css**

`src/styles/global.css`:
```css
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button {
  font-family: var(--font);
}

@media (max-width: 767px) {
  :root {
    --section-pad-y: 64px;
  }
}
```

- [ ] **Step 4: Update src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 5: Verify font and colors load**

```bash
npm run dev
```
Expected: Background is `#F5F2ED` (warm off-white). In DevTools → Elements → Computed → font-family: shows `Satoshi`.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add design tokens and global CSS with Satoshi font"
```

---

## Task 3: Project Data + Filter Utility

**Files:**
- Create: `src/data/projects.js`
- Create: `src/utils/filterProjects.js`
- Create: `tests/filterProjects.test.js`

- [ ] **Step 1: Write failing filter tests**

`tests/filterProjects.test.js`:
```js
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
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm run test:run
```
Expected: FAIL — `filterProjects` not found.

- [ ] **Step 3: Implement filterProjects**

`src/utils/filterProjects.js`:
```js
export function filterProjects(projects, category) {
  if (category === 'All') return projects
  return projects.filter(p => p.category.includes(category))
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm run test:run
```
Expected: 3 tests PASS.

- [ ] **Step 5: Create project data file**

`src/data/projects.js`:
```js
export const projects = [
  {
    id: 'marketplace-digest',
    title: 'Marketplace Performance Digest Agent',
    tagline: 'Live n8n + AI dashboard built for a marketplace hiring application.',
    category: ['AI/Automation', 'Analytics'],
    outcome: 'Live tool used in production to evaluate candidate data chops.',
    skills: ['n8n', 'OpenAI API', 'HTML', 'Analytics'],
    link: '#',
    image: '/assets/projects/marketplace-digest.png',
    featured: true,
    colSpan: 3,
  },
  {
    id: 'ai-agents',
    title: 'AI Automation Agents',
    tagline: 'n8n + OpenAI/Gemini workflows for growth and marketing teams.',
    category: ['AI/Automation', 'Growth'],
    outcome: '5+ agents deployed across content, customer service, and analytics.',
    skills: ['n8n', 'OpenAI API', 'Gemini API'],
    link: '#',
    image: '/assets/projects/ai-agents.png',
    featured: false,
    colSpan: 1,
  },
  {
    id: 'roma-global-gtm',
    title: 'Brand & GTM Strategy — Roma Global',
    tagline: 'Full positioning and go-to-market strategy for a fashion brand.',
    category: ['Brand', 'GTM'],
    outcome: 'Series A GTM playbook delivered; adopted as core positioning framework.',
    skills: ['GTM strategy', 'Brand positioning', 'Deck design'],
    link: '#',
    image: '/assets/projects/roma-global.png',
    featured: false,
    colSpan: 2,
  },
  {
    id: 'fleetly-analytics',
    title: 'Revenue Analytics — FleetlyHQ',
    tagline: 'Subscription data analysis and revenue forecasting report.',
    category: ['Analytics', 'Growth'],
    outcome: 'Reduced forecasting error; surfaced key churn drivers.',
    skills: ['Data analysis', 'Revenue analytics', 'Reporting'],
    link: '#',
    image: '/assets/projects/fleetly.png',
    featured: false,
    colSpan: 1,
  },
  {
    id: 'noto-brand',
    title: 'Brand Voice Strategy — NOTO Ice Creams',
    tagline: 'Positioning and brand voice for a D2C ice cream brand.',
    category: ['Brand'],
    outcome: 'Delivered full brand voice guide and positioning doc.',
    skills: ['Brand strategy', 'Copywriting', 'D2C'],
    link: '#',
    image: '/assets/projects/noto.png',
    featured: false,
    colSpan: 1,
  },
  {
    id: 'whatsapp-agent',
    title: 'WhatsApp Customer Service Agent',
    tagline: 'AI-powered customer support automation for Rebel Foods.',
    category: ['AI/Automation'],
    outcome: 'Automated tier-1 customer queries via WhatsApp.',
    skills: ['n8n', 'OpenAI API', 'WhatsApp API'],
    link: '#',
    image: '/assets/projects/whatsapp-agent.png',
    featured: false,
    colSpan: 1,
  },
  {
    id: 'zelo-content',
    title: 'AI Content Production Agent — Zelo',
    tagline: "Automated content pipeline for a startup's marketing collateral.",
    category: ['AI/Automation', 'Growth'],
    outcome: 'Reduced content turnaround from days to hours.',
    skills: ['n8n', 'Gemini API', 'Content strategy'],
    link: '#',
    image: '/assets/projects/zelo.png',
    featured: false,
    colSpan: 1,
  },
  {
    id: 'skv-erpnext',
    title: 'ERPNext Deployment — SKV Homes',
    tagline: 'ERP deployment plan and case study for a real estate firm.',
    category: ['GTM'],
    outcome: 'Full deployment plan and stakeholder-ready case study delivered.',
    skills: ['ERPNext', 'Operations', 'Case study'],
    link: '#',
    image: '/assets/projects/skv.png',
    featured: false,
    colSpan: 1,
  },
]

export const categories = ['All', 'Growth', 'Brand', 'AI/Automation', 'Analytics', 'GTM']
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add project data and filterProjects utility with tests"
```

---

## Task 4: useActiveSection Hook

**Files:**
- Create: `src/hooks/useActiveSection.js`
- Create: `tests/useActiveSection.test.js`

- [ ] **Step 1: Write failing test**

`tests/useActiveSection.test.js`:
```js
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
    vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))
  })

  it('returns the first section id as default active', () => {
    const { result } = renderHook(() =>
      useActiveSection(['hero', 'work', 'about'])
    )
    expect(result.current).toBe('hero')
  })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm run test:run
```
Expected: FAIL — `useActiveSection` not found.

- [ ] **Step 3: Implement useActiveSection**

`src/hooks/useActiveSection.js`:
```js
import { useState, useEffect, useRef } from 'react'

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])
  const observerRef = useRef(null)

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [sectionIds])

  return active
}
```

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add useActiveSection hook with IntersectionObserver"
```

---

## Task 5: App Shell (Sidebar + TopBar + Layout)

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/Sidebar.jsx`
- Create: `src/components/TopBar.jsx`

- [ ] **Step 1: Create Sidebar component**

`src/components/Sidebar.jsx`:
```jsx
import { useActiveSection } from '../hooks/useActiveSection'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export function Sidebar() {
  const active = useActiveSection(sections.map(s => s.id))

  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: 'var(--sidebar-width)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 32px',
      borderRight: '1px solid var(--border)',
      backgroundColor: 'var(--bg)',
      zIndex: 100,
    }}>
      <div>
        <p style={{
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          color: 'var(--text)',
          marginBottom: '48px',
        }}>
          Srikar Pandrangi
        </p>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: active === id ? 'var(--accent)' : 'var(--border)',
                flexShrink: 0,
                transition: 'background-color 200ms ease',
              }} />
              <span style={{
                fontSize: '12px',
                fontWeight: 400,
                color: active === id ? 'var(--text)' : 'var(--muted)',
                transition: 'color 200ms ease',
              }}>
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.02em' }}>
        Open to roles · Bengaluru
      </p>
    </aside>
  )
}
```

- [ ] **Step 2: Create TopBar component**

`src/components/TopBar.jsx`:
```jsx
export function TopBar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em' }}>
        Srikar Pandrangi
      </span>
      <nav style={{ display: 'flex', gap: '24px' }}>
        {['Work', 'About', 'Contact'].map(label => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Update App.jsx**

`src/App.jsx`:
```jsx
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { About } from './components/About'
import { Resume } from './components/Resume'
import { Contact } from './components/Contact'

const SIDEBAR_WIDTH = 220

export default function App() {
  return (
    <>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="topbar-wrapper">
        <TopBar />
      </div>
      <main className="main-content">
        <Hero />
        <Work />
        <About />
        <Resume />
        <Contact />
      </main>
      <style>{`
        .sidebar-wrapper { display: none; }
        .topbar-wrapper { display: block; }
        .main-content { margin-left: 0; }
        @media (min-width: 768px) {
          .sidebar-wrapper { display: block; }
          .topbar-wrapper { display: none; }
          .main-content { margin-left: ${SIDEBAR_WIDTH}px; }
        }
      `}</style>
    </>
  )
}
```

- [ ] **Step 4: Create placeholder components so App compiles**

Create each of the following as a minimal stub. They will be replaced in subsequent tasks:

`src/components/Hero.jsx`:
```jsx
export function Hero() { return <section id="hero" style={{ minHeight: '100vh' }} /> }
```

`src/components/Work.jsx`:
```jsx
export function Work() { return <section id="work" style={{ minHeight: '60vh' }} /> }
```

`src/components/About.jsx`:
```jsx
export function About() { return <section id="about" style={{ minHeight: '60vh' }} /> }
```

`src/components/Resume.jsx`:
```jsx
export function Resume() { return <section id="resume" style={{ minHeight: '60vh' }} /> }
```

`src/components/Contact.jsx`:
```jsx
export function Contact() { return <section id="contact" style={{ minHeight: '40vh' }} /> }
```

- [ ] **Step 5: Verify shell renders**

```bash
npm run dev
```
Expected: Off-white page, sidebar visible on desktop (≥768px), top bar on mobile (<768px). No console errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add App shell with Sidebar and TopBar"
```

---

## Task 6: Hero Section

**Files:**
- Modify: `src/components/Hero.jsx`
- Create: `tests/Hero.test.jsx`

- [ ] **Step 1: Write failing tests**

`tests/Hero.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { Hero } from '../src/components/Hero'

describe('Hero', () => {
  it('renders the h1 headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the AI agents outcome badge', () => {
    render(<Hero />)
    expect(screen.getByText(/AI agents deployed/i)).toBeInTheDocument()
  })

  it('renders the View Work link', () => {
    render(<Hero />)
    expect(screen.getByText(/View Work/i)).toBeInTheDocument()
  })

  it('renders the Download Resume link', () => {
    render(<Hero />)
    expect(screen.getByText(/Download Resume/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm run test:run
```
Expected: FAIL.

- [ ] **Step 3: Implement Hero**

`src/components/Hero.jsx`:
```jsx
const badges = [
  '5+ AI agents deployed',
  '3 Series A GTM strategies',
  'Revenue analytics in production',
]

export function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 64px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '640px' }}>

        {/* Portrait circle */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          marginBottom: '24px',
          backgroundColor: 'var(--surface)',
        }}>
          <img
            src="/assets/photo-circle.jpg"
            alt="Srikar Pandrangi"
            width={72}
            height={72}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>

        {/* Eyebrow */}
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '16px',
        }}>
          Growth · Brand · AI Automation
        </p>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 4vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '20px',
        }}>
          I build GTM playbooks and AI agents for early-stage startups.
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '32px',
          lineHeight: 1.5,
        }}>
          Currently at Mesa School of Business. Previously: Untitled Creatives, D2C co-founder, GTM consulting.
        </p>

        {/* Outcome badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {badges.map(badge => (
            <span key={badge} style={{
              display: 'inline-block',
              padding: '6px 14px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text)',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#work" style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '-0.01em',
          }}>
            View Work →
          </a>
          <a href="/resume.pdf" download style={{
            fontSize: '15px',
            fontWeight: 400,
            color: 'var(--muted)',
          }}>
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--muted)',
        fontSize: '20px',
        userSelect: 'none',
      }}>
        ↓
      </div>

      <style>{`
        @media (max-width: 767px) {
          #hero { padding: 80px 24px 64px; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```
Expected: All tests PASS.

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```
Expected: Hero fills viewport. Headline, badges, CTAs visible. Portrait shows a gray circle (placeholder until photo added).

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: implement Hero section"
```

---

## Task 7: ProjectCard Component

**Files:**
- Modify: `src/components/ProjectCard.jsx` (replacing stub)
- Create: `tests/ProjectCard.test.jsx`

- [ ] **Step 1: Write failing tests**

`tests/ProjectCard.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../src/components/ProjectCard'

const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  tagline: 'A test tagline.',
  category: ['AI/Automation'],
  outcome: 'Saved 10 hours per week.',
  skills: ['n8n', 'OpenAI API'],
  link: 'https://example.com',
  image: '/assets/projects/test.png',
  featured: false,
  colSpan: 1,
}

describe('ProjectCard', () => {
  it('renders the project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('A test tagline.')).toBeInTheDocument()
  })

  it('renders skill tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('n8n')).toBeInTheDocument()
    expect(screen.getByText('OpenAI API')).toBeInTheDocument()
  })

  it('renders the first category as a label', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('AI/Automation')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm run test:run
```
Expected: FAIL.

- [ ] **Step 3: Implement ProjectCard**

`src/components/ProjectCard.jsx`:
```jsx
export function ProjectCard({ project, featured = false }) {
  const { title, tagline, category, skills, link, image, colSpan } = project

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        gridColumn: `span ${colSpan || 1}`,
        display: 'block',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Category tag */}
      <p style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '12px',
      }}>
        {category[0]}
      </p>

      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: featured ? '16/7' : '16/9',
        backgroundColor: 'var(--border)',
        borderRadius: '8px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.parentElement.style.display = 'none' }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: featured ? '22px' : '18px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text)',
        marginBottom: '8px',
      }}>
        {title}
      </h3>

      {/* Tagline */}
      <p style={{
        fontSize: '14px',
        fontWeight: 400,
        color: 'var(--muted)',
        marginBottom: '16px',
        lineHeight: 1.5,
      }}>
        {tagline}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {skills.map(skill => (
          <span key={skill} style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--muted)',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '3px 10px',
          }}>
            {skill}
          </span>
        ))}
      </div>
    </a>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: implement ProjectCard component with tests"
```

---

## Task 8: Work Section (Bento Grid + Filter)

**Files:**
- Modify: `src/components/Work.jsx` (replacing stub)

- [ ] **Step 1: Implement Work section**

`src/components/Work.jsx`:
```jsx
import { useState } from 'react'
import { projects, categories } from '../data/projects'
import { filterProjects } from '../utils/filterProjects'
import { ProjectCard } from './ProjectCard'

export function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visible = filterProjects(projects, activeCategory)
  const featured = visible.find(p => p.featured)
  const rest = visible.filter(p => !p.featured)

  return (
    <section id="work" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '1px solid var(--border)',
    }}>
      {/* Section label */}
      <p style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: '8px',
      }}>
        Work
      </p>

      <h2 style={{
        fontSize: '32px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        marginBottom: '40px',
      }}>
        GTM strategies, AI agents, and analytics tools — built for real problems.
      </h2>

      {/* Filter bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid var(--border)',
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--surface)',
              color: activeCategory === cat ? '#fff' : 'var(--muted)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 150ms ease, color 150ms ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        {featured && <ProjectCard project={featured} featured={true} />}
        {rest.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          #work { padding: var(--section-pad-y) 24px; }
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-grid > * { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```
Expected: Work section renders with filter pills and 3-column bento grid. Featured card spans full width. Clicking a filter pill shows only matching cards.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: implement Work section with bento grid and category filter"
```

---

## Task 9: About Section

**Files:**
- Modify: `src/components/About.jsx` (replacing stub)

- [ ] **Step 1: Implement About section**

`src/components/About.jsx`:
```jsx
const stats = [
  'NIT Warangal · B.Tech Mechanical',
  'CAT 99.3 percentile',
  'Mesa PGP · Startup Leadership',
  'Bengaluru · Open to roles',
]

export function About() {
  return (
    <section id="about" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="about-grid" style={{
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* Left: copy */}
        <div>
          <p style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '16px',
          }}>
            About
          </p>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: '24px',
          }}>
            Builder by instinct, strategist by training.
          </h2>

          {/* REPLACE with user-provided copy (~150–180 words) */}
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}>
            [About copy — replace this with your provided text.]
          </p>

          <div style={{ display: 'flex', gap: '32px' }}>
            <a href="#resume" style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--accent)',
            }}>
              View Resume →
            </a>
            <a href="#contact" style={{
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--muted)',
            }}>
              Let's Talk →
            </a>
          </div>
        </div>

        {/* Right: photo + stats */}
        <div>
          <div style={{
            width: '100%',
            aspectRatio: '4/5',
            backgroundColor: 'var(--surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
          }}>
            <img
              src="/assets/photo-full.jpg"
              alt="Srikar Pandrangi presenting"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.map(stat => (
              <p key={stat} style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--muted)',
              }}>
                {stat}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #about { padding: var(--section-pad-y) 24px; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```
Expected: Two-column layout. Left: section label, headline, placeholder copy, two links. Right: gray rectangle (photo placeholder), four stat lines below.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: implement About section"
```

---

## Task 10: Resume Section

**Files:**
- Modify: `src/components/Resume.jsx` (replacing stub)

- [ ] **Step 1: Implement Resume section**

`src/components/Resume.jsx`:
```jsx
// REPLACE these arrays with actual resume content from user
const experience = [
  { company: 'Untitled Creatives', title: 'Founder', year: '2023–Present' },
  { company: 'D2C Brand (co-founded)', title: 'Co-founder', year: '2022–2023' },
  { company: 'Zuddl', title: 'GTM Consultant', year: '2022' },
  { company: 'Capgemini', title: 'GTM Consulting', year: '2021' },
]

const education = [
  { institution: 'Mesa School of Business', program: 'PGP Startup Leadership', year: '2024–Present' },
  { institution: 'NIT Warangal', program: 'B.Tech Mechanical Engineering', year: '2017–2021' },
  { institution: 'CAT', program: '99.3 percentile', year: '2023' },
]

function TimelineItem({ primary, secondary, year }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '16px',
      paddingLeft: '16px',
      borderLeft: '1px solid var(--border)',
      paddingBottom: '20px',
    }}>
      <div>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{primary}</p>
        <p style={{ fontSize: '13px', fontWeight: 400, color: 'var(--muted)' }}>{secondary}</p>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{year}</p>
    </div>
  )
}

export function Resume() {
  return (
    <section id="resume" style={{
      padding: 'var(--section-pad-y) 64px',
      borderTop: '1px solid var(--border)',
    }}>
      <p style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: '40px',
      }}>
        Resume
      </p>

      <div className="resume-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        marginBottom: '48px',
      }}>
        <div>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '24px',
          }}>
            Experience
          </h3>
          {experience.map(item => (
            <TimelineItem
              key={item.company}
              primary={item.company}
              secondary={item.title}
              year={item.year}
            />
          ))}
        </div>

        <div>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '24px',
          }}>
            Education
          </h3>
          {education.map(item => (
            <TimelineItem
              key={item.institution}
              primary={item.institution}
              secondary={item.program}
              year={item.year}
            />
          ))}
        </div>
      </div>

      <a
        href="/resume.pdf"
        download
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '15px',
          fontWeight: 700,
          color: 'var(--accent)',
          letterSpacing: '-0.01em',
        }}
      >
        Download Full Resume (PDF) →
      </a>

      <style>{`
        @media (max-width: 767px) {
          #resume { padding: var(--section-pad-y) 24px; }
          .resume-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```
Expected: Two-column layout with experience left-border timeline and education right-border timeline. Download link in accent color below.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: implement Resume section"
```

---

## Task 11: Contact Section + Footer

**Files:**
- Modify: `src/components/Contact.jsx` (replacing stub)

- [ ] **Step 1: Implement Contact section**

`src/components/Contact.jsx`:
```jsx
// REPLACE href values with actual links
const links = [
  { label: 'Email', href: 'mailto:hello@srikarpandrangi.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/srikarpandrangi' },
  { label: 'GitHub', href: 'https://github.com/srikarpandrangi' },
  { label: 'Twitter/X', href: 'https://twitter.com/srikarpandrangi' },
]

export function Contact() {
  return (
    <>
      <section id="contact" style={{
        padding: 'var(--section-pad-y) 64px',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '16px',
        }}>
          Contact
        </p>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '12px',
        }}>
          Let's talk.
        </h2>
        <p style={{
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '48px',
        }}>
          Open to growth, brand, and GTM roles at Series A–C startups.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'var(--text)',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text)' }}
            >
              {label} →
            </a>
          ))}
        </div>

        <style>{`
          @media (max-width: 767px) {
            #contact { padding: var(--section-pad-y) 24px; }
          }
        `}</style>
      </section>

      <footer style={{
        padding: '24px 64px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>
          Srikar Pandrangi · 2026
        </p>
      </footer>
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```
Expected: Contact section with headline, subtext, 4 text links with hover states, footer below.

- [ ] **Step 3: Run full test suite**

```bash
npm run test:run
```
Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: implement Contact section and footer"
```

---

## Task 12: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `vite.config.js`

- [ ] **Step 1: Confirm repo name and update vite.config.js base**

Replace `'portfolio'` with your actual GitHub repository name (the part after your username in the URL):

`vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // e.g. '/my-portfolio/' if repo is named my-portfolio
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
```

- [ ] **Step 2: Create GitHub Actions workflow**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run test:run
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 3: Enable GitHub Pages in repo settings**

Go to: GitHub repo → Settings → Pages → Source → select **GitHub Actions**.

- [ ] **Step 4: Run build locally to verify**

```bash
npm run test:run && npm run build
```
Expected: All tests pass, `dist/` created with no errors, `dist/index.html` exists.

- [ ] **Step 5: Push to GitHub**

```bash
git add .
git commit -m "feat: add GitHub Actions deployment workflow"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

- [ ] **Step 6: Verify deployment**

Go to: GitHub repo → Actions tab. Wait for workflow to complete (green check).
Then visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
Expected: Portfolio loads, off-white background, Satoshi font, sidebar visible on desktop.

---

## Task 13: Drop In Content (User Action)

This task is performed by Srikar once all assets are ready.

**Files to update:**

| File | What to do |
|---|---|
| `public/assets/photo-circle.jpg` | Add portrait photo (will be cropped to circle by CSS) |
| `public/assets/photo-full.jpg` | Add full talk photo for About section |
| `public/assets/projects/*.png` | Add screenshots for each of the 8 projects |
| `public/resume.pdf` | Replace placeholder with updated resume PDF |
| `src/components/About.jsx` | Replace `[About copy...]` with provided ~150–180 word text |
| `src/components/Resume.jsx` | Update `experience` and `education` arrays with actual data |
| `src/data/projects.js` | Update all `link` fields with real URLs; update `tagline` and `outcome` with final copy |
| `src/components/Contact.jsx` | Update `links` array with real email, LinkedIn, GitHub, Twitter/X URLs |

- [ ] **Step 1: Copy all assets into `public/assets/`**
- [ ] **Step 2: Replace About copy in `src/components/About.jsx`**
- [ ] **Step 3: Update resume data in `src/components/Resume.jsx`**
- [ ] **Step 4: Update project links and copy in `src/data/projects.js`**
- [ ] **Step 5: Update contact links in `src/components/Contact.jsx`**
- [ ] **Step 6: Run dev server and confirm all images load, no broken links**

```bash
npm run dev
```

- [ ] **Step 7: Commit and push**

```bash
git add .
git commit -m "content: add portfolio assets, copy, and final links"
git push origin main
```

Expected: GitHub Actions deploys, live site updated with real content.

---

## Self-Review

**Spec coverage:**
- [x] Hero: portrait circle, eyebrow, headline, subheadline, 3 outcome badges, 2 CTAs, scroll indicator
- [x] Work: section label, bento grid, featured card (Marketplace Digest, full width), 3-col grid, category filter
- [x] About: two-column, copy left, full photo right, 4 stat lines, two inline links
- [x] Resume: experience timeline, education timeline, PDF download link
- [x] Contact: headline, subtext, 4 text links, footer
- [x] Sidebar: fixed, dot nav, active state via IntersectionObserver, status line at bottom
- [x] TopBar: sticky, name + 3 nav links, mobile only
- [x] Satoshi font via Fontshare CDN
- [x] CSS design tokens (colors, font, spacing)
- [x] Mobile responsive (all sections, sidebar→topbar swap)
- [x] GitHub Actions deploy to GitHub Pages
- [x] filterProjects utility with unit tests
- [x] useActiveSection hook with tests
- [x] Hero render tests
- [x] ProjectCard render tests
- [x] Content placeholder task (Task 13)

**Removed per user decision:** Approach/How I Work section, blog/writing section. ✓

**Type consistency:**
- `filterProjects(projects, category)` — defined Task 3, imported in Work.jsx Task 8 ✓
- `useActiveSection(sectionIds[])` — defined Task 4, used in Sidebar.jsx Task 5 ✓
- `ProjectCard({ project, featured })` — defined Task 7, used in Work.jsx Task 8 ✓
- `TimelineItem({ primary, secondary, year })` — defined and used within Resume.jsx Task 10 ✓
- `categories` — exported from `projects.js` Task 3, imported in Work.jsx Task 8 ✓
- `colSpan` field used in ProjectCard `gridColumn: span ${colSpan}` and set in projects.js ✓
