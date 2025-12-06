import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import StatCard from '../components/StatCard';
import FilterPills from '../components/FilterPills';
import ContentCard from '../components/ContentCard';
import { posts } from '../data/appData';
import { colors, spacing } from '../styles/theme';

const CalendarIcon = () => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={colors.warning}>
    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
  </Svg>
);

const MapIcon = () => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={colors.success}>
    <Path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </Svg>
);

const BellIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </Svg>
);

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Builds', value: 'builds' },
  { label: 'Meets', value: 'meets' },
  { label: 'Racing', value: 'racing' },
];

export default function HomeFeedScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(p => p.category === activeFilter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Burnout"
        rightIcon={<BellIcon />}
        onRightPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search posts, cars, events..."
        />

        <View style={styles.statsRow}>
          <StatCard
            icon={<CalendarIcon />}
            value="24"
            label="Upcoming Events"
            iconBgColor="rgba(255, 149, 0, 0.2)"
            onPress={() => navigation.navigate('Events')}
          />
          <View style={{ width: spacing.md }} />
          <StatCard
            icon={<MapIcon />}
            value="15"
            label="Active Routes"
            iconBgColor="rgba(52, 199, 89, 0.2)"
            onPress={() => navigation.navigate('Routes')}
          />
        </View>

        <Text style={styles.sectionTitle}>Feed</Text>
        <FilterPills
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <View style={styles.feedContainer}>
          {filteredPosts.map((post) => (
            <ContentCard key={post.id} post={post} onPress={() => {}} />
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
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
  feedContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
});
