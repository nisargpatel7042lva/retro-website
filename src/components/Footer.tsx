
import React from 'react';
import { Monitor, Calendar, Film, HelpCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F4C81] text-white py-8 px-4 border-t-2 border-[#FDB44B]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img src="/lovable-uploads/6ba56f38-e3db-421f-a932-0a07bfd09d79.png" alt="REWIND Logo" className="h-12 mr-3" />
              <div>
                <h3 className="font-pixel text-xl text-[#FF5E5B]">REWIND</h3>
                <p className="text-xs text-gray-400">Memory Lane Retro Edition</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="win95-window p-2 inline-block mb-2">
                <Monitor size={16} className="mr-1 inline" />
                <span className="text-xs">Photo Viewer</span>
              </div>
              <div className="win95-window p-2 inline-block">
                <Film size={16} className="mr-1 inline" />
                <span className="text-xs">Video Memories</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="win95-window p-2 inline-block mb-2">
                <Calendar size={16} className="mr-1 inline" />
                <span className="text-xs">Timeline View</span>
              </div>
              <div className="win95-window p-2 inline-block">
                <HelpCircle size={16} className="mr-1 inline" />
                <span className="text-xs">Help Center</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="win95-inset p-3 text-center">
          <div className="text-xs">
            <p className="font-pixel text-[#48B5AF] mb-1">Copyright © {currentYear} REWIND | All rights reserved</p>
            <p className="text-gray-400">Made with nostalgia in mind</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 font-mono">Bringing back the good old days, one pixel at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
