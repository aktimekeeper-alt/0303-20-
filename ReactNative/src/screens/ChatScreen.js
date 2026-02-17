/**
 * BURNOUT APP - Chat Screen
 *
 * Group chats with sub-chats (breakout rooms) and Push-to-Talk (CB radio).
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { chatService } from '../services';
import { spacing, borderRadius } from '../styles/theme';

// Icons
const EditIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={color}>
    <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </Svg>
);

const GroupIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={28} height={28} fill={color}>
    <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </Svg>
);

const RadioIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M20 6H8.3l8.26-3.34L15.88 1 3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2zm-8 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </Svg>
);

const MicIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={32} height={32} fill={color}>
    <Path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
  </Svg>
);

const SubChatIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={18} height={18} fill={color}>
    <Path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
  </Svg>
);

const ChevronIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </Svg>
);

const WaveIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill={color}>
    <Path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM3 9v6h4l5 5V4L7 9H3z" />
  </Svg>
);

export default function ChatScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const gradientColors = isDarkMode
    ? [colors.background, '#0a0a0a']
    : [colors.background, '#E5E5EA'];

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pttActive, setPttActive] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [showPTTPanel, setShowPTTPanel] = useState(false);
  const pttScale = useState(new Animated.Value(1))[0];

  const loadChats = useCallback(async () => {
    try {
      const result = await chatService.getChats();
      setChats(result);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadChats();
    setRefreshing(false);
  };

  const handlePTTPress = () => {
    setShowPTTPanel(true);
  };

  const handleStartPTT = async (chatId) => {
    try {
      await chatService.startPTT(chatId);
      setPttActive(true);
      setActiveChannel(chatId);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pttScale, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(pttScale, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } catch (error) {
      Alert.alert('PTT Error', error.message);
    }
  };

  const handleStopPTT = async () => {
    try {
      await chatService.stopPTT();
      setPttActive(false);
      setActiveChannel(null);
      pttScale.stopAnimation();
      pttScale.setValue(1);
    } catch (error) {
      console.error('Failed to stop PTT:', error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.pttButton, { backgroundColor: pttActive ? colors.primary : colors.card }]}
            onPress={handlePTTPress}
          >
            <RadioIcon color={pttActive ? '#FFF' : colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.newChatButton, { backgroundColor: colors.card }]}
            onPress={() => Alert.alert('New Chat', 'Create new chat or group')}
          >
            <EditIcon color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CB Radio Banner (when active) */}
      {pttActive && (
        <Animated.View style={[styles.pttBanner, { backgroundColor: colors.primary, transform: [{ scale: pttScale }] }]}>
          <View style={styles.pttBannerContent}>
            <WaveIcon color="#FFF" />
            <Text style={styles.pttBannerText}>CB Radio Active</Text>
          </View>
          <TouchableOpacity style={styles.pttEndButton} onPress={handleStopPTT}>
            <Text style={styles.pttEndText}>End</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Section Title */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Conversations</Text>
    </View>
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => navigation.navigate('ChatDetail', { chatId: item.id })}
      activeOpacity={0.8}
    >
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={item.type === 'group' ? [colors.primary, colors.secondary] : ['#5856D6', '#3634A3']}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {item.type === 'group' ? (
            <GroupIcon color="#FFF" />
          ) : (
            <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
          )}
        </LinearGradient>
        {item.unreadCount > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: colors.danger }]}>
            <Text style={styles.unreadText}>{item.unreadCount > 9 ? '9+' : item.unreadCount}</Text>
          </View>
        )}
      </View>

      {/* Chat Info */}
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.chatTime, { color: colors.textTertiary }]}>
            {item.lastMessage ? formatTime(item.lastMessage.timestamp) : ''}
          </Text>
        </View>
        <View style={styles.chatPreview}>
          <Text
            style={[
              styles.chatLastMessage,
              { color: item.unreadCount > 0 ? colors.text : colors.textSecondary },
            ]}
            numberOfLines={1}
          >
            {item.lastMessage?.content || 'No messages yet'}
          </Text>
          {item.type === 'group' && (
            <View style={styles.memberCount}>
              <Text style={[styles.memberCountText, { color: colors.textTertiary }]}>
                {item.memberCount}
              </Text>
            </View>
          )}
        </View>

        {/* Sub-chats indicator */}
        {item.subChats && item.subChats.length > 0 && (
          <View style={styles.subChatsContainer}>
            <SubChatIcon color={colors.textTertiary} />
            <Text style={[styles.subChatsText, { color: colors.textTertiary }]}>
              {item.subChats.length} sub-chat{item.subChats.length > 1 ? 's' : ''}
            </Text>
            <ChevronIcon color={colors.textTertiary} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderPTTPanel = () => (
    <View style={[styles.pttPanel, { backgroundColor: colors.card }]}>
      <View style={styles.pttPanelHeader}>
        <Text style={[styles.pttPanelTitle, { color: colors.text }]}>CB Radio</Text>
        <TouchableOpacity onPress={() => setShowPTTPanel(false)}>
          <Text style={[styles.pttPanelClose, { color: colors.textSecondary }]}>Close</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.pttPanelSubtitle, { color: colors.textSecondary }]}>
        Hold to talk on a channel
      </Text>

      <View style={styles.pttChannels}>
        {chats.filter(c => c.type === 'group').slice(0, 4).map(chat => (
          <TouchableOpacity
            key={chat.id}
            style={[
              styles.pttChannelButton,
              {
                backgroundColor: activeChannel === chat.id ? colors.primary : 'rgba(255,255,255,0.1)',
                borderColor: colors.cardBorder,
              },
            ]}
            onPressIn={() => handleStartPTT(chat.id)}
            onPressOut={handleStopPTT}
          >
            <MicIcon color={activeChannel === chat.id ? '#FFF' : colors.text} />
            <Text
              style={[
                styles.pttChannelName,
                { color: activeChannel === chat.id ? '#FFF' : colors.text },
              ]}
              numberOfLines={1}
            >
              {chat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.pttHint, { color: colors.textTertiary }]}>
        Press and hold a channel to transmit
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
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
                <GroupIcon color={colors.textTertiary} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No conversations yet
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
                  Start a new chat or join a group
                </Text>
              </View>
            )
          }
        />

        {/* PTT Panel Modal */}
        {showPTTPanel && (
          <View style={styles.pttOverlay}>
            <TouchableOpacity
              style={styles.pttOverlayBackdrop}
              onPress={() => setShowPTTPanel(false)}
            />
            {renderPTTPanel()}
          </View>
        )}
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
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pttButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pttBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  pttBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pttBannerText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pttEndButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  pttEndText: {
    color: '#FFF',
    fontSize: 13,
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
  chatCard: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  chatInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: spacing.sm,
  },
  chatTime: {
    fontSize: 12,
  },
  chatPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatLastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: spacing.sm,
  },
  memberCount: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  memberCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  subChatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  subChatsText: {
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: spacing.xl * 3,
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  pttOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  pttOverlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pttPanel: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  pttPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  pttPanelTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  pttPanelClose: {
    fontSize: 16,
  },
  pttPanelSubtitle: {
    fontSize: 14,
    marginBottom: spacing.lg,
  },
  pttChannels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  pttChannelButton: {
    width: '48%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  pttChannelName: {
    fontSize: 14,
    fontWeight: '600',
  },
  pttHint: {
    fontSize: 12,
    textAlign: 'center',
  },
});
