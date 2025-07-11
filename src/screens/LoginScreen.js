
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileDropdownMenu from '../components/ProfileDropdownMenu';

const studyPalIcon = require('../../assets/studypal-icon.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy login handler (replace with real auth logic)
  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    // Basic validation
    if (!email.trim() || !password) {
      setError('Please enter your email and password');
      setIsLoading(false);
      return;
    }
    // Simulate async login
    setTimeout(() => {
      setIsLoading(false);
      // setError('Invalid credentials'); // Uncomment for error demo
      // navigation.navigate('ChatScreen'); // Uncomment for success demo
    }, 1200);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Left: White X (close) icon */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack && navigation.goBack()}
        accessibilityLabel="Close"
      >
        <MaterialIcons name="close" size={28} color="#fff" />
      </TouchableOpacity>
      {/* Right: Profile Dropdown Menu */}
      <ProfileDropdownMenu navigation={navigation} user={null} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.centeredContent}>
          <Image source={studyPalIcon} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Login</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#a0a0a0"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
          <View style={{ width: '100%', position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#a0a0a0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(v => !v)}
              disabled={isLoading}
            >
              <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={22} color="#a0a0a0" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginBtnText}>Login</Text>}
          </TouchableOpacity>
          <View style={{ height: 16 }} />
          <Text style={styles.bottomText}>
            Don't have an account?{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate && navigation.navigate('SignUpScreen')}>Sign up</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#18181b' },
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
  closeBtn: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    width: '100%',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    marginTop: 12,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#23232a',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#23232a',
  },
  eyeBtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -11,
    padding: 4,
    zIndex: 2,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#4285F4',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#f43f5e',
    backgroundColor: '#3b1a1a',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  bottomText: {
    color: '#a0a0a0',
    fontSize: 15,
    textAlign: 'center',
  },
  linkText: {
    color: '#2da8ff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
