import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedTimelineSection() {
  const navigate = useNavigate();

  const exhibits = [
    {
      version: 'v16.8',
      date: 'Feb 16, 2019',
      title: 'The Hooks Revolution',
      description: 'React introduces Hooks, shifting the paradigm from class components to functional composition, fundamentally altering state management.',
      bgColor: 'bg-[#F2EDE4]',
      renderArt: () => (
        <>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
          <div className="w-16 h-16 bg-on-tertiary-container rounded-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
        </>
      )
    },
    {
      version: 'v3.0',
      date: 'May 23, 2018',
      title: 'Webpack Split Chunks',
      description: 'A dramatic restructuring of the dependency graph compilation, enabling massive performance gains for modern web applications.',
      bgColor: 'bg-[#EAE8EB]',
      renderArt: () => (
        <>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)]" />
          <div className="w-24 h-12 bg-primary mix-blend-multiply group-hover:rotate-12 transition-transform duration-500" />
        </>
      )
    },
    {
      version: 'v1.0',
      date: 'Nov 18, 2021',
      title: 'Remix Open Source',
      description: 'The initial public release, bringing server-side rendering patterns back to the forefront with nested routing architecture.',
      bgColor: 'bg-[#E2E8E4]',
      renderArt: () => (
        <>
          <svg className="w-full h-full absolute inset-0 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L50,0 L100,100 Z" fill="currentColor" className="text-primary" />
          </svg>
          <div className="w-16 h-16 border-4 border-on-tertiary-container rounded-full group-hover:scale-90 transition-transform duration-500" />
        </>
      )
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 border-b border-outline-variant/20 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 border border-outline-variant/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 border border-outline-variant/10 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="px-margin-mobile md:px-margin-page mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <h2 className="font-headline-lg text-primary mb-2">Architectural Arcs</h2>
          <p className="font-body-lg text-on-surface-variant max-w-[500px]">
            Key moments in open-source history, preserved as interactive exhibits.
          </p>
        </div>
        <button
          onClick={() => navigate('/analysis')}
          className="shrink-0 font-label-caps uppercase border border-primary px-6 py-3 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
        >
          View All Exhibits
        </button>
      </div>

      {/* Horizontal Scrollable Timeline Strip */}
      <div className="w-full overflow-x-auto pb-8 hide-scrollbar pl-margin-mobile md:pl-margin-page relative z-10">
        <div className="flex gap-0 min-w-max border-t border-b border-outline-variant/20">
          {exhibits.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate('/analysis')}
              className="w-[320px] sm:w-[400px] border-r border-outline-variant/20 group hover:bg-surface-container-low transition-colors cursor-pointer flex flex-col"
            >
              <div className={`p-6 border-b border-outline-variant/20 h-[200px] flex items-center justify-center relative overflow-hidden ${item.bgColor}`}>
                {item.renderArt()}
                <div className="absolute top-4 left-4 font-label-caps text-primary bg-surface/80 px-2 py-1 backdrop-blur-sm">
                  {item.version}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-sm font-label-caps text-outline-variant mb-2">
                    {item.date}
                  </div>
                  <h3 className="font-headline-md text-primary mb-3 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-on-tertiary-container opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-label-caps uppercase">Enter Exhibit</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}

          {/* End Arrow Card */}
          <div
            onClick={() => navigate('/analysis')}
            className="w-[100px] flex items-center justify-center bg-surface-variant/20 hover:bg-surface-variant/40 transition-colors cursor-pointer border-r border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-outline-variant text-[28px]">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
