
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

/**
 * Plans Screen Component
 * Study plans and subscription management
 */
export default function PlansScreen() {
  // Mock state for demonstration
  const [currentUserPlan, setCurrentUserPlan] = useState('free');
  const [showFreeTrialText, setShowFreeTrialText] = useState(false);

  // Plan display
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
      icon: <Feather name="zap" size={22} color="#fff" />,
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
      icon: <FontAwesome5 name="star" size={22} color="#fff" />,
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
      icon: <FontAwesome5 name="crown" size={22} color="#fff" />,
      gradient: ['#8C52FF', '#5CE1E6']
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="close" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PLANS</Text>
          <View style={styles.headerBtn} />
        </View>

        {/* Title and Description */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>StudyPal: AI Homework Helper</Text>
          <Text style={styles.mainDesc}>
            Saves time and stress while ensuring clarity and quality in your homework, making it the smart choice for tackling assignments with ease.
          </Text>
        </View>

        {/* Plans Cards */}
        <View style={styles.cardsRow}>
          {plans.map(plan => (
            <View key={plan.key} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.cardIcon, { backgroundColor: plan.gradient[0] }]}>
                  {plan.icon}
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.cardTitle}>{plan.title}</Text>
                  <Text style={styles.cardPrice}>{plan.price}</Text>
                </View>
              </View>
              <View style={styles.cardFeatures}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  styles.cardBtn,
                  currentUserPlan === plan.key
                    ? styles.cardBtnCurrent
                    : styles.cardBtnChoose
                ]}
                disabled={currentUserPlan === plan.key}
                onPress={() => {
                  if (plan.key === 'diamond') setShowFreeTrialText(true);
                  setCurrentUserPlan(plan.key);
                }}
              >
                <Text style={styles.cardBtnText}>
                  {currentUserPlan === plan.key ? 'Current Plan' : `Choose ${plan.title.split(' ')[0]}`}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomCta}>
          <TouchableOpacity
            style={styles.trialBtn}
            onPress={() => setShowFreeTrialText(true)}
          >
            <Text style={styles.trialBtnText}>Start Free Trial</Text>
          </TouchableOpacity>
          {showFreeTrialText && (
            <Text style={styles.trialText}>
              7-day free diamond trial, then $19.99/month
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.darkBg },
  scroll: { paddingBottom: 32 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.primaryHoverBlue, backgroundColor: colors.darkBg
  },
  headerBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: 'bold', fontSize: 18, color: colors.primaryBlue, letterSpacing: 1 },
  titleSection: { alignItems: 'center', marginTop: 24, marginBottom: 16, paddingHorizontal: 12 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 6, color: colors.primaryBlue, textAlign: 'center' },
  mainDesc: { color: colors.secondaryText, fontSize: 15, textAlign: 'center' },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, marginHorizontal: 6 },
  card: {
    flex: 1, backgroundColor: colors.primaryHoverBlue, borderRadius: 16, marginHorizontal: 4, padding: 12,
    shadowColor: colors.darkText, shadowOpacity: 0.04, shadowRadius: 2, elevation: 2, minWidth: 120
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  cardIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  cardTitle: { fontWeight: 'bold', color: colors.lightText, fontSize: 15 },
  cardPrice: { color: colors.accentPurple, fontWeight: 'bold', fontSize: 14 },
  cardFeatures: { marginTop: 6, marginBottom: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  featureDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accentPurple, marginRight: 7 },
  featureText: { fontSize: 13, color: colors.lightText },
  cardBtn: { marginTop: 8, borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  cardBtnCurrent: { backgroundColor: colors.usageBadgeRedBg },
  cardBtnChoose: { backgroundColor: colors.accentPurple },
  cardBtnText: { color: colors.lightText, fontWeight: 'bold', fontSize: 13 },
  bottomCta: { marginTop: 32, alignItems: 'center', paddingHorizontal: 16 },
  trialBtn: { backgroundColor: colors.accentPurple, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, marginBottom: 8 },
  trialBtnText: { color: colors.lightText, fontWeight: 'bold', fontSize: 15 },
  trialText: { color: colors.secondaryText, fontSize: 13, marginTop: 4, textAlign: 'center' }
});
