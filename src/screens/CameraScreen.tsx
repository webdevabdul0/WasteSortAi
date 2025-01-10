import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const CameraScreen = ({navigation, route}: any) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const device = useCameraDevice('back');
  const [isInitialized, setIsInitialized] = useState(false);
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(true);
    })();
  }, []);

  const handleCapture = async () => {
    console.log('This should be inside handleCapture', camera.current);
    if (camera.current && isInitialized) {
      try {
        console.log('This should Capture a Photo');
        // Take a photo and get the file URI
        const photo = await camera.current.takePhoto({
          flash: 'auto', // Optional: set flash behavior
        });

        // Handle the captured photo (you can display it or upload it)
        setPhotoPath(photo.path);

        // Simulate navigating to the loading screen with the photo and the next keywordIndex
        navigation.navigate('Loading', {
          photo: {path: photo.path},
        });
      } catch (error) {
        console.error('Failed to capture photo:', error);
        Alert.alert('Error', 'Failed to capture photo');
      }
    }
  };

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        onInitialized={() => setIsInitialized(true)} // Set initialization state to true
        ref={camera} // Assign the camera ref here
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#FFD700', // Yellowish button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2540', // Dark bluish text
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',

    borderRadius: 10,
  },
});
