import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const wasteTypes = [
  { 
    id: 'plastic', 
    name: 'Plastic', 
    color: '#e0f7fa', 
    borderColor: '#00acc1',
    image: require('../assets/guide-icon.png')
  },
  { 
    id: 'paper', 
    name: 'Paper', 
    color: '#fff3e0', 
    borderColor: '#fb8c00',
    image: require('../assets/guide-icon.png')
  },
  { 
    id: 'glass', 
    name: 'Glass', 
    color: '#fce4ec', 
    borderColor: '#d81b60',
    image: require('../assets/guide-icon.png')
  },
  { 
    id: 'metal', 
    name: 'Metal', 
    color: '#e8f5e9', 
    borderColor: '#43a047',
    image: require('../assets/guide-icon.png')
  },
  { 
    id: 'organic', 
    name: 'Organic', 
    color: '#e3f2fd', 
    borderColor: '#1e88e5',
    image: require('../assets/guide-icon.png')
  },
];

const wasteGuides = {
  plastic: {
    dos: [
      'Rinse containers before recycling',
      'Remove caps and lids',
      'Check for recycling symbols',
      'Flatten bottles to save space',
      'Separate different types of plastic'
    ],
    donts: [
      'Don\'t recycle plastic bags',
      'Don\'t recycle food-contaminated plastic',
      'Don\'t recycle mixed materials',
      'Don\'t recycle plastic with food residue',
      'Don\'t recycle plastic that\'s too small'
    ]
  },
  paper: {
    dos: [
      'Remove any plastic or metal parts',
      'Keep paper dry and clean',
      'Flatten cardboard boxes',
      'Separate different types of paper',
      'Check for recycling symbols'
    ],
    donts: [
      'Don\'t recycle paper with food stains',
      'Don\'t recycle paper with wax coating',
      'Don\'t recycle paper with plastic coating',
      'Don\'t recycle paper with metal staples',
      'Don\'t recycle paper with adhesive'
    ]
  },
  glass: {
    dos: [
      'Rinse containers thoroughly',
      'Remove caps and lids',
      'Separate by color if required',
      'Check for recycling symbols',
      'Keep glass clean and dry'
    ],
    donts: [
      'Don\'t recycle broken glass',
      'Don\'t recycle glass with food residue',
      'Don\'t recycle mixed materials',
      'Don\'t recycle heat-resistant glass',
      'Don\'t recycle glass with metal parts'
    ]
  },
  metal: {
    dos: [
      'Rinse containers thoroughly',
      'Remove labels if possible',
      'Flatten cans to save space',
      'Separate different types of metal',
      'Check for recycling symbols'
    ],
    donts: [
      'Don\'t recycle metal with food residue',
      'Don\'t recycle mixed materials',
      'Don\'t recycle metal with plastic coating',
      'Don\'t recycle metal with paint',
      'Don\'t recycle metal with rust'
    ]
  },
  organic: {
    dos: [
      'Separate food scraps properly',
      'Use compostable bags',
      'Keep organic waste dry',
      'Mix with dry materials',
      'Check local composting guidelines'
    ],
    donts: [
      'Don\'t include meat or dairy',
      'Don\'t include pet waste',
      'Don\'t include plastic or metal',
      'Don\'t include treated wood',
      'Don\'t include diseased plants'
    ]
  }
};

const DosDonts = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showDos, setShowDos] = useState(true);
  const navigation = useNavigation();

  const renderWasteTypeSelection = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Waste Type</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {wasteTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.typeButton, { backgroundColor: type.color, borderColor: type.borderColor }]}
            onPress={() => setSelectedType(type.id)}
          >
            <Image source={type.image} style={styles.typeIcon} />
            <Text style={[styles.typeText, { color: type.borderColor }]}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderGuide = () => {
    const guide = wasteGuides[selectedType];
    const type = wasteTypes.find(t => t.id === selectedType);
    const backgroundColor = showDos ? '#a4d65e' : '#e88a8a';

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedType(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{type.name} Guide</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image source={type.image} style={styles.materialImage} />
          </View>

          <View style={styles.whiteContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{type.name}</Text>
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

            <View style={styles.guidelinesList}>
              {(showDos ? guide.dos : guide.donts).map((item, index) => (
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedType ? renderGuide() : renderWasteTypeSelection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#32CD32',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  typeIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  typeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  materialImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1,
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
});

export default DosDonts; 