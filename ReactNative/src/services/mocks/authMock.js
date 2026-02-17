/**
 * BURNOUT APP - Auth Service Mock Data
 */

export const mockUsers = [
  {
    id: '1',
    username: '@drift_king',
    email: 'drift@example.com',
    displayName: 'Drift King',
    avatar: null,
    bio: 'Living life sideways. 370Z enthusiast.',
    location: 'Los Angeles, CA',
    age: 24,
    car: {
      make: 'Nissan',
      model: '370Z',
      year: 2019,
      horsePower: 420,
      topSpeed: 165,
      color: 'Magnetic Black',
    },
    interests: ['jdm', 'drifting', 'tuning', 'racing'],
    stats: {
      posts: 47,
      followers: 2340,
      following: 156,
      meetsAttended: 23,
      trackDays: 8,
      routesShared: 12,
    },
    mods: [
      { id: '1', name: 'GTX3076R Turbo', category: 'Engine' },
      { id: '2', name: 'BC Coilovers', category: 'Suspension' },
      { id: '3', name: 'Brembo BBK', category: 'Brakes' },
      { id: '4', name: 'Tomei Ti Exhaust', category: 'Exhaust' },
      { id: '5', name: 'AEM Infinity', category: 'Electronics' },
    ],
    isVerified: true,
    createdAt: '2023-06-15T00:00:00Z',
  },
  {
    id: '2',
    username: '@boost_junkie',
    email: 'boost@example.com',
    displayName: 'Alex Chen',
    avatar: null,
    bio: 'Boost is life. Building the perfect street car.',
    location: 'San Francisco, CA',
    age: 28,
    car: {
      make: 'Toyota',
      model: 'Supra MK5',
      year: 2020,
      horsePower: 500,
      topSpeed: 175,
      color: 'Renaissance Red',
    },
    interests: ['tuning', 'euro', 'racing'],
    stats: {
      posts: 89,
      followers: 12400,
      following: 234,
      meetsAttended: 45,
      trackDays: 15,
      routesShared: 8,
    },
    mods: [
      { id: '1', name: 'Pure Turbos Stage 2', category: 'Engine' },
      { id: '2', name: 'KW V3 Coilovers', category: 'Suspension' },
    ],
    isVerified: true,
    createdAt: '2023-03-20T00:00:00Z',
  },
];

export const mockCurrentUser = mockUsers[0];

// Simulated delay for realistic API feel
export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
