import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from './components/Header';
import ImageViewer from './components/ImageViewer';
import ActionButtons from './components/ActionButtons';
import UploadButton from './components/UploadButton';

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

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
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: filename,
      type,
    });

    try {
      const response = await fetch('http://<YOUR_BACKEND_URL>/classify', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      setResult(data.label || 'No label returned');
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong when uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {image && <ImageViewer image={image} />}
      <ActionButtons onPickImage={pickImage} onTakePhoto={takePhoto} />
      <UploadButton image={image} loading={loading} result={result} onUpload={uploadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
