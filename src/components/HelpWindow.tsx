
import React from 'react';
import WindowsWindow from './WindowsWindow';
import WindowsButton from './WindowsButton';
import { HelpCircle, Info, MessageSquare, Mail } from 'lucide-react';

interface HelpWindowProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  zIndex?: number;
}

const HelpWindow: React.FC<HelpWindowProps> = ({ isOpen, onClose, id, zIndex }) => {
  if (!isOpen) return null;

  return (
    <WindowsWindow
      title="Help Center"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[500px]"
      id={id}
      zIndex={zIndex}
    >
      <div className="p-4">
        <h2 className="font-pixel text-win95-highlight text-xl mb-4">REWIND Help</h2>
        
        <div className="win95-inset p-3 mb-4">
          <div className="flex items-start mb-3">
            <Info size={18} className="text-win95-highlight mr-2 flex-shrink-0 mt-1" />
            <p className="text-white text-sm">
              REWIND lets you connect your Google Photos account to view your memories in a nostalgic Windows 95/XP interface.
            </p>
          </div>
          
          <div className="flex items-start mb-3">
            <HelpCircle size={18} className="text-win95-highlight mr-2 flex-shrink-0 mt-1" />
            <p className="text-white text-sm">
              Click "Connect to Google Photos" to authorize access to your photos. Once connected, use "My Memories" to browse your photos.
            </p>
          </div>
          
          <div className="flex items-start">
            <MessageSquare size={18} className="text-win95-highlight mr-2 flex-shrink-0 mt-1" />
            <p className="text-white text-sm">
              For additional help, contact our support team at support@rewind-memories.com
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <WindowsButton
            onClick={() => {
              window.open('mailto:support@rewind-memories.com', '_blank');
            }}
            iconLeft={<Mail size={16} />}
          >
            Contact Support
          </WindowsButton>
          
          <WindowsButton onClick={onClose}>
            Close
          </WindowsButton>
        </div>
      </div>
    </WindowsWindow>
  );
};

export default HelpWindow;
