import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

/**
 * Main Application Component
 * Entry point for the StudyPal AI Mobile app with bottom tab navigation
 */
export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MainStackNavigator />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
