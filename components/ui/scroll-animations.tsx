"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'bounceIn' | 'slideInUp';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean; // Only animate once
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && (!once || !hasAnimated)) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        if (prefersReducedMotion) {
          setIsVisible(true);
          setHasAnimated(true);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      }
    });
  }, [delay, once, hasAnimated, prefersReducedMotion]);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Use passive event listeners for better performance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px 0px -100px 0px' // Optimized for mobile
    });

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection]);

  // Skip animation wrapper if reduced motion is preferred
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={elementRef}
      className={`scroll-animation ${animation} ${isVisible ? 'animated-in' : ''} ${className}`}
      style={{
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
        willChange: isVisible ? 'auto' : 'opacity, transform' // Optimize for GPU
      }}
    >
      {children}
    </div>
  );
};

// Individual animation components for easier usage
export const FadeInUp: React.FC<Omit<ScrollAnimationProps, 'animation'>> = (props) => (
  <ScrollAnimation {...props} animation="fadeInUp" />
);

export const FadeInLeft: React.FC<Omit<ScrollAnimationProps, 'animation'>> = (props) => (
  <ScrollAnimation {...props} animation="fadeInLeft" />
);

export const FadeInRight: React.FC<Omit<ScrollAnimationProps, 'animation'>> = (props) => (
  <ScrollAnimation {...props} animation="fadeInRight" />
);

export const BounceIn: React.FC<Omit<ScrollAnimationProps, 'animation'>> = (props) => (
  <ScrollAnimation {...props} animation="bounceIn" />
);

export const SlideInUp: React.FC<Omit<ScrollAnimationProps, 'animation'>> = (props) => (
  <ScrollAnimation {...props} animation="slideInUp" />
);