'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

const createAppTheme = (mode: ThemeMode) => {
  const isLight = mode === 'light';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#22C55E',
        light: '#4ADE80',
        dark: '#16A34A',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isLight ? '#6B7280' : '#9CA3AF',
        light: isLight ? '#9CA3AF' : '#D1D5DB',
        dark: isLight ? '#4B5563' : '#6B7280',
      },
      success: {
        main: '#22C55E',
        light: '#4ADE80',
        dark: '#16A34A',
      },
      background: {
        default: isLight ? '#FAFAFA' : '#0F172A',
        paper: isLight ? '#FFFFFF' : '#1E293B',
      },
      text: {
        primary: isLight ? '#111827' : '#F8FAFC',
        secondary: isLight ? '#6B7280' : '#94A3B8',
      },
      grey: {
        50: isLight ? '#FAFAFA' : '#1E293B',
        100: isLight ? '#F5F5F5' : '#334155',
        200: isLight ? '#E5E5E5' : '#475569',
        300: isLight ? '#D4D4D4' : '#64748B',
        400: isLight ? '#A3A3A3' : '#94A3B8',
        500: isLight ? '#737373' : '#CBD5E1',
        600: isLight ? '#525252' : '#E2E8F0',
        700: isLight ? '#404040' : '#F1F5F9',
        800: isLight ? '#262626' : '#F8FAFC',
        900: isLight ? '#171717' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: [
        'var(--font-poppins)',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'sans-serif'
      ].join(','),
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.015em',
      },
      h4: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '-0.005em',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '-0.003em',
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? '#FFFFFF' : '#1E293B',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 16,
            boxShadow: isLight 
              ? '0 1px 3px rgba(0, 0, 0, 0.05)' 
              : '0 1px 3px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontSize: '0.95rem',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&:active': {
              transform: 'scale(0.99)',
            },
            transition: 'all 0.15s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: isLight ? '#FFFFFF' : '#1E293B',
            border: `1px solid ${isLight ? '#F3F4F6' : 'rgba(255,255,255,0.1)'}`,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            '&:hover': {
              backgroundColor: isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.05)',
            },
            '&:active': {
              transform: 'scale(0.97)',
            },
            transition: 'all 0.15s ease',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isLight ? '#FFFFFF' : '#1E293B',
            borderRadius: 16,
          },
        },
      },
    },
  });
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    // localStorage'dan tema tercihini al
    try {
      const savedMode = localStorage.getItem('themeMode') as ThemeMode;
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        setMode(savedMode);
      } else {
        // Sistem tercihini kontrol et
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setMode(prefersDark ? 'dark' : 'light');
      }
    } catch {
      // localStorage erişim hatası durumunda varsayılan tema
      console.log('localStorage access error, using default theme');
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    try {
      localStorage.setItem('themeMode', newMode);
    } catch {
      console.log('localStorage write error');
    }
  };

  const theme = createAppTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 