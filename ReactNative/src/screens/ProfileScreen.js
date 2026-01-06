import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';
import Header from '../components/Header';
import ContentCard from '../components/ContentCard';
import { profiles, formatNumber, myPosts, likedPosts, savedPosts } from '../data/appData';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles/theme';

const SettingsIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </Svg>
);

const ToolIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color || "rgba(0, 122, 255, 0.8)"}>
    <Path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </Svg>
);

const QRCode = () => (
  <Svg viewBox="0 0 100 100" width={100} height={100} fill="#000">
    <Rect x="10" y="10" width="20" height="20" />
    <Rect x="70" y="10" width="20" height="20" />
    <Rect x="10" y="70" width="20" height="20" />
    <Rect x="15" y="15" width="10" height="10" fill="white" />
    <Rect x="75" y="15" width="10" height="10" fill="white" />
    <Rect x="15" y="75" width="10" height="10" fill="white" />
    <Rect x="18" y="18" width="4" height="4" />
    <Rect x="78" y="18" width="4" height="4" />
    <Rect x="18" y="78" width="4" height="4" />
    <Rect x="35" y="10" width="5" height="5" />
    <Rect x="45" y="10" width="5" height="5" />
    <Rect x="55" y="10" width="5" height="5" />
    <Rect x="35" y="40" width="5" height="5" />
    <Rect x="45" y="45" width="5" height="5" />
    <Rect x="55" y="40" width="5" height="5" />
    <Rect x="65" y="55" width="5" height="5" />
    <Rect x="75" y="55" width="5" height="5" />
    <Rect x="35" y="70" width="5" height="5" />
    <Rect x="55" y="70" width="5" height="5" />
  </Svg>
);

const PostsIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
  </Svg>
);

const HeartIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const BookmarkIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </Svg>
);

const StatIcon = ({ type, colors }) => {
  const iconPaths = {
    posts: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
    followers: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    meets: "M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z",
    trackDays: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  };
  const iconColors = {
    posts: colors.primary,
    followers: colors.secondary,
    meets: colors.danger,
    trackDays: colors.purple,
  };
  return (
    <Svg viewBox="0 0 24 24" width={20} height={20} fill={iconColors[type]}>
      <Path d={iconPaths[type]} />
    </Svg>
  );
};

