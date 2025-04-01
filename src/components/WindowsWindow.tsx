
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import WindowsTitleBar from './WindowsTitleBar';

interface WindowsWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  width?: string;
  height?: string;
  isDraggable?: boolean;
  isMinimized?: boolean;
  onMinimize?: () => void;
  id?: string;
  zIndex?: number;
  onFocus?: () => void;
}

const WindowsWindow: React.FC<WindowsWindowProps> = ({
  title,
  children,
  className,
  isOpen = true,
  onClose,
  width = 'w-[500px]',
  height = 'h-auto',
  isDraggable = true,
  isMinimized = false,
  onMinimize,
  id,
  zIndex = 40,
  onFocus
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const [prevSize, setPrevSize] = useState({ width, height, x: 0, y: 0 });
  
  // Handle window dragging
  useEffect(() => {
    if (!isDraggable || isMaximized) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        
        // Ensure window stays within viewport bounds
        const newX = Math.max(0, Math.min(window.innerWidth - 200, position.x + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - 100, position.y + dy));
        
        setPosition({ x: newX, y: newY });
        setStartPos({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPos, position, isDraggable, isMaximized]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDraggable && !isMaximized) {
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      if (onFocus) onFocus();
    }
  };

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore to previous size
      setIsMaximized(false);
      setPosition({ x: prevSize.x, y: prevSize.y });
    } else {
      // Save current size and position
      setPrevSize({
        width,
        height,
        x: position.x,
        y: position.y
      });
      
      // Maximize
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMinimize = () => {
    if (onMinimize) onMinimize();
  };

  useEffect(() => {
    // Focus window when clicked
    const handleWindowClick = () => {
      if (onFocus) onFocus();
    };
    
    const windowElement = windowRef.current;
    if (windowElement) {
      windowElement.addEventListener('mousedown', handleWindowClick);
    }
    
    return () => {
      if (windowElement) {
        windowElement.removeEventListener('mousedown', handleWindowClick);
      }
    };
  }, [onFocus]);

  if (!isOpen || isMinimized) return null;

  return (
    <div 
      ref={windowRef}
      className={cn(
        "win95-window flex flex-col animate-pixel-fade-in", 
        isMaximized ? "w-screen h-[calc(100vh-30px)]" : width,
        !isMaximized && height,
        isDragging && "opacity-80",
        className
      )}
      style={{
        position: 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        cursor: isDragging ? 'grabbing' : 'auto',
        zIndex
      }}
    >
      <WindowsTitleBar 
        title={title} 
        onClose={onClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onMouseDown={handleMouseDown}
      />
      <div className="flex-1 p-2 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default WindowsWindow;
