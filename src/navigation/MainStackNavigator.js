import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from '.';
import MissionScreen from '../screens/MissionScreen';
import ContactScreen from '../screens/ContactScreen';

const Stack = createNativeStackNavigator();

/**
 * Main Stack Navigator
 * Wraps bottom tabs and allows navigation to MissionScreen
 */
export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Mission" component={MissionScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
    </Stack.Navigator>
  );
}
