import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

const CameraIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={32} height={32} fill={color}>
    <Path d="M12 15.2c1.767 0 3.2-1.433 3.2-3.2s-1.433-3.2-3.2-3.2-3.2 1.433-3.2 3.2 1.433 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </Svg>
);

const LocationIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

export default function ProfileSetupScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { username, email, password } = route.params || {};

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('Interests', {
        username,
        email,
        password,
        displayName: displayName || username,
        bio,
        location,
      });
    });
  };

  const handleSkip = () => {
    navigation.navigate('Interests', {
      username,
      email,
      password,
      displayName: username,
      bio: '',
      location: '',
    });
  };

  return (
    <LinearGradient colors={[colors.background, '#0a0a0a']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
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
            <Text style={[styles.title, { color: colors.text }]}>Set Up Profile</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Tell the community about yourself
            </Text>

            {/* Avatar */}
            <TouchableOpacity style={[styles.avatarContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.avatarGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.avatarInitial}>
                  {(displayName || username || 'U')[0].toUpperCase()}
                </Text>
              </LinearGradient>
              <View style={[styles.cameraButton, { backgroundColor: colors.primary }]}>
                <CameraIcon color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={[styles.avatarHint, { color: colors.textTertiary }]}>
              Tap to add profile photo
            </Text>

            {/* Display Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Display Name</Text>
              <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={username || 'Your name'}
                  placeholderTextColor={colors.textTertiary}
                  value={displayName}
                  onChangeText={setDisplayName}
                />
              </View>
            </View>

            {/* Bio */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Bio</Text>
                <Text style={[styles.charCount, { color: colors.textTertiary }]}>{bio.length}/150</Text>
              </View>
              <View style={[styles.textAreaContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.textArea, { color: colors.text }]}
                  placeholder="Tell us about yourself and your rides..."
                  placeholderTextColor={colors.textTertiary}
                  value={bio}
                  onChangeText={(text) => setBio(text.slice(0, 150))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Location</Text>
              <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <LocationIcon color={colors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="City, State"
                  placeholderTextColor={colors.textTertiary}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            {/* Continue Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: spacing.lg }}>
              <TouchableOpacity
                style={[styles.continueButton, { backgroundColor: colors.primary }]}
                onPress={handleContinue}
                activeOpacity={0.9}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  keyboardView: { flex: 1 },
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
    width: 30,
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
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: spacing.sm,
  },
  avatarGradient: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarHint: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  charCount: {
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    height: 56,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  textAreaContainer: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    minHeight: 120,
  },
  textArea: {
    fontSize: 16,
    lineHeight: 22,
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
    color: '#FFF',
  },
});
