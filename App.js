import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/navigation';

/**
 * Main Application Component
 * Entry point for the StudyPal AI Mobile app with bottom tab navigation
 */
export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <BottomTabNavigator />
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
