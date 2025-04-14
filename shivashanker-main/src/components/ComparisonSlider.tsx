
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ComparisonSlideProps {
  leftTitle: string;
  leftDescription: string;
  leftImage: string;
  leftIcon: React.ReactNode;
  
  rightTitle: string;
  rightDescription: string;
  rightImage: string;
  rightIcon: React.ReactNode;
}

interface ComparisonSliderProps {
  title: string;
  slides: ComparisonSlideProps[];
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ title, slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  
  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    // Reset slider position when changing slides
    setSliderValue(50);
  };
  
  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    // Reset slider position when changing slides
    setSliderValue(50);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  // Enhanced mouse drag handling for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    
    const rect = containerRef.current.getBoundingClientRect();
    updateSliderPosition(e.clientX, rect);
    
    // Add mouse event listeners to document level to capture movement outside the component
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    updateSliderPosition(e.clientX, rect);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Handle dragging on divider specifically
  const handleDividerMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault();
    setIsDragging(true);
    
    const rect = containerRef.current.getBoundingClientRect();
    updateSliderPosition(e.clientX, rect);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    
    const rect = containerRef.current.getBoundingClientRect();
    updateSliderPosition(e.touches[0].clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault(); // Prevent default on move to allow scrolling
    
    const rect = containerRef.current.getBoundingClientRect();
    updateSliderPosition(e.touches[0].clientX, rect);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (clientX: number, rect: DOMRect) => {
    // Calculate percentage position relative to the container width
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const newValue = Math.min(Math.max(percentage, 0), 100);
    setSliderValue(newValue);
  };

  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowUp') {
        setSliderValue(prev => Math.min(prev + 5, 100));
      } else if (e.key === 'ArrowDown') {
        setSliderValue(prev => Math.max(prev - 5, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative min-h-screen py-12 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
          {title}
        </h2>
        {/* Descriptive text */}
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          {activeIndex === 0 && "Compare academic performance with real-world project skills"}
          {activeIndex === 1 && "Contrast outdated syllabi with cutting-edge AI tools"}
          {activeIndex === 2 && "Explore the difference between mandatory projects and passionate side work"}
          {activeIndex === 3 && "Compare passive learning with active problem-solving"}
          {activeIndex === 4 && "Understand how online presence trumps traditional resumes"}
        </p>
        
        <div 
          ref={containerRef} 
          className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden mb-8 select-none touch-none h-[500px] md:h-[600px]"
        >
          <div 
            className="relative h-full cursor-col-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Right side (Industry) - Full image with overlay */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0">
                <img 
                  src={activeSlide.rightImage}
                  alt={activeSlide.rightTitle}
                  className="w-full h-full object-cover brightness-90 contrast-110"
                />
              </div>
              <div className="absolute inset-0 bg-primary/30 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white rounded-full p-4 mb-4 text-4xl text-primary shadow-lg">
                  {activeSlide.rightIcon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 bg-primary/70 px-4 py-2 rounded-lg inline-block shadow-md">
                  {activeSlide.rightTitle}
                </h3>
                <p className="text-lg md:text-xl font-medium text-white bg-primary/70 px-4 py-2 rounded-lg max-w-md shadow-md">
                  {activeSlide.rightDescription}
                </p>
              </div>
            </div>

            {/* Left side (College) - Clipped with grayscale and overlay */}
            <div 
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderValue}%` }}
            >
              <div className="absolute inset-0">
                <img 
                  src={activeSlide.leftImage}
                  alt={activeSlide.leftTitle}
                  className="w-full h-full object-cover grayscale-[50%] brightness-75"
                />
              </div>
              <div className="absolute inset-0 bg-secondary/50 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white rounded-full p-4 mb-4 text-4xl text-secondary-foreground shadow-lg">
                  {activeSlide.leftIcon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-3 bg-secondary/70 px-4 py-2 rounded-lg inline-block shadow-md">
                  {activeSlide.leftTitle}
                </h3>
                <p className="text-lg md:text-xl font-medium text-secondary-foreground bg-secondary/70 px-4 py-2 rounded-lg max-w-md shadow-md">
                  {activeSlide.leftDescription}
                </p>
              </div>
            </div>

            {/* Draggable divider with handle */}
            <div 
              ref={dividerRef}
              className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-col-resize z-10 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
              onMouseDown={handleDividerMouseDown}
            >
              {/* Draggable handle */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center z-50 cursor-grab active:cursor-grabbing border-2 border-primary"
                onMouseDown={handleDividerMouseDown}
              >
                <div className="flex">
                  <ChevronLeft className="h-6 w-6 text-primary" />
                  <ChevronRight className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-sm">
            <button 
              onClick={handlePrevSlide}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setSliderValue(50);
                  }}
                  className={cn(
                    "w-4 h-4 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary scale-125" : "bg-gray-300"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNextSlide}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Slide counter */}
          <div className="absolute top-4 right-4 bg-white/90 rounded-full px-4 py-1 text-sm font-medium shadow-md">
            <span className="font-bold text-primary">{activeIndex + 1}</span> / {slides.length}
          </div>
        </div>
        
        {/* CTA button below the slider */}
        {activeIndex === 4 && (
          <div className="text-center mt-8 animate-fade-in">
            <a 
              href="#scholarship" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              Start building your story <ChevronRight className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonSlider;
