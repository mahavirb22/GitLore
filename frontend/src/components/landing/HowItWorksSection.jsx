import React from 'react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: 'link',
      title: 'Paste Repo',
      description: 'Connect any public Git repository. We parse the commit history, issues, and pull requests directly from the source.'
    },
    {
      num: '02',
      icon: 'psychology',
      title: 'AI Narrates',
      description: 'Our models analyze code diffs to construct a human-readable narrative of architectural shifts and technical debt.'
    },
    {
      num: '03',
      icon: 'explore',
      title: 'Explore Timeline',
      description: "Navigate a curated exhibit of your project's history. Share insights with your team or use it for onboarding."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 border-b border-outline-variant/20 bg-surface-container-low">
      <div className="px-margin-mobile md:px-margin-page">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-label-caps text-on-surface-variant tracking-widest uppercase">
            The Process
          </span>
          <div className="h-[1px] flex-grow bg-outline-variant/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`group relative px-6 py-8 border-l-4 border-transparent hover:border-on-tertiary-container hover:bg-surface transition-all duration-300 border-b md:border-b-0 border-outline-variant/20 ${
                idx < steps.length - 1 ? 'md:border-r' : ''
              }`}
            >
              <span className="absolute top-4 right-4 font-label-caps text-outline-variant group-hover:text-on-tertiary-container transition-colors text-xl">
                {step.num}
              </span>
              <div className="mb-6 w-12 h-12 flex items-center justify-center border border-primary text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              <h3 className="font-headline-md text-primary mb-3">{step.title}</h3>
              <p className="font-body-md text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
