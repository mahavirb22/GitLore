import React from 'react';

export default function CommitFrequencyChart({ barcodeData = [], className = "" }) {
  const defaultData = [
    { height: '20%', isSpike: false },
    { height: '10%', isSpike: false },
    { height: '30%', isSpike: false },
    { height: '15%', isSpike: false },
    { height: '60%', isSpike: true },
    { height: '40%', isSpike: false },
    { height: '25%', isSpike: false },
    { height: '10%', isSpike: false },
    { height: '35%', isSpike: false },
    { height: '80%', isSpike: true },
    { height: '50%', isSpike: false },
    { height: '20%', isSpike: false },
    { height: '45%', isSpike: false },
    { height: '15%', isSpike: false },
    { height: '100%', isSpike: true },
    { height: '60%', isSpike: false },
    { height: '30%', isSpike: false },
    { height: '10%', isSpike: false },
  ];

  const bars = barcodeData.length > 0 ? barcodeData : defaultData;

  return (
    <div className={`mb-12 ${className}`}>
      <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-4 uppercase tracking-widest">
        Commit Frequency
      </h4>
      <div className="flex items-end h-24 gap-[2px] w-full border-b border-on-surface/20 pb-1">
        {bars.map((bar, idx) => (
          <div
            key={idx}
            style={{ height: bar.height }}
            className={`w-1.5 ${bar.isSpike ? 'bg-[#D8402C]' : 'bg-on-surface'}`}
          />
        ))}
      </div>
    </div>
  );
}
