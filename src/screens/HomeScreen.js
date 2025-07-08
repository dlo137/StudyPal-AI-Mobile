
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

/**
 * Home Screen Component
 * Main landing page for the StudyPal AI Mobile app
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StudyPal AI</Text>
      <Text style={styles.subtitle}>Your AI-powered study companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryBlue,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: 'center',
  },
});
