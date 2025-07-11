import React, { useState } from 'react';
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

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => setMenuOpen(true)}
        accessibilityLabel="Profile Menu"
      >
        <View style={styles.iconCircle}>
          <MaterialIcons name="person-outline" size={20} color="#a0a0a0" />
        </View>
      </TouchableOpacity>
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuOpen(false)}>
          <View style={styles.dropdownMenuWrapper} pointerEvents="box-none">
            <View style={styles.dropdownMenu}>
              {/* Dropdown menu navigation logic */}
              {!user && (
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
              {user && (
                <TouchableOpacity
                  style={[styles.menuItem, styles.menuItemTop]}
                  onPress={() => { setMenuOpen(false); navigation.navigate && navigation.navigate('Profile'); }}
                >
                  <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
              )}
              {user && (
                <TouchableOpacity
                  style={[styles.menuItem, styles.menuItemBottom]}
                  onPress={() => { setMenuOpen(false); /* handleLogout() */ }}
                >
                  <Text style={[styles.menuText, { color: '#f43f5e' }]}>Logout</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>

  );
}


const styles = StyleSheet.create({
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
  dropdownMenu: {
    position: 'absolute',
    top: 40,
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
