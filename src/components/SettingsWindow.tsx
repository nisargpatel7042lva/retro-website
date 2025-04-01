
import React, { useState } from 'react';
import WindowsWindow from './WindowsWindow';
import WindowsButton from './WindowsButton';
import { Save, RotateCcw, Volume2, Monitor, Eye, Film } from 'lucide-react';

interface SettingsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  zIndex?: number;
  onThemeChange?: (theme: string) => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({ 
  isOpen, 
  onClose, 
  id, 
  zIndex,
  onThemeChange
}) => {
  const [showEffects, setShowEffects] = useState(true);
  const [volume, setVolume] = useState(50);
  const [theme, setTheme] = useState("windows95");
  const [videoQuality, setVideoQuality] = useState("medium");

  const handleSaveSettings = () => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <WindowsWindow
      title="Settings"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[500px]"
      id={id}
      zIndex={zIndex}
    >
      <div className="p-4">
        <h2 className="font-pixel text-win95-highlight text-xl mb-4">REWIND Settings</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="win95-inset p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Eye size={16} className="mr-2 text-win95-highlight" />
                <span className="text-white text-sm">Show CRT Effects</span>
              </div>
              <label className="win95-checkbox flex items-center">
                <input 
                  type="checkbox" 
                  checked={showEffects} 
                  onChange={() => setShowEffects(!showEffects)} 
                  className="mr-2"
                />
                <span className="text-xs">{showEffects ? "On" : "Off"}</span>
              </label>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Volume2 size={16} className="mr-2 text-win95-highlight" />
                <span className="text-white text-sm">Sound Volume</span>
              </div>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="win95-slider w-32" 
                />
                <span className="text-xs ml-2 w-8">{volume}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Monitor size={16} className="mr-2 text-win95-highlight" />
                <span className="text-white text-sm">Theme</span>
              </div>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="win95-inset bg-win95-window text-white p-1 text-xs"
              >
                <option value="windows95">Windows 95</option>
                <option value="windowsXP">Windows XP</option>
                <option value="windows98">Windows 98</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Film size={16} className="mr-2 text-win95-highlight" />
                <span className="text-white text-sm">Video Quality</span>
              </div>
              <select 
                value={videoQuality} 
                onChange={(e) => setVideoQuality(e.target.value)}
                className="win95-inset bg-win95-window text-white p-1 text-xs"
              >
                <option value="low">Low (240p)</option>
                <option value="medium">Medium (480p)</option>
                <option value="high">High (720p)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <WindowsButton
            onClick={() => {
              // Reset to defaults
              setShowEffects(true);
              setVolume(50);
              setTheme("windows95");
              setVideoQuality("medium");
            }}
            iconLeft={<RotateCcw size={16} />}
          >
            Reset to Defaults
          </WindowsButton>
          
          <div className="flex space-x-2">
            <WindowsButton onClick={onClose}>
              Cancel
            </WindowsButton>
            <WindowsButton 
              variant="primary"
              onClick={handleSaveSettings}
              iconLeft={<Save size={16} />}
            >
              Save
            </WindowsButton>
          </div>
        </div>
      </div>
    </WindowsWindow>
  );
};

export default SettingsWindow;
