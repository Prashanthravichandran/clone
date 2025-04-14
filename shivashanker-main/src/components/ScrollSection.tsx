
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollSectionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
  onInView?: () => void;
  threshold?: number;
  animate?: boolean;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  className,
  children,
  id,
  onInView,
  threshold = 0.2,
  animate = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !animate) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('animate-fade-in');
            section.style.opacity = '1';
            if (onInView) onInView();
            // Disconnect observer after animation is triggered
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [onInView, threshold, animate]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'min-h-screen py-20 flex flex-col items-center justify-center',
        animate ? 'opacity-0' : 'opacity-100',
        className
      )}
    >
      {children}
    </section>
  );
};

export default ScrollSection;
