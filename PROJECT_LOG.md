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
- **Variant Audit & Consolidation**: Audited `gitlore_facebook_react_analysis_1` vs `2`, retained `gitlore_facebook_react_analysis_1` as the single `RepoAnalysisPage.jsx`.

### Phase 1 — Auth, Sessions & Security (Completed)
- **Node.js + Express Backend**: Initialized Express application in `/backend` listening on `http://localhost:5000`.
- **Database & ORM**: Configured Prisma ORM with SQLite database (`backend/data/dev.db`) storing `User`, `Repository`, `Analysis`, `StoryArc`, `Commit`, `Bookmark`, and `Session`.
- **GitHub OAuth Flow**: Implemented `GET /api/auth/github`, `GET /api/auth/github/callback`, `GET /api/auth/me`, and `POST /api/auth/logout`.
- **Token Security**: GitHub OAuth access tokens encrypted using AES-256-GCM (`CryptoJS`).
- **Session Management**: Persistent SQLite session store via `express-session` and `connect-sqlite3` (`gitlore.sid` httpOnly cookie).
- **Security Middleware**: Configured `helmet` headers, `cors` for `http://localhost:5173`, `express-rate-limit` for analysis endpoints, and Zod input validation.

### Phase 2 — Core Feature: Repo Analysis Pipeline (Completed)
- **GitHub REST API Integration**: `githubService.js` fetches repo metadata, commit histories (up to 100 commits), and top contributors.
- **Heuristic Commit Clustering**: `clusteringService.js` groups commits into 3 story arcs based on time proximity and file path overlap, and computes commit frequency barcode charts.
- **LLM Narration Pass**: `llmService.js` sends candidate clusters to OpenRouter API (`google/gemini-2.5-flash`) to generate exhibit titles, narrative prose paragraphs, and AI Placard insights (with intelligent fallback generator if API key is not provided).
- **Database Caching**: Full analysis payloads cached in SQLite DB via Prisma; subsequent requests for the same repository return stored JSON analyses instantly.
- **Real Progress Loading State**: Front-end displays a progress overlay reflecting real backend pipeline stages.

### Phase 3 — User & Export Features (Completed)
- **Markdown Exhibit Exporter**: `GET /api/analyze/:owner/:repo/export` generates and downloads a clean Markdown exhibit report of the narrated timeline.
- **User Analyses History**: `GET /api/user/history` returns analyzed repositories for logged-in users.

### Phase 4 — Integration Check & Verification (Completed)
- **Landing Page Input**: Form submission triggers real `POST http://localhost:5000/api/analyze` request.
- **Analysis Dashboard**: `RepoAnalysisPage.jsx` fetches real payload from `/api/analyze/:owner/:repo`.
- **Navbar Session Auth**: Reflects current GitHub session user avatar and dropdown with Logout functionality.
- **Audio Narration**: Integrated Web Speech API (`window.speechSynthesis`) to read narrative prose aloud when Play is clicked on any story block.
- **Build Verification**: `npm run build` succeeds in 2.10s with zero errors or warnings.

---

## File Map
- `frontend/`: React Vite frontend codebase.
- `backend/`: Node.js + Express backend service (`server.js`, `prisma/schema.prisma`, `src/controllers/`, `src/services/`, `src/routes/`).
- `PROJECT_LOG.md`: System status and session context recovery.
