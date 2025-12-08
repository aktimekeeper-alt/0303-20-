import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, PanResponder, Dimensions } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const WHEEL_SIZE = 220;
const WHEEL_WIDTH = 30;

// Convert HSL to Hex
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Convert Hex to HSL
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return { h, s: s * 100, l: l * 100 };
}

export default function ColorPicker({ visible, onClose, onSelect, currentColor, title }) {
  const initialHsl = hexToHsl(currentColor || '#007AFF');
  const [hue, setHue] = useState(initialHsl.h);
  const [saturation, setSaturation] = useState(initialHsl.s);
  const [lightness, setLightness] = useState(initialHsl.l);

  const wheelRef = useRef(null);
  const sliderRef = useRef(null);

  const selectedColor = hslToHex(hue, saturation, lightness);

  // Color wheel touch handler
  const wheelPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => handleWheelTouch(e),
      onPanResponderMove: (e) => handleWheelTouch(e),
    })
  ).current;

  // Saturation slider touch handler
  const satPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => handleSatTouch(e),
      onPanResponderMove: (e) => handleSatTouch(e),
    })
  ).current;

  // Lightness slider touch handler
  const lightPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => handleLightTouch(e),
      onPanResponderMove: (e) => handleLightTouch(e),
    })
  ).current;

  const handleWheelTouch = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;

    const dx = locationX - centerX;
    const dy = locationY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only respond if touch is on the wheel ring
    const innerRadius = (WHEEL_SIZE - WHEEL_WIDTH * 2) / 2;
    const outerRadius = WHEEL_SIZE / 2;

    if (distance >= innerRadius - 10 && distance <= outerRadius + 10) {
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      setHue(angle);
    }
  };

  const handleSatTouch = (e) => {
    const { locationX } = e.nativeEvent;
    const newSat = Math.max(0, Math.min(100, (locationX / 200) * 100));
    setSaturation(newSat);
  };

  const handleLightTouch = (e) => {
    const { locationX } = e.nativeEvent;
    const newLight = Math.max(10, Math.min(90, (locationX / 200) * 100));
    setLightness(newLight);
  };

  const handleSelect = () => {
    onSelect(selectedColor);
    onClose();
  };

  // Calculate indicator position on wheel
  const indicatorAngle = hue * (Math.PI / 180);
  const indicatorRadius = (WHEEL_SIZE - WHEEL_WIDTH) / 2;
  const indicatorX = WHEEL_SIZE / 2 + Math.cos(indicatorAngle) * indicatorRadius;
  const indicatorY = WHEEL_SIZE / 2 + Math.sin(indicatorAngle) * indicatorRadius;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title || 'Pick Color'}</Text>

          {/* Color Preview */}
          <View style={styles.preview}>
            <View style={[styles.previewColor, { backgroundColor: selectedColor }]} />
            <Text style={styles.previewText}>{selectedColor}</Text>
          </View>

          {/* Color Wheel */}
          <View style={styles.wheelContainer} {...wheelPanResponder.panHandlers}>
            <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
              <Defs>
                {/* Create color wheel segments */}
                {Array.from({ length: 360 }, (_, i) => (
                  <LinearGradient key={i} id={`grad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor={hslToHex(i, 100, 50)} />
                    <Stop offset="100%" stopColor={hslToHex((i + 1) % 360, 100, 50)} />
                  </LinearGradient>
                ))}
              </Defs>
              {/* Draw wheel segments */}
              {Array.from({ length: 360 }, (_, i) => {
                const angle1 = (i - 90) * (Math.PI / 180);
                const angle2 = (i + 1 - 90) * (Math.PI / 180);
                const outerR = WHEEL_SIZE / 2;
                const innerR = outerR - WHEEL_WIDTH;
                const cx = WHEEL_SIZE / 2;
                const cy = WHEEL_SIZE / 2;

                const x1 = cx + outerR * Math.cos(angle1);
                const y1 = cy + outerR * Math.sin(angle1);
                const x2 = cx + outerR * Math.cos(angle2);
                const y2 = cy + outerR * Math.sin(angle2);
                const x3 = cx + innerR * Math.cos(angle2);
                const y3 = cy + innerR * Math.sin(angle2);
                const x4 = cx + innerR * Math.cos(angle1);
                const y4 = cy + innerR * Math.sin(angle1);

                return (
                  <Rect
                    key={i}
                    x={cx - 2}
                    y={0}
                    width={4}
                    height={WHEEL_WIDTH}
                    fill={hslToHex(i, 100, 50)}
                    transform={`rotate(${i}, ${cx}, ${cy})`}
                  />
                );
              })}
              {/* Inner circle mask */}
              <Circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={(WHEEL_SIZE - WHEEL_WIDTH * 2) / 2}
                fill="#1C1C1E"
              />
              {/* Center color preview */}
              <Circle
                cx={WHEEL_SIZE / 2}
                cy={WHEEL_SIZE / 2}
                r={40}
                fill={selectedColor}
              />
            </Svg>
            {/* Indicator */}
            <View
              style={[
                styles.indicator,
                {
                  left: indicatorX - 12,
                  top: indicatorY - 12,
                  backgroundColor: hslToHex(hue, 100, 50),
                },
              ]}
            />
          </View>

          {/* Saturation Slider */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Saturation</Text>
            <View style={styles.sliderTrack} {...satPanResponder.panHandlers}>
              <View style={[styles.satGradient, {
                backgroundImage: `linear-gradient(to right, ${hslToHex(hue, 0, lightness)}, ${hslToHex(hue, 100, lightness)})`
              }]}>
                <View style={[styles.gradientLeft, { backgroundColor: hslToHex(hue, 0, lightness) }]} />
                <View style={[styles.gradientRight, { backgroundColor: hslToHex(hue, 100, lightness) }]} />
              </View>
              <View style={[styles.sliderThumb, { left: (saturation / 100) * 200 - 10, backgroundColor: selectedColor }]} />
            </View>
          </View>

          {/* Lightness Slider */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Brightness</Text>
            <View style={styles.sliderTrack} {...lightPanResponder.panHandlers}>
              <View style={styles.satGradient}>
                <View style={[styles.gradientLeft, { backgroundColor: hslToHex(hue, saturation, 10) }]} />
                <View style={[styles.gradientRight, { backgroundColor: hslToHex(hue, saturation, 90) }]} />
              </View>
              <View style={[styles.sliderThumb, { left: (lightness / 100) * 200 - 10, backgroundColor: selectedColor }]} />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectBtn, { backgroundColor: selectedColor }]} onPress={handleSelect}>
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
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
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
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    marginBottom: 20,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    width: '100%',
  },
  sliderTrack: {
    width: 200,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  satGradient: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientLeft: {
    flex: 1,
  },
  gradientRight: {
    flex: 1,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    top: 2,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    width: '100%',
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
