import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import sqliteSessionStore from 'connect-sqlite3';
import pgSessionStore from 'connect-pg-simple';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust Proxy for Render/Railway SSL Termination
if (config.nodeEnv === 'production') {
  app.set('trust proxy', 1);
}

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS Configuration - allow dynamic origin or exact frontend URL
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || config.nodeEnv !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Allow during testing
    }
  },
  credentials: true
}));

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Determine Session Store (PostgreSQL vs SQLite)
let sessionStore;
if (config.databaseUrl.startsWith('postgres') || config.nodeEnv === 'production') {
  const PgStore = pgSessionStore(session);
  sessionStore = new PgStore({
    conString: config.databaseUrl,
    tableName: 'session',
    createTableIfMissing: true
  });
} else {
  const SQLiteStore = sqliteSessionStore(session);
  const sessionDbDir = path.resolve(__dirname, '../data');
  sessionStore = new SQLiteStore({
    db: 'sessions.db',
    dir: sessionDbDir
  });
}

app.use(session({
  store: sessionStore,
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
  res.json({
    status: 'ok',
    service: 'GitLore Backend Service',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
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
  console.log(`GitLore Backend Server running on port ${config.port} (${config.nodeEnv})`);
});
