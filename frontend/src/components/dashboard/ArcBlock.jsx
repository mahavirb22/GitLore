import React, { useState, useEffect } from 'react';
import CommitChip from './CommitChip';

export default function ArcBlock({
  id,
  title,
  date,
  duration = "4:12",
  prose,
  commits = [],
  aiInsight,
  showAudioPlayer = true,
  isLast = false,
  onSelectCommit
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const proseText = Array.isArray(prose) ? prose.join(' ') : prose;

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!window.speechSynthesis) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${title}. ${proseText}`);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <article id={`arc-${id}`} className="mb-24 relative">
      {/* Spine Node for Desktop timeline */}
      <div className="absolute -left-[37px] top-4 w-3 h-3 rounded-full border-2 border-on-surface bg-surface hidden md:block" />

      {/* Header & Date Tag */}
      <div className="mb-6 flex justify-between items-start">
        <h2 className="font-headline-lg text-headline-lg md:text-headline-xl text-on-surface max-w-2xl leading-tight">
          {title}
        </h2>
        <span className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container-highest px-3 py-1 mt-2">
          {date}
        </span>
      </div>

      {/* Audio Player Snippet */}
      {showAudioPlayer && (
        <div className="flex items-center gap-4 mb-8 bg-surface-container-lowest border border-on-surface/10 p-4 w-full md:w-3/4">
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause narrative" : "Play narrative"}
            className={`w-10 h-10 rounded-full border border-on-surface flex items-center justify-center transition-colors cursor-pointer ${
              isPlaying ? 'bg-primary text-on-primary' : 'hover:bg-on-surface hover:text-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div className="flex-1">
            <div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant mb-2">
              <span>Narrative Audio {isPlaying && "(Reading Aloud)"}</span>
              <span>{duration}</span>
            </div>
            <div className="h-px w-full bg-on-surface/10 relative">
              <div
                className={`absolute left-0 top-0 h-px bg-[#D8402C] transition-all duration-500 ${
                  isPlaying ? 'w-3/4' : 'w-1/4'
                }`}
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D8402C] transition-all duration-500 ${
                  isPlaying ? 'left-3/4' : 'left-1/4'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Narrative Prose */}
      <div className="prose prose-lg text-on-surface-variant font-body-lg leading-relaxed mb-10 border-l border-on-surface/10 pl-6">
        {Array.isArray(prose) ? (
          prose.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))
        ) : (
          <p>{prose}</p>
        )}
      </div>

      {/* Commit Chips Strip */}
      {commits.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {commits.map((commit, idx) => (
            <CommitChip
              key={idx}
              hash={commit.sha || commit.hash}
              message={commit.message}
              isHighlight={commit.isHighlight}
              hasErrorDot={commit.hasErrorDot}
              onClick={() => onSelectCommit && onSelectCommit(commit)}
            />
          ))}
        </div>
      )}

      {/* AI Placard */}
      {aiInsight && (
        <div className="border border-on-surface/20 p-6 relative mt-8 w-full md:w-5/6 ml-auto">
          <div className="absolute -top-2.5 left-4 bg-surface px-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI Insight
            </span>
          </div>
          <p className="font-body-md text-on-surface italic">
            "{aiInsight}"
          </p>
        </div>
      )}
    </article>
  );
}
