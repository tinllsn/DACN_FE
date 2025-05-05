// Sign Up Screen
export const SignUpScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const handleSignUp = () => {
      // Validation would go here
      setShowSuccessModal(true);
    };
    
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
          <Text style={styles.screenTitle}>Create Your Account</Text>
        </View>
        
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonIcon}>f</Text>
          <Text style={styles.socialButtonText}>Sign up with FACEBOOK</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.googleButton}>
          <Image 
            source={require('./assets/google-icon.png')} 
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign up GOOGLE</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>or SIGN UP WITH EMAIL</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          {username.length > 0 && (
            <Text style={styles.validIcon}>✓</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email.includes('@') && (
            <Text style={styles.validIcon}>✓</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Text>👁️</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I have read the{' '}
            <Text style={styles.privacyLink}>privacy policy</Text>.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        {/* Success Modal */}
        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sign Up Success</Text>
              <View style={styles.successIcon}>
                <Text style={styles.checkmarkLarge}>✓</Text>
              </View>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.modalButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  };