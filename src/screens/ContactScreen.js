import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Contact Screen Component
 * Displays contact information and support options
 */
export default function ContactScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack && navigation.goBack()}>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONTACT</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <View style={{
            backgroundColor: '#23232a',
            borderRadius: 16,
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MaterialIcons name="person-outline" size={20} color="#a0a0a0" />
          </View>
        </TouchableOpacity>
      </View>
      {/* Main content */}
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Get in touch with our support team</Text>
        <Text style={styles.info}>Email: support@studypal.ai</Text>
        <Text style={styles.info}>Phone: +1 (555) 123-4567</Text>
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Chat')}>
          <MaterialCommunityIcons name="chat" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Scan')}>
          <MaterialCommunityIcons name="document-scanner" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Plans')}>
          <MaterialCommunityIcons name="assignment" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="account" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#141417' },
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#8C52FF', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#fff', marginBottom: 18 },
  info: { fontSize: 15, color: '#a0a0a0', marginBottom: 8 },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#18181b',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#23232a',
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});
