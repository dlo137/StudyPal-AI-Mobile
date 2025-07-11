import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { ChatScreen, ScanScreen, PlansScreen, ProfileScreen } from '../screens';
import MissionScreen from '../screens/MissionScreen';

const Tab = createBottomTabNavigator();

/**
 * Bottom Tab Navigator Component
 * Main navigation with fixed bottom tabs
 */
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName = 'circle';
        let IconComponent = MaterialIcons;
        if (route.name === 'Chat') {
          iconName = 'chat';
        } else if (route.name === 'Scan') {
          iconName = 'scan-outline';
          IconComponent = require('@expo/vector-icons').Ionicons;
        } else if (route.name === 'Plans') {
          iconName = 'star-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }
        return {
          tabBarIcon: ({ color, size }) => <IconComponent name={iconName} size={size} color={color} />,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#888888',
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Plans" component={PlansScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
