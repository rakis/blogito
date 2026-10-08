# blogito

Victor Nghe's personal blog — thoughts, recipes, and tech essays.

Formerly built with Jekyll, modernized with **[Astro](https://astro.build/)** for lightning-fast builds, zero client-side JavaScript overhead by default, and seamless Netlify deployment.

## Features

- **Markdown-first**: Write posts in clean Markdown under `src/content/posts/<category>/`.
- **Zero-JS by Default**: Ships pure static HTML and CSS to visitors; blazing fast page loads with minimal bandwidth.
- **Dark Mode**: System-aware with smooth manual toggle, FOUC prevention, and standard `color-scheme` CSS custom properties.
- **Categories**: Dynamic category pages and responsive category cards with live post counts (`cogito`, `recipes`, `tech`).
- **Full Backward Compatibility**: Netlify redirects preserve legacy Jekyll `.html` links, permalinks, and category routes without broken backlinks.
- **RSS Feeds**: Automatically generated RSS 2.0 feeds for all posts (`/feed.xml`) and per category (`/feed/[category].xml`).
- **SEO & Social**: Automated Open Graph, Twitter Cards, canonical tags, and semantic HTML5 markup.
- **Fast Builds**: Sub-second full static site builds (~300ms).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (managed via `.nvmrc` / `.tool-versions` / mise)
- npm (or pnpm / bun)

### Development

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:4321)
npm run dev
```

### Production Build

```bash
# Generate static files into dist/
npm run build

# Preview the production build locally
npm run preview
```

## Adding New Content

Create a new Markdown file under `src/content/posts/<category>/`:

```markdown
---
title: "Your Post Title"
date: 2026-10-07 14:00:00 -0400
category: tech
# draft: true   # Optional: set to true to hide from production builds
---

Your content goes here...
```

Filename convention: `YYYY-MM-DD-your-slug.md`.

## Deployment

The repository is configured for automated builds on **[Netlify](https://www.netlify.com/)** via `netlify.toml`:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 24

Legacy Jekyll URLs (e.g. `/:category/:year/:month/:day/:slug.html` and `/categories/:category.html`) are 301-redirected cleanly to canonical Astro routes.

## License

MIT &copy; Victor Nghe
