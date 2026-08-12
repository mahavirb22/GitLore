import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoRepos = [
  {
    owner: 'facebook',
    name: 'react',
    fullName: 'facebook/react',
    description: 'The library for web and native user interfaces.',
    stars: 231000,
    forks: 462000,
    openIssues: 850,
    stats: {
      totalCommits: 1402,
      activePeriod: '10y',
      contributorsCount: 1402,
      linesChanged: '2.4M'
    },
    keyArchitects: [
      { name: 'Dan Abramov', role: 'Hooks / Redux' },
      { name: 'Sebastian Markbåge', role: 'Core Architecture' },
      { name: 'Sophie Alpert', role: 'Performance / Hooks' }
    ],
    storyArcs: [
      {
        arcIndex: 0,
        title: 'The Hooks Revolution',
        dateRange: 'Oct 2018 - Feb 2019',
        duration: '4:12',
        prose: [
          'React 16.8 introduced Hooks, fundamentally changing how developers write components. Instead of relying on complex class lifecycles and higher-order components, Hooks allowed state and side effects to be extracted and reused easily.',
          'The initial conceptual PR sparked a massive shift in the ecosystem, leading to the gradual deprecation of class components and a new functional paradigm.'
        ],
        aiInsight: 'This cluster of commits represents the highest density of architectural discussion in the repository\'s history, spanning 450+ review comments over three weeks.',
        commits: [
          { sha: 'a8c1f9', message: 'Initial Hooks implementation', authorName: 'Dan Abramov', additions: 450, deletions: 120, isHighlight: true, hasErrorDot: false },
          { sha: 'b2e4d1', message: 'Add useState hook primitive', authorName: 'Sebastian Markbåge', additions: 180, deletions: 20, isHighlight: false, hasErrorDot: false },
          { sha: 'f91a2c', message: 'Add useEffect lifecycle primitive', authorName: 'Dan Abramov', additions: 240, deletions: 45, isHighlight: false, hasErrorDot: true }
        ]
      },
      {
        arcIndex: 1,
        title: 'Concurrent Mode Era',
        dateRange: 'May 2019 - Aug 2021',
        duration: '3:45',
        prose: [
          'Moving away from synchronous rendering, the core team began experimenting with interrupting rendering work to prioritize user interactions. This was a monumental internal rewrite.',
          'Suspense boundaries and prioritized scheduling allowed fluid rendering even during heavy CPU load.'
        ],
        aiInsight: 'Fiber scheduler architecture rewrite enabling non-blocking render trees across complex web applications.',
        commits: [
          { sha: 'c3f19a', message: 'Fiber scheduler rewrite for prioritized lanes', authorName: 'Sebastian Markbåge', additions: 890, deletions: 410, isHighlight: true, hasErrorDot: false },
          { sha: 'd11f2b', message: 'Suspense boundaries fallback resolution', authorName: 'Andrew Clark', additions: 320, deletions: 80, isHighlight: false, hasErrorDot: false }
        ]
      },
      {
        arcIndex: 2,
        title: 'Server Components & Actions',
        dateRange: 'Dec 2020 - Present',
        duration: '4:50',
        prose: [
          'React Server Components bridged the gap between client and server, allowing zero-bundle-size components to execute natively on server environments.',
          'This fundamental paradigm evolution introduced automatic code splitting and direct database streaming.'
        ],
        aiInsight: 'First major paradigm shift combining server-side rendering execution with client hydration graphs.',
        commits: [
          { sha: 'e5f2a1', message: 'Introduce React Server Components transform', authorName: 'Sebastian Markbåge', additions: 1200, deletions: 300, isHighlight: true, hasErrorDot: false },
          { sha: 'f6b3c2', message: 'Server Actions async data mutations', authorName: 'Laurii', additions: 650, deletions: 110, isHighlight: false, hasErrorDot: false }
        ]
      }
    ]
  },
  {
    owner: 'expressjs',
    name: 'express',
    fullName: 'expressjs/express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    stars: 65000,
    forks: 16000,
    openIssues: 120,
    stats: {
      totalCommits: 5800,
      activePeriod: '13y',
      contributorsCount: 312,
      linesChanged: '1.1M'
    },
    keyArchitects: [
      { name: 'TJ Holowaychuk', role: 'Creator & Initial Framework' },
      { name: 'Douglas Christopher Wilson', role: 'Maintainer & Router' }
    ],
    storyArcs: [
      {
        arcIndex: 0,
        title: 'The Connect Middleware Architecture',
        dateRange: 'Jan 2010 - Nov 2012',
        duration: '3:15',
        prose: [
          'Express began as a lightweight wrapper on top of Connect middleware, introducing clean request routing and template engine resolution.',
          'TJ Holowaychuk pioneered the simple function signature app.use((req, res, next) => ...) that became the standard for Node HTTP servers.'
        ],
        aiInsight: 'Established the canonical middleware pipeline pattern used across millions of Node.js applications worldwide.',
        commits: [
          { sha: '1a2b3c', message: 'Initial Express HTTP layer abstraction', authorName: 'TJ Holowaychuk', additions: 600, deletions: 50, isHighlight: true, hasErrorDot: false },
          { sha: '4d5e6f', message: 'Add router stack layer dispatching', authorName: 'TJ Holowaychuk', additions: 350, deletions: 40, isHighlight: false, hasErrorDot: false }
        ]
      }
    ]
  }
];

async function seed() {
  console.log('Seeding pre-analyzed demo exhibits for GitLore...');

  for (const repoData of demoRepos) {
    const dbRepo = await prisma.repository.upsert({
      where: { fullName: repoData.fullName },
      update: {
        stars: repoData.stars,
        forks: repoData.forks,
        openIssues: repoData.openIssues,
        description: repoData.description
      },
      create: {
        owner: repoData.owner,
        name: repoData.name,
        fullName: repoData.fullName,
        description: repoData.description,
        stars: repoData.stars,
        forks: repoData.forks,
        openIssues: repoData.openIssues,
        defaultBranch: 'main'
      }
    });

    const barcodeData = Array.from({ length: 18 }, () => ({
      height: `${Math.floor(Math.random() * 70) + 15}%`,
      isSpike: Math.random() > 0.8
    }));

    // Delete previous existing demo analysis if present
    await prisma.analysis.deleteMany({ where: { repositoryId: dbRepo.id } });

    await prisma.analysis.create({
      data: {
        repositoryId: dbRepo.id,
        totalCommits: repoData.stats.totalCommits,
        activePeriod: repoData.stats.activePeriod,
        contributorsCount: repoData.stats.contributorsCount,
        linesChanged: repoData.stats.linesChanged,
        barcodeData: JSON.stringify(barcodeData),
        keyArchitects: JSON.stringify(repoData.keyArchitects),
        status: 'completed',
        storyArcs: {
          create: repoData.storyArcs.map(arc => ({
            arcIndex: arc.arcIndex,
            title: arc.title,
            dateRange: arc.dateRange,
            duration: arc.duration,
            prose: JSON.stringify(arc.prose),
            aiInsight: arc.aiInsight,
            commits: {
              create: arc.commits.map(c => ({
                sha: c.sha,
                message: c.message,
                authorName: c.authorName,
                committedAt: new Date(),
                additions: c.additions,
                deletions: c.deletions,
                isHighlight: c.isHighlight,
                hasErrorDot: c.hasErrorDot
              }))
            }
          }))
        }
      }
    });

    console.log(`Pre-cached demo exhibit: ${repoData.fullName}`);
  }

  console.log('Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
