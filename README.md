# GitLore — Architectural Record of Human Engineering

> **Transform raw Git commit histories into interactive, curated architectural exhibits.**  
> GitLore treats source code as a curated artifact rather than a utilitarian asset, using AI commit clustering and narration to reveal the human engineering decisions behind the code.

---

## 🌟 Key Features

- 🏛️ **Editorial Museum Aesthetic**: Built with a flat, high-contrast, minimal layout—rejecting digital tropes like gradients, shadows, and rounded corners in favor of 0px sharp borders, 1px hairline dividers, an off-white canvas (`#F5F3EF`), and brick red accents (`#D8402C`).
- 🤖 **AI Commit Narration Pipeline**: Powered by OpenRouter LLM (`google/gemini-2.5-flash`), transforming raw commit messages and diff stats into 3-chapter architectural story arcs with museum placard insights.
- 📊 **Heuristic Commit Clustering**: Intelligently groups commits into timeline epochs based on temporal proximity and file-path overlap.
- 📈 **Repo Pulse & Commit Barcode**: Real-time computing of repository metrics (*Contributors*, *Active Period*, *Lines Changed*, *Key Architects*) and commit frequency barcode charts.
- 🔊 **Audio Narration Player**: Web Speech API (`window.speechSynthesis`) integration to read narrative exhibits aloud with synchronized playback progress.
- 🔒 **GitHub OAuth & Session Security**: Complete GitHub OAuth 2.0 authentication with AES-256-GCM encrypted token storage, persistent server-side session cookies (`express-session`), rate limiting, and CSRF protection.
- 📄 **Markdown Exhibit Exporter**: Downloadable architectural exhibit reports for offline documentation and team onboarding.
- ⚡ **Pre-Cached Demo Exhibits**: Instant zero-latency exhibit loading for showcase repositories (`facebook/react`, `expressjs/express`).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 (Custom Editorial Museum theme)
- **Routing**: React Router v6
- **Typography**: Hanken Grotesk, Bricolage Grotesque, JetBrains Mono
- **Icons & Speech**: Google Material Symbols Outlined, Web Speech API

### Backend & Database
- **Runtime & Server**: Node.js (ES Modules) + Express.js
- **Database & ORM**: PostgreSQL (Production) / SQLite (Development) with Prisma ORM
- **Session Store**: `express-session` with `connect-pg-simple` (PostgreSQL) / `connect-sqlite3` (Development)
- **Security & Validation**: Helmet.js, CORS, `express-rate-limit`, Zod input validation, CryptoJS (AES-256-GCM)

### External APIs & Integrations
- **GitHub REST API v3**: Commit history parsing, repository metadata, contributor stats
- **OpenRouter API**: LLM narration generation (`google/gemini-2.5-flash`)

---

## 📁 Repository Structure

```
stitch_gitlore_narrative_landing_page/
├── README.md                  # Project overview & documentation
├── PROJECT_LOG.md             # Development milestones & technical logs
├── frontend/                  # React Vite frontend application
│   ├── public/                # Static assets & favicon
│   ├── src/
│   │   ├── assets/            # Abstract graphics & images
│   │   ├── components/
│   │   │   ├── common/        # LogoMark, HeroAbstractGraphic, Button, SectionDivider
│   │   │   ├── layout/        # Navbar, Footer, MobileMenu
│   │   │   ├── landing/       # HeroSection, HowItWorks, FeaturedTimeline, Testimonial
│   │   │   └── dashboard/     # ArcSidebar, NarrativeFeed, ArcBlock, CommitChip, RepoPulsePanel, CommitFrequencyChart
│   │   ├── pages/             # LandingPage.jsx, RepoAnalysisPage.jsx
│   │   ├── styles/            # globals.css, variables.css
│   │   ├── App.jsx            # React Router setup
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind imports
│   ├── tailwind.config.js     # Custom design system tokens
│   ├── vercel.json            # Vercel SPA routing rules
│   └── package.json
└── backend/                   # Node.js Express backend service
    ├── prisma/
    │   ├── schema.prisma      # Prisma database schema
    │   └── seed.js            # Pre-cached demo exhibits database seed script
    ├── src/
    │   ├── config/            # Environment & fallback configs
    │   ├── controllers/       # authController.js, analysisController.js
    │   ├── middleware/        # auth.js, rateLimiter.js
    │   ├── routes/            # authRoutes.js, analysisRoutes.js
    │   ├── services/          # githubService.js, clusteringService.js, llmService.js, encryptionService.js
    │   └── server.js          # Express app entry point
    ├── render.yaml            # Render blueprint 1-click deployment spec
    ├── .env.example           # Backend environment template
    └── package.json
```

