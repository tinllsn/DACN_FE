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
import QuizGame from './components/QuizGame';

const Stack = createNativeStackNavigator();


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
        <Stack.Screen
          name="QuizGame"
          component={QuizGame}
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
