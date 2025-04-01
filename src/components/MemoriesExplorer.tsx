
import React, { useState } from 'react';
import WindowsWindow from './WindowsWindow';
import { Folder, FileImage, ChevronRight, Camera } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import WindowsButton from './WindowsButton';

interface MemoriesExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPhoto: (photo: Photo) => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  zIndex?: number;
  id?: string;
}

interface Photo {
  id: string;
  src: string;
  name: string;
  date: string;
}

// Enhanced mock data with more photos
const mockYears = ['2018', '2019', '2020', '2021', '2022', '2023'];
const mockPhotos: Record<string, Photo[]> = {
  '2018': [
    { id: '1', src: 'https://images.unsplash.com/photo-1541873676-a18131494184', name: 'Trip.jpg', date: '01/15/2018' },
    { id: '2', src: 'https://images.unsplash.com/photo-1518481852452-9415dca8c77d', name: 'Family.jpg', date: '03/22/2018' },
    { id: '3', src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', name: 'Beach.jpg', date: '07/04/2018' },
    { id: '4', src: 'https://images.unsplash.com/photo-1526285759996-71d5ee14dd8a', name: 'Vacation.jpg', date: '09/12/2018' },
    { id: '5', src: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4', name: 'Party.jpg', date: '11/30/2018' },
  ],
  '2019': [
    { id: '6', src: 'https://images.unsplash.com/photo-1554232682-b9ef9c92f8de', name: 'Birthday.jpg', date: '02/10/2019' },
    { id: '7', src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e', name: 'Work.jpg', date: '05/30/2019' },
    { id: '8', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', name: 'Dinner.jpg', date: '07/25/2019' },
    { id: '9', src: 'https://images.unsplash.com/photo-1467139701929-18c0d27a7516', name: 'Sunset.jpg', date: '10/05/2019' },
  ],
  '2020': [
    { id: '10', src: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28', name: 'Lockdown.jpg', date: '03/15/2020' },
    { id: '11', src: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc', name: 'HomeOffice.jpg', date: '05/20/2020' },
    { id: '12', src: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2', name: 'Cooking.jpg', date: '08/10/2020' },
  ],
  '2021': [
    { id: '13', src: 'https://images.unsplash.com/photo-1623107274042-16962aa28ea8', name: 'Reunion.jpg', date: '06/01/2021' },
    { id: '14', src: 'https://images.unsplash.com/photo-1623680503394-07a1d4e0f94c', name: 'Vacation2021.jpg', date: '07/15/2021' },
  ],
  '2022': [
    { id: '15', src: 'https://images.unsplash.com/photo-1673252357023-5949be7bf889', name: 'NewYear.jpg', date: '01/01/2022' },
    { id: '16', src: 'https://images.unsplash.com/photo-1653569397501-2cd6aa79e898', name: 'Spring.jpg', date: '04/10/2022' },
    { id: '17', src: 'https://images.unsplash.com/photo-1655963142370-caf290a050d8', name: 'Summer.jpg', date: '07/04/2022' },
    { id: '18', src: 'https://images.unsplash.com/photo-1669789311493-38602440a580', name: 'Winter.jpg', date: '12/25/2022' },
  ],
  '2023': [
    { id: '19', src: 'https://images.unsplash.com/photo-1681307288494-3c44dbbef0f9', name: 'Graduation.jpg', date: '05/20/2023' },
    { id: '20', src: 'https://images.unsplash.com/photo-1687042274729-b8cd2ef4b98e', name: 'Wedding.jpg', date: '06/15/2023' },
    { id: '21', src: 'https://images.unsplash.com/photo-1696458167563-c82c6a3fe843', name: 'Fall.jpg', date: '10/10/2023' },
  ],
};

const MemoriesExplorer: React.FC<MemoriesExplorerProps> = ({
  isOpen,
  onClose,
  onOpenPhoto,
  onMinimize,
  onFocus,
  zIndex,
  id
}) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const handleStartSlideshow = () => {
    if (selectedYear && mockPhotos[selectedYear]?.length > 0) {
      onOpenPhoto(mockPhotos[selectedYear][0]);
    }
  };
  
  return (
    <WindowsWindow 
      title="My Memories - Explorer" 
      isOpen={isOpen} 
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      id={id}
      width="w-[800px]"
      height="h-[500px]"
    >
      <div className="flex flex-col h-full">
        {/* Explorer toolbar */}
        <div className="bg-[#C0C0C0] p-1 mb-2 flex items-center">
          <WindowsButton className="mr-2 py-0.5 text-xs">
            File
          </WindowsButton>
          <WindowsButton className="mr-2 py-0.5 text-xs">
            Edit
          </WindowsButton>
          <WindowsButton className="mr-2 py-0.5 text-xs">
            View
          </WindowsButton>
          
          <div className="ml-auto flex">
            <WindowsButton 
              className="mr-2 py-0.5 px-2 text-xs flex items-center"
              onClick={() => setViewMode('grid')}
            >
              <span className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className={`w-full h-full border ${viewMode === 'grid' ? 'bg-win95-accent' : ''}`}></div>
                <div className={`w-full h-full border ${viewMode === 'grid' ? 'bg-win95-accent' : ''}`}></div>
                <div className={`w-full h-full border ${viewMode === 'grid' ? 'bg-win95-accent' : ''}`}></div>
                <div className={`w-full h-full border ${viewMode === 'grid' ? 'bg-win95-accent' : ''}`}></div>
              </span>
            </WindowsButton>
            <WindowsButton 
              className="py-0.5 px-2 text-xs flex items-center"
              onClick={() => setViewMode('list')}
            >
              <span className="flex flex-col justify-between w-4 h-4">
                <div className={`w-full h-0.5 ${viewMode === 'list' ? 'bg-win95-accent' : 'bg-black'}`}></div>
                <div className={`w-full h-0.5 ${viewMode === 'list' ? 'bg-win95-accent' : 'bg-black'}`}></div>
                <div className={`w-full h-0.5 ${viewMode === 'list' ? 'bg-win95-accent' : 'bg-black'}`}></div>
                <div className={`w-full h-0.5 ${viewMode === 'list' ? 'bg-win95-accent' : 'bg-black'}`}></div>
              </span>
            </WindowsButton>
          </div>
          
          <WindowsButton 
            className="ml-2 py-0.5 text-xs flex items-center"
            onClick={handleStartSlideshow}
            iconLeft={<Camera size={12} />}
          >
            Slideshow
          </WindowsButton>
        </div>
        
        <div className="flex flex-1">
          {/* Left sidebar - folder tree */}
          <div className="w-1/4 win95-inset p-2 mr-2 overflow-y-auto">
            <div className="text-win95-accent font-bold mb-2">Years</div>
            <ScrollArea className="h-full">
              {mockYears.map(year => (
                <div 
                  key={year}
                  className={`flex items-center p-1 cursor-pointer ${selectedYear === year ? 'bg-win95-accent text-white' : 'text-white hover:bg-gray-700'}`}
                  onClick={() => setSelectedYear(year)}
                >
                  <Folder size={16} className="mr-2" />
                  <span>{year}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* Right content - files */}
          <div className="flex-1 win95-inset p-2 overflow-y-auto">
            <ScrollArea className="h-full">
              {selectedYear ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-3 gap-4">
                    {mockPhotos[selectedYear]?.map(photo => (
                      <div 
                        key={photo.id}
                        className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2"
                        onClick={() => onOpenPhoto(photo)}
                      >
                        <div className="relative">
                          <div className="win95-window p-1 mb-1 w-[100px] h-[100px] overflow-hidden">
                            <img 
                              src={photo.src} 
                              alt={photo.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <FileImage size={16} className="absolute -top-1 -left-1 text-win95-accent" />
                        </div>
                        <span className="text-xs text-white mt-1">{photo.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {mockPhotos[selectedYear]?.map(photo => (
                      <div 
                        key={photo.id}
                        className="flex items-center cursor-pointer hover:bg-gray-700 p-2 border-b border-gray-700"
                        onClick={() => onOpenPhoto(photo)}
                      >
                        <FileImage size={20} className="mr-2 text-win95-accent" />
                        <span className="text-sm text-white flex-1">{photo.name}</span>
                        <span className="text-xs text-gray-400 ml-4">{photo.date}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-win95-highlight font-pixel">
                  <span className="animate-blink">Select a year from the left panel</span>
                  <ChevronRight className="ml-2" />
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </WindowsWindow>
  );
};

export default MemoriesExplorer;
