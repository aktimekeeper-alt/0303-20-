/**
 * BURNOUT APP - Location Service
 *
 * Handles device-level location tracking and sharing preferences.
 *
 * @module services/location
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isMockMode, LOCATION_CONFIG } from '../config/env';

const LOCATION_SHARING_KEY = '@burnout_location_sharing';
const LOCATION_HISTORY_KEY = '@burnout_location_history';

// Mock current location (Los Angeles)
const mockCurrentLocation = {
  latitude: 34.0522,
  longitude: -118.2437,
  heading: 0,
  speed: 0,
  accuracy: 10,
  timestamp: new Date().toISOString(),
};

// ============ MOCK IMPLEMENTATION ============

const mockLocationService = {
  /**
   * Request location permissions
   * @returns {Promise<'granted'|'denied'|'blocked'>}
   */
  async requestPermission() {
    // In mock mode, always grant permission
    return 'granted';
  },

  /**
   * Check if location permissions are granted
   * @returns {Promise<boolean>}
   */
  async hasPermission() {
    return true;
  },

  /**
   * Get current device location
   * @returns {Promise<import('../types').Location>}
   */
  async getCurrentLocation() {
    // Simulate slight movement
    return {
      ...mockCurrentLocation,
      latitude: mockCurrentLocation.latitude + (Math.random() - 0.5) * 0.001,
      longitude: mockCurrentLocation.longitude + (Math.random() - 0.5) * 0.001,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Start sharing location with a group
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async startSharing(groupId) {
    const sharing = JSON.parse(await AsyncStorage.getItem(LOCATION_SHARING_KEY) || '{}');
    sharing[groupId] = true;
    await AsyncStorage.setItem(LOCATION_SHARING_KEY, JSON.stringify(sharing));

    console.log(`Started sharing location with group ${groupId}`);
  },

  /**
   * Stop sharing location with a group
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async stopSharing(groupId) {
    const sharing = JSON.parse(await AsyncStorage.getItem(LOCATION_SHARING_KEY) || '{}');
    delete sharing[groupId];
    await AsyncStorage.setItem(LOCATION_SHARING_KEY, JSON.stringify(sharing));

    console.log(`Stopped sharing location with group ${groupId}`);
  },

  /**
   * Check if sharing with a specific group
   * @param {string} groupId
   * @returns {Promise<boolean>}
   */
  async isSharingWith(groupId) {
    const sharing = JSON.parse(await AsyncStorage.getItem(LOCATION_SHARING_KEY) || '{}');
    return !!sharing[groupId];
  },

  /**
   * Get all groups user is sharing location with
   * @returns {Promise<string[]>}
   */
  async getSharingGroups() {
    const sharing = JSON.parse(await AsyncStorage.getItem(LOCATION_SHARING_KEY) || '{}');
    return Object.keys(sharing).filter(key => sharing[key]);
  },

  /**
   * Stop sharing with all groups
   * @returns {Promise<void>}
   */
  async stopAllSharing() {
    await AsyncStorage.setItem(LOCATION_SHARING_KEY, '{}');
    console.log('Stopped sharing location with all groups');
  },

  /**
   * Start background location tracking
   * @param {(location: import('../types').Location) => void} callback
   * @returns {Promise<() => void>} Stop tracking function
   */
  async startTracking(callback) {
    // In mock mode, simulate location updates
    const interval = setInterval(async () => {
      const location = await this.getCurrentLocation();
      callback(location);
    }, LOCATION_CONFIG.updateInterval);

    return () => clearInterval(interval);
  },

  /**
   * Save location to history (for route recording)
   * @param {import('../types').Location} location
   * @returns {Promise<void>}
   */
  async saveToHistory(location) {
    const history = JSON.parse(await AsyncStorage.getItem(LOCATION_HISTORY_KEY) || '[]');
    history.push(location);

    // Keep only last 1000 points
    if (history.length > 1000) {
      history.shift();
    }

    await AsyncStorage.setItem(LOCATION_HISTORY_KEY, JSON.stringify(history));
  },

  /**
   * Get location history (for route review)
   * @param {number} limit
   * @returns {Promise<import('../types').Location[]>}
   */
  async getHistory(limit = 100) {
    const history = JSON.parse(await AsyncStorage.getItem(LOCATION_HISTORY_KEY) || '[]');
    return history.slice(-limit);
  },

  /**
   * Clear location history
   * @returns {Promise<void>}
   */
  async clearHistory() {
    await AsyncStorage.setItem(LOCATION_HISTORY_KEY, '[]');
  },

  /**
   * Calculate distance between two points (in miles)
   * @param {import('../types').Location} loc1
   * @param {import('../types').Location} loc2
   * @returns {number}
   */
  calculateDistance(loc1, loc2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this._toRad(loc2.latitude - loc1.latitude);
    const dLon = this._toRad(loc2.longitude - loc1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this._toRad(loc1.latitude)) *
        Math.cos(this._toRad(loc2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  /**
   * Calculate bearing between two points
   * @param {import('../types').Location} loc1
   * @param {import('../types').Location} loc2
   * @returns {number} Bearing in degrees
   */
  calculateBearing(loc1, loc2) {
    const dLon = this._toRad(loc2.longitude - loc1.longitude);
    const lat1 = this._toRad(loc1.latitude);
    const lat2 = this._toRad(loc2.latitude);

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    return (bearing + 360) % 360;
  },

  /**
   * Check if user is within radius of a point
   * @param {import('../types').Location} userLocation
   * @param {import('../types').Location} targetLocation
   * @param {number} radiusMiles
   * @returns {boolean}
   */
  isWithinRadius(userLocation, targetLocation, radiusMiles) {
    const distance = this.calculateDistance(userLocation, targetLocation);
    return distance <= radiusMiles;
  },

  // Helper function
  _toRad(deg) {
    return deg * (Math.PI / 180);
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realLocationService = {
  async requestPermission() {
    // TODO: Use react-native-permissions or expo-location
    throw new Error('Real location service not implemented');
  },
  async hasPermission() {
    throw new Error('Real location service not implemented');
  },
  async getCurrentLocation() {
    throw new Error('Real location service not implemented');
  },
  async startSharing(groupId) {
    throw new Error('Real location service not implemented');
  },
  async stopSharing(groupId) {
    throw new Error('Real location service not implemented');
  },
  async isSharingWith(groupId) {
    throw new Error('Real location service not implemented');
  },
  async getSharingGroups() {
    throw new Error('Real location service not implemented');
  },
  async stopAllSharing() {
    throw new Error('Real location service not implemented');
  },
  async startTracking(callback) {
    throw new Error('Real location service not implemented');
  },
  async saveToHistory(location) {
    throw new Error('Real location service not implemented');
  },
  async getHistory(limit) {
    throw new Error('Real location service not implemented');
  },
  async clearHistory() {
    throw new Error('Real location service not implemented');
  },
  calculateDistance(loc1, loc2) {
    // This can use the same implementation
    return mockLocationService.calculateDistance(loc1, loc2);
  },
  calculateBearing(loc1, loc2) {
    return mockLocationService.calculateBearing(loc1, loc2);
  },
  isWithinRadius(userLocation, targetLocation, radiusMiles) {
    return mockLocationService.isWithinRadius(userLocation, targetLocation, radiusMiles);
  },
};

// ============ EXPORT ============

export const locationService = isMockMode() ? mockLocationService : realLocationService;
