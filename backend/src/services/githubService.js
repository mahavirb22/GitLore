import axios from 'axios';
import { config } from '../config/index.js';

function getHeaders(userToken = null) {
  const token = userToken || config.github.token;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitLore-App/1.0'
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
}

export async function exchangeCodeForToken(code) {
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
      code
    },
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );
  return response.data; // { access_token, scope, token_type }
}

export async function getGitHubUserProfile(userToken) {
  const response = await axios.get('https://api.github.com/user', {
    headers: getHeaders(userToken)
  });
  return response.data;
}

export async function getRepoMetadata(owner, repo, userToken = null) {
  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: getHeaders(userToken)
  });
  return response.data;
}

export async function getRepoCommits(owner, repo, limit = 100, userToken = null) {
  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
    params: { per_page: limit },
    headers: getHeaders(userToken)
  });
  return response.data;
}

export async function getRepoContributors(owner, repo, userToken = null) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
      params: { per_page: 30 },
      headers: getHeaders(userToken)
    });
    return response.data;
  } catch (error) {
    console.warn(`Could not fetch contributors for ${owner}/${repo}:`, error.message);
    return [];
  }
}
