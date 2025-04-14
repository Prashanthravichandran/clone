
import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollSection from './ScrollSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScholarshipSectionProps {
  name: string;
}

const ScholarshipSection: React.FC<ScholarshipSectionProps> = ({ name }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would send the data to a server
    alert("Application submitted successfully!");
  };

  return (
    <ScrollSection className="bg-accent py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            🎓 Ready to build your future?
          </h2>
          <p className="text-lg text-gray-700">
            Apply below to be considered for {name}'s Special Scholarship Opportunity.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Your full name" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email address" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" placeholder="Your WhatsApp number" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="education">Education Status</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your education status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12th-studying">Currently in 12th grade</SelectItem>
                    <SelectItem value="12th-completed">Completed 12th grade</SelectItem>
                    <SelectItem value="college-studying">Currently in college</SelectItem>
                    <SelectItem value="college-completed">Completed college</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="city">City or Town</Label>
                <Input id="city" placeholder="Your city or town" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="why">Why NIAT? (Tell us your story)</Label>
                <Textarea 
                  id="why" 
                  placeholder="What interests you about NIAT?" 
                  className="mt-1 min-h-32"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-secondary text-primary hover:bg-secondary/90 font-medium text-lg py-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Apply Now for Scholarship Review
            </Button>
          </form>
        </div>
      </div>
    </ScrollSection>
  );
};

export default ScholarshipSection;
