
import React, { useState, useEffect } from 'react';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import GoogleAuthWindow from '@/components/GoogleAuthWindow';
import MemoriesExplorer from '@/components/MemoriesExplorer';
import PhotoViewer from '@/components/PhotoViewer';
import WindowsWindow from '@/components/WindowsWindow';
import WindowsButton from '@/components/WindowsButton';
import ShutdownScreen from '@/components/ShutdownScreen';
import HelpWindow from '@/components/HelpWindow';
import SettingsWindow from '@/components/SettingsWindow';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import PhotoCarousel from '@/components/PhotoCarousel';
import { FolderOpen, Camera, User, Monitor, HelpCircle, Settings, Film, Calendar, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Photo {
  id: string;
  src: string;
  name: string;
  date: string;
  type?: 'image' | 'video';
}

interface Window {
  id: string;
  type: 'googleAuth' | 'memories' | 'photo' | 'welcome' | 'help' | 'settings';
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  data?: any;
}

const Index = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [cursorClicked, setCursorClicked] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [userName, setUserName] = useState('');
  const [activeTheme, setActiveTheme] = useState('windows95');

  const [openWindows, setOpenWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);

  const allPhotos: Photo[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1541873676-a18131494184', name: 'Trip.jpg', date: '01/15/2021', type: 'image' },
    { id: '2', src: 'https://images.unsplash.com/photo-1518481852452-9415dca8c77d', name: 'Family.jpg', date: '03/22/2021', type: 'image' },
    { id: '3', src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', name: 'Beach.jpg', date: '07/04/2021', type: 'image' },
    { id: '4', src: 'https://images.unsplash.com/photo-1554232682-b9ef9c92f8de', name: 'Birthday.jpg', date: '02/10/2022', type: 'image' },
    { id: '5', src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e', name: 'Work.jpg', date: '05/30/2022', type: 'image' },
    { 
      id: '6', 
      src: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4', 
      name: 'Highway.mp4', 
      date: '06/15/2022', 
      type: 'video' 
    },
    { 
      id: '7', 
      src: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4', 
      name: 'Party.mp4', 
      date: '08/20/2022', 
      type: 'video' 
    }
  ];

  const openWindow = (type: Window['type'], title: string, data?: any) => {
    const id = `window-${Date.now()}`;
    const newWindow: Window = {
      id,
      type,
      title,
      isOpen: true,
      isMinimized: false,
      zIndex: nextZIndex,
      data
    };
    
    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
    
    return id;
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(window => window.id !== id));
    
    if (activeWindowId === id) {
      const remainingWindows = openWindows.filter(window => window.id !== id && !window.isMinimized);
      if (remainingWindows.length > 0) {
        const highestZIndexWindow = remainingWindows.reduce((prev, current) => 
          current.zIndex > prev.zIndex ? current : prev
        );
        setActiveWindowId(highestZIndexWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
    
    if (activeWindowId === id) {
      const remainingWindows = openWindows.filter(window => window.id !== id && !window.isMinimized);
      if (remainingWindows.length > 0) {
        const highestZIndexWindow = remainingWindows.reduce((prev, current) => 
          current.zIndex > prev.zIndex ? current : prev
        );
        setActiveWindowId(highestZIndexWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const restoreWindow = (id: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false, zIndex: nextZIndex } : window
    ));
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
  };

  const focusWindow = (id: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, zIndex: nextZIndex } : window
    ));
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
  };

  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
    // Additional theme change logic could be added here
    console.log(`Theme changed to: ${theme}`);
  };

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  useEffect(() => {
    if (showIntro) {
      const cursorInterval = setInterval(() => {
        setCursorPosition(prev => ({
          x: Math.min(prev.x + 5, 80),
          y: Math.min(prev.y + 3, 70)
        }));
        
        if (Math.random() > 0.8) {
          setCursorType(['default', 'wait', 'text', 'pointer'][Math.floor(Math.random() * 4)]);
        }
      }, 50);

      setTimeout(() => {
        setCursorClicked(true);
        clearInterval(cursorInterval);
        
        setTimeout(() => {
          setShowIntro(false);
          setIntroComplete(true);
          
          openWindow('welcome', 'Welcome to REWIND - Memory Lane');
        }, 1500);
      }, 2000);

      return () => clearInterval(cursorInterval);
    }
  }, [showIntro]);

  const toggleStartMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleOpenGoogleAuth = () => {
    openWindow('googleAuth', 'Connect to Google');
  };

  const handleGoogleAuthSuccess = () => {
    const googleAuthWindow = openWindows.find(w => w.type === 'googleAuth');
    if (googleAuthWindow) {
      closeWindow(googleAuthWindow.id);
    }
    
    setIsAuthenticated(true);
    setUserName("User");
    openWindow('memories', 'My Memories - Explorer');
  };

  const handleOpenMemories = () => {
    if (isAuthenticated) {
      openWindow('memories', 'My Memories - Explorer');
    } else {
      handleOpenGoogleAuth();
    }
  };

  const handleOpenPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    openWindow('photo', `${photo.type === 'video' ? 'Video' : 'Photo'} Viewer - ${photo.name}`, { photo, photos: allPhotos });
  };

  const handleOpenHelp = () => {
    openWindow('help', 'Help');
  };

  const handleOpenSettings = () => {
    openWindow('settings', 'Settings');
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
  };

  const completeShutdown = () => {
    window.location.href = "about:blank";
  };

  const minimizedWindows = openWindows.filter(window => window.isMinimized).map(window => ({
    id: window.id,
    title: window.title,
    icon: window.type === 'memories' ? <FolderOpen size={16} className="mr-1" /> : 
          window.type === 'photo' ? <Camera size={16} className="mr-1" /> :
          window.type === 'googleAuth' ? <User size={16} className="mr-1" /> :
          window.type === 'help' ? <HelpCircle size={16} className="mr-1" /> :
          window.type === 'settings' ? <Settings size={16} className="mr-1" /> :
          <Monitor size={16} className="mr-1" />,
    onRestore: () => restoreWindow(window.id)
  }));

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#0F4C81] flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[800px] h-[600px] bg-[#0F4C81] border-4 border-win95-window">
          <div className="win95-window-title w-full">
            <span>Command Prompt</span>
          </div>
          <div className="bg-black text-[#FF5E5B] p-4 h-full font-mono text-sm">
            <div className="mb-4">
              <p>C:\&gt; Initializing REWIND.exe</p>
              <p>C:\&gt; Searching for memory archives...</p>
              <p>C:\&gt; Loading nostalgic interface...</p>
              <p>C:\&gt; Click to enter Memory Lane...</p>
            </div>
            
            <div 
              className="absolute pointer-events-none"
              style={{ 
                left: `${cursorPosition.x}%`, 
                top: `${cursorPosition.y}%`,
                transition: 'all 0.05s linear'
              }}
            >
              {cursorType === 'default' && (
                <div className="w-4 h-4 border-2 border-[#FDB44B] rotate-45 transform transition-all duration-300"
                  style={{ 
                    transform: cursorClicked ? 'scale(15)' : 'rotate(45deg)',
                    opacity: cursorClicked ? 0 : 1,
                    backgroundColor: cursorClicked ? '#FDB44B' : 'transparent'
                  }}
                ></div>
              )}
              {cursorType === 'wait' && (
                <div className="w-5 h-5 border-2 border-[#FDB44B] rounded-full border-t-transparent animate-spin"></div>
              )}
              {cursorType === 'text' && (
                <div className="w-[2px] h-4 bg-[#FDB44B] animate-pulse"></div>
              )}
              {cursorType === 'pointer' && (
                <div className="w-3 h-3 border-2 border-[#FDB44B] border-b-0 border-r-0 -rotate-45"></div>
              )}
            </div>
            
            {cursorClicked && (
              <div className="absolute inset-0 bg-black animate-pixel-fade-in flex items-center justify-center">
                <img 
                  src="/public/6ba56f38-e3db-421f-a932-0a07bfd09d79.png" 
                  alt="REWIND Logo" 
                  className="h-24 mb-4" 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-y-auto flex flex-col relative bg-[#0F4C81]">
      <ScrollArea className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-10 relative">
          <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]"></div>
          
          {isAuthenticated ? (
            <div className="text-center mb-8 animate-pixel-fade-in">
              <h1 className="font-pixel text-[#FDB44B] text-4xl md:text-5xl mb-6 glitch-text">Hello, {userName}!</h1>
              <p className="text-white text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Welcome back to your memory lane. Your photos are ready to explore.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <WindowsButton 
                  className="px-4 py-2"
                  onClick={handleOpenMemories}
                  iconLeft={<FolderOpen size={18} />}
                >
                  View All Photos
                </WindowsButton>
              </div>
              
              <div className="mt-8 relative mx-auto">
                <PhotoCarousel photos={allPhotos} onPhotoClick={handleOpenPhoto} />
              </div>
            </div>
          ) : (
            <div className="text-center animate-pixel-fade-in">
              <h1 className="font-pixel text-[#FDB44B] text-4xl md:text-5xl mb-6 retro-glow">REWIND</h1>
              <p className="text-white text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Travel back in time with our nostalgic Windows experience. Connect your Google Photos 
                and rediscover your memories in retro style.
              </p>
              
              <div className="mt-8 relative mx-auto">
                <PhotoCarousel photos={allPhotos} onPhotoClick={handleOpenPhoto} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <WindowsButton 
                  className="px-6 py-3 text-lg"
                  onClick={handleOpenGoogleAuth}
                  iconLeft={<User size={18} />}
                >
                  Connect
                </WindowsButton>
                <WindowsButton 
                  className="px-6 py-3 text-lg"
                  onClick={handleOpenMemories}
                  iconLeft={<FolderOpen size={18} />}
                >
                  Explore Memories
                </WindowsButton>
              </div>
            </div>
          )}
        </section>
        
        <section id="features" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-[#FF5E5B] text-2xl md:text-3xl mb-6 text-center">Memory Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="win95-window p-4 text-center">
                <div className="flex justify-center mb-3">
                  <Camera size={32} className="text-[#FDB44B]" />
                </div>
                <h3 className="font-pixel text-white mb-2">Photo Library</h3>
                <p className="text-gray-400 text-sm">Browse your photos with our retro file explorer.</p>
              </div>
              
              <div className="win95-window p-4 text-center">
                <div className="flex justify-center mb-3">
                  <Film size={32} className="text-[#FDB44B]" />
                </div>
                <h3 className="font-pixel text-white mb-2">Video Memories</h3>
                <p className="text-gray-400 text-sm">Watch your favorite moments with nostalgic Windows Media Player.</p>
              </div>
              
              <div className="win95-window p-4 text-center">
                <div className="flex justify-center mb-3">
                  <Calendar size={32} className="text-[#FDB44B]" />
                </div>
                <h3 className="font-pixel text-white mb-2">Timeline View</h3>
                <p className="text-gray-400 text-sm">Scroll through your memories organized by time.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="about" className="py-16 px-4 bg-[#0F4C81] border-y-2 border-[#FDB44B]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-[#FF5E5B] text-2xl md:text-3xl mb-6 text-center">About REWIND</h2>
            
            <div className="win95-window p-6 text-white">
              <div className="win95-window-title mb-4">
                <span>About REWIND.exe</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="win95-inset p-3 h-full">
                    <img 
                      src="/public/6ba56f38-e3db-421f-a932-0a07bfd09d79.png" 
                      alt="REWIND Logo" 
                      className="w-full max-w-[180px] mx-auto mb-4" 
                    />
                    <div className="win95-progress mt-2">
                      <div className="win95-progress-bar" style={{width: '87%'}}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Version 1.0.4 Build 95</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <p className="mb-4 text-[#48B5AF] font-mono text-sm">
                    REWIND allows you to experience your digital memories with the charm of classic Windows interfaces.
                  </p>
                  
                  <div className="win95-inset p-3 mb-4">
                    <p className="text-xs text-gray-300">
                      Our mission is to bring back the nostalgia of browsing through your old photo albums, 
                      but with modern cloud connectivity and sharing features. REWIND transforms your memories 
                      into an interactive retro experience that you can customize and share.
                    </p>
                  </div>
                  
                  <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} REWIND Team. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <AboutSection onConnectClick={handleOpenGoogleAuth} />
        
        <Footer />
      </ScrollArea>

      {openWindows.map(window => {
        if (window.type === 'welcome') {
          return (
            <WindowsWindow 
              key={window.id}
              id={window.id}
              title={window.title}
              isOpen={window.isOpen && !window.isMinimized}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              zIndex={window.zIndex}
              width="w-[90%] max-w-[500px]"
            >
              <div className="p-4 text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/public/6ba56f38-e3db-421f-a932-0a07bfd09d79.png" 
                    alt="REWIND Logo" 
                    className="h-16" 
                  />
                </div>
                <h1 className="font-pixel text-[#FF5E5B] text-xl mb-4">REWIND</h1>
                <p className="text-white mb-4">Welcome to your nostalgic memory lane experience! Connect your Google account to relive your past memories with a retro Windows aesthetic.</p>
                
                <div className="win95-inset p-2 mb-4 text-left">
                  <p className="text-[#48B5AF] font-mono text-sm">C:\&gt; Starting system...</p>
                  <p className="text-[#48B5AF] font-mono text-sm">C:\&gt; Loading Windows 95 nostalgic interface...</p>
                  <p className="text-[#48B5AF] font-mono text-sm">C:\&gt; Ready for your memories!</p>
                </div>
                
                <div className="flex justify-center">
                  <WindowsButton 
                    onClick={() => {
                      closeWindow(window.id);
                      handleOpenGoogleAuth();
                    }}
                  >
                    Get Started
                  </WindowsButton>
                </div>
              </div>
            </WindowsWindow>
          );
        }
        
        if (window.type === 'googleAuth') {
          return (
            <GoogleAuthWindow 
              key={window.id}
              isOpen={window.isOpen && !window.isMinimized}
              onClose={() => closeWindow(window.id)}
              onSuccess={handleGoogleAuthSuccess}
              id={window.id}
              zIndex={window.zIndex}
            />
          );
        }
        
        if (window.type === 'memories') {
          return (
            <MemoriesExplorer 
              key={window.id}
              isOpen={window.isOpen && !window.isMinimized}
              onClose={() => closeWindow(window.id)}
              onOpenPhoto={handleOpenPhoto}
              onMinimize={() => minimizeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              zIndex={window.zIndex}
              id={window.id}
            />
          );
        }
        
        if (window.type === 'photo') {
          return (
            <PhotoViewer 
              key={window.id}
              isOpen={window.isOpen && !window.isMinimized}
              onClose={() => closeWindow(window.id)}
              photo={window.data?.photo}
              photos={window.data?.photos}
              onMinimize={() => minimizeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              zIndex={window.zIndex}
              id={window.id}
            />
          );
        }
        
        if (window.type === 'help') {
          return (
            <HelpWindow 
              key={window.id}
              isOpen={window.isOpen && !window.isMinimized}
              onClose={() => closeWindow(window.id)}
              id={window.id}
              zIndex={window.zIndex}
            />
          );
        }
        
        if (window.type === 'settings') {
          return (
            <SettingsWindow 
              key={window.id}
              isOpen={window.isOpen && !window.isMinimized}
              onClose={() => closeWindow(window.id)}
              id={window.id}
              zIndex={window.zIndex}
              onThemeChange={handleThemeChange}
            />
          );
        }
        
        return null;
      })}

      <ShutdownScreen 
        isVisible={isShuttingDown} 
        onComplete={completeShutdown} 
      />

      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)}
        onOpenGoogleAuth={handleOpenGoogleAuth}
        onOpenMemories={handleOpenMemories}
        onOpenSettings={handleOpenSettings}
        onOpenHelp={handleOpenHelp}
        onShutdown={handleShutdown}
      />

      <Taskbar 
        onStartClick={toggleStartMenu}
        isStartMenuOpen={isStartMenuOpen}
        minimizedWindows={minimizedWindows}
        onMyPhotosClick={handleOpenMemories}
        onMemoryLaneClick={handleOpenMemories}
      />
    </div>
  );
};

export default Index;
