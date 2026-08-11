import React from 'react';

export default function ArcSidebar({ activeArcIndex = 0, onSelectArc }) {
  const storyArcs = [
    {
      id: '01',
      title: 'The Hooks Revolution',
      date: 'Oct 2018 - Feb 2019'
    },
    {
      id: '02',
      title: 'Concurrent Mode Era',
      date: 'May 2019 - Aug 2021'
    },
    {
      id: '03',
      title: 'Server Components',
      date: 'Dec 2020 - Present'
    }
  ];

  return (
    <aside className="hidden md:block col-span-3 h-full border-r border-on-surface/10 pr-gutter pt-8 sticky top-16 overflow-y-auto">
      <div className="mb-12">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-6 uppercase tracking-widest">
          Story Arcs
        </h3>
        <nav className="space-y-0">
          {storyArcs.map((arc, index) => {
            const isActive = index === activeArcIndex;
            return (
              <a
                key={arc.id}
                href={`#arc-${arc.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectArc) onSelectArc(index);
                }}
                className="block py-4 border-b border-on-surface/10 group relative transition-colors"
              >
                {isActive && (
                  <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D8402C]" />
                )}
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">
                    {arc.id}
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
                  {arc.date}
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
