import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

const BackIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const CheckIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);

const interests = [
  { id: 'jdm', label: 'JDM', emoji: '🇯🇵', gradient: ['#FF3B30', '#D70015'] },
  { id: 'euro', label: 'European', emoji: '🇪🇺', gradient: ['#007AFF', '#0051D5'] },
  { id: 'american', label: 'American Muscle', emoji: '🇺🇸', gradient: ['#FF9500', '#CC7700'] },
  { id: 'tuning', label: 'Tuning & Mods', emoji: '🔧', gradient: ['#34C759', '#248A3D'] },
  { id: 'racing', label: 'Track Days', emoji: '🏁', gradient: ['#FF2D55', '#D70040'] },
  { id: 'drifting', label: 'Drifting', emoji: '💨', gradient: ['#5856D6', '#3634A3'] },
  { id: 'stance', label: 'Stance', emoji: '⬇️', gradient: ['#AF52DE', '#8B3FBF'] },
  { id: 'offroad', label: 'Off-Road', emoji: '🏔️', gradient: ['#8B5A2B', '#654321'] },
  { id: 'classic', label: 'Classic Cars', emoji: '🚗', gradient: ['#FFD700', '#DAA520'] },
  { id: 'exotic', label: 'Exotics', emoji: '💎', gradient: ['#00CED1', '#008B8B'] },
  { id: 'ev', label: 'Electric', emoji: '⚡', gradient: ['#32CD32', '#228B22'] },
  { id: 'photography', label: 'Car Photography', emoji: '📸', gradient: ['#FF69B4', '#DB7093'] },
];

export default function InterestsScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { username, email, password, displayName, bio, location } = route.params || {};
  const [selected, setSelected] = useState([]);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const toggleInterest = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('CarSetup', {
        username,
        email,
        password,
        displayName,
        bio,
        location,
        interests: selected,
      });
    });
  };

  const handleSkip = () => {
    navigation.navigate('CarSetup', {
      username,
      email,
      password,
      displayName,
      bio,
      location,
      interests: [],
    });
  };

  return (
    <LinearGradient colors={[colors.background, '#0a0a0a']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon color={colors.text} />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, { backgroundColor: colors.success }]} />
            <View style={[styles.progressLine, { backgroundColor: colors.success }]} />
            <View style={[styles.progressDot, { backgroundColor: colors.success }]} />
            <View style={[styles.progressLine, { backgroundColor: colors.primary }]} />
            <View style={[styles.progressDot, { backgroundColor: colors.primary }]} />
            <View style={[styles.progressLine, { backgroundColor: colors.cardBorder }]} />
            <View style={[styles.progressDot, { backgroundColor: colors.cardBorder }]} />
          </View>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.title, { color: colors.text }]}>What are you into?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select your interests to personalize your feed
          </Text>

          <View style={styles.interestsGrid}>
            {interests.map((interest) => {
              const isSelected = selected.includes(interest.id);
              return (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestCard,
                    {
                      backgroundColor: isSelected ? colors.primary + '20' : colors.card,
                      borderColor: isSelected ? colors.primary : colors.cardBorder,
                    },
                  ]}
                  onPress={() => toggleInterest(interest.id)}
                  activeOpacity={0.7}
                >
                  {isSelected && (
                    <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                      <CheckIcon color="#FFF" />
                    </View>
                  )}
                  <LinearGradient
                    colors={interest.gradient}
                    style={styles.emojiContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.emoji}>{interest.emoji}</Text>
                  </LinearGradient>
                  <Text
                    style={[
                      styles.interestLabel,
                      { color: isSelected ? colors.primary : colors.text },
                    ]}
                  >
                    {interest.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.selectionCount, { color: colors.textTertiary }]}>
            {selected.length} selected {selected.length >= 3 ? '✓' : '(select at least 3)'}
          </Text>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                {
                  backgroundColor: selected.length >= 3 ? colors.primary : colors.card,
                  borderColor: colors.cardBorder,
                  borderWidth: selected.length >= 3 ? 0 : 1,
                },
              ]}
              onPress={handleContinue}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.continueButtonText,
                  { color: selected.length >= 3 ? '#FFF' : colors.textSecondary },
                ]}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  progressLine: {
    width: 20,
    height: 2,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  interestCard: {
    width: '47%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: 28,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectionCount: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  continueButton: {
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
