import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMark from '../components/common/LogoMark';
import ArcSidebar from '../components/dashboard/ArcSidebar';
import NarrativeFeed from '../components/dashboard/NarrativeFeed';
import RepoPulsePanel from '../components/dashboard/RepoPulsePanel';

export default function RepoAnalysisPage() {
  const [activeArcIndex, setActiveArcIndex] = useState(0);

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
              facebook / react
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-on-surface/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8402C]" />
              <span className="font-label-caps text-[10px] uppercase tracking-tighter text-on-surface-variant">
                247 commits analyzed
              </span>
            </div>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 mr-6">
              <a
                href="#export"
                className="transition-colors text-primary font-bold font-label-caps"
              >
                Export Story
              </a>
              <a
                href="#share"
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Share
              </a>
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
            />
            <NarrativeFeed />
            <RepoPulsePanel />
          </div>
        </div>
      </main>
    </div>
  );
}
