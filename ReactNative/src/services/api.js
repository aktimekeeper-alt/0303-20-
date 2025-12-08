import AsyncStorage from '@react-native-async-storage/async-storage';

const API_DELAY = 300;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated backend with local storage
export const api = {
  // Posts
  async getPosts() {
    await delay(API_DELAY);
    const posts = await AsyncStorage.getItem('posts');
    return posts ? JSON.parse(posts) : null;
  },

  async savePost(post) {
    await delay(API_DELAY);
    const posts = await this.getPosts() || [];
    const newPost = { ...post, id: Date.now(), time: 'now' };
    const updated = [newPost, ...posts];
    await AsyncStorage.setItem('posts', JSON.stringify(updated));
    return newPost;
  },

  async likePost(postId) {
    await delay(API_DELAY);
    return { success: true, postId };
  },

  // Messages
  async getMessages(conversationId) {
    await delay(API_DELAY);
    const key = `messages_${conversationId}`;
    const messages = await AsyncStorage.getItem(key);
    return messages ? JSON.parse(messages) : null;
  },

  async sendMessage(conversationId, text) {
    await delay(API_DELAY);
    const key = `messages_${conversationId}`;
    const messages = await this.getMessages(conversationId) || [];
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    const updated = [...messages, newMsg];
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    return newMsg;
  },

  // User
  async getUser() {
    await delay(API_DELAY);
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  async updateUser(data) {
    await delay(API_DELAY);
    const current = await this.getUser() || {};
    const updated = { ...current, ...data };
    await AsyncStorage.setItem('user', JSON.stringify(updated));
    return updated;
  },

  // Notifications
  async getNotifications() {
    await delay(API_DELAY);
    const notifs = await AsyncStorage.getItem('notifications');
    return notifs ? JSON.parse(notifs) : null;
  },

  async markNotificationRead(id) {
    await delay(API_DELAY);
    const notifs = await this.getNotifications() || [];
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    await AsyncStorage.setItem('notifications', JSON.stringify(updated));
    return { success: true };
  },

  // Events
  async rsvpEvent(eventId, status) {
    await delay(API_DELAY);
    const key = `rsvp_${eventId}`;
    await AsyncStorage.setItem(key, JSON.stringify({ status, timestamp: Date.now() }));
    return { success: true, eventId, status };
  },

  async getEventRsvp(eventId) {
    await delay(API_DELAY);
    const rsvp = await AsyncStorage.getItem(`rsvp_${eventId}`);
    return rsvp ? JSON.parse(rsvp) : null;
  },

  // Routes
  async saveRoute(routeId) {
    await delay(API_DELAY);
    const saved = await AsyncStorage.getItem('savedRoutes') || '[]';
    const routes = JSON.parse(saved);
    if (!routes.includes(routeId)) {
      routes.push(routeId);
      await AsyncStorage.setItem('savedRoutes', JSON.stringify(routes));
    }
    return { success: true };
  },

  async getSavedRoutes() {
    await delay(API_DELAY);
    const saved = await AsyncStorage.getItem('savedRoutes');
    return saved ? JSON.parse(saved) : [];
  },
};

export default api;
