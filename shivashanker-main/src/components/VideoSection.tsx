
import React from 'react';
import ScrollSection from './ScrollSection';

interface VideoSectionProps {
  title: string;
  description: string;
  videoUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  title, 
  description, 
  videoUrl 
}) => {
  // Extract video ID from YouTube URL
  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

  return (
    <ScrollSection className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          {title}
        </h2>
        
        <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          {description}
        </p>
        
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
          <iframe 
            src={embedUrl}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-[28rem] md:h-[32rem] rounded-lg"
          ></iframe>
        </div>
      </div>
    </ScrollSection>
  );
};

export default VideoSection;
