import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
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
    <SafeAreaView style={commonStyles.safeArea}>
      <TouchableOpacity 
        style={commonStyles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={commonStyles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <View style={commonStyles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={commonStyles.logo}
        />
        <Text style={commonStyles.screenTitle}>Create Your Account</Text>
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
        style={commonStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={commonStyles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <View style={commonStyles.checkboxContainer}>
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
        style={[commonStyles.button, commonStyles.primaryButton]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={commonStyles.buttonText}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      
      <View style={commonStyles.signupPrompt}>
        <Text style={commonStyles.signupPromptText}>
          Already have an account?{' '}
          <Text 
            style={commonStyles.linkText}
            onPress={() => navigation.navigate('Login')}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
