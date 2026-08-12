import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoMark from '../common/LogoMark';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check session user state from backend API
    fetch('http://localhost:5000/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(err => console.log('Auth check error:', err));
  }, []);

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setCurrentUser(null);
      setShowUserMenu(false);
      window.location.reload();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

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
              Analysis
            </Link>
            <a
              href="#pricing"
              className="font-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="font-label-caps text-on-surface-variant hover:text-on-surface transition-colors uppercase"
            >
              Docs
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4 md:gap-6 relative">
            <button
              className="text-on-surface-variant hover:text-on-surface flex items-center cursor-pointer"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.username}
                    className="w-8 h-8 rounded-full border border-primary object-cover"
                  />
                  <span className="hidden sm:inline font-label-caps text-xs text-primary font-bold">
                    {currentUser.username}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-primary p-2 z-50 shadow-xl">
                    <div className="px-3 py-2 border-b border-outline-variant/20 mb-2">
                      <p className="font-label-caps text-xs text-primary font-bold">{currentUser.name}</p>
                      <p className="font-mono-sm text-[10px] text-on-surface-variant">@{currentUser.username}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 font-label-caps text-xs uppercase text-error hover:bg-error-container/20 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleGitHubLogin}
                className="hidden sm:flex items-center gap-2 font-label-caps uppercase border border-primary px-6 py-2 hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>Sign In</span>
              </button>
            )}

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
