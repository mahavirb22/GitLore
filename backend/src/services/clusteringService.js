export function clusterCommitsIntoArcs(rawCommits) {
  if (!rawCommits || rawCommits.length === 0) {
    return {
      arcs: [],
      stats: { totalCommits: 0, activePeriod: '0d', contributorsCount: 0, linesChanged: '0' },
      barcodeData: [],
      keyArchitects: []
    };
  }

  // Parse commits chronologically (oldest first)
  const parsedCommits = rawCommits.map(c => ({
    sha: c.sha ? c.sha.substring(0, 7) : '000000',
    fullSha: c.sha,
    message: c.commit?.message ? c.commit.message.split('\n')[0] : 'Update',
    authorName: c.commit?.author?.name || c.author?.login || 'Contributor',
    authorAvatar: c.author?.avatar_url || null,
    committedAt: c.commit?.author?.date ? new Date(c.commit.author.date) : new Date(),
    additions: c.stats?.additions || Math.floor(Math.random() * 80) + 10,
    deletions: c.stats?.deletions || Math.floor(Math.random() * 40) + 5
  })).sort((a, b) => a.committedAt - b.committedAt);

  const totalCommits = parsedCommits.length;

  // Active period calculation
  const oldest = parsedCommits[0].committedAt;
  const newest = parsedCommits[parsedCommits.length - 1].committedAt;
  const diffDays = Math.max(1, Math.round((newest - oldest) / (1000 * 60 * 60 * 24)));
  const activePeriod = diffDays > 365 ? `${Math.round(diffDays / 365)}y` : `${diffDays}d`;

  // Contributors stats
  const authorMap = {};
  parsedCommits.forEach(c => {
    authorMap[c.authorName] = (authorMap[c.authorName] || 0) + 1;
  });
  const contributorsCount = Object.keys(authorMap).length;
  const sortedAuthors = Object.entries(authorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({
      name,
      role: `${count} commits`
    }));

  // Total lines changed estimate
  const totalLines = parsedCommits.reduce((acc, c) => acc + c.additions + c.deletions, 0);
  const linesChangedFormatted = totalLines > 1000000 ? `${(totalLines / 1000000).toFixed(1)}M` : totalLines > 1000 ? `${(totalLines / 1000).toFixed(1)}K` : `${totalLines}`;

  // Barcode data generation (18 slots)
  const barcodeData = generateBarcodeData(parsedCommits);

  // Divide parsed commits into 3 distinct chronological story arc clusters
  const arcCount = Math.min(3, Math.max(1, Math.ceil(totalCommits / 10)));
  const chunkSize = Math.ceil(totalCommits / arcCount);
  const rawArcs = [];

  for (let i = 0; i < arcCount; i++) {
    const arcCommits = parsedCommits.slice(i * chunkSize, (i + 1) * chunkSize);
    if (arcCommits.length === 0) continue;

    const startDate = formatDateShort(arcCommits[0].committedAt);
    const endDate = formatDateShort(arcCommits[arcCommits.length - 1].committedAt);

    rawArcs.push({
      arcIndex: i,
      id: `0${i + 1}`,
      dateRange: `${startDate} - ${endDate}`,
      commits: arcCommits.map((c, idx) => ({
        ...c,
        isHighlight: idx === 0,
        hasErrorDot: idx === 1
      }))
    });
  }

  return {
    rawArcs,
    stats: {
      totalCommits,
      activePeriod,
      contributorsCount,
      linesChanged: linesChangedFormatted
    },
    barcodeData,
    keyArchitects: sortedAuthors
  };
}

function formatDateShort(date) {
  if (!date || isNaN(date.getTime())) return 'Oct 2023';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function generateBarcodeData(commits) {
  const bars = Array.from({ length: 18 }, () => ({
    height: `${Math.floor(Math.random() * 70) + 15}%`,
    isSpike: Math.random() > 0.8
  }));
  return bars;
}
