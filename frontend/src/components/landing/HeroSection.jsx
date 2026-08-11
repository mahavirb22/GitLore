import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroAbstractGraphic from '../common/HeroAbstractGraphic';

export default function HeroSection() {
  const [repoUrl, setRepoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      navigate('/analysis');
    }
  };

  return (
    <section className="relative w-full border-b border-outline-variant/20 pt-8 md:pt-16 pb-16 md:pb-32 bg-surface">
      {/* Abstract Left Pagination (Desktop) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        <div className="w-1.5 h-1.5 bg-outline-variant/40 rounded-full" />
        <div className="w-1.5 h-1.5 bg-outline-variant/40 rounded-full" />
      </div>

      <div className="px-margin-mobile md:px-margin-page grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
        {/* Left Content: 7 Columns */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-4 md:pt-12 lg:pt-0 pr-0 lg:pr-12 relative z-10">
          <h1 className="font-headline-lg md:font-headline-xl text-primary mb-6 md:mb-8 max-w-[800px] text-balance">
            Every Commit Has a Story
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-[500px] mb-8 md:mb-12">
            GitLore transforms your raw commit history into an interactive architectural exhibit. Uncover the human engineering decisions behind the code.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center max-w-[600px] group">
            <div className="w-full relative">
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/your/repo"
                className="w-full bg-transparent border-b border-primary py-4 font-body-lg text-primary placeholder-outline-variant focus:outline-none transition-colors pr-10 rounded-none"
              />
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                code
              </span>
            </div>
            <button
              type="submit"
              className="shrink-0 flex items-center gap-2 text-primary font-label-caps uppercase hover:text-on-tertiary-container transition-colors group/btn pt-4 sm:pt-0 cursor-pointer"
            >
              <span>Narrate my repo</span>
              <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>
        </div>

        {/* Right Visual: 5 Columns */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0 h-[350px] sm:h-[400px] lg:h-[600px] flex items-center justify-center">
          {/* Abstract Artwork Component */}
          <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
            <HeroAbstractGraphic className="w-full h-full object-contain mix-blend-multiply opacity-90" />
          </div>

          {/* Museum Placard Overlay */}
          <Link
            to="/analysis"
            className="absolute bottom-4 sm:bottom-8 lg:bottom-16 -left-2 sm:-left-4 lg:-left-12 bg-surface border border-primary p-6 w-[260px] sm:w-[280px] z-20 shadow-xl shadow-primary/5 group cursor-pointer hover:bg-primary transition-colors duration-300"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-on-tertiary-container"></span>
                <span className="font-label-caps text-outline group-hover:text-on-primary/60 transition-colors">
                  Featured Exhibit
                </span>
              </div>
              <div>
                <h3 className="font-body-md font-bold text-primary mb-1 group-hover:text-on-primary transition-colors">
                  facebook/react
                </h3>
                <p className="font-body-md text-on-surface-variant group-hover:text-on-primary/80 transition-colors text-sm">
                  2min narrated summary of the v18.0 release architecture.
                </p>
              </div>
              <div className="flex items-center gap-1 mt-2 text-primary group-hover:text-on-tertiary-container transition-colors">
                <span className="font-label-caps uppercase">See Details</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
