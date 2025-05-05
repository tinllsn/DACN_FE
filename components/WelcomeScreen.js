// Welcome Screen
export const WelcomeScreen = () => {
    const navigation = useNavigation();
    
    return (
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeTop}>
          <Image 
            source={require('./assets/ecosort-logo.png')} 
            style={styles.welcomeLogo}
          />
          <Text style={styles.welcomeTitle}>EcoSort</Text>
        </View>
        
        <View style={styles.welcomeBottom}>
          <Text style={styles.welcomeHeading}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>Caring about waste management</Text>
          <Text style={styles.welcomeSubtitle}>Caring about the future</Text>
          
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.outlineButton} 
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.outlineButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            By logging in or registering, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    );
  };