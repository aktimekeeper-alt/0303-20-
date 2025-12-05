// Test Data for Burnout App Demos

// Posts Feed Data
const posts = [
    {
        id: 1,
        title: "Finally installed the turbo kit! 🔥",
        author: "@boost_addict",
        time: "2h ago",
        description: "After 6 months of saving, the Garrett G30-900 is finally on. First pulls were insane - hitting 18psi on pump gas. Can't wait for dyno day!",
        gradient: "linear-gradient(135deg, rgba(255, 59, 48, 0.4), rgba(255, 149, 0, 0.4))",
        tags: ["Turbo", "Build", "GTR"],
        likes: 342,
        comments: 89,
        shares: 23,
        category: "builds"
    },
    {
        id: 2,
        title: "Sunset Canyon Run - THIS Weekend!",
        author: "@socal_meets",
        time: "4h ago",
        description: "Join us Saturday 7AM at Angeles Crest. Classic route, epic views. All cars welcome! RSVP in comments. ☀️🏔️",
        gradient: "linear-gradient(135deg, rgba(0, 122, 255, 0.4), rgba(52, 199, 89, 0.4))",
        tags: ["Meet", "SoCal", "Canyon"],
        likes: 567,
        comments: 143,
        shares: 91,
        category: "meets"
    },
    {
        id: 3,
        title: "Track day results - New PB! ⏱️",
        author: "@circuit_king",
        time: "6h ago",
        description: "Buttonwillow yesterday. New suspension setup paid off - dropped 3 seconds off my best lap. 1:58.4 on street tires!",
        gradient: "linear-gradient(135deg, rgba(175, 82, 222, 0.4), rgba(255, 45, 85, 0.4))",
        tags: ["Track", "Racing", "Time Attack"],
        likes: 891,
        comments: 167,
        shares: 45,
        category: "racing"
    },
    {
        id: 4,
        title: "Carbon fiber hood install 💪",
        author: "@weight_savings",
        time: "8h ago",
        description: "Just installed the Seibon hood. Saved 35lbs off the front end. The fitment is perfect and the weave pattern is gorgeous!",
        gradient: "linear-gradient(135deg, rgba(88, 86, 214, 0.4), rgba(52, 199, 89, 0.4))",
        tags: ["Carbon", "Weight Reduction", "Mod"],
        likes: 234,
        comments: 56,
        shares: 12,
        category: "builds"
    },
    {
        id: 5,
        title: "Best sushi spot after the meet 🍣",
        author: "@jdm_life",
        time: "10h ago",
        description: "If you were at Irvine Cars & Coffee this morning, check out Hana Sushi on Main. Perfect post-meet spot!",
        gradient: "linear-gradient(135deg, rgba(255, 204, 0, 0.4), rgba(255, 149, 0, 0.4))",
        tags: ["Food", "Cars & Coffee", "Lifestyle"],
        likes: 445,
        comments: 78,
        shares: 34,
        category: "meets"
    },
    {
        id: 6,
        title: "E85 conversion complete ⛽",
        author: "@ethanol_enthusiast",
        time: "12h ago",
        description: "Full E85 setup done - flex fuel sensor, bigger injectors, and custom tune. Running 24psi now with zero knock. Power gains are REAL.",
        gradient: "linear-gradient(135deg, rgba(0, 122, 255, 0.4), rgba(175, 82, 222, 0.4))",
        tags: ["E85", "Tuning", "Power"],
        likes: 723,
        comments: 134,
        shares: 67,
        category: "builds"
    }
];

// User Profiles
const profiles = [
    {
        id: 1,
        username: "@drift_king",
        name: "Marcus Chen",
        carModel: "2023 Nissan GT-R",
        year: "2023",
        horsePower: 650,
        topSpeed: 195,
        torque: 580,
        zeroToSixty: 2.9,
        mods: [
            "Garrett G30-900 Turbo Kit",
            "Carbon Fiber Body Kit",
            "KW V3 Coilover Suspension",
            "Akrapovic Titanium Exhaust",
            "Brembo GT-R Big Brake Kit",
            "Ecutek Custom Tune"
        ],
        stats: {
            followers: 2847,
            following: 453,
            posts: 127,
            meetsAttended: 34,
            tracDays: 12
        },
        bio: "Weekend warrior | Track enthusiast | E85 converted"
    },
    {
        id: 2,
        username: "@supra_legend",
        name: "Sarah Rodriguez",
        carModel: "2021 Toyota GR Supra",
        year: "2021",
        horsePower: 520,
        topSpeed: 175,
        torque: 495,
        zeroToSixty: 3.2,
        mods: [
            "Pure Turbo 800 Upgrade",
            "Downpipe & Catless Midpipe",
            "BC Racing Coilovers",
            "HKS Blow-Off Valve",
            "Bootmod3 Stage 2+ Tune"
        ],
        stats: {
            followers: 1923,
            following: 567,
            posts: 89,
            meetsAttended: 28,
            trackDays: 8
        },
        bio: "B58 powered dreams | Canyon carver"
    }
];

