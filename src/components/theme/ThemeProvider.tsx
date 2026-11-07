'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'cyber' | 'aws';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'cyber',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'kairos-theme-v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('cyber');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'aws' || stored === 'cyber') {
        setThemeState(stored);
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        // Explicit default is 'cyber' (Primary Adobe Palette)
        setThemeState('cyber');
        document.documentElement.setAttribute('data-theme', 'cyber');
      }
    } catch {
      document.documentElement.setAttribute('data-theme', 'cyber');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (e) {
      console.warn('Failed to persist theme in localStorage', e);
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'cyber' ? 'aws' : 'cyber';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
