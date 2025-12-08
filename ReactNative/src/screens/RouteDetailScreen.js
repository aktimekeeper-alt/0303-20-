import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert, Share, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles/theme';

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

const SaveIcon = ({ filled }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={filled ? "#007AFF" : "white"}>
    <Path d={filled
      ? "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
      : "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
    } />
  </Svg>
);

const ShareIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </Svg>
);

const LocationIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

export default function RouteDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

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
    coordinates: { lat: 34.2356, lng: -118.1367 },
  };

  const handleStartNavigation = async () => {
    setIsNavigating(true);

    const lat = routeData.coordinates?.lat || 34.2356;
    const lng = routeData.coordinates?.lng || -118.1367;
    const label = encodeURIComponent(routeData.name);

    // Try different map apps
    const urls = Platform.select({
      ios: [
        `maps://app?daddr=${lat},${lng}&dirflg=d`,
        `comgooglemaps://?daddr=${lat},${lng}&directionsmode=driving`,
        `waze://?ll=${lat},${lng}&navigate=yes`,
      ],
      android: [
        `google.navigation:q=${lat},${lng}`,
        `waze://?ll=${lat},${lng}&navigate=yes`,
        `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
      ],
      default: [`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`],
    });

    let opened = false;
    for (const url of urls) {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
          opened = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!opened) {
      // Fallback to web maps
      const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      await Linking.openURL(webUrl);
    }

    setIsNavigating(false);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? 'Route Removed' : 'Route Saved',
      isSaved ? 'Route removed from your saved routes.' : 'Route added to your saved routes!',
      [{ text: 'OK' }]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this driving route: ${routeData.name}\n\n${routeData.description}\n\nDistance: ${routeData.distance}\nDuration: ${routeData.duration}`,
        title: routeData.name,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share route');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Route Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.mapPlaceholder}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.mapGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.mapOverlay}>
            <LocationIcon color="#FFF" />
            <Text style={styles.mapText}>Tap Start Navigation to open maps</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.routeName, { color: colors.text }]}>{routeData.name}</Text>
          <View style={styles.ratingRow}>
            <StarIcon />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {routeData.rating} ({routeData.reviews} reviews)
            </Text>
          </View>

          <Text style={[styles.description, { color: colors.textSecondary }]}>{routeData.description}</Text>

          <View style={[styles.statsGrid, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Distance</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{routeData.distance}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Duration</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{routeData.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Elevation</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{routeData.elevation}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Difficulty</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{routeData.difficulty}</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Waypoints</Text>
          <View style={[styles.waypointsList, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {routeData.waypoints.map((waypoint, index) => (
              <View key={index} style={styles.waypointItem}>
                <View style={[styles.waypointIcon, { backgroundColor: `${colors.primary}33` }]}>
                  <LocationIcon color={colors.primary} />
                </View>
                <View style={styles.waypointContent}>
                  <Text style={[styles.waypointName, { color: colors.text }]}>{waypoint}</Text>
                  <Text style={[styles.waypointIndex, { color: colors.textSecondary }]}>Stop {index + 1}</Text>
                </View>
                {index < routeData.waypoints.length - 1 && (
                  <View style={[styles.waypointLine, { backgroundColor: `${colors.primary}4D` }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomActions, { borderTopColor: colors.cardBorder, backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          onPress={handleSave}
        >
          <SaveIcon filled={isSaved} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          onPress={handleShare}
        >
          <ShareIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary, opacity: isNavigating ? 0.7 : 1 }]}
          onPress={handleStartNavigation}
          disabled={isNavigating}
        >
          <NavigateIcon />
          <Text style={[styles.primaryButtonText, { color: colors.text }]}>
            {isNavigating ? 'Opening...' : 'Start Navigation'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    gap: 8,
  },
  mapText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    padding: spacing.md,
  },
  routeName: {
    fontSize: 28,
    fontWeight: '700',
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
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  statItem: {
    width: '50%',
    paddingVertical: spacing.sm,
  },
  statLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  waypointsList: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
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
  },
  waypointIndex: {
    fontSize: 13,
    marginTop: 2,
  },
  waypointLine: {
    position: 'absolute',
    left: 17,
    top: 40,
    width: 2,
    height: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
  },
  secondaryButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    ...shadows.button,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
