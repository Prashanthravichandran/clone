
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  name: string;
  designation: string;
  profileImage?: string;
  onCtaClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  designation,
  profileImage = '/placeholder.svg',
  onCtaClick,
}) => {
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add fade-in and slide animations when component mounts
    const leftSide = leftSideRef.current;
    const rightSide = rightSideRef.current;

    if (leftSide && rightSide) {
      leftSide.classList.add('animate-slide-in-left');
      rightSide.classList.add('animate-slide-in-right');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center">
      {/* Left Side - Image */}
      <div 
        ref={leftSideRef}
        className="w-full md:w-1/2 h-[40vh] md:h-screen flex items-center justify-center bg-accent p-8"
      >
        <div className="relative w-64 h-80 md:w-96 md:h-[28rem] opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Text */}
      <div 
        ref={rightSideRef}
        className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center p-8 md:p-16 bg-background"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-8 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          This page isn't about me. It's about you.
        </h1>

        <blockquote className="text-lg md:text-xl text-primary italic mb-8 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          "I didn't have it all figured out at 18. You don't have to either — but you can start stronger."
        </blockquote>

        <div className="font-caveat text-lg mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          — {name}, {designation}
        </div>

        <Button 
          onClick={onCtaClick} 
          className={cn(
            "opacity-0 animate-fade-in flex items-center gap-2 bg-secondary text-primary hover:bg-secondary/90 text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          )}
          style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
        >
          See what I wish someone told me at your age
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
