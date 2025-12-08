import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles/theme';

const DraftsIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </Svg>
);

const ToolIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </Svg>
);

const FlagIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
  </Svg>
);

const BoltIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </Svg>
);

const PhotoIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </Svg>
);

const CameraIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={48} height={48} fill={color}>
    <Path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </Svg>
);

const categories = [
  { id: 'builds', label: 'Builds', icon: ToolIcon },
  { id: 'meets', label: 'Meets', icon: FlagIcon },
  { id: 'racing', label: 'Racing', icon: BoltIcon },
  { id: 'photos', label: 'Photos', icon: PhotoIcon },
];

export default function PostScreen({ navigation }) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('builds');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animations
  const submitButtonScale = useRef(new Animated.Value(1)).current;
  const categoryAnimations = useRef(
    categories.reduce((acc, cat) => {
      acc[cat.id] = new Animated.Value(1);
      return acc;
    }, {})
  ).current;

  const animatePress = (animation, callback) => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(callback);
  };

  const handleCategorySelect = (categoryId) => {
    animatePress(categoryAnimations[categoryId], () => {
      setSelectedCategory(categoryId);
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please add a title for your post.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Missing Description', 'Please add a description for your post.');
      return;
    }

    setIsSubmitting(true);
    animatePress(submitButtonScale, () => {
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          'Post Created!',
          'Your post has been published successfully.',
          [
            {
              text: 'View Post',
              onPress: () => {
                setTitle('');
                setDescription('');
                setTags([]);
                setSelectedCategory('builds');
              },
            },
            {
              text: 'OK',
              style: 'cancel',
              onPress: () => {
                setTitle('');
                setDescription('');
                setTags([]);
                setSelectedCategory('builds');
              },
            },
          ]
        );
      }, 500);
    });
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Add Photo',
      'Choose a source',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera functionality would open here') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery functionality would open here') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Create Post"
        rightIcon={<DraftsIcon />}
        onRightPress={() => Alert.alert('Drafts', 'Your drafts would appear here')}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Category Selection */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <Animated.View
                    key={cat.id}
                    style={{ transform: [{ scale: categoryAnimations[cat.id] }], flex: 1, minWidth: '45%' }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.categoryOption,
                        { backgroundColor: colors.card, borderColor: colors.cardBorder },
                        isSelected && { borderColor: colors.primary, backgroundColor: `${colors.primary}33` },
                      ]}
                      onPress={() => handleCategorySelect(cat.id)}
                      activeOpacity={0.7}
                    >
                      <IconComponent color={colors.primary} />
                      <Text style={[styles.categoryLabel, { color: colors.text }]}>{cat.label}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </View>

          {/* Image Upload */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Photo</Text>
            <TouchableOpacity
              style={[styles.imageUpload, { borderColor: colors.cardBorder }]}
              activeOpacity={0.7}
              onPress={handleImageUpload}
            >
              <CameraIcon color={colors.textTertiary} />
              <Text style={[styles.imageUploadText, { color: colors.textSecondary }]}>Tap to add a photo</Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Title</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.cardBorder, color: colors.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder="What's your post about?"
              placeholderTextColor={colors.textTertiary}
              maxLength={100}
            />
            <Text style={[styles.charCount, { color: colors.textTertiary }]}>{title.length}/100</Text>
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colors.card, borderColor: colors.cardBorder, color: colors.text }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Share the details..."
              placeholderTextColor={colors.textTertiary}
              multiline
              maxLength={500}
            />
            <Text style={[styles.charCount, { color: colors.textTertiary }]}>{description.length}/500</Text>
          </View>

          {/* Tags */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Tags</Text>
            <View style={[styles.tagsContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              {tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tagChip, { backgroundColor: `${colors.primary}4D`, borderColor: `${colors.primary}80` }]}
                  onPress={() => removeTag(index)}
                >
                  <Text style={[styles.tagChipText, { color: colors.primary }]}>#{tag}</Text>
                  <Text style={[styles.tagRemove, { color: colors.primary }]}>×</Text>
                </TouchableOpacity>
              ))}
              <TextInput
                style={[styles.tagInput, { color: colors.text }]}
                value={tagInput}
                onChangeText={setTagInput}
                placeholder={tags.length < 5 ? "Add tags..." : "Max 5 tags"}
                placeholderTextColor={colors.textTertiary}
                onSubmitEditing={handleAddTag}
                editable={tags.length < 5}
              />
            </View>
          </View>

          {/* Submit Button */}
          <Animated.View style={{ transform: [{ scale: submitButtonScale }] }}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 }
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={[styles.submitButtonText, { color: colors.text }]}>
                {isSubmitting ? 'Posting...' : 'Post'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  formContainer: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  formGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryOption: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  imageUpload: {
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  imageUploadText: {
    fontSize: 14,
  },
  input: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.sm,
    minHeight: 52,
    alignItems: 'center',
    gap: spacing.xs,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  tagChipText: {
    fontSize: 14,
  },
  tagRemove: {
    fontSize: 16,
    fontWeight: '600',
  },
  tagInput: {
    flex: 1,
    minWidth: 80,
    fontSize: 14,
    padding: spacing.xs,
  },
  submitButton: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    ...shadows.button,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
