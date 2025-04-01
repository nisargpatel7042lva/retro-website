
import React from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowsTitleBarProps {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onMouseDown?: (event: React.MouseEvent) => void;
}

const WindowsTitleBar: React.FC<WindowsTitleBarProps> = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  onMouseDown
}) => {
  return (
    <div 
      className="win95-window-title"
      onMouseDown={onMouseDown}
    >
      <span className="text-xs tracking-tight truncate">{title}</span>
      <div className="flex items-center space-x-1">
        <button 
          onClick={onMinimize} 
          className="w-4 h-4 bg-[#C0C0C0] flex items-center justify-center border border-black hover:bg-gray-300"
        >
          <Minus size={8} className="text-black" />
        </button>
        <button 
          onClick={onMaximize} 
          className="w-4 h-4 bg-[#C0C0C0] flex items-center justify-center border border-black hover:bg-gray-300"
        >
          <Square size={8} className="text-black" />
        </button>
        <button 
          onClick={onClose} 
          className="w-4 h-4 bg-[#C0C0C0] flex items-center justify-center border border-black hover:bg-gray-300"
        >
          <X size={8} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default WindowsTitleBar;
