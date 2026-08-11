import React from 'react';
import LogoMark from '../common/LogoMark';

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 py-16 bg-surface">
      <div className="px-margin-mobile md:px-margin-page grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <LogoMark grayscale className="h-6 w-auto" />
            <span className="font-headline-md text-on-surface opacity-80">GitLore</span>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-xs">
            The architectural record of human engineering.
          </p>
        </div>

        {/* Product Links */}
        <div className="md:col-span-2 flex flex-col gap-4 mt-6 md:mt-0">
          <h4 className="font-label-caps text-primary uppercase">Product</h4>
          <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Explore
          </a>
          <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Pricing
          </a>
        </div>

        {/* Company Links */}
        <div className="md:col-span-2 flex flex-col gap-4 mt-6 md:mt-0">
          <h4 className="font-label-caps text-primary uppercase">Company</h4>
          <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            About
          </a>
          <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Culture
          </a>
        </div>

        {/* Social Links */}
        <div className="md:col-span-4 flex flex-col gap-4 mt-6 md:mt-0">
          <h4 className="font-label-caps text-primary uppercase">Social</h4>
          <div className="flex gap-4">
            <a className="text-on-surface-variant hover:text-primary font-body-md transition-colors" href="#">
              GitHub
            </a>
            <a className="text-on-surface-variant hover:text-primary font-body-md transition-colors" href="#">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-16 px-margin-mobile md:px-margin-page py-8 border-t border-outline-variant/10 text-center">
        <span className="font-label-caps text-on-surface-variant/60">
          © 2024 GitLore Foundation. Curated Code Artifacts.
        </span>
      </div>
    </footer>
  );
}
