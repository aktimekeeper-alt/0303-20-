/**
 * BURNOUT APP - Type Definitions
 * These JSDoc types provide TypeScript-like type safety in JavaScript
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} [displayName]
 * @property {string} [avatar]
 * @property {string} [bio]
 * @property {string} [location]
 * @property {Car} [car]
 * @property {string[]} [interests]
 * @property {UserStats} stats
 * @property {Mod[]} [mods]
 * @property {boolean} [isVerified]
 * @property {number} [age]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Car
 * @property {string} make
 * @property {string} model
 * @property {number} year
 * @property {number} [horsePower]
 * @property {number} [topSpeed]
 * @property {string} [color]
 * @property {string[]} [photos]
 */

/**
 * @typedef {Object} Mod
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} [brand]
 * @property {string} [installedDate]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} UserStats
 * @property {number} posts
 * @property {number} followers
 * @property {number} following
 * @property {number} [meetsAttended]
 * @property {number} [trackDays]
 * @property {number} [routesShared]
 */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} authorId
 * @property {string} author
 * @property {string} [authorAvatar]
 * @property {'post'|'spark'|'autobit'} type
 * @property {string} [title]
 * @property {string} content
 * @property {string[]} [images]
 * @property {string} [video]
 * @property {string} category
 * @property {number} likes
 * @property {number} comments
 * @property {number} shares
 * @property {boolean} [isLiked]
 * @property {boolean} [isSaved]
 * @property {string} createdAt
 * @property {string[]} [gradient]
 */

/**
 * @typedef {Object} Spark
 * @property {string} id
 * @property {string} authorId
 * @property {string} author
 * @property {string} content
 * @property {string} [media]
 * @property {number} likes
 * @property {number} replies
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Autobit
 * @property {string} id
 * @property {string} authorId
 * @property {string} author
 * @property {string} title
 * @property {string} content
 * @property {string} [coverImage]
 * @property {string} category
 * @property {number} readTime
 * @property {number} likes
 * @property {number} comments
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Chat
 * @property {string} id
 * @property {string} name
 * @property {string} [avatar]
 * @property {'direct'|'group'} type
 * @property {string[]} memberIds
 * @property {ChatMember[]} members
 * @property {Message} [lastMessage]
 * @property {number} unreadCount
 * @property {boolean} [locationSharingEnabled]
 * @property {SubChat[]} [subChats]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} ChatMember
 * @property {string} id
 * @property {string} username
 * @property {string} [avatar]
 * @property {boolean} [isOnline]
 * @property {boolean} [isSharingLocation]
 */

/**
 * @typedef {Object} SubChat
 * @property {string} id
 * @property {string} name
 * @property {string} parentChatId
 * @property {string[]} memberIds
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} chatId
 * @property {string} senderId
 * @property {string} senderName
 * @property {'text'|'image'|'video'|'voice'|'location'} type
 * @property {string} content
 * @property {string} [mediaUrl]
 * @property {Location} [location]
 * @property {string} createdAt
 * @property {boolean} [isRead]
 */

/**
 * @typedef {Object} Location
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} [heading]
 * @property {number} [speed]
 * @property {number} [accuracy]
 * @property {string} [timestamp]
 */

/**
 * @typedef {Object} UserLocation
 * @property {string} userId
 * @property {string} username
 * @property {string} [avatar]
 * @property {Location} location
 * @property {boolean} [isDrifting]
 * @property {string} [carModel]
 */

/**
 * @typedef {Object} Route
 * @property {string} id
 * @property {string} authorId
 * @property {string} author
 * @property {string} name
 * @property {string} [description]
 * @property {Location[]} waypoints
 * @property {number} distance
 * @property {number} duration
 * @property {number} [elevationGain]
 * @property {string} [difficulty]
 * @property {number} likes
 * @property {number} saves
 * @property {string[]} [photos]
 * @property {boolean} [isPublic]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [coverImage]
 * @property {string} organizerId
 * @property {string} organizer
 * @property {'meet'|'cruise'|'trackday'|'show'|'other'} type
 * @property {Location} location
 * @property {string} address
 * @property {string} startDate
 * @property {string} [endDate]
 * @property {number} attendeeCount
 * @property {number} [maxAttendees]
 * @property {boolean} [isAttending]
 * @property {string[]} [tags]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Group
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} [avatar]
 * @property {string} [coverImage]
 * @property {string} ownerId
 * @property {string[]} moderatorIds
 * @property {number} memberCount
 * @property {boolean} [isPrivate]
 * @property {string[]} [tags]
 * @property {boolean} [isMember]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} ForumThread
 * @property {string} id
 * @property {string} groupId
 * @property {string} authorId
 * @property {string} author
 * @property {string} title
 * @property {string} content
 * @property {number} replyCount
 * @property {number} views
 * @property {boolean} [isPinned]
 * @property {boolean} [isLocked]
 * @property {string} createdAt
 * @property {string} [lastReplyAt]
 */

/**
 * @typedef {Object} MusicTrack
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 * @property {string} [album]
 * @property {string} [albumArt]
 * @property {number} duration
 * @property {string} [uri]
 * @property {string} addedBy
 * @property {string} addedAt
 */

/**
 * @typedef {Object} MusicQueue
 * @property {string} groupId
 * @property {MusicTrack[]} tracks
 * @property {number} currentIndex
 * @property {boolean} isPlaying
 * @property {number} position
 */

/**
 * @typedef {Object} ProfileCard
 * @property {string} id
 * @property {string} oderId
 * @property {string} qrCode
 * @property {string} nfcId
 * @property {User} user
 * @property {string} [customDesign]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {'like'|'comment'|'follow'|'mention'|'event'|'chat'|'group'} type
 * @property {string} title
 * @property {string} body
 * @property {Object} [data]
 * @property {boolean} isRead
 * @property {string} createdAt
 */

// Export empty object to make this a module
export {};
