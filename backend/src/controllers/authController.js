import { PrismaClient } from '@prisma/client';
import { config } from '../config/index.js';
import { exchangeCodeForToken, getGitHubUserProfile } from '../services/githubService.js';
import { encryptToken } from '../services/encryptionService.js';

const prisma = new PrismaClient();

export async function initiateGitHubOAuth(req, res) {
  if (!config.github.clientId) {
    return res.status(500).json({
      error: 'OAuth Not Configured',
      message: 'GITHUB_CLIENT_ID is not configured in environment variables.'
    });
  }

  const redirectUri = config.github.callbackUrl || `${req.protocol}://${req.get('host')}/api/auth/github/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,repo`;

  return res.redirect(githubAuthUrl);
}

export async function handleGitHubCallback(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${config.clientUrl}?auth_error=missing_code`);
  }

  try {
    const tokenData = await exchangeCodeForToken(code);
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.redirect(`${config.clientUrl}?auth_error=invalid_token`);
    }

    const ghUser = await getGitHubUserProfile(accessToken);
    const encryptedToken = encryptToken(accessToken);

    // Upsert User record
    const user = await prisma.user.upsert({
      where: { githubId: String(ghUser.id) },
      update: {
        username: ghUser.login,
        name: ghUser.name || ghUser.login,
        avatarUrl: ghUser.avatar_url,
        accessToken: encryptedToken
      },
      create: {
        githubId: String(ghUser.id),
        username: ghUser.login,
        name: ghUser.name || ghUser.login,
        avatarUrl: ghUser.avatar_url,
        accessToken: encryptedToken
      }
    });

    // Establish server session
    req.session.userId = user.id;
    req.session.userToken = accessToken;

    return res.redirect(`${config.clientUrl}?auth_success=1`);
  } catch (error) {
    console.error('GitHub OAuth Callback Error:', error.message);
    return res.redirect(`${config.clientUrl}?auth_error=oauth_failed`);
  }
}

export async function getCurrentUser(req, res) {
  if (!req.session || !req.session.userId) {
    return res.json({ user: null });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        githubId: true,
        username: true,
        name: true,
        avatarUrl: true,
        createdAt: true
      }
    });

    return res.json({ user: user || null });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
}

export async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('gitlore.sid');
    return res.json({ success: true, message: 'Logged out successfully' });
  });
}
