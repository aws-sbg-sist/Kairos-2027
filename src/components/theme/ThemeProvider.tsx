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
    document.documentElement.setAttribute('data-theme', 'cyber');
    setMounted(true);
  }, []);

  const setTheme = () => {
    setThemeState('cyber');
    document.documentElement.setAttribute('data-theme', 'cyber');
  };

  const toggleTheme = () => {
    setThemeState('cyber');
    document.documentElement.setAttribute('data-theme', 'cyber');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
