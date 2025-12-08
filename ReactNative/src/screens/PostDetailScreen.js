import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const HeartIcon = ({ filled }) => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill={filled ? colors.danger : 'none'} stroke={filled ? colors.danger : colors.text} strokeWidth={2}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommentIcon = () => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={colors.text} strokeWidth={2}>
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

const ShareIcon = () => (
  <Svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={colors.text} strokeWidth={2}>
    <Path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
  </Svg>
);

const initialComments = [
  { id: 1, user: '@speed_demon', text: 'Clean setup', time: '1h', likes: 12, liked: false },
  { id: 2, user: '@turbo_tech', text: 'What boost?', time: '2h', likes: 8, liked: false },
  { id: 3, user: '@track_day', text: 'Bring it to the track', time: '3h', likes: 15, liked: false },
];

export default function PostDetailScreen({ navigation, route }) {
  const post = route.params?.post || {
    id: 1, title: 'GT35R Mounted', author: '@boost_junkie', time: '2h',
    description: '450whp on pump. Tuning next week.', category: 'builds',
    likes: 234, comments: 45, shares: 12, tags: ['turbo', 'build'],
    gradient: ['#007AFF', '#0051D5'],
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(initialComments);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleCommentLike = (id) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
    ));
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment = { id: Date.now(), user: '@you', text: commentText.trim(), time: 'now', likes: 0, liked: false };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const sharePost = () => Alert.alert('Shared', 'Link copied');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.postCard}>
          <LinearGradient colors={post.gradient || [colors.primary, colors.primaryDark]} style={styles.postGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
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
              {post.tags.map((tag, i) => (
                <View key={i} style={styles.tag}><Text style={styles.tagText}>#{tag}</Text></View>
              ))}
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton} onPress={toggleLike}>
                <HeartIcon filled={liked} />
                <Text style={[styles.actionText, liked && { color: colors.danger }]}>{likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <CommentIcon />
                <Text style={styles.actionText}>{comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={sharePost}>
                <ShareIcon />
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Comments</Text>
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
                <TouchableOpacity style={styles.likeButton} onPress={() => toggleCommentLike(comment.id)}>
                  <HeartIcon filled={comment.liked} />
                  <Text style={styles.likeCount}>{comment.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input} placeholder="Comment..." placeholderTextColor={colors.textTertiary}
          value={commentText} onChangeText={setCommentText} onSubmitEditing={addComment} returnKeyType="send"
        />
        <TouchableOpacity style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]} onPress={addComment} disabled={!commentText.trim()}>
          <Text style={styles.sendText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  placeholder: { width: 40 },
  scroll: { flex: 1 },
  postCard: { marginHorizontal: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.cardBorder, overflow: 'hidden', marginBottom: spacing.lg },
  postGradient: { height: 120, opacity: 0.6 },
  postContent: { padding: spacing.md },
  authorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  avatarText: { fontSize: 16, fontWeight: '700', color: colors.text },
  author: { fontSize: 15, fontWeight: '600', color: colors.text },
  time: { fontSize: 12, color: colors.textSecondary },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  description: { fontSize: 15, color: colors.textSecondary, lineHeight: 22, marginBottom: spacing.md },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  tag: { backgroundColor: 'rgba(0, 122, 255, 0.2)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.sm },
  tagText: { fontSize: 12, color: colors.primary, fontWeight: '500' },
  actionsRow: { flexDirection: 'row', gap: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.cardBorder },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  actionText: { fontSize: 14, color: colors.text, fontWeight: '500' },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  commentsContainer: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  commentItem: { flexDirection: 'row', marginBottom: spacing.md },
  commentAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0, 122, 255, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  commentAvatarText: { fontSize: 12, fontWeight: '600', color: colors.primary },
  commentContent: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.cardBorder, padding: spacing.sm },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  commentUser: { fontSize: 13, fontWeight: '600', color: colors.text },
  commentTime: { fontSize: 11, color: colors.textTertiary },
  commentText: { fontSize: 14, color: colors.textSecondary, lineHeight: 18 },
  likeButton: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  likeCount: { fontSize: 11, color: colors.textSecondary },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.cardBorder, backgroundColor: colors.background },
  input: { flex: 1, height: 40, backgroundColor: colors.card, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, color: colors.text, fontSize: 14, borderWidth: 1, borderColor: colors.cardBorder },
  sendButton: { marginLeft: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  sendButtonDisabled: { opacity: 0.5 },
  sendText: { fontSize: 14, fontWeight: '600', color: colors.text },
});
