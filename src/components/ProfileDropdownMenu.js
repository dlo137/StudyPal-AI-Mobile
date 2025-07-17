import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * ProfileDropdownMenu
 * Reusable profile button with dropdown menu for navigation
 * Props:
 *   navigation: React Navigation prop
 *   user: user object (null if not signed in)
 */
export default function ProfileDropdownMenu({ navigation, user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!(user && user.user_metadata);
  // DEBUG: Show user and isLoggedIn state
  // Remove after debugging
  // console.log('ProfileDropdownMenu user:', user);
  // console.log('ProfileDropdownMenu isLoggedIn:', isLoggedIn);
  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => setMenuOpen(true)}
        accessibilityLabel="Profile Menu"
      >
        <View style={styles.iconCircle}>
          {isLoggedIn && getUserInitial(user) ? (
            <Text style={styles.iconInitial}>
              {getUserInitial(user)}
            </Text>
          ) : (
            <MaterialIcons name="person-outline" size={20} color="#a0a0a0" />
          )}
        </View>
      </TouchableOpacity>
      {/* DEBUG: Show login state in dropdown for troubleshooting */}
      {__DEV__ && (
        <Text style={{ color: 'yellow', fontSize: 10, position: 'absolute', top: 40, right: 0, zIndex: 1000 }}>
          isLoggedIn: {String(isLoggedIn)} | user: {user ? 'yes' : 'no'}
        </Text>
      )}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={{ flex: 1 }}>
          {/* Overlay to close menu when clicking outside */}
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuOpen(false)}
          />
          <View style={styles.dropdownMenuWrapper} pointerEvents="box-none">
            <View style={styles.dropdownMenu}>
              {isLoggedIn ? (
                <>
                  <TouchableOpacity
                    style={[styles.menuItem, styles.menuItemTop]}
                    onPress={() => {
                      setMenuOpen(false);
                      if (navigation.navigate) {
                        navigation.navigate('Profile');
                      }
                    }}
                  >
                    <Text style={styles.menuText}>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.menuItem, styles.menuItemBottom]}
                    onPress={async () => {
                      setMenuOpen(false);
                      await supabase.auth.signOut();
                      if (navigation.navigate) {
                        navigation.navigate('LoginScreen');
                      }
                    }}
                  >
                    <Text style={[styles.menuText, { color: '#f43f5e' }]}>Logout</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.menuItem, styles.menuItemTop]}
                    onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('LoginScreen'); }}
                  >
                    <Text style={styles.menuText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('SignUpScreen'); }}
                  >
                    <Text style={styles.menuText}>Sign Up</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Helper to get user's first initial
function getUserInitial(user) {
  if (!user || !user.user_metadata) return '';
  const { first_name, firstName, full_name, fullName, email } = user.user_metadata;
  let initial = first_name || firstName;
  if (!initial && (full_name || fullName)) {
    initial = (full_name || fullName).split(' ')[0];
  }
  if (!initial && email) {
    initial = email[0];
  }
  return initial ? initial[0].toUpperCase() : '';
}



const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
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
  iconCircle: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInitial: {
    color: '#b0b0b0',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  dropdownMenuWrapper: {
    position: 'absolute',
    top: 105, // Place below header, at top of body
    right: 16, // Add some margin from the right edge
    zIndex: 2,
    width: 170,
  },
  dropdownMenu: {
    width: '100%',
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
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  menuItemTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  menuItemBottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 15,
  },
});
