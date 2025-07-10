



// --- Ensure React Native is imported before any code runs ---
import * as ReactNative from 'react-native';
const { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView, Image, Pressable } = ReactNative;

import React, { useState, useRef, useEffect } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Import the StudyPal logo from the assets folder
const studyPalIcon = require('../../assets/studypal-icon.png');

/**
 * Chat Screen Component
 * Main chat interface with AI assistant
 */
export default function ChatScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const flatListRef = useRef(null);
  // Dummy usage and plan data for demonstration
  const dailyUsage = { questionsAsked: 2, remaining: 3, limit: 5 };
  const user = null; // Replace with user state
  const userPlan = 'free'; // Replace with plan state

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Split subject options into two rows for display
  const subjectOptions = [
    { key: 'Math', color: '#4F9DFE' },         // more vibrant blue
    { key: 'Science', color: '#3DDC97' },      // more vibrant green
    { key: 'Literature', color: '#FF5C8A' },   // more vibrant red/pink
    { key: 'Programming', color: '#FFD166' },  // more vibrant orange/yellow
    { key: 'Health', color: '#A084EE' },       // more vibrant purple
    { key: 'Physics', color: '#38CFF5' },      // more vibrant cyan
    { key: 'Chemistry', color: '#B6E944' },    // more vibrant lime
    { key: 'Biology', color: '#FF8FCF' },      // more vibrant pink
    { key: 'Fitness', color: '#2EE6C5' },      // more vibrant teal
    { key: 'History', color: '#FFD166' },      // more vibrant orange/yellow (same as Programming)
  ];

  // Place History on the second row
  const subjectRows = [
    subjectOptions.slice(0, 5), // Math, Science, Literature, Programming, Health
    subjectOptions.slice(5, 10) // Physics, Chemistry, Biology, Fitness, History
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: input }
    ]);
    setInput('');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hello! I'm your ${subject} tutor. What can I help you with today?`
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.role === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.role === 'user' ? styles.userText : styles.aiText
      ]}>
        {item.content}
      </Text>
    </View>
  );

  // HEADER SECTION (always visible)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Left: Logo, Title, New Chat */}
      <View style={[styles.headerLeft, { gap: 2 }]}> 
        <Text style={[styles.headerTitleText, { marginRight: 2 }]}>StudyPal</Text>
        <Image source={studyPalIcon} style={[styles.headerLogo, { marginLeft: 0, marginRight: 2, width: 24, height: 24 }]} resizeMode="contain" />
        <TouchableOpacity
          style={[styles.headerNewChatBtn, { backgroundColor: '#23232a', borderColor: '#23232a', width: 24, height: 24, borderRadius: 12, marginLeft: 5 }]}
          onPress={() => setMessages([])}
          accessibilityLabel="New Chat"
        >
          <MaterialIcons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Right: Usage Counter, Upgrade, Profile */}
      <View style={styles.headerRight}>
        {(user || dailyUsage.questionsAsked > 0 || dailyUsage.remaining < 5) && (
          <View style={[
            styles.usageCounter,
            dailyUsage.remaining === 0
              ? styles.usageCounterRed
              : styles.usageCounterNormal,
          ]}>
            <Text style={[
              styles.usageCounterText,
              dailyUsage.remaining === 0 && styles.usageCounterTextRed,
            ]}>
              {dailyUsage.remaining === 0
                ? `${dailyUsage.questionsAsked}/${dailyUsage.limit} used`
                : `${dailyUsage.remaining}/${dailyUsage.limit} left`}
            </Text>
          </View>
        )}
        {userPlan !== 'diamond' && (
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() => navigation?.navigate && navigation.navigate('Plans')}
            accessibilityLabel="Upgrade"
          >
            <Text style={styles.upgradeBtnText}>Upgrade</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => setMenuOpen(v => !v)}
          accessibilityLabel="Profile Menu"
        >
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
        {menuOpen && (
          <View style={{
            position: 'absolute',
            top: 48,
            right: 0,
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
            {!user && (
              <>
                <TouchableOpacity
                  style={{ paddingVertical: 12, paddingHorizontal: 18, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('Login'); }}
                >
                  <Text style={{ color: '#fff', fontSize: 15 }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 12, paddingHorizontal: 18 }}
                  onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('SignUp'); }}
                >
                  <Text style={{ color: '#fff', fontSize: 15 }}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )}
            {user && (
              <TouchableOpacity
                style={{ paddingVertical: 12, paddingHorizontal: 18, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('Profile'); }}
              >
                <Text style={{ color: '#fff', fontSize: 15 }}>Profile</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 18 }}
              onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('Plans'); }}
            >
              <Text style={{ color: '#fff', fontSize: 15 }}>Plans</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 18, borderBottomLeftRadius: !user ? 12 : 0, borderBottomRightRadius: !user ? 12 : 0 }}
              onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('Chat'); }}
            >
              <Text style={{ color: '#fff', fontSize: 15 }}>Chat</Text>
            </TouchableOpacity>
            {user && (
              <TouchableOpacity
                style={{ paddingVertical: 12, paddingHorizontal: 18, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
                onPress={() => { setMenuOpen(false); /* handleLogout() */ }}
              >
                <Text style={{ color: '#f43f5e', fontSize: 15 }}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );


  // --- MAIN SECTION: Welcome screen (no messages) ---
  // Shows centered title, subject bubbles in two rows, and input bar
  if (messages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        <Pressable onPress={ReactNative.Keyboard.dismiss} style={{ flex: 1 }} pointerEvents={undefined}>
          <KeyboardAvoidingView
            style={styles.centeredContainer}
            keyboardVerticalOffset={90}
          >
            <View style={[styles.centeredContent, {paddingHorizontal: 16}]}> 
              {/* Welcome title */}
              <Text style={styles.welcomeTitle}>How can I help you?</Text>
              {/* Subject bubbles in two rows */}
              <View style={{ width: '100%', alignSelf: 'center', paddingHorizontal: 4 }}>
                {subjectRows.map((row, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 2,
                      width: '100%',
                      gap: 0, // for web, but not supported on mobile
                    }}
                  >
                    {row.map((subject, sidx) => (
                      <TouchableOpacity
                        key={subject.key}
                        style={[
                          styles.subjectBubbleSmall,
                          {
                            backgroundColor: subject.color,
                            minWidth: 36,
                            alignSelf: 'center',
                            marginLeft: sidx === 0 ? 0 : 2,
                            marginRight: sidx === row.length - 1 ? 0 : 2,
                            marginVertical: 1,
                            paddingHorizontal: 10,
                            paddingVertical: 7,
                          },
                        ]}
                        onPress={() => handleSubjectSelect(subject.key)}
                      >
                        <Text
                          style={[
                            styles.subjectTextSmall,
                            { fontSize: 12, color: 'rgba(0,0,0,0.65 )', fontWeight: 'bold' }
                          ]}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {subject.key}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
              {/* Input bar for user question */}
              {/* Input bar background changed to dark grey (#23232a) for better contrast */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#23232a', borderRadius: 32, width: '100%', marginTop: 18, paddingVertical: 6, paddingHorizontal: 8 }}>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: 'transparent', marginRight: 0, textAlign: 'left', textAlignVertical: 'top', paddingTop: 10, paddingBottom: 0 }
                  ]}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type your question..."
                  placeholderTextColor="#a0a0a0"
                  multiline
                  onBlur={() => {
                    if (!input.trim()) setInput('');
                  }}
                />
                <Pressable
                  style={{ marginLeft: 0, marginRight: 6, padding: 0, backgroundColor: 'transparent', borderRadius: 0, alignItems: 'center', justifyContent: 'center', height: 24, width: 24 }}
                  onPress={() => {}}
                  android_ripple={undefined}
                  accessibilityLabel="Attach file"
                >
                  <MaterialIcons name="attach-file" size={20} color="#a0a0a0" style={{ transform: [{ rotate: '30deg' }] }} />
                </Pressable>
                <TouchableOpacity style={[styles.sendButtonSmall, { marginLeft: 0, marginRight: 4 }]} onPress={sendMessage}>
                  <Ionicons name="send" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </SafeAreaView>
    );
  }

  // --- MAIN SECTION: Chat screen with messages ---
  // Shows chat messages and input bar
  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <Pressable onPress={ReactNative.Keyboard.dismiss} style={{ flex: 1 }} pointerEvents={undefined}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={90}
        >
          <View style={{ flex: 1 }}>
            {/* Chat messages list */}
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.messagesList}
              inverted
            />
            {/* Input bar for user question */}
            {/* Input bar background changed to dark grey (#23232a) for better contrast */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#23232a', borderRadius: 32, width: '100%', paddingVertical: 8, paddingHorizontal: 8 }}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: 'transparent', marginRight: 0, textAlign: 'left', textAlignVertical: 'top', paddingTop: 10, paddingBottom: 0 }
                ]}
                value={input}
                onChangeText={setInput}
                placeholder="Type your question..."
                placeholderTextColor="#a0a0a0"
                multiline
                onBlur={() => {
                  if (!input.trim()) setInput('');
                }}
              />
              <Pressable
                style={{ marginLeft: 0, marginRight: 6, padding: 0, backgroundColor: 'transparent', borderRadius: 0, alignItems: 'center', justifyContent: 'center', height: 24, width: 24 }}
                onPress={() => {}}
                android_ripple={undefined}
                accessibilityLabel="Attach file"
              >
                <MaterialIcons name="attach-file" size={20} color="#a0a0a0" style={{ transform: [{ rotate: '30deg' }] }} />
              </Pressable>
              <TouchableOpacity style={[styles.sendButtonSmall, { marginLeft: 0, marginRight: 4 }]} onPress={sendMessage}>
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#18181b' },
  container: { flex: 1 },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  centeredContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    boxSizing: 'border-box',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subjectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    // gap is not supported on mobile, use marginHorizontal on children
  },
  subjectBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  subjectBubbleSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
    marginVertical: 3,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  subjectText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subjectTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  inputBarCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#18181b',
    borderRadius: 16,
    padding: 6,
    width: '100%',
    // No border for a clean look
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#18181b',
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
  },
  headerLogo: {
    height: 28,
    width: 28,
    marginRight: 4,
  },
  headerNewChatBtn: {
    marginLeft: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  usageCounter: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 12,
    marginRight: 2,
  },
  usageCounterNormal: {
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
  },
  usageCounterRed: {
    backgroundColor: '#1e293b',
    borderColor: '#f43f5e',
  },
  usageCounterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  usageCounterTextRed: {
    color: '#f43f5e',
  },
  upgradeBtn: {
    borderWidth: 1,
    borderColor: '#4285F4',
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 2,
  },
  upgradeBtnText: {
    color: '#4285F4',
    fontWeight: 'bold',
    fontSize: 13,
  },
  profileBtn: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
  },
  userMessage: {
    backgroundColor: '#23232a',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#3b87f6',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#ffffff',
  },
  aiText: {
    color: '#ffffff',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#000',
    // No border for a clean look
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 36,
    maxHeight: 80,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#ffffff',
    backgroundColor: '#23232a',
    borderRadius: 32,
    marginRight: 8,
    ...Platform.select({
      ios: { lineHeight: 20 },
      android: {},
      default: {},
    }),
  },
  sendButton: {
    backgroundColor: '#4285F4',
    borderRadius: 24,
    padding: 10,
    marginLeft: 0,
  },
  sendButtonSmall: {
    backgroundColor: '#4285F4',
    borderRadius: 16,
    padding: 6,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
