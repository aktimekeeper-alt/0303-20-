import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import FilterPills from '../components/FilterPills';
import { events, formatDate } from '../data/appData';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const CalendarIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
  </Svg>
);

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Drive', value: 'Drive' },
  { label: 'Track', value: 'Track' },
  { label: 'Show', value: 'Show' },
];

function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[colors.primary, colors.success]}
        style={styles.eventGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventOrganizer}>{event.organizer}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={styles.eventInfoBox}>
          <View style={styles.eventInfoRow}>
            <View style={styles.eventInfoItem}>
              <Text style={styles.eventInfoLabel}>Location</Text>
              <Text style={styles.eventInfoValue}>{event.location}</Text>
            </View>
            <View style={styles.eventInfoItem}>
              <Text style={styles.eventInfoLabel}>Time</Text>
              <Text style={styles.eventInfoValue}>{event.time}</Text>
            </View>
          </View>
          <View style={styles.eventInfoDivider} />
          <View style={styles.eventInfoItem}>
            <Text style={styles.eventInfoLabel}>Date</Text>
            <Text style={styles.eventInfoValue}>{formatDate(event.date)}</Text>
          </View>
        </View>

        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{event.type}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{event.difficulty}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : '+'} attending
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.rsvpButton} activeOpacity={0.8}>
          <Text style={styles.rsvpButtonText}>RSVP Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function EventsScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(e => e.type === activeFilter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.headerRight}>
          <CalendarIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <FilterPills
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <View style={styles.listContainer}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventDetail', { event })} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  headerRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  eventGradient: {
    height: 100,
    opacity: 0.4,
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  eventOrganizer: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  eventInfoBox: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  eventInfoRow: {
    flexDirection: 'row',
  },
  eventInfoItem: {
    flex: 1,
    paddingVertical: spacing.xs,
  },
  eventInfoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  eventInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  eventInfoDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: spacing.sm,
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
  rsvpButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.button,
  },
  rsvpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
