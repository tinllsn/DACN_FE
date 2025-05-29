import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from './styles/commonStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // nếu bạn dùng Expo

// Thay đổi localhost thành IP của máy tính của bạn
// const API_URL = 'http://192.168.1.7:5000/api';
const API_URL = 'https://64fc-14-185-225-153.ngrok-free.app/auth/register';

// Sign Up Screen
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (password.length < 3) {
      setError('Password must be at least 3 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSignUp = async () => {
    setError('');
    setSuccess('');
    if (!validateForm()) return;
    try {
      setLoading(true);
      // const response = await axios.post(`${API_URL}/auth/register`, {
        const response = await axios.post(`${API_URL}`, {

        username,
        password,
        email,
        phone,
      });
      if (response.data && response.data.id && response.data.username) {
        await AsyncStorage.setItem('userData', JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          createdAt: response.data.createdAt
        }));
        setSuccess('Registration successful! Please login.');
        setTimeout(() => navigation.navigate('LoginScreen'), 1500);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Username already exists. Please choose another one.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, { flex: 1 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingBottom: 20
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <TouchableOpacity
              style={commonStyles.backButton}
              onPress={() => navigation.navigate('WelcomeScreen')}
            >
              <Text style={commonStyles.backButtonText}>←</Text>
            </TouchableOpacity>

            <View style={commonStyles.logoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={commonStyles.logo}
              />
              <Text style={commonStyles.screenTitle}>Create Your Account</Text>
              <Text style={[commonStyles.signupPromptText, { marginTop: 10 }]}>
                Already have an account?{' '}
                <Text
                  style={commonStyles.linkText}
                  onPress={() => navigation.navigate('LoginScreen')}
                >
                  Sign in
                </Text>
              </Text>
            </View>

            {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
            {success ? <Text style={{ color: 'green', textAlign: 'center', marginBottom: 10 }}>{success}</Text> : null}

            {/* <TouchableOpacity style={commonStyles.socialButton}>
              <Text style={commonStyles.socialButtonIcon}>f</Text>
              <Text style={commonStyles.socialButtonText}>Sign up with FACEBOOK</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={commonStyles.googleButton}>
              <Image 
                source={require('../assets/logo.png')} 
                style={commonStyles.googleIcon}
              />
              <Text style={commonStyles.googleButtonText}>Sign up with GOOGLE</Text>
            </TouchableOpacity> */}

            {/* <Text style={commonStyles.orText}>or SIGN UP WITH EMAIL</Text> */}

            <TextInput
              style={[commonStyles.input, { marginBottom: 15 }]}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            {/* <TextInput
              style={[commonStyles.input, { marginBottom: 15 }]}
              placeholder="Email (optional)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[commonStyles.input, { marginBottom: 15 }]}
              placeholder="Phone (optional)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            /> */}

            {/* TextInput cho Password */}
            <View style={[commonStyles.input, { marginBottom: 15, flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {/* TextInput cho Confirm Password */}
            <View style={[commonStyles.input, { marginBottom: 20, flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {/* <View style={[commonStyles.checkboxContainer, { marginBottom: 20 }]}>
              <TouchableOpacity 
                style={[commonStyles.checkbox, agreeToTerms && commonStyles.checkboxChecked]}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                {agreeToTerms && <Text style={commonStyles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Text style={commonStyles.checkboxLabel}>
                I have read the{' '}
                <Text style={commonStyles.linkText}>privacy policy</Text>
              </Text>
            </View> */}

            <TouchableOpacity
              style={[commonStyles.button, commonStyles.primaryButton, { marginBottom: 20 }]}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={commonStyles.buttonText}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
