
import React, { useEffect, useState } from 'react';
import { Monitor, FolderOpen } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface MinimizedWindow {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onRestore: () => void;
}

interface TaskbarProps {
  onStartClick: (event: React.MouseEvent) => void;
  isStartMenuOpen: boolean;
  minimizedWindows?: MinimizedWindow[];
  onMyPhotosClick?: () => void;
  onMemoryLaneClick?: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  onStartClick, 
  isStartMenuOpen, 
  minimizedWindows = [],
  onMyPhotosClick,
  onMemoryLaneClick
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute - using Indian Standard Time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time to Indian Standard Time (IST is UTC+5:30)
  const formatTimeIST = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    return currentTime.toLocaleTimeString('en-IN', options);
  };

  return (
    <div className="win95-taskbar fixed bottom-0 left-0 right-0 z-50 flex items-center">
      <button 
        className={`win95-start-button ${isStartMenuOpen ? 'shadow-win95-inset' : ''}`}
        onClick={onStartClick}
      >
        {/* Windows logo icon with retro colors */}
        <div className="w-5 h-5 bg-[#0F4C81] flex items-center justify-center mr-1">
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
            <div className="bg-[#FF5E5B]"></div>
            <div className="bg-[#FDB44B]"></div>
            <div className="bg-[#48B5AF]"></div>
            <div className="bg-[#8AC6D0]"></div>
          </div>
        </div>
        <span className="text-sm font-bold">Start</span>
      </button>
      
      <div className="flex space-x-1">
        <button 
          className="win95-button flex items-center px-2 py-0.5"
          onClick={onMyPhotosClick}
        >
          <Monitor size={16} className="mr-1 text-[#0F4C81]" />
          <span className="text-xs">My Photos</span>
        </button>
        <button 
          className="win95-button flex items-center px-2 py-0.5"
          onClick={onMemoryLaneClick}
        >
          <FolderOpen size={16} className="mr-1 text-[#FF5E5B]" />
          <span className="text-xs">Memory Lane</span>
        </button>
      </div>
      
      {minimizedWindows.length > 0 && (
        <div className="flex ml-2 max-w-[50vw] overflow-x-auto overflow-y-hidden">
          <ScrollArea className="w-full max-w-[50vw]" orientation="horizontal">
            <div className="flex space-x-1">
              {minimizedWindows.map((window) => (
                <button
                  key={window.id}
                  onClick={window.onRestore}
                  className="win95-button flex items-center px-2 py-0.5 min-w-[100px]"
                >
                  {window.icon}
                  <span className="text-xs truncate">{window.title}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      
      <div className="ml-auto text-xs bg-[#C0C0C0] shadow-win95-inset px-2 py-1">
        {formatTimeIST()}
      </div>
    </div>
  );
};

export default Taskbar;