const tabs = [
  { key: 'posts', label: 'My Posts', icon: PostsIcon },
  { key: 'liked', label: 'Liked', icon: HeartIcon },
  { key: 'saved', label: 'Saved', icon: BookmarkIcon },
];

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const tabAnimation = useRef(new Animated.Value(0)).current;
  const profile = profiles[0];

  // Get car info (handle both flat and nested structure)
  const carModel = profile.carModel || (profile.car ? `${profile.car.year} ${profile.car.make} ${profile.car.model}` : 'No Car');
  const carYear = profile.year || (profile.car ? profile.car.year : '');
  const horsePower = profile.horsePower || (profile.car ? profile.car.horsePower : 0);
  const topSpeed = profile.topSpeed || (profile.car ? profile.car.topSpeed : 0);
  const mods = profile.mods || [];

  const stats = [
    { key: 'posts', value: profile.stats.posts, label: 'Posts', color: `${colors.primary}33`, link: 'Home' },
    { key: 'followers', value: formatNumber(profile.stats.followers), label: 'Followers', color: `${colors.secondary}33`, link: 'Chat' },
    { key: 'meets', value: profile.stats.meetsAttended, label: 'Meets', color: 'rgba(255, 59, 48, 0.2)', link: 'Events' },
    { key: 'trackDays', value: profile.stats.trackDays || 0, label: 'Track Days', color: 'rgba(175, 82, 222, 0.2)', link: 'Routes' },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return myPosts;
      case 'liked':
        return likedPosts;
      case 'saved':
        return savedPosts;
      default:
        return myPosts;
    }
  };

  const handleTabPress = (tabKey) => {
    const tabIndex = tabs.findIndex(t => t.key === tabKey);
    Animated.spring(tabAnimation, {
      toValue: tabIndex,
      friction: 8,
      useNativeDriver: true,
    }).start();
    setActiveTab(tabKey);
  };

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
    backfaceVisibility: 'hidden',
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Profile"
        rightIcon={<SettingsIcon />}
        onRightPress={() => navigation.navigate('Settings')}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>My Garage</Text>

        {/* Animated Flip Card */}
        <TouchableOpacity
          style={styles.flipCard}
          onPress={handleFlip}
          activeOpacity={0.95}
        >
          <Animated.View style={[styles.cardSide, frontAnimatedStyle]}>
            <LinearGradient
              colors={[colors.primary, '#0055CC']}
              style={styles.cardFront}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View>
                <Text style={[styles.carModel, { color: colors.text }]}>{carModel}</Text>
                <Text style={styles.carYear}>{carYear}</Text>
                <Text style={styles.username}>{profile.username}</Text>
              </View>
              <View style={styles.carStatsRow}>
                <View style={styles.carStatBox}>
                  <Text style={styles.carStatLabel}>HP</Text>
                  <Text style={[styles.carStatValue, { color: colors.text }]}>{horsePower}</Text>
                </View>
                <View style={styles.carStatBox}>
                  <Text style={styles.carStatLabel}>Top Speed</Text>
                  <Text style={[styles.carStatValue, { color: colors.text }]}>{topSpeed}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View style={[styles.cardSide, backAnimatedStyle]}>
            <View style={styles.cardBack}>
              <View style={styles.qrContainer}>
                <QRCode />
              </View>
              <Text style={styles.qrLabel}>Scan to Follow</Text>
              <Text style={styles.qrUsername}>{profile.username}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
        <Text style={[styles.flipHint, { color: colors.textTertiary }]}>Tap card to flip</Text>

        {/* Stats Grid */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.lg, color: colors.textSecondary }]}>Statistics</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <TouchableOpacity
              key={stat.key}
              style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
              onPress={() => navigation.navigate(stat.link)}
              activeOpacity={0.7}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <StatIcon type={stat.key} colors={colors} />
              </View>
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Tabs */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Content</Text>
        <View style={[styles.tabContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.key;
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  isActive && { backgroundColor: colors.primary },
                ]}
                onPress={() => handleTabPress(tab.key)}
                activeOpacity={0.7}
              >
                <IconComponent color={isActive ? '#FFF' : colors.textSecondary} />
                <Text style={[
                  styles.tabText,
                  { color: isActive ? '#FFF' : colors.textSecondary },
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {getTabContent().length > 0 ? (
            getTabContent().map((post) => (
              <ContentCard
                key={post.id}
                post={post}
                onPress={() => navigation.navigate('PostDetail', { post })}
              />
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No {activeTab} yet
              </Text>
            </View>
          )}
        </View>

        {/* Modifications */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Modifications</Text>
        <View style={styles.modsContainer}>
          {mods.map((mod, index) => {
            const modName = typeof mod === 'string' ? mod : mod.name;
            const modCategory = typeof mod === 'string' ? 'Performance' : (mod.category || 'Performance');
            return (
              <TouchableOpacity
                key={mod.id || index}
                style={[styles.modItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ModDetail', { mod: { name: modName, category: modCategory, brand: 'Various', installedDate: 'Recently', notes: `Modification: ${modName}` } })}
              >
                <ToolIcon color={colors.primary} />
                <View style={styles.modContent}>
                  <Text style={[styles.modTitle, { color: colors.text }]} numberOfLines={1}>{modName}</Text>
                  <Text style={[styles.modSubtitle, { color: colors.textSecondary }]}>{modCategory}</Text>
                </View>
                <Text style={[styles.modArrow, { color: colors.textTertiary }]}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  flipCard: {
    height: 200,
    borderRadius: borderRadius.xl,
    ...shadows.card,
  },
  cardSide: {
    height: 200,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  cardFront: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
    borderRadius: borderRadius.xl,
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  carModel: {
    fontSize: 26,
    fontWeight: '700',
  },
  carYear: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xs,
  },
  username: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: spacing.xs,
  },
  carStatsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  carStatBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  carStatLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  carStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    ...shadows.card,
  },
  qrLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: spacing.sm,
  },
  qrUsername: {
    fontSize: 12,
    color: '#666',
    marginTop: spacing.xs,
  },
  flipHint: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBox: {
    width: '48%',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    minHeight: 100,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.xs,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    marginBottom: spacing.lg,
  },
  emptyState: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
  modsContainer: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  modContent: {
    flex: 1,
  },
  modTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  modSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  modArrow: {
    fontSize: 18,
  },
});
