import React from 'react';

export default function LogoMark({ className = "h-8 w-auto object-contain", grayscale = false }) {
  const logoUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCqt5xG--0GQP3X6HcB2Jlq91osVXCaD0f2YVbW__tC7HJtATYrX6BkQOWJeOw3A5qJSZgVGfSLEVjQhpW3-7jMJXUUxVEED5OLAVe04X4b-ZFD8R-fL_g4q20sqSoBPs7gjXOh-3LxercVNSDAOtq8PNvsooh_6-1ddT2CG_8hZmDreE2gXHQ5279uCTgndaZiZLvF3Fov5vVSQr9fU0OUpWXQD4YhjHVnA0kOM38esCIpaC9JWKxVKQ";

  return (
    <img
      src={logoUrl}
      alt="GitLore Logo Mark"
      className={`${className} ${grayscale ? 'grayscale opacity-80' : ''}`}
      onError={(e) => {
        // Fallback to inline SVG if remote URL is unreachable
        e.target.onerror = null;
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'inline-block';
      }}
    />
  );
}
