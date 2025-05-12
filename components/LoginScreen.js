import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './styles/commonStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.7:5000/api';

// Login Screen
const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!username || !password) {
            setError('Please enter both username and password.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
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
                username,
                password,
            });
            if (response.data && response.data.id && response.data.username) {
                // Lưu userData vào AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify({
                    id: response.data.id,
                    username: response.data.username
                }));
                navigation.replace('Home');
            } else {
                setError('Invalid username or password.');
            }
        } catch (err) {
            setError('Invalid username or password.');
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
                            <Text style={commonStyles.screenTitle}>Welcome Back</Text>
                            <Text style={[commonStyles.signupPromptText, { marginTop: 10 }]}>
                                Don't have an account?{' '}
                                <Text 
                                    style={commonStyles.linkText}
                                    onPress={() => navigation.navigate('SignUpScreen')}
                                >
                                    Sign up
                                </Text>
                            </Text>
                        </View>
                        
                        {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
                        
                        <TextInput
                            style={[commonStyles.input, { marginBottom: 15 }]}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        
                        <TextInput
                            style={[commonStyles.input, { marginBottom: 20 }]}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        
                        <TouchableOpacity 
                            style={[commonStyles.button, commonStyles.primaryButton, { marginBottom: 15 }]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={commonStyles.buttonText}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
