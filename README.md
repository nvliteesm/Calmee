# Calmee — Landing Page & Marketing Platform

> Live: [calmeeofficial.com](https://www.calmeeofficial.com)

Calmee is Indonesia's first herbal milk product designed to support better sleep. This repository contains the full marketing website — a high-performance, SEO-optimized landing page with a CMS-backed admin dashboard for managing products, settings, and analytics.

![Calmee Preview](./src/assets/og-image.png)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Backend/DB | Supabase (PostgreSQL, Auth, Realtime) |
| Deployment | Vercel (SSG + Edge) |
| Image Optimization | sharp + vite-plugin-image-optimizer |

## Key Features

### Marketing Site
- **Pre-rendered (SSG)** — Full static HTML generation at build time via Vite's native SSR API for maximum SEO performance
- **Structured Data** — JSON-LD schema for Product, FAQPage, AggregateRating, Organization (rich snippets in Google)
- **Responsive Design** — Mobile-first with dedicated mobile hero, sticky CTA bar, and optimized touch interactions
- **Framer Motion Animations** — Scroll-triggered reveals, 3D tilt-on-hover cards, orbiting ingredient ring, animated counters
- **Performance Optimized** — Lazy loading, async font strategy, image compression (48% average savings), preconnect hints
- **Multi-page Architecture** — Separate `/produk`, `/tentang`, `/faq` pages for expanded keyword targeting

### Admin Dashboard (`/admin`)
- **Supabase Auth** — Secure email/password login for admin access
- **Package Editor** — Edit product names, prices, badges, Shopee links, and visibility without code changes
- **Site Settings** — Manage Shopee URL, WhatsApp number, hero badge text from a single panel
- **CTA Analytics** — Real-time tracking of button clicks (Shopee, WhatsApp, package selections) with event breakdown

### SEO & Growth
- Pre-rendered HTML for all public routes (Google sees content without JS execution)
- FAQPage + AggregateRating + Product structured data for rich search results
- Sitemap.xml with 4 indexed URLs
- Core Web Vitals optimized (fonts, images, lazy loading)
- Internal linking between pages for authority flow

## Project Structure

```
src/
├── App.jsx                  # Main landing page (homepage)
├── AppRoutes.jsx            # Shared route definitions (client + SSR)
├── entry-server.jsx         # SSR entry for prerendering
├── components/
│   ├── Layout.jsx           # Shared nav/footer for sub-pages
│   ├── PageMeta.jsx         # Per-page title & meta description
│   └── motion/             # Reusable animation primitives
│       ├── Reveal.jsx       # Scroll-triggered fade-in
│       ├── TiltCard.jsx     # 3D hover-tilt with glow
│       ├── FloatingOrbs.jsx # Ambient background animation
│       └── OrbitRing.jsx    # Orbiting element ring
├── pages/
│   ├── ProdukPage.jsx       # Product detail page
│   ├── TentangPage.jsx      # About/brand story page
│   ├── FaqPage.jsx          # Full FAQ with search
│   ├── AdminLogin.jsx       # Admin authentication
│   └── AdminDashboard.jsx   # CMS dashboard
├── services/
│   ├── packageService.js    # CRUD for product packages
│   ├── siteSettingsService.js
│   ├── trackingService.js   # CTA event logging
│   ├── analyticsService.js  # Event retrieval for dashboard
│   └── authService.js       # Supabase auth wrapper
└── lib/
    └── supabaseClient.js    # Supabase client initialization
```

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Supabase URL and anon key

# Development
npm run dev

# Production build (includes SSG prerendering)
npm run build

# Preview production build locally
npm run preview
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous (public) key |

## Build & Deploy

The build process runs three steps:
1. `vite build` — Client bundle with image optimization
2. `vite build --ssr` — Server bundle for prerendering
3. `node prerender.js` — Generates static HTML for `/`, `/produk`, `/tentang`, `/faq`

Deployed on Vercel with automatic builds on push to `main`.

---

## Status

🟢 Live in production — actively maintained and improved.

Current focus areas:
- Blog system (Supabase-backed, admin-managed)
- Email capture & retargeting integration
- Content marketing for organic traffic growth
