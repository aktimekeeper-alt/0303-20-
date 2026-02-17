/**
 * BURNOUT APP - Group Service
 *
 * Handles all group operations including forums, events, and moderation.
 *
 * @module services/group
 */

import { isMockMode } from '../config/env';
import { mockGroups, mockForumThreads, mockGroupEvents, mockDelay } from './mocks/groupMock';

// In-memory state
let groupState = {
  groups: [...mockGroups],
  threads: [...mockForumThreads],
  events: [...mockGroupEvents],
};

// ============ MOCK IMPLEMENTATION ============

const mockGroupService = {
  /**
   * Get all groups (discover)
   * @param {number} page
   * @param {string[]} [tags]
   * @returns {Promise<{groups: import('../types').Group[], hasMore: boolean}>}
   */
  async getGroups(page = 1, tags = null) {
    await mockDelay(500);

    let groups = [...groupState.groups];

    if (tags && tags.length > 0) {
      groups = groups.filter(g =>
        g.tags.some(tag => tags.includes(tag))
      );
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;

    return {
      groups: groups.slice(start, start + pageSize),
      hasMore: start + pageSize < groups.length,
    };
  },

  /**
   * Get user's groups
   * @returns {Promise<import('../types').Group[]>}
   */
  async getMyGroups() {
    await mockDelay(400);
    return groupState.groups.filter(g => g.isMember);
  },

  /**
   * Get a single group by ID
   * @param {string} groupId
   * @returns {Promise<import('../types').Group>}
   */
  async getGroup(groupId) {
    await mockDelay(300);

    const group = groupState.groups.find(g => g.id === groupId);
    if (!group) {
      throw new Error('Group not found');
    }

    return group;
  },

  /**
   * Join a group
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async joinGroup(groupId) {
    await mockDelay(300);

    const group = groupState.groups.find(g => g.id === groupId);
    if (group) {
      group.isMember = true;
      group.memberCount += 1;
    }
  },

  /**
   * Leave a group
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async leaveGroup(groupId) {
    await mockDelay(300);

    const group = groupState.groups.find(g => g.id === groupId);
    if (group) {
      group.isMember = false;
      group.memberCount -= 1;
    }
  },

  /**
   * Create a new group
   * @param {{name: string, description: string, tags: string[], isPrivate: boolean}} data
   * @returns {Promise<import('../types').Group>}
   */
  async createGroup(data) {
    await mockDelay(600);

    const newGroup = {
      id: `group_${Date.now()}`,
      name: data.name,
      description: data.description,
      avatar: null,
      coverImage: null,
      ownerId: '1',
      moderatorIds: ['1'],
      memberCount: 1,
      isPrivate: data.isPrivate,
      tags: data.tags,
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    groupState.groups.unshift(newGroup);
    return newGroup;
  },

  /**
   * Update group settings
   * @param {string} groupId
   * @param {Partial<import('../types').Group>} updates
   * @returns {Promise<import('../types').Group>}
   */
  async updateGroup(groupId, updates) {
    await mockDelay(400);

    const group = groupState.groups.find(g => g.id === groupId);
    if (!group) {
      throw new Error('Group not found');
    }

    Object.assign(group, updates);
    return group;
  },

  /**
   * Delete a group
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async deleteGroup(groupId) {
    await mockDelay(400);
    groupState.groups = groupState.groups.filter(g => g.id !== groupId);
  },

  // ============ FORUM ============

  /**
   * Get forum threads for a group
   * @param {string} groupId
   * @param {number} page
   * @returns {Promise<{threads: import('../types').ForumThread[], hasMore: boolean}>}
   */
  async getGroupForum(groupId, page = 1) {
    await mockDelay(400);

    const threads = groupState.threads.filter(t => t.groupId === groupId);

    // Sort: pinned first, then by lastReplyAt
    threads.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.lastReplyAt) - new Date(a.lastReplyAt);
    });

    const pageSize = 20;
    const start = (page - 1) * pageSize;

    return {
      threads: threads.slice(start, start + pageSize),
      hasMore: start + pageSize < threads.length,
    };
  },

  /**
   * Get a single thread
   * @param {string} threadId
   * @returns {Promise<import('../types').ForumThread>}
   */
  async getThread(threadId) {
    await mockDelay(300);

    const thread = groupState.threads.find(t => t.id === threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    // Increment views
    thread.views += 1;

    return thread;
  },

  /**
   * Create a new thread
   * @param {string} groupId
   * @param {{title: string, content: string}} data
   * @returns {Promise<import('../types').ForumThread>}
   */
  async createThread(groupId, data) {
    await mockDelay(500);

    const newThread = {
      id: `thread_${Date.now()}`,
      groupId,
      authorId: '1',
      author: '@drift_king',
      title: data.title,
      content: data.content,
      replyCount: 0,
      views: 0,
      isPinned: false,
      isLocked: false,
      createdAt: new Date().toISOString(),
      lastReplyAt: new Date().toISOString(),
    };

    groupState.threads.unshift(newThread);
    return newThread;
  },

  /**
   * Reply to a thread
   * @param {string} threadId
   * @param {string} content
   * @returns {Promise<Object>}
   */
  async replyToThread(threadId, content) {
    await mockDelay(400);

    const thread = groupState.threads.find(t => t.id === threadId);
    if (thread) {
      thread.replyCount += 1;
      thread.lastReplyAt = new Date().toISOString();
    }

    return {
      id: `reply_${Date.now()}`,
      threadId,
      authorId: '1',
      author: '@drift_king',
      content,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Pin/unpin a thread (moderator only)
   * @param {string} threadId
   * @param {boolean} pinned
   * @returns {Promise<void>}
   */
  async pinThread(threadId, pinned) {
    await mockDelay(200);

    const thread = groupState.threads.find(t => t.id === threadId);
    if (thread) {
      thread.isPinned = pinned;
    }
  },

  /**
   * Lock/unlock a thread (moderator only)
   * @param {string} threadId
   * @param {boolean} locked
   * @returns {Promise<void>}
   */
  async lockThread(threadId, locked) {
    await mockDelay(200);

    const thread = groupState.threads.find(t => t.id === threadId);
    if (thread) {
      thread.isLocked = locked;
    }
  },

  /**
   * Delete a thread
   * @param {string} threadId
   * @returns {Promise<void>}
   */
  async deleteThread(threadId) {
    await mockDelay(300);
    groupState.threads = groupState.threads.filter(t => t.id !== threadId);
  },

  // ============ CALENDAR ============

  /**
   * Get group events/calendar
   * @param {string} groupId
   * @param {'day'|'week'|'month'} view
   * @param {Date} date
   * @returns {Promise<import('../types').Event[]>}
   */
  async getGroupCalendar(groupId, view = 'month', date = new Date()) {
    await mockDelay(400);
    return groupState.events.filter(e => e.groupId === groupId);
  },

  /**
   * Create a group event
   * @param {string} groupId
   * @param {Omit<import('../types').Event, 'id'|'attendeeCount'>} eventData
   * @returns {Promise<import('../types').Event>}
   */
  async createGroupEvent(groupId, eventData) {
    await mockDelay(500);

    const newEvent = {
      id: `gevent_${Date.now()}`,
      groupId,
      ...eventData,
      attendeeCount: 1,
      isAttending: true,
    };

    groupState.events.push(newEvent);
    return newEvent;
  },

  /**
   * RSVP to a group event
   * @param {string} eventId
   * @param {boolean} attending
   * @returns {Promise<void>}
   */
  async rsvpEvent(eventId, attending) {
    await mockDelay(200);

    const event = groupState.events.find(e => e.id === eventId);
    if (event) {
      if (attending && !event.isAttending) {
        event.attendeeCount += 1;
      } else if (!attending && event.isAttending) {
        event.attendeeCount -= 1;
      }
      event.isAttending = attending;
    }
  },

  // ============ NEWS (Autobits) ============

  /**
   * Get group news/autobits
   * @param {string} groupId
   * @param {number} page
   * @returns {Promise<{autobits: import('../types').Autobit[], hasMore: boolean}>}
   */
  async getGroupNews(groupId, page = 1) {
    await mockDelay(400);

    // In mock mode, return empty - groups would have their own autobits
    return {
      autobits: [],
      hasMore: false,
    };
  },

  // ============ MODERATION ============

  /**
   * Get group members
   * @param {string} groupId
   * @param {number} page
   * @returns {Promise<{members: Object[], hasMore: boolean}>}
   */
  async getMembers(groupId, page = 1) {
    await mockDelay(400);

    // Mock members
    const members = [
      { id: '1', username: '@drift_king', role: 'moderator', joinedAt: '2023-06-01T00:00:00Z' },
      { id: '2', username: '@boost_junkie', role: 'owner', joinedAt: '2023-01-15T00:00:00Z' },
      { id: '3', username: '@track_queen', role: 'moderator', joinedAt: '2023-02-20T00:00:00Z' },
      { id: '4', username: '@canyon_runner', role: 'member', joinedAt: '2023-08-10T00:00:00Z' },
    ];

    return {
      members,
      hasMore: false,
    };
  },

  /**
   * Add a moderator
   * @param {string} groupId
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async addModerator(groupId, userId) {
    await mockDelay(300);

    const group = groupState.groups.find(g => g.id === groupId);
    if (group && !group.moderatorIds.includes(userId)) {
      group.moderatorIds.push(userId);
    }
  },

  /**
   * Remove a moderator
   * @param {string} groupId
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async removeModerator(groupId, userId) {
    await mockDelay(300);

    const group = groupState.groups.find(g => g.id === groupId);
    if (group) {
      group.moderatorIds = group.moderatorIds.filter(id => id !== userId);
    }
  },

  /**
   * Kick a member
   * @param {string} groupId
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async kickMember(groupId, userId) {
    await mockDelay(300);
    console.log(`Kicked user ${userId} from group ${groupId}`);
  },

  /**
   * Ban a member
   * @param {string} groupId
   * @param {string} userId
   * @param {string} reason
   * @returns {Promise<void>}
   */
  async banMember(groupId, userId, reason) {
    await mockDelay(300);
    console.log(`Banned user ${userId} from group ${groupId}: ${reason}`);
  },

  /**
   * Search groups
   * @param {string} query
   * @returns {Promise<import('../types').Group[]>}
   */
  async searchGroups(query) {
    await mockDelay(400);

    const lowerQuery = query.toLowerCase();
    return groupState.groups.filter(
      g =>
        g.name.toLowerCase().includes(lowerQuery) ||
        g.description?.toLowerCase().includes(lowerQuery) ||
        g.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realGroupService = {
  async getGroups(page, tags) { throw new Error('Real group service not implemented'); },
  async getMyGroups() { throw new Error('Real group service not implemented'); },
  async getGroup(groupId) { throw new Error('Real group service not implemented'); },
  async joinGroup(groupId) { throw new Error('Real group service not implemented'); },
  async leaveGroup(groupId) { throw new Error('Real group service not implemented'); },
  async createGroup(data) { throw new Error('Real group service not implemented'); },
  async updateGroup(groupId, updates) { throw new Error('Real group service not implemented'); },
  async deleteGroup(groupId) { throw new Error('Real group service not implemented'); },
  async getGroupForum(groupId, page) { throw new Error('Real group service not implemented'); },
  async getThread(threadId) { throw new Error('Real group service not implemented'); },
  async createThread(groupId, data) { throw new Error('Real group service not implemented'); },
  async replyToThread(threadId, content) { throw new Error('Real group service not implemented'); },
  async pinThread(threadId, pinned) { throw new Error('Real group service not implemented'); },
  async lockThread(threadId, locked) { throw new Error('Real group service not implemented'); },
  async deleteThread(threadId) { throw new Error('Real group service not implemented'); },
  async getGroupCalendar(groupId, view, date) { throw new Error('Real group service not implemented'); },
  async createGroupEvent(groupId, eventData) { throw new Error('Real group service not implemented'); },
  async rsvpEvent(eventId, attending) { throw new Error('Real group service not implemented'); },
  async getGroupNews(groupId, page) { throw new Error('Real group service not implemented'); },
  async getMembers(groupId, page) { throw new Error('Real group service not implemented'); },
  async addModerator(groupId, userId) { throw new Error('Real group service not implemented'); },
  async removeModerator(groupId, userId) { throw new Error('Real group service not implemented'); },
  async kickMember(groupId, userId) { throw new Error('Real group service not implemented'); },
  async banMember(groupId, userId, reason) { throw new Error('Real group service not implemented'); },
  async searchGroups(query) { throw new Error('Real group service not implemented'); },
};

// ============ EXPORT ============

export const groupService = isMockMode() ? mockGroupService : realGroupService;
