'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Button } from 'react-bootstrap';
import { Sun, Moon } from 'react-bootstrap-icons';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button 
      variant="outline-secondary" 
      onClick={toggleTheme}
      className="rounded-pill px-3 py-2 d-flex align-items-center"
      style={{
        transition: 'all 0.3s ease',
        border: '2px solid var(--border-color)',
        background: 'var(--card-bg)'
      }}
    >
      <div className="d-flex align-items-center">
        {theme === 'light' ? (
          <>
            <Moon className="me-2" size={18} />
            <span className="small fw-medium d-none d-sm-inline">Dark</span>
          </>
        ) : (
          <>
            <Sun className="me-2" size={18} />
            <span className="small fw-medium d-none d-sm-inline">Light</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default DarkModeToggle;