
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollSection from './ScrollSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineItemProps {
  thenTitle: string;
  thenDescription: string;
  nowTitle: string;
  nowDescription: string;
  thenIcon: string;
  nowIcon: string;
}

interface TimelineSectionProps {
  items: TimelineItemProps[];
  title: string;
  subtitle?: string;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ 
  items = [], // Provide default empty array to prevent undefined errors
  title,
  subtitle 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <ScrollSection className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-center text-lg mb-12 text-accent">
            {subtitle}
          </p>
        )}
        
        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/20 hover:bg-secondary/40 text-white rounded-full p-2 transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="overflow-hidden px-10">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-1/2 bg-primary-foreground/10 rounded-xl p-6 timeline-card">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 rounded-full mr-4">
                        <span className="text-2xl">{item.thenIcon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-secondary">{item.thenTitle}</h3>
                    </div>
                    <p className="text-accent">{item.thenDescription}</p>
                  </div>
                  
                  <div className="w-full md:w-1/2 bg-secondary/10 rounded-xl p-6 timeline-card">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 rounded-full mr-4">
                        <span className="text-2xl">{item.nowIcon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-secondary">{item.nowTitle}</h3>
                    </div>
                    <p className="text-accent">{item.nowDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/20 hover:bg-secondary/40 text-white rounded-full p-2 transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-secondary scale-125" : "bg-accent/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
};

export default TimelineSection;
