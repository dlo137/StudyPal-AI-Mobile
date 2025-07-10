
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import colors from '../theme/colors';

/**
 * Profile Screen Component
 * User profile and settings
 */
export default function ProfileScreen() {
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
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="x" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PROFILE</Text>
          <View style={styles.headerBtn} />
        </View>

        {/* Avatar and Info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getUserInitials()}</Text>
          </View>
          <Text style={styles.name}>
            {user?.user_metadata?.firstName || 'User'}
          </Text>
          <Text style={styles.email}>{user?.email || 'No email available'}</Text>
          <View style={styles.planBadge}>
            <FontAwesome5
              name="crown"
              size={16}
              color={
                userPlan === 'diamond'
                  ? '#8C52FF'
                  : userPlan === 'gold'
                  ? '#FFD700'
                  : '#bbb'
              }
              style={{ marginRight: 6 }}
            />
            <Text style={styles.planText}>{getPlanDisplayName(userPlan)}</Text>
          </View>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <TouchableOpacity style={styles.menuBtn}>
            <MaterialCommunityIcons name="bookmark-outline" size={22} color="#8C52FF" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuTitle}>Mission Statement</Text>
              <Text style={styles.menuSubtitle}>Learn about our purpose and goals</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn}>
            <Feather name="message-square" size={22} color="#8C52FF" style={styles.menuIcon} />
            <View>
              <Text style={styles.menuTitle}>Contact Us</Text>
              <Text style={styles.menuSubtitle}>Get in touch with our support team</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn}>
            <View style={styles.switchIconWrap}>
              <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={18} color={isDarkMode ? '#8C52FF' : '#FFD700'} />
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                thumbColor={isDarkMode ? '#8C52FF' : '#fff'}
                trackColor={{ false: '#bbb', true: '#8C52FF' }}
                style={{ marginLeft: 8 }}
              />
            </View>
            <View>
              <Text style={styles.menuTitle}>Dark & Light Mode</Text>
              <Text style={styles.menuSubtitle}>Toggle between light and dark themes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.darkBg },
  scroll: { paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryHoverBlue,
    backgroundColor: colors.darkBg
  },
  headerBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: 'bold', fontSize: 18, color: colors.primaryBlue, letterSpacing: 1 },
  avatarSection: { alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: colors.primaryHoverBlue },
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
  planText: { fontSize: 14, fontWeight: '600', color: colors.accentPurple },
  section: { padding: 18 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: colors.primaryBlue },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryHoverBlue,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    // Use boxShadow for web compatibility, fallback to elevation for native
    boxShadow: '0px 2px 8px rgba(0,0,0,0.03)',
    elevation: 1,
  },
  menuIcon: { marginRight: 16 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: colors.lightText },
  menuSubtitle: { fontSize: 13, color: colors.secondaryText },
  switchIconWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 16 }
});
