import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GetStartedScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Main content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/GetStartedScreen.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Ready to{'\n'}Get Started?</Text>
          <Text style={styles.subtitle}>
            Join us in making the world a cleaner place, one waste item at a time.
          </Text>
        </View>
      </View>
      
      {/* Navigation buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#32CD32" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.getStartedButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f0',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#32CD32',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  backButtonText: {
    color: '#32CD32',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  getStartedButton: {
    flex: 1,
    backgroundColor: '#32CD32',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default GetStartedScreen;