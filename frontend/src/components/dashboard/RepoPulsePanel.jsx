import React from 'react';
import CommitFrequencyChart from './CommitFrequencyChart';

export default function RepoPulsePanel({ stats = {}, barcodeData = [], keyArchitects = [] }) {
  const displayStats = {
    contributorsCount: stats.contributorsCount || '1,402',
    activePeriod: stats.activePeriod || '10y',
    linesChanged: stats.linesChanged || '2.4M'
  };

  const displayArchitects = keyArchitects.length > 0 ? keyArchitects : [
    { name: 'Dan Abramov', role: 'Hooks / Redux' },
    { name: 'Sebastian Markbåge', role: 'Core Architecture' },
    { name: 'Sophie Alpert', role: 'Performance / Hooks' }
  ];

  return (
    <aside className="col-span-1 md:col-span-3 h-full pl-gutter pt-8 sticky top-16 hidden md:block">
      <div className="mb-12">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-6 uppercase tracking-widest border-b border-on-surface/10 pb-2">
          Repo Pulse
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-12">
          <div>
            <div className="font-headline-xl text-4xl font-bold text-on-surface mb-1">
              {displayStats.contributorsCount}
            </div>
            <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
              Contributors
            </div>
          </div>
          <div>
            <div className="font-headline-xl text-4xl font-bold text-on-surface mb-1">
              {displayStats.activePeriod}
            </div>
            <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
              Active Period
            </div>
          </div>
          <div className="col-span-2">
            <div className="font-headline-xl text-4xl font-bold text-on-surface mb-1">
              {displayStats.linesChanged}
            </div>
            <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
              Lines Changed
            </div>
          </div>
        </div>

        {/* Barcode Chart */}
        <CommitFrequencyChart barcodeData={barcodeData} />

        {/* Key Architects */}
        <div>
          <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-4 uppercase tracking-widest border-b border-on-surface/10 pb-2">
            Key Architects
          </h4>
          <ul className="space-y-4">
            {displayArchitects.map((architect, idx) => (
              <li key={idx} className="flex flex-col">
                <span className="font-headline-md text-sm font-bold text-on-surface">
                  {architect.name}
                </span>
                <span className="font-label-caps text-[9px] text-on-surface-variant uppercase tracking-widest">
                  {architect.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
