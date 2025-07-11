
// React and React Native imports
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import ProfileDropdownMenu from '../components/ProfileDropdownMenu';
import colors from '../theme/colors';

/**
 * Plans Screen Component
 * Study plans and subscription management
 */

export default function PlansScreen() {
  // ----------------------
  // State Management
  // ----------------------
  // TODO: Replace with actual user state from context/auth
  const user = null; // Simulate not signed in
  const [currentUserPlan, setCurrentUserPlan] = useState(user ? 'gold' : 'free');
  // Simulate navigation function (replace with your navigation logic)
  const navigation = { navigate: (route) => { /* TODO: Replace with navigation logic */ } };
  const [showFreeTrialText, setShowFreeTrialText] = useState(false);

  // ----------------------
  // Plan Data
  // ----------------------
  const plans = [
    {
      key: 'free',
      title: 'Free Plan',
      price: '$0',
      features: [
        '10 Requests / Monthly',
        'Free Usage',
        'No Credit Card Required'
      ],
      icon: <Feather name="zap" size={11} color="#fff" />,
      gradient: ['#8C52FF', '#5CE1E6']
    },
    {
      key: 'gold',
      title: 'Gold Plan',
      price: '$9.99/mo',
      features: [
        '150 Requests / Monthly',
        'Email Support',
        'Priority Access to New Features'
      ],
      icon: <FontAwesome5 name="star" size={11} color="#fff" />,
      gradient: ['#8C52FF', '#FFD700']
    },
    {
      key: 'diamond',
      title: 'Diamond Plan',
      price: '$19.99/mo',
      features: [
        '500 Requests / Monthly',
        'Email Support',
        'Priority Access to New Features',
        'Priority Support'
      ],
      icon: <FontAwesome5 name="crown" size={11} color="#fff" />,
      gradient: ['#8C52FF', '#5CE1E6']
    }
  ];

  // ----------------------
  // Responsive Card Width Calculation
  // ----------------------
  const screenWidth = Dimensions.get('window').width;
  const cardMargin = 6 * 2; // left+right margin per card
  const cardsPerRow = 3;
  const cardWidth = Math.floor((screenWidth - (cardsPerRow * cardMargin) - 24) / cardsPerRow); // 24 for some padding

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ----------------------
          Header Section
        ---------------------- */}
      <View style={styles.header}>
        <View style={{ width: 32, height: 32 }} />
        <Text style={styles.headerTitle}>PLANS</Text>
        <ProfileDropdownMenu navigation={navigation} user={null} dropdownStyle={{ top: 48 }} />
      </View>

      {/* ----------------------
          Main Content Section
        ---------------------- */}
      <View style={styles.centeredContentWrapper}>
        <ScrollView contentContainerStyle={styles.centeredScroll}>

          {/* Title and Description */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>StudyPal: AI Homework Helper</Text>
            <Text style={styles.mainDesc}>
              Saves time and stress while ensuring clarity and quality in your homework, making it the smart choice for tackling assignments with ease.
            </Text>
          </View>

          {/* ----------------------
              Plans Cards Section
            ---------------------- */}
          <View style={styles.cardsRow}>
            {plans.map(plan => (
              <View key={plan.key} style={[styles.card, { width: cardWidth }]}> 
                {/* Card Header: Icon, Title, Price (top) */}
                <View style={styles.cardHeaderSection}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardIcon, { backgroundColor: plan.gradient[0] }]}> 
                      {plan.icon}
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.cardTitle}>{plan.title}</Text>
                      <Text style={styles.cardPrice}>{plan.price}</Text>
                    </View>
                  </View>
                </View>
                {/* Card Features Section (middle, flex: 1) */}
                <View style={styles.cardFeaturesSection}>
                  <View style={styles.cardFeatures}>
                    {plan.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureRow}>
                        <View style={styles.featureDot} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                {/* Card Button Section (bottom) */}
                <View style={styles.cardButtonSection}>
                  {currentUserPlan === plan.key ? (
                    <TouchableOpacity
                      style={[styles.cardBtn, styles.cardBtnCurrent, {marginTop: 0}]}
                      disabled
                    >
                      <Text style={styles.cardBtnTextCurrent}>
                        Current Plan
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.cardBtn, {marginTop: 0, overflow: 'hidden', padding: 0}]}
                      onPress={() => {
                        if (!user && plan.key !== 'free') {
                          navigation.navigate('LoginScreen');
                        } else {
                          setCurrentUserPlan(plan.key);
                        }
                      }}
                      activeOpacity={0.85}
                    >
                      <LinearGradient
                        colors={['#8C52FF', '#5CE1E6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                        pointerEvents="none"
                      />
                      <Text style={[styles.cardBtnText, { zIndex: 1 }]}> {`Choose ${plan.title.split(' ')[0]}`} </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* ----------------------
              Bottom Call-to-Action Section
            ---------------------- */}
          <View style={styles.bottomCta}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.trialBtn}
                onPress={() => {
                  if (!showFreeTrialText) setShowFreeTrialText(true);
                }}
                activeOpacity={showFreeTrialText ? 1 : 0.7}
              >
                <Text style={styles.trialBtnText}>Start Free Trial</Text>
              </TouchableOpacity>
              <Text style={styles.trialText}>
                7-day free diamond trial, then $19.99/month
              </Text>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ----------------------
// Styles
// ----------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#141417' },
  scroll: { paddingBottom: 32 },
  centeredContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  centeredScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 32,
  },
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
  titleSection: { alignItems: 'center', marginTop: 24, marginBottom: 16, paddingHorizontal: 12 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 14, color: '#fff', textAlign: 'center' },
  mainDesc: { color: colors.secondaryText, fontSize: 15, textAlign: 'center' },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 18,
    marginHorizontal: 0,
  },
  card: {
    // width is set dynamically 
    height: 200,
    backgroundColor: 'rgba(42,17,86,0.5)', // dark purple, 50% opacity
    borderRadius: 10, // less border radius
    margin: 4, // slightly larger gap for visual balance
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(75,33,122,0.5)', // border 50% opacity
    elevation: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    shadowColor: '#8C52FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    overflow: 'hidden', // prevent content from leaking
  },
  // Card main sections for header-top, features-middle, button-bottom
  cardHeaderSection: {
    // Header at the top
    marginBottom: 0,
  },
  cardFeaturesSection: {
    flex: 1,
    justifyContent: 'flex-start', // bullet points start at the very top
    alignItems: 'stretch',
    marginBottom: 2,
  },
  cardButtonSection: {
    // Button at the bottom
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  cardContent: {
    // No longer used, but kept for legacy if needed
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  cardIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    overflow: 'hidden',
    padding: 3,
  },
  cardTitle: { fontWeight: 'bold', color: colors.lightText, fontSize: 11, flexShrink: 1, flexWrap: 'wrap' },
  cardPrice: { color: '#fff', fontWeight: 'bold', fontSize: 10, flexShrink: 1, flexWrap: 'wrap' },
  cardFeatures: { marginTop: 6, marginBottom: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  featureDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.accentPurple, marginRight: 5 },
  featureText: { fontSize: 10, color: '#888888', flexShrink: 1, flexWrap: 'wrap' },
  cardBtn: {
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 8,
    width: '100%',
    alignSelf: 'stretch',
    // Center text using flex
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 28,
    paddingVertical: 2,
  },
  cardBtnCurrent: {
    backgroundColor: '#6b7280', // Tailwind's gray-500
    opacity: 0.7, // match opacity-70
  },
  cardBtnChoose: {
    backgroundColor: undefined, // gradient will be overlayed
    overflow: 'hidden',
  },
  cardBtnText: { color: colors.lightText, fontSize: 11 },
  cardBtnTextCurrent: { color: colors.lightText, fontSize: 11 },
  bottomCta: { marginTop: 12, alignItems: 'stretch', paddingHorizontal: 18, width: '100%', flexDirection: 'row', boxSizing: 'border-box' },
  trialBtn: {
    flex: 1,
    backgroundColor: colors.accentPurple,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 8,
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  trialBtnText: { color: colors.lightText, fontWeight: 'bold', fontSize: 13 },
  trialText: { color: colors.secondaryText, fontSize: 13, marginTop: 4, textAlign: 'center' }
});
