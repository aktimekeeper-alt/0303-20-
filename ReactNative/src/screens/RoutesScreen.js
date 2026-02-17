/**
 * BURNOUT APP - Routes Screen
 *
 * Discover driving routes, record your own, and share with the community.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { routeService } from '../services';
import { spacing, borderRadius } from '../styles/theme';

// Icons
const RecordIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </Svg>
);

const StopIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M6 6h12v12H6z" />
  </Svg>
);

const StarIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </Svg>
);

const LocationIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill={color}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

const ClockIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
);

const ElevationIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
  </Svg>
);

const HeartIcon = ({ color, filled }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={filled ? color : 'none'} stroke={color} strokeWidth={2}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const FilterIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={color}>
    <Path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </Svg>
);

const difficulties = ['Easy', 'Moderate', 'Hard', 'Expert'];
const difficultyColors = {
  Easy: '#34C759',
  Moderate: '#FF9500',
  Hard: '#FF3B30',
  Expert: '#AF52DE',
};

export default function RoutesScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const gradientColors = isDarkMode
    ? [colors.background, '#0a0a0a']
    : [colors.background, '#E5E5EA'];

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const recordPulse = useRef(new Animated.Value(1)).current;

  const loadRoutes = useCallback(async () => {
    try {
      const result = await routeService.getRoutes(1);
      setRoutes(result.routes);
    } catch (error) {
      console.error('Failed to load routes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoutes();
  }, [loadRoutes]);

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordPulse, { toValue: 1.2, duration: 800, useNativeDriver: true }),
          Animated.timing(recordPulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      recordPulse.stopAnimation();
      recordPulse.setValue(1);
    }
  }, [isRecording, recordPulse]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRoutes();
    setRefreshing(false);
  };

  const handleStartRecording = async () => {
    try {
      const recording = await routeService.startRecording('New Route');
      setRecordingData(recording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Recording Error', error.message);
    }
  };

  const handleStopRecording = async () => {
    if (!recordingData) return;

    try {
      const route = await routeService.stopRecording(recordingData.id);
      setIsRecording(false);
      setRecordingData(null);

      Alert.alert(
        'Route Recorded',
        `Recorded ${route.waypoints?.length || 0} waypoints over ${route.distance || '0'} miles`,
        [
          { text: 'Discard', style: 'destructive' },
          { text: 'Save', onPress: () => loadRoutes() },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const handleLikeRoute = async (routeId) => {
    try {
      await routeService.likeRoute(routeId);
      setRoutes(prev =>
        prev.map(r =>
          r.id === routeId
            ? { ...r, isLiked: !r.isLiked, likeCount: r.isLiked ? r.likeCount - 1 : r.likeCount + 1 }
            : r
        )
      );
    } catch (error) {
      console.error('Failed to like route:', error);
    }
  };

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Popular', value: 'popular' },
    { label: 'Nearby', value: 'nearby' },
    { label: 'My Routes', value: 'mine' },
  ];

  const filteredRoutes = routes.filter(route => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'popular') return route.rating >= 4.5;
    if (activeFilter === 'mine') return route.creatorId === '1';
    return true;
  });

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Routes</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.card }]}
            onPress={() => {}}
          >
            <FilterIcon color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recording Banner */}
      {isRecording ? (
        <Animated.View
          style={[
            styles.recordingBanner,
            { backgroundColor: colors.danger, transform: [{ scale: recordPulse }] },
          ]}
        >
          <View style={styles.recordingDot} />
          <View style={styles.recordingInfo}>
            <Text style={styles.recordingText}>Recording Route...</Text>
            <Text style={styles.recordingSubtext}>
              {recordingData?.waypoints?.length || 0} waypoints
            </Text>
          </View>
          <TouchableOpacity
            style={styles.stopButton}
            onPress={handleStopRecording}
          >
            <StopIcon color="#FFF" />
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <TouchableOpacity
          style={[styles.recordButton, { backgroundColor: colors.primary }]}
          onPress={handleStartRecording}
        >
          <RecordIcon color="#FFF" />
          <Text style={styles.recordButtonText}>Record New Route</Text>
        </TouchableOpacity>
      )}

      {/* Filter Pills */}
      <View style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterPill,
              {
                backgroundColor: activeFilter === filter.value ? colors.primary : colors.card,
                borderColor: activeFilter === filter.value ? colors.primary : colors.cardBorder,
              },
            ]}
            onPress={() => setActiveFilter(filter.value)}
          >
            <Text
              style={[
                styles.filterPillText,
                { color: activeFilter === filter.value ? '#FFF' : colors.text },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {activeFilter === 'all' ? 'Popular Routes' : filters.find(f => f.value === activeFilter)?.label}
      </Text>
    </View>
  );

  const renderRouteCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.routeCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}
      activeOpacity={0.8}
    >
      {/* Map Preview Placeholder */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.mapPreview}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.mapOverlay}>
          <LocationIcon color="rgba(255,255,255,0.8)" />
          <Text style={styles.mapPlaceholderText}>{item.waypoints?.length || 0} waypoints</Text>
        </View>
      </LinearGradient>

      {/* Route Info */}
      <View style={styles.routeInfo}>
        <View style={styles.routeHeader}>
          <Text style={[styles.routeName, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => handleLikeRoute(item.id)}>
            <HeartIcon color={item.isLiked ? colors.primary : colors.textSecondary} filled={item.isLiked} />
          </TouchableOpacity>
        </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <StarIcon color="#FFD60A" />
          <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
            {item.rating?.toFixed(1) || 'N/A'}
          </Text>
          <Text style={[styles.reviewCount, { color: colors.textTertiary }]}>
            ({item.reviewCount || 0} reviews)
          </Text>
        </View>

        {/* Description */}
        <Text style={[styles.routeDescription, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={[styles.tag, { backgroundColor: `${colors.primary}20` }]}>
            <ClockIcon color={colors.primary} />
            <Text style={[styles.tagText, { color: colors.primary }]}>{item.duration}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: `${colors.primary}20` }]}>
            <LocationIcon color={colors.primary} />
            <Text style={[styles.tagText, { color: colors.primary }]}>{item.distance}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: `${colors.primary}20` }]}>
            <ElevationIcon color={colors.primary} />
            <Text style={[styles.tagText, { color: colors.primary }]}>{item.elevation}</Text>
          </View>
          <View
            style={[
              styles.difficultyTag,
              { backgroundColor: `${difficultyColors[item.difficulty] || colors.primary}20` },
            ]}
          >
            <Text style={[styles.difficultyText, { color: difficultyColors[item.difficulty] || colors.primary }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        {/* Creator */}
        <View style={styles.creatorRow}>
          <Text style={[styles.creatorText, { color: colors.textTertiary }]}>
            by {item.creatorName || 'Unknown'}
          </Text>
          <Text style={[styles.likesText, { color: colors.textTertiary }]}>
            {item.likeCount || 0} likes
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <FlatList
          data={filteredRoutes}
          keyExtractor={(item) => item.id}
          renderItem={renderRouteCard}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyContainer}>
                <LocationIcon color={colors.textTertiary} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No routes found
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
                  Be the first to record a route!
                </Text>
              </View>
            )
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  listContent: {
    paddingBottom: spacing.xl * 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  recordButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recordingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginRight: spacing.sm,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recordingSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  stopButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  routeCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  mapPreview: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  mapPlaceholderText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
  },
  routeInfo: {
    padding: spacing.md,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 13,
  },
  routeDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  difficultyTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  creatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 13,
  },
  likesText: {
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: spacing.xl * 3,
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
