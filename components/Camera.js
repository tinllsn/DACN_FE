import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Camera = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
  
      const response = await fetch('https://ec88-14-233-228-77.ngrok-free.app/classifications/uploads', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
      });
  
      const responseText = await response.text();
      console.log('Response:', response.status, responseText);
  
      if (!response.ok) {
        throw new Error(`Lỗi ${response.status}: ${responseText}`);
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
      console.error('Upload error:', error.message);
      Alert.alert("Lỗi", error.message || 'Vui lòng thử lại sau');
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