// Events Data
const events = [
    {
        id: 1,
        title: "Sunset Canyon Run",
        location: "Angeles Crest Highway",
        date: "2024-12-07",
        time: "07:00 AM",
        attendees: 47,
        maxAttendees: 50,
        organizer: "@socal_meets",
        description: "Classic canyon run through Angeles Crest. Meet at the Newcombs Ranch parking lot. All skill levels welcome!",
        type: "Drive",
        distance: "45.2 miles",
        duration: "2.5 hours",
        difficulty: "Intermediate"
    },
    {
        id: 2,
        title: "Track Day - Buttonwillow",
        location: "Buttonwillow Raceway",
        date: "2024-12-10",
        time: "08:00 AM",
        attendees: 32,
        maxAttendees: 40,
        organizer: "@speedventures",
        description: "Full track day with timed sessions. Tech inspection required. Helmets mandatory (Snell 2015 or newer).",
        type: "Track",
        laps: "Unlimited",
        duration: "Full day",
        difficulty: "Advanced"
    },
    {
        id: 3,
        title: "Cars & Coffee - Irvine",
        location: "Irvine Spectrum",
        date: "2024-12-14",
        time: "08:00 AM",
        attendees: 234,
        maxAttendees: null,
        organizer: "@irvine_c&c",
        description: "Monthly C&C meet. All cars welcome - exotics, JDM, muscle, euro. Free coffee and good vibes!",
        type: "Show",
        duration: "3 hours",
        difficulty: "All levels"
    },
    {
        id: 4,
        title: "Dyno Day & BBQ",
        location: "SoCal Speed Shop",
        date: "2024-12-15",
        time: "10:00 AM",
        attendees: 28,
        maxAttendees: 35,
        organizer: "@socal_speed",
        description: "Dyno pulls $75/run. BBQ lunch included. Door prizes and giveaways. Bring your built ride!",
        type: "Dyno",
        duration: "All day",
        difficulty: "All levels"
    },
    {
        id: 5,
        title: "Night Photoshoot Meet",
        location: "Downtown LA Arts District",
        date: "2024-12-16",
        time: "08:00 PM",
        attendees: 19,
        maxAttendees: 25,
        organizer: "@automotive_photos",
        description: "Professional photographer on site. Light painting, long exposures, creative shots. Bring your cleanest build!",
        type: "Photo",
        duration: "2 hours",
        difficulty: "All levels"
    }
];

// Chat Conversations
const conversations = [
    {
        id: 1,
        name: "Weekend Warriors",
        lastMessage: "Marcus: See you guys Saturday! 🏁",
        time: "2m ago",
        unread: 3,
        members: 12,
        avatar: "👥",
        type: "group"
    },
    {
        id: 2,
        name: "Sarah Rodriguez",
        lastMessage: "That dyno run was insane! 📈",
        time: "15m ago",
        unread: 1,
        avatar: "🏎️",
        type: "dm"
    },
    {
        id: 3,
        name: "Track Day Crew",
        lastMessage: "Alex: Buttonwillow confirmed for Dec 10",
        time: "1h ago",
        unread: 0,
        members: 8,
        avatar: "🏁",
        type: "group"
    },
    {
        id: 4,
        name: "SoCal Tuners",
        lastMessage: "Jake: Anyone know a good alignment shop?",
        time: "2h ago",
        unread: 5,
        members: 47,
        avatar: "🔧",
        type: "group"
    },
    {
        id: 5,
        name: "Mike Torres",
        lastMessage: "Thanks for the E85 tips man!",
        time: "3h ago",
        unread: 0,
        avatar: "⛽",
        type: "dm"
    },
    {
        id: 6,
        name: "GTR Owners",
        lastMessage: "Tom: New exhaust sounds amazing 🔊",
        time: "5h ago",
        unread: 0,
        members: 23,
        avatar: "🚗",
        type: "group"
    }
];

// Routes Data
const routes = [
    {
        id: 1,
        name: "Angeles Crest Classic",
        distance: "45.2 mi",
        duration: "1h 35m",
        elevation: "4,842 ft",
        difficulty: "Intermediate",
        rating: 4.8,
        reviews: 234,
        description: "The legendary Angeles Crest Highway. Sweeping corners, amazing views, and perfect pavement.",
        waypoints: [
            "La Cañada Flintridge",
            "Newcomb's Ranch",
            "Wrightwood"
        ]
    },
    {
        id: 2,
        name: "Pacific Coast Highway",
        distance: "78.3 mi",
        duration: "2h 15m",
        elevation: "1,234 ft",
        difficulty: "Easy",
        rating: 4.9,
        reviews: 567,
        description: "Scenic coastal drive with ocean views. Perfect for a relaxed weekend cruise.",
        waypoints: [
            "Santa Monica",
            "Malibu",
            "Ventura"
        ]
    },
    {
        id: 3,
        name: "Palomar Mountain",
        distance: "52.7 mi",
        duration: "1h 48m",
        elevation: "5,558 ft",
        difficulty: "Advanced",
        rating: 4.7,
        reviews: 189,
        description: "Technical mountain road with 21 miles of tight switchbacks. Not for beginners!",
        waypoints: [
            "Escondido",
            "Palomar Observatory",
            "Lake Henshaw"
        ]
    }
];

// News/Articles
const news = [
    {
        id: 1,
        title: "New Nissan Z NISMO Announced",
        source: "AutoWeek",
        time: "3h ago",
        image: "gradient1",
        excerpt: "Nissan reveals track-focused Z with 420hp twin-turbo V6, upgraded suspension, and aggressive aero package.",
        category: "News"
    },
    {
        id: 2,
        title: "Best Turbo Kits for GR Supra",
        source: "Speed Academy",
        time: "6h ago",
        image: "gradient2",
        excerpt: "We test 5 popular turbo upgrades for the B58 engine. See which one made the most power and best value.",
        category: "Tech"
    },
    {
        id: 3,
        title: "Formula Drift Finals Recap",
        source: "Drift HQ",
        time: "1d ago",
        image: "gradient3",
        excerpt: "Fredric Aasbo takes the championship with stunning final battle. Full highlights and interview inside.",
        category: "Racing"
    }
];
