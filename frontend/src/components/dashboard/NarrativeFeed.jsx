import React from 'react';
import ArcBlock from './ArcBlock';
import SectionDivider from '../common/SectionDivider';

export default function NarrativeFeed() {
  const blocks = [
    {
      id: '01',
      title: 'The Hooks Revolution',
      date: 'Oct 25, 2018',
      duration: '4:12',
      prose: [
        'React 16.8 introduced Hooks, fundamentally changing how developers write components. Instead of relying on complex class lifecycles and higher-order components, Hooks allowed state and side effects to be extracted and reused easily.',
        'The initial conceptual PR sparked a massive shift in the ecosystem, leading to the gradual deprecation of class components and a new functional paradigm.'
      ],
      commits: [
        { hash: 'a8c1f9', message: 'Initial Hooks implementation', isHighlight: true },
        { hash: 'b2e4d1', message: 'Add useState', isHighlight: false },
        { hash: 'f91a2c', message: 'Add useEffect', isHighlight: false }
      ],
      aiInsight: 'This cluster of commits represents the highest density of architectural discussion in the repository\'s history, spanning 450+ review comments over three weeks.'
    },
    {
      id: '02',
      title: 'Concurrent Mode Era',
      date: 'May 12, 2019',
      duration: '3:45',
      prose: [
        'Moving away from synchronous rendering, the core team began experimenting with interrupting rendering work to prioritize user interactions. This was a monumental internal rewrite.'
      ],
      commits: [
        { hash: 'c3f19a', message: 'Fiber scheduler rewrite', isHighlight: true },
        { hash: 'd11f2b', message: 'Suspense boundaries', isHighlight: false }
      ],
      showAudioPlayer: false
    }
  ];

  return (
    <section className="col-span-1 md:col-span-6 border-r border-on-surface/10 min-h-screen relative pl-4 md:pl-8 pr-4 md:pr-gutter pb-32">
      {/* Vertical Spine */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-on-surface/10 z-0 hidden md:block" />

      {/* Feed Container */}
      <div className="relative z-10 pt-12 md:pl-8">
        <ArcBlock {...blocks[0]} />

        {/* Timeline Section Divider */}
        <SectionDivider label="Late 2019" className="hidden md:flex" />

        <div className="mt-12 md:mt-0">
          <ArcBlock {...blocks[1]} isLast />
        </div>
      </div>
    </section>
  );
}