---

## 🚀 Local Development Quickstart

### Prerequisites
- Node.js v18+ and npm v9+

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/mahavirb22/GitLore.git
cd GitLore

# Install Frontend dependencies
cd frontend
npm install

# Install Backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL="file:../data/dev.db"
SESSION_SECRET=gitlore_super_secret_session_key_2026
ENCRYPTION_SECRET=gitlore_aes256_encryption_secret_key_2026

# Optional: GitHub OAuth (for logged-in features & private repos)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

# Optional: GitHub Personal Access Token (for higher rate limits)
GITHUB_TOKEN=your_github_personal_access_token

# Optional: OpenRouter API Key (for live AI narration)
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Initialize & Seed Database
```bash
cd backend
npx prisma db push
npm run db:seed
```

### 4. Run Development Servers

**Start Backend (Port 5000):**
```bash
cd backend
npm start
```

**Start Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🔑 Environment Variables Reference

| Variable | Scope | Description | Default / Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Frontend | Backend API Base URL | `http://localhost:5000` |
| `PORT` | Backend | Server port | `5000` |
| `NODE_ENV` | Backend | Node environment (`development` / `production`) | `development` |
| `CLIENT_URL` | Backend | Frontend URL allowed by CORS & cookies | `http://localhost:5173` |
| `DATABASE_URL` | Backend | PostgreSQL connection string or SQLite path | `file:../data/dev.db` |
| `SESSION_SECRET` | Backend | Secret key for signing session cookies | Random string |
| `ENCRYPTION_SECRET` | Backend | AES-256-GCM secret for user OAuth tokens | Random string |
| `GITHUB_CLIENT_ID` | Backend | GitHub OAuth App Client ID | GitHub Developer Settings |
| `GITHUB_CLIENT_SECRET` | Backend | GitHub OAuth App Client Secret | GitHub Developer Settings |
| `GITHUB_CALLBACK_URL` | Backend | OAuth Callback URL | `http://localhost:5000/api/auth/github/callback` |
| `OPENROUTER_API_KEY` | Backend | OpenRouter API Key for LLM commit narration | OpenRouter Dashboard |

---

## 🌐 Production Deployment Guide

### Deploy Backend on Render / Railway
1. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app) connected to `backend/`.
2. Provision a **PostgreSQL Database** (`DATABASE_URL`).
3. Set environment variables (`NODE_ENV=production`, `CLIENT_URL=https://gitlore.vercel.app`, `GITHUB_CALLBACK_URL=https://gitlore-api.onrender.com/api/auth/github/callback`, `OPENROUTER_API_KEY`, etc.).
4. **Build Command**: `npm install && npx prisma db push && npm run db:seed`
5. **Start Command**: `npm start`

### Deploy Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com) with Root Directory set to `frontend`.
2. Set Environment Variable: `VITE_API_URL=https://gitlore-api.onrender.com`.
3. Framework Preset: **Vite**. Output Directory: `dist`.
4. Click **Deploy**.

---

## 📌 Hackathon Judging Notes

- **Pre-cached Showcase Exhibits**: Enter `https://github.com/facebook/react` or `https://github.com/expressjs/express` on the landing page for **instant, zero-latency exhibit loading**.
- **Live Pipeline**: You can also analyze any public repository URL. The pipeline will fetch real commits via GitHub REST API, execute temporal commit clustering, and run an OpenRouter LLM narration pass.
- **Audio Narration**: Click the **Play** button on any story block to listen to Web Speech API TTS reading the narrative aloud.
- **Markdown Export**: Click **Export Story** in the top navigation bar of any analysis dashboard to download a formatted Markdown exhibit report.

---

## 📄 License
Created for hackathon submission. Licensed under the [MIT License](LICENSE).
