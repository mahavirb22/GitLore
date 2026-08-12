import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { getRepoMetadata, getRepoCommits, getRepoContributors } from '../services/githubService.js';
import { clusterCommitsIntoArcs } from '../services/clusteringService.js';
import { generateStoryArcNarrative } from '../services/llmService.js';

const prisma = new PrismaClient();

const repoUrlSchema = z.object({
  repoUrl: z.string().min(1, 'Repository URL is required')
});

function parseGitHubUrl(urlStr) {
  let cleaned = urlStr.trim();
  cleaned = cleaned.replace(/^https?:\/\//, '').replace(/^github\.com\//, '').replace(/\.git$/, '');
  const parts = cleaned.split('/').filter(Boolean);
  if (parts.length < 2) {
    throw new Error('Invalid GitHub repository format. Expected "owner/repo" or "https://github.com/owner/repo"');
  }
  return { owner: parts[0], repo: parts[1] };
}

export async function analyzeRepository(req, res) {
  try {
    const parseResult = repoUrlSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Validation Error', details: parseResult.error.format() });
    }

    const { owner, repo } = parseGitHubUrl(parseResult.data.repoUrl);
    const fullName = `${owner}/${repo}`.toLowerCase();
    const userToken = req.session?.userToken || null;
    const userId = req.session?.userId || null;

    // Check DB cache first
    const existingRepo = await prisma.repository.findUnique({
      where: { fullName },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            storyArcs: {
              include: { commits: true }
            }
          }
        }
      }
    });

    if (existingRepo && existingRepo.analyses.length > 0) {
      const cachedAnalysis = existingRepo.analyses[0];
      return res.json({
        cached: true,
        repository: existingRepo,
        analysis: formatAnalysisPayload(existingRepo, cachedAnalysis)
      });
    }

    // Pipeline Execution
    console.log(`Starting real analysis for repository: ${fullName}`);
    
    // Step 1: Fetch GitHub REST data
    const repoMeta = await getRepoMetadata(owner, repo, userToken);
    const rawCommits = await getRepoCommits(owner, repo, 100, userToken);
    const contributors = await getRepoContributors(owner, repo, userToken);

    // Step 2: Cluster commits into candidate arcs
    const { rawArcs, stats, barcodeData, keyArchitects } = clusterCommitsIntoArcs(rawCommits);

    // Step 3: LLM Narration Pass
    const narratedArcs = await generateStoryArcNarrative(fullName, rawArcs);

    // Step 4: Persist in Database
    const dbRepo = await prisma.repository.upsert({
      where: { fullName },
      update: {
        stars: repoMeta.stargazers_count || 0,
        forks: repoMeta.forks_count || 0,
        openIssues: repoMeta.open_issues_count || 0,
        description: repoMeta.description || null,
        isPrivate: repoMeta.private || false
      },
      create: {
        owner,
        name: repo,
        fullName,
        description: repoMeta.description || null,
        stars: repoMeta.stargazers_count || 0,
        forks: repoMeta.forks_count || 0,
        openIssues: repoMeta.open_issues_count || 0,
        defaultBranch: repoMeta.default_branch || 'main',
        isPrivate: repoMeta.private || false
      }
    });

    const dbAnalysis = await prisma.analysis.create({
      data: {
        repositoryId: dbRepo.id,
        userId: userId,
        totalCommits: stats.totalCommits,
        activePeriod: stats.activePeriod,
        contributorsCount: stats.contributorsCount || contributors.length || 1,
        linesChanged: stats.linesChanged,
        barcodeData: JSON.stringify(barcodeData),
        keyArchitects: JSON.stringify(keyArchitects),
        status: 'completed',
        storyArcs: {
          create: narratedArcs.map(arc => ({
            arcIndex: arc.arcIndex,
            title: arc.title,
            dateRange: arc.dateRange,
            duration: arc.duration || '4:12',
            prose: JSON.stringify(arc.prose),
            aiInsight: arc.aiInsight,
            commits: {
              create: arc.commits.map(c => ({
                sha: c.sha,
                message: c.message,
                authorName: c.authorName,
                authorAvatar: c.authorAvatar,
                committedAt: c.committedAt,
                additions: c.additions,
                deletions: c.deletions,
                isHighlight: c.isHighlight,
                hasErrorDot: c.hasErrorDot
              }))
            }
          }))
        }
      },
      include: {
        storyArcs: {
          include: { commits: true }
        }
      }
    });

    const payload = formatAnalysisPayload(dbRepo, dbAnalysis);
    return res.json({ cached: false, repository: dbRepo, analysis: payload });

  } catch (error) {
    console.error('Analysis Pipeline Error:', error);
    return res.status(500).json({
      error: 'Analysis Error',
      message: error.message || 'Failed to process repository history'
    });
  }
}

