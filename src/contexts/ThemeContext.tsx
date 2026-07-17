'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { store } from '@/lib/store';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = store.get<Theme>('theme', 'dark');
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      store.set('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, isHydrated]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
