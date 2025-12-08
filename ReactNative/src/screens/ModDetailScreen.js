import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const ToolIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={32} height={32} fill={color}>
    <Path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </Svg>
);

const CheckIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);

const LinkIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill={color}>
    <Path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </Svg>
);

export default function ModDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const linkScale = useRef(new Animated.Value(1)).current;

  const mod = route.params?.mod || {
    name: 'Garrett GTX3076R Turbo Kit',
    category: 'Forced Induction',
    brand: 'Garrett',
    installedDate: 'Oct 2024',
    notes: 'Full turbo kit installation including manifold, downpipe, intercooler, and all supporting hardware. Professionally tuned for 450whp on pump gas.',
    productUrl: 'https://www.garrettmotion.com',
  };

  const specs = [
    { label: 'Compressor', value: '60/60mm' },
    { label: 'Turbine', value: '55mm' },
    { label: 'HP Rating', value: '400-650hp' },
    { label: 'Boost', value: '15psi' },
  ];

  const features = [
    'Ball bearing center section',
    'Billet compressor wheel',
    'T3 divided inlet',
    '3" V-band outlet',
    'Wastegate included',
  ];

  const handleLinkPress = async () => {
    Animated.sequence([
      Animated.timing(linkScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(linkScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(async () => {
      try {
        const url = mod.productUrl || 'https://www.google.com/search?q=' + encodeURIComponent(mod.name);
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open link');
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to open link');
      }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Modification</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark || '#0051D5']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <ToolIcon color={colors.text} />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.content}>
          <View style={[styles.categoryTag, { backgroundColor: `${colors.primary}33` }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>{mod.category}</Text>
          </View>
          <Text style={[styles.modName, { color: colors.text }]}>{mod.name}</Text>
          <Text style={[styles.brand, { color: colors.textSecondary }]}>by {mod.brand}</Text>

          <View style={styles.metaRow}>
            <View style={[styles.metaItem, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>Installed</Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>{mod.installedDate}</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Specifications</Text>
          <View style={[styles.specsGrid, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {specs.map((spec, index) => (
              <View key={index} style={styles.specItem}>
                <Text style={[styles.specLabel, { color: colors.textSecondary }]}>{spec.label}</Text>
                <Text style={[styles.specValue, { color: colors.text }]}>{spec.value}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Features</Text>
          <View style={[styles.featuresList, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <CheckIcon color={colors.success} />
                <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Notes</Text>
          <View style={[styles.notesBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.notesText, { color: colors.textSecondary }]}>{mod.notes}</Text>
          </View>

          <Animated.View style={{ transform: [{ scale: linkScale }] }}>
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
              onPress={handleLinkPress}
            >
              <LinkIcon color={colors.primary} />
              <Text style={[styles.linkButtonText, { color: colors.primary }]}>View Product Page</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
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
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  placeholder: { width: 40 },
  scroll: { flex: 1 },
  heroSection: { height: 160, marginHorizontal: spacing.md, borderRadius: borderRadius.xl, overflow: 'hidden', marginBottom: spacing.md },
  heroGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  content: { padding: spacing.md },
  categoryTag: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, marginBottom: spacing.sm },
  categoryText: { fontSize: 12, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  modName: { fontSize: 26, fontWeight: '700', marginBottom: spacing.xs },
  brand: { fontSize: 15, marginBottom: spacing.md },
  metaRow: { flexDirection: 'row', marginBottom: spacing.lg },
  metaItem: { borderRadius: borderRadius.md, borderWidth: 1, padding: spacing.md },
  metaLabel: { fontSize: 12, textTransform: 'uppercase', marginBottom: spacing.xs },
  metaValue: { fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', borderRadius: borderRadius.lg, borderWidth: 1, padding: spacing.md, marginBottom: spacing.lg },
  specItem: { width: '50%', paddingVertical: spacing.sm },
  specLabel: { fontSize: 12, marginBottom: spacing.xs },
  specValue: { fontSize: 16, fontWeight: '600' },
  featuresList: { borderRadius: borderRadius.lg, borderWidth: 1, padding: spacing.md, marginBottom: spacing.lg },
  featureItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, gap: spacing.sm },
  featureText: { fontSize: 15 },
  notesBox: { borderRadius: borderRadius.lg, borderWidth: 1, padding: spacing.md, marginBottom: spacing.lg },
  notesText: { fontSize: 15, lineHeight: 22 },
  linkButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: borderRadius.lg, borderWidth: 1, padding: spacing.md, marginBottom: spacing.xl },
  linkButtonText: { fontSize: 15, fontWeight: '600' },
});
