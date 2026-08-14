import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LogoMark from '../components/common/LogoMark';
import ArcSidebar from '../components/dashboard/ArcSidebar';
import NarrativeFeed from '../components/dashboard/NarrativeFeed';
import RepoPulsePanel from '../components/dashboard/RepoPulsePanel';
import CommitDiffModal from '../components/dashboard/CommitDiffModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function RepoAnalysisPage() {
  const [searchParams] = useSearchParams();
  const [activeArcIndex, setActiveArcIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const ownerParam = searchParams.get('owner') || 'facebook';
  const repoParam = searchParams.get('repo') || 'react';
  const urlParam = searchParams.get('url');

  useEffect(() => {
    async function fetchAnalysis() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        let endpoint = `${API_BASE_URL}/api/analyze/${ownerParam}/${repoParam}`;
        if (urlParam) {
          const res = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ repoUrl: urlParam })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to fetch analysis');
          setAnalysisData(data.analysis);
          setIsLoading(false);
          return;
        }

        const res = await fetch(endpoint, { credentials: 'include' });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch analysis');
        }

        setAnalysisData(data.analysis);
      } catch (err) {
        console.error('Fetch analysis error:', err);
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalysis();
  }, [ownerParam, repoParam, urlParam]);

  const handleExportMarkdown = () => {
    if (analysisData) {
      window.location.href = `${API_BASE_URL}/api/analyze/${analysisData.owner}/${analysisData.repo}/export`;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent animate-spin rounded-full mb-6" />
        <span className="font-label-caps text-on-surface uppercase tracking-widest">
          Loading Architectural Exhibit...
        </span>
      </div>
    );
  }

  if (errorMsg || !analysisData) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center p-6">
        <div className="border border-error p-8 max-w-md bg-error-container/10 text-center">
          <h2 className="font-headline-md text-error mb-2">Exhibit Loading Error</h2>
          <p className="font-body-md text-on-surface-variant mb-6">{errorMsg || 'Could not load analysis'}</p>
          <Link to="/" className="font-label-caps uppercase border border-primary px-6 py-2 bg-primary text-on-primary">
            Return to Explorer
          </Link>
        </div>
      </div>
    );
  }

  // Filter story arcs if user enters a search query
  const filteredArcs = searchQuery.trim()
    ? analysisData.storyArcs.filter(arc =>
        arc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arc.prose.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        arc.commits.some(c => c.message.toLowerCase().includes(searchQuery.toLowerCase()) || c.sha.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : analysisData.storyArcs;

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-on-surface/10">
        <div className="h-16 w-full px-margin-mobile md:px-margin-page flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <LogoMark className="h-8 w-auto object-contain" />
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hidden sm:inline">
              GitLore
            </span>
          </Link>

          {/* Center Repo Identifier Pill */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4">
            <span className="font-headline-md text-body-md sm:text-body-lg font-bold text-on-surface">
              {analysisData.owner} / {analysisData.repo}
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-on-surface/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8402C]" />
              <span className="font-label-caps text-[10px] uppercase tracking-tighter text-on-surface-variant">
                {analysisData.totalCommits} commits analyzed
              </span>
            </div>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 mr-6">
              <button
                onClick={handleExportMarkdown}
                className="transition-colors text-primary font-bold font-label-caps uppercase cursor-pointer hover:underline text-xs"
              >
                Export Story
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Exhibit URL copied to clipboard!');
                }}
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase cursor-pointer text-xs"
              >
                Share
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter exhibit..."
                  className="bg-surface-container-low border border-outline-variant/30 px-3 py-1 text-xs font-body-md focus:outline-none focus:border-primary pr-8 rounded-none"
                />
                <span className="material-symbols-outlined text-outline-variant text-[16px] absolute right-2 top-1/2 -translate-y-1/2">
                  search
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="w-full pt-16 min-h-screen">
        <div className="flex flex-col w-full h-full relative font-body-md bg-surface text-on-surface">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:px-margin-page h-full relative">
            <ArcSidebar
              activeArcIndex={activeArcIndex}
              onSelectArc={(index) => setActiveArcIndex(index)}
              storyArcs={filteredArcs}
            />
            <NarrativeFeed
              storyArcs={filteredArcs}
              onSelectCommit={(commit) => setSelectedCommit(commit)}
            />
            <RepoPulsePanel
              stats={{
                contributorsCount: analysisData.contributorsCount,
                activePeriod: analysisData.activePeriod,
                linesChanged: analysisData.linesChanged
              }}
              barcodeData={analysisData.barcodeData}
              keyArchitects={analysisData.keyArchitects}
            />
          </div>
        </div>
      </main>

      {/* Commit Diff Modal */}
      <CommitDiffModal
        commit={selectedCommit}
        repoOwner={analysisData.owner}
        repoName={analysisData.repo}
        onClose={() => setSelectedCommit(null)}
      />
    </div>
  );
}
