import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Header from './components/Header';
// import ImageViewer from './components/ImageViewer';
// import ActionButtons from './components/ActionButtons';
// import UploadButton from './components/UploadButton';
import SplashScreen from './components/Intro/SplashScreen';
import OnboardingScreen from './components/Intro/OnboardingScreen';
import OnboardingScreenTwo from './components/Intro/OnboardingScreenTwo';
import OnboardingScreenThree from './components/Intro/OnboardingScreenThree';
import GetStartedScreen from './components/Intro/GetStartedScreen';
import Camera from './components/Camera';
import LibraryPicker from './components/LibraryPicker';
import HomeScreen from './components/HomeScreen';
import RecyclingGuidelinesScreen from './components/RecyclingGuidelinesScreen';
import DosDonts from './components/DosDonts';
import NotificationsScreen from './components/NotificationsScreen';
import AccountScreen from './components/AccountScreen';
import AboutMeScreen from './components/AboutMeScreen';
import AppVersionScreen from './components/AppVersionScreen';
import QuickGuide from './components/QuickGuide';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import HistoryScreen from './components/HistoryScreen';

const Stack = createNativeStackNavigator();

// const HomeScreen = ({ navigation }) => {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission required", "Permission to access gallery is required!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setResult(null);
//     }
//   };

//   const takePhoto = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission required", "Permission to access camera is required!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setResult(null);
//     }
//   };

//   const uploadImage = async () => {
//     if (!image) return;

//     setLoading(true);

//     try {
//       const uriParts = image.split('.');
//       const fileType = uriParts[uriParts.length - 1];

//       const formData = new FormData();

//       formData.append('file', {
//         uri: image,
//         name: `photo.${fileType}`,
//         type: `image/${fileType}`,
//       });

//       formData.append('userId', '1');
//       formData.append('wasteType', 'Plastic');
//       formData.append('confidence', '0.95');
//       formData.append('suggestion', 'Please recycle this');

//       const response = await fetch('https://ec88-14-233-228-77.https://976c-113-160-225-159.ngrok-free.app/classifications/uploads-free.app/classifications/uploads', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Accept': 'application/json',
//           'https://976c-113-160-225-159.ngrok-free.app/classifications/uploads-skip-browser-warning': 'true'
//         },
//       });

//       const responseText = await response.text();
//       console.log('Response:', response.status, responseText);

//       if (!response.ok) {
//         throw new Error(`Lỗi ${response.status}: ${responseText}`);
//       }

//       const data = JSON.parse(responseText);
//       console.log('Parsed data:', data);

//       if (data && data.data) {
//         const result = data.data;
//         let resultText = '';

//         if (result.classification) {
//           resultText += `Phân loại: ${result.classification}\n`;
//         }
//         if (result.confidence) {
//           resultText += `Độ tin cậy: ${(result.confidence * 100).toFixed(2)}%\n`;
//         }
//         if (result.recycling_instructions) {
//           resultText += `Hướng dẫn tái chế: ${result.recycling_instructions}`;
//         }

//         setResult(resultText);
//       } else {
//         setResult('Không thể phân loại ảnh');
//       }
//     } catch (error) {
//       console.error('Upload error:', error.message);
//       Alert.alert("Lỗi", error.message || 'Vui lòng thử lại sau');
//       setResult(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity 
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={24} color="#32CD32" />
//       </TouchableOpacity>
//       <Header />
//       {image && <ImageViewer image={image} />}
//       <ActionButtons onPickImage={pickImage} onTakePhoto={takePhoto} />
//       <UploadButton image={image} loading={loading} result={result} onUpload={uploadImage} />
//     </View>
//   );
// };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingTwo"
          component={OnboardingScreenTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingThree"
          component={OnboardingScreenThree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LibraryPicker"
          component={LibraryPicker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecyclingGuidelines"
          component={RecyclingGuidelinesScreen} 
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="DosDonts"
          component={DosDonts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutMeScreen"
          component={AboutMeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppVersionScreen"
          component={AppVersionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuickGuide"
          component={QuickGuide}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
});
