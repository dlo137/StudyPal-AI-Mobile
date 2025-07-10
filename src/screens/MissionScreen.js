import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function MissionScreen({ navigation }) {
  // Dropdown menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header (unified style) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack && navigation.goBack()}>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MISSION</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setMenuOpen(v => !v)}>
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
        {/* Dropdown menu */}
        {menuOpen && (
          <View style={{
            position: 'absolute',
            top: 48,
            right: 16,
            width: 170,
            backgroundColor: '#23232a',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#333',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
            zIndex: 100,
          }}>
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 18, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              onPress={() => { setMenuOpen(false); navigation.navigate('Profile'); }}
            >
              <Text style={{ color: '#fff', fontSize: 15 }}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 18 }}
              onPress={() => { setMenuOpen(false); navigation.navigate('Plans'); }}
            >
              <Text style={{ color: '#fff', fontSize: 15 }}>Plans</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 18 }}
              onPress={() => { setMenuOpen(false); navigation.navigate('Chat'); }}
            >
              <Text style={{ color: '#fff', fontSize: 15 }}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 18, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
              onPress={() => { setMenuOpen(false); /* handleLogout() */ }}
            >
              <Text style={{ color: '#f43f5e', fontSize: 15 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Mission content (converted from MissionStatement.tsx) */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.bodyContainer, { paddingBottom: 64 }]} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <LinearGradient colors={["#8C52FF", "#5CE1E6"]} style={styles.heroIconCircle}>
              <MaterialCommunityIcons name="target" size={48} color="#fff" />
            </LinearGradient>
            <Text style={styles.heroTitle}>Our Mission</Text>
            <Text style={styles.heroSubtitle}>
              Empowering students worldwide to achieve academic excellence through intelligent, personalized learning assistance.
            </Text>
          </View>

          {/* Mission Values */}
          <View style={styles.valuesGrid}>
            <View style={styles.valueCard}>
              <View style={[styles.valueIconCircle, { backgroundColor: '#8C52FF22' }]}> 
                <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#8C52FF" />
              </View>
              <Text style={styles.valueTitle}>Innovation</Text>
              <Text style={styles.valueDesc}>
                Leveraging cutting-edge AI technology to create smarter, more intuitive learning experiences.
              </Text>
            </View>
            <View style={styles.valueCard}>
              <View style={[styles.valueIconCircle, { backgroundColor: '#5CE1E622' }]}> 
                <MaterialCommunityIcons name="heart-outline" size={24} color="#5CE1E6" />
              </View>
              <Text style={styles.valueTitle}>Accessibility</Text>
              <Text style={styles.valueDesc}>
                Making quality education assistance available to students everywhere, regardless of background or resources.
              </Text>
            </View>
            <View style={styles.valueCard}>
              <View style={[styles.valueIconCircle, { backgroundColor: '#8C52FF22' }]}> 
                <MaterialCommunityIcons name="target" size={24} color="#8C52FF" />
              </View>
              <Text style={styles.valueTitle}>Excellence</Text>
              <Text style={styles.valueDesc}>
                Committed to delivering the highest quality educational support and continuously improving our platform.
              </Text>
            </View>
          </View>

          {/* Detailed Mission */}
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>What We Stand For</Text>
            <View style={styles.detailTextBlock}>
              <Text style={styles.detailText}>
                At StudyPal AI, we believe that every student deserves access to personalized, intelligent tutoring that adapts to their unique learning style and pace. Our mission is to democratize education by providing AI-powered assistance that helps students understand complex concepts, solve challenging problems, and achieve their academic goals.
              </Text>
              <Text style={styles.detailText}>
                We are committed to creating a learning environment that is inclusive, supportive, and empowering. Our AI tutor is designed not just to provide answers, but to guide students through the learning process, helping them develop critical thinking skills and deep understanding of their subjects.
              </Text>
              <Text style={styles.detailText}>
                Through continuous innovation and dedication to educational excellence, we strive to bridge the gap between traditional learning methods and the digital future of education, making quality tutoring accessible to students worldwide.
              </Text>
            </View>
          </View>

          {/* Call to Action */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Join Our Mission</Text>
            <Text style={styles.ctaSubtitle}>
              Be part of the educational revolution. Start your learning journey with StudyPal AI today.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <LinearGradient colors={["#8C52FF", "#5CE1E6"]} style={styles.ctaButtonGradient}>
                <Text style={styles.ctaButtonText}>Start Learning</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
      </ScrollView>

      {/* Bottom navigation bar */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan-outline" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Plans')}>
          <MaterialIcons name="star-outline" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person-outline" size={24} color="#8C52FF" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  heroIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#a0a0a0',
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 8,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  valueCard: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 16,
    width: '30%',
    minWidth: 110,
    marginBottom: 12,
    alignItems: 'center',
  },
  valueIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  valueDesc: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    marginBottom: 24,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  detailTextBlock: {
    marginTop: 4,
  },
  detailText: {
    fontSize: 15,
    color: '#a0a0a0',
    marginBottom: 8,
    lineHeight: 22,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 20,
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
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
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
