import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OnboardingScreenThree = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Main content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/OnboardingScreenThree.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.activeDot]} />
        </View>
        
        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Eco-Friendly{'\n'}Living</Text>
          <Text style={styles.subtitle}>
            Make a positive impact on the environment with proper waste management.
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
          style={styles.nextButton} 
          onPress={() => navigation.navigate('GetStarted')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#32CD32',
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
  nextButton: {
    flex: 1,
    backgroundColor: '#32CD32',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default OnboardingScreenThree;