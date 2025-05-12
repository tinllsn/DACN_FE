import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors } from './styles/commonStyles';

// Account Screen
const AccountScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  const navigateToGuide = () => {
    navigation.navigate('QuickGuide');
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        setUserData(JSON.parse(userDataString));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userData');
              navigation.replace('WelcomeScreen');
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header with green background and app name/logo */}
      <View style={styles.headerGreen}>
        <View style={styles.headerLogoRow}>
          <MaterialCommunityIcons name="leaf" size={28} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>My EcoSort</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Avatar and user info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.userName}>{userData?.username || 'Username'}</Text>
          <Text style={styles.userEmail}>{userData?.email || 'Email'}</Text>
        </View>

        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('AboutMeScreen')}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="account" size={24} color="#222" />
            </View>
            <Text style={styles.menuLabel}>About me</Text>
            <MaterialIcons name="chevron-right" size={22} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('NotificationsScreen')}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#FBC02D" />
            </View>
            <Text style={styles.menuLabel}>Notifications</Text>
            <MaterialIcons name="chevron-right" size={22} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* Other Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Other</Text>
          <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate('AppVersionScreen')}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#D32F2F" />
            </View>
            <Text style={styles.menuLabel}>Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </TouchableOpacity>
          {/* Sign out */}
          <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="logout" size={24} color="#D32F2F" />
            </View>
            <Text style={[styles.menuLabel, { color: '#D32F2F' }]}>Sign out</Text>
            {/* <MaterialIcons name="chevron-right" size={22} color="transparent" style={{ marginLeft: 'auto' }} /> */}
          </TouchableOpacity>
        </View>

      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHomeScreen}>
          <Image
            source={require('../assets/home-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateToGuide}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerGreen: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // position: 'relative',
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 0,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 18,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    // backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 13,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3FAF2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
  versionText: {
    marginLeft: 'auto',
    color: '#888',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#16a34a",
  },
  tabText: {
    fontSize: 12,
    color: "#16a34a",
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15803d",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  cardContent: {
    padding: 16,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  list: {
    marginBottom: 16,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 4,
  },
  featureGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  featureItem: {
    flex: 1,
    backgroundColor: "#dcfce7",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: "#374151",
  },
  featureDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "#4b5563",
  },
  tipBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
    backgroundColor: "#f0fdf4",
    padding: 12,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#374151",
  },
  tipItem: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4b5563",
  },
  infoBox: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    color: "#4b5563",
  },
  dosAndDontsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dosContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 8,
    marginRight: 4,
  },
  dontsContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    marginLeft: 4,
  },
  dosHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0",
  },
  dontsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fecaca",
  },
  dosTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#15803d",
  },
  dontsTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#b91c1c",
  },
  dosList: {
    padding: 8,
  },
  dontsList: {
    padding: 8,
  },
  dosItem: {
    fontSize: 12,
    lineHeight: 20,
    color: "#374151",
  },
  dontsItem: {
    fontSize: 12,
    lineHeight: 20,
    color: "#374151",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#16a34a",
  },
  nextButton: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#16a34a",
    marginHorizontal: 4,
  },
  nextButtonText: {
    color: "white",
  },
  disabledButton: {
    borderColor: "#d1d5db",
    backgroundColor: "#f3f4f6",
  },
  disabledButtonText: {
    color: "#9ca3af",
  },
  footer: {
    backgroundColor: "#16a34a",
    padding: 12,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
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
});

export default AccountScreen;