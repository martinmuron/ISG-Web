import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Home/Real Estate Icon - extracted from old site
export const HomeIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeMiterlimit="10"
  >
    <rect x="1" y="41" width="10" height="10"></rect>
    <rect x="53" y="41" width="10" height="10"></rect>
    <rect x="27" y="13" width="10" height="10"></rect>
    <circle cx="4" cy="18" r="3"></circle>
    <circle cx="60" cy="18" r="3"></circle>
    <path d="M7,18h20C6,18,6,41,6,41"></path>
    <path d="M57,18H37c21,0,21,23,21,23"></path>
  </svg>
);

// Calculator/Finance Icon - extracted from old site
export const CalculatorIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeMiterlimit="10"
  >
    <rect x="1" y="1" width="62" height="14"></rect>
    <rect x="1" y="15" width="62" height="48"></rect>
    <line x1="22" y1="15" x2="22" y2="63"></line>
    <line x1="22" y1="38" x2="63" y2="38"></line>
  </svg>
);

// Presentation/Construction Icon - extracted from old site  
export const PresentationIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeMiterlimit="10"
  >
    <g>
      <polygon points="52,62.999 52,0.999 26,0.999 12,14.999 12,63 16,61 20,63 24,61 28,63 32,61 36,63 40,61 44,63 48,61"></polygon>
      <polyline points="12,14.999 26,14.999 26,0.999"></polyline>
    </g>
    <path d="M38,28c0,0,0.161-4-6-4s-6,3-6,5s0.523,4,6,4c6.161,0,7,4.315,7,5c0,1.369,0.53,6-7,6c-6.161,0-6-3.315-6-4"></path>
    <line x1="34" y1="21" x2="34" y2="48"></line>
    <line x1="30" y1="21" x2="30" y2="48"></line>
  </svg>
);

// Chart/Investment Icon - extracted from old site
export const ChartIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeMiterlimit="10"
  >
    <polygon points="1,63 1,2 62,63"></polygon>
    <polygon points="14,54 14,30 38,54"></polygon>
    <line x1="8" y1="22" x2="2" y2="22"></line>
    <line x1="6" y1="30" x2="2" y2="30"></line>
    <line x1="8" y1="38" x2="2" y2="38"></line>
    <line x1="6" y1="46" x2="2" y2="46"></line>
    <line x1="8" y1="54" x2="2" y2="54"></line>
    <polygon points="25,1 19,7 55,43 63,45 61,37"></polygon>
    <line x1="25" y1="13" x2="31" y2="7"></line>
  </svg>
);