import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LogoMark from '../components/common/LogoMark';
import ArcSidebar from '../components/dashboard/ArcSidebar';
import NarrativeFeed from '../components/dashboard/NarrativeFeed';
import RepoPulsePanel from '../components/dashboard/RepoPulsePanel';

export default function RepoAnalysisPage() {
  const [searchParams] = useSearchParams();
  const [activeArcIndex, setActiveArcIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const ownerParam = searchParams.get('owner') || 'facebook';
  const repoParam = searchParams.get('repo') || 'react';
  const urlParam = searchParams.get('url');

  useEffect(() => {
    async function fetchAnalysis() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        let endpoint = `http://localhost:5000/api/analyze/${ownerParam}/${repoParam}`;
        if (urlParam) {
          const res = await fetch('http://localhost:5000/api/analyze', {
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
      window.location.href = `http://localhost:5000/api/analyze/${analysisData.owner}/${analysisData.repo}/export`;
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
                className="transition-colors text-primary font-bold font-label-caps uppercase cursor-pointer hover:underline"
              >
                Export Story
              </button>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase cursor-pointer"
              >
                Share
              </button>
            </nav>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface text-[20px]">
                search
              </span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
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
              storyArcs={analysisData.storyArcs}
            />
            <NarrativeFeed storyArcs={analysisData.storyArcs} />
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
    </div>
  );
}
