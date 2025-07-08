
// ScanScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import colors from '../theme/colors';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('📸 Photo captured:', photo.uri);
      // TODO: Send to AI backend for analysis
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.fakeCamera}>
        <Text style={styles.title}>Scan question</Text>
        <View style={styles.focusBox}>
          <Text style={styles.instruction}>Center the question on your screen</Text>
        </View>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.innerCircle} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBg, justifyContent: 'center', alignItems: 'center' },
  fakeCamera: {
    width: '90%',
    height: '70%',
    backgroundColor: colors.primaryHoverBlue,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  title: {
    color: colors.accentPurple,
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  focusBox: {
    borderColor: colors.accentPurple,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    backgroundColor: 'rgba(140,82,255,0.05)',
    marginTop: 40,
  },
  instruction: {
    color: colors.secondaryText,
    fontSize: 13,
    textAlign: 'center',
  },
  captureButton: {
    backgroundColor: colors.lightText,
    borderRadius: 40,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: colors.accentPurple,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
