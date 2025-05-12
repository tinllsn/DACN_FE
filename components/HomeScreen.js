import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  const navigateToGallery = () => {
    navigation.navigate('LibraryPicker');
  };

  const navigateToDosAndDonts = () => {
    navigation.navigate('DosDonts');
  };

  const navigateAccountScreen = () => {
    navigation.navigate('AccountScreen');
  };

  const uploadImage = async (imageUri) => {
    if (!imageUri) return;

    setLoading(true);

    try {
      // Compress the image before uploading
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      const uriParts = manipResult.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();

      formData.append('file', {
        uri: manipResult.uri,
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

  const navigateToNews = () => {
    // Implementation for news screen
  };

  const navigateToFAQ = () => {
    // Implementation for FAQ screen
  };

  const navigateToGuide = () => {
    navigation.navigate('QuickGuide');
  };

  

  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Background Image with Welcome Message */}
      <ImageBackground
        source={require('../assets/sunset-background.jpg')}
        style={styles.headerBackground}
      >
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome to EcoSort</Text>
        </View>
      </ImageBackground>

      {/* Curved White Background */}
      <View style={styles.curvedBackground}>
        {/* App Title */}
        <Text style={styles.appTitle}>EcoSort</Text>
        

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {/* Top Row */}
          <View style={styles.menuRow}>
            {/* Camera Option */}
            <TouchableOpacity style={styles.menuItem} onPress={navigateToCamera}>
              <View style={[styles.iconContainer, styles.cameraIcon]}>
                <Image
                  source={require('../assets/camera-icon.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuText}>Camera</Text>
            </TouchableOpacity>

            {/* Gallery Option */}
            <TouchableOpacity style={styles.menuItem} onPress={navigateToGallery}>
              <View style={[styles.iconContainer, styles.galleryIcon]}>
                <Image
                  source={require('../assets/gallery-icon.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuText}>Pick from library</Text>
            </TouchableOpacity>

            {/* Guide Option */}
            <TouchableOpacity style={styles.menuItem} onPress={navigateToDosAndDonts}>
              <View style={[styles.iconContainer, styles.guideIcon]}>
                <Image
                  source={require('../assets/guide-icon.png')}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuText}>Dos & Don'ts</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Row */}
          <View style={styles.menuRow}>
            {/* Empty space to balance the grid */}
            <View style={styles.menuItem}></View>
            <View style={styles.menuItem}></View>
            <View style={styles.menuItem}></View>
          </View>
        </View>

        {/* Result Display */}
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/home-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateToGuide}>
          <Image
            source={require('../assets/quick-guide-icon.png')} 
            style={styles.navIcon}
            
          />
          <Text style={styles.navText}>Quick Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateAccountScreen}>
          <Image
            source={require('../assets/account-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBackground: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: 'none',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    // marginTop: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#16a34a',
  },
  curvedBackground: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuGrid: {
    flex: 1,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {
    width: '30%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cameraIcon: {
    backgroundColor: '#e0f7fa',        // Xanh nhạt – liên tưởng đến camera/quét
    borderWidth: 1,
    borderColor: '#00acc1',           // Cyan đậm
    borderStyle: 'dashed',
  },

  galleryIcon: {
    backgroundColor: '#fff3e0',        // Cam nhạt – thư viện ảnh
    borderWidth: 1,
    borderColor: '#fb8c00',           // Cam đậm
    borderStyle: 'dashed',
  },

  newsIcon: {
    backgroundColor: '#fce4ec',        // Hồng nhạt – tin tức
    borderWidth: 1,
    borderColor: '#d81b60',           // Hồng sen đậm
    borderStyle: 'dashed',
  },

  faqIcon: {
    backgroundColor: '#e8f5e9',        // Xanh lá nhạt – giải đáp
    borderWidth: 1,
    borderColor: '#43a047',           // Xanh lá đậm
    borderStyle: 'dashed',
  },

  guideIcon: {
    backgroundColor: '#e3f2fd',        // Xanh dương nhạt – hướng dẫn
    borderWidth: 1,
    borderColor: '#1e88e5',           // Xanh dương đậm
    borderStyle: 'dashed',
  },

  icon: {
    width: 50,
    height: 50,
    tintColor: '#555',
  },
  menuText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 20,
    height: 20,
    tintColor: '#555',
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
  // centerButton: {
  //   width: 60,
  //   height: 60,
  //   backgroundColor: '#32CD32',
  //   borderRadius: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: -30,
  // },
  // centerButtonIcon: {
  //   width: 30,
  //   height: 30,
  //   tintColor: 'white',
  // },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f8f0',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default HomeScreen;