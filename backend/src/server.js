import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import sqliteSessionStore from 'connect-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

const SQLiteStore = sqliteSessionStore(session);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS Configuration
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}));

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Persistent Session Store using SQLite
const sessionDbDir = path.resolve(__dirname, '../data');

app.use(session({
  store: new SQLiteStore({
    db: 'sessions.db',
    dir: sessionDbDir
  }),
  name: 'gitlore.sid',
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: config.nodeEnv === 'production' ? 'none' : 'lax'
  }
}));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'GitLore Backend Service', version: '1.0.0' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', analysisRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught:', err);
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

app.listen(config.port, () => {
  console.log(`GitLore Backend Server listening on http://localhost:${config.port}`);
});
