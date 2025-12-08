import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const PRESET_COLORS = [
  '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#FF3B30',
  '#FF9500', '#FFCC00', '#34C759', '#00C7BE', '#30B0C7',
  '#32ADE6', '#64D2FF', '#BF5AF2', '#FF6482', '#FFD60A',
];

export default function ColorPicker({ visible, onClose, onSelect, currentColor, title }) {
  const [selected, setSelected] = useState(currentColor);

  const handleSelect = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title || 'Pick Color'}</Text>

          <View style={styles.preview}>
            <View style={[styles.previewColor, { backgroundColor: selected }]} />
            <Text style={styles.previewText}>{selected}</Text>
          </View>

          <View style={styles.grid}>
            {PRESET_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorBtn,
                  { backgroundColor: color },
                  selected === color && styles.colorBtnSelected,
                ]}
                onPress={() => setSelected(color)}
              />
            ))}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectBtn, { backgroundColor: selected }]} onPress={handleSelect}>
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 12,
  },
  previewColor: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  previewText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'monospace',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  colorBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorBtnSelected: {
    borderColor: '#FFF',
    transform: [{ scale: 1.1 }],
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  selectBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
