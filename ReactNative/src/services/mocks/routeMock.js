/**
 * BURNOUT APP - Route Service Mock Data
 */

export const mockRoutes = [
  {
    id: 'route1',
    authorId: '1',
    author: '@drift_king',
    name: 'Angeles Crest Highway',
    description: 'The best driving road in Southern California. 66 miles of twisty mountain roads with amazing views.',
    waypoints: [
      { latitude: 34.2012, longitude: -118.1737 },
      { latitude: 34.2112, longitude: -118.1837 },
      { latitude: 34.2212, longitude: -118.1937 },
      { latitude: 34.3412, longitude: -117.9737 },
    ],
    distance: 66,
    duration: 90,
    elevationGain: 4500,
    difficulty: 'advanced',
    likes: 234,
    saves: 89,
    photos: [],
    isPublic: true,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'route2',
    authorId: '4',
    author: '@canyon_runner',
    name: 'Mulholland Drive Loop',
    description: 'Classic LA canyon cruise. Best at sunset.',
    waypoints: [
      { latitude: 34.1278, longitude: -118.3814 },
      { latitude: 34.1178, longitude: -118.3914 },
      { latitude: 34.1078, longitude: -118.4014 },
    ],
    distance: 25,
    duration: 45,
    elevationGain: 1200,
    difficulty: 'intermediate',
    likes: 156,
    saves: 67,
    photos: [],
    isPublic: true,
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'route3',
    authorId: '2',
    author: '@boost_junkie',
    name: 'PCH Coastal Run',
    description: 'Pacific Coast Highway from Santa Monica to Malibu. Ocean views the entire way.',
    waypoints: [
      { latitude: 34.0195, longitude: -118.4912 },
      { latitude: 34.0295, longitude: -118.5012 },
      { latitude: 34.0395, longitude: -118.6012 },
    ],
    distance: 30,
    duration: 50,
    elevationGain: 200,
    difficulty: 'beginner',
    likes: 445,
    saves: 234,
    photos: [],
    isPublic: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
