import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

const Camera = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        setUserData(parsedData);
        console.log('User data loaded:', parsedData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      // Compress the image
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(manipResult.uri);
      setResult(null);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();

      formData.append('file', {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      formData.append('userId', userData?.id);
      formData.append('wasteType', 'Plastic');
      formData.append('confidence', '0.95');
      formData.append('suggestion', 'Please recycle this');

      console.log('Uploading to:', 'https://1c83-171-225-184-205.ngrok-free.app/classifications/uploads');
      console.log('FormData:', formData);

      const response = await fetch('https://1c83-171-225-184-205.ngrok-free.app/classifications/uploads', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'multipart/form-data'
        },
      }).catch(error => {
        console.error('Fetch error:', error);
        throw new Error(`Network error: ${error.message}`);
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Server error ${response.status}: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);
      if (data) {
        let resultText = '';

        if (data.waste_type) {
          resultText += `Phân loại: ${data.waste_type}\n`;
        }
        if (data.confidence) {
          resultText += `Độ tin cậy: ${(data.confidence * 100).toFixed(2)}%\n`;
        }
        console.log('Result text:', resultText);
        setResult(resultText);
        
        // Speak the result in Vietnamese
        const speechText = `Phân loại: ${data.waste_type}. Độ tin cậy: ${(data.confidence * 100).toFixed(2)} phần trăm`;
        await Speech.speak(speechText, {
          // language: 'vi-VN',
          language: 'en-US',
          pitch: 1.0,
          rate: 0.9
        });
      } else {
        setResult('Không thể phân loại ảnh');
        await Speech.speak('Không thể phân loại ảnh', {
          language: 'vi-VN',
          pitch: 1.0,
          rate: 0.9
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert(
        "Lỗi",
        `Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.\n\nChi tiết: ${error.message}`,
        [{ text: "OK" }]
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Camera</Text>
      </View>

      {/* Image Preview */}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        {image && !loading && (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.uploadButtonText}>Upload & Classify</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#32CD32" />}

      {/* Result Display */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#32CD32',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
    marginLeft: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f0f8f0',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default Camera; 