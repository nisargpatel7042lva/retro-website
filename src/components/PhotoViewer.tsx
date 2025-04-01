
import React, { useState, useEffect } from 'react';
import WindowsWindow from './WindowsWindow';
import WindowsButton from './WindowsButton';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Play, Pause, Film, Image } from 'lucide-react';

interface PhotoViewerProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  zIndex?: number;
  id?: string;
  photo: {
    id: string;
    src: string;
    name: string;
    date: string;
    type?: 'image' | 'video';
  } | null;
  photos?: {
    id: string;
    src: string;
    name: string;
    date: string;
    type?: 'image' | 'video';
  }[];
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  id,
  photo,
  photos = []
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Find the current photo index if photos array is provided
  useEffect(() => {
    if (photo && photos && photos.length > 0) {
      const index = photos.findIndex(p => p.id === photo.id);
      if (index >= 0) {
        setCurrentIndex(index);
        setCurrentPhoto(photos[index]);
      }
    }
  }, [photo, photos]);
  
  // Handle slideshow functionality
  useEffect(() => {
    if (!isPlaying || !photos || photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % photos.length;
        setCurrentPhoto(photos[nextIndex]);
        return nextIndex;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPlaying, photos]);
  
  const handlePrevious = () => {
    if (!photos || photos.length <= 1) return;
    
    setCurrentIndex(prev => {
      const nextIndex = prev === 0 ? photos.length - 1 : prev - 1;
      setCurrentPhoto(photos[nextIndex]);
      return nextIndex;
    });
  };
  
  const handleNext = () => {
    if (!photos || photos.length <= 1) return;
    
    setCurrentIndex(prev => {
      const nextIndex = (prev + 1) % photos.length;
      setCurrentPhoto(photos[nextIndex]);
      return nextIndex;
    });
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  if (!currentPhoto) return null;

  const isVideo = currentPhoto.type === 'video';
  
  return (
    <WindowsWindow 
      title={`REWIND Viewer - ${currentPhoto.name}`}
      isOpen={isOpen} 
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      id={id}
      width="w-[700px]"
      height="h-[500px]"
    >
      <div className="flex h-full">
        {/* Main photo/video display with CRT effect */}
        <div className="flex-1 crt-effect p-2 flex items-center justify-center">
          <div className="win95-window p-1 w-full h-full overflow-hidden relative">
            {isVideo ? (
              <video 
                src={currentPhoto.src} 
                className="w-full h-full object-contain"
                controls
                autoPlay={isPlaying}
                loop={isPlaying}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={currentPhoto.src} 
                alt={currentPhoto.name} 
                className="w-full h-full object-contain"
              />
            )}
            
            {/* Slideshow controls overlay */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex bg-black/70 rounded p-1">
              <WindowsButton 
                className="w-8 h-8 flex items-center justify-center"
                onClick={handlePrevious}
              >
                <ChevronLeft size={16} />
              </WindowsButton>
              
              <WindowsButton 
                className="w-8 h-8 flex items-center justify-center mx-1"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </WindowsButton>
              
              <WindowsButton 
                className="w-8 h-8 flex items-center justify-center"
                onClick={handleNext}
              >
                <ChevronRight size={16} />
              </WindowsButton>
            </div>
          </div>
        </div>
        
        {/* Right sidebar with metadata */}
        <div className="w-1/4 win95-inset p-2 ml-2 text-white">
          <h3 className="font-pixel text-sm text-win95-highlight mb-4">File Details</h3>
          
          <div className="mb-4">
            <div className="flex items-center text-xs mb-2">
              {isVideo ? (
                <Film size={12} className="mr-1 text-[#48B5AF]" />
              ) : (
                <Image size={12} className="mr-1 text-[#FF5E5B]" />
              )}
              <span>Type:</span>
            </div>
            <div className="win95-inset p-1 text-xs">{isVideo ? 'Video' : 'Photo'}</div>
          </div>

          <div className="mb-4">
            <div className="flex items-center text-xs mb-2">
              <Calendar size={12} className="mr-1" />
              <span>Date:</span>
            </div>
            <div className="win95-inset p-1 text-xs">{currentPhoto.date}</div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center text-xs mb-2">
              <MapPin size={12} className="mr-1" />
              <span>Location:</span>
            </div>
            <div className="win95-inset p-1 text-xs">Unknown</div>
          </div>
          
          {photos && photos.length > 0 && (
            <div className="mt-4">
              <div className="text-xs mb-2">Slideshow Progress:</div>
              <div className="win95-progress">
                <div 
                  className="win95-progress-bar" 
                  style={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-right">{currentIndex + 1} of {photos.length}</div>
            </div>
          )}
        </div>
      </div>
    </WindowsWindow>
  );
};

export default PhotoViewer;
