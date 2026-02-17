/**
 * BURNOUT APP - Environment Configuration
 *
 * All environment variables and configuration go here.
 * NEVER hardcode URLs, tokens, or API keys anywhere else.
 *
 * The backend developer can update these values without touching any other code.
 */

// Backend mode: 'mock' | 'development' | 'staging' | 'production'
export const BACKEND_MODE = 'mock';

// API Configuration
export const API_CONFIG = {
  baseUrl: 'https://api.burnout.app', // Placeholder - Bryce will set this
  version: 'v1',
  timeout: 30000,
};

// Map Configuration (Mapbox)
export const MAP_CONFIG = {
  accessToken: 'YOUR_MAPBOX_TOKEN', // Placeholder - Bryce will set this
  style: 'mapbox://styles/mapbox/dark-v11',
  defaultZoom: 14,
  maxZoom: 18,
  minZoom: 3,
};

// Chat Configuration (Matrix)
export const CHAT_CONFIG = {
  homeserverUrl: 'https://matrix.burnout.app', // Placeholder
  defaultRoomVersion: '10',
};

// Music Configuration
export const MUSIC_CONFIG = {
  spotifyClientId: 'YOUR_SPOTIFY_CLIENT_ID', // Placeholder
  appleMusicDeveloperToken: 'YOUR_APPLE_MUSIC_TOKEN', // Placeholder
};

// Location Configuration
export const LOCATION_CONFIG = {
  updateInterval: 5000, // ms
  distanceFilter: 10, // meters
  driftDetectionSpeed: 30, // mph threshold for drift animation
  driftDetectionTurnAngle: 15, // degrees
  proximityRadius: 5, // miles for CB radio
};

// Push Notification Configuration
export const PUSH_CONFIG = {
  vapidPublicKey: 'YOUR_VAPID_KEY', // Placeholder
};

// Feature Flags
export const FEATURES = {
  pushToTalk: true,
  musicQueue: true,
  nfcCards: false, // Coming soon
  proximityChat: true,
  driftAnimation: true,
};

// App Constants
export const APP_CONSTANTS = {
  minAge: 16,
  maxBioLength: 500,
  maxPostLength: 2000,
  maxSparkLength: 280,
  maxModsPerCar: 50,
  maxPhotosPerPost: 10,
  maxGroupMembers: 500,
  defaultPageSize: 20,
};

// Theme Configuration
export const THEME_CONFIG = {
  primaryColor: '#FF4500', // Burnout orange-red
  secondaryColor: '#FF6B35',
  accentColor: '#FFD700',
  darkBackground: '#0A0A0A',
  cardBackground: 'rgba(255, 255, 255, 0.08)',
  glassmorphism: {
    blur: 20,
    opacity: 0.1,
  },
};

/**
 * Get full API URL for an endpoint
 * @param {string} endpoint
 * @returns {string}
 */
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseUrl}/${API_CONFIG.version}${endpoint}`;
};

/**
 * Check if we're using mock data
 * @returns {boolean}
 */
export const isMockMode = () => BACKEND_MODE === 'mock';

/**
 * Check if a feature is enabled
 * @param {keyof typeof FEATURES} feature
 * @returns {boolean}
 */
export const isFeatureEnabled = (feature) => FEATURES[feature] === true;
