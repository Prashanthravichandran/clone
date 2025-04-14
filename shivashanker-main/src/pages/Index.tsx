
import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import NotebookSection from '@/components/NotebookSection';
import ComparisonSlider from '@/components/ComparisonSlider';
import ScrollSection from '@/components/ScrollSection';
import VideoSection from '@/components/VideoSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ScholarshipSection from '@/components/ScholarshipSection';
import StudentStoriesScroll from '@/components/StudentStoriesScroll';

const employeeData = {
  name: "Anupam Pedarla",
  designation: "Co-Founder & COO, Nxtwave",
  profileImage: "/lovable-uploads/1724134022331.jpeg"
};


const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const notebookLines = [
  "Hey,",
  "If I could go back and talk to my 18-year-old self, I'd say this:",
  "The world is changing fast. Most colleges haven't.",
  "What you learn today might be outdated by the time you graduate.",
  "Don't wait for 3rd year to \"get serious.\" Start building now.",
  "Grades are fine. Projects get you hired.",
  "Learn from people who've done it — not just those who teach it.",
  "Programming, AI, and data science? They're your new superpowers.",
  "You'll fail. That's fine. Keep building. Keep moving.",
  "Start small. But start now. You'll figure the rest out as you go.",
  "You've got this. I believe in you.",
  "— Anupam Pederla,",
  "Co-Founder & COO, Nxtwave"
];

const Index = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const comparisonSliderRef = useRef<HTMLDivElement>(null);
  const scholarshipRef = useRef<HTMLDivElement>(null);

  const scrollToSection1 = () => scrollToSection(section1Ref);
  const scrollToComparisonSlider = () => scrollToSection(comparisonSliderRef);
  const scrollToScholarship = () => scrollToSection(scholarshipRef);

  return (
    <div className="min-h-screen">
      <HeroSection 
        name={employeeData.name}
        designation={employeeData.designation}
        profileImage={employeeData.profileImage}
        onCtaClick={scrollToSection1}
      />
      
      <div ref={section1Ref}>
        <NotebookSection 
          title="A Letter to My 18-Year-Old Self"
          lines={notebookLines}
          name={employeeData.name}
          designation={employeeData.designation}
          onCtaClick={scrollToScholarship}
        />
      </div>
      
      <div ref={comparisonSliderRef}>
        <ComparisonSlider 
          title="Traditional College Teaching vs Industry Expectation"
          slides={[
            {
              leftTitle: "Traditional Classroom",
              leftDescription: "Learning through lectures and textbooks with limited hands-on practice.",
              leftImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200",
              leftIcon: "🏫",
              
              rightTitle: "Industry Demands",
              rightDescription: "Practical skills, problem-solving abilities, and experience with real tools.",
              rightImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
              rightIcon: "💼"
            },
            {
              leftTitle: "Outdated Curriculum",
              leftDescription: "Content often lags years behind current industry practices and technologies.",
              leftImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200",
              leftIcon: "📚",
              
              rightTitle: "Cutting-Edge Skills",
              rightDescription: "Companies need professionals familiar with the latest tools and methodologies.",
              rightImage: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200",
              rightIcon: "🚀"
            },
            {
              leftTitle: "Theoretical Knowledge",
              leftDescription: "Focus on memorization and academic concepts with limited application.",
              leftImage: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200",
              leftIcon: "🔍",
              
              rightTitle: "Applied Learning",
              rightDescription: "Emphasis on building real projects and solving actual business problems.",
              rightImage: "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=1200",
              rightIcon: "⚙️"
            },
            {
              leftTitle: "Limited Industry Exposure",
              leftDescription: "Few opportunities to interact with working professionals in the field.",
              leftImage: "https://images.unsplash.com/photo-1601807576163-587225545555?q=80&w=1200",
              leftIcon: "🎓",
              
              rightTitle: "Industry Connections",
              rightDescription: "Direct mentorship from professionals currently working in the industry.",
              rightImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
              rightIcon: "🌐"
            },
            {
              leftTitle: "Standardized Learning",
              leftDescription: "One-size-fits-all approach regardless of individual learning style or goals.",
              leftImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200",
              leftIcon: "📝",
              
              rightTitle: "Personalized Growth",
              rightDescription: "Tailored learning paths and projects based on career goals and interests.",
              rightImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
              rightIcon: "🎯"
            }
          ]}
        />
        
        <div className="bg-accent py-12 text-center">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">What if there was a better way to meet the industry expectation?</h3>
            <div className="flex justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2"
                onClick={() => window.location.href = "https://www.niatindia.com/"}
              >
                🔘 Explore NIAT <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <VideoSection 
        title="Why Top Companies Prefer NxtWave Students"
        videoUrl="https://www.youtube.com/watch?v=-U_YQ3W50nE&t=71s"
        description="NxtWave students craved a name for themselves in the IT industry. Hear it directly from the CEOs, CXOs and HRs of tech companies."
      />

      <div ref={scholarshipRef} id="scholarship">
        <ScholarshipSection name={employeeData.name} />
      </div>

      {/* Second VideoSection with updated title */}
      <VideoSection 
        title="Life at NIAT"
        videoUrl="https://www.youtube.com/watch?v=tmcVs6bg1wM&t=130s"
        description="This is where friendships bloom, ideas ignite, and tech dreams take flight. Whether it's high-energy hackathons, intense sports battles, or the guidance of SuperMentors, every moment at NIAT is a step towards the future."
      />

      <StudentStoriesScroll className="mt-0" />

      <Footer />
    </div>
  );
};

export default Index;
