import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[60] bg-surface flex flex-col pt-safe transition-transform duration-300 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="h-16 px-margin-mobile flex items-center justify-end">
        <button
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-end cursor-pointer"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-primary text-[28px]">close</span>
        </button>
      </div>

      <nav className="flex-1 px-margin-mobile pt-8 flex flex-col gap-8">
        <Link
          to="/"
          onClick={onClose}
          className="font-headline-lg uppercase text-on-tertiary-container"
        >
          Archive Explorer
        </Link>
        <Link
          to="/analysis"
          onClick={onClose}
          className="font-headline-lg text-headline-lg text-primary uppercase"
        >
          Narrative Timeline
        </Link>
        <Link
          to="/analysis"
          onClick={onClose}
          className="font-headline-lg text-headline-lg text-primary uppercase"
        >
          Curated Diffs
        </Link>
        <a
          href="#logs"
          onClick={onClose}
          className="font-headline-lg text-headline-lg text-primary uppercase"
        >
          Contributor Logs
        </a>
        <a
          href="#settings"
          onClick={onClose}
          className="font-headline-lg text-headline-lg text-primary uppercase"
        >
          Repository Settings
        </a>
      </nav>
    </div>
  );
}
