import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const LikeIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.danger}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommentIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.primary}>
    <Path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </Svg>
);

const FollowIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.success}>
    <Path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
);

const EventIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.warning}>
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

const iconMap = {
  like: <LikeIcon />,
  comment: <CommentIcon />,
  follow: <FollowIcon />,
  event: <EventIcon />,
};

const colorMap = {
  like: 'rgba(255, 59, 48, 0.2)',
  comment: 'rgba(0, 122, 255, 0.2)',
  follow: 'rgba(52, 199, 89, 0.2)',
  event: 'rgba(255, 149, 0, 0.2)',
};

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const NotificationItem = ({ notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !notification.read && styles.unreadItem]}
      activeOpacity={0.7}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: colorMap[notification.type] }]}>
        {iconMap[notification.type]}
      </View>
      <View style={styles.content}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{notification.user}</Text>
          {' '}{notification.action}
          {notification.target && <Text style={styles.target}> {notification.target}</Text>}
        </Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAllText}>Mark all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {unreadNotifications.length > 0 && (
          <View style={styles.unreadSection}>
            <Text style={styles.sectionTitle}>New</Text>
            <View style={styles.listContainer}>
              {unreadNotifications.map((n) => <NotificationItem key={n.id} notification={n} />)}
            </View>
          </View>
        )}

        {readNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earlier</Text>
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
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  markAllText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  scroll: { flex: 1 },
  section: { marginBottom: spacing.lg },
  unreadSection: { marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase',
    letterSpacing: 1, paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  listContainer: { paddingHorizontal: spacing.md },
  notificationItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.cardBorder,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  unreadItem: { borderColor: 'rgba(0, 122, 255, 0.3)', backgroundColor: 'rgba(0, 122, 255, 0.05)' },
  iconContainer: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, marginLeft: spacing.md, marginRight: spacing.sm },
  notificationText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  username: { fontWeight: '600' },
  target: { color: colors.primary },
  time: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
});
