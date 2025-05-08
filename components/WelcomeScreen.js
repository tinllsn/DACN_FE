import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Welcome Screen
export const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeTop}>
        <Image
          source={require('../assets/logo.png')}
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
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate('SignUpScreen')}
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

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
  },
  welcomeTop: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  welcomeBottom: {
    flex: 1,
    backgroundColor: 'white',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    marginTop: -30,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  welcomeHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#7C7C7C',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#32CD32',
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  outlineButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  outlineButtonText: {
    color: '#32CD32',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    color: '#7C7C7C',
    marginTop: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#32CD32',
  },
});

export default WelcomeScreen;

