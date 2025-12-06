import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { formatDate } from '../data/appData';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.primary}>
    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
  </Svg>
);

const TimeIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.success}>
    <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
);

const LocationIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.danger}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

const PeopleIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.purple}>
    <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </Svg>
);

const ShareIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </Svg>
);

export default function EventDetailScreen({ navigation, route }) {
  const event = route.params?.event || {
    id: 1,
    title: 'Sunset Canyon Run',
    organizer: 'SoCal Drivers Club',
    description: 'Join us for an evening cruise through the canyons. Perfect for all skill levels. We will meet at the starting point, have a quick briefing, and then enjoy a relaxed pace through some of the best roads in Southern California.',
    location: 'Angeles Crest Highway',
    date: '2024-12-07',
    time: '5:00 PM',
    type: 'Drive',
    difficulty: 'Intermediate',
    attendees: 47,
    maxAttendees: 60,
  };

  const [isRsvped, setIsRsvped] = useState(false);

  const attendeePercentage = event.maxAttendees
    ? (event.attendees / event.maxAttendees) * 100
    : 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <ShareIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={[colors.primary, colors.success]}
            style={styles.banner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{event.type}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{event.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.organizer}>by {event.organizer}</Text>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: 'rgba(0, 122, 255, 0.2)' }]}>
                <CalendarIcon />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{formatDate(event.date)}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: 'rgba(52, 199, 89, 0.2)' }]}>
                <TimeIcon />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: 'rgba(255, 59, 48, 0.2)' }]}>
                <LocationIcon />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: 'rgba(175, 82, 222, 0.2)' }]}>
                <PeopleIcon />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Attendees</Text>
                <Text style={styles.infoValue}>
                  {event.attendees}{event.maxAttendees ? ` / ${event.maxAttendees}` : '+'}
                </Text>
              </View>
            </View>
          </View>

          {event.maxAttendees && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${attendeePercentage}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {event.maxAttendees - event.attendees} spots remaining
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.rsvpButton, isRsvped && styles.rsvpButtonActive]}
          onPress={() => setIsRsvped(!isRsvped)}
        >
          <Text style={styles.rsvpButtonText}>
            {isRsvped ? 'Cancel RSVP' : 'RSVP Now'}
          </Text>
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  shareButton: {
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
  bannerContainer: {
    height: 180,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  banner: {
    flex: 1,
    opacity: 0.6,
  },
  content: {
    padding: spacing.md,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
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
  eventTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  organizer: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  infoList: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  progressSection: {
    marginBottom: spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bottomActions: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    backgroundColor: colors.background,
  },
  rsvpButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.button,
  },
  rsvpButtonActive: {
    backgroundColor: colors.danger,
  },
  rsvpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
