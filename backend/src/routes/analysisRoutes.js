import express from 'express';
import { analyzeRepository, getAnalysisByRepo, exportMarkdownReport, getUserAnalyses } from '../controllers/analysisController.js';
import { analyzeRateLimiter } from '../middleware/rateLimiter.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', analyzeRateLimiter, optionalAuth, analyzeRepository);
router.get('/analyze/:owner/:repo', optionalAuth, getAnalysisByRepo);
router.get('/analyze/:owner/:repo/export', exportMarkdownReport);
router.get('/user/history', requireAuth, getUserAnalyses);

export default router;
