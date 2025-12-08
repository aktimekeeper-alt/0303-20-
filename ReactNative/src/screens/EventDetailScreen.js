import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Share, Animated, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { formatDate } from '../data/appData';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const CalendarIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
  </Svg>
);

const TimeIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
);

const LocationIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

const PeopleIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </Svg>
);

const ShareIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </Svg>
);

const CheckIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);

export default function EventDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [isRsvped, setIsRsvped] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(route.params?.event?.attendees || 47);
  const [buttonScale] = useState(new Animated.Value(1));

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
    coordinates: { lat: 34.2356, lng: -118.1367 },
  };

  const attendeePercentage = event.maxAttendees
    ? (attendeeCount / event.maxAttendees) * 100
    : 100;

  const handleRSVP = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (isRsvped) {
      Alert.alert(
        'Cancel RSVP?',
        'Are you sure you want to cancel your RSVP for this event?',
        [
          { text: 'Keep RSVP', style: 'cancel' },
          {
            text: 'Cancel RSVP',
            style: 'destructive',
            onPress: () => {
              setIsRsvped(false);
              setAttendeeCount(prev => prev - 1);
              Alert.alert('RSVP Cancelled', 'Your spot has been released.');
            },
          },
        ]
      );
    } else {
      if (event.maxAttendees && attendeeCount >= event.maxAttendees) {
        Alert.alert('Event Full', 'Sorry, this event is at capacity. Would you like to join the waitlist?', [
          { text: 'No Thanks', style: 'cancel' },
          { text: 'Join Waitlist', onPress: () => Alert.alert('Added to Waitlist', 'We\'ll notify you if a spot opens up!') },
        ]);
        return;
      }

      setIsRsvped(true);
      setAttendeeCount(prev => prev + 1);
      Alert.alert(
        'RSVP Confirmed!',
        `You're going to ${event.title}! We'll send you a reminder before the event.`,
        [{ text: 'Awesome!' }]
      );
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me at ${event.title}!\n\n${event.description}\n\nDate: ${formatDate(event.date)}\nTime: ${event.time}\nLocation: ${event.location}`,
        title: event.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share event');
    }
  };

  const handleLocationPress = async () => {
    const lat = event.coordinates?.lat || 34.2356;
    const lng = event.coordinates?.lng || -118.1367;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    await Linking.openURL(url);
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Event Details</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <ShareIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.banner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          {isRsvped && (
            <View style={styles.rsvpBadge}>
              <CheckIcon />
              <Text style={styles.rsvpBadgeText}>You're Going!</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.tagsRow}>
            <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{event.type}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{event.difficulty}</Text>
            </View>
          </View>

          <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
          <Text style={[styles.organizer, { color: colors.textSecondary }]}>by {event.organizer}</Text>

          <Text style={[styles.description, { color: colors.textSecondary }]}>{event.description}</Text>

          <View style={[styles.infoList, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={[styles.infoItem, { borderBottomColor: colors.cardBorder }]}>
              <View style={[styles.infoIcon, { backgroundColor: `${colors.primary}33` }]}>
                <CalendarIcon color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Date</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{formatDate(event.date)}</Text>
              </View>
            </View>

            <View style={[styles.infoItem, { borderBottomColor: colors.cardBorder }]}>
              <View style={[styles.infoIcon, { backgroundColor: `${colors.secondary}33` }]}>
                <TimeIcon color={colors.secondary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Time</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{event.time}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.infoItem, { borderBottomColor: colors.cardBorder }]}
              onPress={handleLocationPress}
            >
              <View style={[styles.infoIcon, { backgroundColor: 'rgba(255, 59, 48, 0.2)' }]}>
                <LocationIcon color={colors.danger} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Location</Text>
                <Text style={[styles.infoValue, { color: colors.primary }]}>{event.location}</Text>
                <Text style={[styles.infoHint, { color: colors.textTertiary }]}>Tap to open in Maps</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
              <View style={[styles.infoIcon, { backgroundColor: 'rgba(175, 82, 222, 0.2)' }]}>
                <PeopleIcon color={colors.purple} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Attendees</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {attendeeCount}{event.maxAttendees ? ` / ${event.maxAttendees}` : '+'}
                </Text>
              </View>
            </View>
          </View>

          {event.maxAttendees && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(attendeePercentage, 100)}%`,
                      backgroundColor: attendeePercentage >= 90 ? colors.danger : colors.primary,
                    }
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {attendeePercentage >= 100
                  ? 'Event is full!'
                  : `${event.maxAttendees - attendeeCount} spots remaining`
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomActions, { borderTopColor: colors.cardBorder, backgroundColor: colors.background }]}>
        <Animated.View style={{ flex: 1, transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[
              styles.rsvpButton,
              { backgroundColor: isRsvped ? colors.danger : colors.primary }
            ]}
            onPress={handleRSVP}
            activeOpacity={0.8}
          >
            {isRsvped && <CheckIcon />}
            <Text style={[styles.rsvpButtonText, { color: colors.text }]}>
              {isRsvped ? 'Cancel RSVP' : 'RSVP Now'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    position: 'relative',
  },
  banner: {
    flex: 1,
    opacity: 0.7,
  },
  rsvpBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 199, 89, 0.9)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  rsvpBadgeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
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
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  organizer: {
    fontSize: 15,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  infoList: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
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
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  infoHint: {
    fontSize: 11,
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
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    textAlign: 'center',
  },
  bottomActions: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
  rsvpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.button,
  },
  rsvpButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
