
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, MessageCircle } from 'lucide-react';

interface ShareSectionProps {
  name: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ name }) => {
  const shareUrl = window.location.href;
  
  const shareToWhatsApp = () => {
    const text = `Check out ${name}'s story and advice for 12th grade students! ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  const shareToInstagram = () => {
    // Direct sharing to Instagram is limited, typically we'd copy the link
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied! You can now paste it in your Instagram story or post.');
    });
  };

  return (
    <div className="bg-primary py-6 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg">
            Know someone who might find this helpful?
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button 
            onClick={shareToWhatsApp}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Share on WhatsApp
          </Button>
          
          <Button 
            onClick={shareToInstagram}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2 text-white"
          >
            <Share2 className="h-5 w-5" />
            Share on Instagram
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
