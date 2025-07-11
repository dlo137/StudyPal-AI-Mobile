


import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ProfileDropdownMenu from '../components/ProfileDropdownMenu';
import colors from '../theme/colors';

/**
 * Profile Screen Component
 * User profile and settings
 */
export default function ProfileScreen({ navigation }) {
  // Mock user and plan for demonstration
  const user = { email: 'user@email.com', user_metadata: { firstName: 'Ada', lastName: 'Wong' } };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userPlan, setUserPlan] = useState('free');

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    const metadata = user.user_metadata;
    if (metadata?.firstName && metadata?.lastName) {
      return `${metadata.firstName.charAt(0)}${metadata.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Plan display name
  const getPlanDisplayName = (plan) => {
    if (plan === 'diamond') return 'Diamond';
    if (plan === 'gold') return 'Gold';
    return 'Free';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ width: 32, height: 32 }} />
          <Text style={styles.headerTitle}>PROFILE</Text>
          <ProfileDropdownMenu navigation={navigation} user={user} />
        </View>

        {/* Avatar and Info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <LinearGradient
              colors={['#8C52FF', '#5CE1E6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                borderRadius: 48,
                overflow: 'hidden',
              }}
              pointerEvents="none"
            />
            <FontAwesome5 name="user" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>
            User
          </Text>
          <Text style={styles.email}>No email available</Text>
          <View style={styles.planBadge}>
            <FontAwesome5
              name="crown"
              size={16}
              color="#FFD700"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.planText}>{getPlanDisplayName(userPlan)}</Text>
          </View>
        </View>

        {/* Activity Buttons (no section wrapper) */}
        <View style={{padding: 16}}>
          <Text style={[styles.sectionTitle, {marginLeft: 0, marginTop: 0}]}>Activity</Text>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.navigate('Mission')}
          >
            <MaterialCommunityIcons name="bookmark-outline" size={22} color="#8C52FF" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuTitle}>Mission Statement</Text>
              <Text style={styles.menuSubtitle}>Learn about our purpose and goals</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('ContactScreen')}> 
            <Feather name="message-square" size={22} color="#8C52FF" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuTitle}>Contact Us</Text>
              <Text style={styles.menuSubtitle}>Get in touch with our support team</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                thumbColor={isDarkMode ? '#8C52FF' : '#fff'}
                trackColor={{ false: '#bbb', true: '#8C52FF' }}
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
              />
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.menuTitle}>Dark & Light Mode</Text>
                <Text style={styles.menuSubtitle}>Toggle between light and dark themes</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#141417' },
  scroll: { paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#141417',
    zIndex: 10,
  },
  headerBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: 'bold', fontSize: 18, color: '#fff', letterSpacing: 1 },
  avatarSection: { alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#23232a' },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: colors.accentPurple,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12
  },
  avatarText: { color: colors.lightText, fontSize: 36, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 2, color: colors.primaryBlue },
  email: { color: colors.secondaryText, marginBottom: 10 },
  planBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.finalAnswerBg, paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: 20, marginTop: 8
  },
  planText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  // section: { padding: 18, backgroundColor: '#18181c', borderRadius: 18, margin: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#fff' },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202027',
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 14,
    marginBottom: 12,
    // Use boxShadow for web compatibility, fallback to elevation for native
    boxShadow: '0px 2px 8px rgba(0,0,0,0.03)',
    elevation: 1,
  },
  menuIcon: { marginRight: 16 },
  menuTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 3 },
  menuSubtitle: { fontSize: 13, color: colors.secondaryText },
  switchIconWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 16 }
});
