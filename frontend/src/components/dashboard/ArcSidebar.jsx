import React from 'react';

export default function ArcSidebar({ activeArcIndex = 0, onSelectArc, storyArcs = [] }) {
  const displayArcs = storyArcs.length > 0 ? storyArcs : [
    { id: '01', title: 'The Hooks Revolution', dateRange: 'Oct 2018 - Feb 2019' },
    { id: '02', title: 'Concurrent Mode Era', dateRange: 'May 2019 - Aug 2021' },
    { id: '03', title: 'Server Components', dateRange: 'Dec 2020 - Present' }
  ];

  return (
    <aside className="hidden md:block col-span-3 h-full border-r border-on-surface/10 pr-gutter pt-8 sticky top-16 overflow-y-auto">
      <div className="mb-12">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-6 uppercase tracking-widest">
          Story Arcs
        </h3>
        <nav className="space-y-0">
          {displayArcs.map((arc, index) => {
            const isActive = index === activeArcIndex;
            const num = (index + 1).toString().padStart(2, '0');
            return (
              <a
                key={arc.id || index}
                href={`#arc-${arc.id || index}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectArc) onSelectArc(index);
                  const el = document.getElementById(`arc-${arc.id || index}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block py-4 border-b border-on-surface/10 group relative transition-colors"
              >
                {isActive && (
                  <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D8402C]" />
                )}
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">
                    {num}
                  </span>
                  <span
                    className={`font-headline-md text-[16px] font-bold transition-colors ${
                      isActive ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'
                    }`}
                  >
                    {arc.title}
                  </span>
                </div>
                <div className="pl-6 font-label-caps text-[10px] text-on-surface-variant">
                  {arc.dateRange || arc.date}
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
