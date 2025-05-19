import { useState, useEffect, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightColors = {
  background: '#FFFFFF',
  cardBackground: '#F5F7FA',
  text: '#1F2937',
  textSecondary: '#6B7280',
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#F43F5E',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  ripple: 'rgba(0, 0, 0, 0.1)',
};

const darkColors = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  primary: '#60A5FA',
  secondary: '#A78BFA',
  accent: '#FB7185',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  ripple: 'rgba(255, 255, 255, 0.1)',
};

// Create context with types
type ThemeContextType = {
  isDark: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

// Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Update theme when system theme changes
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  
  const theme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook for using the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}