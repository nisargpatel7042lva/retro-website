
import React from 'react';
import WindowsButton from './WindowsButton';
import { Film, Camera, Clock, Monitor } from 'lucide-react';

interface AboutSectionProps {
  onConnectClick: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onConnectClick }) => {
  return (
    <section className="py-12 px-4 bg-[#0F4C81] text-white" id="about">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-pixel text-[#FDB44B] text-2xl md:text-3xl mb-6 text-center">About Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="win95-window p-4">
            <div className="win95-window-title mb-2">
              <span>Photo Memories</span>
            </div>
            <div className="flex items-start">
              <Camera size={24} className="text-[#FF5E5B] mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg mb-2 font-bold">Photo Collections</h3>
                <p className="text-sm mb-4">
                  REWIND helps you organize and explore your photo memories with a nostalgic interface. 
                  Browse through your collections like it's 1995!
                </p>
              </div>
            </div>
          </div>
          
          <div className="win95-window p-4">
            <div className="win95-window-title mb-2">
              <span>Video Memories</span>
            </div>
            <div className="flex items-start">
              <Film size={24} className="text-[#48B5AF] mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg mb-2 font-bold">Video Playback</h3>
                <p className="text-sm mb-4">
                  Relive your video memories with our retro media player. Watch old videos with the 
                  nostalgic charm of vintage computer interfaces.
                </p>
              </div>
            </div>
          </div>
          
          <div className="win95-window p-4">
            <div className="win95-window-title mb-2">
              <span>Timeline View</span>
            </div>
            <div className="flex items-start">
              <Clock size={24} className="text-[#FDB44B] mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg mb-2 font-bold">Chronological Organization</h3>
                <p className="text-sm mb-4">
                  Browse your memories arranged in a timeline format. Scroll through years
                  and revisit moments from specific dates with our intuitive interface.
                </p>
              </div>
            </div>
          </div>
          
          <div className="win95-window p-4">
            <div className="win95-window-title mb-2">
              <span>Vintage Themes</span>
            </div>
            <div className="flex items-start">
              <Monitor size={24} className="text-[#FF5E5B] mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg mb-2 font-bold">Multiple OS Themes</h3>
                <p className="text-sm mb-4">
                  Choose your favorite vintage operating system look! Switch between Windows 95, 
                  Windows 98, and Windows XP themes for a truly nostalgic experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <WindowsButton 
            className="px-6 py-3 text-lg"
            onClick={onConnectClick}
          >
            Try Our Services
          </WindowsButton>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
