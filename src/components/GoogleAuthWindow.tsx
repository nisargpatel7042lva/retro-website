
import React, { useState } from 'react';
import WindowsWindow from './WindowsWindow';
import WindowsButton from './WindowsButton';

interface GoogleAuthWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id?: string;
  zIndex?: number;
}

const GoogleAuthWindow: React.FC<GoogleAuthWindowProps> = ({
  isOpen,
  onClose,
  onSuccess,
  id,
  zIndex
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onSuccess();
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <WindowsWindow 
      title="Connect to Google Photos" 
      isOpen={isOpen} 
      onClose={onClose}
      width="w-[400px]"
      id={id}
      zIndex={zIndex}
    >
      {!isLoading ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex items-center mb-4">
            <div className="win95-inset p-2 mb-4 text-center font-pixel text-sm text-win95-highlight">
              <p>Warning: Authentication Required</p>
              <p className="text-xs mt-2 font-mono text-white">
                To access your memories, please connect to Google Photos
              </p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="win95-inset px-2 py-1 text-white outline-none"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="win95-inset px-2 py-1 text-white outline-none"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <WindowsButton type="button" onClick={onClose}>
              Cancel
            </WindowsButton>
            <WindowsButton type="submit">
              OK
            </WindowsButton>
          </div>
        </form>
      ) : (
        <div className="p-4 flex flex-col items-center">
          <p className="text-win95-text-green font-mono mb-4">Connecting to Google Photos...</p>
          <div className="win95-progress w-full mb-2">
            <div 
              className="win95-progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-white font-mono mt-2">{progress}% complete</p>
        </div>
      )}
    </WindowsWindow>
  );
};

export default GoogleAuthWindow;
