'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className="rounded-full px-4 py-2 flex items-center gap-2"
    >
      {theme === 'light' ? (
        <>
          <Moon size={18} />
          <span className="text-sm font-medium hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun size={18} />
          <span className="text-sm font-medium hidden sm:inline">Light</span>
        </>
      )}
    </Button>
  );
};

export default DarkModeToggle;
