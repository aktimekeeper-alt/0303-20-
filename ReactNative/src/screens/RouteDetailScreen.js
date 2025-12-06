import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const StarIcon = () => (
  <Svg viewBox="0 0 24 24" width={18} height={18} fill="#FFD60A">
    <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </Svg>
);

const NavigateIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
  </Svg>
);

const SaveIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </Svg>
);

const ShareIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </Svg>
);

const LocationIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.primary}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

export default function RouteDetailScreen({ navigation, route }) {
  const routeData = route.params?.route || {
    id: 1,
    name: 'Angeles Crest Highway',
    rating: 4.8,
    reviews: 342,
    description: 'Iconic mountain road with sweeping turns and elevation changes. One of the most popular driving roads in Southern California, featuring 66 miles of mountain twisties with incredible views.',
    distance: '66 miles',
    duration: '2h 15m',
    elevation: '+5,200 ft',
    difficulty: 'Intermediate',
    waypoints: ['La Canada', 'Mt Wilson', 'Wrightwood'],
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.mapPlaceholder}>
          <LinearGradient
            colors={[colors.primary, colors.success]}
            style={styles.mapGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>Map View</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.routeName}>{routeData.name}</Text>
          <View style={styles.ratingRow}>
            <StarIcon />
            <Text style={styles.ratingText}>
              {routeData.rating} ({routeData.reviews} reviews)
            </Text>
          </View>

          <Text style={styles.description}>{routeData.description}</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{routeData.distance}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{routeData.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Elevation</Text>
              <Text style={styles.statValue}>{routeData.elevation}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Difficulty</Text>
              <Text style={styles.statValue}>{routeData.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Waypoints</Text>
          <View style={styles.waypointsList}>
            {routeData.waypoints.map((waypoint, index) => (
              <View key={index} style={styles.waypointItem}>
                <View style={styles.waypointIcon}>
                  <LocationIcon />
                </View>
                <View style={styles.waypointContent}>
                  <Text style={styles.waypointName}>{waypoint}</Text>
                  <Text style={styles.waypointIndex}>Stop {index + 1}</Text>
                </View>
                {index < routeData.waypoints.length - 1 && (
                  <View style={styles.waypointLine} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.secondaryButton}>
          <SaveIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <ShareIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}>
          <NavigateIcon />
          <Text style={styles.primaryButtonText}>Start Navigation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  mapPlaceholder: {
    height: 250,
    position: 'relative',
  },
  mapGradient: {
    flex: 1,
    opacity: 0.6,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    opacity: 0.6,
  },
  content: {
    padding: spacing.md,
  },
  routeName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  ratingText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  statItem: {
    width: '50%',
    paddingVertical: spacing.sm,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  waypointsList: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  waypointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: spacing.md,
  },
  waypointIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  waypointContent: {
    flex: 1,
  },
  waypointName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  waypointIndex: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  waypointLine: {
    position: 'absolute',
    left: 17,
    top: 40,
    width: 2,
    height: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    backgroundColor: colors.background,
  },
  secondaryButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    ...shadows.button,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
