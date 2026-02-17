/**
 * BURNOUT APP - Map & Location Service Mock Data
 */

// Mock user locations (for group location sharing)
export const mockUserLocations = [
  {
    userId: '1',
    username: '@drift_king',
    avatar: null,
    carModel: '2019 Nissan 370Z',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      heading: 45,
      speed: 0,
      accuracy: 10,
      timestamp: new Date().toISOString(),
    },
    isDrifting: false,
  },
  {
    userId: '2',
    username: '@boost_junkie',
    avatar: null,
    carModel: '2020 Toyota Supra',
    location: {
      latitude: 34.0532,
      longitude: -118.2447,
      heading: 90,
      speed: 35,
      accuracy: 8,
      timestamp: new Date().toISOString(),
    },
    isDrifting: false,
  },
  {
    userId: '4',
    username: '@canyon_runner',
    avatar: null,
    carModel: '2022 Porsche 718',
    location: {
      latitude: 34.0542,
      longitude: -118.2457,
      heading: 180,
      speed: 45,
      accuracy: 5,
      timestamp: new Date().toISOString(),
    },
    isDrifting: true, // Detected drift
  },
];

// Mock nearby events/meets
export const mockNearbyEvents = [
  {
    id: 'event1',
    title: 'Sunday Morning Meet',
    type: 'meet',
    location: {
      latitude: 34.0600,
      longitude: -118.2500,
    },
    address: 'Cars & Coffee LA, Los Angeles, CA',
    startDate: '2024-01-21T07:00:00Z',
    attendeeCount: 45,
  },
  {
    id: 'event2',
    title: 'Track Day - Streets of Willow',
    type: 'trackday',
    location: {
      latitude: 34.8500,
      longitude: -118.3800,
    },
    address: 'Streets of Willow, Rosamond, CA',
    startDate: '2024-01-20T08:00:00Z',
    attendeeCount: 28,
  },
  {
    id: 'event3',
    title: 'JDM Night Meet',
    type: 'meet',
    location: {
      latitude: 34.0400,
      longitude: -118.2600,
    },
    address: 'Downtown LA, Los Angeles, CA',
    startDate: '2024-01-19T20:00:00Z',
    attendeeCount: 120,
  },
];

export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
