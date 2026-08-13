import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function MyArchiveModal({ isOpen, onClose }) {
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch(`${API_BASE_URL}/api/user/history`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          setAnalyses(data.analyses || []);
        })
        .catch((err) => console.error('Archive fetch error:', err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-surface/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface border border-primary w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary cursor-pointer p-1"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Modal Title */}
        <div className="mb-6 border-b border-outline-variant/20 pb-4">
          <span className="font-label-caps text-[10px] text-on-tertiary-container uppercase tracking-widest block mb-1">
            Personal Curations
          </span>
          <h2 className="font-headline-md text-2xl text-primary">My Exhibit Archive</h2>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {isLoading ? (
            <div className="py-12 text-center">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">
                Fetching exhibit archive...
              </span>
            </div>
          ) : analyses.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-outline-variant p-6">
              <span className="material-symbols-outlined text-outline-variant text-[48px] mb-2 block">
                account_tree
              </span>
              <p className="font-body-md text-on-surface-variant mb-4">
                You haven't curated any repositories yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/');
                }}
                className="font-label-caps uppercase border border-primary px-6 py-2 bg-primary text-on-primary text-xs"
              >
                Narrate Your First Repo
              </button>
            </div>
          ) : (
            analyses.map((item) => {
              const repo = item.repository;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    navigate(`/analysis?owner=${repo.owner}&repo=${repo.name}`);
                  }}
                  className="p-4 border border-outline-variant/30 hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-headline-md text-lg font-bold text-primary">
                        {repo.fullName}
                      </span>
                      {repo.isPrivate && (
                        <span className="font-label-caps text-[9px] uppercase bg-surface-container-highest px-2 py-0.5 border border-outline-variant">
                          Private
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant line-clamp-1">
                      {repo.description || 'Architectural exhibit log.'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 font-mono-sm text-[11px] text-outline-variant">
                      <span>{item.totalCommits} commits</span>
                      <span>•</span>
                      <span>{item.activePeriod} active</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform">
                    <span className="font-label-caps text-xs uppercase">View</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
