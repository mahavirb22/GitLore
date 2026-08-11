import React from 'react';

export default function HeroAbstractGraphic({ className = "w-full h-full object-contain" }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Color */}
      <rect width="600" height="600" fill="#F5F3EF"/>
      
      {/* Red Semi-circle */}
      <path d="M400 300C400 355.228 355.228 400 300 400V300H400Z" fill="#D8402C"/>
      
      {/* Black Circle */}
      <circle cx="200" cy="250" r="60" fill="#1A1A1A"/>
      
      {/* Concentric Arcs */}
      <path d="M450 300C450 382.843 382.843 450 300 450" stroke="#1A1A1A" strokeWidth="1"/>
      <path d="M470 300C470 393.888 393.888 470 300 470" stroke="#1A1A1A" strokeWidth="1"/>
      <path d="M490 300C490 404.934 404.934 490 300 490" stroke="#1A1A1A" strokeWidth="1"/>
      
      {/* Dot Grid Pattern */}
      <circle cx="100" cy="400" r="2" fill="#1A1A1A"/>
      <circle cx="120" cy="400" r="2" fill="#1A1A1A"/>
      <circle cx="140" cy="400" r="2" fill="#1A1A1A"/>
      <circle cx="100" cy="420" r="2" fill="#1A1A1A"/>
      <circle cx="120" cy="420" r="2" fill="#1A1A1A"/>
      <circle cx="140" cy="420" r="2" fill="#1A1A1A"/>
      <circle cx="100" cy="440" r="2" fill="#1A1A1A"/>
      <circle cx="120" cy="440" r="2" fill="#1A1A1A"/>
      <circle cx="140" cy="440" r="2" fill="#1A1A1A"/>
      
      {/* Striped Semicircle */}
      <mask id="hero-graphic-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="350" y="100" width="100" height="50">
        <path d="M450 150C450 122.386 427.614 100 400 100C372.386 100 350 122.386 350 150H450Z" fill="black"/>
      </mask>
      <g mask="url(#hero-graphic-mask)">
        <rect x="350" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="360" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="370" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="380" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="390" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="400" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="410" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="420" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="430" y="100" width="5" height="100" fill="#1A1A1A"/>
        <rect x="440" y="100" width="5" height="100" fill="#1A1A1A"/>
      </g>
    </svg>
  );
}
