
import React, { useEffect, useRef } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import ScrollSection from './ScrollSection';

const studentStories = [
  {
    name: "Priya M.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120",
    story: "From zero coding knowledge to a full-stack developer role in 9 months. The project-based curriculum made all the difference."
  },
  {
    name: "Rahul S.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120",
    story: "I was studying computer science but wasn't job-ready. NIAT's industry projects gave me the edge in interviews."
  },
  {
    name: "Ananya K.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120",
    story: "Coming from a non-CS background, I never thought I could compete with CS grads. Now I'm working alongside them at a top tech company."
  },
  {
    name: "Vikram P.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=120",
    story: "The mentorship at NIAT helped me navigate my career transition from mechanical engineering to software development."
  },
  {
    name: "Neha R.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120",
    story: "I went from being afraid to code to building full applications in just a few months. NIAT changed my life."
  }
];

interface StudentStoriesScrollProps {
  className?: string;
}

const StudentStoriesScroll: React.FC<StudentStoriesScrollProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollSection className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Student Stories</h2>
        
        <div className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {studentStories.map((student, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="bg-accent rounded-lg shadow-lg p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={student.image} 
                        alt={student.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary"
                      />
                      <h3 className="font-bold text-lg">{student.name}</h3>
                    </div>
                    <p className="text-muted-foreground flex-grow">{student.story}</p>
                    <div className="mt-4 text-primary text-sm font-medium">NIAT Student</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5" />
          </Carousel>
        </div>
      </div>
    </ScrollSection>
  );
};

export default StudentStoriesScroll;
