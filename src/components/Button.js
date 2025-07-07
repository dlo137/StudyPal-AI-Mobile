import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Reusable Button Component
 * @param {string} title - Button text
 * @param {function} onPress - Function to call when pressed
 * @param {string} variant - Button style variant ('primary', 'secondary')
 */
export default function Button({ title, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant]]} 
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  primary: {
    backgroundColor: '#3498db',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#3498db',
  },
});
