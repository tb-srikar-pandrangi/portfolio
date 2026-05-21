# Srikar Pandrangi's Portfolio

A high-performance portfolio built with **Next.js 15** featuring Server-Side Rendering, Image Optimization, and Static Generation.

## Tech Stack

- **Framework**: Next.js 15
- **React**: 19.2.4
- **Styling**: CSS-in-JS with CSS Variables
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with Flat Config

## Performance Features

- **Server-Side Rendering (SSR)**: Fully-rendered HTML on initial page load
- **Image Optimization**: Automatic WebP/AVIF conversion with lazy loading
- **HTTP Caching**: 1-hour cache with stale-while-revalidate strategy
- **Static Generation**: Pre-rendered pages for instant delivery
- **Code Splitting**: Automatic bundling optimization

## Getting Started

```bash
npm install
npm run dev      # Start dev server (http://localhost:3002)
npm run build    # Build for production
npm start        # Serve production build
npm run lint     # Run ESLint
npm test         # Run tests
```

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Homepage
│   └── globals.css         # Global styles
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities
├── public/                 # Static assets
└── package.json
```

## Key Improvements from Vite

1. **SSR**: Pages are rendered on the server, not the client
2. **Faster Initial Load**: No render-blocking JavaScript
3. **Better SEO**: Metadata automatically server-rendered
4. **Image Optimization**: Built-in image component
5. **Automatic Code Splitting**: Smaller bundles per route

## Deployment

This portfolio is optimized for Vercel but works on any Node.js hosting:

```bash
npm run build
npm start
```

For Vercel: Connect your GitHub repo and it will auto-deploy on push.
