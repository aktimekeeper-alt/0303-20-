import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const darkColors = {
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

const lightColors = {
  primary: '#007AFF',
  secondary: '#34C759',
  background: '#F2F2F7',
  card: 'rgba(0, 0, 0, 0.05)',
  cardBorder: 'rgba(0, 0, 0, 0.1)',
  text: '#000000',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  textTertiary: 'rgba(0, 0, 0, 0.4)',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  purple: '#AF52DE',
};

const defaultColors = darkColors;

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [customColors, setCustomColors] = useState({});
  const [loading, setLoading] = useState(true);

  const baseColors = isDarkMode ? darkColors : lightColors;
  const colors = { ...baseColors, ...customColors };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [savedColors, savedDarkMode] = await Promise.all([
        AsyncStorage.getItem('userColors'),
        AsyncStorage.getItem('isDarkMode'),
      ]);
      if (savedColors) {
        setCustomColors(JSON.parse(savedColors));
      }
      if (savedDarkMode !== null) {
        setIsDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (e) {
      console.log('Error loading settings');
    }
    setLoading(false);
  };

  const updateColors = async (newColors) => {
    const updated = { ...customColors, ...newColors };
    setCustomColors(updated);
    try {
      await AsyncStorage.setItem('userColors', JSON.stringify({ primary: updated.primary, secondary: updated.secondary }));
    } catch (e) {
      console.log('Error saving colors');
    }
  };

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    try {
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue));
    } catch (e) {
      console.log('Error saving dark mode');
    }
  };

  const resetColors = async () => {
    setCustomColors({});
    try {
      await AsyncStorage.removeItem('userColors');
    } catch (e) {
      console.log('Error resetting colors');
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, updateColors, resetColors, loading, isDarkMode, toggleDarkMode }}>
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
