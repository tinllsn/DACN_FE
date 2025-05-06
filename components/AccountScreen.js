import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Account Screen
const AccountScreen = () => {
  const navigation = useNavigation();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="leaf" size={24} color="white" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>My EcoSort</Text>
      </View>
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.profileLogo}
        />
        <Text style={styles.profileName}>Username</Text>
        <Text style={styles.profileEmail}>Email</Text>
        {/* <View style={styles.pointsContainer}>
          <Text style={styles.pointsIcon}>$</Text>
          <Text style={styles.pointsText}>0 Runtah Points</Text>
        </View> */}
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Settings</Text>
      </View>

      <ScrollView style={styles.menuList}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AboutMeScreen')}
        >
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>👤</Text>
          </View>
          <Text style={styles.menuText}>About me</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>📦</Text>
          </View>
          <Text style={styles.menuText}>My Address</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('NotificationsScreen')}
        >
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🔔</Text>
          </View>
          <Text style={styles.menuText}>Notifications</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Other</Text>
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AppVersionScreen')}
        >
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🛡️</Text>
          </View>
          <Text style={styles.menuText}>Version</Text>
          <Text style={styles.versionText}>1.0.0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowSignOutModal(true)}
        >
          <View style={[styles.menuIconContainer, styles.signOutIcon]}>
            <Text style={styles.menuIcon}>⟲</Text>
          </View>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/home-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} >
          <Image
            source={require('../assets/quick-guide-icon.png')} 
            style={styles.navIcon}
            
          />
          <Text style={styles.navText}>Quick Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} >
          <Image
            source={require('../assets/account-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Success Modal */}
      <Modal
        visible={showSignOutModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Out Success</Text>
            <View style={styles.successIcon}>
              <Text style={styles.checkmarkLarge}>✓</Text>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowSignOutModal(false);
                navigation.navigate('Welcome');
              }}
            >
              <Text style={styles.modalButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  // General styles
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#32CD32',
  },

  // Welcome screen styles
  welcomeContainer: {
    flex: 1,
  },
  welcomeTop: {
    flex: 1,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  welcomeBottom: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    color: 'white',
  },
  welcomeHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#cccccc',
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
    color: '#cccccc',
    marginTop: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#32CD32',
  },

  // Login and Sign Up styles
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#32CD32',
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  socialButtonIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingRight: 15,
  },
  validIcon: {
    color: '#32CD32',
    fontSize: 20,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 15,
  },
  signupPrompt: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  signupPromptText: {
    color: '#666',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#32CD32',
  },
  checkmark: {
    color: '#32CD32',
    fontSize: 16,
  },
  checkboxLabel: {
    color: '#666',
  },
  privacyLink: {
    color: '#32CD32',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkmarkLarge: {
    color: 'white',
    fontSize: 40,
  },
  modalButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#32CD32',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#32CD32',
    fontSize: 18,
    fontWeight: '600',
  },

  // Account screen styles
  profileHeader: {
    backgroundColor: '#f5f7fa',
    padding: 20,
    alignItems: 'center',
  },
  profileLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#666',
    marginBottom: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pointsIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0fff0',
    borderWidth: 1,
    borderColor: '#32CD32',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 10,
    color: '#32CD32',
  },
  pointsText: {
    fontSize: 16,
    color: '#32CD32',
    fontWeight: '600',
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitleText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fff0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  versionText: {
    color: '#999',
  },
  signOutIcon: {
    backgroundColor: '#fff0f0',
  },
  signOutText: {
    flex: 1,
    fontSize: 16,
    color: '#ff3b30',
  },

  // Form styles
  formContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  formSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 15,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 15,
    color: '#999',
  },
  formInput: {
    flex: 1,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#32CD32',
    margin: 15,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  // Notifications styles
  notificationsContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#999',
    width: '80%',
  },

  // Version screen styles
  versionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  versionLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  versionAppName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 20,
  },
  versionNumber: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  versionCopyright: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  licenseLink: {
    fontSize: 16,
    color: '#007AFF',
  },
  navigationBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 20,
    height: 20,
    tintColor: '#555',
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
  header: {
    backgroundColor: "#16a34a",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  
  
});

export default AccountScreen;