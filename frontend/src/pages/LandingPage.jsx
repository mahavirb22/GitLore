import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FeaturedTimelineSection from '../components/landing/FeaturedTimelineSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-16 flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <FeaturedTimelineSection />
        <TestimonialSection />
      </main>

      <Footer />

      {/* Mobile Bottom Fixed Navigation Bar (Matches gitlore_mobile layout) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline/15 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex justify-around items-center h-16 px-margin-mobile">
          <Link
            to="/"
            className="flex flex-col items-center justify-center gap-1 text-on-tertiary-container"
          >
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            <span className="font-label-caps text-[10px] uppercase">Archive</span>
          </Link>
          <Link
            to="/analysis"
            className="flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">history_edu</span>
            <span className="font-label-caps text-[10px] uppercase">Timeline</span>
          </Link>
          <Link
            to="/analysis-alt"
            className="flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">difference</span>
            <span className="font-label-caps text-[10px] uppercase">Diffs</span>
          </Link>
          <a
            href="#logs"
            className="flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">assignment_ind</span>
            <span className="font-label-caps text-[10px] uppercase">Logs</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
