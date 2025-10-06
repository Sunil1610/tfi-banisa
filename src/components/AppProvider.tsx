'use client';

import { ThemeProvider } from '@/context/ThemeContext';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
