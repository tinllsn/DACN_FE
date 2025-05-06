import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';

const LibraryPicker = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [1, 1],
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
  
      formData.append('userId', '1');
      formData.append('wasteType', 'Plastic');
      formData.append('confidence', '0.95');
      formData.append('suggestion', 'Please recycle this');

      console.log('Uploading to:', 'https://73ea-14-236-175-35.ngrok-free.app/classifications/uploads');
      console.log('FormData:', formData);
  
      const response = await fetch('https://73ea-14-236-175-35.ngrok-free.app/classifications/uploads', {
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
  
      if (data && data.data) {
        const result = data.data;
        let resultText = '';
  
        if (result.classification) {
          resultText += `Phân loại: ${result.classification}\n`;
        }
        if (result.confidence) {
          resultText += `Độ tin cậy: ${(result.confidence * 100).toFixed(2)}%\n`;
        }
        if (result.recycling_instructions) {
          resultText += `Hướng dẫn tái chế: ${result.recycling_instructions}`;
        }
  
        setResult(resultText);
      } else {
        setResult('Không thể phân loại ảnh');
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
        <Text style={styles.headerTitle}>Pick from Library</Text>
      </View>

      {/* Image Preview */}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
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

export default LibraryPicker; 