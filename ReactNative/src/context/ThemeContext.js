import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultColors = {
  primary: '#007AFF',
  secondary: '#34C759',
  background: '#000000',
  card: 'rgba(255, 255, 255, 0.1)',
  cardBorder: 'rgba(255, 255, 255, 0.15)',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  textTertiary: 'rgba(255, 255, 255, 0.4)',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  purple: '#AF52DE',
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [colors, setColors] = useState(defaultColors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const saved = await AsyncStorage.getItem('userColors');
      if (saved) {
        const parsed = JSON.parse(saved);
        setColors({ ...defaultColors, ...parsed });
      }
    } catch (e) {
      console.log('Error loading colors');
    }
    setLoading(false);
  };

  const updateColors = async (newColors) => {
    const updated = { ...colors, ...newColors };
    setColors(updated);
    try {
      await AsyncStorage.setItem('userColors', JSON.stringify({ primary: updated.primary, secondary: updated.secondary }));
    } catch (e) {
      console.log('Error saving colors');
    }
  };

  const resetColors = async () => {
    setColors(defaultColors);
    try {
      await AsyncStorage.removeItem('userColors');
    } catch (e) {
      console.log('Error resetting colors');
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, updateColors, resetColors, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export { defaultColors };
