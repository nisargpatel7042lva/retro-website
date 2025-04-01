
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  User, 
  FolderOpen, 
  Settings, 
  HelpCircle, 
  PowerOff,
  Monitor,
  Image,
  Info,
  Calendar,
  Film
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGoogleAuth: () => void;
  onOpenMemories: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onShutdown: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ 
  isOpen, 
  onClose,
  onOpenGoogleAuth,
  onOpenMemories,
  onOpenSettings,
  onOpenHelp,
  onShutdown
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { 
      icon: <User size={16} className="text-win95-accent" />, 
      label: 'Connect to Google', 
      onClick: onOpenGoogleAuth,
      description: 'Link your account'
    },
    { 
      icon: <FolderOpen size={16} className="text-win95-highlight" />, 
      label: 'My Memories', 
      onClick: onOpenMemories,
      description: 'Browse your photos'
    },
    { 
      icon: <Monitor size={16} className="text-green-500" />, 
      label: 'Photo Viewer', 
      onClick: onOpenMemories,
      description: 'View slideshows'
    },
    { 
      icon: <Film size={16} className="text-blue-400" />, 
      label: 'Video Memories', 
      onClick: onOpenMemories,
      description: 'Play video memories'
    },
    { 
      icon: <Calendar size={16} className="text-yellow-400" />, 
      label: 'Timeline', 
      onClick: onOpenMemories,
      description: 'See memories by date'
    },
    { 
      icon: <Info size={16} className="text-yellow-400" />, 
      label: 'About REWIND', 
      onClick: onOpenHelp,
      description: 'App information'
    },
    { 
      icon: <Settings size={16} className="text-gray-400" />, 
      label: 'Settings', 
      onClick: onOpenSettings,
      description: 'Configure app'
    },
    { 
      icon: <HelpCircle size={16} className="text-purple-400" />, 
      label: 'Help', 
      onClick: onOpenHelp,
      description: 'Get support'
    }
  ];

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    window.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed bottom-10 left-0 w-80 bg-[#C0C0C0] border-2 shadow-win95-outset z-50 animate-pixel-fade-in" 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-win95-accent p-2 flex items-center">
        <div className="w-8 h-full bg-[#C0C0C0] flex justify-center items-center font-pixel text-black text-xs transform -rotate-90 mr-2">
          REWIND
        </div>
        <div className="text-white font-mono">
          <p className="font-bold">Memory Lane</p>
          <p className="text-xs">Retro Edition</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 divide-y divide-gray-600">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center p-2 hover:bg-[#000080] hover:text-white text-left text-sm"
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
              onClose();
            }}
          >
            <span className="w-6 h-6 flex items-center justify-center mr-3">{item.icon}</span>
            <div className="flex flex-col">
              <span>{item.label}</span>
              <span className="text-xs text-gray-500 hover:text-gray-300">{item.description}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="border-t-2 border-t-[#808080] mt-2">
        <button
          className="w-full flex items-center p-2 hover:bg-[#000080] hover:text-white text-left bg-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            onShutdown();
          }}
        >
          <PowerOff size={16} className="mr-3 text-red-500" />
          <span className="font-bold">Shut Down</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
