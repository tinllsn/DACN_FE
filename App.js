import React, { useState } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
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

  // const uploadImage = async () => {
  //   if (!image) return;

  //   setLoading(true);
  //   const filename = image.split('/').pop();
  //   const match = /\.(\w+)$/.exec(filename);
  //   const type = match ? `image/${match[1]}` : `image`;

  //   try {
  //     // Tạo formData với ảnh đã chọn
  //     const formData = new FormData();
  //     formData.append('file', {
  //       uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
  //       name: filename,
  //       type: type,
  //     });

  //     console.log('Uploading image:', {
  //       uri: image,
  //       name: filename,
  //       type: type
  //     });

  //     const response = await fetch('https://ec88-14-233-228-77.ngrok-free.app/classifications/uploads', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //         'ngrok-skip-browser-warning': 'true'
  //       },
  //     });

  //     if (!response.ok) {
  //       let errorMessage = 'Upload failed';
  //       switch (response.status) {
  //         case 413:
  //           errorMessage = 'File quá lớn, vui lòng chọn ảnh nhỏ hơn';
  //           break;
  //         case 404:
  //           errorMessage = 'Không tìm thấy API endpoint';
  //           break;
  //         case 400:
  //           errorMessage = 'Dữ liệu không đúng định dạng';
  //           break;
  //         default:
  //           errorMessage = `Lỗi server: ${response.status}`;
  //       }
  //       throw new Error(errorMessage);
  //     }

  //     const data = await response.json();
  //     console.log('Response data:', data);
      
  //     // Xử lý response theo format mới
  //     if (data && data.data) {
  //       const result = data.data;
  //       let resultText = '';
        
  //       if (result.classification) {
  //         resultText = `Phân loại: ${result.classification}\n`;
  //       }
  //       if (result.confidence) {
  //         resultText += `Độ tin cậy: ${(result.confidence * 100).toFixed(2)}%\n`;
  //       }
  //       if (result.recycling_instructions) {
  //         resultText += `Hướng dẫn tái chế: ${result.recycling_instructions}`;
  //       }
        
  //       console.log(resultText);
  //       setResult(resultText);
  //     } else {
  //       setResult('Không thể phân loại ảnh');
  //     }
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     Alert.alert(
  //       "Lỗi",
  //       error.message || 'Vui lòng thử lại sau'
  //     );
  //     setResult(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const uploadImage = async () => {
    if (!image) return;
    
    setLoading(true);
    
    try {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
  
      const formData = new FormData();
  
      // GỬI FIELD "file" (đúng tên backend cần)
      formData.append('file', {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
  
      // Các field khác backend cần
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
