/**
 * BURNOUT APP - Music Service
 *
 * Handles shared music queue, playback control, and music service integration.
 * Supports Spotify and Apple Music.
 *
 * @module services/music
 */

import { isMockMode } from '../config/env';
import { mockMusicTracks, mockQueueItems, mockDelay } from './mocks/musicMock';

// In-memory state
let musicState = {
  queue: [...mockQueueItems],
  currentTrack: null,
  isPlaying: false,
  position: 0,
  connectedService: null, // 'spotify' | 'apple_music' | null
  groupSession: null,
};

// ============ MOCK IMPLEMENTATION ============

const mockMusicService = {
  /**
   * Connect to a music service
   * @param {'spotify'|'apple_music'} service
   * @returns {Promise<{success: boolean, userId?: string}>}
   */
  async connectService(service) {
    await mockDelay(800);
    musicState.connectedService = service;
    return {
      success: true,
      userId: `${service}_user_123`,
    };
  },

  /**
   * Disconnect from music service
   * @returns {Promise<void>}
   */
  async disconnectService() {
    await mockDelay(200);
    musicState.connectedService = null;
  },

  /**
   * Get connection status
   * @returns {Promise<{connected: boolean, service: string|null}>}
   */
  async getConnectionStatus() {
    await mockDelay(100);
    return {
      connected: musicState.connectedService !== null,
      service: musicState.connectedService,
    };
  },

  /**
   * Search for tracks
   * @param {string} query
   * @returns {Promise<import('../types').MusicTrack[]>}
   */
  async searchTracks(query) {
    await mockDelay(400);

    const lowerQuery = query.toLowerCase();
    return mockMusicTracks.filter(
      track =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get current queue
   * @param {string} groupId - Group to get queue for
   * @returns {Promise<import('../types').QueueItem[]>}
   */
  async getQueue(groupId) {
    await mockDelay(300);

    // Sort by votes (highest first)
    return [...musicState.queue].sort((a, b) => b.votes - a.votes);
  },

  /**
   * Add track to queue
   * @param {string} groupId
   * @param {import('../types').MusicTrack} track
   * @returns {Promise<import('../types').QueueItem>}
   */
  async addToQueue(groupId, track) {
    await mockDelay(300);

    const queueItem = {
      id: `qi_${Date.now()}`,
      track,
      addedBy: { id: '1', username: '@drift_king' },
      addedAt: new Date().toISOString(),
      votes: 1,
      hasVoted: true,
    };

    musicState.queue.push(queueItem);
    return queueItem;
  },

  /**
   * Remove track from queue
   * @param {string} queueItemId
   * @returns {Promise<void>}
   */
  async removeFromQueue(queueItemId) {
    await mockDelay(200);
    musicState.queue = musicState.queue.filter(qi => qi.id !== queueItemId);
  },

  /**
   * Vote for a track in queue
   * @param {string} queueItemId
   * @param {boolean} upvote
   * @returns {Promise<{votes: number}>}
   */
  async voteTrack(queueItemId, upvote = true) {
    await mockDelay(200);

    const item = musicState.queue.find(qi => qi.id === queueItemId);
    if (item) {
      if (item.hasVoted) {
        // Remove vote
        item.votes -= 1;
        item.hasVoted = false;
      } else {
        // Add vote
        item.votes += upvote ? 1 : -1;
        item.hasVoted = true;
      }
    }

    return { votes: item?.votes || 0 };
  },

  /**
   * Start group listening session
   * @param {string} groupId
   * @returns {Promise<{sessionId: string}>}
   */
  async startGroupSession(groupId) {
    await mockDelay(400);

    musicState.groupSession = {
      id: `session_${Date.now()}`,
      groupId,
      hostId: '1',
      startedAt: new Date().toISOString(),
      listeners: ['1'],
    };

    return { sessionId: musicState.groupSession.id };
  },

  /**
   * Join a group listening session
   * @param {string} sessionId
   * @returns {Promise<{currentTrack: import('../types').MusicTrack|null, position: number, isPlaying: boolean}>}
   */
  async joinGroupSession(sessionId) {
    await mockDelay(300);

    if (musicState.groupSession) {
      musicState.groupSession.listeners.push('1');
    }

    return {
      currentTrack: musicState.currentTrack,
      position: musicState.position,
      isPlaying: musicState.isPlaying,
    };
  },

  /**
   * Leave group listening session
   * @returns {Promise<void>}
   */
  async leaveGroupSession() {
    await mockDelay(200);

    if (musicState.groupSession) {
      musicState.groupSession.listeners = musicState.groupSession.listeners.filter(id => id !== '1');
    }
  },

  /**
   * Play current/specific track
   * @param {string} [trackId]
   * @returns {Promise<void>}
   */
  async play(trackId = null) {
    await mockDelay(100);

    if (trackId) {
      const track = mockMusicTracks.find(t => t.id === trackId);
      if (track) {
        musicState.currentTrack = track;
        musicState.position = 0;
      }
    }

    musicState.isPlaying = true;
  },

  /**
   * Pause playback
   * @returns {Promise<void>}
   */
  async pause() {
    await mockDelay(100);
    musicState.isPlaying = false;
  },

  /**
   * Skip to next track in queue
   * @returns {Promise<import('../types').MusicTrack|null>}
   */
  async skipToNext() {
    await mockDelay(200);

    // Get highest voted track
    const sortedQueue = [...musicState.queue].sort((a, b) => b.votes - a.votes);

    if (sortedQueue.length > 0) {
      const nextItem = sortedQueue[0];
      musicState.currentTrack = nextItem.track;
      musicState.position = 0;
      musicState.isPlaying = true;

      // Remove from queue
      musicState.queue = musicState.queue.filter(qi => qi.id !== nextItem.id);

      return nextItem.track;
    }

    return null;
  },

  /**
   * Seek to position
   * @param {number} positionMs
   * @returns {Promise<void>}
   */
  async seekTo(positionMs) {
    await mockDelay(50);
    musicState.position = positionMs;
  },

  /**
   * Get current playback state
   * @returns {Promise<{currentTrack: import('../types').MusicTrack|null, position: number, isPlaying: boolean}>}
   */
  async getPlaybackState() {
    await mockDelay(100);

    return {
      currentTrack: musicState.currentTrack,
      position: musicState.position,
      isPlaying: musicState.isPlaying,
    };
  },

  /**
   * Subscribe to playback updates
   * @param {function} callback
   * @returns {function} Unsubscribe function
   */
  subscribeToPlayback(callback) {
    // Simulate playback progress
    const interval = setInterval(() => {
      if (musicState.isPlaying && musicState.currentTrack) {
        musicState.position += 1000;

        // Auto-advance when track ends
        if (musicState.position >= musicState.currentTrack.duration * 1000) {
          this.skipToNext();
        }

        callback({
          currentTrack: musicState.currentTrack,
          position: musicState.position,
          isPlaying: musicState.isPlaying,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  },

  /**
   * Subscribe to queue updates
   * @param {string} groupId
   * @param {function} callback
   * @returns {function} Unsubscribe function
   */
  subscribeToQueue(groupId, callback) {
    const interval = setInterval(() => {
      const sortedQueue = [...musicState.queue].sort((a, b) => b.votes - a.votes);
      callback(sortedQueue);
    }, 3000);

    return () => clearInterval(interval);
  },

  /**
   * Get recently played tracks
   * @returns {Promise<import('../types').MusicTrack[]>}
   */
  async getRecentlyPlayed() {
    await mockDelay(300);
    return mockMusicTracks.slice(0, 3);
  },

  /**
   * Get recommended tracks based on group preferences
   * @param {string} groupId
   * @returns {Promise<import('../types').MusicTrack[]>}
   */
  async getRecommendations(groupId) {
    await mockDelay(400);
    return mockMusicTracks;
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realMusicService = {
  async connectService(service) { throw new Error('Real music service not implemented'); },
  async disconnectService() { throw new Error('Real music service not implemented'); },
  async getConnectionStatus() { throw new Error('Real music service not implemented'); },
  async searchTracks(query) { throw new Error('Real music service not implemented'); },
  async getQueue(groupId) { throw new Error('Real music service not implemented'); },
  async addToQueue(groupId, track) { throw new Error('Real music service not implemented'); },
  async removeFromQueue(queueItemId) { throw new Error('Real music service not implemented'); },
  async voteTrack(queueItemId, upvote) { throw new Error('Real music service not implemented'); },
  async startGroupSession(groupId) { throw new Error('Real music service not implemented'); },
  async joinGroupSession(sessionId) { throw new Error('Real music service not implemented'); },
  async leaveGroupSession() { throw new Error('Real music service not implemented'); },
  async play(trackId) { throw new Error('Real music service not implemented'); },
  async pause() { throw new Error('Real music service not implemented'); },
  async skipToNext() { throw new Error('Real music service not implemented'); },
  async seekTo(positionMs) { throw new Error('Real music service not implemented'); },
  async getPlaybackState() { throw new Error('Real music service not implemented'); },
  subscribeToPlayback(callback) { throw new Error('Real music service not implemented'); },
  subscribeToQueue(groupId, callback) { throw new Error('Real music service not implemented'); },
  async getRecentlyPlayed() { throw new Error('Real music service not implemented'); },
  async getRecommendations(groupId) { throw new Error('Real music service not implemented'); },
};

// ============ EXPORT ============

export const musicService = isMockMode() ? mockMusicService : realMusicService;
