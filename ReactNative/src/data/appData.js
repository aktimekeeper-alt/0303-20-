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
    name: 'Angeles Crest',
    rating: 4.8,
    reviews: 342,
    description: '66 miles of mountain twisties. Classic SoCal run.',
    distance: '66 mi',
    duration: '2h 15m',
    elevation: '+5,200 ft',
    difficulty: 'Intermediate',
    waypoints: ['La Canada', 'Mt Wilson', 'Wrightwood'],
  },
  {
    id: 2,
    name: 'PCH',
    rating: 4.9,
    reviews: 567,
    description: 'Coastal views. Ocean and cliffs.',
    distance: '120 mi',
    duration: '3h 30m',
    elevation: '+1,800 ft',
    difficulty: 'Easy',
    waypoints: ['Malibu', 'Santa Barbara', 'Big Sur'],
  },
  {
    id: 3,
    name: 'Mulholland',
    rating: 4.6,
    reviews: 234,
    description: 'Hollywood hills. City views, tight corners.',
    distance: '21 mi',
    duration: '45m',
    elevation: '+2,100 ft',
    difficulty: 'Advanced',
    waypoints: ['Hollywood', 'Calabasas'],
  },
];

export const events = [
  {
    id: 1,
    title: 'Sunset Run',
    organizer: 'SoCal Drivers',
    description: 'Evening cruise through the canyons.',
    location: 'Angeles Crest',
    date: '2024-12-07',
    time: '5:00 PM',
    type: 'Drive',
    difficulty: 'Intermediate',
    attendees: 47,
    maxAttendees: 60,
  },
  {
    id: 2,
    title: 'Willow Springs TD',
    organizer: 'Speed Ventures',
    description: 'Open track. All levels.',
    location: 'Willow Springs',
    date: '2024-12-14',
    time: '7:00 AM',
    type: 'Track',
    difficulty: 'All Levels',
    attendees: 89,
    maxAttendees: 100,
  },
  {
    id: 3,
    title: 'C&C Malibu',
    organizer: 'Malibu Auto Club',
    description: 'Monthly meet with ocean views.',
    location: 'Malibu Country Mart',
    date: '2024-12-08',
    time: '8:00 AM',
    type: 'Show',
    difficulty: 'All Welcome',
    attendees: 156,
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
