import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

export default function FilterPills({ filters, activeFilter, onFilterChange }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.pill,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
              isActive && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
            onPress={() => onFilterChange(filter.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillText,
                { color: colors.textSecondary },
                isActive && { color: colors.text },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
