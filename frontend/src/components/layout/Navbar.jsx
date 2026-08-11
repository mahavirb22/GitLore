import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoMark from '../common/LogoMark';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <div className="h-16 w-full px-margin-mobile md:px-margin-page flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="h-8 w-auto object-contain" />
            <span className="font-headline-md text-on-background tracking-tight">GitLore</span>
          </Link>

          {/* Desktop Nav Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className={`transition-colors uppercase ${
                location.pathname === '/'
                  ? 'text-primary font-bold underline underline-offset-8 decoration-2 font-label-caps'
                  : 'font-label-caps text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/analysis"
              className={`transition-colors uppercase ${
                location.pathname === '/analysis'
                  ? 'text-primary font-bold underline underline-offset-8 decoration-2 font-label-caps'
                  : 'font-label-caps text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Analysis (Desktop)
            </Link>
            <Link
              to="/analysis-alt"
              className={`transition-colors uppercase ${
                location.pathname === '/analysis-alt'
                  ? 'text-primary font-bold underline underline-offset-8 decoration-2 font-label-caps'
                  : 'font-label-caps text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Timeline (Mobile)
            </Link>
            <a
              href="#pricing"
              className="font-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase"
            >
              Pricing
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="text-on-surface-variant hover:text-on-surface flex items-center cursor-pointer"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button className="hidden sm:block font-label-caps uppercase border border-primary px-6 py-2 hover:bg-primary hover:text-on-primary transition-all">
              Sign In
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 flex items-center justify-end cursor-pointer"
              aria-label="Open mobile menu"
            >
              <span className="material-symbols-outlined text-primary text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
