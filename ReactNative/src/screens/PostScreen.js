import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

const DraftsIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </Svg>
);

const ToolIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.primary}>
    <Path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </Svg>
);

const FlagIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.primary}>
    <Path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
  </Svg>
);

const BoltIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.primary}>
    <Path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </Svg>
);

const PhotoIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.primary}>
    <Path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </Svg>
);

const CameraIcon = () => (
  <Svg viewBox="0 0 24 24" width={48} height={48} fill={colors.textTertiary}>
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
  const [selectedCategory, setSelectedCategory] = useState('builds');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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
    // Handle post submission
    alert('Post created successfully!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Create Post"
        rightIcon={<DraftsIcon />}
        onRightPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Category Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryOption,
                      selectedCategory === cat.id && styles.categoryOptionActive,
                    ]}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.7}
                  >
                    <IconComponent />
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Image Upload */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Photo</Text>
            <TouchableOpacity style={styles.imageUpload} activeOpacity={0.7}>
              <CameraIcon />
              <Text style={styles.imageUploadText}>Tap to add a photo</Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="What's your post about?"
              placeholderTextColor={colors.textTertiary}
              maxLength={100}
            />
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Share the details..."
              placeholderTextColor={colors.textTertiary}
              multiline
              maxLength={500}
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          {/* Tags */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tagChip}
                  onPress={() => removeTag(index)}
                >
                  <Text style={styles.tagChipText}>#{tag}</Text>
                  <Text style={styles.tagRemove}>x</Text>
                </TouchableOpacity>
              ))}
              <TextInput
                style={styles.tagInput}
                value={tagInput}
                onChangeText={setTagInput}
                placeholder="Add tags..."
                placeholderTextColor={colors.textTertiary}
                onSubmitEditing={handleAddTag}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Post</Text>
          </TouchableOpacity>
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
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryOption: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryOptionActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  imageUpload: {
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  imageUploadText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'right',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.sm,
    minHeight: 52,
    alignItems: 'center',
    gap: spacing.xs,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  tagChipText: {
    fontSize: 14,
    color: colors.primary,
  },
  tagRemove: {
    fontSize: 12,
    color: colors.primary,
    opacity: 0.7,
  },
  tagInput: {
    flex: 1,
    minWidth: 80,
    fontSize: 14,
    color: colors.text,
    padding: spacing.xs,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    ...shadows.button,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
});
