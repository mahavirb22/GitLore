import React from 'react';

export default function TestimonialSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-surface relative z-0">
      <div className="px-margin-mobile md:px-margin-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Quote 1 */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-outline-variant/20 pb-8 lg:pb-0 pr-0 lg:pr-8">
            <span className="font-label-caps text-on-tertiary-container uppercase tracking-widest block mb-6">
              Curator's Notes
            </span>
            <p className="font-headline-lg-mobile text-primary text-balance">
              "It turns git log into a gallery walk."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center grayscale font-bold font-headline-md">
                S
              </div>
              <div>
                <div className="font-label-caps text-primary uppercase">Sarah Jenkins</div>
                <div className="font-body-md text-on-surface-variant text-sm">
                  Staff Engineer, Vercel
                </div>
              </div>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-outline-variant/20 py-8 lg:py-0 px-0 lg:px-8">
            <p className="font-headline-lg-mobile text-primary text-balance">
              "Finally, a way to onboard juniors onto a legacy codebase without just throwing them at JIRA."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center grayscale font-bold font-headline-md">
                M
              </div>
              <div>
                <div className="font-label-caps text-primary uppercase">Marcus Thorne</div>
                <div className="font-body-md text-on-surface-variant text-sm">
                  CTO, Acme Corp
                </div>
              </div>
            </div>
          </div>

          {/* CTA Column */}
          <div className="lg:col-span-4 py-8 lg:py-0 pl-0 lg:pl-8 flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-outline-variant uppercase tracking-widest block mb-4">
                Join the Archive
              </span>
              <p className="font-body-lg text-on-surface-variant">
                Start curating your project's history today.
              </p>
            </div>
            <button className="mt-8 w-full border border-primary bg-primary text-on-primary py-4 font-label-caps uppercase hover:bg-surface hover:text-primary transition-all cursor-pointer">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
