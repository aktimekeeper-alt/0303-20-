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

const UserIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
);

const EmailIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </Svg>
);

const LockIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </Svg>
);

const CheckIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);

export default function SignUpScreen({ navigation }) {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const buttonScale = useRef(new Animated.Value(1)).current;

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      if (validate()) {
        navigation.navigate('ProfileSetup', { username, email, password });
      }
    });
  };

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: '', color: colors.textTertiary };
    if (password.length < 6) return { level: 1, text: 'Weak', color: colors.danger };
    if (password.length < 10) return { level: 2, text: 'Medium', color: colors.warning };
    return { level: 3, text: 'Strong', color: colors.success };
  };

  const strength = getPasswordStrength();

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
              <View style={[styles.progressDot, { backgroundColor: colors.primary }]} />
              <View style={[styles.progressLine, { backgroundColor: colors.cardBorder }]} />
              <View style={[styles.progressDot, { backgroundColor: colors.cardBorder }]} />
              <View style={[styles.progressLine, { backgroundColor: colors.cardBorder }]} />
              <View style={[styles.progressDot, { backgroundColor: colors.cardBorder }]} />
            </View>
            <View style={styles.placeholder} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Join the car enthusiast community
            </Text>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Username</Text>
              <View style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.username ? colors.danger : colors.cardBorder }
              ]}>
                <UserIcon color={colors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="@username"
                  placeholderTextColor={colors.textTertiary}
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text.toLowerCase().replace(/[^a-z0-9_]/g, ''));
                    setErrors({ ...errors, username: null });
                  }}
                  autoCapitalize="none"
                />
                {username.length >= 3 && <CheckIcon color={colors.success} />}
              </View>
              {errors.username && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.username}</Text>}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
              <View style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.email ? colors.danger : colors.cardBorder }
              ]}>
                <EmailIcon color={colors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="your@email.com"
                  placeholderTextColor={colors.textTertiary}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors({ ...errors, email: null });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {/\S+@\S+\.\S+/.test(email) && <CheckIcon color={colors.success} />}
              </View>
              {errors.email && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.email}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
              <View style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.password ? colors.danger : colors.cardBorder }
              ]}>
                <LockIcon color={colors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Min 6 characters"
                  placeholderTextColor={colors.textTertiary}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors({ ...errors, password: null });
                  }}
                  secureTextEntry
                />
              </View>
              {password.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBars}>
                    {[1, 2, 3].map((level) => (
                      <View
                        key={level}
                        style={[
                          styles.strengthBar,
                          { backgroundColor: level <= strength.level ? strength.color : colors.cardBorder }
                        ]}
                      />
                    ))}
                  </View>
                  <Text style={[styles.strengthText, { color: strength.color }]}>{strength.text}</Text>
                </View>
              )}
              {errors.password && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.password}</Text>}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Confirm Password</Text>
              <View style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.confirmPassword ? colors.danger : colors.cardBorder }
              ]}>
                <LockIcon color={colors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Re-enter password"
                  placeholderTextColor={colors.textTertiary}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: null });
                  }}
                  secureTextEntry
                />
                {confirmPassword && password === confirmPassword && <CheckIcon color={colors.success} />}
              </View>
              {errors.confirmPassword && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.confirmPassword}</Text>}
            </View>

            {/* Terms */}
            <Text style={[styles.terms, { color: colors.textTertiary }]}>
              By creating an account, you agree to our{' '}
              <Text style={{ color: colors.primary }}>Terms of Service</Text> and{' '}
              <Text style={{ color: colors.primary }}>Privacy Policy</Text>
            </Text>

            {/* Continue Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.continueButton, { backgroundColor: colors.primary }]}
                onPress={handleContinue}
                activeOpacity={0.9}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={[styles.loginLink, { color: colors.primary }]}> Sign In</Text>
              </TouchableOpacity>
            </View>
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
  placeholder: { width: 40 },
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
  inputGroup: {
    marginBottom: spacing.md,
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
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
  },
  strengthBar: {
    width: 30,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: spacing.lg,
    lineHeight: 18,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
