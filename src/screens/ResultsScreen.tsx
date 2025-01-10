import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

const ResultsScreen = ({route, navigation}: any) => {
  const {photo, result, keywordIndex} = route.params; // Destructure both photo and result
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
    console.log(photo.path, 'In Results Screen');
    console.log(result, 'Backend Response'); // Log the result to see the data
  }, []);

  const imageUri = `file://${photo.path}`;

  // Function to render JSON with keys as labels and values without quotes
  const renderJson = (json: any) => {
    return Object.keys(json).map(key => (
      <View style={styles.jsonItem} key={key}>
        <Text style={styles.jsonKey}>{key}:</Text>
        <Text style={styles.jsonValue}>{formatJsonValue(json[key])}</Text>
      </View>
    ));
  };

  // Function to format JSON values (removing quotes and better representation)
  const formatJsonValue = (value: any) => {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2); // For objects, format with indentation
    }
    return value?.toString() || ''; // Convert other values to string without quotes
  };

  const handleCaptureAgain = () => {
    navigation.navigate('Camera');
  };

  const handleSave = () => {
    // Placeholder function for Save button (currently does nothing)
    console.log('Save button clicked');

    // Show the success modal
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollableContent}
        contentContainerStyle={styles.scrollableContentContainer}>
        <View style={styles.card}>
          {/* Image Display */}
          {photo?.path ? (
            <Image source={{uri: imageUri}} style={styles.image} />
          ) : (
            <Text style={styles.noPhotoText}>No photo available</Text>
          )}

          {/* JSON Data Display */}
          <ScrollView style={styles.resultContainer}>
            {result ? (
              renderJson(result)
            ) : (
              <Text style={styles.noResultText}>No results available</Text>
            )}
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCaptureAgain}>
              <Text style={styles.buttonText}>Capture Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Results saved to device successfully!
            </Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A', // Bluish background
  },
  header: {
    paddingTop: 50, // Add space to the top for the header
    paddingBottom: 20,
    backgroundColor: '#007BFF', // Blue background for header
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollableContent: {
    flex: 1, // This allows the content below the header to take up remaining space
  },
  scrollableContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Padding at the bottom to give space for the buttons
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF', // Blue border
  },
  noPhotoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  jsonItem: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  jsonKey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF', // Blue color for keys (styled as labels)
    backgroundColor: '#E0F7FF', // Light blue background for keys
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 4,
    textTransform: 'capitalize', // Capitalize the first letter of each word in keys
  },
  jsonValue: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  noResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Even spacing between buttons
  },
  button: {
    backgroundColor: '#007BFF', // Blue button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30, // Rounded edges for buttons
    margin: 10,
    width: 140, // Width of buttons
    alignItems: 'center', // Center text inside the button
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF', // Blue color for the modal text
  },
});
