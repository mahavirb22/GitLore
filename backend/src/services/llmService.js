import axios from 'axios';
import { config } from '../config/index.js';

export async function generateStoryArcNarrative(repoFullName, rawArcs) {
  if (!config.openRouter.apiKey) {
    console.log('No OpenRouter API Key provided. Using intelligent narrative generator...');
    return generateFallbackNarratives(repoFullName, rawArcs);
  }

  try {
    const prompt = `You are a chief software archivist at an architectural museum for code.
Analyze the following commit clusters for repository "${repoFullName}" and generate museum exhibit narrations for each cluster.

Commit Clusters:
${JSON.stringify(rawArcs.map(a => ({
  arcIndex: a.arcIndex,
  dateRange: a.dateRange,
  commitMessages: a.commits.map(c => c.message)
})), null, 2)}

Return ONLY valid JSON matching this format:
[
  {
    "arcIndex": 0,
    "title": "Short Punchy Title (3-5 words)",
    "prose": [
      "First paragraph describing the architectural shift and engineering context.",
      "Second paragraph explaining technical debt or design decisions."
    ],
    "aiInsight": "Single sentence museum placard insight summarizing density or importance."
  }
]`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${config.openRouter.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (content) {
      const parsed = JSON.parse(content);
      const narratives = Array.isArray(parsed) ? parsed : (parsed.narration || parsed.arcs || []);
      return mergeNarrativesWithArcs(rawArcs, narratives);
    }
  } catch (error) {
    console.warn('OpenRouter API call failed or timed out:', error.message);
  }

  return generateFallbackNarratives(repoFullName, rawArcs);
}

function mergeNarrativesWithArcs(rawArcs, narratives) {
  return rawArcs.map((arc, idx) => {
    const matched = narratives.find(n => n.arcIndex === arc.arcIndex) || narratives[idx] || {};
    return {
      ...arc,
      title: matched.title || getDefaultTitle(idx, arc),
      prose: matched.prose || getDefaultProse(arc),
      aiInsight: matched.aiInsight || getDefaultInsight(arc),
      duration: '4:12'
    };
  });
}

function generateFallbackNarratives(repoFullName, rawArcs) {
  const titles = [
    'The Architectural Genesis',
    'Core Refactoring Storm',
    'Production Hardening & Optimization',
    'Ecosystem Expansion'
  ];

  return rawArcs.map((arc, idx) => {
    const topCommit = arc.commits[0]?.message || 'Core repository updates';
    const title = titles[idx % titles.length] || `Architectural Phase ${idx + 1}`;

    const prose = [
      `During this epoch of ${repoFullName}, engineers focused heavily on structural transformation. Key commits like "${topCommit}" established foundational conventions that reshaped component composition.`,
      `This cluster represents critical iterations where technical debt was systematically addressed, resulting in improved maintainability and performance across core modules.`
    ];

    const aiInsight = `This cluster of ${arc.commits.length} commits represents a pivotal milestone in ${repoFullName}, reflecting high architectural velocity and collaborative review density.`;

    return {
      ...arc,
      title,
      prose,
      aiInsight,
      duration: `${3 + idx}:${12 + idx * 5}`
    };
  });
}

function getDefaultTitle(idx, arc) {
  const sampleMsg = arc.commits[0]?.message || 'Refactor';
  return `${sampleMsg.substring(0, 30)}`;
}

function getDefaultProse(arc) {
  return [
    `Engineers executed a series of targeted commits across ${arc.dateRange}.`,
    `Focus areas centered around performance optimizations and architectural consistency.`
  ];
}

function getDefaultInsight(arc) {
  return `High-impact engineering phase comprising ${arc.commits.length} verified commits.`;
}
