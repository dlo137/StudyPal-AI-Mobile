import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileDropdownMenu from '../components/ProfileDropdownMenu';

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
        <ProfileDropdownMenu navigation={navigation} user={null} />
      </View>
      {/* Main content */}
      <View style={styles.bodyContainer}>
        {/* Contact Hero Section */}
        <View style={styles.heroSection}>
          <MaterialIcons name="support-agent" size={48} color="#8C52FF" style={{ marginBottom: 12 }} />
          <Text style={styles.heroTitle}>Contact Us</Text>
          <Text style={styles.heroSubtitle}>
            We're here to help! Reach out to our support team for assistance, feedback, or partnership inquiries.
          </Text>
        </View>

        {/* Contact Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <MaterialIcons name="email" size={24} color="#5CE1E6" style={{ marginBottom: 6 }} />
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoText}>support@studypal.ai</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="phone" size={24} color="#8C52FF" style={{ marginBottom: 6 }} />
            <Text style={styles.infoTitle}>Phone</Text>
            <Text style={styles.infoText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="location-on" size={24} color="#FFD166" style={{ marginBottom: 6 }} />
            <Text style={styles.infoTitle}>Address</Text>
            <Text style={styles.infoText}>123 StudyPal Lane, Suite 100, Edutown, USA</Text>
          </View>
        </View>

        {/* Support Details */}
        <View style={styles.supportDetailCard}>
          <Text style={styles.supportDetailTitle}>Support Hours</Text>
          <Text style={styles.supportDetailText}>Monday - Friday: 9am - 6pm (EST)</Text>
          <Text style={styles.supportDetailText}>Saturday: 10am - 4pm (EST)</Text>
          <Text style={styles.supportDetailText}>Sunday: Closed</Text>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Need Immediate Help?</Text>
          <Text style={styles.ctaSubtitle}>
            Chat with our AI assistant or send us a message anytime.
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Chat')}>
            <View style={styles.ctaButtonGradient}>
              <Text style={styles.ctaButtonText}>Start Chat</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#141417',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#8C52FF',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 340,
    marginBottom: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 18,
    width: '30%',
    minWidth: 110,
    marginBottom: 12,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  supportDetailCard: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  supportDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8C52FF',
    marginBottom: 8,
    textAlign: 'center',
  },
  supportDetailText: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
    textAlign: 'center',
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#a0a0a0',
    marginBottom: 12,
    textAlign: 'center',
    maxWidth: 320,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8C52FF',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
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
