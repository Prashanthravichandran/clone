
import React from 'react';
import ScrollSection from './ScrollSection';

interface RevealSectionProps {
  title: string;
}

const RevealSection: React.FC<RevealSectionProps> = ({ title }) => {
  return (
    <ScrollSection className="bg-gradient-to-b from-primary/90 to-primary py-16 text-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-secondary">
          {title}
        </h2>
        
        <div className="space-y-6 text-lg">
          <p>You've seen my story.<br />But here's something I didn't have when I was your age...</p>
          
          <p className="my-8">A place where learning feels like building.<br />Where mentors from Microsoft, Amazon, and IITs teach you how the real world works.<br />Where your classroom is more like a startup lab.</p>
          
          <p className="font-bold text-xl md:text-2xl my-8 text-secondary">That place is NIAT — NxtWave Institute of Advanced Technologies.</p>
          
          <p>A new-age tech college built for students who want to build the future.</p>
          
          <p className="font-bold text-xl mt-8">And guess what? You could be one of them.</p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default RevealSection;
