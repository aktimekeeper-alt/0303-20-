import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { useSaved } from '../context/SavedContext';
import { spacing, borderRadius } from '../styles/theme';

const HeartIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </Svg>
);

const CommentIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </Svg>
);

const ShareIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </Svg>
);

const BookmarkIcon = ({ color, filled }) => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill={filled ? color : 'none'} stroke={color} strokeWidth={2}>
    <Path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </Svg>
);

export default function ContentCard({ post, onPress }) {
  const { colors } = useTheme();
  const { isPostSaved, toggleSavePost } = useSaved();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const saved = isPostSaved(post.id);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.98, friction: 3, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSavePost(post);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={post.gradient}
          style={styles.imageGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{post.author} · {post.time}</Text>
          <Text style={[styles.description, { color: colors.textTertiary }]} numberOfLines={2}>{post.description}</Text>

          <View style={styles.tagsContainer}>
            {post.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: `${colors.primary}33` }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>#{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <HeartIcon color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>{post.likes}</Text>
            </View>
            <View style={styles.stat}>
              <CommentIcon color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>{post.comments}</Text>
            </View>
            <View style={styles.stat}>
              <ShareIcon color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>{post.shares}</Text>
            </View>
            <TouchableOpacity style={styles.stat} onPress={handleSave}>
              <BookmarkIcon color={saved ? colors.primary : colors.textSecondary} filled={saved} />
              <Text style={[styles.statText, { color: saved ? colors.primary : colors.textSecondary }]}>
                {saved ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: borderRadius.xl, borderWidth: 1, overflow: 'hidden', marginBottom: spacing.md },
  imageGradient: { height: 120 },
  content: { padding: spacing.md },
  title: { fontSize: 18, fontWeight: '700', marginBottom: spacing.xs },
  subtitle: { fontSize: 14, marginBottom: spacing.sm },
  description: { fontSize: 14, lineHeight: 20, marginBottom: spacing.sm },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.sm },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  tagText: { fontSize: 12, fontWeight: '500' },
  statsContainer: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.sm },
  stat: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  statText: { fontSize: 14 },
});
