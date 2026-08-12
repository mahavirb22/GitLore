import express from 'express';
import { initiateGitHubOAuth, handleGitHubCallback, getCurrentUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/github', initiateGitHubOAuth);
router.get('/github/callback', handleGitHubCallback);
router.get('/me', getCurrentUser);
router.post('/logout', logoutUser);

export default router;
