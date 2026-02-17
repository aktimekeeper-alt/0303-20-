/**
 * BURNOUT APP - Route Service
 *
 * Handles all route-related operations including saving, sharing, and discovering routes.
 *
 * @module services/route
 */

import { isMockMode } from '../config/env';
import { mockRoutes, mockDelay } from './mocks/routeMock';

// In-memory state
let routeState = {
  routes: [...mockRoutes],
  savedRoutes: new Set(['route1']),
  recordingRoute: null,
};

// ============ MOCK IMPLEMENTATION ============

const mockRouteService = {
  /**
   * Get all public routes
   * @param {number} page
   * @param {string} [difficulty]
   * @returns {Promise<{routes: import('../types').Route[], hasMore: boolean}>}
   */
  async getRoutes(page = 1, difficulty = null) {
    await mockDelay(500);

    let routes = [...routeState.routes];

    if (difficulty) {
      routes = routes.filter(r => r.difficulty === difficulty);
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;

    return {
      routes: routes.slice(start, start + pageSize),
      hasMore: start + pageSize < routes.length,
    };
  },

  /**
   * Get a single route by ID
   * @param {string} routeId
   * @returns {Promise<import('../types').Route>}
   */
  async getRoute(routeId) {
    await mockDelay(300);

    const route = routeState.routes.find(r => r.id === routeId);
    if (!route) {
      throw new Error('Route not found');
    }

    return route;
  },

  /**
   * Get routes by a specific user
   * @param {string} userId
   * @returns {Promise<import('../types').Route[]>}
   */
  async getUserRoutes(userId) {
    await mockDelay(400);
    return routeState.routes.filter(r => r.authorId === userId);
  },

  /**
   * Get saved routes
   * @returns {Promise<import('../types').Route[]>}
   */
  async getSavedRoutes() {
    await mockDelay(400);
    return routeState.routes.filter(r => routeState.savedRoutes.has(r.id));
  },

  /**
   * Save a route
   * @param {string} routeId
   * @returns {Promise<void>}
   */
  async saveRoute(routeId) {
    await mockDelay(200);

    routeState.savedRoutes.add(routeId);

    const route = routeState.routes.find(r => r.id === routeId);
    if (route) {
      route.saves += 1;
    }
  },

  /**
   * Unsave a route
   * @param {string} routeId
   * @returns {Promise<void>}
   */
  async unsaveRoute(routeId) {
    await mockDelay(200);

    routeState.savedRoutes.delete(routeId);

    const route = routeState.routes.find(r => r.id === routeId);
    if (route && route.saves > 0) {
      route.saves -= 1;
    }
  },

  /**
   * Check if route is saved
   * @param {string} routeId
   * @returns {Promise<boolean>}
   */
  async isRouteSaved(routeId) {
    return routeState.savedRoutes.has(routeId);
  },

  /**
   * Like a route
   * @param {string} routeId
   * @returns {Promise<void>}
   */
  async likeRoute(routeId) {
    await mockDelay(200);

    const route = routeState.routes.find(r => r.id === routeId);
    if (route) {
      route.likes += 1;
    }
  },

  /**
   * Unlike a route
   * @param {string} routeId
   * @returns {Promise<void>}
   */
  async unlikeRoute(routeId) {
    await mockDelay(200);

    const route = routeState.routes.find(r => r.id === routeId);
    if (route && route.likes > 0) {
      route.likes -= 1;
    }
  },

  /**
   * Start recording a new route
   * @param {string} name
   * @returns {Promise<string>} Route ID
   */
  async startRecording(name) {
    await mockDelay(100);

    const routeId = `route_${Date.now()}`;
    routeState.recordingRoute = {
      id: routeId,
      name,
      waypoints: [],
      startTime: new Date().toISOString(),
    };

    return routeId;
  },

  /**
   * Add a waypoint to the recording route
   * @param {import('../types').Location} location
   * @returns {Promise<void>}
   */
  async addWaypoint(location) {
    if (routeState.recordingRoute) {
      routeState.recordingRoute.waypoints.push(location);
    }
  },

  /**
   * Stop recording and save the route
   * @param {string} description
   * @param {boolean} isPublic
   * @returns {Promise<import('../types').Route>}
   */
  async stopRecording(description, isPublic = true) {
    await mockDelay(500);

    if (!routeState.recordingRoute) {
      throw new Error('No route being recorded');
    }

    const recording = routeState.recordingRoute;

    // Calculate distance and duration
    let totalDistance = 0;
    for (let i = 1; i < recording.waypoints.length; i++) {
      const prev = recording.waypoints[i - 1];
      const curr = recording.waypoints[i];
      totalDistance += this._calculateDistance(prev, curr);
    }

    const duration = Math.round(
      (new Date().getTime() - new Date(recording.startTime).getTime()) / 60000
    );

    const newRoute = {
      id: recording.id,
      authorId: '1',
      author: '@drift_king',
      name: recording.name,
      description,
      waypoints: recording.waypoints,
      distance: Math.round(totalDistance * 10) / 10,
      duration,
      elevationGain: Math.round(Math.random() * 2000),
      difficulty: totalDistance > 50 ? 'advanced' : totalDistance > 20 ? 'intermediate' : 'beginner',
      likes: 0,
      saves: 0,
      photos: [],
      isPublic,
      createdAt: new Date().toISOString(),
    };

    routeState.routes.unshift(newRoute);
    routeState.recordingRoute = null;

    return newRoute;
  },

  /**
   * Cancel route recording
   * @returns {Promise<void>}
   */
  async cancelRecording() {
    routeState.recordingRoute = null;
  },

  /**
   * Check if currently recording
   * @returns {boolean}
   */
  isRecording() {
    return routeState.recordingRoute !== null;
  },

  /**
   * Get current recording info
   * @returns {Object|null}
   */
  getRecordingInfo() {
    return routeState.recordingRoute;
  },

  /**
   * Create a route from waypoints (manual creation)
   * @param {{name: string, description: string, waypoints: import('../types').Location[], isPublic: boolean}} data
   * @returns {Promise<import('../types').Route>}
   */
  async createRoute(data) {
    await mockDelay(600);

    // Calculate distance
    let totalDistance = 0;
    for (let i = 1; i < data.waypoints.length; i++) {
      const prev = data.waypoints[i - 1];
      const curr = data.waypoints[i];
      totalDistance += this._calculateDistance(prev, curr);
    }

    const newRoute = {
      id: `route_${Date.now()}`,
      authorId: '1',
      author: '@drift_king',
      name: data.name,
      description: data.description,
      waypoints: data.waypoints,
      distance: Math.round(totalDistance * 10) / 10,
      duration: Math.round(totalDistance * 1.5), // Rough estimate
      elevationGain: Math.round(Math.random() * 2000),
      difficulty: 'intermediate',
      likes: 0,
      saves: 0,
      photos: [],
      isPublic: data.isPublic,
      createdAt: new Date().toISOString(),
    };

    routeState.routes.unshift(newRoute);
    return newRoute;
  },

  /**
   * Delete a route
   * @param {string} routeId
   * @returns {Promise<void>}
   */
  async deleteRoute(routeId) {
    await mockDelay(300);
    routeState.routes = routeState.routes.filter(r => r.id !== routeId);
  },

  /**
   * Share a route
   * @param {string} routeId
   * @returns {Promise<string>} Share URL
   */
  async shareRoute(routeId) {
    await mockDelay(200);
    return `https://burnout.app/route/${routeId}`;
  },

  /**
   * Search routes
   * @param {string} query
   * @returns {Promise<import('../types').Route[]>}
   */
  async searchRoutes(query) {
    await mockDelay(400);

    const lowerQuery = query.toLowerCase();
    return routeState.routes.filter(
      r =>
        r.name.toLowerCase().includes(lowerQuery) ||
        r.description?.toLowerCase().includes(lowerQuery) ||
        r.author.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get nearby routes
   * @param {import('../types').Location} location
   * @param {number} radiusMiles
   * @returns {Promise<import('../types').Route[]>}
   */
  async getNearbyRoutes(location, radiusMiles = 50) {
    await mockDelay(400);
    // In mock mode, return all routes as "nearby"
    return routeState.routes;
  },

  // Helper function
  _calculateDistance(loc1, loc2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (loc2.latitude - loc1.latitude) * (Math.PI / 180);
    const dLon = (loc2.longitude - loc1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.latitude * (Math.PI / 180)) *
        Math.cos(loc2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realRouteService = {
  async getRoutes(page, difficulty) {
    throw new Error('Real route service not implemented');
  },
  async getRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async getUserRoutes(userId) {
    throw new Error('Real route service not implemented');
  },
  async getSavedRoutes() {
    throw new Error('Real route service not implemented');
  },
  async saveRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async unsaveRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async isRouteSaved(routeId) {
    throw new Error('Real route service not implemented');
  },
  async likeRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async unlikeRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async startRecording(name) {
    throw new Error('Real route service not implemented');
  },
  async addWaypoint(location) {
    throw new Error('Real route service not implemented');
  },
  async stopRecording(description, isPublic) {
    throw new Error('Real route service not implemented');
  },
  async cancelRecording() {
    throw new Error('Real route service not implemented');
  },
  isRecording() {
    throw new Error('Real route service not implemented');
  },
  getRecordingInfo() {
    throw new Error('Real route service not implemented');
  },
  async createRoute(data) {
    throw new Error('Real route service not implemented');
  },
  async deleteRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async shareRoute(routeId) {
    throw new Error('Real route service not implemented');
  },
  async searchRoutes(query) {
    throw new Error('Real route service not implemented');
  },
  async getNearbyRoutes(location, radiusMiles) {
    throw new Error('Real route service not implemented');
  },
};

// ============ EXPORT ============

export const routeService = isMockMode() ? mockRouteService : realRouteService;
