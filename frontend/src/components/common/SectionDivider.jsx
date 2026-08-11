import React from 'react';

export default function SectionDivider({ label, className = '' }) {
  if (label) {
    return (
      <div className={`relative py-12 flex items-center justify-center ${className}`}>
        <div className="absolute left-0 right-0 h-px bg-on-surface/10 w-full" />
        <span className="bg-surface px-4 text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest relative z-10">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full h-px bg-outline-variant/20 ${className}`} />
  );
}
