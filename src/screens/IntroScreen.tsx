import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const IntroScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/image.png')} style={styles.image} />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>Waste Sort AI</Text>

      {/* Descriptive Text */}
      <Text style={styles.description}>
        Revolutionize waste sorting with our AI-powered technology. Secure,
        efficient, and built for a cleaner future.
      </Text>

      {/* Prominent Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091725', // Dark bluish background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  imageText: {
    color: '#0A2540',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 36, // Slightly larger

    color: '#FFD700', // Yellowish text
    marginBottom: 20,
    fontWeight: 'bold', // Bold weight for emphasis
    fontFamily: 'sans-serif-condensed',
    textTransform: 'uppercase',
    letterSpacing: 3, // Extra spacing for boldness
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#D9E3F0', // Light bluish text
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 24,
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
  image: {
    width: 320, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'cover', // Adjust image scaling
    marginBottom: 30,
  },
});
