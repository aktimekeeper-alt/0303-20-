/**
 * BURNOUT APP - Services Index
 *
 * Central export for all services. Import from here rather than individual files.
 *
 * Usage:
 *   import { authService, feedService, chatService } from '../services';
 *
 * @module services
 */

export { authService } from './auth';
export { profileService } from './profile';
export { feedService } from './feed';
export { chatService } from './chat';
export { mapService } from './map';
export { locationService } from './location';
export { routeService } from './route';
export { groupService } from './group';
export { musicService } from './music';

// Re-export config helpers
export { isMockMode, getApiUrl, isFeatureEnabled } from '../config/env';
