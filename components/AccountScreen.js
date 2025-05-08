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
});

export default AccountScreen;