



// --- Ensure React Native is imported before any code runs ---
import * as ReactNative from 'react-native';
const { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } = ReactNative;
import React, { useState, useRef, useEffect } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

/**
 * Chat Screen Component
 * Main chat interface with AI assistant
 */
export default function ChatScreen() {
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

  const subjectOptions = [
    { key: 'Math', color: '#4285F4' },
    { key: 'Science', color: '#10b981' },
    { key: 'Literature', color: '#f43f5e' },
    { key: 'Programming', color: '#f59e42' },
    { key: 'Health', color: '#8B5CF6' },
    { key: 'History', color: '#f59e42' },
    { key: 'Physics', color: '#06b6d4' },
    { key: 'Chemistry', color: '#84cc16' },
    { key: 'Biology', color: '#ec4899' },
    { key: 'Fitness', color: '#14b8a6' },
    { key: 'Economics', color: '#a21caf' },
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
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitleText}>StudyPal</Text>
        {/* <Image source={studyPalIcon} style={styles.headerLogo} resizeMode="contain" /> */}
        <TouchableOpacity
          style={styles.headerNewChatBtn}
          onPress={() => setMessages([])}
          accessibilityLabel="New Chat"
        >
          <MaterialIcons name="add" size={20} color="#4285F4" />
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
            onPress={() => {}}
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
          <MaterialIcons name="person" size={24} color="#4285F4" />
        </TouchableOpacity>
        {/* Profile menu dropdown can be implemented here if needed */}
      </View>
    </View>
  );

  // Welcome screen: centered title, subject bubbles, input
  if (messages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        <KeyboardAvoidingView
          style={styles.centeredContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={90}
        >
          <View style={styles.centeredContent}>
            <Text style={styles.welcomeTitle}>How can I help you?</Text>
            <View style={styles.subjectsRow}>
              {subjectOptions.map(subject => (
                <TouchableOpacity
                  key={subject.key}
                  style={[styles.subjectBubble, { backgroundColor: subject.color }]}
                  onPress={() => handleSubjectSelect(subject.key)}
                >
                  <Text style={styles.subjectText}>{subject.key}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.inputBarCentered}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2a1052', borderRadius: 16 }}>
                <TextInput
                  style={[styles.input, { backgroundColor: 'transparent', marginRight: 0 }]}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type your question..."
                  placeholderTextColor="#a0a0a0"
                  multiline
                  onBlur={() => {
                    if (!input.trim()) setInput('');
                  }}
                />
                <TouchableOpacity style={[styles.sendButton, { marginLeft: 0, marginRight: 4 }]} onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Chat screen with messages
  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
        />
        <View style={styles.inputBar}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2a1052', borderRadius: 16 }}>
            <TextInput
              style={[styles.input, { backgroundColor: 'transparent', marginRight: 0 }]}
              value={input}
              onChangeText={setInput}
              placeholder="Type your question..."
              placeholderTextColor="#a0a0a0"
              multiline
              onBlur={() => {
                if (!input.trim()) setInput('');
              }}
            />
            <TouchableOpacity style={[styles.sendButton, { marginLeft: 0, marginRight: 4 }]} onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1 },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  centeredContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
    gap: 8,
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
  subjectText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputBarCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#000',
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
    backgroundColor: '#000',
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
    backgroundColor: '#000',
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  messagesList: {
    padding: 16,
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
    backgroundColor: '#2a1052',
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
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 12,
    color: '#ffffff',
    backgroundColor: '#2a1052',
    borderRadius: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#4285F4',
    borderRadius: 24,
    padding: 10,
    marginLeft: 0,
  },
});
