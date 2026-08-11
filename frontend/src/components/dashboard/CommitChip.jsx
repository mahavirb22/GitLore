import React from 'react';

export default function CommitChip({ hash, message, isHighlight = false, hasErrorDot = false, countMore }) {
  if (countMore) {
    return (
      <div className="flex items-center bg-surface-container px-3 py-1.5 rounded border border-outline-variant border-dashed">
        <span className="font-mono-sm text-mono-sm text-on-surface-variant">+{countMore} more</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 border px-3 py-1.5 bg-surface text-on-surface hover:border-on-surface cursor-pointer transition-colors ${
        isHighlight
          ? 'border-on-surface/20 border-l-2 border-l-[#D8402C]'
          : 'border-on-surface/10'
      }`}
    >
      {hasErrorDot && <span className="w-2 h-2 rounded-full bg-error mr-1" />}
      <span className="font-mono text-xs opacity-50">{hash}</span>
      {message && <span className="font-body-sm text-sm">{message}</span>}
    </div>
  );
}
