import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const LikeIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommentIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </Svg>
);

const FollowIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
);

const EventIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
  </Svg>
);

const initialNotifications = [
  { id: 1, type: 'like', user: '@boost_junkie', action: 'liked', target: 'GT35R Mounted', time: '5m', read: false },
  { id: 2, type: 'comment', user: '@mountain_carver', action: 'commented on', target: 'Sunday Twisties', time: '15m', read: false },
  { id: 3, type: 'follow', user: '@track_star', action: 'followed you', time: '1h', read: false },
  { id: 4, type: 'event', user: 'SoCal Drivers', action: 'invited you to', target: 'Sunset Run', time: '2h', read: true },
  { id: 5, type: 'like', user: '@auto_lens', action: 'liked your comment', time: '3h', read: true },
  { id: 6, type: 'comment', user: '@lap_timer', action: 'replied', time: '5h', read: true },
];

export default function NotificationsScreen({ navigation }) {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);

  const iconMap = {
    like: <LikeIcon color={colors.danger} />,
    comment: <CommentIcon color={colors.primary} />,
    follow: <FollowIcon color={colors.success} />,
    event: <EventIcon color={colors.warning} />,
  };

  const colorMap = {
    like: `${colors.danger}33`,
    comment: `${colors.primary}33`,
    follow: `${colors.success}33`,
    event: `${colors.warning}33`,
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const NotificationItem = ({ notification }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start(() => {
        markAsRead(notification.id);
      });
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.notificationItem,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
            !notification.read && { borderColor: `${colors.primary}4D`, backgroundColor: `${colors.primary}0D` }
          ]}
          activeOpacity={0.7}
          onPress={handlePress}
        >
          <View style={[styles.iconContainer, { backgroundColor: colorMap[notification.type] }]}>
            {iconMap[notification.type]}
          </View>
          <View style={styles.content}>
            <Text style={[styles.notificationText, { color: colors.text }]}>
              <Text style={styles.username}>{notification.user}</Text>
              {' '}{notification.action}
              {notification.target && <Text style={[styles.target, { color: colors.primary }]}> {notification.target}</Text>}
            </Text>
            <Text style={[styles.time, { color: colors.textSecondary }]}>{notification.time}</Text>
          </View>
          {!notification.read && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={[styles.markAllText, { color: colors.primary }]}>Mark all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {unreadNotifications.length > 0 && (
          <View style={styles.unreadSection}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>New</Text>
            <View style={styles.listContainer}>
              {unreadNotifications.map((n) => <NotificationItem key={n.id} notification={n} />)}
            </View>
          </View>
        )}

        {readNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Earlier</Text>
            <View style={styles.listContainer}>
              {readNotifications.map((n) => <NotificationItem key={n.id} notification={n} />)}
            </View>
          </View>
        )}
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
  headerTitle: { fontSize: 20, fontWeight: '700' },
  markAllText: { fontSize: 14, fontWeight: '600' },
  scroll: { flex: 1 },
  section: { marginBottom: spacing.lg },
  unreadSection: { marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: 1, paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  listContainer: { paddingHorizontal: spacing.md },
  notificationItem: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: borderRadius.lg, borderWidth: 1,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  iconContainer: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, marginLeft: spacing.md, marginRight: spacing.sm },
  notificationText: { fontSize: 14, lineHeight: 20 },
  username: { fontWeight: '600' },
  target: {},
  time: { fontSize: 12, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
});
