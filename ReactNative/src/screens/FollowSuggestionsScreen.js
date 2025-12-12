import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

const BackIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const CheckIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill={color}>
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);

const VerifiedIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill={color}>
    <Path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </Svg>
);

const suggestedUsers = [
  {
    id: 1,
    username: '@boost_junkie',
    name: 'Alex Chen',
    car: '2020 Supra MK5',
    followers: '12.4K',
    posts: 234,
    verified: true,
    gradient: ['#007AFF', '#0051D5'],
  },
  {
    id: 2,
    username: '@track_queen',
    name: 'Sarah Martinez',
    car: '2019 Porsche GT3',
    followers: '28.1K',
    posts: 456,
    verified: true,
    gradient: ['#FF3B30', '#D70015'],
  },
  {
    id: 3,
    username: '@jdm_lifestyle',
    name: 'Kenji Tanaka',
    car: 'R34 Skyline GT-R',
    followers: '45.2K',
    posts: 892,
    verified: true,
    gradient: ['#34C759', '#248A3D'],
  },
  {
    id: 4,
    username: '@mountain_carver',
    name: 'Mike Thompson',
    car: '2021 BMW M3',
    followers: '8.7K',
    posts: 156,
    verified: false,
    gradient: ['#FF9500', '#CC7700'],
  },
  {
    id: 5,
    username: '@stance_daily',
    name: 'Emily Park',
    car: 'Bagged E46 M3',
    followers: '15.3K',
    posts: 312,
    verified: false,
    gradient: ['#AF52DE', '#8B3FBF'],
  },
  {
    id: 6,
    username: '@drift_master',
    name: 'Chris Williams',
    car: '350Z Drift Build',
    followers: '22.8K',
    posts: 567,
    verified: true,
    gradient: ['#5856D6', '#3634A3'],
  },
];

export default function FollowSuggestionsScreen({ navigation, route }) {
  const { colors, isDarkMode } = useTheme();
  const gradientColors = isDarkMode
    ? [colors.background, '#0a0a0a']
    : [colors.background, '#E5E5EA'];

  const params = route.params || {};
  const [following, setFollowing] = useState([]);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const toggleFollow = (id) => {
    setFollowing((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const followAll = () => {
    setFollowing(suggestedUsers.map((u) => u.id));
  };

  const handleFinish = async () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(async () => {
      const userData = {
        id: Date.now(),
        username: `@${params.username}`,
        email: params.email,
        displayName: params.displayName || params.username,
        bio: params.bio || '',
        location: params.location || '',
        car: params.car || null,
        interests: params.interests || [],
        following: following.map((id) => suggestedUsers.find((u) => u.id === id)?.username),
        stats: { posts: 0, followers: 0, following: following.length, meetsAttended: 0, trackDays: 0 },
        mods: [],
        createdAt: new Date().toISOString(),
      };

      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');

        Alert.alert(
          'Welcome to Burnout! 🎉',
          `You're all set, ${params.displayName || params.username}! Start exploring the community.`,
          [{ text: "Let's Go!", onPress: () => navigation.replace('Main') }]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    });
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon color={colors.text} />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, { backgroundColor: colors.success }]} />
            <View style={[styles.progressLine, { backgroundColor: colors.success }]} />
            <View style={[styles.progressDot, { backgroundColor: colors.success }]} />
            <View style={[styles.progressLine, { backgroundColor: colors.success }]} />
            <View style={[styles.progressDot, { backgroundColor: colors.success }]} />
            <View style={[styles.progressLine, { backgroundColor: colors.success }]} />
            <View style={[styles.progressDot, { backgroundColor: colors.primary }]} />
          </View>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Follow enthusiasts</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Get inspired by the community
          </Text>
          <TouchableOpacity onPress={followAll}>
            <Text style={[styles.followAllText, { color: colors.primary }]}>Follow All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {suggestedUsers.map((user) => {
            const isFollowing = following.includes(user.id);
            return (
              <View
                key={user.id}
                style={[styles.userCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
              >
                <LinearGradient
                  colors={user.gradient}
                  style={styles.avatar}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.avatarText}>{user.name[0]}</Text>
                </LinearGradient>

                <View style={styles.userInfo}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
                    {user.verified && <VerifiedIcon color={colors.primary} />}
                  </View>
                  <Text style={[styles.username, { color: colors.textSecondary }]}>{user.username}</Text>
                  <Text style={[styles.car, { color: colors.textTertiary }]}>{user.car}</Text>
                  <View style={styles.statsRow}>
                    <Text style={[styles.stat, { color: colors.textSecondary }]}>
                      {user.followers} followers
                    </Text>
                    <Text style={[styles.statDot, { color: colors.textTertiary }]}>•</Text>
                    <Text style={[styles.stat, { color: colors.textSecondary }]}>
                      {user.posts} posts
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.followButton,
                    {
                      backgroundColor: isFollowing ? colors.card : colors.primary,
                      borderColor: isFollowing ? colors.primary : 'transparent',
                      borderWidth: isFollowing ? 1 : 0,
                    },
                  ]}
                  onPress={() => toggleFollow(user.id)}
                >
                  {isFollowing ? (
                    <View style={styles.followingContent}>
                      <CheckIcon color={colors.primary} />
                      <Text style={[styles.followButtonText, { color: colors.primary }]}>Following</Text>
                    </View>
                  ) : (
                    <Text style={[styles.followButtonText, { color: '#FFF' }]}>Follow</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Finish Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[styles.finishButton, { backgroundColor: colors.primary }]}
              onPress={handleFinish}
              activeOpacity={0.9}
            >
              <Text style={styles.finishButtonText}>
                {following.length > 0 ? `Continue (${following.length} following)` : 'Skip & Finish'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  progressLine: {
    width: 20,
    height: 2,
  },
  titleContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  followAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  username: {
    fontSize: 14,
  },
  car: {
    fontSize: 12,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stat: {
    fontSize: 12,
  },
  statDot: {
    marginHorizontal: 6,
  },
  followButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    minWidth: 90,
    alignItems: 'center',
  },
  followingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  finishButton: {
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});
