/**
 * BURNOUT APP - Chat Service
 *
 * Handles all chat operations including group chats, sub-chats, and push-to-talk.
 *
 * @module services/chat
 */

import { isMockMode } from '../config/env';
import { mockChats, mockMessages, mockDelay } from './mocks/chatMock';

// In-memory state for mock mode
let chatState = {
  chats: [...mockChats],
  messages: { ...mockMessages },
  pttActive: false,
  pttChannel: null,
};

// ============ MOCK IMPLEMENTATION ============

const mockChatService = {
  /**
   * Get all chats for the current user
   * @returns {Promise<import('../types').Chat[]>}
   */
  async getChats() {
    await mockDelay(400);
    return chatState.chats;
  },

  /**
   * Get a single chat by ID
   * @param {string} chatId
   * @returns {Promise<import('../types').Chat>}
   */
  async getChat(chatId) {
    await mockDelay(300);
    const chat = chatState.chats.find(c => c.id === chatId);
    if (!chat) {
      throw new Error('Chat not found');
    }
    return chat;
  },

  /**
   * Get messages for a chat
   * @param {string} chatId
   * @param {number} page
   * @returns {Promise<{messages: import('../types').Message[], hasMore: boolean}>}
   */
  async getMessages(chatId, page = 1) {
    await mockDelay(400);

    const messages = chatState.messages[chatId] || [];
    const pageSize = 50;
    const start = (page - 1) * pageSize;
    const paginatedMessages = messages.slice(start, start + pageSize);

    return {
      messages: paginatedMessages,
      hasMore: start + pageSize < messages.length,
    };
  },

  /**
   * Send a text message
   * @param {string} chatId
   * @param {string} content
   * @returns {Promise<import('../types').Message>}
   */
  async sendMessage(chatId, content) {
    await mockDelay(300);

    const message = {
      id: `m${Date.now()}`,
      chatId,
      senderId: '1',
      senderName: '@drift_king',
      type: 'text',
      content,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    if (!chatState.messages[chatId]) {
      chatState.messages[chatId] = [];
    }
    chatState.messages[chatId].unshift(message);

    // Update last message in chat
    const chat = chatState.chats.find(c => c.id === chatId);
    if (chat) {
      chat.lastMessage = message;
    }

    return message;
  },

  /**
   * Send an image message
   * @param {string} chatId
   * @param {string} imageUri
   * @returns {Promise<import('../types').Message>}
   */
  async sendImage(chatId, imageUri) {
    await mockDelay(800);

    const message = {
      id: `m${Date.now()}`,
      chatId,
      senderId: '1',
      senderName: '@drift_king',
      type: 'image',
      content: 'Sent an image',
      mediaUrl: imageUri,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    if (!chatState.messages[chatId]) {
      chatState.messages[chatId] = [];
    }
    chatState.messages[chatId].unshift(message);

    return message;
  },

  /**
   * Send a voice message
   * @param {string} chatId
   * @param {string} audioUri
   * @param {number} duration
   * @returns {Promise<import('../types').Message>}
   */
  async sendVoice(chatId, audioUri, duration) {
    await mockDelay(500);

    const message = {
      id: `m${Date.now()}`,
      chatId,
      senderId: '1',
      senderName: '@drift_king',
      type: 'voice',
      content: `Voice message (${duration}s)`,
      mediaUrl: audioUri,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    if (!chatState.messages[chatId]) {
      chatState.messages[chatId] = [];
    }
    chatState.messages[chatId].unshift(message);

    return message;
  },

  /**
   * Share location in chat
   * @param {string} chatId
   * @param {import('../types').Location} location
   * @returns {Promise<import('../types').Message>}
   */
  async shareLocation(chatId, location) {
    await mockDelay(300);

    const message = {
      id: `m${Date.now()}`,
      chatId,
      senderId: '1',
      senderName: '@drift_king',
      type: 'location',
      content: 'Shared location',
      location,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    if (!chatState.messages[chatId]) {
      chatState.messages[chatId] = [];
    }
    chatState.messages[chatId].unshift(message);

    return message;
  },

  /**
   * Create a new group chat
   * @param {string} name
   * @param {string[]} memberIds
   * @returns {Promise<import('../types').Chat>}
   */
  async createGroupChat(name, memberIds) {
    await mockDelay(600);

    const newChat = {
      id: `chat${Date.now()}`,
      name,
      avatar: null,
      type: 'group',
      memberIds: ['1', ...memberIds],
      members: [
        { id: '1', username: '@drift_king', avatar: null, isOnline: true },
        ...memberIds.map(id => ({
          id,
          username: `@user_${id}`,
          avatar: null,
          isOnline: Math.random() > 0.5,
        })),
      ],
      lastMessage: null,
      unreadCount: 0,
      locationSharingEnabled: false,
      subChats: [],
      createdAt: new Date().toISOString(),
    };

    chatState.chats.unshift(newChat);
    chatState.messages[newChat.id] = [];

    return newChat;
  },

  /**
   * Create a sub-chat (breakout room)
   * @param {string} parentChatId
   * @param {string} name
   * @param {string[]} memberIds
   * @returns {Promise<import('../types').SubChat>}
   */
  async createSubChat(parentChatId, name, memberIds) {
    await mockDelay(400);

    const parentChat = chatState.chats.find(c => c.id === parentChatId);
    if (!parentChat) {
      throw new Error('Parent chat not found');
    }

    const subChat = {
      id: `sub${Date.now()}`,
      name,
      parentChatId,
      memberIds: ['1', ...memberIds],
      createdAt: new Date().toISOString(),
    };

    parentChat.subChats = [...(parentChat.subChats || []), subChat];
    chatState.messages[subChat.id] = [];

    return subChat;
  },

  /**
   * Get sub-chats for a chat
   * @param {string} chatId
   * @returns {Promise<import('../types').SubChat[]>}
   */
  async getSubChats(chatId) {
    await mockDelay(300);

    const chat = chatState.chats.find(c => c.id === chatId);
    if (!chat) {
      throw new Error('Chat not found');
    }

    return chat.subChats || [];
  },

  /**
   * Toggle location sharing for a chat
   * @param {string} chatId
   * @param {boolean} enabled
   * @returns {Promise<void>}
   */
  async toggleLocationSharing(chatId, enabled) {
    await mockDelay(200);

    const chat = chatState.chats.find(c => c.id === chatId);
    if (chat) {
      chat.locationSharingEnabled = enabled;
    }
  },

  /**
   * Mark chat as read
   * @param {string} chatId
   * @returns {Promise<void>}
   */
  async markAsRead(chatId) {
    await mockDelay(100);

    const chat = chatState.chats.find(c => c.id === chatId);
    if (chat) {
      chat.unreadCount = 0;
    }
  },

  /**
   * Leave a group chat
   * @param {string} chatId
   * @returns {Promise<void>}
   */
  async leaveChat(chatId) {
    await mockDelay(300);

    chatState.chats = chatState.chats.filter(c => c.id !== chatId);
    delete chatState.messages[chatId];
  },

  /**
   * Add members to a group chat
   * @param {string} chatId
   * @param {string[]} memberIds
   * @returns {Promise<void>}
   */
  async addMembers(chatId, memberIds) {
    await mockDelay(400);

    const chat = chatState.chats.find(c => c.id === chatId);
    if (chat) {
      chat.memberIds = [...new Set([...chat.memberIds, ...memberIds])];
      chat.members = [
        ...chat.members,
        ...memberIds.map(id => ({
          id,
          username: `@user_${id}`,
          avatar: null,
          isOnline: false,
        })),
      ];
    }
  },

  /**
   * Remove a member from a group chat
   * @param {string} chatId
   * @param {string} memberId
   * @returns {Promise<void>}
   */
  async removeMember(chatId, memberId) {
    await mockDelay(300);

    const chat = chatState.chats.find(c => c.id === chatId);
    if (chat) {
      chat.memberIds = chat.memberIds.filter(id => id !== memberId);
      chat.members = chat.members.filter(m => m.id !== memberId);
    }
  },

  // ============ PUSH-TO-TALK (CB Radio Style) ============

  /**
   * Start push-to-talk transmission
   * @param {string} chatId - Chat or proximity channel ID
   * @returns {Promise<void>}
   */
  async startPTT(chatId) {
    await mockDelay(100);

    chatState.pttActive = true;
    chatState.pttChannel = chatId;

    console.log(`PTT started on channel ${chatId}`);
  },

  /**
   * Stop push-to-talk transmission
   * @returns {Promise<void>}
   */
  async stopPTT() {
    await mockDelay(100);

    chatState.pttActive = false;
    chatState.pttChannel = null;

    console.log('PTT stopped');
  },

  /**
   * Check if someone is transmitting on a channel
   * @param {string} chatId
   * @returns {Promise<{isActive: boolean, speaker: string|null}>}
   */
  async getPTTStatus(chatId) {
    await mockDelay(50);

    // Simulate random PTT activity for demo
    if (Math.random() > 0.9) {
      return {
        isActive: true,
        speaker: '@boost_junkie',
      };
    }

    return {
      isActive: false,
      speaker: null,
    };
  },

  /**
   * Get active PTT channels (proximity chat)
   * @param {import('../types').Location} location
   * @param {number} radiusMiles
   * @returns {Promise<{channelId: string, activeUsers: number}[]>}
   */
  async getProximityChannels(location, radiusMiles = 5) {
    await mockDelay(300);

    // Mock nearby channels
    return [
      { channelId: 'cb_local_1', activeUsers: 3 },
      { channelId: 'cb_local_2', activeUsers: 1 },
    ];
  },

  /**
   * Join a proximity chat channel
   * @param {string} channelId
   * @returns {Promise<void>}
   */
  async joinProximityChannel(channelId) {
    await mockDelay(200);
    console.log(`Joined proximity channel ${channelId}`);
  },

  /**
   * Leave a proximity chat channel
   * @param {string} channelId
   * @returns {Promise<void>}
   */
  async leaveProximityChannel(channelId) {
    await mockDelay(100);
    console.log(`Left proximity channel ${channelId}`);
  },

  // ============ REAL-TIME SUBSCRIPTIONS (Mock) ============

  /**
   * Subscribe to chat updates
   * @param {string} chatId
   * @param {(message: import('../types').Message) => void} callback
   * @returns {() => void} Unsubscribe function
   */
  subscribeToChat(chatId, callback) {
    // In real implementation, this would set up a WebSocket or Matrix subscription
    const interval = setInterval(() => {
      // Simulate receiving a message occasionally
      if (Math.random() > 0.95) {
        callback({
          id: `m${Date.now()}`,
          chatId,
          senderId: '2',
          senderName: '@boost_junkie',
          type: 'text',
          content: 'Simulated incoming message',
          createdAt: new Date().toISOString(),
          isRead: false,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  },

  /**
   * Subscribe to typing indicators
   * @param {string} chatId
   * @param {(users: string[]) => void} callback
   * @returns {() => void} Unsubscribe function
   */
  subscribeToTyping(chatId, callback) {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        callback(['@boost_junkie']);
        setTimeout(() => callback([]), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realChatService = {
  async getChats() {
    throw new Error('Real chat service not implemented');
  },
  async getChat(chatId) {
    throw new Error('Real chat service not implemented');
  },
  async getMessages(chatId, page) {
    throw new Error('Real chat service not implemented');
  },
  async sendMessage(chatId, content) {
    throw new Error('Real chat service not implemented');
  },
  async sendImage(chatId, imageUri) {
    throw new Error('Real chat service not implemented');
  },
  async sendVoice(chatId, audioUri, duration) {
    throw new Error('Real chat service not implemented');
  },
  async shareLocation(chatId, location) {
    throw new Error('Real chat service not implemented');
  },
  async createGroupChat(name, memberIds) {
    throw new Error('Real chat service not implemented');
  },
  async createSubChat(parentChatId, name, memberIds) {
    throw new Error('Real chat service not implemented');
  },
  async getSubChats(chatId) {
    throw new Error('Real chat service not implemented');
  },
  async toggleLocationSharing(chatId, enabled) {
    throw new Error('Real chat service not implemented');
  },
  async markAsRead(chatId) {
    throw new Error('Real chat service not implemented');
  },
  async leaveChat(chatId) {
    throw new Error('Real chat service not implemented');
  },
  async addMembers(chatId, memberIds) {
    throw new Error('Real chat service not implemented');
  },
  async removeMember(chatId, memberId) {
    throw new Error('Real chat service not implemented');
  },
  async startPTT(chatId) {
    throw new Error('Real chat service not implemented');
  },
  async stopPTT() {
    throw new Error('Real chat service not implemented');
  },
  async getPTTStatus(chatId) {
    throw new Error('Real chat service not implemented');
  },
  async getProximityChannels(location, radiusMiles) {
    throw new Error('Real chat service not implemented');
  },
  async joinProximityChannel(channelId) {
    throw new Error('Real chat service not implemented');
  },
  async leaveProximityChannel(channelId) {
    throw new Error('Real chat service not implemented');
  },
  subscribeToChat(chatId, callback) {
    throw new Error('Real chat service not implemented');
  },
  subscribeToTyping(chatId, callback) {
    throw new Error('Real chat service not implemented');
  },
};

// ============ EXPORT ============

export const chatService = isMockMode() ? mockChatService : realChatService;
