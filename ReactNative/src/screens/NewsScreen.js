/**
 * BURNOUT APP - News Screen (Autobits)
 *
 * Long-form automotive news and articles.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { feedService } from '../services';
import { spacing, borderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');

const BookmarkIcon = ({ color, filled }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={filled ? color : 'none'} stroke={color} strokeWidth={2}>
    <Path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </Svg>
);

const ShareIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
  </Svg>
);

const ClockIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={14} height={14} fill={color}>
    <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </Svg>
);

const FireIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={16} height={16} fill={color}>
    <Path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
  </Svg>
);

export default function NewsScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const gradientColors = isDarkMode
    ? [colors.background, '#0a0a0a']
    : [colors.background, '#E5E5EA'];

  const [autobits, setAutobits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'features', label: 'Features' },
    { id: 'events', label: 'Events' },
  ];

  const loadAutobits = useCallback(async () => {
    try {
      const result = await feedService.getAutobits(1);
      setAutobits(result.autobits);
    } catch (error) {
      console.error('Failed to load autobits:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAutobits();
  }, [loadAutobits]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAutobits();
    setRefreshing(false);
  };

  const handleSaveAutobit = async (autobitId) => {
    try {
      await feedService.saveAutobit(autobitId);
      setAutobits(prev =>
        prev.map(a =>
          a.id === autobitId ? { ...a, isSaved: !a.isSaved } : a
        )
      );
    } catch (error) {
      console.error('Failed to save autobit:', error);
    }
  };

  const formatReadTime = (minutes) => `${minutes} min read`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderFeaturedArticle = () => {
    if (autobits.length === 0) return null;

    const featured = autobits[0];

    return (
      <TouchableOpacity
        style={styles.featuredContainer}
        onPress={() => navigation.navigate('ArticleDetail', { articleId: featured.id })}
        activeOpacity={0.9}
      >
        <View style={[styles.featuredImageContainer, { backgroundColor: colors.card }]}>
          {featured.coverImage ? (
            <Image source={{ uri: featured.coverImage }} style={styles.featuredImage} />
          ) : (
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.featuredImage}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.featuredOverlay}
          >
            <View style={styles.featuredBadge}>
              <FireIcon color="#FFF" />
              <Text style={styles.featuredBadgeText}>FEATURED</Text>
            </View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredExcerpt} numberOfLines={2}>
              {featured.excerpt}
            </Text>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredSource}>{featured.source}</Text>
              <View style={styles.featuredDot} />
              <View style={styles.featuredReadTime}>
                <ClockIcon color="rgba(255,255,255,0.7)" />
                <Text style={styles.featuredReadTimeText}>
                  {formatReadTime(featured.readTime)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryPills = () => (
    <View style={styles.categoriesContainer}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryPill,
              {
                backgroundColor: activeCategory === item.id ? colors.primary : colors.card,
                borderColor: activeCategory === item.id ? colors.primary : colors.cardBorder,
              },
            ]}
            onPress={() => setActiveCategory(item.id)}
          >
            <Text
              style={[
                styles.categoryPillText,
                { color: activeCategory === item.id ? '#FFF' : colors.text },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderArticleCard = ({ item, index }) => {
    // Skip first item since it's featured
    if (index === 0) return null;

    return (
      <TouchableOpacity
        style={[styles.articleCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={() => navigation.navigate('ArticleDetail', { articleId: item.id })}
        activeOpacity={0.8}
      >
        <View style={styles.articleContent}>
          <View style={styles.articleTextContent}>
            <View style={styles.articleMeta}>
              <Text style={[styles.articleSource, { color: colors.primary }]}>{item.source}</Text>
              <Text style={[styles.articleDate, { color: colors.textTertiary }]}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
            <Text style={[styles.articleTitle, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.articleExcerpt, { color: colors.textSecondary }]} numberOfLines={2}>
              {item.excerpt}
            </Text>
            <View style={styles.articleFooter}>
              <View style={styles.articleReadTime}>
                <ClockIcon color={colors.textTertiary} />
                <Text style={[styles.articleReadTimeText, { color: colors.textTertiary }]}>
                  {formatReadTime(item.readTime)}
                </Text>
              </View>
              <View style={styles.articleActions}>
                <TouchableOpacity
                  style={styles.articleActionBtn}
                  onPress={() => handleSaveAutobit(item.id)}
                >
                  <BookmarkIcon color={item.isSaved ? colors.primary : colors.textSecondary} filled={item.isSaved} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.articleActionBtn}>
                  <ShareIcon color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {item.coverImage && (
            <Image source={{ uri: item.coverImage }} style={styles.articleThumbnail} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      {renderFeaturedArticle()}
      {renderCategoryPills()}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest News</Text>
    </View>
  );

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Autobits</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your daily automotive news
          </Text>
        </View>

        <FlatList
          data={autobits}
          keyExtractor={(item) => item.id}
          renderItem={renderArticleCard}
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
                  No news articles yet
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: spacing.xl * 2,
  },
  featuredContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  featuredImageContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    height: 280,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.sm,
  },
  featuredBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  featuredExcerpt: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredSource: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },
  featuredDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: spacing.sm,
  },
  featuredReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredReadTimeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  categoriesContainer: {
    marginTop: spacing.lg,
  },
  categoriesList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  articleCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  articleContent: {
    flexDirection: 'row',
  },
  articleTextContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  articleSource: {
    fontSize: 12,
    fontWeight: '600',
  },
  articleDate: {
    fontSize: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  articleExcerpt: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  articleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  articleReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  articleReadTimeText: {
    fontSize: 12,
  },
  articleActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  articleActionBtn: {
    padding: spacing.xs,
  },
  articleThumbnail: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
  },
  emptyContainer: {
    padding: spacing.xl * 2,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
