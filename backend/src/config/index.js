import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || 'file:../data/dev.db',
  sessionSecret: process.env.SESSION_SECRET || 'gitlore_session_secret_2026',
  encryptionSecret: process.env.ENCRYPTION_SECRET || 'gitlore_encryption_secret_2026',
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl: process.env.GITHUB_CALLBACK_URL || '',
    token: process.env.GITHUB_TOKEN || ''
  },
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY || ''
  }
};
