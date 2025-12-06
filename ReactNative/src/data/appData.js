export const posts = [
  {
    id: 1,
    title: 'New Turbo Install Complete',
    author: '@boost_junkie',
    time: '2h ago',
    description: 'Finally got the GT35R mounted. Making 450whp on pump gas!',
    category: 'builds',
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ['turbo', 'build', 'power'],
    gradient: ['#007AFF', '#0051D5'],
  },
  {
    id: 2,
    title: 'Sunday Canyon Run',
    author: '@mountain_carver',
    time: '4h ago',
    description: 'Perfect weather for some twisties. Who is joining next weekend?',
    category: 'meets',
    likes: 189,
    comments: 67,
    shares: 23,
    tags: ['canyon', 'drive', 'weekend'],
    gradient: ['#34C759', '#248A3D'],
  },
  {
    id: 3,
    title: 'Track Day Results',
    author: '@lap_timer',
    time: '6h ago',
    description: 'New personal best at Laguna Seca - 1:42.3! The new suspension setup is working great.',
    category: 'racing',
    likes: 312,
    comments: 89,
    shares: 34,
    tags: ['track', 'racing', 'pb'],
    gradient: ['#FF3B30', '#D70015'],
  },
  {
    id: 4,
    title: 'Sunset Photoshoot',
    author: '@auto_lens',
    time: '8h ago',
    description: 'Golden hour never disappoints. Shot on Sony A7IV.',
    category: 'photos',
    likes: 567,
    comments: 123,
    shares: 89,
    tags: ['photo', 'sunset', 'automotive'],
    gradient: ['#FF9500', '#CC7700'],
  },
];

export const conversations = [
  {
    id: 1,
    name: 'Cars & Coffee LA',
    type: 'group',
    members: 24,
    lastMessage: 'See everyone at 7am!',
    time: '10m',
    unread: 3,
  },
  {
    id: 2,
    name: 'Mike Thompson',
    type: 'dm',
    lastMessage: 'The parts arrived today',
    time: '1h',
    unread: 0,
  },
  {
    id: 3,
    name: 'Track Day Crew',
    type: 'group',
    members: 12,
    lastMessage: 'Next session is at 2pm',
    time: '2h',
    unread: 5,
  },
  {
    id: 4,
    name: 'Sarah Chen',
    type: 'dm',
    lastMessage: 'Those photos look amazing!',
    time: '3h',
    unread: 1,
  },
];

export const routes = [
  {
    id: 1,
    name: 'Angeles Crest Highway',
    rating: 4.8,
    reviews: 342,
    description: 'Iconic mountain road with sweeping turns and elevation changes.',
    distance: '66 miles',
    duration: '2h 15m',
    elevation: '+5,200 ft',
    difficulty: 'Intermediate',
    waypoints: ['La Canada', 'Mt Wilson', 'Wrightwood'],
  },
  {
    id: 2,
    name: 'Pacific Coast Highway',
    rating: 4.9,
    reviews: 567,
    description: 'Stunning coastal views with ocean on one side and cliffs on the other.',
    distance: '120 miles',
    duration: '3h 30m',
    elevation: '+1,800 ft',
    difficulty: 'Easy',
    waypoints: ['Malibu', 'Santa Barbara', 'Big Sur'],
  },
  {
    id: 3,
    name: 'Mulholland Drive',
    rating: 4.6,
    reviews: 234,
    description: 'Famous Hollywood hills road with city views and tight corners.',
    distance: '21 miles',
    duration: '45m',
    elevation: '+2,100 ft',
    difficulty: 'Advanced',
    waypoints: ['Hollywood', 'Calabasas'],
  },
];

export const events = [
  {
    id: 1,
    title: 'Sunset Canyon Run',
    organizer: 'SoCal Drivers Club',
    description: 'Join us for an evening cruise through the canyons.',
    location: 'Angeles Crest Highway',
    date: '2024-12-07',
    time: '5:00 PM',
    type: 'Drive',
    difficulty: 'Intermediate',
    attendees: 47,
    maxAttendees: 60,
  },
  {
    id: 2,
    title: 'Track Day at Willow Springs',
    organizer: 'Speed Ventures',
    description: 'Open track day for all skill levels.',
    location: 'Willow Springs Raceway',
    date: '2024-12-14',
    time: '7:00 AM',
    type: 'Track',
    difficulty: 'All Levels',
    attendees: 89,
    maxAttendees: 100,
  },
  {
    id: 3,
    title: 'Cars & Coffee Malibu',
    organizer: 'Malibu Auto Club',
    description: 'Monthly car meet with ocean views.',
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
      'Garrett GTX3076R Turbo Kit',
      'BC Racing Coilovers',
      'Brembo GT Big Brake Kit',
      'Tomei Expreme Ti Exhaust',
      'AEM Infinity ECU',
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
