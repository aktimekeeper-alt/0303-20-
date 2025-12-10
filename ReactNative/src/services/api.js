/**
 * API Service Layer
 *
 * BACKEND INTEGRATION:
 * 1. Set USE_BACKEND = true
 * 2. Set API_BASE_URL to your server
 * 3. All components will automatically use the backend
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DATA } from '../data/appData';

// ============ CONFIG ============
const USE_BACKEND = false;
const API_BASE_URL = 'https://your-api.com/api';
const API_DELAY = 300; // Simulate network delay for local

// ============ HELPERS ============
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const request = async (endpoint, options = {}) => {
  if (!USE_BACKEND) return null;

  const token = await AsyncStorage.getItem('authToken');
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
};

// ============ AUTH ============
export const Auth = {
  async login(email, password) {
    if (USE_BACKEND) {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      return data;
    }

    await delay(API_DELAY);
    const user = DATA.currentUser;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
  },

  async register(email, password, username) {
    if (USE_BACKEND) {
      return request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
      });
    }

    await delay(API_DELAY);
    return { success: true };
  },

  async logout() {
    await AsyncStorage.multiRemove(['authToken', 'user']);
    return { success: true };
  },

  async getUser() {
    if (USE_BACKEND) return request('/auth/me');

    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : DATA.currentUser;
  },
};

// ============ POSTS ============
export const Posts = {
  async getAll(filter = 'all') {
    if (USE_BACKEND) return request(`/posts?filter=${filter}`);

    await delay(API_DELAY);
    if (filter === 'all') return DATA.posts;
    return DATA.posts.filter(p => p.category === filter);
  },

  async getById(id) {
    if (USE_BACKEND) return request(`/posts/${id}`);
    return DATA.posts.find(p => p.id === id);
  },

  async getMine() {
    if (USE_BACKEND) return request('/posts/mine');
    return DATA.myPosts;
  },

  async create(postData) {
    if (USE_BACKEND) {
      return request('/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
    }

    await delay(API_DELAY);
    const saved = await AsyncStorage.getItem('userPosts');
    const posts = saved ? JSON.parse(saved) : [];
    const newPost = {
      id: Date.now(),
      ...postData,
      author: DATA.currentUser.username,
      time: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
    };
    posts.unshift(newPost);
    await AsyncStorage.setItem('userPosts', JSON.stringify(posts));
    return newPost;
  },

  async like(postId) {
    if (USE_BACKEND) return request(`/posts/${postId}/like`, { method: 'POST' });
    await delay(API_DELAY);
    return { success: true };
  },

  async comment(postId, text) {
    if (USE_BACKEND) {
      return request(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
    }

    await delay(API_DELAY);
    return {
      id: Date.now(),
      user: DATA.currentUser.username,
      text,
      time: 'now',
      likes: 0,
    };
  },
};

// ============ EVENTS ============
export const Events = {
  async getAll() {
    if (USE_BACKEND) return request('/events');
    await delay(API_DELAY);
    return DATA.events;
  },

  async getById(id) {
    if (USE_BACKEND) return request(`/events/${id}`);
    return DATA.events.find(e => e.id === id);
  },

  async join(eventId) {
    if (USE_BACKEND) return request(`/events/${eventId}/join`, { method: 'POST' });

    await delay(API_DELAY);
    await AsyncStorage.setItem(`rsvp_${eventId}`, JSON.stringify({ status: 'going', timestamp: Date.now() }));
    return { success: true };
  },

  async leave(eventId) {
    if (USE_BACKEND) return request(`/events/${eventId}/leave`, { method: 'POST' });

    await delay(API_DELAY);
    await AsyncStorage.removeItem(`rsvp_${eventId}`);
    return { success: true };
  },

  async getRsvp(eventId) {
    const rsvp = await AsyncStorage.getItem(`rsvp_${eventId}`);
    return rsvp ? JSON.parse(rsvp) : null;
  },
};

// ============ ROUTES ============
export const Routes = {
  async getAll() {
    if (USE_BACKEND) return request('/routes');
    await delay(API_DELAY);
    return DATA.routes;
  },

  async getById(id) {
    if (USE_BACKEND) return request(`/routes/${id}`);
    return DATA.routes.find(r => r.id === id);
  },

  async save(routeId) {
    if (USE_BACKEND) return request(`/routes/${routeId}/save`, { method: 'POST' });

    const saved = await AsyncStorage.getItem('savedRoutes') || '[]';
    const routes = JSON.parse(saved);
    if (!routes.includes(routeId)) {
      routes.push(routeId);
      await AsyncStorage.setItem('savedRoutes', JSON.stringify(routes));
    }
    return { success: true };
  },

  async getSaved() {
    if (USE_BACKEND) return request('/routes/saved');
    const saved = await AsyncStorage.getItem('savedRoutes');
    return saved ? JSON.parse(saved) : [];
  },
};

// ============ CHAT ============
export const Chat = {
  async getConversations() {
    if (USE_BACKEND) return request('/conversations');
    await delay(API_DELAY);
    return DATA.conversations;
  },

  async getMessages(conversationId) {
    if (USE_BACKEND) return request(`/conversations/${conversationId}/messages`);

    const key = `messages_${conversationId}`;
    const saved = await AsyncStorage.getItem(key);
    return saved ? JSON.parse(saved) : DATA.messages;
  },

  async send(conversationId, text) {
    if (USE_BACKEND) {
      return request(`/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
    }

    await delay(API_DELAY);
    const key = `messages_${conversationId}`;
    const messages = await this.getMessages(conversationId);
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    messages.push(newMsg);
    await AsyncStorage.setItem(key, JSON.stringify(messages));
    return newMsg;
  },
};

// ============ SAVED ============
export const Saved = {
  async getPosts() {
    if (USE_BACKEND) return request('/saved/posts');
    const saved = await AsyncStorage.getItem('savedPosts');
    return saved ? JSON.parse(saved) : [];
  },

  async savePost(post) {
    if (USE_BACKEND) return request(`/saved/posts/${post.id}`, { method: 'POST' });

    const posts = await this.getPosts();
    posts.push(post);
    await AsyncStorage.setItem('savedPosts', JSON.stringify(posts));
    return { success: true };
  },

  async unsavePost(postId) {
    if (USE_BACKEND) return request(`/saved/posts/${postId}`, { method: 'DELETE' });

    const posts = await this.getPosts();
    const filtered = posts.filter(p => p.id !== postId);
    await AsyncStorage.setItem('savedPosts', JSON.stringify(filtered));
    return { success: true };
  },
};

// ============ NOTIFICATIONS ============
export const Notifications = {
  async getAll() {
    if (USE_BACKEND) return request('/notifications');
    await delay(API_DELAY);
    return DATA.notifications;
  },

  async markRead(id) {
    if (USE_BACKEND) return request(`/notifications/${id}/read`, { method: 'POST' });
    return { success: true };
  },
};

// ============ PROFILE ============
export const Profile = {
  async get(userId) {
    if (USE_BACKEND) return request(`/profiles/${userId}`);
    return DATA.currentUser;
  },

  async update(data) {
    if (USE_BACKEND) {
      return request('/profiles/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }

    const current = await Auth.getUser();
    const updated = { ...current, ...data };
    await AsyncStorage.setItem('user', JSON.stringify(updated));
    return updated;
  },
};

// Export all APIs
export default { Auth, Posts, Events, Routes, Chat, Saved, Notifications, Profile };
