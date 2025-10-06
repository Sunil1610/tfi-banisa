'use client';

import { useState, useEffect } from 'react';
import { Film, Music } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`flex justify-between items-center p-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm transition-shadow ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Film className="text-primary" size={28} />
          <Music className="text-secondary" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tollywood Reels & Rhythms
          </h1>
          <p className="text-sm text-muted-foreground fade-in">Telugu Cinema & Music Quiz</p>
        </div>
      </div>
      <div className="flex items-center">
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
