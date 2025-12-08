import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Animated, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import FilterPills from '../components/FilterPills';
import { events, formatDate } from '../data/appData';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles/theme';

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

function EventCard({ event, onPress, colors }) {
  const [isRsvped, setIsRsvped] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleRSVP = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      if (isRsvped) {
        Alert.alert('Cancel RSVP?', 'Are you sure you want to cancel your RSVP?', [
          { text: 'Keep', style: 'cancel' },
          { text: 'Cancel RSVP', style: 'destructive', onPress: () => setIsRsvped(false) },
        ]);
      } else {
        setIsRsvped(true);
        Alert.alert('RSVP Confirmed!', `You're going to ${event.title}!`);
      }
    });
  };

  return (
    <TouchableOpacity style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[colors.primary, colors.success]}
        style={styles.eventGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.eventContent}>
        <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
        <Text style={[styles.eventOrganizer, { color: colors.textSecondary }]}>{event.organizer}</Text>
        <Text style={[styles.eventDescription, { color: colors.textTertiary }]} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={[styles.eventInfoBox, { backgroundColor: `${colors.primary}1A`, borderColor: `${colors.primary}4D` }]}>
          <View style={styles.eventInfoRow}>
            <View style={styles.eventInfoItem}>
              <Text style={[styles.eventInfoLabel, { color: colors.textSecondary }]}>Location</Text>
              <Text style={[styles.eventInfoValue, { color: colors.text }]}>{event.location}</Text>
            </View>
            <View style={styles.eventInfoItem}>
              <Text style={[styles.eventInfoLabel, { color: colors.textSecondary }]}>Time</Text>
              <Text style={[styles.eventInfoValue, { color: colors.text }]}>{event.time}</Text>
            </View>
          </View>
          <View style={[styles.eventInfoDivider, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
          <View style={styles.eventInfoItem}>
            <Text style={[styles.eventInfoLabel, { color: colors.textSecondary }]}>Date</Text>
            <Text style={[styles.eventInfoValue, { color: colors.text }]}>{formatDate(event.date)}</Text>
          </View>
        </View>

        <View style={styles.tagsRow}>
          <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>{event.type}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>{event.difficulty}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
            <Text style={[styles.tagText, { color: colors.primary }]}>
              {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : '+'} attending
            </Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.rsvpButton, { backgroundColor: isRsvped ? colors.success : colors.primary }]}
            activeOpacity={0.8}
            onPress={handleRSVP}
          >
            <Text style={[styles.rsvpButtonText, { color: colors.text }]}>
              {isRsvped ? "You're Going!" : 'RSVP Now'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default function EventsScreen({ navigation }) {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(e => e.type === activeFilter);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Events</Text>
        <TouchableOpacity
          style={styles.headerRight}
          onPress={() => {
            Alert.alert(
              'Add to Calendar',
              'Would you like to sync events with your calendar?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Open Calendar',
                  onPress: () => Linking.openURL('calshow:'),
                },
              ]
            );
          }}
        >
          <CalendarIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Upcoming Events</Text>
        <FilterPills
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <View style={styles.listContainer}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} colors={colors} onPress={() => navigation.navigate('EventDetail', { event })} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  headerRight: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  scroll: { flex: 1 },
  sectionTitle: {
    fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1,
    paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  listContainer: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  eventCard: { borderRadius: borderRadius.xl, borderWidth: 1, overflow: 'hidden', marginBottom: spacing.md },
  eventGradient: { height: 100, opacity: 0.4 },
  eventContent: { padding: spacing.md },
  eventTitle: { fontSize: 18, fontWeight: '700', marginBottom: spacing.xs },
  eventOrganizer: { fontSize: 14, marginBottom: spacing.sm },
  eventDescription: { fontSize: 14, lineHeight: 20, marginBottom: spacing.md },
  eventInfoBox: { borderRadius: borderRadius.md, borderWidth: 1, padding: spacing.sm, marginBottom: spacing.md },
  eventInfoRow: { flexDirection: 'row' },
  eventInfoItem: { flex: 1, paddingVertical: spacing.xs },
  eventInfoLabel: { fontSize: 12, textTransform: 'uppercase', marginBottom: spacing.xs },
  eventInfoValue: { fontSize: 14, fontWeight: '600' },
  eventInfoDivider: { height: 1, marginVertical: spacing.sm },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  tagText: { fontSize: 12, fontWeight: '500' },
  rsvpButton: { borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center', ...shadows.button },
  rsvpButtonText: { fontSize: 16, fontWeight: '600' },
});
