// Login Screen
export const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/ecosort-logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.screenTitle}>Welcome Back</Text>
        </View>
        
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonIcon}>f</Text>
          <Text style={styles.socialButtonText}>Login with FACEBOOK</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.googleButton}>
          <Image 
            source={require('./assets/google-icon.png')} 
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Login with GOOGLE</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>or LOGIN WITH EMAIL</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        
        <View style={styles.signupPrompt}>
          <Text style={styles.signupPromptText}>
            You don't have an account yet?{' '}
            <Text 
              style={styles.linkText}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  };