'use client';

import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { Film, MusicNote } from 'react-bootstrap-icons';

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
    <header className={`d-flex justify-content-between align-items-center p-3 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center me-3">
          <Film className="me-2 text-primary" size={28} />
          <MusicNote className="text-secondary" size={24} />
        </div>
        <div>
          <h1 className="h4 fw-bold mb-0 bg-gradient text-transparent" 
              style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Tollywood Reels & Rhythms
          </h1>
          <p className="small text-muted mb-0 fade-in">Telugu Cinema & Music Quiz</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;