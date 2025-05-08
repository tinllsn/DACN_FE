import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from './styles/commonStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.7:5000/api';

// Login Screen
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError('');
            
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            if (response.data.token) {
                // Lưu token vào AsyncStorage
                await AsyncStorage.setItem('userToken', response.data.token);
                
                // Lấy thông tin user từ token
                const tokenData = JSON.parse(atob(response.data.token.split('.')[1]));
                
                // Gọi API để lấy thông tin user
                const userResponse = await axios.get(`${API_URL}/auth/user`, {
                    headers: {
                        'Authorization': `Bearer ${response.data.token}`
                    }
                });

                const userData = {
                    id: tokenData.user.id,
                    email: email,
                    username: userResponse.data.username
                };
                
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                navigation.replace('Home');
            } else {
                throw new Error('No token received');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 400) {
                setError('Invalid email or password');
            } else {
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            }
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
                <Text style={commonStyles.screenTitle}>Welcome Back</Text>
                
            </View>
            <View style={commonStyles.signupPrompt}>
                <Text style={commonStyles.signupPromptText}>
                    You don't have an account yet?{' '}
                    <Text 
                        style={commonStyles.linkText}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        Sign up
                    </Text>
                </Text>
            </View>
            
            {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
            
            {/* <TouchableOpacity style={commonStyles.socialButton}>
                <Text style={commonStyles.socialButtonIcon}>f</Text>
                <Text style={commonStyles.socialButtonText}>Login with FACEBOOK</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={commonStyles.googleButton}>
                <Image 
                    source={require('../assets/logo.png')} 
                    style={commonStyles.googleIcon}
                />
                <Text style={commonStyles.googleButtonText}>Login with GOOGLE</Text>
            </TouchableOpacity> */}
            
            {/* <Text style={commonStyles.orText}>or LOGIN WITH EMAIL</Text> */}
            
            <TextInput
                style={commonStyles.input}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
            />
            
            <TextInput
                style={commonStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
            />
            
            <TouchableOpacity 
                style={[commonStyles.button, commonStyles.primaryButton]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={commonStyles.buttonText}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={commonStyles.linkText}>Forgot your password?</Text>
            </TouchableOpacity>
            
            {/* <View style={commonStyles.signupPrompt}>
                <Text style={commonStyles.signupPromptText}>
                    You don't have an account yet?{' '}
                    <Text 
                        style={commonStyles.linkText}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        Sign up
                    </Text>
                </Text>
            </View> */}
        </SafeAreaView>
    );
};

export default LoginScreen;
