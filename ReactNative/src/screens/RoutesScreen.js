import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import FilterPills from '../components/FilterPills';
import SearchBar from '../components/SearchBar';
import { routes } from '../data/appData';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

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

function RouteCard({ route, onPress, colors }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.98, friction: 3, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.routeCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={[colors.primary, colors.success]}
          style={styles.routeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.routeContent}>
          <Text style={[styles.routeTitle, { color: colors.text }]}>{route.name}</Text>
          <View style={styles.ratingRow}>
            <StarIcon />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {route.rating} ({route.reviews} reviews)
            </Text>
          </View>
          <Text style={[styles.routeDescription, { color: colors.textTertiary }]} numberOfLines={2}>
            {route.description}
          </Text>

          <View style={styles.tagsRow}>
            <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{route.distance}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{route.duration}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{route.elevation}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{route.difficulty}</Text>
            </View>
          </View>

          <View style={[styles.waypointsSection, { borderTopColor: colors.cardBorder }]}>
            <Text style={[styles.waypointsLabel, { color: colors.textSecondary }]}>Waypoints:</Text>
            <Text style={[styles.waypointsText, { color: colors.textSecondary }]}>
              {route.waypoints.join(' > ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function RoutesScreen({ navigation }) {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredRoutes = routes.filter(route => {
    const matchesFilter = activeFilter === 'all' || route.name.toLowerCase().includes(activeFilter);
    const matchesSearch = !searchText || route.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Routes"
        rightIcon={<SearchIcon />}
        onRightPress={() => setShowSearch(!showSearch)}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {showSearch && (
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search routes..."
          />
        )}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Popular Routes</Text>
        <FilterPills
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <View style={styles.listContainer}>
          {filteredRoutes.map((route) => (
            <RouteCard key={route.id} route={route} colors={colors} onPress={() => navigation.navigate('RouteDetail', { route })} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  sectionTitle: {
    fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1,
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  listContainer: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  routeCard: { borderRadius: borderRadius.xl, borderWidth: 1, overflow: 'hidden', marginBottom: spacing.md },
  routeGradient: { height: 100, opacity: 0.4 },
  routeContent: { padding: spacing.md },
  routeTitle: { fontSize: 18, fontWeight: '700', marginBottom: spacing.xs },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.sm },
  ratingText: { fontSize: 14 },
  routeDescription: { fontSize: 14, lineHeight: 20, marginBottom: spacing.sm },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  tagText: { fontSize: 12, fontWeight: '500' },
  waypointsSection: { paddingTop: spacing.sm, borderTopWidth: 1 },
  waypointsLabel: { fontSize: 13, marginBottom: spacing.xs },
  waypointsText: { fontSize: 14 },
});
