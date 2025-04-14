
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollSection from './ScrollSection';

interface SplitScreenItemProps {
  leftImage: string;
  rightImage: string;
  leftText: string;
  rightText: string;
}

interface SplitScreenSectionProps {
  items: SplitScreenItemProps[];
  title: string;
}

const SplitScreenSection: React.FC<SplitScreenSectionProps> = ({ 
  items, 
  title 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset refs array when items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // If section is in view
      if (top < viewportHeight && top + height > 0) {
        // Calculate which item should be active based on scroll position
        const sectionProgress = Math.min(
          Math.max((viewportHeight - top) / (height - viewportHeight/2), 0),
          0.99
        );
        
        const newItemIndex = Math.min(
          Math.floor(sectionProgress * items.length),
          items.length - 1
        );
        
        if (newItemIndex !== activeIndex) {
          setActiveIndex(newItemIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items.length, activeIndex]);

  return (
    <ScrollSection className="relative py-0 opacity-100" animate={false}>
      <div 
        ref={sectionRef} 
        className="min-h-[200vh] w-full flex flex-col"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mt-12 mb-8 px-4 sticky top-0 pt-4 bg-accent/80 z-10">
          {title}
        </h2>
        
        <div className="flex-1 flex flex-col md:flex-row w-full sticky top-[25vh] h-[50vh] overflow-hidden">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index === activeIndex && (
                <>
                  <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img 
                      src={item.leftImage} 
                      alt="College then" 
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <p className="text-white text-xl md:text-2xl font-medium px-6 text-center max-w-md">
                        {item.leftText}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative transition-all duration-500 overflow-hidden">
                    <img 
                      src={item.rightImage} 
                      alt="Learning now" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-xl md:text-2xl font-medium px-6 text-center max-w-md drop-shadow-lg">
                        {item.rightText}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 my-8 sticky bottom-4">
          {items.map((_, index) => (
            <div 
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-primary scale-125" : "bg-gray-300"
              )}
            />
          ))}
        </div>
        
        {/* Add spacer divs to create scrolling room */}
        {items.map((_, index) => (
          <div 
            key={index}
            ref={el => itemRefs.current[index] = el}
            className="h-[75vh] w-full"
          />
        ))}
      </div>
    </ScrollSection>
  );
};

export default SplitScreenSection;
