/**
 * BURNOUT APP - Map Service
 *
 * Handles all map-related operations including group location sharing and nearby events.
 *
 * @module services/map
 */

import { isMockMode, LOCATION_CONFIG } from '../config/env';
import { mockUserLocations, mockNearbyEvents, mockDelay } from './mocks/mapMock';

// In-memory state for mock mode
let mapState = {
  userLocations: [...mockUserLocations],
  myLocation: null,
  isSharingLocation: false,
};

// ============ MOCK IMPLEMENTATION ============

const mockMapService = {
  /**
   * Get locations of group members who are sharing
   * @param {string} groupId
   * @returns {Promise<import('../types').UserLocation[]>}
   */
  async getGroupLocations(groupId) {
    await mockDelay(300);

    // Simulate movement by slightly changing positions
    return mapState.userLocations.map(user => ({
      ...user,
      location: {
        ...user.location,
        latitude: user.location.latitude + (Math.random() - 0.5) * 0.001,
        longitude: user.location.longitude + (Math.random() - 0.5) * 0.001,
        heading: user.location.heading + (Math.random() - 0.5) * 10,
        speed: Math.max(0, user.location.speed + (Math.random() - 0.5) * 5),
        timestamp: new Date().toISOString(),
      },
      // Detect drift: speed > 30mph and sharp turn
      isDrifting: user.location.speed > LOCATION_CONFIG.driftDetectionSpeed,
    }));
  },

  /**
   * Update current user's location
   * @param {import('../types').Location} location
   * @returns {Promise<void>}
   */
  async updateMyLocation(location) {
    await mockDelay(100);

    mapState.myLocation = location;

    // Update in the mock user locations
    const myUserLocation = mapState.userLocations.find(u => u.userId === '1');
    if (myUserLocation) {
      myUserLocation.location = location;
      myUserLocation.isDrifting = location.speed > LOCATION_CONFIG.driftDetectionSpeed;
    }
  },

  /**
   * Get nearby events/meets on the map
   * @param {import('../types').Location} location
   * @param {number} radiusMiles
   * @returns {Promise<import('../types').Event[]>}
   */
  async getNearbyEvents(location, radiusMiles = 50) {
    await mockDelay(400);
    return mockNearbyEvents;
  },

  /**
   * Get nearby users (for proximity chat)
   * @param {import('../types').Location} location
   * @param {number} radiusMiles
   * @returns {Promise<import('../types').UserLocation[]>}
   */
  async getNearbyUsers(location, radiusMiles = 5) {
    await mockDelay(300);

    // In mock mode, return all users as "nearby"
    return mapState.userLocations.filter(u => u.userId !== '1');
  },

  /**
   * Calculate route between two points
   * @param {import('../types').Location} start
   * @param {import('../types').Location} end
   * @returns {Promise<{coordinates: import('../types').Location[], distance: number, duration: number}>}
   */
  async getRoute(start, end) {
    await mockDelay(500);

    // Generate a simple mock route
    const steps = 10;
    const coordinates = [];

    for (let i = 0; i <= steps; i++) {
      coordinates.push({
        latitude: start.latitude + (end.latitude - start.latitude) * (i / steps),
        longitude: start.longitude + (end.longitude - start.longitude) * (i / steps),
      });
    }

    return {
      coordinates,
      distance: 15.5, // miles
      duration: 25, // minutes
    };
  },

  /**
   * Search for a location by address
   * @param {string} query
   * @returns {Promise<{address: string, location: import('../types').Location}[]>}
   */
  async searchLocation(query) {
    await mockDelay(400);

    // Mock search results
    return [
      {
        address: 'Cars & Coffee LA, Los Angeles, CA',
        location: { latitude: 34.0600, longitude: -118.2500 },
      },
      {
        address: 'Laguna Seca, Monterey, CA',
        location: { latitude: 36.5840, longitude: -121.7536 },
      },
      {
        address: 'Streets of Willow, Rosamond, CA',
        location: { latitude: 34.8500, longitude: -118.3800 },
      },
    ];
  },

  /**
   * Reverse geocode a location to address
   * @param {import('../types').Location} location
   * @returns {Promise<string>}
   */
  async reverseGeocode(location) {
    await mockDelay(300);
    return 'Los Angeles, CA 90012';
  },

  /**
   * Get map style URL for theming
   * @param {'dark'|'light'} theme
   * @returns {string}
   */
  getMapStyle(theme) {
    if (theme === 'dark') {
      return 'mapbox://styles/mapbox/dark-v11';
    }
    return 'mapbox://styles/mapbox/light-v11';
  },

  /**
   * Check if a user is currently drifting (for drift animation)
   * @param {import('../types').UserLocation} userLocation
   * @param {import('../types').Location} previousLocation
   * @returns {boolean}
   */
  detectDrift(userLocation, previousLocation) {
    if (!previousLocation) return false;

    const speed = userLocation.location.speed || 0;
    const headingChange = Math.abs(
      userLocation.location.heading - (previousLocation.heading || 0)
    );

    // Drift detected if speed > threshold and sharp turn
    return (
      speed > LOCATION_CONFIG.driftDetectionSpeed &&
      headingChange > LOCATION_CONFIG.driftDetectionTurnAngle
    );
  },

  /**
   * Subscribe to location updates for a group
   * @param {string} groupId
   * @param {(locations: import('../types').UserLocation[]) => void} callback
   * @returns {() => void} Unsubscribe function
   */
  subscribeToGroupLocations(groupId, callback) {
    // Simulate real-time location updates
    const interval = setInterval(async () => {
      const locations = await this.getGroupLocations(groupId);
      callback(locations);
    }, LOCATION_CONFIG.updateInterval);

    return () => clearInterval(interval);
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realMapService = {
  async getGroupLocations(groupId) {
    throw new Error('Real map service not implemented');
  },
  async updateMyLocation(location) {
    throw new Error('Real map service not implemented');
  },
  async getNearbyEvents(location, radiusMiles) {
    throw new Error('Real map service not implemented');
  },
  async getNearbyUsers(location, radiusMiles) {
    throw new Error('Real map service not implemented');
  },
  async getRoute(start, end) {
    throw new Error('Real map service not implemented');
  },
  async searchLocation(query) {
    throw new Error('Real map service not implemented');
  },
  async reverseGeocode(location) {
    throw new Error('Real map service not implemented');
  },
  getMapStyle(theme) {
    throw new Error('Real map service not implemented');
  },
  detectDrift(userLocation, previousLocation) {
    throw new Error('Real map service not implemented');
  },
  subscribeToGroupLocations(groupId, callback) {
    throw new Error('Real map service not implemented');
  },
};

// ============ EXPORT ============

export const mapService = isMockMode() ? mockMapService : realMapService;
