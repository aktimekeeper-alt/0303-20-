/**
 * APP DATA - All mock data in one place
 *
 * To switch to backend:
 * 1. Go to src/services/api.js
 * 2. Set USE_BACKEND = true
 * 3. Set your API_BASE_URL
 */

// ============ CURRENT USER ============
export const currentUser = {
  id: 1,
  username: '@drift_king',
  email: 'drift_king@example.com',
  avatar: null,
  car: {
    make: 'Nissan',
    model: '370Z',
    year: 2019,
    horsePower: 420,
    topSpeed: 165,
  },
  stats: {
    posts: 47,
    followers: 2340,
    following: 156,
    meetsAttended: 23,
    trackDays: 8,
  },
  mods: [
    { id: 1, name: 'GTX3076R Turbo', category: 'Engine' },
    { id: 2, name: 'BC Coilovers', category: 'Suspension' },
    { id: 3, name: 'Brembo BBK', category: 'Brakes' },
    { id: 4, name: 'Tomei Ti Exhaust', category: 'Exhaust' },
    { id: 5, name: 'AEM Infinity', category: 'Electronics' },
  ],
};

// ============ POSTS ============
export const posts = [
  {
    id: 1,
    title: 'GT35R Mounted',
    author: '@boost_junkie',
    time: '2h',
    description: '450whp on pump. Tuning next week.',
    category: 'builds',
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ['turbo', 'build'],
    gradient: ['#007AFF', '#0051D5'],
  },
  {
    id: 2,
    title: 'Sunday Twisties',
    author: '@mountain_carver',
    time: '4h',
    description: 'Weather was perfect. Anyone down next weekend?',
    category: 'meets',
    likes: 189,
    comments: 67,
    shares: 23,
    tags: ['canyon', 'weekend'],
    gradient: ['#34C759', '#248A3D'],
  },
  {
    id: 3,
    title: 'PB at Laguna 1:42.3',
    author: '@lap_timer',
    time: '6h',
    description: 'New suspension setup is dialed. Dropped 2 sec.',
    category: 'racing',
    likes: 312,
    comments: 89,
    shares: 34,
    tags: ['track', 'pb'],
    gradient: ['#FF3B30', '#D70015'],
  },
  {
    id: 4,
    title: 'Golden Hour',
    author: '@auto_lens',
    time: '8h',
    description: 'A7IV. DM for full res.',
    category: 'photos',
    likes: 567,
    comments: 123,
    shares: 89,
    tags: ['photo', 'sunset'],
    gradient: ['#FF9500', '#CC7700'],
  },
];

export const myPosts = [
  {
    id: 101,
    title: 'New Wheels Day!',
    author: '@drift_king',
    time: '1d',
    description: 'Finally got the Rays TE37s mounted. Worth every penny.',
    category: 'builds',
    likes: 156,
    comments: 32,
    shares: 8,
    tags: ['wheels', 'rays'],
    gradient: ['#AF52DE', '#8B3FBF'],
  },
  {
    id: 102,
    title: 'Track Day Prep',
    author: '@drift_king',
    time: '3d',
    description: 'Getting ready for Pacific Raceways this weekend.',
    category: 'racing',
    likes: 89,
    comments: 21,
    shares: 5,
    tags: ['track', 'prep'],
    gradient: ['#FF3B30', '#D70015'],
  },
];

export const likedPosts = [posts[0], posts[2]];

// ============ EVENTS ============
export const events = [
  {
    id: 1,
    title: 'Rainier Cruise',
    organizer: 'PNW Drivers Club',
    description: 'Scenic drive around Mount Rainier National Park.',
    location: 'Enumclaw, WA',
    date: '2025-01-15',
    time: '8:00 AM',
    type: 'Drive',
    difficulty: 'Intermediate',
    attendees: 32,
    maxAttendees: 50,
    gradient: ['#34C759', '#248A3D'],
  },
  {
    id: 2,
    title: 'Pacific Raceways TD',
    organizer: 'Cascade Track Days',
    description: 'Open track day at Pacific Raceways. All skill levels.',
    location: 'Kent, WA',
    date: '2025-01-22',
    time: '7:00 AM',
    type: 'Track',
    difficulty: 'All Levels',
    attendees: 67,
    maxAttendees: 80,
    gradient: ['#FF3B30', '#D70015'],
  },
  {
    id: 3,
    title: 'C&C Seattle',
    organizer: 'Seattle Auto Enthusiasts',
    description: "Monthly Cars & Coffee at Griot's Garage.",
    location: 'Tacoma, WA',
    date: '2025-01-18',
    time: '9:00 AM',
    type: 'Show',
    difficulty: 'All Welcome',
    attendees: 124,
    gradient: ['#007AFF', '#0051D5'],
  },
  {
    id: 4,
    title: 'Cascade Loop Run',
    organizer: 'WA Mountain Carvers',
    description: 'Epic mountain pass cruise through the Cascades.',
    location: 'Leavenworth, WA',
    date: '2025-01-29',
    time: '6:00 AM',
    type: 'Drive',
    difficulty: 'Advanced',
    attendees: 28,
    maxAttendees: 40,
    gradient: ['#AF52DE', '#8B3FBF'],
  },
];

