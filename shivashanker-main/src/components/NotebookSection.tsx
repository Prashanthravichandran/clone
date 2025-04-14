
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NotebookSectionProps {
  title: string;
  lines: string[];
  name: string;
  designation: string;
  onCtaClick: () => void;
}

const NotebookSection: React.FC<NotebookSectionProps> = ({
  title,
  lines,
  name,
  designation,
  onCtaClick
}) => {
  const letterRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const letterElement = letterRef.current;
    if (!letterElement) return;
    
    // Initially hide all lines
    setVisibleLines(0);
    
    const handleScroll = () => {
      const rect = letterElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      setLastScrollY(scrollY);
      
      // If the letter is completely out of viewport, don't update
      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        return;
      }
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = visibleBottom - visibleTop;
      
      // Calculate visibility ratio
      const visibleRatio = visibleHeight / rect.height;
      
      // Calculate how much of the element has been scrolled through
      const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Calculate number of lines to show based on progress and direction
      const totalLines = lines.length;
      
      if (scrollDirection === 'down') {
        // When scrolling down, reveal lines based on progress
        const linesToShow = Math.floor(clampedProgress * totalLines * 1.2);
        setVisibleLines(Math.min(linesToShow, totalLines));
      } else {
        // When scrolling up, hide lines based on progress
        const linesToShow = Math.ceil(clampedProgress * totalLines * 1.2);
        setVisibleLines(Math.max(0, linesToShow));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lines.length, lastScrollY]);
  
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="relative mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
            {title}
          </h2>
          
          {/* Sticky Note - MOVED BELOW TITLE */}
          <div 
            className="absolute right-0 top-full mt-4 md:right-[-50px] lg:right-[-100px] transform rotate-6 w-36 md:w-44 p-3 shadow-md" 
            style={{ 
              backgroundColor: '#FEF7CD', // Soft yellow for sticky note
              zIndex: 20
            }}
          >
            <p className="text-sm md:text-base font-caveat" style={{ color: '#ea384c' }}>
              I wish I had known this earlier!
            </p>
          </div>
        </div>
        
        <div className="relative" ref={letterRef}>
          <div className="absolute inset-0 bg-white z-0 opacity-80"></div>
          <div 
            className="relative z-10 p-8 md:p-12 rounded-lg shadow-xl bg-white"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 98%, rgba(142, 145, 150, 0.2) 98%, rgba(142, 145, 150, 0.2) 100%)', // Fainter gray lines
              backgroundSize: '100% 2.5rem',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: '0 1.5rem'
            }}
          >
            <div className="space-y-8">
              {lines.map((line, index) => (
                <p 
                  key={index} 
                  className={`
                    font-caveat text-xl md:text-2xl text-gray-800 
                    transition-opacity duration-500 ease-in-out
                    ${index < visibleLines ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  {line}
                </p>
              ))}
              
              {/* Blinking cursor effect at the bottom */}
              {visibleLines < lines.length && (
                <span className="inline-block w-0.5 h-5 bg-primary animate-blink"></span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="#scholarship">
            <Button 
              className="bg-primary text-white px-8 py-6 rounded-full text-lg flex items-center gap-2 mx-auto"
              onClick={onCtaClick}
            >
              Start Your Journey Today <ChevronRight className="ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotebookSection;
