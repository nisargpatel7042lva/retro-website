
import React, { useEffect, useState } from 'react';

interface ShutdownScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const ShutdownScreen: React.FC<ShutdownScreenProps> = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("C:\\> Shutting down system...");

  useEffect(() => {
    if (isVisible) {
      const textInterval = setInterval(() => {
        setText(prev => {
          if (prev === "C:\\> Shutting down system...") {
            return "C:\\> Saving your memories...";
          } else if (prev === "C:\\> Saving your memories...") {
            return "C:\\> Closing Windows...";
          } else if (prev === "C:\\> Closing Windows...") {
            return "C:\\> Goodbye! It's now safe to turn off your computer.";
          }
          return prev;
        });
      }, 1000);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 5;
          if (newValue >= 100) {
            clearInterval(progressInterval);
            clearInterval(textInterval);
            setTimeout(() => {
              onComplete();
            }, 1500);
          }
          return newValue;
        });
      }, 200);

      return () => {
        clearInterval(progressInterval);
        clearInterval(textInterval);
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center animate-pixel-fade-in">
      <div className="win95-window w-[640px] p-4">
        <div className="win95-window-title mb-4">
          <span>Command Prompt</span>
        </div>
        <div className="bg-black text-win95-text-green p-6 font-mono">
          <p className="mb-6">{text}</p>
          <div className="win95-progress w-full mb-3">
            <div 
              className="win95-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-right">{progress}% complete</p>
        </div>
      </div>
    </div>
  );
};

export default ShutdownScreen;
