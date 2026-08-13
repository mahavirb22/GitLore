import React from 'react';

export default function CommitDiffModal({ commit, repoOwner, repoName, onClose }) {
  if (!commit) return null;

  const githubCommitUrl = `https://github.com/${repoOwner}/${repoName}/commit/${commit.sha}`;

  return (
    <div className="fixed inset-0 z-[100] bg-surface/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface border border-primary w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary cursor-pointer p-1"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-label-caps text-[10px] text-on-tertiary-container uppercase tracking-widest bg-surface-container-highest px-3 py-1">
            Commit Artifact
          </span>
          <span className="font-mono-sm text-mono-sm text-outline-variant">
            {commit.sha}
          </span>
        </div>

        {/* Commit Message */}
        <h3 className="font-headline-md text-xl sm:text-2xl text-primary mb-4">
          {commit.message}
        </h3>

        {/* Commit Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-outline-variant/20 mb-6 bg-surface-container-low px-4">
          <div>
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
              Author
            </span>
            <div className="flex items-center gap-2">
              {commit.authorAvatar && (
                <img
                  src={commit.authorAvatar}
                  alt={commit.authorName}
                  className="w-5 h-5 rounded-full object-cover"
                />
              )}
              <span className="font-body-md text-sm font-bold text-primary">
                {commit.authorName || 'Contributor'}
              </span>
            </div>
          </div>

          <div>
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
              Code Delta
            </span>
            <div className="flex items-center gap-3 font-mono-sm text-sm">
              <span className="text-emerald-700 font-bold">+{commit.additions || 0}</span>
              <span className="text-rose-700 font-bold">-{commit.deletions || 0}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <a
            href={githubCommitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-label-caps uppercase border border-primary px-6 py-3 bg-primary text-on-primary hover:bg-surface hover:text-primary transition-all text-xs"
          >
            <span>Inspect Source on GitHub</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>

          <button
            onClick={onClose}
            className="font-label-caps uppercase border border-outline-variant px-4 py-3 hover:bg-surface-container text-xs transition-colors cursor-pointer"
          >
            Close Exhibit
          </button>
        </div>
      </div>
    </div>
  );
}
