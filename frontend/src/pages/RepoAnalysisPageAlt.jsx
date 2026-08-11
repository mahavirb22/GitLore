import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMark from '../components/common/LogoMark';

export default function RepoAnalysisPageAlt() {
  const [activeChip, setActiveChip] = useState(0);
  const [playingNarrativeId, setPlayingNarrativeId] = useState(null);

  const chips = [
    { num: '01', label: 'INITIAL_COMMIT' },
    { num: '02', label: 'REFACTOR_STORM' },
    { num: '03', label: 'PRODUCTION_READY' },
  ];

  const feedItems = [
    {
      id: 1,
      date: 'OCT 24, 2023 • 14 COMMITS',
      title: 'The Great Hook Migration',
      description: 'A massive shift away from class components. The team struggles initially with useEffect dependencies, leading to a frantic series of hotfixes over three days before stability is reached.',
      commits: [
        { hash: 'a1b2c3d', hasDot: true, dotColor: 'bg-error' },
        { hash: 'f4e5d6c' },
        { hash: '9a8b7c6' },
      ],
      moreCount: 11
    },
    {
      id: 2,
      date: 'NOV 02, 2023 • 8 COMMITS',
      title: 'State Management Crisis',
      description: 'Context API proved insufficient for the growing data layer. Redux Toolkit is introduced. This arc highlights the meticulous planning by lead dev @sarahj before execution.',
      commits: [
        { hash: 'x9y8z7w' },
        { hash: 'v6u5t4s', hasDot: true, dotColor: 'bg-secondary' },
      ],
      moreCount: 6
    }
  ];

  const togglePlay = (id) => {
    setPlayingNarrativeId(playingNarrativeId === id ? null : id);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-14 px-margin-mobile flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Link to="/">
              <LogoMark className="h-8 w-auto object-contain" />
            </Link>
            <div className="flex flex-col truncate">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                Timeline
              </span>
              <span className="font-mono-sm text-mono-sm font-bold text-on-surface truncate">
                facebook / react
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-11 h-11 flex items-center justify-center text-on-surface hover:bg-surface-container rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="w-11 h-11 flex items-center justify-center text-on-surface hover:bg-surface-container rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">share</span>
            </button>
            <div className="ml-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative pt-14 pb-20 min-h-screen bg-surface">
        <div className="flex flex-col w-full bg-surface-bright pb-20">
          {/* Narrative Arcs Scroller */}
          <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-3 px-margin-mobile py-4 border-b border-outline-variant/30 shrink-0">
            {chips.map((chip, idx) => {
              const isActive = activeChip === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveChip(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary border-primary active:scale-95'
                      : 'bg-surface text-on-surface border-outline-variant hover:bg-surface-container active:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`font-label-caps text-label-caps ${
                      isActive ? 'text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {chip.num}
                  </span>
                  <span className="font-mono-sm text-mono-sm">{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Narrative Feed */}
          <div className="flex flex-col w-full">
            {feedItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col px-margin-mobile py-8 border-b border-outline-variant/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono-sm text-mono-sm text-on-surface-variant uppercase tracking-wider">
                      {item.date}
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                      {item.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => togglePlay(item.id)}
                    aria-label="Play narrative"
                    className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:bg-surface-container-highest transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-[24px] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {playingNarrativeId === item.id ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-[1.6]">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.commits.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-center bg-surface-container px-3 py-1.5 rounded border border-outline-variant"
                    >
                      {c.hasDot && (
                        <span className={`w-2 h-2 rounded-full ${c.dotColor} mr-2`} />
                      )}
                      <span className="font-mono-sm text-mono-sm text-on-surface">
                        {c.hash}
                      </span>
                    </div>
                  ))}
                  {item.moreCount && (
                    <div className="flex items-center bg-surface-container px-3 py-1.5 rounded border border-outline-variant border-dashed">
                      <span className="font-mono-sm text-mono-sm text-on-surface-variant">
                        +{item.moreCount} more
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Repo Pulse / Stats Footer */}
          <div className="flex flex-col mt-auto border-t-[4px] border-primary">
            <div className="px-margin-mobile py-4 border-b border-outline-variant/30 bg-surface">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                REPO PULSE
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-surface">1,402</span>
                <span className="font-mono-sm text-mono-sm text-on-surface-variant">TOTAL COMMITS</span>
              </div>
            </div>

            <div className="px-margin-mobile py-4 border-b border-outline-variant/30 bg-surface">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                CONTRIBUTORS
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-surface">24</span>
                <span className="font-mono-sm text-mono-sm text-on-surface-variant">ACTIVE DEVS</span>
              </div>
            </div>

            <div className="px-margin-mobile py-6 bg-surface">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">
                ACTIVITY BARCODE
              </h3>
              <div aria-hidden="true" className="w-full h-12 flex items-end gap-[2px] opacity-80">
                <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <rect x="0" y="10" width="1.5" height="10" fill="currentColor" className="text-primary" />
                  <rect x="2" y="5" width="1.5" height="15" fill="currentColor" className="text-primary" />
                  <rect x="4" y="15" width="1.5" height="5" fill="currentColor" className="text-primary" />
                  <rect x="6" y="2" width="1.5" height="18" fill="currentColor" className="text-error" />
                  <rect x="8" y="8" width="1.5" height="12" fill="currentColor" className="text-primary" />
                  <rect x="10" y="12" width="1.5" height="8" fill="currentColor" className="text-primary" />
                  <rect x="12" y="4" width="1.5" height="16" fill="currentColor" className="text-primary" />
                  <rect x="14" y="0" width="1.5" height="20" fill="currentColor" className="text-error" />
                  <rect x="16" y="14" width="1.5" height="6" fill="currentColor" className="text-primary" />
                  <rect x="18" y="10" width="1.5" height="10" fill="currentColor" className="text-primary" />
                  <rect x="22" y="15" width="1.5" height="5" fill="currentColor" className="text-outline-variant" />
                  <rect x="24" y="15" width="1.5" height="5" fill="currentColor" className="text-outline-variant" />
                  <rect x="26" y="12" width="1.5" height="8" fill="currentColor" className="text-outline-variant" />
                  <rect x="30" y="8" width="1.5" height="12" fill="currentColor" className="text-primary" />
                  <rect x="32" y="6" width="1.5" height="14" fill="currentColor" className="text-primary" />
                  <rect x="34" y="2" width="1.5" height="18" fill="currentColor" className="text-error" />
                  <rect x="36" y="10" width="1.5" height="10" fill="currentColor" className="text-primary" />
                  <rect x="38" y="5" width="1.5" height="15" fill="currentColor" className="text-primary" />
                  <rect x="42" y="16" width="1.5" height="4" fill="currentColor" className="text-outline-variant" />
                  <rect x="44" y="18" width="1.5" height="2" fill="currentColor" className="text-outline-variant" />
                  <rect x="48" y="1" width="1.5" height="19" fill="currentColor" className="text-error" />
                  <rect x="50" y="4" width="1.5" height="16" fill="currentColor" className="text-primary" />
                  <rect x="52" y="8" width="1.5" height="12" fill="currentColor" className="text-primary" />
                  <rect x="54" y="12" width="1.5" height="8" fill="currentColor" className="text-primary" />
                  <rect x="56" y="2" width="1.5" height="18" fill="currentColor" className="text-primary" />
                  <rect x="58" y="10" width="1.5" height="10" fill="currentColor" className="text-primary" />
                  <rect x="62" y="14" width="1.5" height="6" fill="currentColor" className="text-outline-variant" />
                  <rect x="66" y="6" width="1.5" height="14" fill="currentColor" className="text-primary" />
                  <rect x="68" y="4" width="1.5" height="16" fill="currentColor" className="text-primary" />
                  <rect x="70" y="8" width="1.5" height="12" fill="currentColor" className="text-primary" />
                  <rect x="72" y="1" width="1.5" height="19" fill="currentColor" className="text-error" />
                  <rect x="74" y="12" width="1.5" height="8" fill="currentColor" className="text-primary" />
                  <rect x="76" y="5" width="1.5" height="15" fill="currentColor" className="text-primary" />
                  <rect x="78" y="15" width="1.5" height="5" fill="currentColor" className="text-primary" />
                  <rect x="82" y="18" width="1.5" height="2" fill="currentColor" className="text-outline-variant" />
                  <rect x="84" y="16" width="1.5" height="4" fill="currentColor" className="text-outline-variant" />
                  <rect x="86" y="14" width="1.5" height="6" fill="currentColor" className="text-outline-variant" />
                  <rect x="90" y="8" width="1.5" height="12" fill="currentColor" className="text-primary" />
                  <rect x="92" y="4" width="1.5" height="16" fill="currentColor" className="text-primary" />
                  <rect x="94" y="10" width="1.5" height="10" fill="currentColor" className="text-primary" />
                  <rect x="96" y="2" width="1.5" height="18" fill="currentColor" className="text-error" />
                  <rect x="98" y="6" width="1.5" height="14" fill="currentColor" className="text-primary" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-on-surface/10">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/analysis-alt"
            className="flex flex-col items-center justify-center w-full h-full transition-colors text-primary border-t-2 border-primary"
          >
            <span className="material-symbols-outlined text-[24px]">history</span>
            <span className="font-label-caps text-[10px] mt-1">TIMELINE</span>
          </Link>
          <a
            href="#branches"
            className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[24px]">fork_right</span>
            <span className="font-label-caps text-[10px] mt-1">BRANCHES</span>
          </a>
          <a
            href="#contributors"
            className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[24px]">groups</span>
            <span className="font-label-caps text-[10px] mt-1">LORE</span>
          </a>
          <a
            href="#settings"
            className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[24px]">settings</span>
            <span className="font-label-caps text-[10px] mt-1">CONFIG</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
