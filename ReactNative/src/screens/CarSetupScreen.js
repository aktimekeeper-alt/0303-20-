import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

const BackIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const CarIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={48} height={48} fill={color}>
    <Path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </Svg>
);

const popularMakes = ['Nissan', 'Toyota', 'Honda', 'BMW', 'Ford', 'Chevrolet', 'Mazda', 'Subaru', 'Porsche', 'Mercedes'];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export default function CarSetupScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { username, email, password, displayName, bio, location } = route.params || {};

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [showMakes, setShowMakes] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleFinish = async () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(async () => {
      // Save user data
      const userData = {
        id: Date.now(),
        username: `@${username}`,
        email,
        displayName: displayName || username,
        bio,
        location,
        car: make && model ? { make, model, year: parseInt(year) || null } : null,
        stats: { posts: 0, followers: 0, following: 0, meetsAttended: 0, trackDays: 0 },
        mods: [],
        createdAt: new Date().toISOString(),
      };

      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');

        Alert.alert(
          'Welcome to Burnout!',
          'Your account has been created successfully.',
          [{ text: 'Get Started', onPress: () => navigation.replace('Main') }]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    });
  };

  const handleSkip = async () => {
    const userData = {
      id: Date.now(),
      username: `@${username}`,
      email,
      displayName: displayName || username,
      bio,
      location,
      car: null,
      stats: { posts: 0, followers: 0, following: 0, meetsAttended: 0, trackDays: 0 },
      mods: [],
      createdAt: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const filteredMakes = make
    ? popularMakes.filter(m => m.toLowerCase().includes(make.toLowerCase()))
    : popularMakes;

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
              <View style={[styles.progressLine, { backgroundColor: colors.success }]} />
              <View style={[styles.progressDot, { backgroundColor: colors.success }]} />
              <View style={[styles.progressLine, { backgroundColor: colors.primary }]} />
              <View style={[styles.progressDot, { backgroundColor: colors.primary }]} />
            </View>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={[styles.title, { color: colors.text }]}>Add Your Ride</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Show off what you're driving
            </Text>

            {/* Car Icon */}
            <View style={styles.carIconContainer}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.carIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <CarIcon color="#FFF" />
              </LinearGradient>
            </View>

            {/* Make */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Make</Text>
              <TouchableOpacity
                style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                onPress={() => setShowMakes(!showMakes)}
              >
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="e.g. Nissan, BMW, Toyota"
                  placeholderTextColor={colors.textTertiary}
                  value={make}
                  onChangeText={(text) => {
                    setMake(text);
                    setShowMakes(true);
                  }}
                  onFocus={() => setShowMakes(true)}
                />
              </TouchableOpacity>
              {showMakes && (
                <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                  <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                    {filteredMakes.map((m) => (
                      <TouchableOpacity
                        key={m}
                        style={[styles.dropdownItem, { borderBottomColor: colors.cardBorder }]}
                        onPress={() => {
                          setMake(m);
                          setShowMakes(false);
                        }}
                      >
                        <Text style={[styles.dropdownText, { color: colors.text }]}>{m}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Model */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Model</Text>
              <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="e.g. 370Z, M3, Supra"
                  placeholderTextColor={colors.textTertiary}
                  value={model}
                  onChangeText={setModel}
                  onFocus={() => setShowMakes(false)}
                />
              </View>
            </View>

            {/* Year */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Year</Text>
              <TouchableOpacity
                style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                onPress={() => {
                  setShowYears(!showYears);
                  setShowMakes(false);
                }}
              >
                <Text style={[styles.input, { color: year ? colors.text : colors.textTertiary }]}>
                  {year || 'Select year'}
                </Text>
              </TouchableOpacity>
              {showYears && (
                <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                  <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                    {years.map((y) => (
                      <TouchableOpacity
                        key={y}
                        style={[styles.dropdownItem, { borderBottomColor: colors.cardBorder }]}
                        onPress={() => {
                          setYear(y);
                          setShowYears(false);
                        }}
                      >
                        <Text style={[styles.dropdownText, { color: colors.text }]}>{y}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Preview */}
            {make && model && (
              <View style={[styles.previewCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>Your Ride</Text>
                <Text style={[styles.previewText, { color: colors.text }]}>
                  {year ? `${year} ` : ''}{make} {model}
                </Text>
              </View>
            )}

            {/* Info Text */}
            <Text style={[styles.infoText, { color: colors.textTertiary }]}>
              You can add more cars and modifications later from your profile.
            </Text>

            {/* Finish Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.finishButton, { backgroundColor: colors.primary }]}
                onPress={handleFinish}
                activeOpacity={0.9}
              >
                <Text style={styles.finishButtonText}>
                  {make && model ? 'Finish Setup' : 'Skip & Finish'}
                </Text>
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
  carIconContainer: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  carIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: spacing.md,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    maxHeight: 200,
    zIndex: 100,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
  },
  previewCard: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  previewText: {
    fontSize: 20,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: spacing.lg,
    lineHeight: 20,
  },
  finishButton: {
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});
