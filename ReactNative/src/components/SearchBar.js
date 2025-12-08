import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

const SearchIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={18} height={18} fill={color}>
    <Path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </Svg>
);

const ClearIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={12} height={12} fill={color}>
    <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </Svg>
);

export default function SearchBar({ value, onChangeText, placeholder }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <SearchIcon color={colors.textSecondary} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <View style={styles.clearButton}>
            <ClearIcon color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
