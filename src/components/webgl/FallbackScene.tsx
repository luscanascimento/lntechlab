import React from 'react';

export const FallbackScene: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30" />

      {/* SVG Geometric Wireframe D20 & Shield */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] opacity-40 animate-[spin_40s_linear_infinite]">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
          {/* Outer Ring */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#0052FF" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#FF00FF" strokeWidth="0.75" strokeDasharray="3 6" opacity="0.6" />
          
          {/* Icosahedron Wireframe Simulation */}
          <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="rgba(0, 82, 255, 0.08)" stroke="#00FFFF" strokeWidth="1.5" />
          <polygon points="100,45 150,75 150,125 100,155 50,125 50,75" fill="none" stroke="#FF00FF" strokeWidth="1" opacity="0.8" />
          
          {/* Internal Triangulation Lines */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="#00FFFF" strokeWidth="0.75" opacity="0.5" />
          <line x1="30" y1="60" x2="170" y2="140" stroke="#00FFFF" strokeWidth="0.75" opacity="0.5" />
          <line x1="30" y1="140" x2="170" y2="60" stroke="#00FFFF" strokeWidth="0.75" opacity="0.5" />
          <line x1="100" y1="45" x2="50" y2="125" stroke="#FF00FF" strokeWidth="0.75" opacity="0.7" />
          <line x1="100" y1="45" x2="150" y2="125" stroke="#FF00FF" strokeWidth="0.75" opacity="0.7" />
          <line x1="50" y1="75" x2="150" y2="75" stroke="#FF00FF" strokeWidth="0.75" opacity="0.7" />
          
          {/* Nodes */}
          <circle cx="100" cy="20" r="3" fill="#00FFFF" />
          <circle cx="170" cy="60" r="3" fill="#00FFFF" />
          <circle cx="170" cy="140" r="3" fill="#00FFFF" />
          <circle cx="100" cy="180" r="3" fill="#00FFFF" />
          <circle cx="30" cy="140" r="3" fill="#00FFFF" />
          <circle cx="30" cy="60" r="3" fill="#00FFFF" />
          <circle cx="100" cy="100" r="4" fill="#FF00FF" />
        </svg>
      </div>

      {/* Radial Gradient Glow Mask */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F19]/60 to-[#0B0F19]" />
    </div>
  );
};
