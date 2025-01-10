import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const LoadingScreen = ({navigation, route}: any) => {
  const {photo} = route.params; // Default index is 0 if not passed
  const [loading, setLoading] = useState(false);

  const fetchKeywordData = async () => {
    try {
      setLoading(true); // Start loading

      console.log('Received photo object:', photo);

      // Check if the photo URI exists
      if (!photo || !photo.path) {
        console.error('Photo object is missing or the path is not available');
        throw new Error('No image path found');
      }

      const imageUri = `file://${photo.uri}`; // Using file URI here

      // Prepare the form data with the image file
      const formData = new FormData();
      formData.append('image', {
        uri: `file://${photo.path}`, // Using `photo.path` with the "file://" prefix
        type: 'image/jpeg', // or your image type
        name: 'photo.jpg', // image file name
      });

      const response = await fetch(
        'https://visiondetectwaste.netlify.app/.netlify/functions/server/classify', // Your backend API URL
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data', // Correct Content-Type for file uploads
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Navigate to the results screen after receiving data
      navigation.navigate('Results', {
        result: data,
        photo,
      });

      setLoading(false); // Stop loading after navigation
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeywordData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.text}>Processing...</Text>
        </>
      ) : (
        <Text style={styles.text}>Fetching data ...</Text>
      )}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A8A', // Blue background
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff', // White text
  },
});
