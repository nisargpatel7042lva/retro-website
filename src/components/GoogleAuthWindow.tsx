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
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);  // State to store photos

  const initClient = () => {
    window.gapi.client.init({
      
      clientId: "544715069954-2bin99cp5eluo2hbr838l6c78m99d48e.apps.googleusercontent.com", 
      scope: "https://www.googleapis.com/auth/photoslibrary.readonly",
      discoveryDocs: ["https://photoslibrary.googleapis.com/$discovery/rest?version=v1"],
    });
  };

  const authenticate = () => {
    window.gapi.load('client:auth2', () => {
      initClient();
      window.gapi.auth2.getAuthInstance()
        .signIn()
        .then(() => {
          console.log("Sign-in successful");
          onSuccess();    // ✅ trigger success after sign-in
          getPhotos();
        })
        .catch((error: any) => {
          console.error("Sign-in error", error);
        });
    });
  };

  const getPhotos = async () => {
    try {
      const response = await window.gapi.client.photoslibrary.mediaItems.list();
      console.log(response);
      setPhotos(response.result.mediaItems || []);  // Save photos
    } catch (error) {
      console.error('Error fetching photos', error);
    }
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
      <div className="flex flex-col items-center justify-center p-4">
        <WindowsButton onClick={authenticate} className="mb-4">
          Connect to Google Photos
        </WindowsButton>

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {photos.map((photo) => (
              <img key={photo.id} src={photo.baseUrl} alt={photo.filename} className="w-20 h-20 object-cover" />
            ))}
          </div>
        ) : (
          <p>No photos found.</p>
        )}
      </div>
    </WindowsWindow>
  );
};

export default GoogleAuthWindow;
