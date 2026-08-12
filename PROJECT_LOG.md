# GitLore — Project Log & Development History

## Overview
GitLore converts raw Git commit histories into an architectural museum exhibit using AI-driven narration, commit clustering, and high-contrast editorial UI.

---

## Completed Work

### Phase 0 — Frontend Setup & Stitch Conversion (Completed)
- **Vite React App Scaffolded**: Created production-ready React frontend in `/frontend`.
- **Design System & Styling**: Integrated Tailwind CSS v3 with exact color palette (`#1c1b1b` charcoal, `#fcf9f8` off-white canvas, `#D8402C` brick red accent), custom typography (`Hanken Grotesk`, `JetBrains Mono`, `Bricolage Grotesque`), and zero border-radius museum styling.
- **Component Extraction**:
  - `LogoMark.jsx`
  - `HeroAbstractGraphic.jsx` (inline SVG exhibit graphic)
  - `Button.jsx`, `SectionDivider.jsx`
  - `Navbar.jsx`, `Footer.jsx`, `MobileMenu.jsx`
  - `HeroSection.jsx`, `HowItWorksSection.jsx`, `FeaturedTimelineSection.jsx`, `TestimonialSection.jsx`
  - `ArcSidebar.jsx`, `NarrativeFeed.jsx`, `ArcBlock.jsx`, `CommitChip.jsx`, `RepoPulsePanel.jsx`, `CommitFrequencyChart.jsx`
- **Responsive Merging**: Merged desktop and mobile landing pages into a single responsive `LandingPage.jsx`.

### Phase 1 — Auth, Sessions & Security (Completed)
- **Node.js + Express Backend**: Initialized Express application in `/backend` listening on `http://localhost:5000` (or `PORT` in production).
- **Database & ORM**: Configured Prisma ORM with SQLite for local dev (`backend/data/dev.db`) and PostgreSQL support (`connect-pg-simple`) for production.
- **GitHub OAuth Flow**: Implemented `GET /api/auth/github`, `GET /api/auth/github/callback`, `GET /api/auth/me`, and `POST /api/auth/logout`.
- **Token Security**: GitHub OAuth access tokens encrypted using AES-256-GCM (`CryptoJS`).
- **Session Store**: `express-session` backed by `connect-sqlite3` in development and `connect-pg-simple` (PostgreSQL) in production. `sameSite: 'none'` and `secure: true` configured for cross-domain Vercel <-> Render cookies.

### Phase 2 — Core Feature: Repo Analysis Pipeline (Completed)
- **GitHub REST API Integration**: `githubService.js` fetches repo metadata, commit histories (up to 100 commits), and top contributors.
- **Heuristic Commit Clustering**: `clusteringService.js` groups commits into 3 story arcs based on time proximity and file path overlap.
- **LLM Narration Pass**: `llmService.js` sends candidate clusters to OpenRouter API (`google/gemini-2.5-flash`) to generate exhibit titles, narrative prose paragraphs, and AI Placard insights.
- **Pre-cached Demo Exhibits**: Seed script `prisma/seed.js` pre-caches full exhibits for `facebook/react` and `expressjs/express` so hackathon judges get instant zero-latency loading.

### Phase 3 — Production Deployment Readiness (Completed)
- **Dynamic API Environment Variable**: Frontend configured with `import.meta.env.VITE_API_URL || 'http://localhost:5000'`.
- **Deployment Spec Files**:
  - `frontend/vercel.json`: Single Page Application route rewrites for Vercel.
  - `backend/render.yaml`: Blueprint definition for Render web service + managed PostgreSQL database.

---

## Production Deployment Checklist & Environment Variables

### 1. Render / Railway (Backend + Database)
Set the following Environment Variables in your backend service panel:
- `NODE_ENV`: `production`
- `PORT`: `10000`
- `DATABASE_URL`: `postgresql://user:pass@host:5432/gitlore?sslmode=require`
- `SESSION_SECRET`: `gitlore_production_session_secret_2026_x9z`
- `ENCRYPTION_SECRET`: `gitlore_production_encryption_secret_2026_a1b`
- `CLIENT_URL`: `https://gitlore.vercel.app`
- `GITHUB_CLIENT_ID`: `<YOUR_GITHUB_CLIENT_ID>`
- `GITHUB_CLIENT_SECRET`: `<YOUR_GITHUB_CLIENT_SECRET>`
- `GITHUB_CALLBACK_URL`: `https://gitlore-api.onrender.com/api/auth/github/callback`
- `OPENROUTER_API_KEY`: `<YOUR_OPENROUTER_API_KEY>`

Build Command: `npm install && npx prisma db push && npm run db:seed`  
Start Command: `npm start`

### 2. Vercel (Frontend)
Set the following Environment Variable in Vercel project settings:
- `VITE_API_URL`: `https://gitlore-api.onrender.com`

Framework Preset: `Vite`  
Build Command: `npm run build`  
Output Directory: `dist`

### 3. GitHub OAuth App Settings
In Developer Settings > OAuth Apps:
- Homepage URL: `https://gitlore.vercel.app`
- Authorization Callback URL: `https://gitlore-api.onrender.com/api/auth/github/callback`
