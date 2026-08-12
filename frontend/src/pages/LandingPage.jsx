import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FeaturedTimelineSection from '../components/landing/FeaturedTimelineSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import HeroAbstractGraphic from '../components/common/HeroAbstractGraphic';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LandingPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStage, setLoadingStage] = useState('Fetching GitHub commit history...');
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleStartAnalyze = async (repoUrl) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    setLoadingStage('Connecting to GitHub REST API...');

    try {
      setTimeout(() => setLoadingStage('Clustering commits into architectural story arcs...'), 1200);
      setTimeout(() => setLoadingStage('Running OpenRouter AI narration pass...'), 2400);

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ repoUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze repository');
      }

      const { owner, name } = data.repository;
      navigate(`/analysis?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(name)}`);
    } catch (err) {
      console.error('Analysis failed:', err);
      setErrorMsg(err.message);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative">
      <Navbar />

      <main className="w-full pt-16 flex-grow">
        <HeroSection onStartAnalyze={handleStartAnalyze} />
        <HowItWorksSection />
        <FeaturedTimelineSection />
        <TestimonialSection />
      </main>

      <Footer />

      {/* Real Pipeline Progress Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-lg flex flex-col items-center justify-center p-6">
          <div className="w-64 h-64 mb-8 relative flex items-center justify-center animate-pulse">
            <HeroAbstractGraphic className="w-full h-full object-contain" />
          </div>

          <div className="text-center max-w-md">
            <span className="font-label-caps text-on-tertiary-container uppercase tracking-widest block mb-2">
              EXHIBIT GENERATION IN PROGRESS
            </span>
            <h2 className="font-headline-lg text-primary mb-4">Curating Architecture...</h2>
            <p className="font-body-md text-on-surface-variant font-mono-sm bg-surface-container-high px-4 py-2 border border-outline-variant">
              {loadingStage}
            </p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {errorMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-error-container border border-error p-4 text-on-error-container max-w-md shadow-xl flex items-center justify-between gap-4">
          <div>
            <p className="font-label-caps text-xs uppercase font-bold mb-1">Analysis Error</p>
            <p className="font-body-md text-sm">{errorMsg}</p>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-on-error-container hover:text-primary cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mobile Bottom Fixed Navigation Bar */}
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
          <a
            href="#pricing"
            className="flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">difference</span>
            <span className="font-label-caps text-[10px] uppercase">Pricing</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
