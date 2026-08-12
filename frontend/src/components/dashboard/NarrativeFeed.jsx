import React from 'react';
import ArcBlock from './ArcBlock';
import SectionDivider from '../common/SectionDivider';

export default function NarrativeFeed({ storyArcs = [] }) {
  const displayArcs = storyArcs.length > 0 ? storyArcs : [
    {
      id: '01',
      title: 'The Hooks Revolution',
      dateRange: 'Oct 25, 2018',
      duration: '4:12',
      prose: [
        'React 16.8 introduced Hooks, fundamentally changing how developers write components. Instead of relying on complex class lifecycles and higher-order components, Hooks allowed state and side effects to be extracted and reused easily.',
        'The initial conceptual PR sparked a massive shift in the ecosystem, leading to the gradual deprecation of class components and a new functional paradigm.'
      ],
      commits: [
        { sha: 'a8c1f9', message: 'Initial Hooks implementation', isHighlight: true },
        { sha: 'b2e4d1', message: 'Add useState', isHighlight: false },
        { sha: 'f91a2c', message: 'Add useEffect', isHighlight: false }
      ],
      aiInsight: 'This cluster of commits represents the highest density of architectural discussion in the repository\'s history, spanning 450+ review comments over three weeks.'
    },
    {
      id: '02',
      title: 'Concurrent Mode Era',
      dateRange: 'May 12, 2019',
      duration: '3:45',
      prose: [
        'Moving away from synchronous rendering, the core team began experimenting with interrupting rendering work to prioritize user interactions. This was a monumental internal rewrite.'
      ],
      commits: [
        { sha: 'c3f19a', message: 'Fiber scheduler rewrite', isHighlight: true },
        { sha: 'd11f2b', message: 'Suspense boundaries', isHighlight: false }
      ]
    }
  ];

  return (
    <section className="col-span-1 md:col-span-6 border-r border-on-surface/10 min-h-screen relative pl-4 md:pl-8 pr-4 md:pr-gutter pb-32">
      {/* Vertical Spine */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-on-surface/10 z-0 hidden md:block" />

      {/* Feed Container */}
      <div className="relative z-10 pt-12 md:pl-8">
        {displayArcs.map((arc, index) => (
          <React.Fragment key={arc.id || index}>
            {index > 0 && (
              <SectionDivider label={arc.dateRange || `Phase ${index + 1}`} className="hidden md:flex" />
            )}
            <div className={index > 0 ? "mt-12 md:mt-0" : ""}>
              <ArcBlock
                id={arc.id || index}
                title={arc.title}
                date={arc.dateRange}
                duration={arc.duration || '4:12'}
                prose={arc.prose}
                commits={arc.commits}
                aiInsight={arc.aiInsight}
                isLast={index === displayArcs.length - 1}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
