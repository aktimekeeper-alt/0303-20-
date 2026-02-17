/**
 * BURNOUT APP - Events Screen
 *
 * Community events, meets, and track days.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Linking,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { groupService } from '../services';
import { spacing, borderRadius } from '../styles/theme';

const CalendarIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
  </Svg>
);

const BackIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const LocationIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

const ClockIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
);

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Drive', value: 'drive' },
  { label: 'Track', value: 'track' },
  { label: 'Show', value: 'show' },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function EventsScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const gradientColors = isDarkMode
    ? [colors.background, '#0a0a0a']
    : [colors.background, '#E5E5EA'];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [rsvpStatus, setRsvpStatus] = useState({});

  const loadEvents = useCallback(async () => {
    try {
      const result = await groupService.getGroupEvents('all');
      setEvents(result);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const handleRSVP = async (event) => {
    const isRsvped = rsvpStatus[event.id];

    if (isRsvped) {
      Alert.alert('Cancel RSVP?', 'Are you sure you want to cancel?', [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Cancel RSVP',
          style: 'destructive',
          onPress: async () => {
            try {
              await groupService.rsvpEvent(event.id, 'not_going');
              setRsvpStatus(prev => ({ ...prev, [event.id]: false }));
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel RSVP');
            }
          },
        },
      ]);
    } else {
      try {
        await groupService.rsvpEvent(event.id, 'going');
        setRsvpStatus(prev => ({ ...prev, [event.id]: true }));
        Alert.alert('RSVP Confirmed!', `You're going to ${event.title}!`);
      } catch (error) {
        Alert.alert('Error', 'Failed to RSVP');
      }
    }
  };

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(e => e.type?.toLowerCase() === activeFilter);

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Events</Text>
        <TouchableOpacity
          style={[styles.headerRight, { backgroundColor: colors.card }]}
          onPress={() => {
            Alert.alert('Add to Calendar', 'Sync events with your calendar?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Calendar', onPress: () => Linking.openURL('calshow:') },
            ]);
          }}
        >
          <CalendarIcon color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
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

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Upcoming Events</Text>
    </View>
  );

  const renderEventCard = ({ item }) => {
    const isRsvped = rsvpStatus[item.id];

    return (
      <TouchableOpacity
        style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.eventGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.eventContent}>
          <Text style={[styles.eventTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.eventOrganizer, { color: colors.textSecondary }]}>
            {item.organizer || item.groupName}
          </Text>
          <Text style={[styles.eventDescription, { color: colors.textTertiary }]} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Event Info */}
          <View style={[styles.eventInfoBox, { backgroundColor: `${colors.primary}15`, borderColor: colors.cardBorder }]}>
            <View style={styles.eventInfoRow}>
              <View style={styles.eventInfoItem}>
                <LocationIcon color={colors.textSecondary} />
                <Text style={[styles.eventInfoText, { color: colors.text }]}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.eventInfoRow}>
              <View style={styles.eventInfoItem}>
                <CalendarIcon color={colors.textSecondary} />
                <Text style={[styles.eventInfoText, { color: colors.text }]}>{formatDate(item.date)}</Text>
              </View>
              <View style={styles.eventInfoItem}>
                <ClockIcon color={colors.textSecondary} />
                <Text style={[styles.eventInfoText, { color: colors.text }]}>{item.time}</Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {item.type && (
              <View style={[styles.tag, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{item.type}</Text>
              </View>
            )}
            {item.difficulty && (
              <View style={[styles.tag, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{item.difficulty}</Text>
              </View>
            )}
            <View style={[styles.tag, { backgroundColor: `${colors.primary}20` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>
                {item.attendeeCount || 0}{item.maxAttendees ? `/${item.maxAttendees}` : '+'} going
              </Text>
            </View>
          </View>

          {/* RSVP Button */}
          <TouchableOpacity
            style={[styles.rsvpButton, { backgroundColor: isRsvped ? colors.success : colors.primary }]}
            onPress={() => handleRSVP(item)}
          >
            <Text style={styles.rsvpButtonText}>
              {isRsvped ? "You're Going!" : 'RSVP Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEventCard}
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
                <CalendarIcon color={colors.textTertiary} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No upcoming events
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerRight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
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
  eventCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  eventGradient: {
    height: 80,
    opacity: 0.4,
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  eventOrganizer: {
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  eventInfoBox: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  eventInfoRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  eventInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  eventInfoText: {
    fontSize: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rsvpButton: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  rsvpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: spacing.xl * 3,
  },
  emptyText: {
    fontSize: 16,
    marginTop: spacing.md,
  },
});
