"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'bounceIn' | 'slideInUp';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`scroll-animation ${animation} ${isVisible ? 'animated-in' : ''} ${className}`}
      style={{
        animationDuration: `${duration}ms`,
        animationFillMode: 'both'
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