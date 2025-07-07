import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Study Screen Component
 * Where users interact with AI study features
 */
export default function StudyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Session</Text>
      <Text style={styles.subtitle}>AI-powered learning in progress...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4fd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
  },
});
