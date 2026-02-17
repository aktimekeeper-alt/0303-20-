/**
 * BURNOUT APP - Auth Service
 *
 * Handles all authentication operations.
 * The frontend NEVER calls APIs directly - only through this service.
 *
 * @module services/auth
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isMockMode } from '../config/env';
import { mockUsers, mockCurrentUser, mockDelay } from './mocks/authMock';

const AUTH_TOKEN_KEY = '@burnout_auth_token';
const USER_DATA_KEY = '@burnout_user_data';

/**
 * @typedef {Object} SignupData
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {number} age
 * @property {string} [displayName]
 */

/**
 * @typedef {Object} LoginResult
 * @property {import('../types').User} user
 * @property {string} token
 */

// ============ MOCK IMPLEMENTATION ============

const mockAuthService = {
  /**
   * Login with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<LoginResult>}
   */
  async login(email, password) {
    await mockDelay(800);

    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      // For demo, allow any login
      const demoUser = { ...mockCurrentUser, email };
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(demoUser));
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'mock_token_' + Date.now());
      return { user: demoUser, token: 'mock_token' };
    }

    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'mock_token_' + Date.now());

    return { user, token: 'mock_token' };
  },

  /**
   * Sign up a new user
   * @param {SignupData} data
   * @returns {Promise<LoginResult>}
   */
  async signup(data) {
    await mockDelay(1000);

    // Validate age
    if (data.age < 16) {
      throw new Error('You must be at least 16 years old to use Burnout');
    }

    // Check if username is taken
    const existingUser = mockUsers.find(
      u => u.username.toLowerCase() === `@${data.username}`.toLowerCase()
    );
    if (existingUser) {
      throw new Error('Username is already taken');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username: `@${data.username}`,
      email: data.email,
      displayName: data.displayName || data.username,
      avatar: null,
      bio: '',
      location: '',
      age: data.age,
      car: null,
      interests: [],
      stats: {
        posts: 0,
        followers: 0,
        following: 0,
        meetsAttended: 0,
        trackDays: 0,
        routesShared: 0,
      },
      mods: [],
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'mock_token_' + Date.now());

    return { user: newUser, token: 'mock_token' };
  },

  /**
   * Log out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    await mockDelay(300);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
  },

  /**
   * Get the currently logged in user
   * @returns {Promise<import('../types').User|null>}
   */
  async getCurrentUser() {
    await mockDelay(200);

    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (userData) {
      return JSON.parse(userData);
    }

    return null;
  },

  /**
   * Check if user is logged in
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  },

  /**
   * Refresh the auth token
   * @returns {Promise<string>}
   */
  async refreshToken() {
    await mockDelay(300);
    const newToken = 'mock_token_' + Date.now();
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
    return newToken;
  },

  /**
   * Send password reset email
   * @param {string} email
   * @returns {Promise<void>}
   */
  async resetPassword(email) {
    await mockDelay(500);
    // In mock mode, just pretend we sent an email
    console.log(`Password reset email sent to ${email}`);
  },

  /**
   * Verify age (required during onboarding)
   * @param {number} age
   * @returns {Promise<boolean>}
   */
  async verifyAge(age) {
    await mockDelay(200);
    return age >= 16;
  },

  /**
   * Update password
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<void>}
   */
  async updatePassword(currentPassword, newPassword) {
    await mockDelay(500);
    // In mock mode, just pretend we updated the password
    console.log('Password updated successfully');
  },

  /**
   * Delete account
   * @param {string} password
   * @returns {Promise<void>}
   */
  async deleteAccount(password) {
    await mockDelay(1000);
    await this.logout();
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realAuthService = {
  async login(email, password) {
    // TODO: Implement real API call
    // const response = await fetch(getApiUrl('/auth/login'), {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // return response.json();
    throw new Error('Real auth service not implemented');
  },

  async signup(data) {
    throw new Error('Real auth service not implemented');
  },

  async logout() {
    throw new Error('Real auth service not implemented');
  },

  async getCurrentUser() {
    throw new Error('Real auth service not implemented');
  },

  async isLoggedIn() {
    throw new Error('Real auth service not implemented');
  },

  async refreshToken() {
    throw new Error('Real auth service not implemented');
  },

  async resetPassword(email) {
    throw new Error('Real auth service not implemented');
  },

  async verifyAge(age) {
    throw new Error('Real auth service not implemented');
  },

  async updatePassword(currentPassword, newPassword) {
    throw new Error('Real auth service not implemented');
  },

  async deleteAccount(password) {
    throw new Error('Real auth service not implemented');
  },
};

// ============ EXPORT ============

// Bryce: Change this line to switch from mock to real implementation
export const authService = isMockMode() ? mockAuthService : realAuthService;
