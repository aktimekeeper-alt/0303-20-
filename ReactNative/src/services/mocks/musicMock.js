/**
 * BURNOUT APP - Music Mock Data
 *
 * Mock data for shared music queue and playback.
 */

export const mockMusicTracks = [
  {
    id: 'track_1',
    title: 'Tokyo Drift',
    artist: 'Teriyaki Boyz',
    album: 'The Fast and the Furious: Tokyo Drift',
    duration: 276,
    artworkUrl: 'https://example.com/tokyo-drift.jpg',
    previewUrl: null,
    source: 'spotify',
    sourceId: 'spotify:track:abc123',
  },
  {
    id: 'track_2',
    title: 'See You Again',
    artist: 'Wiz Khalifa ft. Charlie Puth',
    album: 'Furious 7 Soundtrack',
    duration: 237,
    artworkUrl: 'https://example.com/see-you-again.jpg',
    previewUrl: null,
    source: 'spotify',
    sourceId: 'spotify:track:def456',
  },
  {
    id: 'track_3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    artworkUrl: 'https://example.com/blinding-lights.jpg',
    previewUrl: null,
    source: 'apple_music',
    sourceId: 'apple:track:ghi789',
  },
  {
    id: 'track_4',
    title: 'Nightcall',
    artist: 'Kavinsky',
    album: 'OutRun',
    duration: 258,
    artworkUrl: 'https://example.com/nightcall.jpg',
    previewUrl: null,
    source: 'spotify',
    sourceId: 'spotify:track:jkl012',
  },
  {
    id: 'track_5',
    title: 'Gas Pedal',
    artist: 'Sage The Gemini',
    album: 'Remember Me',
    duration: 195,
    artworkUrl: 'https://example.com/gas-pedal.jpg',
    previewUrl: null,
    source: 'spotify',
    sourceId: 'spotify:track:mno345',
  },
];

export const mockQueueItems = [
  {
    id: 'qi_1',
    track: mockMusicTracks[0],
    addedBy: { id: '1', username: '@drift_king' },
    addedAt: '2024-01-15T20:30:00Z',
    votes: 5,
    hasVoted: true,
  },
  {
    id: 'qi_2',
    track: mockMusicTracks[3],
    addedBy: { id: '2', username: '@boost_junkie' },
    addedAt: '2024-01-15T20:32:00Z',
    votes: 3,
    hasVoted: false,
  },
  {
    id: 'qi_3',
    track: mockMusicTracks[1],
    addedBy: { id: '3', username: '@track_queen' },
    addedAt: '2024-01-15T20:35:00Z',
    votes: 2,
    hasVoted: false,
  },
];

export const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
