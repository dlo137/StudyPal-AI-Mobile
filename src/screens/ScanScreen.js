import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import colors from '../theme/colors';

const isWeb = Platform.OS === 'web';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(isWeb ? true : null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  // Request permissions every time the screen is focused
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraResult = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraResult.status === 'granted');
    };
    const unsubscribe = navigation?.addListener('focus', checkPermissions);
    checkPermissions();
    return unsubscribe;
  }, [navigation]);

  // Take a picture and send it to the chat section as an attachment
  /**
   * Take a picture using the camera and handle the result.
   * Shows error if camera is not ready or not connected.
   */
  const takePicture = async () => {
    if (isWeb) return;
    if (!cameraRef.current) {
      alert('Camera is not connected. Please try again.');
      return;
    }
    if (!cameraReady) {
      alert('Camera is still loading. Please wait.');
      return;
    }
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        // Optionally save to media library
        // await MediaLibrary.saveToLibraryAsync(photo.uri);
        // For now, just log the URI
        console.log('Photo URI:', photo.uri);
        // TODO: Implement navigation or state update to add this photo to the chat as an attachment
        // Example: navigation.navigate('ChatScreen', { attachment: photo.uri })
      } else {
        alert('Failed to capture photo.');
      }
    } catch (err) {
      alert('Error capturing photo: ' + err?.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 32, height: 32 }} />
        <Text style={styles.headerTitle}>SCANNER</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <View style={styles.profileCircle}>
            <MaterialIcons name="person-outline" size={20} color="#a0a0a0" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Camera Body Section */}
      {!isWeb ? (
        hasPermission === null ? (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionTitle}>Camera Permission Needed</Text>
            <Text style={styles.permissionMsg}>To scan questions, please allow StudyPal to access your camera.</Text>
          </View>
        ) : hasPermission === false ? (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionTitle}>No Access to Camera</Text>
            <Text style={styles.permissionMsg}>Please enable camera permissions in your device settings.</Text>
          </View>
        ) : Camera && Camera.Constants && Camera.Constants.Type ? (
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
              onCameraReady={() => setCameraReady(true)}
              ratio={Platform.OS === 'ios' ? '16:9' : undefined}
            />
            {!cameraReady && (
              <View style={styles.cameraLoadingOverlay}>
                <Text style={styles.statusMsg}>Connecting to camera...</Text>
              </View>
            )}
            <View style={styles.overlay} pointerEvents="box-none">
              <Text style={styles.instruction}>Take a picture of your question</Text>
              <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                <Entypo name="plus" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.statusMsg}>Camera is not connected or not available.</Text>
          </View>
        )
      ) : (
        <View style={[styles.cameraContainer, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={styles.statusMsg}>
            Camera is not supported in web preview. Please use the mobile app to scan questions.
          </Text>
        </View>
      )}

      {/* Bottom Nav - stick to bottom */}
      <View style={[styles.bottomNav, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}> 
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.bottomText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomCenterBtn} onPress={takePicture} />
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.bottomText}>Photos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18181c',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionMsg: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
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
  profileCircle: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  cameraLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#18181c',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  bottomBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomCenterBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  statusMsg: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default ScanScreen;
