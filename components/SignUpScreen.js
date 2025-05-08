import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from './styles/commonStyles';
import axios from 'axios';

// Thay đổi localhost thành IP của máy tính của bạn
const API_URL = 'http://192.168.1.7:5000/api';

// Sign Up Screen
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      setError('Please agree to the privacy policy');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      // Kiểm tra token trong response
      if (response.data.token) {
        Alert.alert(
          'Success',
          'Registration successful! Please login.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
            
            <TextInput
              style={[commonStyles.input, { marginBottom: 15 }]}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[commonStyles.input, { marginBottom: 15 }]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              style={[commonStyles.input, { marginBottom: 20 }]}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            <View style={[commonStyles.checkboxContainer, { marginBottom: 20 }]}>
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
            </View>
            
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