export async function getAnalysisByRepo(req, res) {
  const { owner, repo } = req.params;
  const fullName = `${owner}/${repo}`.toLowerCase();

  try {
    const dbRepo = await prisma.repository.findUnique({
      where: { fullName },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            storyArcs: {
              include: { commits: true }
            }
          }
        }
      }
    });

    if (!dbRepo || dbRepo.analyses.length === 0) {
      // Trigger instant dynamic fetch if not yet in DB
      req.body = { repoUrl: `https://github.com/${owner}/${repo}` };
      return analyzeRepository(req, res);
    }

    const payload = formatAnalysisPayload(dbRepo, dbRepo.analyses[0]);
    return res.json({ cached: true, repository: dbRepo, analysis: payload });
  } catch (error) {
    console.error('Get Analysis Error:', error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
}

export async function exportMarkdownReport(req, res) {
  const { owner, repo } = req.params;
  const fullName = `${owner}/${repo}`.toLowerCase();

  try {
    const dbRepo = await prisma.repository.findUnique({
      where: { fullName },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: { storyArcs: { include: { commits: true } } }
        }
      }
    });

    if (!dbRepo || dbRepo.analyses.length === 0) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    const analysis = dbRepo.analyses[0];
    let markdown = `# GitLore Architectural Exhibit: ${dbRepo.fullName}\n\n`;
    markdown += `> ${dbRepo.description || 'Architectural timeline report.'}\n\n`;
    markdown += `### Repository Stats\n`;
    markdown += `- **Total Commits Analyzed**: ${analysis.totalCommits}\n`;
    markdown += `- **Active Period**: ${analysis.activePeriod}\n`;
    markdown += `- **Contributors Count**: ${analysis.contributorsCount}\n`;
    markdown += `- **Lines Changed**: ${analysis.linesChanged}\n\n`;
    markdown += `---\n\n## Story Arcs\n\n`;

    analysis.storyArcs.forEach(arc => {
      const proseList = typeof arc.prose === 'string' ? JSON.parse(arc.prose) : arc.prose;
      markdown += `### ${arc.title} (${arc.dateRange})\n\n`;
      if (Array.isArray(proseList)) {
        proseList.forEach(p => markdown += `${p}\n\n`);
      }
      if (arc.aiInsight) {
        markdown += `> **AI Insight**: "${arc.aiInsight}"\n\n`;
      }
      markdown += `#### Key Commits\n`;
      arc.commits.forEach(c => {
        markdown += `- \`${c.sha}\` ${c.message} (*${c.authorName}*)\n`;
      });
      markdown += `\n---\n\n`;
    });

    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="${owner}_${repo}_gitlore_exhibit.md"`);
    return res.send(markdown);
  } catch (error) {
    console.error('Export Error:', error.message);
    return res.status(500).json({ error: 'Export failed' });
  }
}

export async function getUserAnalyses(req, res) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const userAnalyses = await prisma.analysis.findMany({
      where: { userId: req.session.userId },
      orderBy: { createdAt: 'desc' },
      include: { repository: true }
    });

    return res.json({ analyses: userAnalyses });
  } catch (error) {
    console.error('User Analyses Error:', error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
}

function formatAnalysisPayload(dbRepo, dbAnalysis) {
  const barcodeData = typeof dbAnalysis.barcodeData === 'string' ? JSON.parse(dbAnalysis.barcodeData) : dbAnalysis.barcodeData;
  const keyArchitects = typeof dbAnalysis.keyArchitects === 'string' ? JSON.parse(dbAnalysis.keyArchitects) : dbAnalysis.keyArchitects;

  const storyArcs = dbAnalysis.storyArcs.map(arc => ({
    id: arc.id,
    arcIndex: arc.arcIndex,
    title: arc.title,
    dateRange: arc.dateRange,
    duration: arc.duration,
    prose: typeof arc.prose === 'string' ? JSON.parse(arc.prose) : arc.prose,
    aiInsight: arc.aiInsight,
    commits: arc.commits.map(c => ({
      sha: c.sha,
      message: c.message,
      authorName: c.authorName,
      authorAvatar: c.authorAvatar,
      isHighlight: c.isHighlight,
      hasErrorDot: c.hasErrorDot
    }))
  }));

  return {
    id: dbAnalysis.id,
    owner: dbRepo.owner,
    repo: dbRepo.name,
    fullName: dbRepo.fullName,
    description: dbRepo.description,
    stars: dbRepo.stars,
    forks: dbRepo.forks,
    totalCommits: dbAnalysis.totalCommits,
    activePeriod: dbAnalysis.activePeriod,
    contributorsCount: dbAnalysis.contributorsCount,
    linesChanged: dbAnalysis.linesChanged,
    barcodeData,
    keyArchitects,
    storyArcs
  };
}
