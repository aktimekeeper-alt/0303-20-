/**
 * BURNOUT APP - Feed Service Mock Data
 */

export const mockPosts = [
  {
    id: '1',
    authorId: '2',
    author: '@boost_junkie',
    authorAvatar: null,
    type: 'post',
    title: 'GT35R Finally Mounted!',
    content: '450whp on pump gas. Tuning session next week. This build has been 2 years in the making and I cannot wait to see what numbers we put down on E85.',
    images: [],
    category: 'builds',
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-01-15T10:30:00Z',
    gradient: ['#FF4500', '#FF6B35'],
  },
  {
    id: '2',
    authorId: '1',
    author: '@drift_king',
    authorAvatar: null,
    type: 'post',
    title: 'Track Day Vibes',
    content: 'Perfect weather for some sideways action. Managed to clock my best lap time yet - 1:42.3 on the main circuit.',
    images: [],
    category: 'events',
    likes: 567,
    comments: 89,
    shares: 34,
    isLiked: true,
    isSaved: false,
    createdAt: '2024-01-14T16:45:00Z',
    gradient: ['#007AFF', '#0051D5'],
  },
  {
    id: '3',
    authorId: '3',
    author: '@track_queen',
    authorAvatar: null,
    type: 'post',
    title: 'New Wheels Day!',
    content: 'Finally got the TE37s mounted. 18x9.5 +22 all around with 265/35 tires. The fitment is perfect!',
    images: [],
    category: 'builds',
    likes: 892,
    comments: 156,
    shares: 67,
    isLiked: false,
    isSaved: true,
    createdAt: '2024-01-14T09:15:00Z',
    gradient: ['#34C759', '#248A3D'],
  },
  {
    id: '4',
    authorId: '4',
    author: '@canyon_runner',
    authorAvatar: null,
    type: 'post',
    title: 'Mountain Run',
    content: 'Nothing beats Angeles Crest at sunrise. Empty roads, perfect temperature, and these views. 50 miles of pure driving bliss.',
    images: [],
    category: 'routes',
    likes: 445,
    comments: 67,
    shares: 23,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-01-13T07:30:00Z',
    gradient: ['#FF9500', '#CC7700'],
  },
];

export const mockSparks = [
  {
    id: 's1',
    authorId: '1',
    author: '@drift_king',
    content: 'Oil change day. 5w30 gang where you at?',
    media: null,
    likes: 45,
    replies: 12,
    createdAt: '2024-01-15T12:00:00Z',
  },
  {
    id: 's2',
    authorId: '2',
    author: '@boost_junkie',
    content: 'Boost weather is here! Cold air = more power',
    media: null,
    likes: 89,
    replies: 23,
    createdAt: '2024-01-15T08:30:00Z',
  },
  {
    id: 's3',
    authorId: '3',
    author: '@track_queen',
    content: 'Track day tomorrow. Who else is going to Laguna Seca?',
    media: null,
    likes: 156,
    replies: 45,
    createdAt: '2024-01-14T20:00:00Z',
  },
];

export const mockAutobits = [
  {
    id: 'a1',
    authorId: '2',
    author: '@boost_junkie',
    title: 'The Complete Guide to E85 Tuning',
    content: `E85 has become the go-to fuel for performance enthusiasts, and for good reason. This comprehensive guide covers everything you need to know...

## What is E85?

E85 is a blend of 85% ethanol and 15% gasoline. The high ethanol content provides several benefits for performance applications:

- Higher octane rating (100-105)
- Cooler intake temperatures
- More aggressive timing possible

## Making the Switch

Before you can run E85, you'll need to make some modifications...`,
    coverImage: null,
    category: 'guides',
    readTime: 8,
    likes: 234,
    comments: 45,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'a2',
    authorId: '1',
    author: '@drift_king',
    title: 'Mastering Weight Transfer: A Drifter\'s Guide',
    content: `Understanding weight transfer is essential for any aspiring drifter. In this article, we'll break down the physics and techniques...`,
    coverImage: null,
    category: 'tutorials',
    readTime: 12,
    likes: 567,
    comments: 89,
    createdAt: '2024-01-08T00:00:00Z',
  },
];

export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