// ============ ROUTES ============
export const routes = [
  {
    id: 1,
    name: 'Chinook Pass',
    rating: 4.9,
    reviews: 287,
    description: 'Epic mountain pass with stunning Rainier views.',
    distance: '82 mi',
    duration: '2h 30m',
    elevation: '+5,430 ft',
    difficulty: 'Intermediate',
    waypoints: ['Enumclaw', 'Chinook Pass', 'Naches'],
    gradient: ['#34C759', '#248A3D'],
  },
  {
    id: 2,
    name: 'Chuckanut Drive',
    rating: 4.8,
    reviews: 412,
    description: 'Scenic coastal drive along Samish Bay.',
    distance: '21 mi',
    duration: '45m',
    elevation: '+800 ft',
    difficulty: 'Easy',
    waypoints: ['Burlington', 'Larrabee State Park', 'Bellingham'],
    gradient: ['#007AFF', '#0051D5'],
  },
  {
    id: 3,
    name: 'Highway 2 Stevens',
    rating: 4.7,
    reviews: 356,
    description: 'Cascade mountain pass with tight switchbacks.',
    distance: '95 mi',
    duration: '2h 15m',
    elevation: '+4,061 ft',
    difficulty: 'Advanced',
    waypoints: ['Monroe', 'Stevens Pass', 'Leavenworth'],
    gradient: ['#FF3B30', '#D70015'],
  },
  {
    id: 4,
    name: 'Olympic Peninsula',
    rating: 4.9,
    reviews: 523,
    description: 'Rainforest to coast. Ultimate PNW experience.',
    distance: '150 mi',
    duration: '4h',
    elevation: '+2,400 ft',
    difficulty: 'Intermediate',
    waypoints: ['Port Angeles', 'Forks', 'Ocean Shores'],
    gradient: ['#FF9500', '#CC7700'],
  },
];

// ============ CONVERSATIONS ============
export const conversations = [
  {
    id: 1,
    name: 'C&C LA',
    type: 'group',
    members: 24,
    lastMessage: 'See everyone at 7am!',
    time: '10m',
    unread: 3,
  },
  {
    id: 2,
    name: 'Mike T',
    type: 'dm',
    lastMessage: 'Parts came in',
    time: '1h',
    unread: 0,
  },
  {
    id: 3,
    name: 'Track Crew',
    type: 'group',
    members: 12,
    lastMessage: 'Next sesh 2pm',
    time: '2h',
    unread: 5,
  },
  {
    id: 4,
    name: 'Sarah',
    type: 'dm',
    lastMessage: 'Those shots are sick',
    time: '3h',
    unread: 1,
  },
];

export const messages = [
  { id: 1, sender: 'other', text: 'Hey! You coming to the meet?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yeah definitely! What time?', time: '10:32 AM' },
  { id: 3, sender: 'other', text: 'See everyone at 7am!', time: '10:33 AM' },
];

// ============ NOTIFICATIONS ============
export const notifications = [
  { id: 1, type: 'like', user: '@speed_demon', text: 'liked your post', time: '5m', read: false },
  { id: 2, type: 'comment', user: '@turbo_tech', text: 'commented: "Clean build!"', time: '1h', read: false },
  { id: 3, type: 'follow', user: '@track_day', text: 'started following you', time: '2h', read: true },
  { id: 4, type: 'event', text: 'Rainier Cruise is tomorrow!', time: '3h', read: true },
  { id: 5, type: 'mention', user: '@canyon_runner', text: 'mentioned you in a comment', time: '5h', read: true },
];

// ============ CATEGORIES / FILTERS ============
export const postFilters = [
  { label: 'All', value: 'all' },
  { label: 'Builds', value: 'builds' },
  { label: 'Meets', value: 'meets' },
  { label: 'Racing', value: 'racing' },
  { label: 'Photos', value: 'photos' },
];

export const eventTypes = [
  { label: 'All', value: 'all' },
  { label: 'Drive', value: 'Drive' },
  { label: 'Track', value: 'Track' },
  { label: 'Show', value: 'Show' },
];

export const difficulties = ['Easy', 'Intermediate', 'Advanced', 'All Levels', 'All Welcome'];

// ============ GRADIENTS ============
export const gradients = {
  blue: ['#007AFF', '#0051D5'],
  green: ['#34C759', '#248A3D'],
  red: ['#FF3B30', '#D70015'],
  orange: ['#FF9500', '#CC7700'],
  purple: ['#AF52DE', '#8B3FBF'],
  pink: ['#FF2D55', '#D70040'],
  teal: ['#5AC8FA', '#32ADE6'],
};

// ============ HELPERS ============
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
};

// ============ CONSOLIDATED DATA EXPORT ============
export const DATA = {
  currentUser,
  posts,
  myPosts,
  likedPosts,
  events,
  routes,
  conversations,
  messages,
  notifications,
  postFilters,
  eventTypes,
  difficulties,
  gradients,
};

// Legacy exports for backward compatibility
export const profiles = [currentUser];
export const savedPosts = [];

export default DATA;
