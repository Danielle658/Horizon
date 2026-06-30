import React from 'react';

interface HorizonLogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function HorizonLogo({ className = '', animated = false, size = 'md' }: HorizonLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${currentSize} ${className}`}>
      {/* Background glow shadow */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-[#34C759]/20 to-[#7C3AED]/20 rounded-2xl blur-md transition-all duration-1000 ${animated ? 'animate-pulse scale-110' : 'scale-100'}`} />
      
      {/* Main SVG Logo */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`relative z-10 w-full h-full transition-transform duration-500 ${animated ? 'hover:scale-105' : ''}`}
      >
        <defs>
          <linearGradient id="horizon-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34C759" />
            <stop offset="50%" stopColor="#5B75E3" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="horizon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hexagonal Outer Border */}
        <polygon 
          points="50,12 85,30 85,70 50,88 15,70 15,30" 
          stroke="url(#horizon-logo-grad)" 
          strokeWidth="3.5" 
          strokeLinejoin="round"
          fill="none" 
          className={animated ? "animate-[spin_12s_linear_infinite] origin-center" : ""}
          style={{ transformOrigin: '50px 50px' }}
        />

        {/* Concentric glowing horizon arc */}
        <path 
          d="M 28 50 Q 50 22 72 50" 
          stroke="url(#horizon-logo-grad)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          filter="url(#horizon-glow)"
          className={animated ? "animate-pulse" : ""}
        />

        <path 
          d="M 22 58 Q 50 36 78 58" 
          stroke="#34C759" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.85" 
        />

        {/* Core Glowing Sun / Tech node */}
        <circle 
          cx="50" 
          cy="46" 
          r="6.5" 
          fill="url(#horizon-logo-grad)" 
          filter="url(#horizon-glow)" 
        />

        {/* Flat cybernetic base lines representing the digital horizon */}
        <line x1="20" y1="68" x2="80" y2="68" stroke="url(#horizon-logo-grad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        <line x1="28" y1="74" x2="72" y2="74" stroke="url(#horizon-logo-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="38" y1="80" x2="62" y2="80" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>
    </div>
  );
}
