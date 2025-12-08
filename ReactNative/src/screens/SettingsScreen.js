import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import ColorPicker from '../components/ColorPicker';
import { spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const ChevronRight = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="rgba(255,255,255,0.4)">
    <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </Svg>
);

export default function SettingsScreen({ navigation }) {
  const { colors, updateColors, resetColors } = useTheme();
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    notifications: true,
    location: true,
    darkMode: true,
  });

  const handleToggle = (id) => {
    setToggleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Theme Customization */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Theme</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <TouchableOpacity style={styles.colorItem} onPress={() => setShowPrimaryPicker(true)}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Primary Color</Text>
              <View style={styles.colorPreviewRow}>
                <View style={[styles.colorPreview, { backgroundColor: colors.primary }]} />
                <ChevronRight />
              </View>
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
            <TouchableOpacity style={styles.colorItem} onPress={() => setShowSecondaryPicker(true)}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Secondary Color</Text>
              <View style={styles.colorPreviewRow}>
                <View style={[styles.colorPreview, { backgroundColor: colors.secondary }]} />
                <ChevronRight />
              </View>
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
            <TouchableOpacity style={styles.colorItem} onPress={resetColors}>
              <Text style={[styles.settingLabel, { color: colors.primary }]}>Reset to Default</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {['Edit Profile', 'Privacy', 'Security'].map((label, i) => (
              <View key={label}>
                <TouchableOpacity style={styles.settingItem}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
                  <ChevronRight />
                </TouchableOpacity>
                {i < 2 && <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />}
              </View>
            ))}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Preferences</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {[
              { id: 'notifications', label: 'Push Notifications' },
              { id: 'location', label: 'Location Services' },
              { id: 'darkMode', label: 'Dark Mode' },
            ].map((item, i) => (
              <View key={item.id}>
                <View style={styles.settingItem}>
                  <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
                  <Switch
                    value={toggleStates[item.id]}
                    onValueChange={() => handleToggle(item.id)}
                    trackColor={{ false: 'rgba(255,255,255,0.2)', true: colors.primary }}
                    thumbColor="#FFF"
                  />
                </View>
                {i < 2 && <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />}
              </View>
            ))}
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>About</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Version</Text>
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>1.0.0</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <ColorPicker
        visible={showPrimaryPicker}
        onClose={() => setShowPrimaryPicker(false)}
        onSelect={(color) => updateColors({ primary: color })}
        currentColor={colors.primary}
        title="Primary Color"
      />
      <ColorPicker
        visible={showSecondaryPicker}
        onClose={() => setShowSecondaryPicker(false)}
        onSelect={(color) => updateColors({ secondary: color })}
        currentColor={colors.secondary}
        title="Secondary Color"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  placeholder: { width: 40 },
  scroll: { flex: 1, paddingHorizontal: spacing.md },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: 1, marginBottom: spacing.sm,
  },
  sectionContent: { borderRadius: borderRadius.lg, borderWidth: 1, overflow: 'hidden' },
  settingItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md,
  },
  colorItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md,
  },
  settingLabel: { fontSize: 16 },
  settingValue: { fontSize: 16 },
  colorPreviewRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  colorPreview: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' },
  divider: { height: 1, marginLeft: spacing.md },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)', borderRadius: borderRadius.lg,
    padding: spacing.md, alignItems: 'center', marginBottom: spacing.xl,
  },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#FF3B30' },
});
