import React from 'react';
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

const notifications = [
  {
    id: 1,
    type: 'like',
    user: '@boost_junkie',
    action: 'liked your post',
    target: 'New Turbo Install',
    time: '5m ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    user: '@mountain_carver',
    action: 'commented on',
    target: 'Sunday Canyon Run',
    time: '15m ago',
    read: false,
  },
  {
    id: 3,
    type: 'follow',
    user: '@track_star',
    action: 'started following you',
    time: '1h ago',
    read: false,
  },
  {
    id: 4,
    type: 'event',
    user: 'SoCal Drivers Club',
    action: 'invited you to',
    target: 'Sunset Canyon Run',
    time: '2h ago',
    read: true,
  },
  {
    id: 5,
    type: 'like',
    user: '@auto_lens',
    action: 'liked your comment',
    time: '3h ago',
    read: true,
  },
  {
    id: 6,
    type: 'comment',
    user: '@lap_timer',
    action: 'replied to your comment',
    time: '5h ago',
    read: true,
  },
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

function NotificationItem({ notification }) {
  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadItem,
      ]}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colorMap[notification.type] }]}>
        {iconMap[notification.type]}
      </View>
      <View style={styles.content}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{notification.user}</Text>
          {' '}{notification.action}
          {notification.target && (
            <Text style={styles.target}> "{notification.target}"</Text>
          )}
        </Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

export default function NotificationsScreen({ navigation }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {unreadCount > 0 && (
          <View style={styles.unreadSection}>
            <Text style={styles.sectionTitle}>New ({unreadCount})</Text>
            <View style={styles.listContainer}>
              {notifications.filter(n => !n.read).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earlier</Text>
          <View style={styles.listContainer}>
            {notifications.filter(n => n.read).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </View>
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
  placeholder: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  unreadSection: {
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
  listContainer: {
    paddingHorizontal: spacing.md,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  unreadItem: {
    borderColor: 'rgba(0, 122, 255, 0.3)',
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  notificationText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 20,
  },
  username: {
    fontWeight: '600',
  },
  target: {
    color: colors.primary,
  },
  time: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
