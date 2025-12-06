import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const ChevronRight = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={colors.textTertiary}>
    <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </Svg>
);

const settingsData = [
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Edit Profile', type: 'link' },
      { id: 'privacy', label: 'Privacy', type: 'link' },
      { id: 'security', label: 'Security', type: 'link' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', label: 'Push Notifications', type: 'toggle', default: true },
      { id: 'location', label: 'Location Services', type: 'toggle', default: true },
      { id: 'darkMode', label: 'Dark Mode', type: 'toggle', default: true },
    ],
  },
  {
    title: 'About',
    items: [
      { id: 'help', label: 'Help Center', type: 'link' },
      { id: 'terms', label: 'Terms of Service', type: 'link' },
      { id: 'privacy_policy', label: 'Privacy Policy', type: 'link' },
      { id: 'version', label: 'Version', type: 'value', value: '1.0.0' },
    ],
  },
];

function SettingItem({ item, value, onToggle }) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      activeOpacity={item.type === 'toggle' ? 1 : 0.7}
      onPress={() => item.type === 'link' && console.log(`Navigate to ${item.id}`)}
    >
      <Text style={styles.settingLabel}>{item.label}</Text>
      {item.type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: colors.primary }}
          thumbColor={colors.text}
        />
      )}
      {item.type === 'link' && <ChevronRight />}
      {item.type === 'value' && (
        <Text style={styles.settingValue}>{item.value}</Text>
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const [toggleStates, setToggleStates] = useState({
    notifications: true,
    location: true,
    darkMode: true,
  });

  const handleToggle = (id) => {
    setToggleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {settingsData.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, index) => (
                <View key={item.id}>
                  <SettingItem
                    item={item}
                    value={toggleStates[item.id]}
                    onToggle={() => handleToggle(item.id)}
                  />
                  {index < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  sectionContent: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  settingValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginLeft: spacing.md,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
  },
});
