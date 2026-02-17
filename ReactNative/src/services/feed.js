/**
 * BURNOUT APP - Feed Service
 *
 * Handles all social feed operations: Posts, Sparks, and Autobits.
 *
 * @module services/feed
 */

import { isMockMode } from '../config/env';
import { mockPosts, mockSparks, mockAutobits, mockDelay } from './mocks/feedMock';

// In-memory storage for mock mode
let savedPosts = new Set();
let likedPosts = new Set(['2']); // Pre-liked post 2

// ============ MOCK IMPLEMENTATION ============

const mockFeedService = {
  /**
   * Get the main feed (Posts only - car content)
   * @param {number} page
   * @param {string} [category]
   * @returns {Promise<{posts: import('../types').Post[], hasMore: boolean}>}
   */
  async getFeed(page = 1, category = null) {
    await mockDelay(600);

    let posts = [...mockPosts];

    if (category) {
      posts = posts.filter(p => p.category === category);
    }

    // Apply saved/liked state
    posts = posts.map(p => ({
      ...p,
      isLiked: likedPosts.has(p.id),
      isSaved: savedPosts.has(p.id),
    }));

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const paginatedPosts = posts.slice(start, start + pageSize);

    return {
      posts: paginatedPosts,
      hasMore: start + pageSize < posts.length,
    };
  },

  /**
   * Get Sparks feed (short-form content)
   * @param {number} page
   * @returns {Promise<{sparks: import('../types').Spark[], hasMore: boolean}>}
   */
  async getSparks(page = 1) {
    await mockDelay(400);

    const pageSize = 20;
    const start = (page - 1) * pageSize;
    const paginatedSparks = mockSparks.slice(start, start + pageSize);

    return {
      sparks: paginatedSparks,
      hasMore: start + pageSize < mockSparks.length,
    };
  },

  /**
   * Get Autobits feed (long-form articles)
   * @param {number} page
   * @param {string} [category]
   * @returns {Promise<{autobits: import('../types').Autobit[], hasMore: boolean}>}
   */
  async getAutobits(page = 1, category = null) {
    await mockDelay(500);

    let autobits = [...mockAutobits];

    if (category) {
      autobits = autobits.filter(a => a.category === category);
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const paginatedAutobits = autobits.slice(start, start + pageSize);

    return {
      autobits: paginatedAutobits,
      hasMore: start + pageSize < autobits.length,
    };
  },

  /**
   * Get a single post by ID
   * @param {string} postId
   * @returns {Promise<import('../types').Post>}
   */
  async getPost(postId) {
    await mockDelay(300);

    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      throw new Error('Post not found');
    }

    return {
      ...post,
      isLiked: likedPosts.has(post.id),
      isSaved: savedPosts.has(post.id),
    };
  },

  /**
   * Create a new post
   * @param {{title: string, content: string, category: string, images?: string[]}} data
   * @returns {Promise<import('../types').Post>}
   */
  async createPost(data) {
    await mockDelay(800);

    const newPost = {
      id: Date.now().toString(),
      authorId: '1',
      author: '@drift_king',
      authorAvatar: null,
      type: 'post',
      title: data.title,
      content: data.content,
      images: data.images || [],
      category: data.category,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date().toISOString(),
      gradient: ['#FF4500', '#FF6B35'],
    };

    mockPosts.unshift(newPost);
    return newPost;
  },

  /**
   * Create a new Spark (short-form content)
   * @param {{content: string, media?: string}} data
   * @returns {Promise<import('../types').Spark>}
   */
  async createSpark(data) {
    await mockDelay(500);

    const newSpark = {
      id: `s${Date.now()}`,
      authorId: '1',
      author: '@drift_king',
      content: data.content,
      media: data.media || null,
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
    };

    mockSparks.unshift(newSpark);
    return newSpark;
  },

  /**
   * Create a new Autobit (long-form article)
   * @param {{title: string, content: string, category: string, coverImage?: string}} data
   * @returns {Promise<import('../types').Autobit>}
   */
  async createAutobit(data) {
    await mockDelay(1000);

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = data.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const newAutobit = {
      id: `a${Date.now()}`,
      authorId: '1',
      author: '@drift_king',
      title: data.title,
      content: data.content,
      coverImage: data.coverImage || null,
      category: data.category,
      readTime,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    mockAutobits.unshift(newAutobit);
    return newAutobit;
  },

  /**
   * Like a post
   * @param {string} postId
   * @returns {Promise<void>}
   */
  async likePost(postId) {
    await mockDelay(200);
    likedPosts.add(postId);

    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
    }
  },

  /**
   * Unlike a post
   * @param {string} postId
   * @returns {Promise<void>}
   */
  async unlikePost(postId) {
    await mockDelay(200);
    likedPosts.delete(postId);

    const post = mockPosts.find(p => p.id === postId);
    if (post && post.likes > 0) {
      post.likes -= 1;
    }
  },

  /**
   * Save a post
   * @param {string} postId
   * @returns {Promise<void>}
   */
  async savePost(postId) {
    await mockDelay(200);
    savedPosts.add(postId);
  },

  /**
   * Unsave a post
   * @param {string} postId
   * @returns {Promise<void>}
   */
  async unsavePost(postId) {
    await mockDelay(200);
    savedPosts.delete(postId);
  },

  /**
   * Share a post
   * @param {string} postId
   * @returns {Promise<string>} Share URL
   */
  async sharePost(postId) {
    await mockDelay(300);

    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.shares += 1;
    }

    return `https://burnout.app/post/${postId}`;
  },

  /**
   * Delete a post
   * @param {string} postId
   * @returns {Promise<void>}
   */
  async deletePost(postId) {
    await mockDelay(400);

    const index = mockPosts.findIndex(p => p.id === postId);
    if (index !== -1) {
      mockPosts.splice(index, 1);
    }
  },

  /**
   * Get comments for a post
   * @param {string} postId
   * @param {number} page
   * @returns {Promise<{comments: Object[], hasMore: boolean}>}
   */
  async getComments(postId, page = 1) {
    await mockDelay(400);

    // Mock comments
    const comments = [
      {
        id: 'c1',
        postId,
        authorId: '2',
        author: '@boost_junkie',
        content: 'Looks amazing! What turbo kit are you running?',
        likes: 12,
        createdAt: '2024-01-15T11:00:00Z',
      },
      {
        id: 'c2',
        postId,
        authorId: '3',
        author: '@track_queen',
        content: 'Clean build! Would love to see it at the next meet.',
        likes: 8,
        createdAt: '2024-01-15T10:45:00Z',
      },
    ];

    return {
      comments,
      hasMore: false,
    };
  },

  /**
   * Add a comment to a post
   * @param {string} postId
   * @param {string} content
   * @returns {Promise<Object>}
   */
  async addComment(postId, content) {
    await mockDelay(400);

    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.comments += 1;
    }

    return {
      id: `c${Date.now()}`,
      postId,
      authorId: '1',
      author: '@drift_king',
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Get user's saved posts
   * @param {number} page
   * @returns {Promise<{posts: import('../types').Post[], hasMore: boolean}>}
   */
  async getSavedPosts(page = 1) {
    await mockDelay(500);

    const saved = mockPosts.filter(p => savedPosts.has(p.id));
    return {
      posts: saved,
      hasMore: false,
    };
  },

  /**
   * Get user's liked posts
   * @param {number} page
   * @returns {Promise<{posts: import('../types').Post[], hasMore: boolean}>}
   */
  async getLikedPosts(page = 1) {
    await mockDelay(500);

    const liked = mockPosts.filter(p => likedPosts.has(p.id));
    return {
      posts: liked,
      hasMore: false,
    };
  },

  /**
   * Get user's own posts
   * @param {string} userId
   * @param {number} page
   * @returns {Promise<{posts: import('../types').Post[], hasMore: boolean}>}
   */
  async getUserPosts(userId, page = 1) {
    await mockDelay(500);

    const userPosts = mockPosts.filter(p => p.authorId === userId);
    return {
      posts: userPosts,
      hasMore: false,
    };
  },

  /**
   * Search posts
   * @param {string} query
   * @returns {Promise<import('../types').Post[]>}
   */
  async searchPosts(query) {
    await mockDelay(500);

    const lowerQuery = query.toLowerCase();
    return mockPosts.filter(
      p =>
        p.title?.toLowerCase().includes(lowerQuery) ||
        p.content.toLowerCase().includes(lowerQuery) ||
        p.author.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Report a post
   * @param {string} postId
   * @param {string} reason
   * @returns {Promise<void>}
   */
  async reportPost(postId, reason) {
    await mockDelay(300);
    console.log(`Post ${postId} reported: ${reason}`);
  },
};

// ============ REAL IMPLEMENTATION (Placeholder for Bryce) ============

const realFeedService = {
  async getFeed(page, category) {
    throw new Error('Real feed service not implemented');
  },
  async getSparks(page) {
    throw new Error('Real feed service not implemented');
  },
  async getAutobits(page, category) {
    throw new Error('Real feed service not implemented');
  },
  async getPost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async createPost(data) {
    throw new Error('Real feed service not implemented');
  },
  async createSpark(data) {
    throw new Error('Real feed service not implemented');
  },
  async createAutobit(data) {
    throw new Error('Real feed service not implemented');
  },
  async likePost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async unlikePost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async savePost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async unsavePost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async sharePost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async deletePost(postId) {
    throw new Error('Real feed service not implemented');
  },
  async getComments(postId, page) {
    throw new Error('Real feed service not implemented');
  },
  async addComment(postId, content) {
    throw new Error('Real feed service not implemented');
  },
  async getSavedPosts(page) {
    throw new Error('Real feed service not implemented');
  },
  async getLikedPosts(page) {
    throw new Error('Real feed service not implemented');
  },
  async getUserPosts(userId, page) {
    throw new Error('Real feed service not implemented');
  },
  async searchPosts(query) {
    throw new Error('Real feed service not implemented');
  },
  async reportPost(postId, reason) {
    throw new Error('Real feed service not implemented');
  },
};

// ============ EXPORT ============

export const feedService = isMockMode() ? mockFeedService : realFeedService;
