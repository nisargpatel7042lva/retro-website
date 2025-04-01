
import React from 'react';
import { cn } from '@/lib/utils';

interface WindowsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const WindowsButton: React.FC<WindowsButtonProps> = ({ 
  children, 
  className, 
  variant = 'default',
  iconLeft,
  iconRight,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "win95-button flex items-center justify-center transition-all duration-100", 
        variant === 'primary' && "bg-win95-accent text-white hover:bg-win95-accent/90",
        variant === 'secondary' && "bg-win95-highlight text-black hover:bg-win95-highlight/90",
        className
      )}
      {...props}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default WindowsButton;
