
import React, { useState, useEffect } from 'react';
import { Film, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Photo {
  id: string;
  src: string;
  name: string;
  date: string;
  type?: 'image' | 'video';
}

interface PhotoCarouselProps {
  photos: Photo[];
  onPhotoClick?: (photo: Photo) => void;
}

const PhotoCarousel = ({ photos, onPhotoClick }: PhotoCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Auto-rotate photos every 5 seconds
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="win95-window p-4 w-full max-w-[700px] mx-auto relative overflow-hidden">
      <div className="win95-window-title mb-4 flex justify-between items-center">
        <span>Memory Showcase</span>
        <div className="flex space-x-1">
          <span className="h-3 w-3 bg-[#FF5E5B] border border-black inline-block"></span>
          <span className="h-3 w-3 bg-[#FDB44B] border border-black inline-block"></span>
          <span className="h-3 w-3 bg-[#48B5AF] border border-black inline-block"></span>
        </div>
      </div>
      
      <Carousel className="w-full" setApi={(api) => {
        if (api) api.scrollTo(activeIndex);
      }}>
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3 p-2">
              <div 
                className={`win95-inset p-1 cursor-pointer transition-all duration-300 h-full ${index === activeIndex ? 'ring-2 ring-[#FDB44B] scale-105' : 'hover:opacity-90'}`}
                onClick={() => onPhotoClick?.(photo)}
              >
                {photo.type === 'video' ? (
                  <div className="relative w-full h-40 overflow-hidden">
                    <video 
                      src={photo.src} 
                      className="w-full h-full object-cover" 
                      muted
                      loop
                      autoPlay
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Film size={24} className="text-white animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-40 overflow-hidden">
                    <img 
                      src={photo.src} 
                      alt={photo.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                      {photo.date}
                    </div>
                  </div>
                )}
                <p className="text-xs text-white truncate mt-1 font-pixel">{photo.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
      
      <div className="flex justify-center mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full ${index === activeIndex ? 'bg-[#FDB44B]' : 'bg-gray-400'}`}
          />
        ))}
      </div>
      
      <p className="text-sm text-gray-400 text-center mt-2 px-4 font-mono">Swipe or use the arrows to navigate through time</p>
    </div>
  );
};

export default PhotoCarousel;
