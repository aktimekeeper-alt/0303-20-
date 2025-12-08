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

// User's own posts
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

// Posts the user has liked
export const likedPosts = [
  posts[0], // GT35R Mounted
  posts[2], // PB at Laguna
  {
    id: 201,
    title: 'Midnight Meet',
    author: '@night_rider',
    time: '5h',
    description: 'Downtown Seattle vibes. Great turnout!',
    category: 'meets',
    likes: 423,
    comments: 78,
    shares: 45,
    tags: ['meet', 'night'],
    gradient: ['#5856D6', '#3634A3'],
  },
];

// Posts the user has saved
export const savedPosts = [
  posts[1], // Sunday Twisties
  posts[3], // Golden Hour
  {
    id: 301,
    title: 'Turbo Install Guide',
    author: '@boost_master',
    time: '2d',
    description: 'Complete walkthrough for GT35R install on Z platform.',
    category: 'builds',
    likes: 892,
    comments: 156,
    shares: 234,
    tags: ['turbo', 'guide'],
    gradient: ['#007AFF', '#0051D5'],
  },
];

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
  },
];

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
  },
  {
    id: 3,
    title: 'C&C Seattle',
    organizer: 'Seattle Auto Enthusiasts',
    description: 'Monthly Cars & Coffee at Griot\'s Garage.',
    location: 'Tacoma, WA',
    date: '2025-01-18',
    time: '9:00 AM',
    type: 'Show',
    difficulty: 'All Welcome',
    attendees: 124,
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
  },
];

export const profiles = [
  {
    id: 1,
    username: '@drift_king',
    carModel: 'Nissan 370Z',
    year: '2019',
    horsePower: 420,
    topSpeed: 165,
    stats: {
      posts: 47,
      followers: 2340,
      meetsAttended: 23,
      trackDays: 8,
    },
    mods: [
      'GTX3076R Turbo',
      'BC Coilovers',
      'Brembo BBK',
      'Tomei Ti Exhaust',
      'AEM Infinity',
    ],
  },
];

export const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
