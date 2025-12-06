import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';
import Header from '../components/Header';
import { profiles, formatNumber } from '../data/appData';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const SettingsIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </Svg>
);

const ToolIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="rgba(0, 122, 255, 0.8)">
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

const statIcons = {
  posts: (
    <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.primary}>
      <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </Svg>
  ),
  followers: (
    <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.success}>
      <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </Svg>
  ),
  meets: (
    <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.danger}>
      <Path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
    </Svg>
  ),
  trackDays: (
    <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.purple}>
      <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </Svg>
  ),
};

export default function ProfileScreen({ navigation }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const profile = profiles[0];

  const stats = [
    { key: 'posts', value: profile.stats.posts, label: 'Posts', color: 'rgba(0, 122, 255, 0.2)', link: 'Home' },
    { key: 'followers', value: formatNumber(profile.stats.followers), label: 'Followers', color: 'rgba(52, 199, 89, 0.2)', link: 'Chat' },
    { key: 'meets', value: profile.stats.meetsAttended, label: 'Meets', color: 'rgba(255, 59, 48, 0.2)', link: 'Events' },
    { key: 'trackDays', value: profile.stats.trackDays || 0, label: 'Track Days', color: 'rgba(175, 82, 222, 0.2)', link: 'Routes' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Profile"
        rightIcon={<SettingsIcon />}
        onRightPress={() => navigation.navigate('Settings')}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>My Garage</Text>

        {/* Flip Card */}
        <TouchableOpacity
          style={styles.flipCard}
          onPress={() => setIsFlipped(!isFlipped)}
          activeOpacity={0.9}
        >
          {!isFlipped ? (
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.cardFront}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View>
                <Text style={styles.carModel}>{profile.carModel}</Text>
                <Text style={styles.carYear}>{profile.year}</Text>
                <Text style={styles.username}>{profile.username}</Text>
              </View>
              <View style={styles.carStatsRow}>
                <View style={styles.carStatBox}>
                  <Text style={styles.carStatLabel}>HP</Text>
                  <Text style={styles.carStatValue}>{profile.horsePower}</Text>
                </View>
                <View style={styles.carStatBox}>
                  <Text style={styles.carStatLabel}>Top Speed</Text>
                  <Text style={styles.carStatValue}>{profile.topSpeed}</Text>
                </View>
              </View>
            </LinearGradient>
          ) : (
            <View style={styles.cardBack}>
              <View style={styles.qrContainer}>
                <QRCode />
              </View>
              <Text style={styles.qrLabel}>Scan to Follow</Text>
              <Text style={styles.qrUsername}>{profile.username}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.flipHint}>Tap card to flip</Text>

        {/* Stats Grid */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Statistics</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <TouchableOpacity
              key={stat.key}
              style={styles.statBox}
              onPress={() => navigation.navigate(stat.link)}
              activeOpacity={0.7}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                {statIcons[stat.key]}
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modifications */}
        <Text style={styles.sectionTitle}>Modifications</Text>
        <View style={styles.modsContainer}>
          {profile.mods.map((mod, index) => (
            <TouchableOpacity key={index} style={styles.modItem} activeOpacity={0.7} onPress={() => navigation.navigate('ModDetail', { mod: { name: mod, category: 'Performance', brand: 'Various', installedDate: 'Recently', notes: `Modification: ${mod}` } })}>
              <ToolIcon />
              <View style={styles.modContent}>
                <Text style={styles.modTitle} numberOfLines={1}>{mod}</Text>
                <Text style={styles.modSubtitle}>Mod {index + 1} of {profile.mods.length}</Text>
              </View>
              <Text style={styles.modArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  flipCard: {
    height: 200,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardFront: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  carModel: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
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
    color: colors.text,
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
    color: colors.textTertiary,
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
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
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
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.xs,
  },
  modsContainer: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    gap: spacing.md,
  },
  modContent: {
    flex: 1,
  },
  modTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  modSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modArrow: {
    fontSize: 18,
    color: colors.textTertiary,
  },
});
