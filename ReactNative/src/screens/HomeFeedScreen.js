/**
 * BURNOUT APP - Home Feed Screen
 *
 * Main feed with Posts and Sparks tabs.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { useSaved } from '../context/SavedContext';
import { feedService } from '../services';
import { spacing, borderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');

// Icons
const BellIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </Svg>
);

const HeartIcon = ({ color, filled }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={filled ? color : 'none'} stroke={color} strokeWidth={2}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommentIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={color}>
    <Path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </Svg>
);

const ShareIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={color}>
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
  </Svg>
);

const BookmarkIcon = ({ color, filled }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={filled ? color : 'none'} stroke={color} strokeWidth={2}>
    <Path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </Svg>
);

const VerifiedIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </Svg>
);

const ProfileIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
);

export default function HomeFeedScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const { savedPosts, toggleSavePost } = useSaved();
  const gradientColors = isDarkMode
    ? [colors.background, '#0a0a0a']
    : [colors.background, '#E5E5EA'];

  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = useCallback(async () => {
    try {
      const [postsResult, sparksResult] = await Promise.all([
        feedService.getFeed(1),
        feedService.getSparks(1),
      ]);
      setPosts(postsResult.posts);
      setSparks(sparksResult.sparks);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  };

  const handleLikePost = async (postId) => {
    try {
      await feedService.likePost(postId);
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, isLiked: !p.isLiked, likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1 }
            : p
        )
      );
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleLikeSpark = async (sparkId) => {
    try {
      await feedService.likeSpark(sparkId);
      setSparks(prev =>
        prev.map(s =>
          s.id === sparkId
            ? { ...s, isLiked: !s.isLiked, likeCount: s.isLiked ? s.likeCount - 1 : s.likeCount + 1 }
            : s
        )
      );
    } catch (error) {
      console.error('Failed to like spark:', error);
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
        <TouchableOpacity
          style={[styles.profileButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <ProfileIcon color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.logoText, { color: colors.text }]}>BURNOUT</Text>
        <TouchableOpacity
          style={[styles.notifButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Notifications')}
        >
          <BellIcon color={colors.text} />
          <View style={[styles.notifBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.notifBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { borderBottomColor: colors.cardBorder }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'posts' ? colors.text : colors.textSecondary },
            ]}
          >
            Posts
          </Text>
          {activeTab === 'posts' && (
            <View style={[styles.tabIndicator, { backgroundColor: colors.primary }]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sparks' && styles.activeTab]}
          onPress={() => setActiveTab('sparks')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'sparks' ? colors.text : colors.textSecondary },
            ]}
          >
            Sparks
          </Text>
          {activeTab === 'sparks' && (
            <View style={[styles.tabIndicator, { backgroundColor: colors.primary }]} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPostCard = ({ item }) => {
    const isSaved = savedPosts.some(p => p.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.postCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
        activeOpacity={0.9}
      >
        {/* Post Header */}
        <View style={styles.postHeader}>
          <TouchableOpacity style={styles.authorInfo}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.authorAvatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.authorInitial}>{item.author[0].toUpperCase()}</Text>
            </LinearGradient>
            <View>
              <View style={styles.authorNameRow}>
                <Text style={[styles.authorName, { color: colors.text }]}>{item.author}</Text>
                {item.verified && <VerifiedIcon color={colors.primary} />}
              </View>
              <Text style={[styles.postTime, { color: colors.textTertiary }]}>
                {formatTime(item.createdAt)} {item.car && `• ${item.car}`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <Text style={[styles.postContent, { color: colors.text }]} numberOfLines={4}>
          {item.content}
        </Text>

        {/* Post Images */}
        {item.images && item.images.length > 0 && (
          <View style={styles.postImagesContainer}>
            {item.images.length === 1 ? (
              <Image source={{ uri: item.images[0] }} style={styles.postImageSingle} />
            ) : (
              <View style={styles.postImagesGrid}>
                {item.images.slice(0, 4).map((img, idx) => (
                  <View key={idx} style={styles.postImageWrapper}>
                    <Image source={{ uri: img }} style={styles.postImageGrid} />
                    {idx === 3 && item.images.length > 4 && (
                      <View style={styles.moreImagesOverlay}>
                        <Text style={styles.moreImagesText}>+{item.images.length - 4}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLikePost(item.id)}
          >
            <HeartIcon color={item.isLiked ? colors.primary : colors.textSecondary} filled={item.isLiked} />
            <Text style={[styles.actionCount, { color: colors.textSecondary }]}>{item.likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <CommentIcon color={colors.textSecondary} />
            <Text style={[styles.actionCount, { color: colors.textSecondary }]}>{item.commentCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ShareIcon color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.actionSpacer} />
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleSavePost(item)}
          >
            <BookmarkIcon color={isSaved ? colors.primary : colors.textSecondary} filled={isSaved} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSparkCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.sparkCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      activeOpacity={0.9}
    >
      {/* Spark Header */}
      <View style={styles.sparkHeader}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.sparkAvatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.sparkInitial}>{item.author[0].toUpperCase()}</Text>
        </LinearGradient>
        <View style={styles.sparkAuthorInfo}>
          <View style={styles.sparkNameRow}>
            <Text style={[styles.sparkAuthorName, { color: colors.text }]}>{item.author}</Text>
            {item.verified && <VerifiedIcon color={colors.primary} />}
          </View>
          <Text style={[styles.sparkTime, { color: colors.textTertiary }]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>

      {/* Spark Content */}
      <Text style={[styles.sparkContent, { color: colors.text }]}>{item.content}</Text>

      {/* Spark Actions */}
      <View style={styles.sparkActions}>
        <TouchableOpacity
          style={styles.sparkActionButton}
          onPress={() => handleLikeSpark(item.id)}
        >
          <HeartIcon color={item.isLiked ? colors.primary : colors.textSecondary} filled={item.isLiked} />
          <Text style={[styles.sparkActionCount, { color: colors.textSecondary }]}>{item.likeCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sparkActionButton}>
          <CommentIcon color={colors.textSecondary} />
          <Text style={[styles.sparkActionCount, { color: colors.textSecondary }]}>{item.replyCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sparkActionButton}>
          <ShareIcon color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <FlatList
          data={activeTab === 'posts' ? posts : sparks}
          keyExtractor={(item) => item.id}
          renderItem={activeTab === 'posts' ? renderPostCard : renderSparkCard}
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
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  {activeTab === 'posts' ? 'No posts yet' : 'No sparks yet'}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 3,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: 60,
    borderRadius: 2,
  },
  postCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  authorInitial: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  postTime: {
    fontSize: 13,
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  postImagesContainer: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  postImageSingle: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
  },
  postImagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  postImageWrapper: {
    width: '49.5%',
    height: 120,
    position: 'relative',
  },
  postImageGrid: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  moreImagesOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  moreImagesText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  actionCount: {
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  actionSpacer: {
    flex: 1,
  },
  sparkCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  sparkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sparkAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  sparkInitial: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sparkAuthorInfo: {
    flex: 1,
  },
  sparkNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sparkAuthorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  sparkTime: {
    fontSize: 12,
    marginTop: 1,
  },
  sparkContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  sparkActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sparkActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  sparkActionCount: {
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    padding: spacing.xl * 2,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
