import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const HeartIcon = ({ filled }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={filled ? colors.danger : 'none'} stroke={filled ? colors.danger : colors.text} strokeWidth={2}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommentIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={colors.text} strokeWidth={2}>
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

const ShareIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={colors.text} strokeWidth={2}>
    <Path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
  </Svg>
);

const comments = [
  { id: 1, user: '@speed_demon', text: 'That setup looks clean!', time: '1h ago', likes: 12 },
  { id: 2, user: '@turbo_tech', text: 'What boost are you running?', time: '2h ago', likes: 8 },
  { id: 3, user: '@track_day', text: 'Need to see this at the track!', time: '3h ago', likes: 15 },
];

export default function PostDetailScreen({ navigation, route }) {
  const post = route.params?.post || {
    id: 1,
    title: 'New Turbo Install Complete',
    author: '@boost_junkie',
    time: '2h ago',
    description: 'Finally got the GT35R mounted. Making 450whp on pump gas! The install took about 3 days with all the supporting mods. Tuning session next week.',
    category: 'builds',
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ['turbo', 'build', 'power'],
    gradient: ['#007AFF', '#0051D5'],
  };

  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.postCard}>
          <LinearGradient
            colors={post.gradient || [colors.primary, colors.primaryDark]}
            style={styles.postGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.postContent}>
            <View style={styles.authorRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{post.author[1].toUpperCase()}</Text>
              </View>
              <View>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.time}>{post.time}</Text>
              </View>
            </View>

            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>

            <View style={styles.tagsRow}>
              {post.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setLiked(!liked)}
              >
                <HeartIcon filled={liked} />
                <Text style={styles.actionText}>{liked ? post.likes + 1 : post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <CommentIcon />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ShareIcon />
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
        <View style={styles.commentsContainer}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>{comment.user[1].toUpperCase()}</Text>
              </View>
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <TouchableOpacity style={styles.likeButton}>
                  <HeartIcon filled={false} />
                  <Text style={styles.likeCount}>{comment.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor={colors.textTertiary}
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Post</Text>
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
  postCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  postGradient: {
    height: 150,
    opacity: 0.6,
  },
  postContent: {
    padding: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  time: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
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
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
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
  commentsContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  commentAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  commentContent: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.sm,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  commentTime: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  commentText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  likeCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sendButton: {
    marginLeft: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  sendText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
