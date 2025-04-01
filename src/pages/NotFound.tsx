
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import WindowsButton from "@/components/WindowsButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="text-center p-8 w-full max-w-2xl">
        <div className="bg-blue-600 text-white p-4 mb-4 font-pixel">
          <h1 className="text-2xl mb-2">ERROR 404</h1>
          <p className="text-sm">
            A fatal exception 0E has occurred at 0028:C000B42D in VXD MMSYSTEM
          </p>
        </div>
        
        <div className="bg-blue-600 text-white p-4 font-mono">
          <p className="mb-2">* Press CTRL+ALT+DEL to restart your computer. You will</p>
          <p className="mb-2">lose any unsaved information in all applications.</p>
          <p className="mb-4">* Or you could just return to home...</p>
          
          <div className="flex justify-center mt-6">
            <a href="/">
              <WindowsButton className="border-2 shadow-win95-outset px-8">
                Return to Home
              </WindowsButton>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scanlines for CRT effect */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
    </div>
  );
};

export default NotFound;
