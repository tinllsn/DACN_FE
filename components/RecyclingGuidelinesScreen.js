import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar, Switch, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const RecyclingGuidelinesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { materialType = 'Plastic' } = route.params || {};
  
  const [showDos, setShowDos] = useState(true);
  
  const goBack = () => {
    navigation.goBack();
  };

  // Material-specific content
  const materials = {
    Plastic: {
    //   image: require('./assets/plastic-bottles.png'),
      dos: [
        'hghjbmnRinse plastics to remove food and liquid residue.',
        'Check recycling symbols (1-7) to confirm recyclability.',
        'Separate by type if required by local guidelines.',
        'Follow local rules for what is accepted in recycling bins.',
        'Remove caps unless marked as recyclable together.',
        'Flatten bottles only if allowed by the recycling facility.',
        'Recycle clean packaging like water bottles and food containers.'
      ],
      donts: [
        'Don\'t recycle dirty or food-soiled plastics.',
        'Don\'t include plastic bags unless specified by your local center.',
        'Don\'t mix non-recyclables like Styrofoam or PVC with recyclables.',
        'Don\'t assume all plastics are recyclable—check labels.',
        'Don\'t crush items if not allowed by the facility.',
        'Don\'t put hazardous waste (e.g., pesticide containers) in recycling bins.',
        'Don\'t leave liquids in bottles or containers before recycling.'
      ]
    },
    Paper: {
    //   image: require('./assets/paper-stack.png'),
      dos: [
        'Recycle clean and dry paper (e.g., newspapers, magazines, and office paper).',
        'Flatten cardboard boxes to save space.',
        'Remove staples, paper clips, and other non-paper materials.',
        'Follow local rules for separating paper by type (e.g., cardboard vs. mixed paper).',
        'Reuse paper whenever possible before recycling.',
        'Store paper in a dry place to prevent contamination.',
        'Check if your local facility accepts shredded paper (bag it if required).'
      ],
      donts: [
        'Don\'t recycle wet or soiled paper (e.g., greasy pizza boxes).',
        'Don\'t mix coated or laminated paper with recyclables.',
        'Don\'t recycle receipts, as they often contain non-recyclable thermal paper.',
        'Don\'t include tissues, napkins, or paper towels.',
        'Don\'t add food packaging with plastic liners (e.g., juice cartons) unless specified.',
        'Don\'t mix paper with plastic or metal waste.',
        'Don\'t forget to remove excess tape from cardboard.'
      ]
    }
  };

  const currentMaterial = materials[materialType];
  // const backgroundColor = showDos ? '#a4d65e' : '#e88a8a';
  
  return (
    // <SafeAreaView style={[styles.container, { backgroundColor }]}>
    <SafeAreaView style={[styles.container, { backgroundColor: '#ffffff' }]}>

      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Main content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Material image with recycling symbol */}
        <View style={styles.imageContainer}>
          <Image 
            source={currentMaterial.image}
            style={styles.materialImage}
            resizeMode="contain"
          />
          <View style={styles.recycleSymbolOverlay}>
            <Image 
              source={showDos ? 
                require('../assets/home-icon.png') : 
                require('../assets/guide-icon.png')}
              style={styles.recycleSymbol}
              resizeMode="contain"
            />
          </View>
        </View>
        
        {/* White curved container */}
        <View style={styles.whiteContainer}>
          {/* Material title and toggle */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{materialType}</Text>
            <View style={styles.toggleContainer}>
              <Text style={[styles.toggleLabel, !showDos && styles.activeToggleLabel]}>Don'ts</Text>
              <Switch
                trackColor={{ false: '#e88a8a', true: '#a4d65e' }}
                thumbColor={'#ffffff'}
                ios_backgroundColor="#e88a8a"
                onValueChange={() => setShowDos(!showDos)}
                value={showDos}
                style={styles.toggle}
              />
              <Text style={[styles.toggleLabel, showDos && styles.activeToggleLabel]}>Dos</Text>
            </View>
          </View>
          
          {/* Guidelines list */}
          <View style={styles.guidelinesList}>
            {(showDos ? currentMaterial.dos : currentMaterial.donts).map((item, index) => (
              <View key={index} style={styles.guidelineItem}>
                <View style={[styles.iconContainer, { backgroundColor: showDos ? '#f0fff0' : '#fff0f0' }]}>
                  <Text style={[styles.icon, { color: showDos ? 'green' : 'red' }]}>
                    {showDos ? '♻' : '✕'}
                  </Text>
                </View>
                <Text style={styles.guidelineText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* OK Button */}
      <TouchableOpacity style={styles.okButton} onPress={goBack}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 60,
    justifyContent: 'center',
  },
  backButton: {
    marginLeft: 20,
  },
  backButtonCircle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#555',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  materialImage: {
    width: 200,
    height: 200,
  },
  recycleSymbolOverlay: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recycleSymbol: {
    width: 150,
    height: 150,
    opacity: 0.8,
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 80, // Extra padding for the OK button
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 5,
  },
  toggle: {
    marginHorizontal: 5,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#777',
    marginHorizontal: 5,
  },
  activeToggleLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  guidelinesList: {
    marginBottom: 20,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 3,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  guidelineText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  okButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#a4d65e',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RecyclingGuidelinesScreen;