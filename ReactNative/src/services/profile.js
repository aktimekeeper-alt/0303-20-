/**
 * BURNOUT APP - Profile Service
 *
 * Handles all profile-related operations including profile cards.
 *
 * @module services/profile
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isMockMode } from '../config/env';
import { mockUsers, mockDelay } from './mocks/authMock';

const USER_DATA_KEY = '@burnout_user_data';

// ============ MOCK IMPLEMENTATION ============

const mockProfileService = {
  /**
   * Get a user's profile by ID
   * @param {string} userId
   * @returns {Promise<import('../types').User>}
   */
  async getProfile(userId) {
    await mockDelay(400);

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  /**
   * Get a user's profile by username
   * @param {string} username
   * @returns {Promise<import('../types').User>}
   */
  async getProfileByUsername(username) {
    await mockDelay(400);

    const normalizedUsername = username.startsWith('@') ? username : `@${username}`;
    const user = mockUsers.find(u => u.username.toLowerCase() === normalizedUsername.toLowerCase());
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  /**
   * Update the current user's profile
   * @param {Partial<import('../types').User>} updates
   * @returns {Promise<import('../types').User>}
   */
  async updateProfile(updates) {
    await mockDelay(600);

    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      throw new Error('Not logged in');
    }

    const currentUser = JSON.parse(userData);
    const updatedUser = { ...currentUser, ...updates };

    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  /**
   * Update user's car info
   * @param {import('../types').Car} car
   * @returns {Promise<import('../types').User>}
   */
  async updateCar(car) {
    await mockDelay(500);

    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      throw new Error('Not logged in');
    }

    const currentUser = JSON.parse(userData);
    const updatedUser = { ...currentUser, car };

    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  /**
   * Add a mod to user's car
   * @param {import('../types').Mod} mod
   * @returns {Promise<import('../types').Mod[]>}
   */
  async addMod(mod) {
    await mockDelay(400);

    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      throw new Error('Not logged in');
    }

    const currentUser = JSON.parse(userData);
    const newMod = { ...mod, id: Date.now().toString() };
    const mods = [...(currentUser.mods || []), newMod];

    const updatedUser = { ...currentUser, mods };
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));

    return mods;
  },

  /**
   * Remove a mod from user's car
   * @param {string} modId
   * @returns {Promise<import('../types').Mod[]>}
   */
  async removeMod(modId) {
    await mockDelay(300);

    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      throw new Error('Not logged in');
    }

    const currentUser = JSON.parse(userData);
    const mods = (currentUser.mods || []).filter(m => m.id !== modId);

    const updatedUser = { ...currentUser, mods };
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));

    return mods;
  },

  /**
   * Upload profile photo
   * @param {string} imageUri
   * @returns {Promise<string>} URL of uploaded image
   */
  async uploadAvatar(imageUri) {
    await mockDelay(1000);
    // In mock mode, just return the local URI
    return imageUri;
  },

  /**
   * Get user's followers
   * @param {string} userId
   * @param {number} page
   * @returns {Promise<{users: import('../types').User[], hasMore: boolean}>}
   */
  async getFollowers(userId, page = 1) {
    await mockDelay(500);
    // Return mock followers
    return {
      users: mockUsers.slice(0, 5),
      hasMore: false,
    };
  },

  /**
   * Get users that a user is following
   * @param {string} userId
   * @param {number} page
   * @returns {Promise<{users: import('../types').User[], hasMore: boolean}>}
   */
  async getFollowing(userId, page = 1) {
    await mockDelay(500);
    return {
      users: mockUsers.slice(0, 3),
      hasMore: false,
    };
  },

  /**
   * Follow a user
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async followUser(userId) {
    await mockDelay(300);
    console.log(`Followed user ${userId}`);
  },

  /**
   * Unfollow a user
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async unfollowUser(userId) {
    await mockDelay(300);
    console.log(`Unfollowed user ${userId}`);
  },

  /**
   * Check if current user follows a user
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  async isFollowing(userId) {
    await mockDelay(200);
    return Math.random() > 0.5; // Random for demo
  },

  /**
   * Get profile card data for QR/NFC
   * @param {string} userId
   * @returns {Promise<import('../types').ProfileCard>}
   */
  async getProfileCard(userId) {
    await mockDelay(300);

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: `card_${userId}`,
      userId,
      qrCode: `burnout://profile/${user.username}`,
      nfcId: `nfc_${userId}`,
      user,
      customDesign: null,
    };
  },

  /**
   * Generate printable PDF card
   * @param {string} userId
   * @returns {Promise<string>} PDF URL
   */
  async generatePrintableCard(userId) {
    await mockDelay(1500);
    // In mock mode, return a placeholder URL
    return `https://burnout.app/cards/${userId}/print.pdf`;
  },

  /**
   * Search users
   * @param {string} query
   * @returns {Promise<import('../types').User[]>}
   */
  async searchUsers(query) {
    await mockDelay(400);

    const lowerQuery = query.toLowerCase();
    return mockUsers.filter(
      u =>
        u.username.toLowerCase().includes(lowerQuery) ||
        u.displayName?.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get suggested users to follow
   * @returns {Promise<import('../types').User[]>}
   */
  async getSuggestedUsers() {
    await mockDelay(500);
    return mockUsers;
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realProfileService = {
  async getProfile(userId) {
    throw new Error('Real profile service not implemented');
  },
  async getProfileByUsername(username) {
    throw new Error('Real profile service not implemented');
  },
  async updateProfile(updates) {
    throw new Error('Real profile service not implemented');
  },
  async updateCar(car) {
    throw new Error('Real profile service not implemented');
  },
  async addMod(mod) {
    throw new Error('Real profile service not implemented');
  },
  async removeMod(modId) {
    throw new Error('Real profile service not implemented');
  },
  async uploadAvatar(imageUri) {
    throw new Error('Real profile service not implemented');
  },
  async getFollowers(userId, page) {
    throw new Error('Real profile service not implemented');
  },
  async getFollowing(userId, page) {
    throw new Error('Real profile service not implemented');
  },
  async followUser(userId) {
    throw new Error('Real profile service not implemented');
  },
  async unfollowUser(userId) {
    throw new Error('Real profile service not implemented');
  },
  async isFollowing(userId) {
    throw new Error('Real profile service not implemented');
  },
  async getProfileCard(userId) {
    throw new Error('Real profile service not implemented');
  },
  async generatePrintableCard(userId) {
    throw new Error('Real profile service not implemented');
  },
  async searchUsers(query) {
    throw new Error('Real profile service not implemented');
  },
  async getSuggestedUsers() {
    throw new Error('Real profile service not implemented');
  },
};

// ============ EXPORT ============

export const profileService = isMockMode() ? mockProfileService : realProfileService;
