import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import FilterPills from '../components/FilterPills';
import { routes } from '../data/appData';
import { colors, spacing, borderRadius } from '../styles/theme';

const SearchIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </Svg>
);

const StarIcon = () => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill="#FFD60A">
    <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </Svg>
);

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Mountain', value: 'mountain' },
  { label: 'Coastal', value: 'coastal' },
  { label: 'Urban', value: 'urban' },
];

function RouteCard({ route, onPress }) {
  return (
    <TouchableOpacity style={styles.routeCard} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[colors.primary, colors.success]}
        style={styles.routeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.routeContent}>
        <Text style={styles.routeTitle}>{route.name}</Text>
        <View style={styles.ratingRow}>
          <StarIcon />
          <Text style={styles.ratingText}>
            {route.rating} ({route.reviews} reviews)
          </Text>
        </View>
        <Text style={styles.routeDescription} numberOfLines={2}>
          {route.description}
        </Text>

        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{route.distance}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{route.duration}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{route.elevation}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{route.difficulty}</Text>
          </View>
        </View>

        <View style={styles.waypointsSection}>
          <Text style={styles.waypointsLabel}>Waypoints:</Text>
          <Text style={styles.waypointsText}>
            {route.waypoints.join(' > ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function RoutesScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Routes"
        rightIcon={<SearchIcon />}
        onRightPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Popular Routes</Text>
        <FilterPills
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <View style={styles.listContainer}>
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} onPress={() => navigation.navigate('RouteDetail', { route })} />
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
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  listContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  routeCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  routeGradient: {
    height: 100,
    opacity: 0.4,
  },
  routeContent: {
    padding: spacing.md,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  ratingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  routeDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tag: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  waypointsSection: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  waypointsLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  waypointsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
